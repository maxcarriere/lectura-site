---
title: Tokeniseur
layout: default
permalink: /developpement/modules/outils/tokeniseur/
redirect_from:
  - /solutions/modules/tokeniseur/
---

> **Génération v0, gratuite.** Ce module fait partie de la première génération de Lectura : code sous AGPL-3.0, sans modèle à télécharger. Tout tourne en local, sans clé. Usage commercial : compris dans toute licence Lectura v1, ou sur demande. Voir [Génération v0]({{ '/developpement/modules/v0/' | relative_url }}).

<div class="module-header">
  <h1>Lectura Tokeniseur</h1>
  <p class="module-tagline">Normalisateur et tokeniseur complet pour le français</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-tokeniseur/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules-v0/tree/main/Tokeniseur" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-tokeniseur</code>
  </div>
</div>

## Présentation

Module autonome, **zéro dépendance** externe. Il normalise le texte français (typographie, espaces, Unicode), puis le découpe en tokens : mots, ponctuation, séparateurs et **formules**.

Les formules sont détectées et classées :

- nombres (entiers, décimaux, négatifs) ;
- dates, heures, téléphones, numéros ;
- sigles ;
- ordinaux, fractions, pourcentages ;
- monnaies, unités de mesure, notations scientifiques ;
- expressions mathématiques ;
- chiffres romains.

---

## Exemple

```python
from lectura_tokeniseur import tokenise

tokens = tokenise("Le 25 décembre 2024, il faisait -3°C à Paris.")

for token in tokens:
    if token.type.name != "SEPARATEUR":
        print(f"{token.text:20s}  {token.type.name}")
```

```
Le                    MOT
25                    FORMULE
décembre              MOT
2024                  FORMULE
,                     PONCTUATION
il                    MOT
faisait               MOT
-3°C                  FORMULE
à                     MOT
Paris                 MOT
.                     PONCTUATION
```

`tokenise()` renvoie une liste plate de tokens (`Mot`, `Ponctuation`, `Separateur`, `Formule`), avec leur position (`span`) dans le texte. `normalise(texte)` prépare le texte (typographie, espaces, Unicode) avant la tokenisation.

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="https://lingua.lectura.world/g2p">Essayer le Tokeniseur en ligne (génération actuelle) →</a>
</div>

---

## Installation

```bash
pip install lectura-tokeniseur
```

---

## Fonctionnalités

| Fonction | Description |
|----------|-------------|
| **Normalisation** | Typographie, espaces, Unicode |
| **Tokenisation** | Mots, ponctuation, séparateurs |
| **Détection de formules** | Nombres, dates, heures, téléphones, sigles, ordinaux, fractions, pourcentages, monnaies, unités de mesure, expressions mathématiques, chiffres romains |
| **API simple** | `tokenise(texte)` renvoie la liste des tokens |

---

## Licence

- **Code** : AGPL-3.0-or-later.
- **Table de données** : la liste des sigles lus comme des mots (`acronymes_mots.json`), tirée du Wiktionnaire et modifiée par Lectura, est sous CC BY-SA 4.0. Source et crédits dans le fichier NOTICE du paquet.
- **Usage commercial ou intégration dans un produit fermé** : compris dans toute licence Lectura v1, ou sur demande par la [page Contact]({{ '/contact/' | relative_url }}).
