---
title: Formules
layout: default
permalink: /developpement/modules/outils/formules/
redirect_from:
  - /solutions/modules/formules/
---

> **Génération v0, gratuite.** Ce module fait partie de la première génération de Lectura : code sous AGPL-3.0, sans modèle à télécharger. Tout tourne en local, sans clé. Usage commercial : compris dans toute licence Lectura v1, ou sur demande. Voir [Génération v0]({{ '/developpement/modules/v0/' | relative_url }}).

<div class="module-header">
  <h1>Lectura Formules</h1>
  <p class="module-tagline">Lecture algorithmique des formules pour le français</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-formules/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Formules" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-formules</code>
  </div>
</div>

## Présentation

Module autonome, **zéro dépendance** externe. Il lit à voix haute les formules écrites : nombres, sigles, dates, téléphones, heures, monnaies, ordinaux, fractions, notations scientifiques, expressions mathématiques, coordonnées GPS…

Chaque lecture est donnée en toutes lettres (`display_fr`) et en phonétique IPA (`phone`). La lecture se fait par règles, sans modèle.

*Voir aussi les [logiciels de bureau]({{ '/developpement/logiciels/bureau/' | relative_url }}).*

---

## Exemple

```python
from lectura_formules import lire_nombre, lire_formule

# Lire un nombre
result = lire_nombre("42")
print(result.display_fr)    # "quarante-deux"
print(result.phone)         # "kaʁɑ̃t dø"

# Lire une formule dont le type est connu
print(lire_formule("nombre", "42").display_fr)   # "quarante-deux"
```

### Avec le Tokeniseur

`enrichir_formules()` complète, sur place, les tokens de type `FORMULE` produits par [`lectura-tokeniseur`]({{ '/developpement/modules/outils/tokeniseur/' | relative_url }}) (attributs `display_fr` et `lecture`) :

```python
from lectura_tokeniseur import tokenise
from lectura_formules import enrichir_formules

tokens = tokenise("Il a 3 chats.")
enrichir_formules(tokens)
print([(t.text, t.display_fr) for t in tokens if t.type.name == "FORMULE"])
# [('3', 'trois')]
```

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="https://lingua.lectura.world/g2p">Essayer les Formules en ligne (génération actuelle) →</a>
</div>

---

## API principale

| Fonction | Description |
|----------|-------------|
| `lire_formule(type, texte)` | Lit une formule dont le type est donné ("nombre", "date", "heure", "sigle"…) |
| `lire_nombre(texte)` | Nombres : "42" → "quarante-deux" |
| `lire_date(texte)` | Dates : "25/12/2024" → "vingt-cinq-décembre-deux-mille-vingt-quatre" |
| `lire_heure(texte)` | Heures : "14h30" → "quatorze-heures-trente" |
| `lire_telephone(texte)` | Téléphones : "06 12 34 56 78" |
| `lire_sigle(texte)` | Sigles : "SNCF" → "esse-enne-cé-effe" |
| `lire_ordinal(texte)` | Ordinaux : "3e" → "troisième" |
| `lire_fraction(texte)` | Fractions : "3/4" → "trois-quarts" |
| `lire_monnaie(texte)` | Monnaies : "42 EUR" → "quarante-deux-euros" |
| `lire_pourcentage(texte)` | Pourcentages : "50%" → "cinquante-pour cent" |
| `enrichir_formules(tokens)` | Enrichit les tokens FORMULE d'une phrase tokenisée |
| `int_to_roman(n)` / `roman_to_int(s)` | Chiffres romains |

---

## Sons (facultatif)

Les fichiers sons (WAV) des formules ne sont **pas** inclus dans le paquet. Si vous disposez d'un dossier de sons, indiquez son chemin :

```python
from lectura_formules import set_sounds_dir, get_sound_path

set_sounds_dir("/chemin/vers/sons_formules")

# identifiant de son (nom du fichier WAV sans extension, par exemple "num017")
wav = get_sound_path("num017")
if wav:
    print(f"Fichier son : {wav}")
```

---

## Installation

```bash
pip install lectura-formules
```

---

## Licence

- **Code** : AGPL-3.0-or-later.
- **Tables de données** (nombres, lettres, symboles, mois, unités, devises…) : écrites par Lectura, sous la licence du code (voir le fichier NOTICE du paquet).
- **Usage commercial ou intégration dans un produit fermé** : compris dans toute licence Lectura v1, ou sur demande par la [page Contact]({{ '/contact/' | relative_url }}).
