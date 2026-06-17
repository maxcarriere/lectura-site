/**
 * TTS Diphone Demo — lecteur audio interactif pour la page module TTS Diphone.
 * Envoie une requete a l'API Lectura et joue l'audio via Web Audio API.
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
    if (currentSource) {
      try {
        currentSource.stop();
      } catch (e) {}
      currentSource = null;
    }
    if (progressBar) {
      progressBar.style.width = "0%";
    }
  }

  async function synthesize() {
    const text = input.value.trim();
    if (!text) {
      setStatus("Entrez du texte francais.", true);
      return;
    }

    stopPlayback();
    btn.disabled = true;
    btn.textContent = "Synthese...";
    setStatus("Envoi de la requete...");

    try {
      const payload = {
        text: text,
        mode: modeSelect ? modeSelect.value : "FLUIDE",
        prosody_style: "regles",
      };

      // Retimbre OpenVoice
      if (voixSelect && voixSelect.value) {
        payload.voix = voixSelect.value;
        if (varianteSlider) {
          var v = parseFloat(varianteSlider.value);
          if (v !== 0) payload.voix_variante = v;
        }
      }

      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const err = await resp.text();
        throw new Error("HTTP " + resp.status + ": " + err);
      }

      const data = await resp.json();
      const audioBytes = base64ToFloat32(data.audio_base64);
      const duration = data.duration_s;
      const sr = data.sample_rate || 44100;

      var modeLabel = modeSelect ? modeSelect.value : "FLUIDE";
      var voixLabel = (voixSelect && voixSelect.value) ? ", voix " + voixSelect.value : "";
      setStatus("Audio genere : " + duration.toFixed(2) + "s, " + sr + " Hz, mode " + modeLabel + voixLabel + " — Lecture...");

      // Jouer l'audio
      var ctx = getAudioContext();
      var buffer = ctx.createBuffer(1, audioBytes.length, sr);
      buffer.getChannelData(0).set(audioBytes);

      var source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
      currentSource = source;

      // Barre de progression
      if (progressBar) {
        animateProgress(duration);
      }

      source.onended = function () {
        currentSource = null;
        setStatus("Lecture terminee (" + duration.toFixed(2) + "s, " + sr + " Hz)");
        if (progressBar) progressBar.style.width = "0%";
      };
    } catch (err) {
      setStatus("Erreur : " + err.message, true);
    } finally {
      btn.disabled = false;
      btn.textContent = "Synthetiser";
    }
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
      if (pct < 100) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  // Event listeners
  btn.addEventListener("click", synthesize);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") synthesize();
  });
})();
