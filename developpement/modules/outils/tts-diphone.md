---
title: TTS Diphone
layout: default
permalink: /developpement/modules/outils/tts-diphone/
redirect_from:
  - /developpement/modules/metiers/tts-diphone/
  - /solutions/modules/tts-diphone/
---

> **Génération v0.** Ce module fait partie de la première génération de Lectura, publiée en 2026 sous double licence : AGPL-3.0, ou licence commerciale pour l'intégrer à un produit fermé. Voir [Génération v0]({{ '/developpement/modules/v0/' | relative_url }}).

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
| **Qualité** | Voix féminine claire |
| **Sortie** | Audio 44100 Hz, float32 |
| **Diphones** | non inclus dans le paquet : synthèse par l'API de Lectura (avec une clé), ou en local avec un dictionnaire de diphones sous licence |
| **Entrée** | Phonèmes IPA (groupes de lecture) |
| **Prosodie** | Déclaratif, interrogatif, exclamatif, suspensif |
| **Contrôles** | Vitesse, pauses, expressivité macro/micro, contraste spectral |
| **Retimbre** | OpenVoice zero-shot (optionnel, avec `lectura-vc-zeroshot`) : presets, blend de voix, variantes homme/enfant |

Trois modes de lecture : **FLUIDE** (lecture naturelle), **MOT_A_MOT** et **SYLLABES** — adapté à l'apprentissage de la lecture.

> **Brique acoustique** : ce moteur transforme des phonèmes en audio. Pour partir du texte, la fonction `synthetiser` s'appuie sur le [G2P]({{ '/developpement/modules/metiers/g2p/' | relative_url }}), dont les modèles tournent sur l'API de Lectura (clé dans la variable d'environnement `LECTURA_API_KEY`).

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="https://voice.lectura.world/tts">Essayer la synthèse vocale Diphone en ligne (génération actuelle) →</a>
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

# Synthèse simple (texte → phonèmes par l'API de Lectura, clé requise)
audio = synthetiser("Le soleil brille sur la ville.")

# Avec retimbre OpenVoice
audio = synthetiser("Bonjour comment allez-vous.", voix="fr-f1")

# Blend de presets
audio = synthetiser("Bonjour.", voix={"fr-f1": 0.5, "fr-f3": 0.3, "fr-f2": 0.2})

# Variante vocale (formants décalés)
audio = synthetiser("Bonjour.", voix="fr-f1", voix_variante=0.3)
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

Les diphones sont des paramètres WORLD (F0 + spectral envelope + aperiodicity) extraits d'un corpus de parole et moyennés par type de transition phonétique. La prosodie est réglée par des contours F0 adaptés au français (chute déclarative, montée interrogative, pauses aux ponctuations).

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
| prosody_style | "regles" | Style prosodique : "regles" (LHiLH*, stable) ou "corpus" (extrait du corpus, plus varié) |
| seed | None | Graine aléatoire pour micro-prosodie reproductible |

---

## Installation

```bash
# Moteur brut (phonèmes → audio)
pip install lectura-diphone               # synthèse par l'API (clé dans LECTURA_API_KEY)
pip install "lectura-diphone[local]"      # en local, avec un dictionnaire de diphones sous licence

# Retimbre multi-voix (OpenVoice)
pip install lectura-vc-zeroshot
```

| Extra | Package | Contenu |
|-------|---------|---------|
| `[local]` | `lectura-diphone` | Backend local pyworld + numpy + scipy |

---

## Caractéristiques techniques

- **Vocoder WORLD** : analyse/synthèse haute qualité à 44100 Hz
- **1290 diphones** moyennés depuis un corpus de parole (~9800 phrases)
- **Prosodie française** : déclinaison, chute déclarative non-linéaire, montée interrogative, allongement pré-frontière
- **GV compensation** : restaure le contraste spectral perdu par le moyennage
- **3 modes** : FLUIDE, MOT_A_MOT, SYLLABES
- **Retimbre OpenVoice** (optionnel, avec `lectura-vc-zeroshot`) : presets, blend pondéré, variantes formantiques
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : double licence, AGPL-3.0 ou licence commerciale pour l'intégrer à un produit fermé — licence commerciale sur demande : [contacter Lectura]({{ '/contact/' | relative_url }})
