---
title: Lexique
layout: default
permalink: /developpement/lexique/
redirect_from:
  - /developpement/ressources/lexik/
  - /developpement/ressources/kit-g2p-p2g/
  - /developpement/ressources/corpus/
  - /solutions/ressources/
  - /solutions/ressources/lexik/
  - /solutions/ressources/kit-g2p-p2g/
---

## LeXiK — le lexique du français

LeXiK est la base lexicale de Lectura : formes et lemmes, prononciation syllabée, analyse grammaticale, alignement des lettres et des sons, orthocode, fréquences. Il est publié sur [ORTOLANG](https://hdl.handle.net/11403/lexik/v1.0) depuis le 29 octobre 2026, sous licence CC BY-SA 4.0. Présentation, téléchargement, documentation et citation : [LecturaLexique](https://lexique.lectura.world/lexik).

---

## WiKiLeXiK — le dictionnaire

WiKiLeXiK a deux objectifs : donner une interface web à LeXiK, et brancher cette couche lexicale sur les projets Wiki, le Wiktionnaire (par l'extraction Kaikki) et Wikidata. Sa base compte 2,58 millions de formes, reliées à près de 2,5 millions d'entités Wikidata.

La documentation complète (structure, colonnes, sources, statistiques) est sur le site projet :

<p style="text-align:center; margin:1.5em 0;"><a href="https://lexique.lectura.world/documentation" class="module-badge" style="font-size:1.1em;">» Documentation — lexique.lectura.world «</a></p>

---

## Ce que LeXiK alimente

- **Les modules de texte**, qu'il entraîne et qui l'enrichissent en retour ; le module **Lexicon** l'embarque dans une application, hors ligne (voir la [génération v1]({{ '/developpement/modules/v1/' | relative_url }}) et [LecturaLexique](https://lexique.lectura.world/lexicon/fr)).
- **Les [corpus d'entraînement]({{ '/developpement/donnees/' | relative_url }})**, dont il fournit la phonétique de base.
- **Les [corpus pédagogiques]({{ '/developpement/corpus/' | relative_url }})**, dont les listes de mots ou de syllabes suivent ses fréquences et portent sa phonétique et sa grammaire.
