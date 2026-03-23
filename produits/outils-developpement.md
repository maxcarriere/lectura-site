---
title: Outils de développement
layout: default
permalink: /produits/outils-developpement/
---

Des briques logicielles réutilisables pour le traitement du français écrit et parlé. Toutes sont développées en Python et intégrées dans le projet `lectura-main`.

## Syllabeur

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Moteur de syllabation du français : découpe un mot en syllabes à partir de sa transcription phonétique, en respectant les règles de la structure syllabique du français (attaque maximale, traitement des groupes consonantiques, schwas).

---

## G2P — Graphème vers Phonème

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Conversion automatique de l'orthographe française vers la transcription phonétique IPA. Utilise un ensemble de règles contextuelles et la base Lexique383 pour les cas irréguliers.

---

## P2G — Phonème vers Graphème

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Conversion inverse : à partir d'une syllabe en IPA, retrouver l'orthographe la plus probable. Table de 3 493 syllabes (62 % par consultation Lexique383, 38 % par règles de correspondance). Utilisé par le moteur TTS concaténatif pour synthétiser des syllabes isolées.

---

## Détection des liaisons

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Identification et traitement des liaisons obligatoires et facultatives en français. Resyllabification des codas consonantiques pour produire une prononciation naturelle des groupes de mots.

---

## POS-tagger

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Étiquetage morphosyntaxique (Part-of-Speech) du texte français, utilisé en amont pour informer la phonémisation (désambiguïsation des homographes) et la détection des liaisons.

---

## Conversion des nombres

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Pipeline de conversion entre trois écritures d'un nombre (chiffres, texte français, chiffres romains). Gestion des règles orthographiques du français (trait d'union, accord de « vingt » et « cent », etc.). Moteur utilisé par NumReader.
