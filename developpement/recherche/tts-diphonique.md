---
title: TTS diphonique
layout: default
permalink: /developpement/recherche/tts-diphonique/
redirect_from:
  - /projets/tts/
  - /developpement/recherche/synthese-vocale/
---

<span class="status-badge status-cours">En cours</span>

## Le projet

La synthèse par concaténation de diphones est l'approche TTS historique de Lectura, développée en parallèle des modèles neuraux. L'enjeu est de produire une voix **claire et articulée** adaptée à l'apprentissage de la lecture, avec un contrôle fin sur la prosodie et la possibilité de prononcer des syllabes isolées.

Cette approche est implémentée dans le moteur [TTS Diphone]({{ '/developpement/modules/outils/tts-diphone/' | relative_url }}).

---

## Vocoder WORLD

Le système utilise le vocoder **WORLD** (Morise et al.) pour représenter le signal vocal sous forme de 3 paramètres :

| Paramètre | Description |
|-----------|-------------|
| **F0** | Fréquence fondamentale (pitch) — contour mélodique |
| **SP** | Spectral Envelope — timbre et formants |
| **AP** | Aperiodicity — rapport bruit/harmoniques |

Cette représentation permet de manipuler indépendamment le pitch, le timbre et la durée sans artefacts audibles, contrairement aux approches time-domain (PSOLA, WORLD-TD).

---

## Synthèse par concaténation

### Construction du corpus de diphones

1. **Source** : corpus SIWIS (~9800 phrases lues par une locutrice française professionnelle)
2. **Segmentation** : extraction de tous les diphones (transitions phone→phone) par alignement forcé
3. **Analyse WORLD** : chaque segment est décomposé en (F0, SP, AP)
4. **Moyennage** : pour chaque type de diphone (ex : /a→b/), les paramètres WORLD sont moyennés sur toutes les occurrences → **1290 diphones** types

### Synthèse

```
Séquence de phonèmes
        │
        ▼
Sélection des diphones (chaîne de transitions)
        │
        ▼
Paramètres WORLD (F0 + SP + AP) par diphone
        │
        ▼
Étirement temporel (durées cibles)
        │
        ▼
Concaténation avec overlap
        │
        ▼
Application de la prosodie (contour F0)
        │
        ▼
GV compensation (restauration du contraste spectral)
        │
        ▼
pw.synthesize() → audio 44100 Hz
```

---

## Modèle prosodique

Le modèle prosodique encode les règles d'intonation du français :

### Contours F0

| Type de phrase | Comportement |
|----------------|-------------|
| **Déclarative** | Chute non-linéaire vers la fin (déclinaison + chute finale) |
| **Interrogative** | Montée sur la dernière syllabe |
| **Exclamative** | Pic élevé + chute rapide |
| **Suspensive** | Maintien à mi-hauteur (pas de chute finale) |

### Micro-prosodie

- **Macro-expressivité** : gestes prosodiques aux frontières (ponctuations)
- **Micro-expressivité** : variations aléatoires corrélées (jitter F0, légères variations de durée)
- **Allongement pré-frontière** : la syllabe avant une ponctuation est légèrement allongée
- **Pause prosodique** : silence proportionnel au type de ponctuation

### GV compensation

Le moyennage des diphones lisse le spectre (perte de contraste). La **Global Variance compensation** restaure la dynamique spectrale en amplifiant les écarts par rapport à la moyenne : `SP_gv = mean + (SP - mean) * factor`.

---

## Retimbre

Le timbre "moyen" du diphone (issu du moyennage) est remplaçable par un timbre cohérent via [OpenVoice zero-shot]({{ '/developpement/modules/outils/vc-zeroshot/' | relative_url }}). Cela permet d'obtenir 6 voix distinctes à partir d'un unique corpus de diphones.

---

## Avantages de l'approche diphonique

| Avantage | Détail |
|----------|--------|
| **Contrôle prosodique total** | Chaque paramètre (F0, durée, timbre) est manipulable indépendamment |
| **Modes de lecture** | FLUIDE, MOT_A_MOT, SYLLABES — impossible avec les modèles end-to-end |
| **Léger** | ~15 Mo de diphones (vs ~30-40 Mo pour les modèles neuraux) |
| **Reproductible** | Même entrée → même sortie (seed pour micro-prosodie) |
| **Compréhensible** | Chaque étape est inspectable et ajustable |

---

## État d'avancement

Le moteur est fonctionnel et intégré au [pipeline TTS]({{ '/developpement/modules/metiers/tts/' | relative_url }}). Les 1290 diphones couvrent la totalité des transitions phonétiques du français courant.

Les travaux en cours portent sur :
- l'amélioration des transitions entre diphones (lissage spectral adaptatif),
- l'enrichissement du modèle prosodique (expressivité émotionnelle),
- la construction d'un second corpus de diphones (voix masculine).
