---
title: TTS Diphone
layout: default
permalink: /solutions/modules/tts-diphone/
---

<div class="module-header">
  <h1>Lectura TTS Diphone</h1>
  <p class="module-tagline">Synthese vocale par concatenation de diphones WORLD — prosodie reglee, retimbre multi-voix, 44.1 kHz</p>
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
| **Retimbre** | OpenVoice zero-shot (optionnel) : presets, blend de voix, variantes homme/enfant |

Trois modes de lecture : **FLUIDE** (lecture naturelle), **MOT_A_MOT** et **SYLLABES** — adapte a l'apprentissage de la lecture.

---

## Essayer en ligne

*La demo utilise l'API Lectura — aucun telechargement necessaire.*

<div class="tts-diphone-demo">
  <input type="text" class="tts-input" value="Le soleil brille sur la ville." placeholder="Entrez du texte francais...">
  <div style="display: flex; gap: 0.5em; margin: 0.5em 0; flex-wrap: wrap; align-items: center;">
    <select class="tts-mode">
      <option value="FLUIDE">Fluide</option>
      <option value="MOT_A_MOT">Mot a mot</option>
      <option value="SYLLABES">Syllabes</option>
    </select>
    <select class="tts-style">
      <option value="regles" selected>Regles</option>
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
    <label class="tts-variante-label" style="display:flex; align-items:center; gap:0.3em; font-size:0.9em;">
      Variante: <input type="range" class="tts-variante" min="-1" max="1" step="0.1" value="0" style="width:80px;">
      <span class="tts-variante-val">0</span>
    </label>
    <button class="tts-btn" type="button">Synthetiser</button>
  </div>
  <div class="tts-progress-container"><div class="tts-progress"></div></div>
  <pre class="tts-output">Cliquez sur le bouton pour synthetiser.</pre>
</div>

<script src="{{ '/assets/js/tts-diphone-demo.js' | relative_url }}"></script>

---

## Exemple de code

```python
from lectura_tts_diphone import synthetiser

# Synthese simple (necessite lectura-g2p)
audio = synthetiser("Le soleil brille sur la ville.")

# Avec retimbre OpenVoice (necessite pip install 'lectura-tts-diphone[vc]')
audio = synthetiser("Bonjour comment allez-vous.",
                    voix="siwis")

# Blend de presets
audio = synthetiser("Bonjour comment allez-vous.",
                    voix={"siwis": 0.5, "nadine": 0.3, "ezwa": 0.2})

# Variante vocale (formants decales)
audio = synthetiser("Bonjour comment allez-vous.",
                    voix="siwis",
                    voix_variante=0.3)    # +0.3 = legerement aigu
```

```python
from lectura_tts_diphone import creer_engine

engine = creer_engine()

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

Les diphones sont des parametres WORLD (F0 + spectral envelope + aperiodicity) extraits du corpus SIWIS et moyennes par type de transition phonetique. La prosodie est reglee par des contours F0 adaptes au francais (chute declarative, montee interrogative, pauses aux ponctuations).

Le **retimbre** (optionnel) passe l'audio synthetise dans OpenVoice pour remplacer le timbre "moyen" du diphone par un timbre coherent issu d'une voix de reference.

---

## Installation

```bash
pip install lectura-tts-diphone               # import seul
pip install "lectura-tts-diphone[local]"      # inference locale (pyworld + numpy + scipy)
pip install "lectura-tts-diphone[vc]"         # avec retimbre OpenVoice (lectura-vc-zeroshot)
pip install "lectura-tts-diphone[all]"        # local + G2P + retimbre
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
| prosody_style | "regles" | Style prosodique : "regles" (LHiLH*, stable) ou "corpus" (extrait du corpus SIWIS, plus varie) |
| seed | None | Graine aleatoire pour micro-prosodie reproductible |

---

## Retimbre (OpenVoice)

Le retimbre est un post-traitement optionnel qui remplace le timbre "moyen" du diphone par une voix coherente via [OpenVoice zero-shot]({{ '/solutions/modules/vc-zeroshot/' | relative_url }}). Active par le parametre `voix`.

```bash
# Prerequis
pip install "lectura-tts-diphone[vc]"
```

### Parametre `voix`

Le parametre `voix` est polymorphe et accepte plusieurs types :

| Type | Exemple | Description |
|------|---------|-------------|
| `str` (preset) | `voix="siwis"` | Utilise un preset pre-calcule |
| `str` (fichier) | `voix="ref.wav"` | Extrait le timbre d'un fichier audio |
| `list[str]` | `voix=["siwis", "nadine"]` | Moyenne de plusieurs presets (poids egaux) |
| `dict[str, float]` | `voix={"siwis": 0.5, "nadine": 0.5}` | Blend pondere |
| `None` | `voix=None` | Pas de retimbre (defaut) |

**Presets disponibles** : siwis, ezwa, nadine, bernard, gilles, zeckou.

### Parametre `voix_variante`

Curseur de -1 a +1 qui decale les formants sans changer le pitch fondamental :

| Valeur | Effet |
|--------|-------|
| -1.0 | Formants baisses (voix grave/masculine) |
| 0.0 | Neutre (pas de decalage) |
| +1.0 | Formants montes (voix aigue/enfant) |

### Exemples

```python
from lectura_tts_diphone import synthetiser

# Voix neutre (preset siwis)
audio = synthetiser("Bonjour.", voix="siwis")

# Blend 50/50 siwis + nadine
audio = synthetiser("Bonjour.", voix={"siwis": 0.5, "nadine": 0.5})

# Variante masculine (meme preset, formants baisses)
audio = synthetiser("Bonjour.", voix="bernard", voix_variante=-0.5)

# Variante enfant (formants montes)
audio = synthetiser("Bonjour.", voix="siwis", voix_variante=0.8)

# Combinaison : blend + variante + pitch bas
audio = synthetiser("Bonjour.",
                    voix={"siwis": 0.5, "nadine": 0.5},
                    voix_variante=-0.3,
                    base_f0=120.0)
```

---

## Caracteristiques techniques

- **Vocoder WORLD** : analyse/synthese haute qualite a 44100 Hz
- **1290 diphones** moyennes depuis le corpus SIWIS (~9800 phrases)
- **Prosodie francaise** : declination, chute declarative non-lineaire, montee interrogative, allongement pre-frontiere
- **GV compensation** : restaure le contraste spectral perdu par le moyennage
- **3 modes** : FLUIDE, MOT_A_MOT, SYLLABES
- **Retimbre OpenVoice** (optionnel) : presets, blend pondere, variantes formantiques
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (code) — les modeles sont sous [licence commerciale](mailto:contact@lec-tu-ra.com)
