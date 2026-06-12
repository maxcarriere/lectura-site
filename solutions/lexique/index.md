---
title: Lexique
layout: default
permalink: /solutions/lexique/
---

Lectura donne acces a **LeXiK**, une base lexicale du francais de 1,35 million d'entrees couvrant l'orthographe, la phonetique IPA, la morphologie, les frequences, les synonymes et les definitions. Le tout accessible via un module Python avec 18 methodes de requetage.

---

## Ce que Lectura est capable de faire

| Capacite | Description |
|----------|-------------|
| **Conjugaison** | Toutes les formes conjuguees de n'importe quel verbe francais |
| **Rimes** | Recherche de mots rimant avec un mot donne (rime riche, suffisante, pauvre) |
| **Anagrammes** | Recherche d'anagrammes |
| **Synonymes et definitions** | Acces aux synonymes et definitions de chaque entree |
| **Morphologie** | Genre, nombre, categorie grammaticale, forme flechie |
| **Phonetique** | Transcription IPA de chaque entree, nombre de syllabes |
| **Filtrage multi-critere** | Recherche combinant categorie, frequence, nombre de lettres, motifs |

Compatible avec les bases existantes (Lexique383, GLAFF, Morphalou) grace a une interface d'acces generique.

---

## Applications

- **Applications educatives** : conjugaison interactive, jeux de mots, recherche de rimes pour l'apprentissage du francais.
- **Editeurs** : verification lexicale, enrichissement de contenu, generation de listes de vocabulaire.
- **Recherche linguistique** : requetes complexes sur la morphologie, la frequence et la phonetique.
- **Outils d'ecriture** : synonymes, antonymes, suggestions contextuelles.
- **Pipeline Lectura** : le lexique enrichit les predictions du phonemiseur (G2P) et du graphemiseur (P2G) avec des features lexicales.

---

## En savoir plus

- [Module Lexique]({{ '/developpement/modules/outils/lexique/' | relative_url }}) — documentation technique et API
- [LeXiK]({{ '/developpement/ressources/lexik/' | relative_url }}) — la base lexicale de Lectura

---

## Contact

Pour obtenir LeXiK ou integrer le module Lexique : [admin@lectura.world](mailto:admin@lectura.world)
