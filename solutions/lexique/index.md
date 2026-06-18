---
title: Lexique
layout: default
permalink: /solutions/lexique/
---

Lectura donne accès à **LeXiK**, une base lexicale du français de 1,35 million d'entrées couvrant l'orthographe, la phonétique IPA, la morphologie, les fréquences, les synonymes et les définitions. Compilée à partir de plusieurs sources linguistiques libres (GLAFF, Wiktionnaire, OpenSubtitles). Première version stabilisée.

Chaque lemme est relié à son entité Wikidata correspondante, permettant une catégorisation sémantique : l'idée est de relier les lemmes (linguistique) aux concepts (sémantique). Le tout accessible via un module Python avec 18 méthodes de requêtage.

<p style="text-align:center; margin:1.5em 0;"><a href="https://lexique.lectura.world" class="module-badge" style="font-size:1.1em;">» Accès au LeXiK «</a></p>

---

## Ce que Lectura est capable de faire

| Capacité | Description |
|----------|-------------|
| **Conjugaison** | Toutes les formes conjuguées de n'importe quel verbe français |
| **Rimes** | Recherche de mots rimant avec un mot donné (rime riche, suffisante, pauvre) |
| **Anagrammes** | Recherche d'anagrammes |
| **Synonymes et définitions** | Accès aux synonymes et définitions de chaque entrée |
| **Morphologie** | Genre, nombre, catégorie grammaticale, forme fléchie |
| **Phonétique** | Transcription IPA de chaque entrée, nombre de syllabes |
| **Filtrage multi-critère** | Recherche combinant catégorie, fréquence, nombre de lettres, motifs |

Compatible avec les bases existantes (Lexique383, GLAFF, Morphalou) grâce à une interface d'accès générique.

---

## Applications

- **Applications éducatives** : conjugaison interactive, jeux de mots, recherche de rimes pour l'apprentissage du français.
- **Éditeurs** : vérification lexicale, enrichissement de contenu, génération de listes de vocabulaire.
- **Recherche linguistique** : requêtes complexes sur la morphologie, la fréquence et la phonétique.
- **Outils d'écriture** : synonymes, antonymes, suggestions contextuelles.
- **Pipeline Lectura** : le lexique enrichit les prédictions du phonémiseur (G2P) et du graphémiseur (P2G) avec des features lexicales.

---

## En savoir plus

- [Module Lexique]({{ '/developpement/modules/outils/lexique/' | relative_url }}) — documentation technique et API
- [LeXiK]({{ '/developpement/ressources/lexik/' | relative_url }}) — la base lexicale de Lectura

---

## Contact

Pour obtenir LeXiK ou intégrer le module Lexique : [admin@lectura.world](mailto:admin@lectura.world)
