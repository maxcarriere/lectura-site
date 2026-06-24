---
title: Contact & Liens
layout: default
permalink: /contact/
---

## Contact

Pour toute question, retour ou proposition de collaboration autour du projet Lectura, vous pouvez nous écrire directement ou utiliser le formulaire ci-dessous.

---

### Email

<div class="contact-email" markdown="0">
  <a id="email-link" href="#" aria-label="Envoyer un email">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 32" width="340" height="32" role="img" aria-label="Adresse email">
      <text x="0" y="24" font-family="'EB Garamond', Georgia, 'Times New Roman', serif" font-size="22" fill="#0d0d0d">admin@lectura.world</text>
    </svg>
  </a>
  <button class="contact-copy-btn" onclick="copyEmail()" title="Copier l'adresse email">
    <span class="copy-icon">&#x1F4CB;</span> Copier l'adresse
  </button>
  <span class="copy-feedback" id="copy-feedback"></span>
</div>

---

### Formulaire de contact

<div class="contact-form" markdown="0">
  <form id="contact-form" onsubmit="sendForm(event)">
    <label for="contact-subject">Sujet :</label>
    <select id="contact-subject" name="subject">
      <option value="Licence commerciale">Licence commerciale — modèles, API, usage commercial</option>
      <option value="Intégration technique">Intégration technique — modules TTS/STT/NLP</option>
      <option value="Services & prestations">Services &amp; prestations — éditorial, modèles sur mesure, consulting</option>
      <option value="Ressources lexicales">Ressources lexicales — LeXiK, kits G2P/P2G, données</option>
      <option value="Question générale" selected>Question générale — retours, collaboration, autre</option>
    </select>

    <label for="contact-name">Nom <small>(optionnel)</small> :</label>
    <input type="text" id="contact-name" name="name" placeholder="Votre nom">

    <label for="contact-message">Message :</label>
    <textarea id="contact-message" name="message" rows="6" placeholder="Votre message..."></textarea>

    <button type="submit" class="contact-submit-btn">Envoyer via votre client mail</button>
  </form>
</div>

---

## Contact & Liens

### Contact

- **GitHub** : [github.com/lectura-world](https://github.com/lectura-world)
- **LinkedIn** : [linkedin.com/in/maximecarriere](https://www.linkedin.com/in/maximecarriere/)
- **PyPI** : [pypi.org/user/lectura](https://pypi.org/user/lectura/)

### Liens

**Autres projets :**

- [Humanuscrit](https://humanuscrit.com/) — Projet d'écriture explorant l'IA et la créativité humaine
- [Zmaths](http://www.zmaths.net/) — Cours de mathématiques en ligne

**Services Lectura :**

- [Lexique en ligne](https://lexique.lectura.world) — 1,35 million d'entrées, consultable en ligne
- [API Lectura](https://api.lectura.world/docs) — Documentation interactive (Swagger)
- [Modules Python]({{ '/developpement/modules/' | relative_url }}) — 18+ modules publiés sur PyPI (TTS, STT, NLP, VC)
- [Prestations]({{ '/solutions/services/' | relative_url }}) — Intégration, licences, modèles sur mesure

**Ressources & données ouvertes :**

- [Lexique383](http://www.lexique.org/) — Base lexicale du français, 142 000 entrées (CC BY-SA)
- [GLAFF](http://redac.univ-tlse2.fr/lexiques/glaff.html) — Lexique morphologique, 1,4 million d'entrées (CC BY-SA 3.0)
- [Morphalou](https://www.ortolang.fr/market/lexicons/morphalou) — Lexique morphologique français (Ortolang)
- [Ortolang](https://www.ortolang.fr/) — Infrastructure de recherche pour les données linguistiques ouvertes
- [Wikidata](https://www.wikidata.org/) — Base de connaissances structurée (2,5M entités liées dans LeXiK)
- [Wiktionnaire](https://fr.wiktionary.org/) — Définitions et données sémantiques
- [UD French-GSD](https://universaldependencies.org/treebanks/fr_gsd/) — Treebank syntaxique du français (CC BY-SA 4.0)
- [Common Voice](https://commonvoice.mozilla.org/fr) — Corpus vocal participatif Mozilla (CC-0)
- [LibriVox](https://librivox.org/) — Enregistrements audio du domaine public
- [SIWIS](https://datashare.ed.ac.uk/handle/10283/2353) — Corpus vocal studio haute qualité
- [OpenSubtitles](https://www.opensubtitles.org/) — Corpus de sous-titres pour les statistiques de fréquence

**Projets open-source (synthèse vocale) :**

- [Piper](https://github.com/rhasspy/piper) — TTS rapide et léger, modèles ONNX multilingues (Rhasspy)
- [Kokoro](https://github.com/hexgrad/kokoro) — TTS expressif 82M paramètres, Apache 2.0
- [Coqui TTS](https://github.com/coqui-ai/TTS) — Boîte à outils TTS (VITS, Tacotron, XTTS)
- [eSpeak-NG](https://github.com/espeak-ng/espeak-ng) — Synthèse par formants et G2P multilingue
- [OpenVoice](https://github.com/myshell-ai/OpenVoice) — Conversion vocale zero-shot (MyShell)
- [RVC](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) — Conversion vocale par récupération
- [Matcha-TTS](https://github.com/shivammehta25/Matcha-TTS) — TTS par flow-matching OT-CFM
- [HiFi-GAN](https://github.com/jik876/hifi-gan) — Vocoder neuronal universel

**Projets open-source (reconnaissance vocale) :**

- [Whisper](https://github.com/openai/whisper) — STT multilingue par OpenAI
- [Vosk](https://alphacephei.com/vosk/) — STT offline léger, 20+ langues
- [MFA](https://montreal-forced-aligner.readthedocs.io/) — Alignement forcé phonème-audio (Montreal)

**Projets open-source (NLP & traitement du texte) :**

- [spaCy](https://spacy.io/) — Pipeline NLP industriel (tokenisation, POS, NER, dépendances)
- [Stanza](https://stanfordnlp.github.io/stanza/) — NLP multilingue par Stanford (UD-compatible)
- [NLTK](https://www.nltk.org/) — Boîte à outils NLP historique, ressources pédagogiques
- [Phonemizer](https://github.com/bootphon/phonemizer) — Conversion texte-phonèmes multilingue (eSpeak, Festival)
- [Lexconvert](https://github.com/ssb22/lexconvert) — Conversion entre formats de transcription phonétique
- [Universal Dependencies](https://universaldependencies.org/) — Annotations syntaxiques multilingues

**Outils & infrastructures :**

- [ONNX Runtime](https://onnxruntime.ai/) — Inférence optimisée pour modèles ONNX
- [PyTorch](https://pytorch.org/) — Framework d'entraînement des modèles
- [WORLD Vocoder](https://github.com/mmorise/World) — Vocodeur haute qualité (Morise et al.)
- [Hugging Face](https://huggingface.co/) — Hub de modèles et datasets

<script>
(function() {
  var p = ['admin', 'lectura.world'];
  var addr = p[0] + '@' + p[1];

  // Set mailto link on the SVG
  var link = document.getElementById('email-link');
  if (link) link.href = 'mailto:' + addr;

  window.copyEmail = function() {
    navigator.clipboard.writeText(addr).then(function() {
      var fb = document.getElementById('copy-feedback');
      fb.textContent = 'Copié !';
      fb.classList.add('visible');
      setTimeout(function() {
        fb.classList.remove('visible');
        fb.textContent = '';
      }, 2000);
    });
  };

  window.sendForm = function(e) {
    e.preventDefault();
    var subject = document.getElementById('contact-subject').value;
    var name = document.getElementById('contact-name').value;
    var message = document.getElementById('contact-message').value;
    var body = '';
    if (name) body += 'Nom : ' + name + '\n\n';
    body += message;
    window.location.href = 'mailto:' + addr
      + '?subject=' + encodeURIComponent(subject)
      + '&body=' + encodeURIComponent(body);
  };
})();
</script>
