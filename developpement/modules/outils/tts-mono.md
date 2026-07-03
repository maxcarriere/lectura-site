---
title: TTS Monospeaker
layout: default
permalink: /developpement/modules/outils/tts-mono/
redirect_from:
  - /developpement/modules/metiers/tts-mono/
  - /solutions/modules/tts/
---

<div class="module-header">
  <h1>Lectura TTS Monospeaker</h1>
  <p class="module-tagline">Moteur acoustique monospeaker — modèles High (Conformer) et Light (FastPitch) au choix (ONNX)</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-monospeaker/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Monospeaker" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-monospeaker</code>
  </div>
</div>

## Présentation

Moteur de synthèse vocale neuronale pour le français, avec **deux modèles au choix** : **High** (Matcha-Conformer, meilleure qualité) et **Light** (FastPitch, plus rapide). Produit un signal audio naturel à 22050 Hz à partir de phonèmes IPA ou de texte.

| Caractéristique | Valeur |
|-----------------|--------|
| **Qualité** | Voix féminine naturelle (corpus SIWIS) |
| **Modèle High** | Matcha-Conformer (17.9M params), ~29 Mo INT8, ~30x temps-réel |
| **Modèle Light** | FastPitch v6 (16M params), ~28 Mo INT8, ~50x temps-réel |
| **Entrée** | Phonèmes IPA ou texte français (via pipeline `lectura-tts-mono`) |
| **Sortie** | Audio 22050 Hz, float32 |
| **Style** | 7 presets : neutre, narratif, dialogue, expressif, méditatif, rapide, lent |
| **Contrôles prosodiques** | Pitch, énergie, débit, pauses + vecteur style 5D |
| **Qualité ODE** | `n_ode_steps` configurable (High uniquement, 4 = rapide, 8 = haute qualité) |
| **Retimbre** | Changement de voix optionnel via OpenVoice (pipeline `[retimbre]`) |

Deux modes d'utilisation : **API** (zéro dépendance, zero config) ou **local** (ONNX Runtime, inférence offline).

> **Brique vs Pipeline** : Ce moteur est la brique acoustique (phonèmes → audio). Pour le pipeline complet TTS (texte → audio avec G2P intégré et choix de moteur), voir la [page TTS]({{ '/developpement/modules/metiers/tts/' | relative_url }}).

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="{{ '/solutions/synthese-vocale/#monospeaker--voix-haute-qualité-7-styles' | relative_url }}">Essayer la synthèse vocale en ligne →</a>
</div>

---

## Exemple de code

```python
from lectura_monospeaker import creer_engine, synthetiser

# Engine High (Conformer, par défaut)
engine = creer_engine()
result = engine.synthesize(text="Bonjour, comment allez-vous ?")
print(f"Durée : {len(result.samples) / result.sample_rate:.2f}s")

# Engine Light (FastPitch, plus rapide)
engine_light = creer_engine(model="light")
result = engine_light.synthesize(text="Bonjour le monde.")

# Raccourci avec choix du modèle
audio = synthetiser("Bonjour.", model="light")

# Avec un style preset (High)
result = engine.synthesize(
    text="Il était une fois, dans un pays lointain...",
    style="narratif",
)

# À partir d'IPA avec contrôles prosodiques + style personnalisé
result = engine.synthesize_phonemes(
    "bɔ̃ʒuʁ kɔmɑ̃ ale vu",
    style_vector=[0.5, 0.0, 0.0, 0.0, 0.0],
    pitch_range=1.3,
    energy_scale=1.0,
    n_ode_steps=8,  # plus de pas ODE = meilleure qualité (High uniquement)
)
```

---

## Architecture

```
Phonemes IPA + style
        ↓
  creer_engine(model=...)
        ↓
┌──────────────┐  ┌─────────────┐
│ model="high" │  │model="light"│
│  Conformer   │  │  FastPitch  │
│  Encoder     │  │  Encoder    │
│     +        │  │     +       │
│  CFM UNet    │  │ FFT Decoder │
│  (ODE, N pas)│  │             │
└──────┬───────┘  └──────┬──────┘
       ▼                 ▼
    mel spectrogram 80 bandes
              ↓
      HiFi-GAN Vocoder
   (mel → waveform 22050 Hz)
```

- **High** : 3 modèles ONNX — encodeur Conformer (d_model=256, style 5D), UNet (flow-matching ODE), vocoder HiFi-GAN
- **Light** : 3 modèles ONNX — encodeur FastPitch, décodeur FFT, vocoder HiFi-GAN

---

## Installation

```bash
# Moteur brut (phonèmes → audio)
pip install lectura-monospeaker              # mode API (zero config, zéro dépendance)
pip install lectura-monospeaker[onnx]        # backend ONNX Runtime local

# Pipeline complet (texte → audio)
pip install lectura-tts-mono[onnx]           # G2P + moteur ONNX
pip install lectura-tts-mono[onnx,retimbre]  # + retimbre multi-voix (OpenVoice)
```

| Extra | Package | Contenu |
|-------|---------|---------|
| `[onnx]` | `lectura-monospeaker` | Backend ONNX Runtime local + numpy |
| `[onnx]` | `lectura-tts-mono` | Pipeline G2P + moteur ONNX |
| `[retimbre]` | `lectura-tts-mono` | Retimbre multi-voix via OpenVoice |
| `[aligneur]` | `lectura-tts-mono` | Syllabation pour le mode lecture syllabique (lectura-aligneur) |

Par défaut, le module utilise l'API Lectura (aucune configuration nécessaire). Le backend local ONNX nécessite les modèles pré-entraînés, disponibles sous [licence commerciale]({{ '/contact/' | relative_url }}).

### Retimbre (optionnel)

Avec `lectura-vc-zeroshot` installé (ou via `pip install lectura-tts-mono[retimbre]`), le paramètre `voix=` permet de changer le timbre de la voix synthétisée via [OpenVoice zero-shot]({{ '/developpement/modules/outils/vc-zeroshot/' | relative_url }}) :

```python
from lectura_monospeaker import synthetiser

# Voix preset
audio = synthetiser("Bonjour le monde.", voix="bernard")

# Blend de voix
audio = synthetiser("Bonjour.", voix={"siwis": 0.5, "nadine": 0.5})

# Variante grave/aigu (-1 à +1)
audio = synthetiser("Bonjour.", voix="ezwa", voix_variante=-0.5)
```

Presets disponibles : siwis, ezwa, nadine, bernard, gilles, zeckou.

---

## Caractéristiques techniques

- **Deux modèles au choix** : High (Conformer, qualité) et Light (FastPitch, vitesse)
- **Matcha-Conformer** (High) : 17.9M paramètres, Conformer 6 couches (d_model=256), flow-matching OT-CFM, ~29 Mo INT8
- **FastPitch v6** (Light) : 16M paramètres, FFT decoder, ~28 Mo INT8
- **HiFi-GAN** : vocoder universel partagé, signal 22050 Hz
- **7 styles** : neutre, narratif, dialogue, expressif, méditatif, rapide, lent (vecteur style 5D)
- **Qualité ODE** : `n_ode_steps` configurable (High uniquement, 4 = rapide ~30x temps-réel, 8 = haute qualité)
- **2 backends** : API (zero config) ou ONNX Runtime local (modèles sous licence commerciale)
- **Contrôles prosodiques** : pitch_shift, pitch_range, energy_scale, duration_scale, pause_scale
- **Retimbre optionnel** : changement de voix via OpenVoice zero-shot (6 presets, blend pondéré, variante formants)
- **Factory `creer_engine(model=...)`** : choix explicite du modèle (high par défaut)
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (code) — les modèles pré-entraînés sont sous [licence commerciale]({{ '/contact/' | relative_url }})
