---
title: VC Locuteurs
layout: default
permalink: /solutions/modules/vc-locuteurs/
---

<div class="module-header">
  <h1>Lectura VC Locuteurs</h1>
  <p class="module-tagline">Conversion vocale RVC vers 6 voix francaises pre-entrainees — ONNX pur</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-vc-locuteurs/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/VC-Locuteurs" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-vc-locuteurs</code>
  </div>
</div>

## Presentation

Sous-module de conversion vocale base sur **RVC** (Retrieval-based Voice Conversion) avec 6 voix francaises pre-entrainees. Chaque voix dispose de son propre modele synthesizer, entraine sur un corpus de haute qualite.

| Caracteristique | Valeur |
|-----------------|--------|
| **Voix** | 6 speakers (3F + 3M) : Ezwa, Nadine, Siwis, Bernard, Gilles, Zeckou |
| **Backend** | HuBERT + RMVPE + Synthesizer — ONNX Runtime pur |
| **Modeles** | 8 fichiers ONNX (~1.4 Go total) |
| **Sortie** | Audio @ 48000 Hz |
| **Controles** | protect, pitch_modification |
| **Auto-adaptation** | Pitch et protection ajustes selon le genre du speaker |

---

## Voix disponibles

| Speaker | Genre | Caractere |
|---------|-------|-----------|
| siwis | F | Voix feminine claire, studio |
| ezwa | F | Voix feminine douce, chaleureuse |
| nadine | F | Voix feminine naturelle |
| bernard | M | Voix masculine posee |
| gilles | M | Voix masculine grave |
| zeckou | M | Voix masculine dynamique |

---

## Exemple de code

```python
from lectura_vc_locuteurs import creer_engine, RVC_SPEAKERS

engine = creer_engine()

# Conversion vers Bernard
audio, sr = engine.convert(
    audio="input.wav",
    speaker="bernard",
)
# sr == 48000

# Liste des speakers
print(RVC_SPEAKERS)
# ['ezwa', 'nadine', 'bernard', 'gilles', 'zeckou', 'siwis']

# Avec ajustement de pitch
audio, sr = engine.convert(
    audio="input.wav",
    speaker="nadine",
    pitch_modification=2,    # monter de 2 demi-tons
)
```

```python
# Fonction de commodite (cree un engine ephemere)
from lectura_vc_locuteurs import convertir

audio, sr = convertir("input.wav", speaker="siwis")
```

---

## Architecture

```
Audio source --> HuBERT (features vocales) --> RMVPE (estimation F0)
                                                      |
                                         Synthesizer_{speaker} (ONNX)
                                                      |
                                               Audio converti @ 48000 Hz
```

Les 8 modeles ONNX :
- `hubert.onnx` (361 Mo) — extraction de features vocales
- `rmvpe.onnx` (345 Mo) — estimation de frequence fondamentale (F0)
- 6x `synthesizer_{speaker}.onnx` (~116 Mo chacun) — synthesizers RVC par voix

---

## Installation

```bash
pip install lectura-vc-locuteurs   # module public (~7 Ko)
```

Le module public utilise l'API Lectura pour l'inference. Le backend local ONNX necessite les modeles pre-entraines (~1.4 Go), disponibles sous [licence commerciale](mailto:contact@lec-tu-ra.com).

---

## Caracteristiques techniques

- **RVC ONNX** : HuBERT + RMVPE + Synthesizer, 6 voix pre-entrainees
- **Auto-adaptation** : detection automatique du pitch source, ajustement selon le speaker cible
- **Lazy loading** : chaque synthesizer charge a la demande (premier appel)
- **ONNX Runtime pur** : pas de dependance PyTorch
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (code) — les modeles sont sous [licence commerciale](mailto:contact@lec-tu-ra.com)
