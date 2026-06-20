---
title: TTS Diphone
layout: default
permalink: /developpement/modules/outils/tts-diphone/
redirect_from:
  - /developpement/modules/metiers/tts-diphone/
  - /solutions/modules/tts-diphone/
---

<div class="module-header">
  <h1>Lectura TTS Diphone</h1>
  <p class="module-tagline">Moteur de concaténation de diphones WORLD — prosodie réglée, retimbre multi-voix, 44.1 kHz</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-diphone/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Diphone" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-diphone</code>
  </div>
</div>

## Présentation

Moteur de synthèse vocale pour le français basé sur la **concaténation de diphones** dans le domaine **WORLD** (F0 + spectral envelope + aperiodicity). Produit un signal audio haute fidélité à 44100 Hz avec une prosodie réglée (intonation, pauses, expressivité).

| Caractéristique | Valeur |
|-----------------|--------|
| **Qualité** | Voix féminine claire (corpus SIWIS) |
| **Sortie** | Audio 44100 Hz, float32 |
| **Taille modèle** | ~15 Mo (diphones compressés) |
| **Entrée** | Phonèmes IPA (groupes de lecture) |
| **Prosodie** | Déclaratif, interrogatif, exclamatif, suspensif |
| **Contrôles** | Vitesse, pauses, expressivité macro/micro, contraste spectral |
| **Retimbre** | OpenVoice zero-shot (optionnel) : presets, blend de voix, variantes homme/enfant |

Trois modes de lecture : **FLUIDE** (lecture naturelle), **MOT_A_MOT** et **SYLLABES** — adapté à l'apprentissage de la lecture.

> **Brique vs Pipeline** : Ce moteur est la brique acoustique diphonique (phonèmes → audio). Pour le pipeline complet TTS (texte → audio avec G2P intégré et choix de moteur), voir la [page TTS]({{ '/developpement/modules/metiers/tts/' | relative_url }}).

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="{{ '/solutions/synthese-vocale/#diphone--lecture-adaptée' | relative_url }}">Essayer la synthèse vocale Diphone en ligne →</a>
</div>

---

## Exemple de code

```python
from lectura_diphone import creer_engine

engine = creer_engine()

# Depuis des phonèmes IPA avec contrôles
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

```python
from lectura_diphone import synthetiser

# Synthèse simple (nécessite lectura-g2p)
audio = synthetiser("Le soleil brille sur la ville.")

# Avec retimbre OpenVoice
audio = synthetiser("Bonjour comment allez-vous.", voix="siwis")

# Blend de presets
audio = synthetiser("Bonjour.", voix={"siwis": 0.5, "nadine": 0.3, "ezwa": 0.2})

# Variante vocale (formants décalés)
audio = synthetiser("Bonjour.", voix="siwis", voix_variante=0.3)
```

---

## Architecture

```
Phonemes IPA --> Diphone chain
                      |
              WORLD params (F0 + SP + AP)
                      |
              Stretch + Concat (overlap)
                      |
              Prosodie (F0 contour + durees)
                      |
              GV compensation (contraste spectral)
                      |
              pw.synthesize --> Audio 44100 Hz
                      |
              [Retimbre OpenVoice]  (optionnel, si voix!=None)
                      |
              Audio final 44100 Hz
```

Les diphones sont des paramètres WORLD (F0 + spectral envelope + aperiodicity) extraits du corpus SIWIS et moyennés par type de transition phonétique. La prosodie est réglée par des contours F0 adaptés au français (chute déclarative, montée interrogative, pauses aux ponctuations).

---

## Contrôles prosodiques

| Paramètre | Défaut | Description |
|-----------|--------|-------------|
| duration_scale | 1.0 | Vitesse globale (>1 = plus lent) |
| pause_scale | 1.0 | Durée des pauses intra-phrase (virgules, etc.) |
| sentence_pause_ms | 400 | Pause inter-phrase en ms (entre phrases séparées par . ! ? ...) |
| macro_expressivity | 2.0 | Gestes prosodiques aux ponctuations (0=neutre, 4=exagéré) |
| micro_expressivity | 5.0 | Micro-variations (0=robot, 10=très expressif) |
| spectral_contrast | 1.5 | Contraste spectral GV (1.0=off, 2.0=fort) |
| prosody_style | "regles" | Style prosodique : "regles" (LHiLH*, stable) ou "corpus" (extrait du corpus SIWIS, plus varié) |
| seed | None | Graine aléatoire pour micro-prosodie reproductible |

---

## Installation

```bash
# Moteur brut (phonèmes → audio)
pip install lectura-diphone               # mode API (zero config, zéro dépendance)
pip install "lectura-diphone[local]"      # inférence locale (pyworld + numpy + scipy)

# Pipeline complet (texte → audio)
pip install "lectura-tts-dipho[local]"           # G2P + moteur local
pip install "lectura-tts-dipho[local,retimbre]"  # + retimbre multi-voix (OpenVoice)
```

| Extra | Package | Contenu |
|-------|---------|---------|
| `[local]` | `lectura-diphone` | Backend local pyworld + numpy + scipy |
| `[local]` | `lectura-tts-dipho` | Pipeline G2P + moteur local |
| `[retimbre]` | `lectura-tts-dipho` | Retimbre multi-voix via OpenVoice |
| `[aligneur]` | `lectura-tts-dipho` | Syllabation pour le mode lecture syllabique (lectura-aligneur) |

---

## Caractéristiques techniques

- **Vocoder WORLD** : analyse/synthèse haute qualité à 44100 Hz
- **1290 diphones** moyennés depuis le corpus SIWIS (~9800 phrases)
- **Prosodie française** : déclinaison, chute déclarative non-linéaire, montée interrogative, allongement pré-frontière
- **GV compensation** : restaure le contraste spectral perdu par le moyennage
- **3 modes** : FLUIDE, MOT_A_MOT, SYLLABES
- **Retimbre OpenVoice** (optionnel) : presets, blend pondéré, variantes formantiques
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (code) — les modèles sont sous [licence commerciale](mailto:admin@lectura.world)
