---
title: Lectura Lexique Viewer
layout: default
permalink: /produits/programmes/lexique-viewer/
---

<span class="status-badge status-cours">En cours de développement</span>

Lectura Lexique Viewer est une interface d'accès à la base lexicale **LeXiK** et un outil d'**enrichissement de texte**. Il permet d'explorer les 1,35 million d'entrées du lexique français et d'annoter automatiquement n'importe quel texte avec ses propriétés linguistiques.

---

## Accès à la base lexicale

LeXiK rassemble 1,35 million d'entrées compilées à partir de plusieurs sources linguistiques libres (Lexique383, GLAFF, Wiktionnaire, OpenSubtitles) et reliées à 2,5 millions d'entités Wikidata.

| Capacité | Description |
|----------|-------------|
| **Conjugaison** | Toutes les formes conjuguées de n'importe quel verbe français |
| **Rimes** | Recherche de mots rimant avec un mot donné (rime riche, suffisante, pauvre) |
| **Anagrammes** | Recherche d'anagrammes |
| **Synonymes et définitions** | Accès aux synonymes et définitions de chaque entrée |
| **Morphologie** | Genre, nombre, catégorie grammaticale, forme fléchie |
| **Phonétique** | Transcription IPA, nombre de syllabes |
| **Filtrage multi-critère** | Recherche combinant catégorie, fréquence, nombre de lettres, motifs |

Le Viewer offre une interface de navigation et de recherche dans cette base, sans nécessiter de connaissances en programmation.

---

## Enrichissement d'un texte

À partir d'un texte saisi ou collé, le Lexique Viewer annote chaque mot avec les informations disponibles dans LeXiK :

- **Phonétique** : transcription IPA de chaque mot.
- **Catégorie grammaticale** : nom, verbe, adjectif, déterminant, etc.
- **Morphologie** : genre, nombre, temps, mode, personne.
- **Fréquence** : fréquence d'usage (corpus livres et sous-titres).
- **Syllabes** : découpage syllabique orthographique et phonétique.
- **Définitions et synonymes** : accès direct aux informations sémantiques.

L'enrichissement s'appuie sur le pipeline d'analyse du langage de Lectura (phonémisation, alignement, syllabation) pour désambiguïser les homographes en contexte.

---

## Applications visées

- **Enseignement du français** : exploration interactive du vocabulaire, conjugaison, recherche de rimes et d'anagrammes.
- **Aide à l'écriture** : synonymes, vérification lexicale, suggestions.
- **Annotation de textes** : analyse linguistique automatique pour la recherche ou la préparation de corpus.
- **Accessibilité** : affichage de la phonétique et du découpage syllabique pour les lecteurs en difficulté.

---

## En savoir plus

- [Lexique — présentation]({{ '/solutions/lexique/' | relative_url }}) — vue d'ensemble de la base LeXiK
- [Module Lexique]({{ '/developpement/modules/outils/lexique/' | relative_url }}) — documentation technique et API
- [LeXiK]({{ '/developpement/lexique/' | relative_url }}) — la base lexicale de Lectura
- [Analyse du langage]({{ '/solutions/analyse-langage/' | relative_url }}) — pipeline de phonémisation et syllabation

---

*Version démo et licence à venir.*
