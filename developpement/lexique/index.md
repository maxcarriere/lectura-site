---
title: Lexique & Données
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

## LeXiK — Base lexicale

LeXiK est la base lexicale de Lectura : **1,35 million d'entrées** couvrant l'orthographe, la morphologie, la phonétique IPA, les fréquences, les synonymes et les définitions. Compilée à partir de sources linguistiques libres (Lexique383, GLAFF, Wiktionnaire, OpenSubtitles) et reliée à 2,5 millions d'entités Wikidata.

La documentation complète de la base (structure, colonnes, sources, statistiques) est disponible sur le sous-domaine dédié :

<p style="text-align:center; margin:1.5em 0;"><a href="https://lexique.lectura.world" class="module-badge" style="font-size:1.1em;">» Documentation LeXiK — lexique.lectura.world «</a></p>

---

## Module lectura-lexique

Le module Python [`lectura-lexique`]({{ '/developpement/modules/outils/lexique/' | relative_url }}) fournit 18 méthodes de requêtage pour exploiter LeXiK ou toute autre base lexicale compatible (Lexique383, GLAFF, Morphalou). Zéro dépendance, backends CSV/TSV/SQLite, chargement lazy.

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

---

## LeXiK Lite

Une version allégée de LeXiK est en cours de développement pour être embarquée dans les applications et modules Lectura.

[Voir les ressources distribuées →]({{ '/produits/ressources/' | relative_url }})

---

## Kit G2P / P2G et corpus

Les corpus d'entraînement (22 649 phrases annotées, 1,16M mots alignés) et les modèles pré-entraînés sont documentés dans la section Ressources des Produits :

[Voir le kit G2P/P2G et les corpus →]({{ '/produits/ressources/' | relative_url }})
