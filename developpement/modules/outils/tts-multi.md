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
  <p class="module-tagline">Moteur acoustique dual Conformer + FastPitch — 6 voix + routage automatique (ONNX)</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-multispeaker/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/MultiSpeaker" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-multispeaker</code>
  </div>
</div>

## Présentation

Moteur de synthèse vocale neuronale multi-speaker pour le français, avec **routage dual automatique** entre deux architectures : **Matcha-Conformer** (d_model=384, flow-matching OT-CFM) pour les phrases moyennes/longues et **FastPitch-Lite v6** (d_model=256) pour les séquences courtes. Le vocoder **HiFi-GAN** est partagé. Supporte **6 voix** et **7 presets de style**.

| Caractéristique | Valeur |
|-----------------|--------|
| **Voix** | 6 speakers (3F + 3M) : Siwis, Ezwa, Nadine, Bernard, Gilles, Zeckou |
| **Style** | 7 presets : neutre, narratif, dialogue, expressif, méditatif, rapide, lent |
| **Architecture** | Dual : Matcha-Conformer (phrases) + FastPitch-Lite (séquences courtes) |
| **Taille modèle** | ~80 Mo (ONNX INT8 dual) / ~290 Mo (ONNX FP32 dual) |
| **Débit** | ~30-50x temps-réel sur CPU (ONNX) |
| **Entrée** | Phonèmes IPA ou texte français (via pipeline `lectura-tts-multi`) |
| **Sortie** | Audio 22050 Hz, float32 |
| **Contrôles prosodiques** | Pitch, énergie, débit, pauses + vecteur style 5D |

Le **routage est transparent** : la factory `creer_engine()` détecte automatiquement le layout dual et route chaque phrase vers le modèle optimal. Deux modes d'utilisation : **API** (zéro dépendance, zero config) ou **local** (ONNX Runtime, inférence offline).

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

# Créer un engine (mode API par défaut)
engine = creer_engine()

# Synthèse avec choix de voix et style
audio = engine.synthesize(
    text="Bonjour, comment allez-vous ?",
    speaker="bernard",
    style="expressif",
)
print(f"Durée : {len(audio.samples) / audio.sample_rate:.2f}s")

# Changer de voix dynamiquement
engine.set_speaker("nadine")
audio = engine.synthesize(
    text="Je suis Nadine, enchantée.",
    style="narratif",
)

# Synthèse à partir de phonèmes IPA avec style personnalisé
audio = engine.synthesize_phonemes(
    "bɔ̃ʒuʁ kɔmɑ̃ ale vu",
    phrase_type=0,
    style_vector=[0.8, 0.6, 1.0, 0.0, 0.0],
    pitch_range=1.3,
    energy_scale=1.0,
)
```

---

## Architecture

```
Phonemes IPA + speaker + style
              ↓
   ┌─── DualTTSEngine ───┐
   │  Routage automatique │
   │  n_phones > 15 ?     │
   │  speaker == siwis ?  │
   └──────┬───────┬───────┘
          │       │
   ┌──────▼──┐ ┌─▼────────┐
   │FastPitch│ │Conformer │
   │ d=256   │ │ d=384    │
   │(courtes)│ │(phrases) │
   └────┬────┘ └────┬─────┘
        │           │
        ▼           ▼
     mel spectrogram 80 bandes
              ↓
      HiFi-GAN Vocoder
   (mel → waveform 22050 Hz)
```

### Règles de routage

| Condition | Modèle |
|-----------|--------|
| speaker == siwis (toutes longueurs) | Conformer 384 |
| n_phones > 15 (tous speakers) | Conformer 384 |
| n_phones ≤ 15 ET speaker ≠ siwis | FastPitch 256 |

`n_phones` = nombre de phone IDs incluant les 2 markers de silence (#...#).

Le Conformer 384 (flow-matching OT-CFM) produit un audio de meilleure qualité sur les phrases, mais dégrade les séquences courtes (syllabes, mots isolés) pour les speakers non-siwis. Le FastPitch gère correctement les courtes grâce à ses heuristiques de durée. Le routage est transparent — l'API est identique à la version précédente.

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

- **Architecture duale** avec routage automatique par longueur de séquence et speaker
- **Matcha-Conformer** (phrases) : d_model=384, flow-matching OT-CFM, qualité supérieure
- **FastPitch-Lite v6** (séquences courtes) : d_model=256, 24.3M params, durées robustes
- **HiFi-GAN** : vocoder universel partagé, signal 22050 Hz
- **2 backends** : API (zero config) ou ONNX Runtime local (modèles sous licence commerciale)
- **6 voix** : Siwis, Ezwa, Nadine (F) — Bernard, Gilles, Zeckou (M)
- **7 presets de style** : neutre, narratif, dialogue, expressif, méditatif, rapide, lent
- **Contrôles prosodiques** : pitch_shift, pitch_range, energy_scale, duration_scale, pause_scale
- **Factory `creer_engine()`** : détection automatique du layout (dual, conformer, fastpitch)
- **`set_speaker()`** : changement de voix dynamique sans recharger les modèles
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (code) — les modèles pré-entraînés sont sous [licence commerciale]({{ '/contact/' | relative_url }})
