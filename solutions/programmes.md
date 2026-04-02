---
title: Programmes
layout: default
permalink: /solutions/programmes/
---

Des applications desktop et web pour l'apprentissage interactif de la lecture.

## Lecteur syllabique

<span class="status-badge status-proto">Prototype</span>

Un lecteur qui affiche un texte decoupe en syllabes, avec lecture audio progressive et surlignage synchronise. L'utilisateur voit chaque syllabe s'illuminer au moment ou elle est prononcee.

Le moteur repose sur le pipeline `lectura-main` : phonemisation, alignement grapheme-phoneme, syllabation, gestion des liaisons et des lettres muettes. L'audio peut etre genere par synthese vocale (7 moteurs TTS disponibles) ou par concatenation syllabique.

---

## NumReader — Lecture des nombres

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Application de lecture des nombres jusqu'a 4 chiffres. Affichage simultane en chiffres, en lettres et en chiffres romains, avec lecture audio synchronisee.

Le moteur convertit un nombre entre ses trois ecritures via un pipeline en 8 etapes (decomposition, conversion, generation de la timeline, audio concatenatif). Interface web interactive.
