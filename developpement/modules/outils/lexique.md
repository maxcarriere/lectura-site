---
title: Lexique
layout: default
permalink: /developpement/modules/outils/lexique/
redirect_from:
  - /solutions/modules/lexique/
---

> **Génération v0, gratuite.** Ce module fait partie de la première génération de Lectura : code sous AGPL-3.0, sans modèle ni base à télécharger. Tout tourne en local, sans clé. Usage commercial : compris dans toute licence Lectura v1, ou sur demande. Voir [Génération v0]({{ '/developpement/modules/v0/' | relative_url }}).

<div class="module-header">
  <h1>Lectura Lexique</h1>
  <p class="module-tagline">Accès à une base lexicale du français : lemmes, formes fléchies avec phonétique IPA, syllabation et morphologie</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-lexique/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Lexique" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-lexique</code>
  </div>
</div>

## Présentation

Module d'accès à une base lexicale du français : lemmes, formes fléchies avec leur phonétique IPA, syllabation et morphologie.

Le paquet ne contient que le code d'accès. **Aucune base lexicale n'est incluse** : `Lexique` ouvre le fichier que vous lui indiquez, au format SQLite, CSV ou TSV (détection par l'extension). Les résultats dépendent de la base fournie.

Ce paquet ne contient pas de base lexicale. Le lexique LeXiK, lui, est libre (CC BY-SA 4.0) et se télécharge gratuitement sur [LecturaLexique](https://lexique.lectura.world/lexik) ; les données du dictionnaire WiKiLeXiK (définitions, entités, relations sémantiques) ne sont pas distribuées : pour en parler, passez par la [page Contact]({{ '/contact/' | relative_url }}).

---

## Exemple

```python
from lectura_lexique import Lexique

lex = Lexique("/chemin/vers/lexique.db")   # ou un fichier .csv / .tsv

# Vérifier l'existence d'un mot
lex.existe("bonjour")  # True

# Phonétique
lex.phone_de("bonjour")

# Conjugaison
lex.conjuguer("manger")  # {mode: {temps: {personne: forme}}}

# Formes fléchies
lex.formes_de("chat")

# Définitions (si la base en contient)
lex.definitions("chat")
```

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="https://lexique.lectura.world">Essayer le Lexique en ligne →</a>
</div>

---

## Installation

```bash
pip install lectura-lexique
```

---

## Licence

- **Code** : AGPL-3.0-or-later.
- **Usage commercial ou intégration dans un produit fermé** : compris dans toute licence Lectura v1, ou sur demande par la [page Contact]({{ '/contact/' | relative_url }}).
