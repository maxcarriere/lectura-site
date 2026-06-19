---
title: TTS diphonique
layout: default
permalink: /developpement/recherche/tts-diphonique/
redirect_from:
  - /projets/tts/
  - /developpement/recherche/synthese-vocale/
---

## Le projet

La synthèse vocale concaténative est l'approche TTS historique de Lectura, développée en parallèle des modèles neuraux. L'enjeu est de produire une voix **claire et articulée** adaptée à l'apprentissage de la lecture, avec un contrôle fin sur la prosodie et la possibilité de prononcer des syllabes isolées.

Le principe de la synthèse concaténative est simple : découper la parole en petites unités pré-enregistrées, puis les assembler pour former n'importe quel énoncé. La question centrale est le choix de l'unité.

Cette approche est implémentée dans le moteur [TTS Diphone]({{ '/developpement/modules/outils/tts-diphone/' | relative_url }}).

---

## Le choix de l'unité : un parcours par élimination

### L'approche syllabique (abandonnée)

La première idée était d'utiliser la **syllabe** comme unité de concaténation. En théorie, la syllabe est une unité naturelle : elle est perceptivement cohérente et correspond à la granularité de la lecture syllabique.

En pratique, le corpus disponible (SIWIS, ~9800 phrases) ne contenait pas suffisamment de représentants pour couvrir toutes les syllabes du français. Le nombre de syllabes distinctes est trop élevé (plusieurs milliers), et beaucoup n'apparaissaient que quelques fois dans le corpus, voire pas du tout. Sans couverture suffisante, la synthèse produisait des trous ou des syllabes de mauvaise qualité.

### La sélection d'unités (abandonnée)

La deuxième piste était la **sélection d'unités** (unit selection) : au lieu de moyenner les occurrences d'une même unité, on sélectionne à chaque synthèse l'occurrence la plus adaptée au contexte (en minimisant un coût de concaténation et un coût cible).

Le problème : les transitions entre unités sélectionnées produisaient des **cassures audibles**. Comme chaque unité provient d'un contexte d'enregistrement différent, il n'y a aucune garantie de continuité spectrale aux frontières. Le résultat sonnait haché et incohérent.

### Le diphone : la bonne unité

Le **diphone** est la solution qui a fonctionné. Un diphone est une unité qui va du **milieu d'un phonème au milieu du phonème suivant**. Il capture donc la **transition** entre deux sons, qui est précisément la partie la plus difficile à synthétiser.

```
     phonème A          phonème B
  ┌──────────────┐  ┌──────────────┐
  │     │████████████████│          │
  │     │  diphone A→B   │          │
  └─────┴────────────────┴──────────┘
        ↑                ↑
   milieu de A      milieu de B
```

L'avantage du diphone est double :

- La **transition** (coarticulation) est capturée dans l'unité elle-même, ce qui élimine les cassures aux frontières.
- Le nombre de diphones est bien plus petit que le nombre de syllabes : **1290 diphones** suffisent à couvrir toutes les transitions du français courant.

### Exemple de concaténation

Pour synthétiser le mot « bonjour » (/bɔ̃ʒuʁ/), le moteur enchaîne les diphones suivants :

```
 _→b    b→ɔ̃    ɔ̃→ʒ    ʒ→u    u→ʁ    ʁ→_
  │      │      │      │      │      │
  ▼      ▼      ▼      ▼      ▼      ▼
┌────┬──────┬──────┬─────┬─────┬─────┐
│_→b │ b→ɔ̃  │ ɔ̃→ʒ  │ ʒ→u │ u→ʁ │ ʁ→_ │
└────┴──────┴──────┴─────┴─────┴─────┘
         ↕      ↕     ↕     ↕
     transitions naturelles
     (capturées dans chaque diphone)
```

Chaque diphone chevauche son voisin : la seconde moitié du diphone `b→ɔ̃` correspond à la première moitié du diphone `ɔ̃→ʒ`. Les zones de recouvrement sont fusionnées par overlap, ce qui assure la continuité du signal. Le `_` représente le silence (début et fin d'énoncé).

---

## Vocoder WORLD

Le système utilise le vocoder **WORLD** (Morise et al.) pour représenter le signal vocal sous forme de 3 paramètres :

| Paramètre | Description |
|-----------|-------------|
| **F0** | Fréquence fondamentale (pitch), contour mélodique |
| **SP** | Spectral Envelope, timbre et formants |
| **AP** | Aperiodicity, rapport bruit/harmoniques |

Cette représentation permet de manipuler indépendamment le pitch, le timbre et la durée sans artefacts audibles, contrairement aux approches time-domain (PSOLA).

---

## Construction du corpus de diphones

1. **Source** : corpus SIWIS (~9800 phrases lues par une locutrice française professionnelle)
2. **Alignement forcé** : le texte de chaque phrase est d'abord phonémisé, puis aligné avec l'audio par **MFA** (Montreal Forced Aligner). MFA produit un découpage temporel précis de chaque phonème dans le signal audio. Sans cet alignement, il serait impossible de savoir où commence et où finit chaque son dans l'enregistrement.
3. **Segmentation** : à partir de l'alignement MFA, extraction de tous les diphones (du milieu d'un phonème au milieu du suivant)
4. **Analyse WORLD** : chaque segment est décomposé en (F0, SP, AP)
5. **Moyennage** : pour chaque type de diphone (ex : /a→b/), les paramètres WORLD sont moyennés sur toutes les occurrences, ce qui produit **1290 diphones** types

---

## Synthèse

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

## Limites de l'approche

L'approche diphonique avec moyennage présente deux limites principales :

- **Le moyennage casse le timbre.** En moyennant les paramètres spectraux de toutes les occurrences d'un même diphone, on obtient un timbre « moyen » qui manque de caractère et de naturel. La GV compensation atténue le problème mais ne le résout pas entièrement. Le retimbre par voice conversion est une réponse partielle.

- **La prosodie est difficile à reconstruire.** Le contour F0 original est perdu lors du moyennage. Le modèle prosodique le reconstruit par des règles, ce qui donne une voix parfois monotone ou incohérente, surtout sur les phrases longues. La micro-prosodie (jitter, variations de durée) aide à casser la régularité, sans atteindre le naturel d'une voix enregistrée.

Ces limites sont inhérentes à l'approche concaténative par moyennage. Les modèles neuraux (utilisés en parallèle dans Lectura) ne souffrent pas de ces problèmes, mais au prix d'un contrôle prosodique moins fin et de modèles plus lourds.

---

## Avantages de l'approche

| Avantage | Détail |
|----------|--------|
| **Contrôle prosodique total** | Chaque paramètre (F0, durée, timbre) est manipulable indépendamment |
| **Modes de lecture** | FLUIDE, MOT_A_MOT, SYLLABES, ce qui est difficile avec les modèles end-to-end |
| **Léger** | ~15 Mo de diphones (vs ~30-40 Mo pour les modèles neuraux) |
| **Reproductible** | Même entrée, même sortie (seed pour micro-prosodie) |
| **Compréhensible** | Chaque étape est inspectable et ajustable |

---

## État d'avancement

Le moteur est fonctionnel et intégré au [pipeline TTS]({{ '/developpement/modules/metiers/tts/' | relative_url }}). Les 1290 diphones couvrent la totalité des transitions phonétiques du français courant.

Les travaux en cours portent sur :
- l'amélioration des transitions entre diphones (lissage spectral adaptatif),
- l'enrichissement du modèle prosodique (expressivité émotionnelle),
- la construction d'un second corpus de diphones (voix masculine).
