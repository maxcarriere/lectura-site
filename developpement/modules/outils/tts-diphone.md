---
title: TTS Diphone
layout: default
permalink: /developpement/modules/outils/tts-diphone/
redirect_from:
  - /developpement/modules/metiers/tts-diphone/
  - /solutions/modules/tts-diphone/
---

> **Génération v0, gratuite.** Ce module fait partie de la première génération de Lectura : code sous AGPL-3.0, banque de diphones sous CC BY 4.0, tirée du corpus SIWIS (téléchargée depuis Hugging Face au premier usage, puis hors ligne, sans clé). Usage commercial : compris dans toute licence Lectura v1, ou sur demande. Voir [Génération v0]({{ '/developpement/modules/v0/' | relative_url }}).

<div class="module-header">
  <h1>Lectura TTS Diphone</h1>
  <p class="module-tagline">Synthèse vocale du français par concaténation de diphones (vocodeur WORLD), en local, 44,1 kHz</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-diphone/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules-v0/tree/main/Diphone" class="module-badge">GitHub</a>
    <a href="https://huggingface.co/lecturaworld/lectura-diphone-v0" class="module-badge">Hugging Face</a>
    <code class="module-install">pip install lectura-diphone</code>
  </div>
</div>

## Présentation

Synthèse vocale du français par **concaténation de diphones** dans le domaine du vocodeur **WORLD**. Tout tourne **en local** : aucune API, aucune clé.

La synthèse elle-même est faite par règles et traitement du signal, sans réseau de neurones. Les diphones sont des paramètres WORLD tirés du corpus SIWIS, moyennés par type de transition.

| Caractéristique | Valeur |
|-----------------|--------|
| **Voix** | `fr-f1`, la voix native de la banque (corpus SIWIS) |
| **Sortie** | Audio 44 100 Hz (float32), ou WAV 16 bits avec métadonnées IA |
| **Entrée** | Phonèmes IPA par groupes ; texte avec l'option `[g2p]` |
| **Modes** | `FLUIDE`, `MOT_A_MOT`, `SYLLABES` |
| **Réglages** | Vitesse, pauses, expressivité, hauteur, timbre |
| **Banque** | 19 Mo, téléchargée depuis Hugging Face au premier usage |
| **Changement de timbre** | Facultatif, par IA (option `[vc]`) : `fr-f1`, voix mélangée féminine, voix mélangée masculine |

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="https://voice.lectura.world/tts">Essayer la synthèse vocale Diphone en ligne (génération actuelle) →</a>
</div>

---

## Exemples

### En ligne de commande

```bash
lectura-diphone --phonemes "b ɔ̃ ʒ u ʁ | l ə m ɔ̃ d" -o bonjour.wav   # sans G2P
lectura-diphone "Bonjour le monde." -o bonjour.wav                    # demande [g2p]
lectura-diphone "Bonjour le monde." --mode SYLLABES --vitesse 1.2 -o lent.wav
```

### Depuis des phonèmes (Python)

```python
from lectura_diphone import creer_engine

engine = creer_engine()
resultat = engine.synthesize_groups([
    {"phones": ["b", "ɔ̃", "ʒ", "u", "ʁ"], "boundary": "comma"},
    {"phones": ["l", "ə", "m", "ɔ̃", "d"], "boundary": "period"},
], seed=1)
resultat.samples          # numpy float32, 44 100 Hz
resultat.vers_wav("bonjour.wav")   # WAV 16 bits avec métadonnées IA
```

### Depuis du texte (option `[g2p]`)

```python
from lectura_diphone import synthetiser

resultat = synthetiser("Bonjour le monde.", synth_mode="FLUIDE", seed=1)
resultat.vers_wav("bonjour.wav")
```

Le passage du texte aux phonèmes se fait par le [pipeline G2P]({{ '/developpement/modules/metiers/g2p/' | relative_url }}), lui aussi en local. `g2p=` accepte aussi votre propre fonction `texte -> [{"phones": [...], "boundary": "period"}, ...]`.

---

## Réglages

| Paramètre | Défaut | Effet |
|-----------|--------|-------|
| `mode` / `synth_mode` | `"FLUIDE"` | `FLUIDE`, `MOT_A_MOT`, `SYLLABES` |
| `duration_scale` | 1.0 | vitesse (>1 = plus lent) |
| `pause_scale` | 1.0 | durée des pauses entre groupes |
| `sentence_pause_ms` | 400 | pause entre phrases (ms) |
| `macro_expressivity` | 1.0 | gestes prosodiques (0 = plat, 2 = exagéré) |
| `micro_expressivity` | 1.0 | micro-variations (mode FLUIDE) |
| `prosody_style` | `"regles"` | `"regles"` (LHiLH*) ou `"corpus"` (contours tirés du corpus SIWIS) |
| `base_f0` | 175.0 | hauteur de base (Hz) |
| `ap_cleanup`, `formant_sharpening`, `vtln_alpha` | 1.5, 1.3, 1.0 | réglages du timbre par traitement du signal |
| `timbre` | `None` | signature paramétrique `"neutre"`, `"homme"`, `"enfant"` (traitement du signal) |
| `seed` | `None` | graine : même graine, même son |
| `voix` | `None` | changement de timbre par IA, voir ci-dessous |

---

## Changement de timbre par IA (option `[vc]`)

`voix=` convertit le son avec OpenVoice, par l'intermédiaire de [VC ZeroShot]({{ '/developpement/modules/outils/vc-zeroshot/' | relative_url }}). Trois timbres, identifiés de façon neutre :

| Identifiant | Timbre |
|-------------|--------|
| `fr-f1` | voix native de la banque (corpus SIWIS) |
| `melange-f` | voix mélangée féminine (vecteur de timbre moyen de plusieurs voix) |
| `melange-h` | voix mélangée masculine (idem) |

Aucun fichier audio de référence n'est accepté ici : ce module ne sert pas à imiter une personne.

---

## Marquage IA

Les WAV écrits par `vers_wav`, `ecrire_wav` ou la ligne de commande portent des métadonnées lisibles par machine (type de source IPTC `trainedAlgorithmicMedia`, chunk `LIST/INFO`), qui les signalent comme une voix de synthèse. Un son passé par le changement de timbre porte en plus un filigrane inaudible (AudioSeal).

**Ne retirez pas ce marquage** : le règlement européen sur l'IA (art. 50) l'exige. `resultat.samples` est un tableau brut, sans métadonnées : pour un fichier diffusé, passez par `vers_wav` ou `ecrire_wav`.

---

## Fonctionnement

```
Texte → [G2P] → phonèmes IPA → chaîne de diphones
      → paramètres WORLD (F0, enveloppe spectrale, apériodicité)
      → étirement + concaténation → prosodie (F0, durées)
      → réglages du timbre → synthèse WORLD → audio 44 100 Hz
      → [facultatif] changement de timbre (OpenVoice, filigrane IA)
```

---

## Installation

```bash
pip install lectura-diphone            # synthèse depuis des phonèmes (pyworld, numpy, scipy)
pip install "lectura-diphone[g2p]"     # + texte -> phonèmes (lectura-g2p, en local)
pip install "lectura-diphone[vc]"      # + changement de timbre par IA (lectura-vc-zeroshot)
```

La banque (`diphones.dpk.gz`, 18,9 Mo, et `diphone_statistics.pkl`, 0,2 Mo) n'est pas dans le paquet. Au premier usage, elle est téléchargée depuis Hugging Face ([lecturaworld/lectura-diphone-v0](https://huggingface.co/lecturaworld/lectura-diphone-v0)) et vérifiée par son empreinte SHA-256. Elle est rangée dans le dossier passé en `models_dir`, sinon dans `$LECTURA_MODELS_DIR/tts_diphone/`, sinon dans `~/.lectura/models/tts_diphone/`.

- `LECTURA_HORS_LIGNE=1` : aucun téléchargement ; erreur claire si la banque manque.
- `lectura-diphone --telecharger` télécharge la banque, `lectura-diphone --verifier` contrôle les empreintes.

---

## Licence

- **Code** : AGPL-3.0-or-later.
- **Banque de diphones et statistiques prosodiques** : adaptations de « The SIWIS French Speech Synthesis Database » (University of Edinburgh, CSTR, 2017), sous CC BY 4.0. Crédit complet dans les [mentions légales]({{ '/mentions-legales/#corpus-tiers' | relative_url }}) et dans le fichier NOTICE du paquet. Cette réutilisation n'implique aucune approbation des auteurs du corpus.
- **Changement de timbre** : voir [VC ZeroShot]({{ '/developpement/modules/outils/vc-zeroshot/' | relative_url }}) (OpenVoice et AudioSeal sous licence MIT).
- **Usage commercial ou intégration dans un produit fermé** : compris dans toute licence Lectura v1, ou sur demande par la [page Contact]({{ '/contact/' | relative_url }}).
