---
title: Lexique
layout: default
permalink: /solutions/lexique/
---

Le lexique est le socle de Lectura : il donne à chaque mot sa prononciation, ses syllabes et son analyse grammaticale, et il sert à la fois aux modèles et aux produits. Il se présente en quatre parties, toutes sur le site projet **[LecturaLexique](https://lexique.lectura.world)** :

- **[LeXiK](https://lexique.lectura.world/lexik)**, le lexique du français : formes et lemmes, prononciation syllabée, analyse grammaticale, alignement des lettres et des sons, orthocode, fréquences. Il est publié sur [ORTOLANG](https://hdl.handle.net/11403/lexik/v1.0) depuis le 29 octobre 2026, sous licence CC BY-SA 4.0, et se télécharge gratuitement.
- **[WiKiLeXiK](https://lexique.lectura.world/wikilexik)**, le dictionnaire en ligne, avec deux objectifs : donner une interface web à LeXiK, et brancher cette couche lexicale sur les projets Wiki (le Wiktionnaire, par l'extraction Kaikki, et Wikidata).
- **Lexicon**, le module qui embarque le lexique dans votre application, proposé sous licence commerciale.
- **Corpus**, des produits dérivés de LeXiK : un corpus de syllabes du français avec leur son, un corpus de mots illustrés.

<p style="text-align:center; margin:1.5em 0;"><a href="https://lexique.lectura.world" class="module-badge" style="font-size:1.1em;">» Accès à LecturaLexique «</a></p>

---

## Ce que le lexique permet

| Capacité | Description |
|----------|-------------|
| **Phonétique** | Transcription IPA, syllabes, ainsi qu'une colonne orthocode propre à Lectura (orthographe enrichie avec la syllabation, les consonnes latentes et les lettres muettes) |
| **Morphologie** | Genre, nombre, catégorie grammaticale, formes fléchies |
| **Conjugaison** | Les formes conjuguées des verbes |
| **Synonymes** | Synonymes de chaque entrée, quand il y en a |
| **Fréquences** | Plusieurs corpus croisés (textes, sous-titres de films) |
| **Définitions et citations** | Définitions, sens, registre, thème et citations contenant le mot (Wiktionnaire, par Kaikki) |
| **Rimes** | Recherche de mots qui riment avec un mot donné |
| **Recherche avancée** | Recherche combinant catégorie, fréquence, nombre de lettres, motifs |
| **Entités Wikidata** | Personnes, lieux, œuvres… reliés aux mots du lexique et classés par catégories |

---

## Applications

- **Applications éducatives** : conjugaison, jeux de mots, recherche de rimes pour l'apprentissage du français.
- **Éditeurs** : vérification lexicale, enrichissement de contenu, génération de listes de vocabulaire.
- **Recherche linguistique** : requêtes sur la morphologie, la fréquence et la phonétique.
- **Outils d'écriture** : synonymes, rimes.
- **Pipeline Lectura** : le lexique fournit aux modèles de phonémisation et d'écriture leurs données de base.

---

## En savoir plus

- [LecturaLexique](https://lexique.lectura.world) — documentation, licences et offres de LeXiK, WiKiLeXiK, Lexicon et des corpus
- [Lexique (technique)]({{ '/developpement/lexique/' | relative_url }}) — la base lexicale côté développement
- [Module Lexique (v0)]({{ '/developpement/modules/outils/lexique/' | relative_url }}) — documentation de la première génération du module

---

## Contact

Pour intégrer le lexique dans votre produit : [nous contacter]({{ '/contact/' | relative_url }})
