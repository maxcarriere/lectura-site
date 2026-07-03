---
title: Synthèse vocale
layout: default
permalink: /solutions/synthese-vocale/
redirect_from:
  - /solutions/tts/
  - /solutions/tts/multispeaker/
  - /solutions/tts/monospeaker/
  - /solutions/tts/diphone/
---

Lectura propose trois moteurs de synthèse vocale pour le français, chacun adapté à un usage différent. Tous partagent le même pipeline d'analyse du langage et acceptent une **entrée phonémique directe** (IPA), qui est la base du pipeline de synthèse. Chaque moteur produit des **timestamps par phonème**, permettant un surlignage synchronisé mot à mot et même syllabique (une capacité propre au pipeline Lectura). Trois modes de lecture sont disponibles : **fluide**, **mot à mot** (groupe de lecture par groupe de lecture) et **syllabes**. Un système de **conversion vocale** (6 voix, blend de timbres, variantes homme/enfant) est combinable avec chaque moteur.

---

<script src="{{ '/assets/js/tts-modes.js' | relative_url }}?v=1"></script>

## Trois moteurs complémentaires

### Multi-Speaker — 6 voix, 7 styles

Deux modèles au choix : **High** (Matcha-Conformer, meilleure qualité) et **Light** (FastPitch, plus rapide). **6 voix françaises** (3 féminines, 3 masculines) et **7 styles expressifs** (neutre, narratif, dialogue, expressif, méditatif, rapide, lent). Changement de voix dynamique. ~30-50x temps réel sur CPU.

<div class="tts-multi-demo">
  <div style="display: flex; gap: 0.5em; margin: 0.5em 0; flex-wrap: wrap; align-items: center;">
    <input type="text" class="tts-input" value="Bonjour, je suis la voix de Lectura." placeholder="Entrez du texte français..." style="flex:1; min-width:200px;">
    <button class="tts-btn" type="button">Synthétiser</button>
  </div>
  <div style="display: flex; gap: 0.5em; margin: 0.5em 0; flex-wrap: wrap; align-items: center;">
    <span style="font-size:0.85em; opacity:0.7;">Voix :</span>
    <select class="tts-speaker">
      <option value="siwis" selected>Siwis (par défaut)</option>
      <option value="ezwa">Ezwa (F)</option>
      <option value="nadine">Nadine (F)</option>
      <option value="bernard">Bernard (M)</option>
      <option value="gilles">Gilles (M)</option>
      <option value="zeckou">Zeckou (M)</option>
    </select>
  </div>
  <div style="display: flex; gap: 0.5em; margin: 0.5em 0; flex-wrap: wrap; align-items: center;">
    <span style="font-size:0.85em; opacity:0.7;">Style :</span>
    <select class="tts-style">
      <option value="neutre" selected>Neutre</option>
      <option value="narratif">Narratif</option>
      <option value="dialogue">Dialogue</option>
      <option value="expressif">Expressif</option>
      <option value="meditatif">Méditatif</option>
      <option value="rapide">Rapide</option>
      <option value="lent">Lent</option>
    </select>
    <span style="opacity:0.5;">|</span>
    <span style="font-size:0.85em; opacity:0.7;">Mode :</span>
    <select class="tts-mode">
      <option value="FLUIDE" selected>Fluide</option>
      <option value="MOT_A_MOT">Mot à mot</option>
      <option value="SYLLABES">Syllabes</option>
    </select>
    <span style="opacity:0.5;">|</span>
    <span style="font-size:0.85em; opacity:0.7;">Modèle :</span>
    <select class="tts-model">
      <option value="high" selected>High (Conformer)</option>
      <option value="light">Light (FastPitch)</option>
    </select>
  </div>
  <div class="tts-progress-container"><div class="tts-progress"></div></div>
  <pre class="tts-output">Cliquez sur le bouton pour synthétiser.</pre>
  <table class="tts-timings"></table>
</div>

<script src="{{ '/assets/js/tts-multi-demo.js' | relative_url }}?v=3"></script>

---

### Monospeaker — voix haute qualité, 7 styles

Deux modèles au choix : **High** (Matcha-Conformer, ~29 Mo, meilleure qualité) et **Light** (FastPitch, ~28 Mo, plus rapide). Optimisé pour une voix unique (Siwis) avec **7 styles expressifs** et des **contrôles prosodiques fins** (pitch, énergie, débit, pauses, vecteur style 5D). Retimbre optionnel via conversion vocale. ~30-50x temps réel sur CPU.

<div class="tts-demo">
  <div style="display: flex; gap: 0.5em; margin: 0.5em 0; flex-wrap: wrap; align-items: center;">
    <input type="text" class="tts-input" value="Le soleil brille sur la ville." placeholder="Entrez du texte français..." style="flex:1; min-width:200px;">
    <button class="tts-btn" type="button">Synthétiser</button>
  </div>
  <div style="display: flex; gap: 0.5em; margin: 0.5em 0; flex-wrap: wrap; align-items: center;">
    <span style="font-size:0.85em; opacity:0.7;">Changement de timbre :</span>
    <select class="tts-voix">
      <option value="">Aucun (par défaut)</option>
      <option value="siwis">Siwis (F)</option>
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
  </div>
  <div style="display: flex; gap: 0.5em; margin: 0.5em 0; flex-wrap: wrap; align-items: center;">
    <span style="font-size:0.85em; opacity:0.7;">Style :</span>
    <select class="tts-style">
      <option value="neutre" selected>Neutre</option>
      <option value="narratif">Narratif</option>
      <option value="dialogue">Dialogue</option>
      <option value="expressif">Expressif</option>
      <option value="meditatif">Méditatif</option>
      <option value="rapide">Rapide</option>
      <option value="lent">Lent</option>
    </select>
    <span style="opacity:0.5;">|</span>
    <span style="font-size:0.85em; opacity:0.7;">Mode :</span>
    <select class="tts-mode">
      <option value="FLUIDE" selected>Fluide</option>
      <option value="MOT_A_MOT">Mot à mot</option>
      <option value="SYLLABES">Syllabes</option>
    </select>
    <span style="opacity:0.5;">|</span>
    <span style="font-size:0.85em; opacity:0.7;">Modèle :</span>
    <select class="tts-model">
      <option value="high" selected>High (Conformer)</option>
      <option value="light">Light (FastPitch)</option>
    </select>
  </div>
  <div class="tts-progress-container"><div class="tts-progress"></div></div>
  <pre class="tts-output">Cliquez sur le bouton pour synthétiser.</pre>
  <table class="tts-timings"></table>
</div>

<script src="{{ '/assets/js/tts-demo.js' | relative_url }}?v=5"></script>

---

### Diphone — lecture adaptée

Un moteur expérimental qui explore la piste non neurale et qui fonctionne par concaténation de diphones (WORLD, 44.1 kHz), basé sur le moyennage des unités pour une prononciation précise, uniforme et fiable , ce qui en fait un outil approprié pour la **lecture syllabique**. La prosodie se fait par règles (intonation déclarative, interrogative, exclamative), et le timbre peut être restauré ensuite via la technologie de conversion vocale.

<div class="tts-diphone-demo">
  <div style="display: flex; gap: 0.5em; margin: 0.5em 0; flex-wrap: wrap; align-items: center;">
    <input type="text" class="tts-input" value="Le chat dort sur le canapé." placeholder="Entrez du texte français..." style="flex:1; min-width:200px;">
    <button class="tts-btn" type="button">Synthétiser</button>
  </div>
  <div style="display: flex; gap: 0.5em; margin: 0.5em 0; flex-wrap: wrap; align-items: center;">
    <span style="font-size:0.85em; opacity:0.7;">Changement de timbre :</span>
    <select class="tts-voix">
      <option value="">Aucun (par défaut)</option>
      <option value="siwis">Siwis (F)</option>
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
  </div>
  <div style="display: flex; gap: 0.5em; margin: 0.5em 0; flex-wrap: wrap; align-items: center;">
    <span style="font-size:0.85em; opacity:0.7;">Mode :</span>
    <select class="tts-mode">
      <option value="FLUIDE">Fluide</option>
      <option value="MOT_A_MOT">Mot à mot</option>
      <option value="SYLLABES">Syllabes</option>
    </select>
  </div>
  <div class="tts-progress-container"><div class="tts-progress"></div></div>
  <pre class="tts-output">Cliquez sur le bouton pour synthétiser.</pre>
</div>

<script src="{{ '/assets/js/tts-diphone-demo.js' | relative_url }}?v=3"></script>

---

## Applications

- **Apprentissage de la lecture** : les modes mot à mot et syllabes sont disponibles sur tous les moteurs. Le Diphone est particulièrement précis pour prononcer chaque syllabe séparément. Les timestamps par phonème permettent un surlignage syllabique synchronisé avec l'audio.
- **Livres audio et narration** : le Multi-Speaker permet de donner une voix différente à chaque personnage, avec des styles adaptés (narratif, dialogue, expressif).
- **Applications éducatives** : voix adaptée au public (enfant, adulte) grâce au curseur de variante vocale.
- **Assistants vocaux** : synthèse rapide (~30-50x temps réel) et légère (pas de GPU) pour les applications embarquées.
- **Accessibilité** : lecture à voix haute de tout contenu textuel avec contrôle du débit et des pauses.

---

## En savoir plus

Documentation technique de chaque moteur :

- [Pipeline TTS]({{ '/developpement/modules/metiers/tts/' | relative_url }}) — page commune (G2P + choix moteur + VC)
- [TTS Multi-Speaker]({{ '/developpement/modules/outils/tts-multi/' | relative_url }}) — modèle neuronal multi-voix
- [TTS Monospeaker]({{ '/developpement/modules/outils/tts-mono/' | relative_url }}) — modèle neuronal mono-voix
- [TTS Diphone]({{ '/developpement/modules/outils/tts-diphone/' | relative_url }}) — synthèse par concaténation
- [Conversion vocale]({{ '/developpement/modules/metiers/vc/' | relative_url }}) — changement de timbre

---

## Contact

Pour intégrer la synthèse vocale dans votre projet : [nous contacter]({{ '/contact/' | relative_url }})
