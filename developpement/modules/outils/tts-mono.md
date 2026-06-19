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
  <p class="module-tagline">Moteur acoustique Matcha-Conformer + HiFi-GAN — phonèmes IPA vers audio (ONNX)</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-tts-monospeaker/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/TTS-Monospeaker" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-tts-monospeaker</code>
  </div>
</div>

## Présentation

Moteur de synthèse vocale neuronale pour le français, basé sur **Matcha-Conformer** (modèle acoustique flow-matching, 17.9M params) et **HiFi-GAN** (vocoder). Produit un signal audio naturel à 22050 Hz à partir de phonèmes IPA ou de texte.

| Caractéristique | Valeur |
|-----------------|--------|
| **Qualité** | Voix féminine naturelle (corpus SIWIS) |
| **Débit** | ~30x temps-réel sur CPU (ONNX, 4 pas ODE) |
| **Taille modèle** | ~29 Mo (ONNX INT8, 3 fichiers) |
| **Entrée** | Phonèmes IPA ou texte français (avec `[g2p]`) |
| **Sortie** | Audio 22050 Hz, float32 |
| **Style** | 7 presets : neutre, narratif, dialogue, expressif, méditatif, rapide, lent |
| **Contrôles prosodiques** | Pitch, énergie, débit, pauses + vecteur style 5D |
| **Qualité ODE** | `n_ode_steps` configurable (4 = rapide, 8 = haute qualité) |
| **Retimbre** | Changement de voix optionnel via OpenVoice `[vc]` |

Deux modes d'utilisation : **API** (zéro dépendance, zero config) ou **local** (ONNX Runtime, inférence offline).

> **Brique vs Pipeline** : Ce moteur est la brique acoustique (phonèmes → audio). Pour le pipeline complet TTS (texte → audio avec G2P intégré et choix de moteur), voir la [page TTS]({{ '/developpement/modules/metiers/tts/' | relative_url }}).

---

## Exemple de code

```python
from lectura_tts_monospeaker import creer_engine

engine = creer_engine()  # mode API par défaut (zero config)

# À partir de texte (nécessite [g2p])
result = engine.synthesize(text="Bonjour, comment allez-vous ?")
print(f"Durée : {len(result.samples) / result.sample_rate:.2f}s")

# Avec un style preset
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
    n_ode_steps=8,  # plus de pas ODE = meilleure qualité
)
```

---

## Architecture

```
Phonemes IPA
      ↓
Matcha-Conformer Encoder
(phone_ids + style_vector [5D]
 → enc_out + dur/pitch/energy)
      ↓
Length Regulation + Prosody Embedding
      ↓
CFM UNet (boucle ODE, N pas)
(bruit → mel spectrogram 80 bandes)
      ↓
HiFi-GAN Vocoder
(mel → waveform 22050 Hz)
```

Le pipeline utilise **3 modèles ONNX** : un encodeur Conformer (6 couches, d_model=256, style conditioning 5D), un UNet pour le flow-matching (appelé N fois par la boucle ODE Euler), et un vocoder HiFi-GAN.

---

## Installation

```bash
pip install lectura-tts-monospeaker              # mode API (zero config, zéro dépendance)
pip install lectura-tts-monospeaker[onnx]        # backend ONNX Runtime local
pip install lectura-tts-monospeaker[onnx,g2p]    # avec G2P intégré (texte → audio)
pip install lectura-tts-monospeaker[onnx,g2p,vc] # + retimbre multi-voix (OpenVoice)
pip install lectura-tts-monospeaker[all]         # tout
```

Par défaut, le module utilise l'API Lectura (aucune configuration nécessaire). Le backend local ONNX nécessite les modèles pré-entraînés, disponibles sous [licence commerciale](mailto:admin@lectura.world).

### Retimbre (optionnel)

Avec `[vc]`, le paramètre `voix=` permet de changer le timbre de la voix synthétisée via [OpenVoice zero-shot]({{ '/developpement/modules/outils/vc-zeroshot/' | relative_url }}) :

```python
from lectura_tts_monospeaker import synthetiser

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

- **Matcha-Conformer** : 17.9M paramètres, encodeur Conformer 6 couches (d_model=256), flow-matching OT-CFM
- **HiFi-GAN** : vocoder universel, signal 22050 Hz
- **3 modèles ONNX** : encodeur (~16 Mo INT8), UNet (~7 Mo INT8), vocoder (~6 Mo INT8) — ~29 Mo total
- **7 styles** : neutre, narratif, dialogue, expressif, méditatif, rapide, lent (vecteur style 5D)
- **Qualité ODE** : `n_ode_steps` configurable (4 = rapide ~30x temps-réel, 8 = haute qualité)
- **2 backends** : API (zero config) ou ONNX Runtime local (modèles sous licence commerciale)
- **Contrôles prosodiques** : pitch_shift, pitch_range, energy_scale, duration_scale, pause_scale
- **Retimbre optionnel** `[vc]` : changement de voix via OpenVoice zero-shot (6 presets, blend pondéré, variante formants)
- **Factory `creer_engine()`** : détection automatique du meilleur mode
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (code) — les modèles pré-entraînés sont sous [licence commerciale](mailto:admin@lectura.world)
