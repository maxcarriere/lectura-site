---
title: VoiceConversion
layout: default
permalink: /solutions/modules/vc/
---

<div class="module-header">
  <h1>Lectura VoiceConversion</h1>
  <p class="module-tagline">Conversion vocale neuronale francais — meta-package unifie RVC + OpenVoice zero-shot</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-vc/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/VC" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-vc</code>
  </div>
</div>

## Presentation

Meta-package de conversion vocale pour le francais, regroupant deux sous-modules specialises :

- **[VC ZeroShot]({{ '/solutions/modules/vc-zeroshot/' | relative_url }})** (`lectura-vc-zeroshot`, ~126 Mo) : OpenVoice v2 — conversion vers n'importe quelle voix via un extrait de reference ou un preset, avec blend de voix et decalage de formants
- **[VC Locuteurs]({{ '/solutions/modules/vc-locuteurs/' | relative_url }})** (`lectura-vc-locuteurs`, ~1.4 Go) : RVC — conversion vers 6 voix francaises pre-entrainees

Le meta-package `lectura-vc` offre une facade unifiee `VCEngine` qui delegue automatiquement au bon sous-module.

| Caracteristique | Valeur |
|-----------------|--------|
| **Voix RVC** | 6 speakers (3F + 3M) : Ezwa, Nadine, Siwis, Bernard, Gilles, Zeckou |
| **Zero-shot** | OpenVoice v2 — n'importe quelle voix avec un preset ou 5-10s de reference |
| **Presets** | 6 voix pre-calculees (speaker embeddings moyennes sur 100 echantillons) |
| **Blend** | Melange pondere de presets ou d'extraits audio |
| **Modes** | rvc, zeroshot, cascade (RVC + OpenVoice), auto |
| **Modeles** | ~1.52 Go total (126 Mo zero-shot + 1.4 Go RVC) |
| **Backends** | ONNX Runtime pur (pas de PyTorch) |

---

## Essayer en ligne

*La demo utilise l'API Lectura — aucun telechargement necessaire.*

<div class="vc-demo">
  <div class="vc-controls">
    <div class="vc-mode-select">
      <label for="vc-mode">Mode :</label>
      <select id="vc-mode">
        <option value="rvc" selected>RVC (voix pre-entrainee)</option>
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
        <label for="vc-reference">Audio de reference :</label>
        <input type="file" id="vc-reference" accept="audio/*">
      </div>
      <div style="display:flex; gap:0.3em; align-items:center; margin-top:0.3em;">
        <label for="vc-sr-override" style="font-size:0.9em;">Variante formants :</label>
        <select id="vc-sr-override">
          <option value="">Neutre</option>
          <option value="16000">Legerement aigu</option>
          <option value="11025">Aigu (enfant)</option>
          <option value="33000">Legerement grave</option>
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
        <span id="vc-file-name">(Aucun fichier selectionne)</span>
      </span>
      <span class="vc-separator">ou</span>
      <button type="button" id="vc-record-btn" class="vc-btn-secondary">&#x1F3A4; Enregistrer</button>
      <span id="vc-record-status"></span>
    </div>
    <audio id="vc-audio-preview" controls style="display:none; width:100%; margin-top:8px;"></audio>
  </div>

  <button type="button" id="vc-convert-btn" class="tts-btn">Convertir</button>
  <div class="tts-progress-container"><div class="tts-progress" id="vc-progress"></div></div>
  <pre class="tts-output" id="vc-output">Selectionnez un fichier audio ou enregistrez votre voix, puis cliquez sur Convertir.</pre>
  <audio id="vc-audio-result" controls style="display:none; width:100%; margin-top:8px;"></audio>
</div>

<script src="{{ '/assets/js/vc-demo.js' | relative_url }}"></script>

---

## Exemple de code

```python
from lectura_vc import creer_engine

engine = creer_engine(mode="auto")

# Conversion RVC vers une voix pre-entrainee
audio, sr = engine.convert(
    audio="input.wav",
    speaker="bernard",
    mode="rvc",
)

# Conversion zero-shot avec un preset
audio, sr = engine.convert(
    audio="input.wav",
    reference="siwis",       # preset pre-calcule
    mode="zeroshot",
)

# Blend pondere de presets
audio, sr = engine.convert(
    audio="input.wav",
    reference={"siwis": 0.5, "nadine": 0.3, "ezwa": 0.2},
    mode="zeroshot",
)

# Zero-shot depuis un fichier audio de reference
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

Les 10 modeles ONNX :
- `openvoice_se.onnx` (3.2 Mo) — extraction de speaker embedding
- `openvoice_vc.onnx` (123 Mo) — conversion zero-shot
- `hubert.onnx` (361 Mo) — extraction de features vocales (RVC)
- `rmvpe.onnx` (345 Mo) — estimation de frequence fondamentale (RVC)
- 6x `synthesizer_{speaker}.onnx` (~116 Mo) — synthesizers RVC par voix

---

## Installation

```bash
# Meta-package complet (RVC + zero-shot)
pip install lectura-vc

# Sous-module zero-shot seul (leger, ~126 Mo)
pip install lectura-vc-zeroshot

# Sous-module RVC seul (6 voix, ~1.4 Go)
pip install lectura-vc-locuteurs
```

Les modules publics utilisent l'API Lectura pour l'inference. Les backends locaux ONNX necessitent les modeles pre-entraines, disponibles sous [licence commerciale](mailto:admin@lectura.world).

---

## Sous-modules

| Package | Taille modeles | Contenu |
|---------|---------------|---------|
| [`lectura-vc-zeroshot`]({{ '/solutions/modules/vc-zeroshot/' | relative_url }}) | ~126 Mo | OpenVoice v2, presets, blend, trick SR |
| [`lectura-vc-locuteurs`]({{ '/solutions/modules/vc-locuteurs/' | relative_url }}) | ~1.4 Go | RVC, 6 voix pre-entrainees |
| `lectura-vc` | — | Meta-package, facade VCEngine unifiee |

---

## Caracteristiques techniques

- **RVC ONNX** : HuBERT + RMVPE + Synthesizer, 6 voix pre-entrainees
- **OpenVoice v2 ONNX** : conversion zero-shot, n'importe quelle voix cible
- **6 presets** : speaker embeddings pre-calcules (moyennes sur 100 echantillons)
- **Blend pondere** : melange lineaire de presets ou d'extraits audio
- **Trick SR** : decalage des formants pour variantes homme/enfant
- **4 modes** : rvc, zeroshot, cascade, auto (choix automatique)
- **Auto-adaptation** : pitch et protection ajustes automatiquement selon le speaker
- **ONNX Runtime pur** : pas de dependance PyTorch
- **Factory `creer_engine()`** : detection automatique des modeles
- **Lazy loading** : chaque backend charge a la demande
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (code) — les modeles pre-entraines sont sous [licence commerciale](mailto:admin@lectura.world)
