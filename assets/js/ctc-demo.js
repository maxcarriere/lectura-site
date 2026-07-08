/**
 * CTC/STT Demo — transcription phonetique et orthographique interactive.
 * Envoie l'audio a l'API Lectura /stt/transcribe-file et affiche :
 *   - la transcription phonetique IPA (CTC)
 *   - la transcription orthographique (STT = CTC + P2G)
 */
(function () {
  "use strict";

  var API_URL = "https://api.lectura.world/stt/transcribe-file";

  var container = document.querySelector(".ctc-demo");
  if (!container) return;

  var fileInput = document.getElementById("ctc-audio-file");
  var fileBtn = document.getElementById("ctc-file-btn");
  var fileName = document.getElementById("ctc-file-name");
  var recordBtn = document.getElementById("ctc-record-btn");
  var recordStatus = document.getElementById("ctc-record-status");
  var audioPreview = document.getElementById("ctc-audio-preview");
  var transcribeBtn = document.getElementById("ctc-transcribe-btn");
  var progressBar = document.getElementById("ctc-progress");
  var modeSelect = document.getElementById("ctc-mode");
  var ipaOutput = document.getElementById("ctc-output-ipa");
  var texteOutput = document.getElementById("ctc-output-texte");
  var timestampsTable = document.getElementById("ctc-timestamps");

  var mediaRecorder = null;
  var recordedChunks = [];
  var recordedBlob = null;
  var isRecording = false;

  // Bouton Parcourir -> ouvre le file input cache
  fileBtn.addEventListener("click", function () {
    fileInput.click();
  });

  // Upload fichier -> preview
  fileInput.addEventListener("change", function () {
    recordedBlob = null;
    if (fileInput.files.length > 0) {
      fileName.textContent = fileInput.files[0].name;
      var url = URL.createObjectURL(fileInput.files[0]);
      audioPreview.src = url;
      audioPreview.style.display = "";
    } else {
      fileName.textContent = "(Aucun fichier)";
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
          fileInput.value = "";
          fileName.textContent = "(Aucun fichier)";
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
    ipaOutput.textContent = msg;
    ipaOutput.classList.toggle("error", !!isError);
    texteOutput.textContent = "";
    texteOutput.classList.remove("error");
    if (timestampsTable) timestampsTable.innerHTML = "";
  }

  function displayIpa(ipa) {
    ipaOutput.classList.remove("error");
    ipaOutput.textContent = "";

    var words = ipa.split(" | ");
    words.forEach(function (word, i) {
      if (i > 0) {
        ipaOutput.appendChild(document.createTextNode(" "));
      }
      var span = document.createElement("span");
      span.className = "ctc-word";
      span.textContent = word;
      ipaOutput.appendChild(span);
    });
  }

  function displayTokens(names) {
    ipaOutput.classList.remove("error");
    ipaOutput.textContent = "";

    names.forEach(function (name, i) {
      if (i > 0) {
        ipaOutput.appendChild(document.createTextNode(" "));
      }
      var span = document.createElement("span");
      span.className = "ctc-word";
      span.textContent = name;
      ipaOutput.appendChild(span);
    });
  }

  function displayTexte(texte) {
    texteOutput.classList.remove("error");
    if (texte) {
      texteOutput.textContent = texte;
    } else {
      texteOutput.textContent = "(P2G non disponible sur le serveur)";
      texteOutput.classList.add("ctc-muted");
    }
  }

  function displayTimestamps(timestamps) {
    if (!timestampsTable) return;
    if (!timestamps || timestamps.length === 0) {
      timestampsTable.innerHTML = "";
      return;
    }
    var html = "<tr><th>Phone</th><th>Début</th><th>Fin</th><th>Confiance</th></tr>";
    timestamps.forEach(function (t) {
      html += "<tr><td>" + t.phone + "</td><td>" + t.time_s.toFixed(3) + "s</td><td>" + t.time_end_s.toFixed(3) + "s</td><td>" + (t.confidence * 100).toFixed(1) + "%</td></tr>";
    });
    timestampsTable.innerHTML = html;
  }

  // Transcription
  transcribeBtn.addEventListener("click", function () {
    doTranscribe();
  });

  async function doTranscribe() {
    var audioBlob = null;
    var audioName = "audio.wav";

    if (recordedBlob) {
      audioBlob = recordedBlob;
      audioName = "recording.webm";
    } else if (fileInput.files.length > 0) {
      audioBlob = fileInput.files[0];
      audioName = audioBlob.name;
    }

    if (!audioBlob) {
      setStatus(
        "Selectionnez un fichier audio ou enregistrez votre voix.",
        true
      );
      return;
    }

    var formData = new FormData();
    formData.append("file", audioBlob, audioName);

    transcribeBtn.disabled = true;
    transcribeBtn.textContent = "Transcription...";
    setStatus("Envoi de l'audio...");

    if (progressBar) {
      progressBar.style.width = "30%";
    }

    try {
      var mode = modeSelect ? modeSelect.value : "standard";
      var url = API_URL + "?mode=" + encodeURIComponent(mode);

      var resp = await fetch(url, {
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

      if (data.ipa) {
        displayIpa(data.ipa);
        displayTexte(data.texte);
        displayTimestamps(data.timestamps);
      } else {
        setStatus("(silence — aucun phone detecte)");
        displayTimestamps(null);
      }
    } catch (err) {
      setStatus("Erreur : " + err.message, true);
    } finally {
      transcribeBtn.disabled = false;
      transcribeBtn.textContent = "Transcrire";
      if (progressBar) {
        setTimeout(function () {
          progressBar.style.width = "0%";
        }, 1000);
      }
    }
  }
})();
