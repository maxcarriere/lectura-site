---
title: Applications & Jeux
layout: default
permalink: /produits/applications-jeux/
---

Des applications interactives pour s'entraîner à lire, manipuler les sons et les nombres de façon ludique.

## Lecteur syllabique (application mobile)

<span class="status-badge status-proto">Prototype</span>

Un lecteur qui affiche un texte découpé en syllabes, avec lecture audio progressive et surlignage synchronisé. L'utilisateur voit chaque syllabe s'illuminer au moment où elle est prononcée.

Le moteur repose sur le pipeline `lectura-main` : phonémisation, alignement graphème-phonème, syllabation, gestion des liaisons et des lettres muettes. L'audio peut être généré par synthèse vocale (7 moteurs TTS disponibles) ou par concaténation syllabique.

---

## NumReader — Lecture des nombres

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Application de lecture des nombres jusqu'à 4 chiffres. Affichage simultané en chiffres, en lettres et en chiffres romains, avec lecture audio synchronisée.

Le moteur convertit un nombre entre ses trois écritures via un pipeline en 8 étapes (décomposition, conversion, génération de la timeline, audio concaténatif). Interface web interactive.

---

## Mini-jeux éducatifs

<span class="status-badge status-avenir">À venir</span>

Des jeux courts centrés sur la manipulation des sons et des syllabes : associer un son à une lettre, reconstituer un mot à partir de syllabes mélangées, identifier un intrus phonétique. Chaque jeu cible une compétence précise de la progression syllabique.
