---
title: VoiceConversion
layout: default
permalink: /developpement/modules/metiers/vc/
redirect_from:
  - /solutions/modules/vc/
---

<div class="module-header">
  <h1>Lectura VoiceConversion</h1>
  <p class="module-tagline">Conversion vocale neuronale français — méta-package unifié RVC + OpenVoice zero-shot</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-vc/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/VC" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-vc</code>
  </div>
</div>

## Présentation

Méta-package de conversion vocale pour le français, regroupant deux sous-modules spécialisés :

- **[VC ZeroShot]({{ '/developpement/modules/metiers/vc-zeroshot/' | relative_url }})** (`lectura-vc-zeroshot`, ~126 Mo) : OpenVoice v2 — conversion vers n'importe quelle voix via un extrait de référence ou un preset, avec blend de voix et décalage de formants
- **[VC Locuteurs]({{ '/developpement/modules/metiers/vc-locuteurs/' | relative_url }})** (`lectura-vc-locuteurs`, ~1.4 Go) : RVC — conversion vers 6 voix françaises pré-entraînées

Le méta-package `lectura-vc` offre une façade unifiée `VCEngine` qui délègue automatiquement au bon sous-module.

| Caractéristique | Valeur |
|-----------------|--------|
| **Voix RVC** | 6 speakers (3F + 3M) : Ezwa, Nadine, Siwis, Bernard, Gilles, Zeckou |
| **Zero-shot** | OpenVoice v2 — n'importe quelle voix avec un preset ou 5-10s de référence |
| **Presets** | 6 voix pré-calculées (speaker embeddings moyennées sur 100 échantillons) |
| **Blend** | Mélange pondéré de presets ou d'extraits audio |
| **Modes** | rvc, zeroshot, cascade (RVC + OpenVoice), auto |
| **Modèles** | ~1.52 Go total (126 Mo zero-shot + 1.4 Go RVC) |
| **Backends** | ONNX Runtime pur (pas de PyTorch) |

---

## Essayer en ligne

*La démo utilise l'API Lectura — aucun téléchargement nécessaire.*

<div class="vc-demo">
  <div class="vc-controls">
    <div class="vc-mode-select">
      <label for="vc-mode">Mode :</label>
      <select id="vc-mode">
        <option value="rvc" selected>RVC (voix pré-entraînée)</option>
        <option value="zeroshot">Zero-shot (voix arbitraire)</option>
      </select>
    </div>

    <div class="vc-rvc-options">
      <label for="vc-speaker">Voix cible :</label>
      <select id="vc-speaker">
        <option value="siwis">Siwis (F)</option>
        <option value="ezwa">Ezwa (F)</option>
        <option value="nadine">Nadine (F)</option>
        <option value="bernard" selected>Bernard (M)</option>
        <option value="gilles">Gilles (M)</option>
        <option value="zeckou">Zeckou (M)</option>
      </select>
    </div>

    <div class="vc-zeroshot-options" style="display:none;">
      <div style="display:flex; gap:0.5em; align-items:center; flex-wrap:wrap; margin-bottom:0.3em;">
        <label for="vc-zs-source">Source :</label>
        <select id="vc-zs-source">
          <option value="preset" selected>Preset</option>
          <option value="file">Fichier audio</option>
        </select>
      </div>
      <div id="vc-preset-options">
        <label for="vc-preset">Preset :</label>
        <select id="vc-preset">
          <option value="siwis" selected>Siwis (F)</option>
          <option value="ezwa">Ezwa (F)</option>
          <option value="nadine">Nadine (F)</option>
          <option value="bernard">Bernard (M)</option>
          <option value="gilles">Gilles (M)</option>
          <option value="zeckou">Zeckou (M)</option>
        </select>
      </div>
      <div id="vc-file-reference" style="display:none;">
        <label for="vc-reference">Audio de référence :</label>
        <input type="file" id="vc-reference" accept="audio/*">
      </div>
      <div style="display:flex; gap:0.3em; align-items:center; margin-top:0.3em;">
        <label for="vc-sr-override" style="font-size:0.9em;">Variante formants :</label>
        <select id="vc-sr-override">
          <option value="">Neutre</option>
          <option value="16000">Légèrement aigu</option>
          <option value="11025">Aigu (enfant)</option>
          <option value="33000">Légèrement grave</option>
          <option value="44100">Grave (homme)</option>
        </select>
      </div>
    </div>
  </div>

  <div class="vc-input-section">
    <label>Audio source :</label>
    <div class="vc-input-buttons">
      <span class="vc-file-wrapper">
        <input type="file" id="vc-audio-file" accept="audio/*" style="display:none;">
        <button type="button" id="vc-file-btn" class="vc-btn-secondary">Parcourir</button>
        <span id="vc-file-name">(Aucun fichier sélectionné)</span>
      </span>
      <span class="vc-separator">ou</span>
      <button type="button" id="vc-record-btn" class="vc-btn-secondary">&#x1F3A4; Enregistrer</button>
      <span id="vc-record-status"></span>
    </div>
    <audio id="vc-audio-preview" controls style="display:none; width:100%; margin-top:8px;"></audio>
  </div>

  <button type="button" id="vc-convert-btn" class="tts-btn">Convertir</button>
  <div class="tts-progress-container"><div class="tts-progress" id="vc-progress"></div></div>
  <pre class="tts-output" id="vc-output">Sélectionnez un fichier audio ou enregistrez votre voix, puis cliquez sur Convertir.</pre>
  <audio id="vc-audio-result" controls style="display:none; width:100%; margin-top:8px;"></audio>
</div>

<script src="{{ '/assets/js/vc-demo.js' | relative_url }}"></script>

---

## Exemple de code

```python
from lectura_vc import creer_engine

engine = creer_engine(mode="auto")

# Conversion RVC vers une voix pré-entraînée
audio, sr = engine.convert(
    audio="input.wav",
    speaker="bernard",
    mode="rvc",
)

# Conversion zero-shot avec un preset
audio, sr = engine.convert(
    audio="input.wav",
    reference="siwis",       # preset pré-calculé
    mode="zeroshot",
)

# Blend pondéré de presets
audio, sr = engine.convert(
    audio="input.wav",
    reference={"siwis": 0.5, "nadine": 0.3, "ezwa": 0.2},
    mode="zeroshot",
)

# Zero-shot depuis un fichier audio de référence
audio, sr = engine.convert(
    audio="input.wav",
    reference="reference_5s.wav",
    mode="zeroshot",
    tau=0.3,
)

# Mode cascade : RVC (proxy genre) + OpenVoice (timbre exact)
audio, sr = engine.convert(
    audio="input.wav",
    speaker="nadine",
    reference="cible.wav",
    mode="cascade",
)

import soundfile as sf
sf.write("output.wav", audio, sr)
```

```python
# Presets et speakers disponibles
from lectura_vc import RVC_SPEAKERS, PRESET_SPEAKERS

print(RVC_SPEAKERS)
# ['ezwa', 'nadine', 'bernard', 'gilles', 'zeckou', 'siwis']

print(PRESET_SPEAKERS)
# ['siwis', 'ezwa', 'nadine', 'bernard', 'gilles', 'zeckou']
```

---

## Architecture

```
                        lectura-vc (meta-package)
                     ┌────────────┴────────────┐
                     v                         v
         lectura-vc-zeroshot          lectura-vc-locuteurs
           OpenVoice v2 ONNX            RVC ONNX (6 voix)
             ~126 Mo                       ~1.4 Go


Mode RVC :
  Audio source --> HuBERT (features) --> RMVPE (F0)
                                            |
                                Synthesizer_{speaker} (ONNX)
                                            |
                                     Audio converti


Mode Zero-shot (OpenVoice v2) :
  Audio source  --> SE extractor --> source embedding
  Reference     --> SE extractor --> target embedding
                     (ou preset)           |
                                 OpenVoice VC (ONNX)
                                 (audio + src_se + tgt_se + tau)
                                           |
                                    Audio converti


Mode Cascade :
  Audio source --> [RVC speaker proxy] --> [OpenVoice timbre] --> Audio converti
```

Les 10 modèles ONNX :
- `openvoice_se.onnx` (3.2 Mo) — extraction de speaker embedding
- `openvoice_vc.onnx` (123 Mo) — conversion zero-shot
- `hubert.onnx` (361 Mo) — extraction de features vocales (RVC)
- `rmvpe.onnx` (345 Mo) — estimation de fréquence fondamentale (RVC)
- 6x `synthesizer_{speaker}.onnx` (~116 Mo) — synthesizers RVC par voix

---

## Installation

```bash
# Meta-package complet (RVC + zero-shot)
pip install lectura-vc

# Sous-module zero-shot seul (léger, ~126 Mo)
pip install lectura-vc-zeroshot

# Sous-module RVC seul (6 voix, ~1.4 Go)
pip install lectura-vc-locuteurs
```

Les modules publics utilisent l'API Lectura pour l'inférence. Les backends locaux ONNX nécessitent les modèles pré-entraînés, disponibles sous [licence commerciale](mailto:admin@lectura.world).

---

## Sous-modules

| Package | Taille modèles | Contenu |
|---------|---------------|---------|
| [`lectura-vc-zeroshot`]({{ '/developpement/modules/metiers/vc-zeroshot/' | relative_url }}) | ~126 Mo | OpenVoice v2, presets, blend, trick SR |
| [`lectura-vc-locuteurs`]({{ '/developpement/modules/metiers/vc-locuteurs/' | relative_url }}) | ~1.4 Go | RVC, 6 voix pré-entraînées |
| `lectura-vc` | — | Méta-package, façade VCEngine unifiée |

---

## Caractéristiques techniques

- **RVC ONNX** : HuBERT + RMVPE + Synthesizer, 6 voix pré-entraînées
- **OpenVoice v2 ONNX** : conversion zero-shot, n'importe quelle voix cible
- **6 presets** : speaker embeddings pré-calculés (moyennes sur 100 échantillons)
- **Blend pondéré** : mélange linéaire de presets ou d'extraits audio
- **Trick SR** : décalage des formants pour variantes homme/enfant
- **4 modes** : rvc, zeroshot, cascade, auto (choix automatique)
- **Auto-adaptation** : pitch et protection ajustés automatiquement selon le speaker
- **ONNX Runtime pur** : pas de dépendance PyTorch
- **Factory `creer_engine()`** : détection automatique des modèles
- **Lazy loading** : chaque backend chargé à la demande
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (code) — les modèles pré-entraînés sont sous [licence commerciale](mailto:admin@lectura.world)
