---
title: Pipeline STT
layout: default
permalink: /developpement/modules/metiers/stt/
redirect_from:
  - /solutions/modules/ctc/
---

<div class="module-header">
  <h1>Pipeline STT</h1>
  <p class="module-tagline">Audio français → texte orthographique — pipeline Décodeur + P2G + Formules</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-stt/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/STT" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-stt</code>
  </div>
</div>

## Présentation

Le pipeline STT orchestre le [Décodeur]({{ '/developpement/modules/outils/ctc/' | relative_url }}) avec le [pipeline P2G]({{ '/developpement/modules/metiers/p2g/' | relative_url }}) pour transcrire de l'audio en texte français orthographique.

### Pipeline

```
Audio 16kHz mono
     │
     ▼
┌─────────────┐
│ CTC          │  CNN-BiGRU-CTC medium (10.6M params)
│              │  → phones IPA avec séparateurs et ponctuation
└─────┬───────┘
      │
      ▼
┌─────────────┐
│ _parse_ctc   │  extraction mots IPA + ponctuation + liaisons
└─────┬───────┘
      │
      ▼
┌─────────────┐
│ Pipeline P2G │  graphémiseur + formules + noms propres
└─────┬───────┘
      │
      ▼
┌─────────────┐
│ _assembler   │  majuscules + élisions + ponctuation
└─────┬───────┘
      │
      ▼
  Texte français orthographié
```

### Benchmark

| Métrique | Score |
|----------|-------|
| **WER** (parole courante) | **~15%** |
| **PER** (CTC seul) | **~4.34%** |

Pipeline CTC + P2G v7 + post-traitement grammatical. Performances comparables à Whisper small (241M params, 461 Mo) avec un pipeline **10x plus léger** (~43 Mo de modèles).

---

## Essayer en ligne

*La démo utilise l'API Lectura — aucun téléchargement nécessaire.*

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
      <option value="auto">Auto (nombres, dates, sigles…)</option>
      <option value="formule">Formule (tout detecter)</option>
      <option value="texte">Texte (sigles uniquement)</option>
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
</div>

<script src="{{ '/assets/js/ctc-demo.js' | relative_url }}"></script>

---

## Exemple de code

```python
from lectura_stt import creer_engine

engine = creer_engine()  # CTC + P2G automatique

result = engine.transcrire(audio, sr=16000)
print(result.ipa)    # "b ɔ̃ ʒ u ʁ | l ə | m ɔ̃ d ."
print(result.texte)  # "Bonjour le monde."
```

---

## Briques utilisées

| Brique | Package | Rôle dans le pipeline |
|--------|---------|----------------------|
| [Décodeur]({{ '/developpement/modules/outils/ctc/' | relative_url }}) | `lectura-decodeur` | Décodeur phonétique (audio → phones IPA) |
| [Graphémiseur]({{ '/developpement/modules/outils/graphemiseur/' | relative_url }}) | `lectura-graphemiseur` | Modèle P2G core |
| [Pipeline P2G]({{ '/developpement/modules/metiers/p2g/' | relative_url }}) | `lectura-p2g` | Formules + noms propres |
| [Formules]({{ '/developpement/modules/outils/formules/' | relative_url }}) | `lectura-formules` | Nombres, sigles (mode tolerance="stt") |

---

## Installation

```bash
# Pipeline STT complet (audio → texte, avec P2G + formules)
pip install lectura-stt

# STT avec backend ONNX local (inférence rapide décodeur + graphémiseur)
pip install lectura-stt[onnx]

# Décodeur seul (audio → phones IPA, sans P2G) — voir page Décodeur
pip install lectura-decodeur[onnx]
```

| Extra | Contenu |
|-------|---------|
| `[onnx]` | Backends ONNX locaux pour le décodeur et le graphémiseur (inférence offline) |

Le pipeline P2G est inclus par défaut (dépendance dure).

Par défaut, les modules utilisent l'**API Lectura** si aucun modèle local n'est trouvé.

---

## Caractéristiques techniques

- **WER ~15%** (parole courante), comparable à Whisper small avec 10x moins de paramètres
- **Pipeline optimal** : CTC → segmentation phonétique → P2G v7 (lex-select) → merge_and_rescore → post-traitement grammatical → texte
- **P2G optionnel** : fonctionne en mode phones seuls si P2G non installé
- **Cascade P2G** : `lectura-p2g` (complet) → `lectura-graphemiseur` (core) → aucun
- **Élisions automatiques** : l', d', j', n', s', qu', m', t', c'
- **Ponctuation et majuscules** : reconstruction fidèle du texte
- **Formules** : nombres, sigles (via `lectura-p2g`)
- **Python 3.10+** avec type hints complets
- **Licence** : AGPL-3.0 (code) — modèles sous [licence commerciale](mailto:admin@lectura.world)
