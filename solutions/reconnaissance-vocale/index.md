---
title: Reconnaissance vocale
layout: default
permalink: /solutions/reconnaissance-vocale/
redirect_from:
  - /solutions/stt/
---

Lectura propose un pipeline de transcription audio du français en deux couches : un décodeur acoustique (audio vers phonèmes IPA) et un convertisseur (phonèmes vers texte orthographique). Le décodeur est un petit modèle (13 millions de paramètres, 50 Mo), qui tourne sans carte graphique. Sa sortie phonétique entend ce qui est réellement prononcé, y compris les erreurs de lecture : un atout pour accompagner un lecteur.

---

## Ce que Lectura est capable de faire

| Capacité | Description |
|----------|-------------|
| **Transcription phonétique** | Audio vers phonèmes IPA avec séparateurs de mots, liaisons et ponctuation |
| **Transcription orthographique** | Audio vers texte français avec majuscules, élisions et ponctuation |
| **Reconnaissance de formules** | Nombres, dates, sigles, heures détectés automatiquement dans la parole |
| **Transcription de formules** | Modèle spécialisé pour la saisie vocale de données structurées (87 tokens sémantiques) |

| Métrique (génération actuelle, FLEURS test, octobre 2026) | Score |
|----------|-------|
| WER (pipeline complet) | **15,7 %** |
| PER (décodeur phonétique) | **5,7 %** |
| Référence : Whisper small (244 M paramètres), mesuré avec la même normalisation | 13,3 % de WER |

La démo ci-dessous et [LecturaVoice](https://voice.lectura.world) utilisent la génération actuelle.

---

## Essayer en ligne

*La démo utilise l'API Lectura — enregistrez votre voix ou chargez un fichier audio.*

<style>
#ctc-output-ipa, #ctc-output-texte {
  white-space: normal;
  word-wrap: break-word;
  line-height: 1.8;
  font-size: 1.05em;
}
#ctc-output-ipa .ctc-word {
  display: inline-block;
  background: var(--code-bg, #f5f5f5);
  border-radius: 4px;
  padding: 2px 6px;
  margin: 2px 4px 2px 0;
}
.ctc-output-label {
  font-weight: bold;
  font-size: 0.85em;
  color: var(--muted-fg, #888);
  margin-bottom: 4px;
}
.ctc-output-block {
  margin-bottom: 12px;
}
.ctc-muted {
  color: var(--muted-fg, #888);
  font-style: italic;
}
#ctc-timestamps {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9em;
}
#ctc-timestamps th, #ctc-timestamps td {
  padding: 4px 8px;
  border-bottom: 1px solid var(--border-color, #e0e0e0);
  text-align: left;
}
#ctc-timestamps th {
  font-weight: 600;
  color: var(--muted-fg, #888);
  font-size: 0.85em;
}
#ctc-timestamps td:first-child {
  font-family: monospace;
}
</style>

<div class="ctc-demo">
  <div class="ctc-input-section">
    <label>Audio source :</label>
    <div class="vc-input-buttons">
      <span class="vc-file-wrapper">
        <input type="file" id="ctc-audio-file" accept="audio/*" style="display:none;">
        <button type="button" id="ctc-file-btn" class="vc-btn-secondary">Parcourir</button>
        <span id="ctc-file-name">(Aucun fichier)</span>
      </span>
      <span class="vc-separator">ou</span>
      <button type="button" id="ctc-record-btn" class="vc-btn-secondary">&#x1F3A4; Enregistrer</button>
      <span id="ctc-record-status"></span>
    </div>
    <audio id="ctc-audio-preview" controls style="display:none; width:100%; margin-top:8px;"></audio>
  </div>

  <div class="ctc-input-section" style="margin-top:8px;">
    <label for="ctc-mode">Mode :</label>
    <select id="ctc-mode" class="vc-btn-secondary" style="padding:4px 8px;">
      <option value="auto">Nombres et dates en chiffres</option>
      <option value="texte">Tout en lettres</option>
    </select>
  </div>

  <button type="button" id="ctc-transcribe-btn" class="tts-btn">Transcrire</button>
  <div class="tts-progress-container"><div class="tts-progress" id="ctc-progress"></div></div>

  <div class="ctc-output-block">
    <div class="ctc-output-label">Phonétique (IPA)</div>
    <pre class="tts-output" id="ctc-output-ipa">Sélectionnez un fichier audio ou enregistrez votre voix, puis cliquez sur Transcrire.</pre>
  </div>
  <div class="ctc-output-block">
    <div class="ctc-output-label">Texte (STT)</div>
    <pre class="tts-output" id="ctc-output-texte"></pre>
  </div>
  <div class="ctc-output-block">
    <div class="ctc-output-label">Timestamps</div>
    <table class="tts-timings" id="ctc-timestamps"></table>
  </div>
</div>

<script src="{{ '/assets/js/ctc-demo.js' | relative_url }}"></script>

---

## Applications

- **Sous-titrage** : transcription automatique de vidéos et podcasts en français.
- **Saisie vocale** : dictée pour applications et formulaires, avec reconnaissance des nombres et dates.
- **Analyse de contenu** : indexation et recherche dans des archives audio.
- **Applications embarquées** : transcription sur appareil, grâce à la taille réduite du décodeur.
- **Saisie de données structurées** : le modèle STT-Formules reconnaît directement les nombres, mois, devises et lettres pour la saisie vocale de formulaires.

---

## En savoir plus

- [Documentation technique STT]({{ '/developpement/modules/metiers/stt/' | relative_url }}) — architecture de la première génération (v0)
- [Graphémiseur (P2G)]({{ '/developpement/modules/metiers/p2g/' | relative_url }}) — le convertisseur phonèmes vers texte utilisé dans le pipeline

---

## Contact

Pour intégrer la reconnaissance vocale dans votre projet : [nous contacter]({{ '/contact/' | relative_url }})
