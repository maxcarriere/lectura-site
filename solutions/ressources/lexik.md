---
title: LeXiK
layout: default
permalink: /solutions/ressources/lexik/
---

<div class="module-header">
  <h1>LeXiK</h1>
  <p class="module-tagline">Le lexique francais de Lectura — 1,35 million d'entrees, 25 colonnes</p>
</div>

## Presentation

LeXiK est la base lexicale de Lectura : une compilation structuree de sources linguistiques libres, unifiee dans un format unique avec 25 colonnes couvrant l'orthographe, la morphologie, la phonetique, la frequence et la semantique.

| | |
|---|---|
| **Entrees** | 1 350 000 formes flechies |
| **Colonnes** | 25 (ortho, lemme, cgram, phone, synonymes, definition...) |
| **Formats** | CSV (213 Mo) et SQLite (optimise, avec index) |
| **Sources** | Compilation de bases libres (GLAFF, Wiktionnaire, OpenSubtitles...) |
| **Licence** | A definir — [nous contacter](#obtenir-lexik) |

---

## Contenu

### Identification et morphologie

Chaque entree contient la forme orthographique, le lemme, la categorie grammaticale (POS), le code Multext, le genre, le nombre, et pour les verbes : le mode, le temps et la personne.

### Phonetique

Transcription IPA, nombre de syllabes, decoupage syllabique et variantes de prononciation.

### Frequences

Quatre corpus de frequences croises : Frantext (litterature), frWaC (web), OpenSubtitles (oral) et LM10 (textes pour enfants).

### Semantique

Synonymes, antonymes, domaine semantique, definition, registre, etymologie et exemples — quand disponibles dans les sources.

---

## Utilisation avec le module Lexique

LeXiK est directement compatible avec le module [`lectura-lexique`]({{ '/solutions/modules/lexique/' | relative_url }}). Le module reconnait automatiquement les 25 colonnes et expose toutes ses methodes : conjugaison, rimes, synonymes, anagrammes, recherche multi-critere.

```python
from lectura_lexique import Lexique

with Lexique("lexique_lectura.db") as lex:
    lex.conjuguer("manger")       # table de conjugaison complete
    lex.rimes("maison")           # mots rimant en -zɔ̃
    lex.synonymes("grand")        # ['abondant', 'adulte', 'ample', ...]
    lex.anagrammes("chien")       # ['chine', 'niche', ...]
    lex.definition("maison")      # ["Batiment servant d'habitation."]
    lex.filtrer(cgram="NOM", genre="f", freq_min=100)
```

```bash
pip install lectura-lexique
```

---

## Obtenir LeXiK {#obtenir-lexik}

LeXiK n'est pas encore distribue publiquement. Si vous etes interesse par cette base lexicale pour un projet de recherche, un outil educatif ou un produit commercial, contactez-nous :

<a href="mailto:contact@lec-tu-ra.com" class="module-badge">contact@lec-tu-ra.com</a>
