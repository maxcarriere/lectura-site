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

### L'API du dictionnaire

Les pages de WiKiLeXiK s'appuient sur une API, documentée ici pour la transparence. Elle sert le dictionnaire et ses démos ; elle n'est pas proposée comme service.

```
https://lexique.lectura.world/lexique/v2/
```

| Endpoint | Description |
|----------|-------------|
| `GET /lexique/v2/rechercher?q=…&mode=…` | Recherche de formes (modes : exact, prefixe, contient, suffixe) |
| `GET /lexique/v2/mot/{graphie}` | Tout sur un mot : lemmes, sens et définitions, relations (synonymes, antonymes…), entités |
| `GET /lexique/v2/formes/{lemme}` | Formes fléchies d'un lemme |
| `GET /lexique/v2/entite/{qid}` | Détail d'une entité (QID Wikidata) |
| `GET /lexique/v2/entites?q=…` | Recherche d'entités par mot-clé |
| `GET /lexique/v2/categories` | Liste des catégories sémantiques |
| `GET /lexique/v2/categories/{id}/entites` | Entités d'une catégorie |

La documentation interactive est sur [lexique.lectura.world/lexique/v2/docs](https://lexique.lectura.world/lexique/v2/docs).

---

## Lexicon — le lexique dans votre application

Le module **Lexicon** embarque le lexique dans une application, hors ligne : lectures, validité, fréquences, recherche. Il est présenté et proposé sous licence commerciale sur [LecturaLexique](https://lexique.lectura.world).

La première génération du module, `lectura-lexique` (v0, publiée sur PyPI), reste documentée dans les [archives des modules]({{ '/developpement/modules/outils/lexique/' | relative_url }}).

---

## Corpus

Des corpus dérivés de LeXiK (syllabes du français avec leur son, mots illustrés) sont présentés sur [LecturaLexique](https://lexique.lectura.world). Les autres ressources de Lectura sont dans [Ressources]({{ '/produits/ressources/' | relative_url }}).
