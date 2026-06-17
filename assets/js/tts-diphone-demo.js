/**
 * TTS Diphone Demo — lecteur audio interactif pour la page module TTS Diphone.
 * Envoie une requete a l'API Lectura et joue l'audio via Web Audio API.
 * Modes Mot a mot / Syllabes via TTSModes (tts-modes.js).
 * Prosodie par regles uniquement.
 */
(function () {
  "use strict";

  const API_URL = "https://api.lectura.world/tts-diphone/synthesize";

  const container = document.querySelector(".tts-diphone-demo");
  if (!container) return;

  const input = container.querySelector(".tts-input");
  const btn = container.querySelector(".tts-btn");
  const outputArea = container.querySelector(".tts-output");
  const progressBar = container.querySelector(".tts-progress");
  const modeSelect = container.querySelector(".tts-mode");
  const voixSelect = container.querySelector(".tts-voix");
  const varianteSlider = container.querySelector(".tts-variante");

  // Masquer/afficher le slider variante selon la voix
  function updateVarianteVisibility() {
    var label = container.querySelector(".tts-variante-label");
    if (label) {
      label.style.display = (voixSelect && voixSelect.value) ? "flex" : "none";
    }
  }
  if (voixSelect) {
    voixSelect.addEventListener("change", updateVarianteVisibility);
    updateVarianteVisibility();
  }

  let audioCtx = null;
  let currentSource = null;
  let playbackAborted = false;

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 44100,
      });
    }
    return audioCtx;
  }

  function setStatus(msg, isError) {
    outputArea.textContent = msg;
    outputArea.classList.toggle("error", !!isError);
  }

  function stopPlayback() {
    playbackAborted = true;
    if (currentSource) {
      try { currentSource.stop(); } catch (e) {}
      currentSource = null;
    }
    if (progressBar) progressBar.style.width = "0%";
  }

  function base64ToFloat32(b64) {
    var binary = atob(b64);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new Float32Array(bytes.buffer);
  }

  function animateProgress(duration) {
    var startTime = performance.now();
    var durationMs = duration * 1000;
    function update() {
      if (!currentSource) return;
      var elapsed = performance.now() - startTime;
      var pct = Math.min((elapsed / durationMs) * 100, 100);
      progressBar.style.width = pct + "%";
      if (pct < 100) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  function buildExtraPayload() {
    var extra = { prosody_style: "regles" };
    if (voixSelect && voixSelect.value) {
      extra.voix = voixSelect.value;
      if (varianteSlider) {
        var v = parseFloat(varianteSlider.value);
        if (v !== 0) extra.voix_variante = v;
      }
    }
    return extra;
  }

  async function synthesize() {
    var text = input.value.trim();
    if (!text) {
      setStatus("Entrez du texte francais.", true);
      return;
    }

    stopPlayback();
    playbackAborted = false;
    btn.disabled = true;
    btn.textContent = "Synthese...";

    var mode = modeSelect ? modeSelect.value : "FLUIDE";

    try {
      if (mode !== "FLUIDE" && window.TTSModes) {
        // --- Segmented mode (Mot a mot / Syllabes) ---
        setStatus("Analyse du texte...");
        var segments = await TTSModes.getSegments(text, mode);

        await TTSModes.synthesizeSegmented(segments, {
          apiUrl: API_URL,
          extraPayload: buildExtraPayload(),
          sampleRate: 44100,
          getAudioContext: getAudioContext,
          setStatus: setStatus,
          isAborted: function () { return playbackAborted; },
        });
      } else {
        // --- Fluide mode (existing behavior) ---
        setStatus("Envoi de la requete...");

        var payload = {
          text: text,
          prosody_style: "regles",
        };
        if (voixSelect && voixSelect.value) {
          payload.voix = voixSelect.value;
          if (varianteSlider) {
            var v = parseFloat(varianteSlider.value);
            if (v !== 0) payload.voix_variante = v;
          }
        }

        var resp = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!resp.ok) {
          var err = await resp.text();
          throw new Error("HTTP " + resp.status + ": " + err);
        }

        var data = await resp.json();
        var audioBytes = base64ToFloat32(data.audio_base64);
        var duration = data.duration_s;
        var sr = data.sample_rate || 44100;

        setStatus("Audio genere : " + duration.toFixed(2) + "s, " + sr + " Hz — Lecture...");

        var ctx = getAudioContext();
        var buffer = ctx.createBuffer(1, audioBytes.length, sr);
        buffer.getChannelData(0).set(audioBytes);

        var source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start();
        currentSource = source;

        if (progressBar) animateProgress(duration);

        source.onended = function () {
          currentSource = null;
          setStatus("Lecture terminee (" + duration.toFixed(2) + "s, " + sr + " Hz)");
          if (progressBar) progressBar.style.width = "0%";
        };
      }
    } catch (err) {
      if (err.message !== "Interrompu") {
        setStatus("Erreur : " + err.message, true);
      }
    } finally {
      btn.disabled = false;
      btn.textContent = "Synthetiser";
    }
  }

  btn.addEventListener("click", synthesize);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") synthesize();
  });
})();
