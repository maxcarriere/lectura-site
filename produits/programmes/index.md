---
title: Programmes
layout: default
permalink: /produits/programmes/
redirect_from:
  - /solutions/programmes/
---

Des applications desktop et web pour l'apprentissage interactif de la lecture.

## Lecteur syllabique

<span class="status-badge status-proto">Prototype</span>

Un lecteur qui affiche un texte découpé en syllabes, avec lecture audio progressive et surlignage synchronisé. L'utilisateur voit chaque syllabe s'illuminer au moment où elle est prononcée.

Le moteur repose sur le pipeline Lectura : phonémisation, alignement graphème-phonème, syllabation, gestion des liaisons et des lettres muettes. L'audio peut être généré par synthèse vocale (7 moteurs TTS disponibles) ou par concaténation syllabique.

---

## NumReader — Lecture des nombres

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Application de lecture des nombres jusqu'à 4 chiffres. Affichage simultané en chiffres, en lettres et en chiffres romains, avec lecture audio synchronisée.

Le moteur convertit un nombre entre ses trois écritures via un pipeline en 8 étapes (décomposition, conversion, génération de la timeline, audio concaténatif). Interface web interactive.
