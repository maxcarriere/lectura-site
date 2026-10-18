/**
 * Démos de synthèse vocale (page Synthèse vocale) — API publique Lectura.
 * Un seul appel POST /tts/synthetiser par démo : le moteur (multi, mono, diphone) dépend du bloc,
 * les modes mot à mot et syllabes sont calculés par le serveur. La réponse contient un WAV en base64
 * et les dates de chaque phonème (en millisecondes).
 */
(function () {
  "use strict";

  var API_URL = "https://api.lectura.world/tts/synthetiser";
  var MODES = { FLUIDE: "fluide", MOT_A_MOT: "mots", SYLLABES: "syllabes" };
  var LIMITES = { fluide: 1500, mots: 400, syllabes: 400 };

  var audioCtx = null;
  var lecture = null;  // { source, demo } en cours, une seule à la fois sur la page

  function contexteAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }

  function arreter() {
    if (lecture) {
      try { lecture.source.stop(); } catch (e) {}
      if (lecture.demo.progression) lecture.demo.progression.style.width = "0%";
      lecture.demo.statut("Lecture interrompue.");
      lecture = null;
    }
  }

  function base64VersOctets(b64) {
    var binaire = atob(b64);
    var octets = new Uint8Array(binaire.length);
    for (var i = 0; i < binaire.length; i++) octets[i] = binaire.charCodeAt(i);
    return octets.buffer;
  }

  function brancher(conteneur, moteur) {
    var demo = {
      texte: conteneur.querySelector(".tts-input"),
      bouton: conteneur.querySelector(".tts-btn"),
      voix: conteneur.querySelector(".tts-voix"),
      variante: conteneur.querySelector(".tts-variante"),
      modele: conteneur.querySelector(".tts-model"),
      style: conteneur.querySelector(".tts-style"),
      mode: conteneur.querySelector(".tts-mode"),
      sortie: conteneur.querySelector(".tts-output"),
      dates: conteneur.querySelector(".tts-timings"),
      progression: conteneur.querySelector(".tts-progress")
    };

    function statut(message, erreur) {
      demo.sortie.textContent = message;
      demo.sortie.classList.toggle("error", !!erreur);
    }
    demo.statut = statut;

    // Le curseur Homme / Enfant n'a de sens qu'avec un changement de timbre
    var etiquetteVariante = conteneur.querySelector(".tts-variante-label");
    function majVariante() {
      if (etiquetteVariante && moteur !== "multi") etiquetteVariante.style.display = demo.voix && demo.voix.value ? "flex" : "none";
    }
    if (demo.voix) demo.voix.addEventListener("change", majVariante);
    majVariante();

    function requete(texte) {
      var mode = MODES[demo.mode ? demo.mode.value : "FLUIDE"] || "fluide";
      var corps = { texte: texte, moteur: moteur, mode: mode };
      if (demo.modele && demo.modele.value) corps.model = demo.modele.value;
      if (demo.style && demo.style.value) corps.style = demo.style.value;
      if (demo.voix && demo.voix.value) {
        corps.voix = demo.voix.value;
        var v = demo.variante ? parseFloat(demo.variante.value) : 0;
        if (v) corps.voix_variante = v;
      }
      return corps;
    }

    function afficherDates(segments) {
      if (!demo.dates) return;
      var html = "<tr><th>Phonème</th><th>Début</th><th>Fin</th></tr>";
      (segments || []).forEach(function (s) {
        (s.phonemes || []).forEach(function (p) {
          html += "<tr><td>" + p[0] + "</td><td>" + (p[1] / 1000).toFixed(3) + " s</td><td>" + (p[2] / 1000).toFixed(3) + " s</td></tr>";
        });
      });
      demo.dates.innerHTML = html;
    }

    function animer(duree) {
      if (!demo.progression) return;
      var debut = performance.now(), source = lecture && lecture.source;
      (function pas() {
        if (!lecture || lecture.source !== source) return;
        var pct = Math.min((performance.now() - debut) / duree * 100, 100);
        demo.progression.style.width = pct + "%";
        if (pct < 100) requestAnimationFrame(pas);
      })();
    }

    async function synthetiser() {
      var texte = demo.texte.value.trim();
      if (!texte) { statut("Entrez un texte.", true); return; }
      var corps = requete(texte);
      if (texte.length > LIMITES[corps.mode]) {
        statut("Texte trop long pour ce mode (" + LIMITES[corps.mode] + " caractères au plus).", true);
        return;
      }
      arreter();
      // Le navigateur n'autorise le son qu'à partir d'un geste : on réveille le contexte audio au clic, avant la requête
      var ctx = contexteAudio();
      if (ctx.state === "suspended") ctx.resume();
      demo.bouton.disabled = true;
      demo.bouton.textContent = "Synthèse…";
      statut("Synthèse en cours…");
      if (demo.dates) demo.dates.innerHTML = "";
      try {
        var rep = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(corps)
        });
        if (!rep.ok) {
          throw new Error(rep.status === 429 ? "trop de requêtes, réessayez dans un instant"
            : rep.status === 503 ? "service momentanément indisponible" : "HTTP " + rep.status);
        }
        var json = await rep.json();
        var r = json.resultat || json;
        var tampon = await ctx.decodeAudioData(base64VersOctets(r.audio_base64));
        var source = ctx.createBufferSource();
        source.buffer = tampon;
        source.connect(ctx.destination);
        arreter();  // une autre démo a pu démarrer pendant la requête
        lecture = { source: source, demo: demo };
        source.onended = function () {
          if (lecture && lecture.source === source) {
            lecture = null;
            if (demo.progression) demo.progression.style.width = "0%";
            statut("Lecture terminée (" + (tampon.duration).toFixed(2) + " s)");
          }
        };
        source.start();
        statut("Lecture… (" + tampon.duration.toFixed(2) + " s)");
        animer(tampon.duration * 1000);
        afficherDates(r.segments);
      } catch (e) {
        statut("Erreur : " + e.message, true);
      } finally {
        demo.bouton.disabled = false;
        demo.bouton.textContent = "Synthétiser";
      }
    }

    demo.bouton.addEventListener("click", synthetiser);
    demo.texte.addEventListener("keydown", function (e) { if (e.key === "Enter") synthetiser(); });
  }

  [[".tts-multi-demo", "multi"], [".tts-demo", "mono"], [".tts-diphone-demo", "diphone"]].forEach(function (d) {
    document.querySelectorAll(d[0]).forEach(function (c) { brancher(c, d[1]); });
  });
})();
