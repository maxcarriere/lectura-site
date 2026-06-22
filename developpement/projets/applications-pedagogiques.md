---
title: Applications pédagogiques
layout: default
permalink: /developpement/projets/applications-pedagogiques/
---

## L'objectif

L'ambition de Lectura est de développer des outils permettant à un enfant d'**apprendre à lire de façon autonome**, sans intervention constante d'un adulte. L'idée directrice est que l'exposition répétée à un texte synchronisé avec le son, au niveau du phonème ou de la syllabe, permet à l'apprenant d'intégrer progressivement et naturellement la correspondance entre le texte écrit et les sons du langage parlé, qui est le fondement même de la lecture.

---

## Le surlignage synchronisé

Le principe est simple : pendant que l'enfant écoute une histoire, chaque syllabe ou phonème est surligné au moment exact où il est prononcé. Par cette exposition répétée, l'enfant finit par associer de lui-même les groupes de lettres aux sons qu'ils produisent.

Cette approche repose sur les briques techniques développées par Lectura :

- L'[alignement graphème-phonème]({{ '/developpement/recherche/algorithmes/' | relative_url }}) pour savoir quelle lettre correspond à quel son
- La [syllabation]({{ '/developpement/recherche/algorithmes/' | relative_url }}) pour découper les mots en unités lisibles
- Les [groupes de lecture]({{ '/developpement/recherche/algorithmes/' | relative_url }}) pour gérer les liaisons entre mots
- Le [pipeline G2P]({{ '/developpement/modules/metiers/g2p/' | relative_url }}) pour produire un texte enrichi (syllabes colorées, lettres muettes grisées, phonèmes affichés)
- La [synthèse vocale]({{ '/solutions/synthese-vocale/' | relative_url }}) pour la lecture audio synchronisée

---

## Le temps d'écran comme opportunité

Les enfants passent un nombre d'heures significatif devant les écrans. Plutôt que de considérer ce temps comme perdu, l'idée est de proposer des supports numériques qui transforment une partie de ce temps d'écran en temps d'apprentissage, sans que l'enfant ait l'impression de « travailler ».

Si un enfant utilise une partie de son temps d'écran pour **regarder des histoires avec lecture guidée**, le volume d'exposition cumulé devient considérable. Quelques minutes par jour, sur plusieurs mois, représentent des dizaines d'heures d'exposition à la correspondance son/texte. C'est cette répétition, naturelle et sans effort, qui permet l'apprentissage.

---

## Autres applications envisagées

Au-delà de l'apprentissage de la lecture, les mêmes briques techniques ouvrent des pistes pour :

- Le **Français Langue Étrangère (FLE)** : visualisation des liaisons, exercices de prononciation, dictées avec correction automatique
- L'**orthophonie** : transcription automatique de la parole, génération d'exercices ciblés par phonème, suivi de progression

---

## État

Le développement des applications pédagogiques constitue la **seconde phase** du projet Lectura. La priorité actuelle est de consolider les briques techniques sous-jacentes (TTS, STT, G2P, Aligneur, Syllabeur), qui sont opérationnelles. La conception des interfaces utilisateur et des parcours pédagogiques viendra dans un second temps.
