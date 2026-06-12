---
title: Synthese vocale
layout: default
permalink: /solutions/synthese-vocale/
redirect_from:
  - /solutions/tts/
  - /solutions/tts/multispeaker/
  - /solutions/tts/monospeaker/
  - /solutions/tts/diphone/
---

Lectura propose trois moteurs de synthese vocale pour le francais, chacun adapte a un usage different. Tous partagent le meme pipeline d'analyse du langage et sont combinables avec un systeme de **conversion vocale** (6 voix, blend de timbres, variantes homme/enfant).

---

## Trois moteurs complementaires

### Multi-Speaker — 6 voix, 7 styles

Un modele neuronal unique (FastPitch-Lite + HiFi-GAN, ~40 Mo) qui gere **6 voix francaises** (3 feminines, 3 masculines) et **7 styles expressifs** (neutre, narratif, dialogue, expressif, meditatif, rapide, lent). Changement de voix dynamique sans recharger le modele. ~50x temps reel sur CPU.

<div class="tts-demo tts-multi-demo">
  <div class="tts-controls">
    <label for="tts-speaker">Voix :</label>
    <select id="tts-speaker" class="tts-speaker">
      <option value="siwis" selected>Siwis (F)</option>
      <option value="ezwa">Ezwa (F)</option>
      <option value="nadine">Nadine (F)</option>
      <option value="bernard">Bernard (M)</option>
      <option value="gilles">Gilles (M)</option>
      <option value="zeckou">Zeckou (M)</option>
    </select>
    <label for="tts-style">Style :</label>
    <select id="tts-style" class="tts-style">
      <option value="neutre" selected>neutre</option>
      <option value="narratif">narratif</option>
      <option value="dialogue">dialogue</option>
      <option value="expressif">expressif</option>
      <option value="meditatif">meditatif</option>
      <option value="rapide">rapide</option>
      <option value="lent">lent</option>
    </select>
  </div>
  <input type="text" class="tts-input" value="Bonjour, je suis la voix de Lectura." placeholder="Entrez du texte francais...">
  <button class="tts-btn" type="button">Synthetiser</button>
  <div class="tts-progress-container"><div class="tts-progress"></div></div>
  <pre class="tts-output">Cliquez sur le bouton pour synthetiser.</pre>
  <table class="tts-timings"></table>
</div>

<script src="{{ '/assets/js/tts-multi-demo.js' | relative_url }}"></script>

---

### Monospeaker — voix haute qualite

Un moteur neuronal (FastPitch-Lite + HiFi-GAN, ~17 Mo) optimise pour une voix unique avec des **controles prosodiques fins** (pitch, energie, debit, pauses). Retimbre optionnel via conversion vocale pour changer le timbre sans re-entrainer de modele.

<div class="tts-demo">
  <input type="text" class="tts-input" value="Le soleil brille sur la ville." placeholder="Entrez du texte francais...">
  <div style="display: flex; gap: 0.5em; margin: 0.5em 0; flex-wrap: wrap; align-items: center;">
    <select class="tts-voix">
      <option value="">SIWIS (original)</option>
      <option value="siwis">Siwis (retimbre)</option>
      <option value="nadine">Nadine</option>
      <option value="ezwa">Ezwa</option>
      <option value="bernard">Bernard</option>
      <option value="gilles">Gilles</option>
      <option value="zeckou">Zeckou</option>
    </select>
    <label class="tts-variante-label" style="display:flex; align-items:center; gap:0.3em; font-size:0.85em;">
      <span style="opacity:0.7">Homme</span>
      <input type="range" class="tts-variante" min="-1" max="1" step="0.1" value="0" style="width:80px;">
      <span style="opacity:0.7">Enfant</span>
    </label>
    <button class="tts-btn" type="button">Synthetiser</button>
  </div>
  <div class="tts-progress-container"><div class="tts-progress"></div></div>
  <pre class="tts-output">Cliquez sur le bouton pour synthetiser.</pre>
  <table class="tts-timings"></table>
</div>

<script src="{{ '/assets/js/tts-demo.js' | relative_url }}?v=3"></script>

---

### Diphone — lecture adaptee

Un moteur par concatenation de diphones (WORLD, 44.1 kHz) avec **trois modes de lecture** adaptes a l'apprentissage : fluide, mot a mot et syllabes. Prosodie reglee (intonation declarative, interrogative, exclamative), retimbre multi-voix.

<div class="tts-diphone-demo">
  <input type="text" class="tts-input" value="Le chat dort sur le canape." placeholder="Entrez du texte francais...">
  <div style="display: flex; gap: 0.5em; margin: 0.5em 0; flex-wrap: wrap; align-items: center;">
    <select class="tts-mode">
      <option value="FLUIDE">Fluide</option>
      <option value="MOT_A_MOT">Mot a mot</option>
      <option value="SYLLABES">Syllabes</option>
    </select>
    <select class="tts-style">
      <option value="regles" selected>Regles</option>
      <option value="corpus">Corpus</option>
    </select>
    <select class="tts-voix">
      <option value="">Sans retimbre</option>
      <option value="siwis" selected>Siwis (F)</option>
      <option value="ezwa">Ezwa (F)</option>
      <option value="nadine">Nadine (F)</option>
      <option value="bernard">Bernard (M)</option>
      <option value="gilles">Gilles (M)</option>
      <option value="zeckou">Zeckou (M)</option>
    </select>
    <label class="tts-variante-label" style="display:flex; align-items:center; gap:0.3em; font-size:0.85em;">
      <span style="opacity:0.7">Homme</span>
      <input type="range" class="tts-variante" min="-1" max="1" step="0.1" value="0" style="width:80px;">
      <span style="opacity:0.7">Enfant</span>
    </label>
    <button class="tts-btn" type="button">Synthetiser</button>
  </div>
  <div class="tts-progress-container"><div class="tts-progress"></div></div>
  <pre class="tts-output">Cliquez sur le bouton pour synthetiser.</pre>
</div>

<script src="{{ '/assets/js/tts-diphone-demo.js' | relative_url }}?v=2"></script>

---

## Applications

- **Apprentissage de la lecture** : le mode syllabes du TTS Diphone lit chaque syllabe separement, synchronise avec l'affichage colore des groupes de lecture.
- **Livres audio et narration** : le Multi-Speaker permet de donner une voix differente a chaque personnage, avec des styles adaptes (narratif, dialogue, expressif).
- **Applications educatives** : voix adaptee au public (enfant, adulte) grace au curseur de variante vocale.
- **Assistants vocaux** : synthese rapide (~50x temps reel) et legere (pas de GPU) pour les applications embarquees.
- **Accessibilite** : lecture a voix haute de tout contenu textuel avec controle du debit et des pauses.

---

## En savoir plus

Documentation technique de chaque moteur :

- [TTS Multi-Speaker]({{ '/developpement/modules/metiers/tts-multi/' | relative_url }}) — modele neuronal multi-voix
- [TTS Monospeaker]({{ '/developpement/modules/metiers/tts-mono/' | relative_url }}) — modele neuronal mono-voix
- [TTS Diphone]({{ '/developpement/modules/metiers/tts-diphone/' | relative_url }}) — synthese par concatenation
- [Conversion vocale]({{ '/developpement/modules/metiers/vc/' | relative_url }}) — changement de timbre

---

## Contact

Pour integrer la synthese vocale dans votre projet : [admin@lectura.world](mailto:admin@lectura.world)
