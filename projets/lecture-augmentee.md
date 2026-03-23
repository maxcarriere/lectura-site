---
title: Lecture augmentée
layout: default
permalink: /projets/lecture-augmentee/
---

<span class="status-badge status-cours">En cours</span>

## Le projet

La lecture augmentée est le projet central de Lectura : transformer un texte brut en un objet de lecture enrichi, où chaque couche d'information (syllabes, phonèmes, liaisons, lettres muettes, prosodie) est calculée automatiquement et rendue accessible à l'apprenant.

L'objectif est de produire un texte que l'on peut **voir**, **entendre** et **explorer** à différents niveaux de granularité.

---

## Pipeline de traitement

Le cœur du projet est un pipeline modulaire (`lectura-main`) qui transforme un texte en plusieurs étapes :

1. **Tokenisation** — découpage du texte en mots et ponctuations
2. **POS-tagging** — étiquetage morphosyntaxique pour désambiguïser les homographes
3. **Phonémisation (G2P)** — conversion de l'orthographe vers la transcription IPA
4. **Syllabation** — découpage en syllabes selon les règles du français
5. **Alignement graphème-phonème** — correspondance entre lettres écrites et sons prononcés
6. **Détection des liaisons** — identification et resyllabification des liaisons obligatoires
7. **Marquage des lettres muettes** — identification des lettres non prononcées
8. **Génération de la timeline** — synchronisation temporelle de chaque événement

Chaque étape est un module indépendant, testable isolément. L'ensemble produit une structure de données riche qui peut alimenter différents formats de sortie.

---

## Couches d'enrichissement

Le texte enrichi contient plusieurs couches superposables :

- **Syllabique** : chaque mot découpé en syllabes, avec séparateurs visuels
- **Phonétique** : transcription IPA de chaque syllabe
- **Liaisons** : consonnes de liaison entre mots, avec indication du type (obligatoire, facultative)
- **Lettres muettes** : lettres présentes à l'écrit mais non prononcées
- **Coloration** : code couleur par type de son (voyelle, consonne, digramme…)
- **Audio** : lecture synchronisée syllabe par syllabe via TTS

---

## État d'avancement

Le pipeline est fonctionnel pour le français. Les modules de phonémisation, syllabation, alignement et liaison sont opérationnels et testés. L'intégration TTS permet une lecture audio synchronisée complète.

Les travaux en cours portent sur :
- l'optimisation de la qualité de l'alignement graphème-phonème,
- l'ajout de couches prosodiques (accentuation, intonation),
- la génération de formats de sortie multiples (HTML, JSON, vidéo).
