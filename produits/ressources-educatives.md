---
title: Ressources éducatives
layout: default
permalink: /produits/ressources-educatives/
---

Des corpus, des données et des supports visuels librement utilisables pour l'enseignement de la lecture.

## Corpus syllabique

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Un corpus structuré de 55 leçons (51 leçons + 4 listes de mots-outils) couvrant l'intégralité de la progression syllabique du français : des sons isolés aux graphies complexes (ill, tion, -elle/-ette, etc.).

Chaque leçon est un fichier YAML contenant : le phonème cible, les graphies associées, la transcription IPA, des mots exemples, des phrases et des exercices. Le tout validé par un schéma strict.

Organisation en 5 parties :
- **P1** (leçons 01–06) : Sons — lettres et phonèmes isolés
- **P2** (leçons 07–27) : Syllabes CV simples et cas ambigus
- **P3** (leçons 28–36) : Digrammes vocaliques (ou, on, oi, an, in, ai, eu, au…)
- **P4** (leçons 37–44) : Syllabes inversées, groupes consonantiques, lettres muettes
- **P5** (leçons 45–51) : Sons complexes (ill, y, ail/eil, ien/ion, tion, x/w…)

---

## Base lexicale Lexique383

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Extraction et enrichissement de la base Lexique383 (142 000 mots) : conversion SAMPA→IPA, syllabation automatique, analyse des attaques et codas, croisement avec les fréquences Manulex (textes pour enfants).

Données produites : tables de syllabes, couverture TTS (avec et sans schwa pédagogique), syllabes de liaison par resyllabification des codas.

---

## Imagier illustré

<span class="status-badge status-cours">En cours</span>

163 images générées par IA (SDXL + LoRA style livre pour enfants), chacune associée à un mot de la progression syllabique. Format 1024×1024, style cohérent. Le pipeline de génération est automatisé : une liste de mots produit un batch d'images en ~18 secondes par image.

L'imagier sert de support visuel au manuel syllabique et aux applications interactives.
