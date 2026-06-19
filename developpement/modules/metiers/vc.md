---
title: Pipeline VC
layout: default
permalink: /developpement/modules/metiers/vc/
redirect_from:
  - /solutions/modules/vc/
---

<div class="module-header">
  <h1>Pipeline VoiceConversion</h1>
  <p class="module-tagline">Méta-package unifié — sélection automatique ZeroShot (OpenVoice) ou Locuteurs (RVC)</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-vc/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/VC" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-vc</code>
  </div>
</div>

## Présentation

Méta-package de conversion vocale pour le français, offrant une façade unifiée `VCEngine` qui sélectionne automatiquement le bon sous-module selon le mode demandé :

- **[VC ZeroShot]({{ '/developpement/modules/outils/vc-zeroshot/' | relative_url }})** (`lectura-vc-zeroshot`, ~126 Mo) : OpenVoice v2 — conversion vers n'importe quelle voix via un extrait de référence ou un preset
- **[VC Locuteurs]({{ '/developpement/modules/outils/vc-locuteurs/' | relative_url }})** (`lectura-vc-locuteurs`, ~1.4 Go) : RVC — conversion vers 6 voix françaises pré-entraînées

| Caractéristique | Valeur |
|-----------------|--------|
| **Modes** | rvc, zeroshot, cascade (RVC + OpenVoice), auto |
| **Voix RVC** | 6 speakers (3F + 3M) |
| **Zero-shot** | N'importe quelle voix avec un preset ou 5-10s de référence |
| **Presets** | 6 voix pré-calculées |
| **Blend** | Mélange pondéré de presets ou d'extraits audio |
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

# Mode RVC (voix pré-entraînée)
audio, sr = engine.convert(audio="input.wav", speaker="bernard", mode="rvc")

# Mode Zero-shot (preset)
audio, sr = engine.convert(audio="input.wav", reference="siwis", mode="zeroshot")

# Blend pondéré
audio, sr = engine.convert(
    audio="input.wav",
    reference={"siwis": 0.5, "nadine": 0.3, "ezwa": 0.2},
    mode="zeroshot",
)

# Mode cascade : RVC (proxy genre) + OpenVoice (timbre exact)
audio, sr = engine.convert(
    audio="input.wav", speaker="nadine", reference="cible.wav", mode="cascade",
)
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
```

---

## Briques utilisées

| Brique | Rôle |
|--------|------|
| [VC ZeroShot]({{ '/developpement/modules/outils/vc-zeroshot/' | relative_url }}) | OpenVoice v2 — conversion zero-shot |
| [VC Locuteurs]({{ '/developpement/modules/outils/vc-locuteurs/' | relative_url }}) | RVC — 6 voix pré-entraînées |

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
