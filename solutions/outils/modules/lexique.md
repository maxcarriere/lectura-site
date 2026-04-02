---
title: Lexique
layout: default
permalink: /solutions/outils/modules/lexique/
---

<div class="module-header">
  <h1>Lectura Lexique</h1>
  <p class="module-tagline">Acces unifie au lexique francais : morphologie, phonetique, semantique, recherche</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-lexique/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Lexique" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-lexique</code>
  </div>
</div>

## Presentation

Module d'acces unifie a un lexique francais, compatible **CSV, TSV et SQLite**. Fournit 18 methodes de requetage organisees en 4 familles : morphologie, phonetique, semantique et recherche.

Chargement lazy a 4 niveaux pour minimiser l'utilisation memoire :

| Niveau | Charge | Permet |
|--------|--------|--------|
| 1 (init) | `frozenset` des formes | `existe()` en O(1) |
| 2 (lazy) | index phone | `homophones()`, `rimes()`, `contient_son()` |
| 3 (lazy) | index ortho | `info()`, `frequence()`, `synonymes()`, `rechercher()` |
| 4 (lazy) | index lemme | `conjuguer()`, `formes_de()` |

Pour le backend SQLite, les niveaux 2-4 utilisent des requetes SQL directes (pas de RAM supplementaire).

---

## Exemple

```python
from lectura_lexique import Lexique

with Lexique("lexique.db") as lex:
    # Morphologie
    print(lex.conjuguer("manger"))
    # {'indicatif': {'présent': {'1s': 'mange', '2s': 'manges', ...}, ...}, ...}

    print(lex.lemme_de("mangeait"))   # 'manger'
    print(lex.formes_de("grand"))     # [{'ortho': 'grand', ...}, {'ortho': 'grande', ...}, ...]

    # Phonetique
    print(lex.rimes("maison"))        # mots rimant en -zɔ̃
    print(lex.contient_son("ʒ"))      # mots contenant /ʒ/
    print(lex.mots_par_syllabes(3))   # trisyllabes

    # Semantique
    print(lex.synonymes("grand"))     # ['abondant', 'adulte', 'ample', ...]
    print(lex.antonymes("grand"))     # ['petit', 'minuscule', ...]
    print(lex.definition("maison"))   # ["Batiment servant d'habitation."]

    # Recherche
    print(lex.rechercher("^micro"))   # mots commencant par "micro"
    print(lex.anagrammes("chien"))    # ['chine', 'niche', ...]
    print(lex.filtrer(cgram="NOM", genre="f", freq_min=100))
```

---

## Methodes disponibles

### Methodes de base

| Methode | Description |
|---------|-------------|
| `existe(mot)` | Test d'appartenance O(1) |
| `info(mot)` | Entrees lexicales completes |
| `frequence(mot)` | Frequence maximale |
| `phone_de(mot)` | Prononciation IPA la plus frequente |
| `homophones(phone)` | Mots partageant une prononciation |

### Morphologie

| Methode | Description |
|---------|-------------|
| `conjuguer(verbe)` | Table de conjugaison complete |
| `formes_de(lemme, cgram)` | Formes flechies d'un lemme |
| `lemme_de(mot)` | Lemme le plus frequent |

### Phonetique

| Methode | Description |
|---------|-------------|
| `rimes(mot, nb_phonemes)` | Mots partageant les N derniers phonemes |
| `contient_son(son)` | Mots contenant une sequence IPA |
| `mots_par_syllabes(n, cgram)` | Mots avec N syllabes |

### Semantique

| Methode | Description |
|---------|-------------|
| `synonymes(mot)` | Liste de synonymes |
| `antonymes(mot)` | Liste d'antonymes |
| `definition(mot)` | Definitions |

### Recherche

| Methode | Description |
|---------|-------------|
| `rechercher(pattern, champ)` | Recherche par regex (ortho ou phone) |
| `filtrer(cgram, genre, ...)` | Filtre multi-critere |
| `anagrammes(mot)` | Mots avec les memes lettres rearrangees |

---

## Formats supportes

Le module detecte automatiquement le format par l'extension du fichier :

| Format | Extensions | Avantages |
|--------|-----------|-----------|
| **SQLite** | `.db`, `.sqlite` | Requetes rapides, pas de RAM |
| **CSV** | `.csv` | Universel, lisible |
| **TSV** | `.tsv` | Compatible Lexique3, GLAFF |

Un script `construire_bdd.py` est fourni pour convertir un CSV en SQLite optimise avec index et `phone_reversed` pour les requetes de rimes.

---

## Installation

```bash
pip install lectura-lexique
```

---

## Caracteristiques techniques

- **Zero dependance** Python
- Chargement lazy a **4 niveaux** (memoire minimale)
- Backends **CSV, TSV et SQLite** (detection automatique)
- Colonnes manquantes tolerees (retour vide, pas d'exception)
- **Python 3.10+** avec type hints complets (PEP-561)
- **Double licence** : AGPL-3.0 (libre) / Licence commerciale
