---
title: Recherche
layout: default
permalink: /developpement/recherche/
description: "Les axes de recherche de Lectura (ingénierie vocale, analyse du langage, lecture mathématique, multilinguisme, apprentissage automatique et humain, systémique), ses publications et les collaborations possibles."
---

{% comment %} Deuxième jet du 14/11/2026, sur les consignes de Maxime : seulement les axes encore ouverts (pas ceux déjà résolus), publications officielles seulement (ORTOLANG pour l'instant), une section Collaborations, une section Financement qui renvoie à Partenariats. Les anciennes notes techniques (algorithmes, TTS diphonique, ingénierie des modèles) ne sont plus liées d'ici : à reclasser. {% endcomment %}

Lectura poursuit plusieurs axes de recherche, qui prolongent ce qui a déjà été développé.

---

## Domaines de recherche {#domaines}

### Ingénierie vocale {#ingenierie-vocale}

Plutôt que deux modèles séparés, l'un pour dire un texte, l'autre pour l'entendre, Lectura prépare un modèle unifié, qui sait à la fois analyser un son et le produire. Il travaille sur une représentation explicite de la parole : ce qui est dit (les phonèmes), comment c'est dit (la prosodie, le style), qui le dit (le timbre) et dans quelles conditions (bruit, salle, micro). Les compétences visées sont la conversion vocale, le clonage d'une voix et une meilleure qualité, avec un modèle qui reste léger.

### Analyse du langage {#analyse-du-langage}

L'analyse grammaticale de Lectura donne, pour chaque mot, sa catégorie, son lemme, ses traits et sa fonction dans la phrase (voir les [solutions technologiques]({{ '/solutions/technologiques/#analyse-du-langage' | relative_url }})). Une analyse sémantique pourrait la compléter : relier chaque mot à son sens dans son contexte.

### Lecture mathématique {#lecture-mathematique}

Les outils de Lectura savent déjà lire les formules courantes d'un texte : nombres, dates, sigles… Il s'agit d'étendre ce travail à l'ensemble des formules mathématiques, pour que toute expression écrite en notation mathématique puisse être lue à voix haute.

### Multilinguisme {#multilinguisme}

Lectura traite aujourd'hui le français et, pour une partie de ses outils, l'anglais. Il s'agit d'étendre à d'autres langues ce qui a été construit : lexique, alignement des lettres et des sons, analyse grammaticale, voix.

### Apprentissage automatique {#apprentissage-automatique}

Les modèles de Lectura distinguent ce qui peut se faire analytiquement, par la règle, et ce qui ne peut se faire que statistiquement, par l'apprentissage (voir [Intelligence artificielle]({{ '/solutions/intelligence-artificielle/#modeles' | relative_url }})). La recherche porte sur la façon d'orchestrer les deux, et sur la mesure de leur équilibre : ce qu'un élément analytique épargne en paramètres et en données.

### Apprentissage humain {#apprentissage-humain}

Comment faciliter l'apprentissage humain, et d'abord celui de la lecture : ce qui rend une notion explicite, ce qui aide à la retenir, et la place qu'y prennent l'interactivité, le jeu et l'image (voir les [solutions pédagogiques]({{ '/solutions/educatives/' | relative_url }})).

### Systémique et organisation {#systemique}

L'organisation du travail dans un système qui relie des agents d'IA et des humains : la répartition des rôles, la mémoire partagée, la coordination, la part des décisions qui reste humaine. Cette réflexion rejoint celle du projet [Humanuscrit]({{ '/a-propos/humanuscrit/' | relative_url }}).

---

## Publications {#publications}

### Parues {#parues}

- **29 octobre 2026** : **LeXiK** v1.0, lexique du français, publié sur [ORTOLANG](https://hdl.handle.net/11403/lexik) avec sa documentation, sous licence CC BY-SA 4.0. Identifiant de citation : hdl.handle.net/11403/lexik.

### En préparation {#en-preparation}

- Les méthodes utilisées pour élaborer le lexique LeXiK.
- Les algorithmes réalisés : alignement des lettres et des sons, syllabation.
- Les différentes composantes de la voix humaine : ce qui est dit, comment, par qui et dans quelles conditions.

---

## Partenariat {#partenariat}

Lectura est ouvert à la [collaboration]({{ '/partenariats/collaboration/' | relative_url }}) avec d'autres chercheurs, et recherche des [financements]({{ '/partenariats/financement/' | relative_url }}) pour développer ces axes.
