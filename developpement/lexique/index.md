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

WikiLeXiK est l'interface encyclopédique de Lectura, reliée à Wiktionary, Wikidata et Wikipedia : **2,58 millions de formes** couvrant l'orthographe, la morphologie, la phonétique IPA, les fréquences, les synonymes et les définitions. Compilée à partir de sources linguistiques libres (Lexique383, GLAFF, Wiktionnaire, OpenSubtitles) et reliée à 2,5 millions d'entités Wikidata.

La documentation complète de la base (structure, colonnes, sources, statistiques) est disponible sur le sous-domaine dédié :

<p style="text-align:center; margin:1.5em 0;"><a href="https://lexique.lectura.world/documentation" class="module-badge" style="font-size:1.1em;">» Documentation WikiLeXiK — lexique.lectura.world «</a></p>

---

## LeXiK

LeXiK est la base lexicale pure de Lectura (formes, phonétique, morphologie), en version allégée pour être embarquée dans les applications et modules Lectura.

[Voir les ressources distribuées →]({{ '/produits/ressources/' | relative_url }})

---

## API REST

WikiLeXiK est interrogeable via son API REST, sans authentification :

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

La documentation interactive est disponible sur [lexique.lectura.world/lexique/v2/docs](https://lexique.lectura.world/lexique/v2/docs).

La conjugaison et la recherche par le son passent par l'API Lectura : `POST https://api.lectura.world/metiers/nlp/lexique/conjuguer` (`{"verbe": "…"}`) et `POST https://api.lectura.world/metiers/nlp/lexique/homophones` (`{"phone": "…"}`), documentées sur [api.lectura.world/docs](https://api.lectura.world/docs).

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
