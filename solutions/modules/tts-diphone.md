---
title: TTS Diphone
layout: default
permalink: /solutions/modules/tts-diphone/
---

<div class="module-header">
  <h1>Lectura TTS Diphone</h1>
  <p class="module-tagline">Synthese vocale par concatenation de diphones WORLD — prosodie reglee, 44.1 kHz</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-tts-diphone/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/TTS-Diphone" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-tts-diphone</code>
  </div>
</div>

## Presentation

Moteur de synthese vocale pour le francais base sur la **concatenation de diphones** dans le domaine **WORLD** (F0 + spectral envelope + aperiodicity). Produit un signal audio haute fidelite a 44100 Hz avec une prosodie reglee (intonation, pauses, expressivite).

| Caracteristique | Valeur |
|-----------------|--------|
| **Qualite** | Voix feminine claire (corpus SIWIS) |
| **Sortie** | Audio 44100 Hz, float32 |
| **Taille modele** | ~15 Mo (diphones compresses) |
| **Entree** | Texte francais ou phonemes IPA |
| **Prosodie** | Declaratif, interrogatif, exclamatif, suspensif |
| **Controles** | Vitesse, pauses, expressivite macro/micro, contraste spectral |

Trois modes de lecture : **FLUIDE** (lecture naturelle), **MOT_A_MOT** et **SYLLABES** — adapte a l'apprentissage de la lecture.

---

## Exemple de code

```python
from lectura_tts_diphone import creer_engine

engine = creer_engine()

# Depuis du texte (necessite lectura-g2p)
from lectura_tts_diphone import synthetiser
audio = synthetiser("Le soleil brille sur la ville.")

# Depuis des phonemes IPA avec controles
audio = engine.synthesize_groups(
    [
        {"phones": ["l", "ə", "s", "ɔ", "l", "ɛ", "j"], "boundary": "none"},
        {"phones": ["b", "ʁ", "i", "j"], "boundary": "none"},
        {"phones": ["s", "y", "ʁ", "l", "a", "v", "i", "l"], "boundary": "period"},
    ],
    mode="FLUIDE",
    duration_scale=1.2,
    macro_expressivity=2.0,
    micro_expressivity=5.0,
    spectral_contrast=1.5,
)
```

---

## Architecture

```
Texte → [G2P] → Phonemes IPA → Diphone chain
                                      ↓
                              WORLD params (F0 + SP + AP)
                                      ↓
                              Stretch + Concat (overlap)
                                      ↓
                              Prosodie (F0 contour + durees)
                                      ↓
                              GV compensation (contraste spectral)
                                      ↓
                              pw.synthesize → Audio 44100 Hz
```

Les diphones sont des parametres WORLD (F0 + spectral envelope + aperiodicity) extraits du corpus SIWIS et moyennes par type de transition phonetique. La prosodie est reglee par des contours F0 adaptes au francais (chute declarative, montee interrogative, pauses aux ponctuations).

---

## Installation

```bash
pip install lectura-tts-diphone               # import seul
pip install "lectura-tts-diphone[local]"      # inference locale (pyworld + numpy + scipy)
pip install "lectura-tts-diphone[all]"        # avec G2P integre (texte → audio)
```

---

## Controles prosodiques

| Parametre | Defaut | Description |
|-----------|--------|-------------|
| duration_scale | 1.0 | Vitesse globale (>1 = plus lent) |
| pause_scale | 1.0 | Duree des pauses inter-groupes |
| macro_expressivity | 2.0 | Gestes prosodiques aux ponctuations (0=neutre, 4=exagere) |
| micro_expressivity | 5.0 | Micro-variations (0=robot, 10=tres expressif) |
| spectral_contrast | 1.5 | Contraste spectral GV (1.0=off, 2.0=fort) |
| prosody_style | "auto" | Force le style : "declaratif", "question", "exclamation", "suspensif", "neutre" |
| seed | None | Graine aleatoire pour micro-prosodie reproductible |

---

## Caracteristiques techniques

- **Vocoder WORLD** : analyse/synthese haute qualite a 44100 Hz
- **1290 diphones** moyennes depuis le corpus SIWIS (~9800 phrases)
- **Prosodie francaise** : declination, chute declarative non-lineaire, montee interrogative, allongement pre-frontiere
- **GV compensation** : restaure le contraste spectral perdu par le moyennage
- **3 modes** : FLUIDE, MOT_A_MOT, SYLLABES
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (code) — les modeles sont sous [licence commerciale](mailto:contact@lec-tu-ra.com)
