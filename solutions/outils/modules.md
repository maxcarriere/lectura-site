---
title: Modules
layout: default
permalink: /solutions/outils/modules/
---

Des briques logicielles reutilisables pour le traitement du francais ecrit et parle. Toutes sont developpees en Python et distribuees sur PyPI.

## Syllabeur

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Moteur de syllabation du francais : decoupe un mot en syllabes a partir de sa transcription phonetique, en respectant les regles de la structure syllabique du francais (attaque maximale, traitement des groupes consonantiques, schwas).

---

## G2P — Grapheme vers Phoneme

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Conversion automatique de l'orthographe francaise vers la transcription phonetique IPA. Utilise un ensemble de regles contextuelles et la base Lexique383 pour les cas irreguliers.

---

## P2G — Phoneme vers Grapheme

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Conversion inverse : a partir d'une syllabe en IPA, retrouver l'orthographe la plus probable. Table de 3 493 syllabes (62 % par consultation Lexique383, 38 % par regles de correspondance). Utilise par le moteur TTS concatenatif pour synthetiser des syllabes isolees.

---

## Detection des liaisons

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Identification et traitement des liaisons obligatoires et facultatives en francais. Resyllabification des codas consonantiques pour produire une prononciation naturelle des groupes de mots.

---

## POS-tagger

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Etiquetage morphosyntaxique (Part-of-Speech) du texte francais, utilise en amont pour informer la phonemisation (desambiguisation des homographes) et la detection des liaisons.

---

## Conversion des nombres

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Pipeline de conversion entre trois ecritures d'un nombre (chiffres, texte francais, chiffres romains). Gestion des regles orthographiques du francais (trait d'union, accord de « vingt » et « cent », etc.). Moteur utilise par NumReader.
