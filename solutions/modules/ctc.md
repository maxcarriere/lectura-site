---
title: CTC
layout: default
permalink: /solutions/modules/ctc/
---

<div class="module-header">
  <h1>Lectura CTC</h1>
  <p class="module-tagline">Decodeur phonetique CTC du francais — audio vers phones IPA (CNN-BiGRU-CTC)</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-ctc/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/CTC" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-ctc</code>
  </div>
</div>

## Presentation

Module de transcription phonetique du francais : convertit un signal audio en une sequence de phones IPA. Le modele CNN-BiGRU-CTC (3.5M parametres, PER ~6%) a ete entraine sur un corpus de parole francaise et produit une transcription phonetique fine avec separateurs de mots.

| Caracteristique | Valeur |
|-----------------|--------|
| **Architecture** | CNN Frontend (2 couches) + BiGRU (3 couches) + CTC head |
| **Parametres** | 3.5M |
| **Performance** | PER ~6% sur le corpus de test |
| **Vocabulaire** | 59 tokens (46 phones IPA + liaisons + ponctuation + speciaux) |
| **Audio** | PCM float32 mono, 16 kHz |
| **Mel** | 80 bins, n_fft=512, hop=160, win=400 |
| **Modele** | ONNX INT8, ~13 Mo |
| **Backends** | ONNX Runtime (local) ou API serveur |

---

## Essayer en ligne

*La demo utilise l'API Lectura — aucun telechargement necessaire.*

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

  <button type="button" id="ctc-transcribe-btn" class="tts-btn">Transcrire</button>
  <div class="tts-progress-container"><div class="tts-progress" id="ctc-progress"></div></div>
  <pre class="tts-output" id="ctc-output">Selectionnez un fichier audio ou enregistrez votre voix, puis cliquez sur Transcrire.</pre>
</div>

<script src="{{ '/assets/js/ctc-demo.js' | relative_url }}"></script>

---

## Exemple de code

```python
import numpy as np
from lectura_ctc import creer_engine

engine = creer_engine()

# Transcrire un fichier WAV (charger avec wave/soundfile)
import wave
with wave.open("bonjour.wav", "rb") as wf:
    sr = wf.getframerate()
    audio = np.frombuffer(
        wf.readframes(wf.getnframes()), dtype=np.int16
    ).astype(np.float32) / 32768.0

ipa = engine.transcrire(audio, sr=sr)
print(ipa)  # "b ɔ̃ ʒ u ʁ"
```

```bash
# CLI : transcrire un fichier
python -m lectura_ctc bonjour.wav

# CLI : enregistrer au micro
python -m lectura_ctc --micro

# CLI : enregistrer 5 secondes
python -m lectura_ctc --micro --duree 5

# CLI : mode continu (Ctrl+C pour quitter)
python -m lectura_ctc --micro --continu
```

---

## Architecture

```
Audio 16kHz mono
     │
     ▼
┌─────────────┐
│ Mel spectro  │  numpy pur (80 bins, 100 fps)
│ STFT + log   │
└─────┬───────┘
      │  (1, 1, 80, T)
      ▼
┌─────────────┐
│ CNN Frontend │  2x Conv2d stride 2 → subsampling ×4
└─────┬───────┘
      │  (1, T/4, 1280)
      ▼
┌─────────────┐
│ BiGRU ×3     │  3 couches bidirectionnelles
└─────┬───────┘
      │  (1, T/4, 512)
      ▼
┌─────────────┐
│ CTC head     │  Linear → 59 classes
└─────┬───────┘
      │  (1, T/4, 59)
      ▼
┌─────────────┐
│ CTC greedy   │  argmax + deduplique + supprime blanks
│ decode       │
└─────┬───────┘
      │
      ▼
  "b ɔ̃ ʒ u ʁ | l ə | m ɔ̃ d"
```

---

## Installation

```bash
# Avec backend ONNX (recommande)
pip install lectura-ctc[onnx]

# Mode API uniquement (sans ONNX)
pip install lectura-ctc

# Avec support micro (CLI)
pip install lectura-ctc[onnx,micro]
```

Par defaut, le module utilise l'**API Lectura** si aucun modele local n'est trouve. Pour l'inference locale, installez les modeles ONNX dans `~/.lectura/models/ctc/` ou utilisez le backend ONNX avec les modeles embarques (disponibles sous [licence commerciale](mailto:contact@lec-tu-ra.com)).

---

## Caracteristiques techniques

- **CNN-BiGRU-CTC** : 3.5M parametres, PER ~6%
- **Mel spectrogram numpy pur** : pas de dependance torchaudio
- **Decodage CTC greedy** : zero dependance
- **59 tokens** : 46 phones IPA francais + 6 liaisons + 5 ponctuations + 2 speciaux
- **ONNX INT8** : modele quantifie ~13 Mo
- **CLI integree** : `python -m lectura_ctc` (fichier WAV ou micro)
- **Factory `creer_engine()`** : cascade auto ONNX → API
- **Python 3.10+** avec type hints complets
- **Licence** : AGPL-3.0 (code) — modeles sous [licence commerciale](mailto:contact@lec-tu-ra.com)
