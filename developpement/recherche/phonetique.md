---
title: "Le point de vue Phonétique"
layout: default
permalink: /developpement/recherche/phonetique/
redirect_from:
  - /projets/lecture-augmentee/
---

## L'idée fondatrice

Le projet Lectura repose sur une conviction : la **représentation phonétique** du français est un point de factorisation naturel pour des problèmes qui, en apparence, relèvent de domaines très différents — la technologie vocale, l'apprentissage de la lecture et la compréhension de la grammaire.

Plutôt que de traiter ces problèmes séparément, Lectura les aborde à travers un même prisme : le langage parlé, formalisé en phonétique IPA.

---

## Factoriser la technologie vocale

La synthèse vocale (TTS) et la reconnaissance vocale (STT) sont traditionnellement traitées comme deux problèmes distincts, avec des architectures et des données d'entraînement séparées. Pourtant, ils partagent un même espace intermédiaire : la **transcription phonétique**.

- Le TTS transforme du texte en phonèmes, puis des phonèmes en audio.
- Le STT transforme de l'audio en phonèmes, puis des phonèmes en texte.

En isolant la couche phonétique, Lectura factorise le problème au bon niveau. Le [Phonémiseur]({{ '/developpement/modules/outils/phonemiseur/' | relative_url }}) (texte → IPA) et le [Graphémiseur]({{ '/developpement/modules/outils/graphemiseur/' | relative_url }}) (IPA → texte) deviennent des briques réutilisables indépendamment de la modalité audio. Le modèle acoustique, en amont ou en aval, n'a plus qu'à gérer la correspondance entre phonèmes et signal sonore.

Cette architecture permet de développer, tester et améliorer chaque couche séparément, et de combiner librement les briques selon le besoin : TTS, STT, ou tout pipeline hybride.

---

## Un langage sous-jacent à l'apprentissage de la lecture

Le français est une langue **opaque** du point de vue orthographique : un même son peut s'écrire de dizaines de façons différentes (le son /o/ s'écrit _o, au, eau, ô, ot, os, op, aud, aux, ault…_). Cette opacité est le premier obstacle de l'apprentissage de la lecture.

L'approche syllabique, largement utilisée en pédagogie, consiste à décomposer les mots en syllabes pour faciliter le déchiffrage. Mais la syllabe elle-même repose sur la phonétique : c'est la **structure sonore** du mot qui détermine ses frontières syllabiques, pas son orthographe. La phonétique est le langage sous-jacent au point de vue syllabique.

L'approche phonétique de Lectura rend explicite ce qui est implicite dans l'orthographe :

- Quel son produit chaque lettre ou groupe de lettres ?
- Quelles lettres ne se prononcent pas ?
- Comment les mots se connectent-ils à l'oral (liaisons, élisions) ?
- Où se situent les frontières syllabiques ?

Ces informations, triviales pour un lecteur expert, sont précisément ce que l'apprenant doit construire. C'est l'objectif du [pipeline de lecture augmentée]({{ '/developpement/modules/metiers/g2p/' | relative_url }}) de Lectura : produire un texte que l'on peut **voir**, **entendre** et **explorer** à différents niveaux de granularité.

---

## La phonétique comme clé de la grammaire

C'est peut-être l'enseignement le plus surprenant du projet. Le [pipeline P2G]({{ '/developpement/modules/metiers/p2g/' | relative_url }}) (phonèmes → texte) est capable d'étiqueter correctement la **morphologie** des mots — catégorie grammaticale, genre, nombre, conjugaison — à partir de la seule transcription phonétique de la phrase.

Autrement dit : le signal du langage parlé **suffit** à comprendre la grammaire et, en grande partie, l'orthographe d'une phrase, à condition de disposer de suffisamment de contexte. Le modèle P2G, entraîné uniquement sur des séquences phonétiques, retrouve les accords, distingue les homophones et reconstruit l'orthographe avec une précision de ~96%.

Ce résultat ouvre des perspectives concrètes, notamment pour la **correction orthographique**. Si un modèle peut retrouver l'orthographe correcte à partir de la phonétique, alors un correcteur peut s'appuyer sur la même logique : convertir la phrase en phonétique, puis vérifier si la graphie choisie par l'utilisateur est cohérente avec ce que le modèle attendrait. C'est l'une des approches explorées dans le [projet Correcteur]({{ '/developpement/projets/correcteur/' | relative_url }}).

---

## En résumé

La représentation phonétique est un point de factorisation efficace à trois niveaux :

| Niveau | Problème | Apport de la phonétique |
|--------|----------|------------------------|
| **Technologique** | TTS et STT traités séparément | Couche commune phonémiseur/graphémiseur, modèles acoustiques indépendants |
| **Pédagogique** | Opacité de l'orthographe française | La phonétique rend explicite la logique sous-jacente aux syllabes et à la lecture |
| **Linguistique** | Grammaire et orthographe | Le signal phonétique suffit à retrouver la morphologie et l'orthographe en contexte |

C'est cette idée — placer la phonétique au centre — qui structure l'ensemble du projet Lectura : ses [modules]({{ '/developpement/modules/' | relative_url }}), ses [produits]({{ '/produits/' | relative_url }}) et ses axes de [recherche]({{ '/developpement/recherche/' | relative_url }}).
