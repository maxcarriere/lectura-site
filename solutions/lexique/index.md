---
title: Lexique
layout: default
permalink: /solutions/lexique/
---

Lectura donne accès à **LeXiK**, une base lexicale du français de 1,35 million d'entrées couvrant l'orthographe, la phonétique IPA, la morphologie, les fréquences, les synonymes et les définitions. Compilée à partir de plusieurs sources linguistiques libres (Lexique383, GLAFF, Wiktionnaire, OpenSubtitles).

La philosophie du lexique de Lectura est de relier les lemmes (linguistique) aux concepts (sémantique). Près de 2,5 millions d'entités Wikidata ont été intégrées à la base et reliées aux plus de 350 000 lemmes présents. Un travail de catégorisation a été initié en exploitant les propriétés Wikidata.

Première version stabilisée, qui constitue un socle solide pour des enrichissements futurs. Il s'agit d'un projet ouvert qui gagnerait à être enrichi et amélioré. Une démarche de publication sur la plateforme [Ortolang](https://www.ortolang.fr/) est en cours pour aller dans ce sens.

Le tout est accessible via un module Python avec 18 méthodes de requêtage, compatible avec les bases existantes (Lexique383, GLAFF, Morphalou) grâce à une interface d'accès générique. Une interface desktop est en cours d'élaboration.

<p style="text-align:center; margin:1.5em 0;"><a href="https://lexique.lectura.world" class="module-badge" style="font-size:1.1em;">» Accès au LeXiK «</a></p>

---

## Ce que Lectura est capable de faire

| Capacité | Description |
|----------|-------------|
| **Phonétique** | Transcription IPA, nombre de syllabes, ainsi qu'une colonne orthocode propre à Lectura (orthographe enrichie avec la syllabation, les consonnes latentes et les lettres muettes) |
| **Morphologie** | Genre, nombre, catégorie grammaticale, formes fléchies |
| **Conjugaison** | Toutes les formes conjuguées de n'importe quel verbe français |
| **Synonymes** | Accès aux synonymes de chaque entrée (plusieurs sources différentes) |
| **Fréquences** | Plusieurs corpus croisés (texte littéraire, sous-titres de films) |
| **Définitions et citations** | Définitions, sens, registre, thème et citations contenant le mot (source Kaikki) |
| **Rimes** | Recherche de mots rimant avec un mot donné (rime riche, suffisante, pauvre) |
| **Anagrammes** | Recherche d'anagrammes |
| **Filtrage multi-critère** | Recherche combinant catégorie, fréquence, nombre de lettres, motifs |
| **Entités Wikidata** | Relations avec les lemmes, critère de popularité, image et lien Wikipédia |


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
- [LeXiK]({{ '/developpement/lexique/' | relative_url }}) — la base lexicale de Lectura

---

## Contact

Pour obtenir LeXiK ou intégrer le module Lexique : [nous contacter]({{ '/contact/' | relative_url }})
