/**
 * TTS Multi-Speaker Demo — lecteur audio interactif avec selection de voix et style.
 * Envoie une requete a l'API Lectura et joue l'audio via Web Audio API.
 * Modes Mot a mot / Syllabes via TTSModes (tts-modes.js).
 */
(function () {
  "use strict";

  const API_URL = "https://api.lectura.world/tts-multi/synthesize";

  const container = document.querySelector(".tts-multi-demo");
  if (!container) return;

  const input = container.querySelector(".tts-input");
  const btn = container.querySelector(".tts-btn");
  const outputArea = container.querySelector(".tts-output");
  const timingsTable = container.querySelector(".tts-timings");
  const progressBar = container.querySelector(".tts-progress");
  const speakerSelect = container.querySelector(".tts-speaker");
  const prosodySelect = container.querySelector(".tts-prosody");
  const styleSelect = container.querySelector(".tts-style");
  const modeSelect = container.querySelector(".tts-mode");
  const modelSelect = container.querySelector(".tts-model");

  let audioCtx = null;
  let currentSource = null;
  let playbackAborted = false;

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 22050,
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
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new Float32Array(bytes.buffer);
  }

  function animateProgress(duration) {
    const startTime = performance.now();
    const durationMs = duration * 1000;
    function update() {
      if (!currentSource) return;
      const elapsed = performance.now() - startTime;
      const pct = Math.min((elapsed / durationMs) * 100, 100);
      progressBar.style.width = pct + "%";
      if (pct < 100) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  function renderTimings(timings) {
    let html = "<tr><th>Phoneme</th><th>Debut</th><th>Fin</th></tr>";
    for (const t of timings) {
      const phone = t.ipa || t.phone || "";
      const start = (t.start_ms != null ? t.start_ms / 1000 : t.start) || 0;
      const end = (t.end_ms != null ? t.end_ms / 1000 : t.end) || 0;
      html += `<tr><td>${phone}</td><td>${start.toFixed(3)}s</td><td>${end.toFixed(3)}s</td></tr>`;
    }
    timingsTable.innerHTML = html;
  }

  function buildExtraPayload() {
    var extra = {};
    if (speakerSelect) extra.speaker = speakerSelect.value;
    if (prosodySelect && prosodySelect.value) extra.prosody = prosodySelect.value;
    if (styleSelect && styleSelect.value) extra.style = styleSelect.value;
    if (modelSelect && modelSelect.value) extra.model = modelSelect.value;
    return extra;
  }

  async function synthesize() {
    const text = input.value.trim();
    if (!text) {
      setStatus("Entrez du texte ou de l'IPA.", true);
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
          sampleRate: 22050,
          getAudioContext: getAudioContext,
          setStatus: setStatus,
          isAborted: function () { return playbackAborted; },
        });

        if (timingsTable) timingsTable.innerHTML = "";
      } else {
        // --- Fluide mode (existing behavior) ---
        setStatus("Envoi de la requete...");

        const payload = { text: text };
        if (speakerSelect) payload.speaker = speakerSelect.value;
        if (prosodySelect && prosodySelect.value) payload.prosody = prosodySelect.value;
        if (styleSelect && styleSelect.value) payload.style = styleSelect.value;
        if (modelSelect && modelSelect.value) payload.model = modelSelect.value;

        const resp = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!resp.ok) {
          const err = await resp.text();
          throw new Error(`HTTP ${resp.status}: ${err}`);
        }

        const data = await resp.json();
        const audioBytes = base64ToFloat32(data.audio_base64);
        const duration = data.duration_s;
        const speaker = data.speaker || payload.speaker || "?";

        setStatus(`Audio genere (${speaker}) : ${duration.toFixed(2)}s — Lecture...`);

        const ctx = getAudioContext();
        const buffer = ctx.createBuffer(1, audioBytes.length, data.sample_rate || 22050);
        buffer.getChannelData(0).set(audioBytes);

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start();
        currentSource = source;

        if (progressBar) animateProgress(duration);

        source.onended = function () {
          currentSource = null;
          setStatus(`Lecture terminee — ${speaker} (${duration.toFixed(2)}s)`);
          if (progressBar) progressBar.style.width = "0%";
        };

        if (timingsTable && data.phoneme_timings) {
          renderTimings(data.phoneme_timings);
        }
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
