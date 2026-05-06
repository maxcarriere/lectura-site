/**
 * TTS Multi-Speaker Demo — lecteur audio interactif avec selection de voix et style.
 * Envoie une requete a l'API Lectura et joue l'audio via Web Audio API.
 */
(function () {
  "use strict";

  const API_URL = "https://api.lec-tu-ra.com/tts-multi/synthesize";

  const container = document.querySelector(".tts-multi-demo");
  if (!container) return;

  const input = container.querySelector(".tts-input");
  const btn = container.querySelector(".tts-btn");
  const outputArea = container.querySelector(".tts-output");
  const timingsTable = container.querySelector(".tts-timings");
  const progressBar = container.querySelector(".tts-progress");
  const speakerSelect = container.querySelector(".tts-speaker");
  const styleSelect = container.querySelector(".tts-style");

  let audioCtx = null;
  let currentSource = null;

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
      setStatus("Entrez du texte ou de l'IPA.", true);
      return;
    }

    stopPlayback();
    btn.disabled = true;
    btn.textContent = "Synthese...";
    setStatus("Envoi de la requete...");

    try {
      const payload = { text: text };

      // Ajouter le speaker selectionne
      if (speakerSelect) {
        payload.speaker = speakerSelect.value;
      }

      // Ajouter le style selectionne
      if (styleSelect && styleSelect.value) {
        payload.style = styleSelect.value;
      }

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

      // Jouer l'audio
      const ctx = getAudioContext();
      const buffer = ctx.createBuffer(1, audioBytes.length, data.sample_rate || 22050);
      buffer.getChannelData(0).set(audioBytes);

      const source = ctx.createBufferSource();
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
        setStatus(`Lecture terminee — ${speaker} (${duration.toFixed(2)}s)`);
        if (progressBar) progressBar.style.width = "0%";
      };

      // Afficher les timings phonemes
      if (timingsTable && data.phoneme_timings) {
        renderTimings(data.phoneme_timings);
      }
    } catch (err) {
      setStatus("Erreur : " + err.message, true);
    } finally {
      btn.disabled = false;
      btn.textContent = "Synthetiser";
    }
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
      if (pct < 100) {
        requestAnimationFrame(update);
      }
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

  // Event listeners
  btn.addEventListener("click", synthesize);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") synthesize();
  });
})();
