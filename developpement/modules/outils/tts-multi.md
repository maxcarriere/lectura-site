---
title: TTS Multi-Speaker
layout: default
permalink: /developpement/modules/outils/tts-multi/
redirect_from:
  - /developpement/modules/metiers/tts-multi/
  - /solutions/modules/tts-multispeaker/
---

<div class="module-header">
  <h1>Lectura TTS Multi-Speaker</h1>
  <p class="module-tagline">Moteur acoustique 6 voix — modèles High (Conformer) et Light (FastPitch) au choix (ONNX)</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-multispeaker/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/MultiSpeaker" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-multispeaker</code>
  </div>
</div>

## Présentation

Moteur de synthèse vocale neuronale multi-speaker pour le français, avec **deux modèles au choix** : **High** (Matcha-Conformer, d_model=384, meilleure qualité) et **Light** (FastPitch v6, d_model=256, plus rapide). Le vocoder **HiFi-GAN** est partagé. Supporte **6 voix** et **7 presets de style**.

| Caractéristique | Valeur |
|-----------------|--------|
| **Voix** | 6 speakers (3F + 3M) : Siwis, Ezwa, Nadine, Bernard, Gilles, Zeckou |
| **Style** | 7 presets : neutre, narratif, dialogue, expressif, méditatif, rapide, lent |
| **Modèle High** | Matcha-Conformer (d=384), flow-matching OT-CFM, ~40 Mo INT8 |
| **Modèle Light** | FastPitch v6 (d=256), FFT decoder, ~40 Mo INT8 |
| **Débit** | ~30x (High) à ~50x (Light) temps-réel sur CPU (ONNX) |
| **Entrée** | Phonèmes IPA ou texte français (via pipeline `lectura-tts-multi`) |
| **Sortie** | Audio 22050 Hz, float32 |
| **Contrôles prosodiques** | Pitch, énergie, débit, pauses + vecteur style 5D |

Le choix du modèle se fait via le paramètre `model="high"` (défaut) ou `model="light"`. Deux modes d'utilisation : **API** (zéro dépendance, zero config) ou **local** (ONNX Runtime, inférence offline).

> **Brique vs Pipeline** : Ce moteur est la brique acoustique multi-speaker (phonèmes → audio). Pour le pipeline complet TTS (texte → audio avec G2P intégré et choix de moteur), voir la [page TTS]({{ '/developpement/modules/metiers/tts/' | relative_url }}).

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="{{ '/solutions/synthese-vocale/#multi-speaker--6-voix-7-styles' | relative_url }}">Essayer la synthèse vocale Multi-Speaker en ligne →</a>
</div>

---

## Exemple de code

```python
from lectura_multispeaker import creer_engine, liste_speakers

# Lister les voix disponibles
for s in liste_speakers():
    print(f"{s['label']} ({s['gender']})")

# Créer un engine High (Conformer, par défaut)
engine = creer_engine()

# Créer un engine Light (FastPitch, plus rapide)
engine_light = creer_engine(model="light")

# Synthèse avec choix de voix et style
audio = engine.synthesize(
    text="Bonjour, comment allez-vous ?",
    speaker="bernard",
    style="expressif",
)
print(f"Durée : {len(audio.samples) / audio.sample_rate:.2f}s")

# Synthèse rapide avec le modèle light
audio = engine_light.synthesize(
    text="Je suis Nadine, enchantée.",
    speaker="nadine",
    style="narratif",
)

# Raccourci avec choix du modèle
from lectura_multispeaker import synthetiser
audio = synthetiser("Bonjour.", speaker="siwis", model="light")
```

---

## Architecture

```
Phonemes IPA + speaker + style
              ↓
    creer_engine(model=...)
              ↓
   ┌──────────┐  ┌──────────┐
   │ model=   │  │ model=   │
   │ "high"   │  │ "light"  │
   │Conformer │  │FastPitch │
   │ d=384    │  │ d=256    │
   └────┬─────┘  └────┬─────┘
        │              │
        ▼              ▼
     mel spectrogram 80 bandes
              ↓
      HiFi-GAN Vocoder
   (mel → waveform 22050 Hz)
```

### Deux modèles au choix

| Modèle | Architecture | Caractéristiques |
|--------|-------------|------------------|
| **High** (défaut) | Matcha-Conformer d=384 | Flow-matching OT-CFM, meilleure qualité, ~30x temps-réel |
| **Light** | FastPitch v6 d=256 | FFT decoder, plus rapide/léger, ~50x temps-réel |

Le choix se fait à la création de l'engine via `model="high"` ou `model="light"`. Le vocoder HiFi-GAN est partagé entre les deux modèles.

---

## Installation

```bash
# Moteur brut (phonèmes → audio)
pip install lectura-multispeaker              # mode API (zero config, zéro dépendance)
pip install lectura-multispeaker[onnx]        # backend ONNX Runtime local

# Pipeline complet (texte → audio)
pip install lectura-tts-multi[onnx]           # G2P + moteur ONNX
pip install lectura-tts-multi[onnx,retimbre]  # + retimbre multi-voix (OpenVoice)
```

| Extra | Package | Contenu |
|-------|---------|---------|
| `[onnx]` | `lectura-multispeaker` | Backend ONNX Runtime local + numpy |
| `[onnx]` | `lectura-tts-multi` | Pipeline G2P + moteur ONNX |
| `[retimbre]` | `lectura-tts-multi` | Retimbre multi-voix via OpenVoice |
| `[aligneur]` | `lectura-tts-multi` | Syllabation pour le mode lecture syllabique (lectura-aligneur) |

Par défaut, le module utilise l'API Lectura (aucune configuration nécessaire). Le backend local ONNX nécessite les modèles pré-entraînés, disponibles sous [licence commerciale]({{ '/contact/' | relative_url }}).

---

## Caractéristiques techniques

- **Deux modèles au choix** : High (Conformer, qualité) et Light (FastPitch, vitesse)
- **Matcha-Conformer** (High) : d_model=384, flow-matching OT-CFM, qualité supérieure
- **FastPitch v6** (Light) : d_model=256, FFT decoder, plus rapide et léger
- **HiFi-GAN** : vocoder universel partagé, signal 22050 Hz
- **2 backends** : API (zero config) ou ONNX Runtime local (modèles sous licence commerciale)
- **6 voix** : Siwis, Ezwa, Nadine (F) — Bernard, Gilles, Zeckou (M)
- **7 presets de style** : neutre, narratif, dialogue, expressif, méditatif, rapide, lent
- **Contrôles prosodiques** : pitch_shift, pitch_range, energy_scale, duration_scale, pause_scale
- **Factory `creer_engine(model=...)`** : choix explicite du modèle (high par défaut)
- **`set_speaker()`** : changement de voix dynamique sans recharger les modèles
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (code) — les modèles pré-entraînés sont sous [licence commerciale]({{ '/contact/' | relative_url }})
