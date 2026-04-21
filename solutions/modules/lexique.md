---
title: Lexique
layout: default
permalink: /solutions/modules/lexique/
---

<div class="module-header">
  <h1>Lectura Lexique</h1>
  <p class="module-tagline">Module generique d'acces a un lexique francais : morphologie, phonetique, semantique, recherche</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-lexique/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Lexique" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-lexique</code>
  </div>
</div>

## Presentation

Module generique d'acces a un lexique francais. Fonctionne avec **n'importe quel fichier CSV, TSV ou SQLite** contenant des colonnes standard. Fournit 18 methodes de requetage organisees en 4 familles.

Le module ne fournit pas de donnees : vous apportez votre propre base lexicale. Il est compatible avec les principales bases disponibles pour le francais ainsi qu'avec le [LeXiK de Lectura]({{ '/solutions/ressources/lexik/' | relative_url }}).

### Bases compatibles

| Base | Entrees | Colonnes reconnues | Lien |
|------|--------:|-------------------|------|
| **Lexique383** | 142&nbsp;000 | ortho, lemme, cgram, genre, nombre, phon, freqfilms2, nbsyll... | [lexique.org](http://www.lexique.org/) |
| **GLAFF** | 1&nbsp;400&nbsp;000 | graphie, lemme, cgram, genre, nombre, phone... | [glaff.atilf.fr](http://redac.univ-tlse2.fr/lexiques/glaff.html) |
| **Morphalou** | 540&nbsp;000 | graphie, lemma, category, gender, number... | [ortolang.fr](https://www.ortolang.fr/market/lexicons/morphalou) |
| **LeXiK Lectura** | 1&nbsp;350&nbsp;000 | 25 colonnes (ortho, phone, synonymes, definition...) | [En savoir plus]({{ '/solutions/ressources/lexik/' | relative_url }}) |

### Colonnes standard

Le module reconnait automatiquement les noms de colonnes courants et les unifie en noms canoniques :

| Nom canonique | Alias reconnus |
|---------------|----------------|
| `ortho` | graphie, form, word, forme, flexion |
| `lemme` | lemma |
| `cgram` | category, pos, cat, catgram |
| `phone` | phon, phon_ipa, ipa, prononciation |
| `genre` | gender, gen |
| `nombre` | number, num |
| `freq` | freq_opensubs, freqfilms2, freq_frwac, freq_frantext... |

Les colonnes absentes sont tolerees : chaque methode retourne un resultat vide (pas d'exception).

---

## Exemple

```python
from lectura_lexique import Lexique

# Fonctionne avec CSV, TSV ou SQLite
with Lexique("mon_lexique.csv") as lex:
    # Morphologie
    print(lex.conjuguer("manger"))
    # {'indicatif': {'présent': {'1s': 'mange', '2s': 'manges', ...}, ...}}

    print(lex.lemme_de("mangeait"))   # 'manger'
    print(lex.formes_de("grand"))     # [{'ortho': 'grand', ...}, ...]

    # Phonetique
    print(lex.rimes("maison"))        # mots rimant en -zɔ̃
    print(lex.contient_son("ʒ"))      # mots contenant /ʒ/
    print(lex.mots_par_syllabes(3))   # trisyllabes

    # Semantique (si colonnes presentes)
    print(lex.synonymes("grand"))     # ['vaste', 'immense', ...]
    print(lex.antonymes("grand"))     # ['petit', ...]
    print(lex.definition("maison"))   # ["Batiment servant d'habitation."]

    # Recherche
    print(lex.rechercher("^micro"))   # regex sur ortho
    print(lex.anagrammes("chien"))    # ['chine', 'niche', ...]
    print(lex.filtrer(cgram="NOM", genre="f", freq_min=100))
```

---

## Methodes disponibles

### Methodes de base

| Methode | Description | Colonnes requises |
|---------|-------------|-------------------|
| `existe(mot)` | Test d'appartenance O(1) | ortho |
| `info(mot)` | Entrees lexicales completes | ortho |
| `frequence(mot)` | Frequence maximale | ortho, freq |
| `phone_de(mot)` | Prononciation IPA la plus frequente | ortho, phone |
| `homophones(phone)` | Mots partageant une prononciation | phone |

### Morphologie

| Methode | Description | Colonnes requises |
|---------|-------------|-------------------|
| `conjuguer(verbe)` | Table de conjugaison complete | lemme, cgram, mode, temps, personne |
| `formes_de(lemme, cgram)` | Formes flechies d'un lemme | lemme |
| `lemme_de(mot)` | Lemme le plus frequent | ortho, lemme |

### Phonetique

| Methode | Description | Colonnes requises |
|---------|-------------|-------------------|
| `rimes(mot, nb_phonemes)` | Mots partageant les N derniers phonemes | phone |
| `contient_son(son)` | Mots contenant une sequence IPA | phone |
| `mots_par_syllabes(n, cgram)` | Mots avec N syllabes | nb_syllabes ou syllabes |

### Semantique

| Methode | Description | Colonnes requises |
|---------|-------------|-------------------|
| `synonymes(mot)` | Liste de synonymes (separateur `;`) | synonymes |
| `antonymes(mot)` | Liste d'antonymes (separateur `;`) | antonymes |
| `definition(mot)` | Definitions | definition |

### Recherche

| Methode | Description | Colonnes requises |
|---------|-------------|-------------------|
| `rechercher(pattern, champ)` | Recherche par regex (ortho ou phone) | ortho ou phone |
| `filtrer(cgram, genre, ...)` | Filtre multi-critere | selon criteres |
| `anagrammes(mot)` | Mots avec les memes lettres rearrangees | ortho |

---

## Chargement intelligent

Chargement lazy a 4 niveaux pour minimiser l'utilisation memoire :

| Niveau | Charge | Permet |
|--------|--------|--------|
| 1 (init) | `frozenset` des formes | `existe()` en O(1) |
| 2 (lazy) | index phone | `homophones()`, `rimes()`, `contient_son()` |
| 3 (lazy) | index ortho | `info()`, `frequence()`, `synonymes()`, `rechercher()` |
| 4 (lazy) | index lemme | `conjuguer()`, `formes_de()` |

Pour le backend SQLite, les niveaux 2-4 utilisent des requetes SQL directes sans chargement en memoire.

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
- **Resolution automatique des alias** de colonnes
- Colonnes manquantes tolerees (retour vide, pas d'exception)
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (non commerciale) — licence commerciale sur demande : [contact@lec-tu-ra.com](mailto:contact@lec-tu-ra.com)
