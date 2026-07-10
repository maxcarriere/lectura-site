---
title: Lexique
layout: default
permalink: /developpement/lexique/
redirect_from:
  - /developpement/ressources/
  - /developpement/ressources/lexik/
  - /developpement/ressources/kit-g2p-p2g/
  - /developpement/ressources/corpus/
  - /solutions/ressources/
  - /solutions/ressources/lexik/
  - /solutions/ressources/kit-g2p-p2g/
---

## WikiLeXiK — Base lexicale encyclopédique

WikiLeXiK est l'interface encyclopédique de Lectura, reliée à Wiktionary, Wikidata et Wikipedia : **1,35 million d'entrées** couvrant l'orthographe, la morphologie, la phonétique IPA, les fréquences, les synonymes et les définitions. Compilée à partir de sources linguistiques libres (Lexique383, GLAFF, Wiktionnaire, OpenSubtitles) et reliée à 2,5 millions d'entités Wikidata.

La documentation complète de la base (structure, colonnes, sources, statistiques) est disponible sur le sous-domaine dédié :

<p style="text-align:center; margin:1.5em 0;"><a href="https://lexique.lectura.world/documentation" class="module-badge" style="font-size:1.1em;">» Documentation WikiLeXiK — lexique.lectura.world «</a></p>

---

## LeXiK

LeXiK est la base lexicale pure de Lectura (formes, phonétique, morphologie), en version allégée pour être embarquée dans les applications et modules Lectura.

[Voir les ressources distribuées →]({{ '/produits/ressources/' | relative_url }})

---

## API REST

WikiLeXiK est interrogeable via l'API REST Lectura, sans authentification :

```
https://api.lectura.world/lexique/
```

| Endpoint | Description |
|----------|-------------|
| `GET /lexique/rechercher?q=…` | Recherche de formes (modes : exact, prefix, contains, suffix, phonetique) |
| `GET /lexique/lemme/{lemme}` | Détail d'un lemme et ses relations |
| `GET /lexique/formes/{lemme}` | Formes fléchies d'un lemme |
| `GET /lexique/conjugaison/{verbe}` | Table de conjugaison complète |
| `GET /lexique/definitions/{lemme}` | Définitions et exemples |
| `GET /lexique/relations/{lemme}` | Relations sémantiques (synonymes, antonymes…) |
| `GET /lexique/entite/{id}` | Détail d'une entité (ID interne ou QID Wikidata) |
| `GET /lexique/entites?q=…` | Recherche d'entités par mot-clé |
| `GET /lexique/categories` | Liste des catégories sémantiques |
| `GET /lexique/categories/{id}/entites` | Entités d'une catégorie |

La documentation interactive (Swagger) est disponible sur [api.lectura.world/docs](https://api.lectura.world/docs).

---

## Module lectura-lexique

Le module Python [`lectura-lexique`]({{ '/developpement/modules/outils/lexique/' | relative_url }}) fournit 18 méthodes de requêtage pour exploiter WikiLeXiK ou toute autre base lexicale compatible (Lexique383, GLAFF, Morphalou). Zéro dépendance, backends CSV/TSV/SQLite, chargement lazy.

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

[Voir la documentation du module →]({{ '/developpement/modules/outils/lexique/' | relative_url }})
