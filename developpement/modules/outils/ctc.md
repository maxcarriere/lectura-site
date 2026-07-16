---
title: Décodeur
layout: default
permalink: /developpement/modules/outils/ctc/
redirect_from:
  - /developpement/modules/outils/decodeur/
---

<div class="module-header">
  <h1>Lectura Décodeur</h1>
  <p class="module-tagline">Décodeur phonétique neural CNN-BiGRU-CTC — audio vers phones IPA</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-decodeur/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Decodeur" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-decodeur</code>
  </div>
</div>

## Présentation

Brique atomique de décodage phonétique : un modèle **CNN-BiGRU-CTC medium** (13.2M paramètres, ONNX INT8 ~49 Mo) qui convertit un signal audio 16 kHz en une séquence de phones IPA avec séparateurs de mots, liaisons et ponctuation.

| Caractéristique | Valeur |
|-----------------|--------|
| **Architecture** | CNN [48, 96] (2 couches) + BiGRU 384x5 + CTC head |
| **Paramètres** | 13.2M |
| **Performance** | PER ~3.59% |
| **Vocabulaire** | 59 tokens (46 phones IPA + liaisons + ponctuation + spéciaux) |
| **Audio** | PCM float32 mono, 16 kHz |
| **Mel** | 80 bins, n_fft=512, hop=160, win=400 |
| **Modèle** | ONNX INT8, ~49 Mo |
| **Backends** | ONNX Runtime (local) ou API serveur |

Le modèle medium supporte les sigles et formules grâce à un fine-tuning spécialisé.

> **Brique vs Pipeline** : Le CTC est le décodeur brut (audio → phones IPA). Pour le pipeline complet STT (audio → texte orthographique, avec P2G et formules), voir [lectura-stt]({{ '/developpement/modules/metiers/stt/' | relative_url }}).

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="{{ '/solutions/reconnaissance-vocale/#essayer-en-ligne' | relative_url }}">Essayer la reconnaissance vocale en ligne →</a>
</div>

---

## STT-Formules

En complément du CTC principal, le module **STT-Formules** est un modèle CTC autonome et léger (~600K paramètres) entraîné spécifiquement pour la reconnaissance de formules. Au lieu de phonèmes IPA, il produit directement des tokens sémantiques (87 classes : nombres, mois, devises, lettres, etc.), avec un TER de ~1.17%.

```bash
pip install lectura-stt-formules[inference]
```

---

## Exemple de code

```python
import numpy as np
from lectura_decodeur import creer_engine

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
# CLI CTC : transcrire un fichier
python -m lectura_decodeur bonjour.wav

# CLI CTC : enregistrer au micro
python -m lectura_decodeur --micro

# CLI CTC : enregistrer 5 secondes
python -m lectura_decodeur --micro --duree 5

# CLI CTC : mode continu (Ctrl+C pour quitter)
python -m lectura_decodeur --micro --continu
```

### STT-Formules (audio → tokens sémantiques)

```python
from lectura_stt_formules import creer_engine

engine = creer_engine()

result = engine.transcrire("nombre.wav")
print(result["names"])   # ["DEUX", "CENT", "VINGT", "ET", "UN"]
print(result["tokens"])  # [4, 25, 20, 29, 3]
```

Le vocabulaire de sortie comprend 87 tokens sémantiques : nombres atomiques (0-16), dizaines, échelles, connecteurs, mois, heures, devises, pourcentages, ordinaux, fractions et lettres A-Z pour les sigles.

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
│ BiGRU ×5     │  5 couches bidirectionnelles (384h)
└─────┬───────┘
      │  (1, T/4, 768)
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
# Décodeur avec backend ONNX local
pip install lectura-decodeur[onnx]

# Mode API uniquement (sans ONNX)
pip install lectura-decodeur

# STT-Formules (tokens sémantiques, inférence locale)
pip install lectura-stt-formules[inference]
```

Par défaut, le module utilise l'**API Lectura** si aucun modèle local n'est trouvé. Pour l'inférence locale, installez les modèles ONNX dans `~/.lectura/models/` ou utilisez le backend ONNX avec les modèles embarqués (disponibles sous [licence commerciale]({{ '/contact/' | relative_url }})).

---

## Caractéristiques techniques

- **CNN-BiGRU-CTC medium** : 13.2M paramètres, PER ~3.59%
- **Mel spectrogram numpy pur** : pas de dépendance torchaudio
- **Décodage CTC greedy** : zéro dépendance
- **59 tokens** : 46 phones IPA français + 6 liaisons + 5 ponctuations + 2 spéciaux
- **ONNX INT8** : modèle quantifié ~49 Mo
- **CLI intégrée** : `python -m lectura_decodeur` (fichier WAV ou micro)
- **Factory `creer_engine()`** : cascade auto ONNX → API
- **STT-Formules** : ~600K params, 87 tokens sémantiques, TER ~1.17%
- **Python 3.10+** avec type hints complets
- **Licence** : AGPL-3.0 (code) — modèles sous [licence commerciale]({{ '/contact/' | relative_url }})
