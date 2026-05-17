/**
 * VC Demo — conversion vocale interactive avec upload audio ou enregistrement micro.
 * Supporte RVC (speakers), zero-shot (presets ou fichier de reference), et trick SR.
 * Envoie une requete multipart/form-data a l'API Lectura et joue le resultat.
 */
(function () {
  "use strict";

  var API_URL = "https://api.lec-tu-ra.com/vc/convert";

  var container = document.querySelector(".vc-demo");
  if (!container) return;

  var modeSelect = document.getElementById("vc-mode");
  var speakerSelect = document.getElementById("vc-speaker");
  var rvcOptions = container.querySelector(".vc-rvc-options");
  var zeroshotOptions = container.querySelector(".vc-zeroshot-options");
  var zsSourceSelect = document.getElementById("vc-zs-source");
  var presetOptions = document.getElementById("vc-preset-options");
  var presetSelect = document.getElementById("vc-preset");
  var fileReferenceDiv = document.getElementById("vc-file-reference");
  var referenceInput = document.getElementById("vc-reference");
  var srOverrideSelect = document.getElementById("vc-sr-override");
  var audioFileInput = document.getElementById("vc-audio-file");
  var fileBtn = document.getElementById("vc-file-btn");
  var fileName = document.getElementById("vc-file-name");
  var recordBtn = document.getElementById("vc-record-btn");
  var recordStatus = document.getElementById("vc-record-status");
  var audioPreview = document.getElementById("vc-audio-preview");
  var convertBtn = document.getElementById("vc-convert-btn");
  var progressBar = document.getElementById("vc-progress");
  var outputArea = document.getElementById("vc-output");
  var audioResult = document.getElementById("vc-audio-result");

  var mediaRecorder = null;
  var recordedChunks = [];
  var recordedBlob = null;
  var isRecording = false;

  // Toggle UI selon le mode (RVC vs zero-shot)
  modeSelect.addEventListener("change", function () {
    var mode = modeSelect.value;
    if (mode === "rvc") {
      rvcOptions.style.display = "";
      zeroshotOptions.style.display = "none";
    } else {
      rvcOptions.style.display = "none";
      zeroshotOptions.style.display = "";
    }
  });

  // Toggle UI dans zero-shot : preset vs fichier
  if (zsSourceSelect) {
    zsSourceSelect.addEventListener("change", function () {
      if (zsSourceSelect.value === "preset") {
        presetOptions.style.display = "";
        fileReferenceDiv.style.display = "none";
      } else {
        presetOptions.style.display = "none";
        fileReferenceDiv.style.display = "";
      }
    });
  }

  // Bouton Parcourir -> ouvre le file input cache
  fileBtn.addEventListener("click", function () {
    audioFileInput.click();
  });

  // Upload fichier -> preview + afficher le nom
  audioFileInput.addEventListener("change", function () {
    recordedBlob = null;
    if (audioFileInput.files.length > 0) {
      fileName.textContent = audioFileInput.files[0].name;
      var url = URL.createObjectURL(audioFileInput.files[0]);
      audioPreview.src = url;
      audioPreview.style.display = "";
    } else {
      fileName.textContent = "(Aucun fichier selectionne)";
      audioPreview.style.display = "none";
    }
  });

  // Enregistrement micro
  recordBtn.addEventListener("click", function () {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  });

  function startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus("Enregistrement non supporte par ce navigateur.", true);
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        recordedChunks = [];
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = function (e) {
          if (e.data.size > 0) recordedChunks.push(e.data);
        };

        mediaRecorder.onstop = function () {
          stream.getTracks().forEach(function (t) {
            t.stop();
          });
          recordedBlob = new Blob(recordedChunks, { type: "audio/webm" });
          var url = URL.createObjectURL(recordedBlob);
          audioPreview.src = url;
          audioPreview.style.display = "";
          // Clear file input so recorded audio takes priority
          audioFileInput.value = "";
          fileName.textContent = "(Aucun fichier selectionne)";
          recordStatus.textContent = "";
        };

        mediaRecorder.start();
        isRecording = true;
        recordBtn.textContent = "\uD83D\uDED1 Arreter";
        recordStatus.textContent = "Enregistrement en cours...";
      })
      .catch(function (err) {
        setStatus("Erreur micro : " + err.message, true);
      });
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    isRecording = false;
    recordBtn.textContent = "\uD83C\uDFA4 Enregistrer";
  }

  function setStatus(msg, isError) {
    outputArea.textContent = msg;
    outputArea.classList.toggle("error", !!isError);
  }

  // Conversion
  convertBtn.addEventListener("click", function () {
    doConvert();
  });

  async function doConvert() {
    var mode = modeSelect.value;

    // Determiner l'audio source
    var audioBlob = null;
    var audioName = "audio.wav";

    if (recordedBlob) {
      audioBlob = recordedBlob;
      audioName = "recording.webm";
    } else if (audioFileInput.files.length > 0) {
      audioBlob = audioFileInput.files[0];
      audioName = audioBlob.name;
    }

    if (!audioBlob) {
      setStatus("Selectionnez un fichier audio ou enregistrez votre voix.", true);
      return;
    }

    // Construire le FormData
    var formData = new FormData();
    formData.append("audio", audioBlob, audioName);
    formData.append("mode", mode);

    if (mode === "rvc") {
      formData.append("speaker", speakerSelect.value);
    } else {
      // Zero-shot : preset ou fichier de reference
      var zsSource = zsSourceSelect ? zsSourceSelect.value : "file";

      if (zsSource === "preset") {
        formData.append("reference_preset", presetSelect.value);
      } else {
        if (!referenceInput.files.length) {
          setStatus("Mode zero-shot : selectionnez un audio de reference.", true);
          return;
        }
        formData.append("reference", referenceInput.files[0], referenceInput.files[0].name);
      }

      // Trick SR (variante formants)
      if (srOverrideSelect && srOverrideSelect.value) {
        formData.append("sr_override", srOverrideSelect.value);
      }
    }

    convertBtn.disabled = true;
    convertBtn.textContent = "Conversion...";
    audioResult.style.display = "none";
    setStatus("Envoi de la requete...");

    if (progressBar) {
      progressBar.style.width = "30%";
    }

    try {
      var resp = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (progressBar) {
        progressBar.style.width = "80%";
      }

      if (!resp.ok) {
        var errText = await resp.text();
        throw new Error("HTTP " + resp.status + ": " + errText);
      }

      var data = await resp.json();

      if (progressBar) {
        progressBar.style.width = "100%";
      }

      // Decoder le WAV base64 et le jouer
      var wavBytes = base64ToArrayBuffer(data.audio_base64);
      var wavBlob = new Blob([wavBytes], { type: "audio/wav" });
      var wavUrl = URL.createObjectURL(wavBlob);

      audioResult.src = wavUrl;
      audioResult.style.display = "";

      var speaker = data.speaker || "-";
      var duration = data.duration_s ? data.duration_s.toFixed(2) : "?";
      setStatus(
        "Conversion terminee — mode: " +
          data.mode +
          ", speaker: " +
          speaker +
          ", duree: " +
          duration +
          "s"
      );
    } catch (err) {
      setStatus("Erreur : " + err.message, true);
    } finally {
      convertBtn.disabled = false;
      convertBtn.textContent = "Convertir";
      if (progressBar) {
        setTimeout(function () {
          progressBar.style.width = "0%";
        }, 1000);
      }
    }
  }

  function base64ToArrayBuffer(b64) {
    var binary = atob(b64);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }
})();
