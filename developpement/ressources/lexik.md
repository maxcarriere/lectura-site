---
title: LeXiK
layout: default
permalink: /developpement/ressources/lexik/
redirect_from:
  - /solutions/ressources/lexik/
---

<div class="module-header">
  <h1>LeXiK</h1>
  <p class="module-tagline">Le lexique français de Lectura — 1,35 million d'entrées, 25 colonnes</p>
  <div class="module-links">
    <a href="https://lexique.lectura.world" class="module-badge">lexique.lectura.world</a>
  </div>
</div>

## Présentation

LeXiK est la base lexicale de Lectura : une compilation structurée de sources linguistiques libres, unifiée dans un format unique avec 25 colonnes couvrant l'orthographe, la morphologie, la phonétique, la fréquence et la sémantique.

| | |
|---|---|
| **Entrées** | 1 350 000 formes fléchies |
| **Colonnes** | 25 (ortho, lemme, cgram, phone, synonymes, définition...) |
| **Formats** | CSV (213 Mo) et SQLite (optimisé, avec index) |
| **Sources** | Compilation de bases libres (GLAFF, Wiktionnaire, OpenSubtitles...) |
| **Licence** | À définir — [nous contacter](#obtenir-lexik) |

---

## Contenu

### Identification et morphologie

Chaque entrée contient la forme orthographique, le lemme, la catégorie grammaticale (POS), le code Multext, le genre, le nombre, et pour les verbes : le mode, le temps et la personne.

### Phonétique

Transcription IPA, nombre de syllabes, découpage syllabique et variantes de prononciation.

### Fréquences

Quatre corpus de fréquences croisés : Frantext (littérature), frWaC (web), OpenSubtitles (oral) et LM10 (textes pour enfants).

### Sémantique

Synonymes, antonymes, domaine sémantique, définition, registre, étymologie et exemples — quand disponibles dans les sources.

---

## Utilisation avec le module Lexique

LeXiK est directement compatible avec le module [`lectura-lexique`]({{ '/developpement/modules/outils/lexique/' | relative_url }}). Le module reconnaît automatiquement les 25 colonnes et expose toutes ses méthodes : conjugaison, rimes, synonymes, anagrammes, recherche multi-critère.

```python
from lectura_lexique import Lexique

with Lexique("lexique_lectura.db") as lex:
    lex.conjuguer("manger")       # table de conjugaison complète
    lex.rimes("maison")           # mots rimant en -zɔ̃
    lex.synonymes("grand")        # ['abondant', 'adulte', 'ample', ...]
    lex.anagrammes("chien")       # ['chine', 'niche', ...]
    lex.definition("maison")      # ["Bâtiment servant d'habitation."]
    lex.filtrer(cgram="NOM", genre="f", freq_min=100)
```

```bash
pip install lectura-lexique
```

---

## Obtenir LeXiK {#obtenir-lexik}

LeXiK n'est pas encore distribué publiquement. Si vous êtes intéressé par cette base lexicale pour un projet de recherche, un outil éducatif ou un produit commercial, contactez-nous :

<a href="mailto:admin@lectura.world" class="module-badge">admin@lectura.world</a>
