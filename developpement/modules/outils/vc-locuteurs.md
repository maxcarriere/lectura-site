---
title: VC Locuteurs
layout: default
permalink: /developpement/modules/outils/vc-locuteurs/
redirect_from:
  - /developpement/modules/metiers/vc-locuteurs/
  - /solutions/modules/vc-locuteurs/
---

<div class="module-header">
  <h1>Lectura VC Locuteurs</h1>
  <p class="module-tagline">Conversion vocale RVC vers 6 voix françaises pré-entraînées — ONNX pur</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-vc-locuteurs/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/VC-Locuteurs" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-vc-locuteurs</code>
  </div>
</div>

## Présentation

Brique atomique de conversion vocale basée sur **RVC** (Retrieval-based Voice Conversion) avec 6 voix françaises pré-entraînées. Chaque voix dispose de son propre modèle synthesizer, entraîné sur un corpus de haute qualité.

| Caractéristique | Valeur |
|-----------------|--------|
| **Voix** | 6 speakers (3F + 3M) : Ezwa, Nadine, Siwis, Bernard, Gilles, Zeckou |
| **Backend** | HuBERT + RMVPE + Synthesizer — ONNX Runtime pur |
| **Modèles** | 8 fichiers ONNX (~1.4 Go total) |
| **Sortie** | Audio @ 48000 Hz |
| **Contrôles** | protect, pitch_modification |
| **Auto-adaptation** | Pitch et protection ajustés selon le genre du speaker |

> **Brique vs Meta-package** : Le VC Locuteurs est la brique RVC seule. Pour le méta-package unifié (ZeroShot + RVC Locuteurs), voir [lectura-vc]({{ '/developpement/modules/metiers/vc/' | relative_url }}).

<div class="try-online-btn">
  <a href="{{ '/developpement/modules/metiers/vc/#essayer-en-ligne' | relative_url }}">Essayer la conversion vocale en ligne →</a>
</div>

---

## Voix disponibles

| Speaker | Genre | Caractère |
|---------|-------|-----------|
| siwis | F | Voix féminine claire, studio |
| ezwa | F | Voix féminine douce, chaleureuse |
| nadine | F | Voix féminine naturelle |
| bernard | M | Voix masculine posée |
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
# Fonction de commodité (crée un engine éphémère)
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

Les 8 modèles ONNX :
- `hubert.onnx` (361 Mo) — extraction de features vocales
- `rmvpe.onnx` (345 Mo) — estimation de fréquence fondamentale (F0)
- 6x `synthesizer_{speaker}.onnx` (~116 Mo chacun) — synthesizers RVC par voix

---

## Installation

```bash
pip install lectura-vc-locuteurs   # module public (~7 Ko)
```

Le module public utilise l'API Lectura pour l'inférence. Le backend local ONNX nécessite les modèles pré-entraînés (~1.4 Go), disponibles sous [licence commerciale](mailto:admin@lectura.world).

---

## Caractéristiques techniques

- **RVC ONNX** : HuBERT + RMVPE + Synthesizer, 6 voix pré-entraînées
- **Auto-adaptation** : détection automatique du pitch source, ajustement selon le speaker cible
- **Lazy loading** : chaque synthesizer chargé à la demande (premier appel)
- **ONNX Runtime pur** : pas de dépendance PyTorch
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (code) — les modèles sont sous [licence commerciale](mailto:admin@lectura.world)
