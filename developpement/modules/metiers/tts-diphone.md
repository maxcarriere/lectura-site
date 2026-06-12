---
title: TTS Diphone
layout: default
permalink: /developpement/modules/metiers/tts-diphone/
redirect_from:
  - /solutions/modules/tts-diphone/
---

<div class="module-header">
  <h1>Lectura TTS Diphone</h1>
  <p class="module-tagline">Synthèse vocale par concaténation de diphones WORLD — prosodie réglée, retimbre multi-voix, 44.1 kHz</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-tts-diphone/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/TTS-Diphone" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-tts-diphone</code>
  </div>
</div>

## Présentation

Moteur de synthèse vocale pour le français basé sur la **concaténation de diphones** dans le domaine **WORLD** (F0 + spectral envelope + aperiodicity). Produit un signal audio haute fidélité à 44100 Hz avec une prosodie réglée (intonation, pauses, expressivité).

| Caractéristique | Valeur |
|-----------------|--------|
| **Qualité** | Voix féminine claire (corpus SIWIS) |
| **Sortie** | Audio 44100 Hz, float32 |
| **Taille modèle** | ~15 Mo (diphones compressés) |
| **Entrée** | Texte français ou phonèmes IPA |
| **Prosodie** | Déclaratif, interrogatif, exclamatif, suspensif |
| **Contrôles** | Vitesse, pauses, expressivité macro/micro, contraste spectral |
| **Retimbre** | OpenVoice zero-shot (optionnel) : presets, blend de voix, variantes homme/enfant |

Trois modes de lecture : **FLUIDE** (lecture naturelle), **MOT_A_MOT** et **SYLLABES** — adapté à l'apprentissage de la lecture.

---

## Essayer en ligne

*La démo utilise l'API Lectura — aucun téléchargement nécessaire.*

<div class="tts-diphone-demo">
  <input type="text" class="tts-input" value="Le soleil brille sur la ville." placeholder="Entrez du texte français...">
  <div style="display: flex; gap: 0.5em; margin: 0.5em 0; flex-wrap: wrap; align-items: center;">
    <select class="tts-mode">
      <option value="FLUIDE">Fluide</option>
      <option value="MOT_A_MOT">Mot à mot</option>
      <option value="SYLLABES">Syllabes</option>
    </select>
    <select class="tts-style">
      <option value="regles" selected>Règles</option>
      <option value="corpus">Corpus</option>
    </select>
    <select class="tts-voix">
      <option value="">Sans retimbre</option>
      <option value="siwis" selected>Siwis (F)</option>
      <option value="ezwa">Ezwa (F)</option>
      <option value="nadine">Nadine (F)</option>
      <option value="bernard">Bernard (M)</option>
      <option value="gilles">Gilles (M)</option>
      <option value="zeckou">Zeckou (M)</option>
    </select>
    <label class="tts-variante-label" style="display:flex; align-items:center; gap:0.3em; font-size:0.85em;">
      <span style="opacity:0.7">Homme</span>
      <input type="range" class="tts-variante" min="-1" max="1" step="0.1" value="0" style="width:80px;">
      <span style="opacity:0.7">Enfant</span>
    </label>
    <button class="tts-btn" type="button">Synthétiser</button>
  </div>
  <div class="tts-progress-container"><div class="tts-progress"></div></div>
  <pre class="tts-output">Cliquez sur le bouton pour synthétiser.</pre>
</div>

<script src="{{ '/assets/js/tts-diphone-demo.js' | relative_url }}?v=2"></script>

---

## Exemple de code

```python
from lectura_tts_diphone import synthetiser

# Synthèse simple (nécessite lectura-g2p)
audio = synthetiser("Le soleil brille sur la ville.")

# Avec retimbre OpenVoice (nécessite pip install 'lectura-tts-diphone[vc]')
audio = synthetiser("Bonjour comment allez-vous.",
                    voix="siwis")

# Blend de presets
audio = synthetiser("Bonjour comment allez-vous.",
                    voix={"siwis": 0.5, "nadine": 0.3, "ezwa": 0.2})

# Variante vocale (formants décalés)
audio = synthetiser("Bonjour comment allez-vous.",
                    voix="siwis",
                    voix_variante=0.3)    # +0.3 = légèrement aigu
```

```python
from lectura_tts_diphone import creer_engine

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

---

## Architecture

```
Texte --> [G2P] --> Phonemes IPA --> Diphone chain
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

Le **retimbre** (optionnel) passe l'audio synthétisé dans OpenVoice pour remplacer le timbre "moyen" du diphone par un timbre cohérent issu d'une voix de référence.

---

## Installation

```bash
pip install lectura-tts-diphone               # import seul
pip install "lectura-tts-diphone[local]"      # inférence locale (pyworld + numpy + scipy)
pip install "lectura-tts-diphone[vc]"         # avec retimbre OpenVoice (lectura-vc-zeroshot)
pip install "lectura-tts-diphone[all]"        # local + G2P + retimbre
```

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

## Retimbre (OpenVoice)

Le retimbre est un post-traitement optionnel qui remplace le timbre "moyen" du diphone par une voix cohérente via [OpenVoice zero-shot]({{ '/developpement/modules/metiers/vc-zeroshot/' | relative_url }}). Activé par le paramètre `voix`.

```bash
# Prérequis
pip install "lectura-tts-diphone[vc]"
```

### Paramètre `voix`

Le paramètre `voix` est polymorphe et accepte plusieurs types :

| Type | Exemple | Description |
|------|---------|-------------|
| `str` (preset) | `voix="siwis"` | Utilise un preset pré-calculé |
| `str` (fichier) | `voix="ref.wav"` | Extrait le timbre d'un fichier audio |
| `list[str]` | `voix=["siwis", "nadine"]` | Moyenne de plusieurs presets (poids égaux) |
| `dict[str, float]` | `voix={"siwis": 0.5, "nadine": 0.5}` | Blend pondéré |
| `None` | `voix=None` | Pas de retimbre (défaut) |

**Presets disponibles** : siwis, ezwa, nadine, bernard, gilles, zeckou.

### Paramètre `voix_variante`

Curseur de -1 à +1 qui décale les formants sans changer le pitch fondamental :

| Valeur | Effet |
|--------|-------|
| -1.0 | Formants baissés (voix grave/masculine) |
| 0.0 | Neutre (pas de décalage) |
| +1.0 | Formants montés (voix aiguë/enfant) |

### Exemples

```python
from lectura_tts_diphone import synthetiser

# Voix neutre (preset siwis)
audio = synthetiser("Bonjour.", voix="siwis")

# Blend 50/50 siwis + nadine
audio = synthetiser("Bonjour.", voix={"siwis": 0.5, "nadine": 0.5})

# Variante masculine (même preset, formants baissés)
audio = synthetiser("Bonjour.", voix="bernard", voix_variante=-0.5)

# Variante enfant (formants montés)
audio = synthetiser("Bonjour.", voix="siwis", voix_variante=0.8)

# Combinaison : blend + variante + pitch bas
audio = synthetiser("Bonjour.",
                    voix={"siwis": 0.5, "nadine": 0.5},
                    voix_variante=-0.3,
                    base_f0=120.0)
```

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
