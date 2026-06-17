/**
 * TTS Modes — shared logic for reading modes (Fluide, Mot a mot, Syllabes).
 * Calls G2P + Aligneur to segment text, then synthesizes each segment
 * independently via IPA input with silence between segments.
 */
(function () {
  "use strict";

  var G2P_URL = "https://api.lectura.world/g2p/analyser";
  var ALIGNEUR_URL = "https://api.lectura.world/aligneur/analyze";
  var SILENCE_MS = 500;
  var PUNCT_RE = /^[,;:!?.\u2026\u00ab\u00bb"()\[\]{}\u2013\u2014\/]+$/;

  function fetchG2P(tokens) {
    return fetch(G2P_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokens: tokens }),
    }).then(function (resp) {
      if (!resp.ok) throw new Error("G2P: HTTP " + resp.status);
      return resp.json();
    });
  }

  function fetchAligneur(word, phone) {
    return fetch(ALIGNEUR_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: word, phone: phone }),
    }).then(function (resp) {
      if (!resp.ok) throw new Error("Aligneur: HTTP " + resp.status);
      return resp.json();
    });
  }

  /**
   * Build reading groups from G2P result.
   * Words linked by liaison (Lz, Lt, ...) form a single group.
   * Returns [{tokens, phones, liaisons, combinedIpa}]
   */
  function buildGroups(tokens, g2p) {
    var groups = [];
    var cur = { tokens: [], phones: [], liaisons: [] };

    for (var i = 0; i < tokens.length; i++) {
      if (PUNCT_RE.test(tokens[i])) continue;
      var phone = (g2p.g2p[i] || "").trim();
      var liaison = g2p.liaison[i] || "none";
      if (!phone) continue;

      cur.tokens.push(tokens[i]);
      cur.phones.push(phone);
      cur.liaisons.push(liaison);

      // Close group if no liaison to next word or last token
      if (liaison === "none" || i >= tokens.length - 1) {
        var combined = "";
        for (var j = 0; j < cur.phones.length; j++) {
          combined += cur.phones[j];
          var lia = cur.liaisons[j];
          if (lia && lia !== "none" && lia.length >= 2) {
            combined += lia.charAt(1); // "Lz" -> "z"
          }
        }
        cur.combinedIpa = combined;
        groups.push(cur);
        cur = { tokens: [], phones: [], liaisons: [] };
      }
    }
    return groups;
  }

  /**
   * Get IPA segments for a given mode.
   * FLUIDE:    [{text, label}] - single segment with original text
   * MOT_A_MOT: [{ipa, label}] - one segment per reading group
   * SYLLABES:  [{ipa, label}] - one segment per syllable
   */
  async function getSegments(text, mode) {
    if (mode === "FLUIDE" || !mode) {
      return [{ text: text, label: text }];
    }

    var tokens = text.split(/\s+/).filter(function (t) {
      return t.length > 0;
    });
    var g2p = await fetchG2P(tokens);
    var groups = buildGroups(tokens, g2p);

    if (mode === "MOT_A_MOT") {
      return groups.map(function (g) {
        return { ipa: g.combinedIpa, label: g.tokens.join(" ") };
      });
    }

    if (mode === "SYLLABES") {
      // Fetch aligneur for all words in parallel
      var promises = [];
      var wordList = [];
      for (var gi = 0; gi < groups.length; gi++) {
        var group = groups[gi];
        for (var wi = 0; wi < group.tokens.length; wi++) {
          var phone = group.phones[wi];
          var lia = group.liaisons[wi];
          if (lia && lia !== "none" && lia.length >= 2) {
            phone += lia.charAt(1);
          }
          wordList.push({ token: group.tokens[wi], phone: phone });
          promises.push(
            fetchAligneur(group.tokens[wi], phone).catch(function () {
              return null;
            })
          );
        }
      }

      var results = await Promise.all(promises);
      var segments = [];
      for (var r = 0; r < results.length; r++) {
        if (results[r] && results[r].syllabes) {
          for (var s = 0; s < results[r].syllabes.length; s++) {
            var syl = results[r].syllabes[s];
            segments.push({
              ipa: syl.phone,
              label: syl.ortho + " /" + syl.phone + "/",
            });
          }
        } else {
          // Fallback: whole word as single segment
          segments.push({
            ipa: wordList[r].phone,
            label: wordList[r].token,
          });
        }
      }
      return segments;
    }

    return [{ text: text, label: text }];
  }

  /**
   * Split an IPA string into individual phones.
   * Handles combining diacritics (e.g. nasalization U+0303).
   * "bɔ̃ʒuʁ" -> ["b", "ɔ̃", "ʒ", "u", "ʁ"]
   */
  function splitIpaToPhones(ipa) {
    return ipa.match(/[^\u0300-\u036f][\u0300-\u036f]*/g) || [];
  }

  function base64ToFloat32(b64) {
    var binary = atob(b64);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new Float32Array(bytes.buffer);
  }

  function createSilenceBuffer(ctx, durationMs, sampleRate) {
    var samples = Math.floor((sampleRate * durationMs) / 1000);
    return ctx.createBuffer(1, Math.max(samples, 1), sampleRate);
  }

  function playBuffer(ctx, buffer) {
    return new Promise(function (resolve) {
      var source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.onended = resolve;
      source.start();
    });
  }

  /**
   * Synthesize all segments, then play sequentially with silence.
   * @param {Array} segments - [{ipa, label}] from getSegments()
   * @param {Object} opts
   *   apiUrl:          TTS API endpoint
   *   extraPayload:    additional params (voix, style, speaker, etc.)
   *   sampleRate:      default sample rate (22050 or 44100)
   *   getAudioContext: function returning AudioContext
   *   setStatus:       function(msg, isError)
   *   isAborted:       function returning true if playback should stop
   *   useGroups:       if true, send as {groups: [{phones: [...]}]} (Diphone API)
   *                    if false, send as {ipa: "..."} (Mono/Multi API)
   */
  async function synthesizeSegmented(segments, opts) {
    var apiUrl = opts.apiUrl;
    var extra = opts.extraPayload || {};
    var defaultSr = opts.sampleRate || 22050;
    var getCtx = opts.getAudioContext;
    var setStatus = opts.setStatus;
    var isAborted = opts.isAborted || function () {
      return false;
    };
    var useGroups = !!opts.useGroups;

    // Phase 1: synthesize all segments
    var audioData = [];
    for (var i = 0; i < segments.length; i++) {
      if (isAborted()) throw new Error("Interrompu");
      setStatus(
        "Synthese " + (i + 1) + "/" + segments.length + " : " + segments[i].label
      );

      var payload = { duration_scale: 1.5 };
      for (var key in extra) {
        if (extra.hasOwnProperty(key)) payload[key] = extra[key];
      }
      if (useGroups) {
        // Diphone API: groups of individual phones
        payload.groups = [{ phones: splitIpaToPhones(segments[i].ipa), boundary: "none" }];
      } else {
        // Mono/Multi API: IPA string
        payload.ipa = segments[i].ipa;
      }

      var resp = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        var errText = await resp.text();
        throw new Error("HTTP " + resp.status + ": " + errText);
      }

      var data = await resp.json();
      var audioBytes = base64ToFloat32(data.audio_base64);
      var sr = data.sample_rate || defaultSr;

      var ctx = getCtx();
      var buffer = ctx.createBuffer(1, audioBytes.length, sr);
      buffer.getChannelData(0).set(audioBytes);

      audioData.push({ buffer: buffer, label: segments[i].label, sr: sr });
    }

    // Phase 2: play sequentially with silence between segments
    for (var j = 0; j < audioData.length; j++) {
      if (isAborted()) throw new Error("Interrompu");
      setStatus(
        "Lecture " + (j + 1) + "/" + audioData.length + " : " + audioData[j].label
      );
      await playBuffer(getCtx(), audioData[j].buffer);
      if (j < audioData.length - 1) {
        var silence = createSilenceBuffer(getCtx(), SILENCE_MS, audioData[j].sr);
        await playBuffer(getCtx(), silence);
      }
    }

    setStatus("Lecture terminee (" + audioData.length + " segments)");
  }

  window.TTSModes = {
    getSegments: getSegments,
    synthesizeSegmented: synthesizeSegmented,
    SILENCE_MS: SILENCE_MS,
  };
})();
