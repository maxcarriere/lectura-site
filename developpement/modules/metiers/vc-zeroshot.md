---
title: VC ZeroShot
layout: default
permalink: /developpement/modules/metiers/vc-zeroshot/
redirect_from:
  - /solutions/modules/vc-zeroshot/
---

<div class="module-header">
  <h1>Lectura VC ZeroShot</h1>
  <p class="module-tagline">Conversion vocale zero-shot via OpenVoice v2 — presets, blend de voix, ONNX pur</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-vc-zeroshot/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/VC-ZeroShot" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-vc-zeroshot</code>
  </div>
</div>

## Présentation

Sous-module léger de conversion vocale zero-shot basé sur **OpenVoice v2** (ONNX). Transforme n'importe quel audio source vers le timbre d'une voix cible — à partir d'un preset, d'un extrait audio de référence, ou d'un mélange pondéré de plusieurs voix.

| Caractéristique | Valeur |
|-----------------|--------|
| **Backend** | OpenVoice v2 — ONNX Runtime pur (pas de PyTorch) |
| **Presets** | 6 voix pré-calculées : siwis, ezwa, nadine, bernard, gilles, zeckou |
| **Blend** | Mélange pondéré de presets ou d'extraits audio |
| **Trick SR** | Décalage des formants (voix grave/aiguë) via le sample rate |
| **Modèles** | 2 fichiers ONNX (~126 Mo total) |
| **Sortie** | Audio @ 22050 Hz |

---

## Presets de voix

Six voix pré-calculées sont intégrées au package (speaker embeddings moyennées sur 100 échantillons du corpus). Utilisables directement par nom, sans fichier audio de référence.

| Preset | Genre | Description |
|--------|-------|-------------|
| siwis | F | Voix féminine claire (corpus SIWIS) |
| ezwa | F | Voix féminine douce |
| nadine | F | Voix féminine naturelle |
| bernard | M | Voix masculine posée |
| gilles | M | Voix masculine grave |
| zeckou | M | Voix masculine dynamique |

---

## Exemple de code

```python
from lectura_vc_zeroshot import creer_engine, PRESET_SPEAKERS

engine = creer_engine()

# Conversion avec un preset
audio, sr = engine.convert(
    audio="input.wav",
    reference="siwis",      # preset par nom
    sr_in=16000,
)
# sr == 22050

# Blend de plusieurs presets (poids égaux)
audio, sr = engine.convert(
    audio="input.wav",
    reference=["siwis", "nadine"],
    sr_in=16000,
)

# Blend pondéré
audio, sr = engine.convert(
    audio="input.wav",
    reference={"siwis": 0.5, "nadine": 0.3, "ezwa": 0.2},
    sr_in=16000,
)

# Depuis un fichier audio de référence
audio, sr = engine.convert(
    audio="input.wav",
    reference="reference_5s.wav",
    sr_in=16000,
)

# Variante aiguë (formants décalés via trick SR)
audio, sr = engine.convert(
    audio="input.wav",
    reference="siwis",
    sr_in=16000,
    sr_override=11025,   # formants x2 (aiguë/enfant)
)
```

```python
# API presets
from lectura_vc_zeroshot import PRESET_SPEAKERS
print(PRESET_SPEAKERS)
# ['siwis', 'ezwa', 'nadine', 'bernard', 'gilles', 'zeckou']

# Manipuler les speaker embeddings directement
from lectura_vc_zeroshot import blend_se
from lectura_vc_zeroshot.engine import ZeroShotEngine

se_siwis = ZeroShotEngine.get_preset_se("siwis")
se_nadine = ZeroShotEngine.get_preset_se("nadine")
se_custom = blend_se([se_siwis, se_nadine], weights=[0.7, 0.3])
```

---

## Architecture

```
Audio source  --> OpenVoice SE --> source embedding (1, 256, 1)
Reference     --> OpenVoice SE --> target embedding (1, 256, 1)
                                        |
                           OpenVoice VC (ONNX)
                           (source audio + src_se + tgt_se + tau)
                                        |
                                 Audio converti @ 22050 Hz
```

La référence cible est polymorphe :
- **str** : nom de preset ("siwis") ou chemin vers un fichier audio
- **ndarray** : audio brut (1D) ou speaker embedding (1, 256, 1)
- **list** : plusieurs références (poids égaux)
- **dict** : blend pondéré (`{"siwis": 0.5, "nadine": 0.5}`)

Les 2 modèles ONNX :
- `openvoice_se.onnx` (3.2 Mo) — extraction de speaker embedding
- `openvoice_vc.onnx` (123 Mo) — conversion zero-shot

---

## Trick SR (décalage de formants)

Le paramètre `sr_override` trompe OpenVoice sur le sample rate de la référence, ce qui décale les formants sans changer le pitch. Cela permet de créer des variantes homme/enfant à partir d'un même preset.

| sr_override | Factor | Effet |
|-------------|--------|-------|
| 44100 | 0.5x | Formants baissés (voix grave/masculine) |
| 22050 | 1.0x | Neutre (pas de décalage) |
| 11025 | 2.0x | Formants montés (voix aiguë/enfant) |

Formule : `factor = 22050 / sr_override`

---

## Installation

```bash
pip install lectura-vc-zeroshot   # module public (~7 Ko)
```

Le module public utilise l'API Lectura pour l'inférence. Le backend local ONNX nécessite les modèles pré-entraînés (~126 Mo), disponibles sous [licence commerciale](mailto:admin@lectura.world).

---

## Caractéristiques techniques

- **OpenVoice v2 ONNX** : conversion zero-shot, n'importe quelle voix cible
- **6 presets** : speaker embeddings pré-calculés (moyennes sur 100 échantillons)
- **Blend pondéré** : mélange linéaire des speaker embeddings
- **Cache SE** : les embeddings sont cachés pour éviter les ré-extractions
- **Lazy loading** : sessions ONNX chargées à la première utilisation
- **ONNX Runtime pur** : pas de dépendance PyTorch
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (code) — les modèles sont sous [licence commerciale](mailto:admin@lectura.world)
