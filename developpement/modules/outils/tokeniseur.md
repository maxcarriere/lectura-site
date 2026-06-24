---
title: Tokeniseur
layout: default
permalink: /developpement/modules/outils/tokeniseur/
redirect_from:
  - /solutions/modules/tokeniseur/
---

<div class="module-header">
  <h1>Lectura Tokeniseur</h1>
  <p class="module-tagline">Normalisateur et tokeniseur complet pour le français</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-tokeniseur/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Tokeniseur" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-tokeniseur</code>
  </div>
</div>

## Présentation

Module autonome, **zéro dépendance** externe. Normalise le texte français (typographie, espaces, Unicode) et le découpe en tokens structurés : mots, ponctuation et **formules** détectées automatiquement.

Le Tokeniseur identifie et classifie plus de 15 types de formules :

- Nombres (entiers, décimaux, négatifs)
- Dates, heures, téléphones
- Sigles et acronymes
- Ordinaux, fractions, pourcentages
- Monnaies, unités de mesure
- Expressions mathématiques
- Chiffres romains

---

## Exemple

```python
from lectura_tokeniseur import tokenise, Formule

tokens = tokenise("Le 25/12/2024, il a lu 42 pages.")

for token in tokens:
    detail = token.formule_type.name if isinstance(token, Formule) else ""
    print(f"{token.text:25s}  {token.type.name:12s}  {detail}")
```

```
Le                         MOT
25/12/2024                 FORMULE       DATE
,                          PONCTUATION
il                         MOT
a                          MOT
lu                         MOT
42                         FORMULE       NOMBRE
pages                      MOT
.                          PONCTUATION
```

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="{{ '/solutions/analyse-langage/#tokenisation' | relative_url }}">Essayer le Tokeniseur en ligne →</a>
</div>

---

## Installation

```bash
pip install lectura-tokeniseur                # zéro dépendance
pip install lectura-tokeniseur[formules]      # + lectura-formules (enrichissement automatique)
```

---

## Fonctionnalités

| Fonction | Description |
|----------|-------------|
| **Normalisation** | Typographie française, espaces, nettoyage Unicode |
| **Tokenisation** | Découpage en mots, ponctuation, séparateurs |
| **Détection de formules** | 15+ types : nombres, dates, heures, sigles, monnaies... |
| **API simple** | `tokenise(texte)` renvoie une liste de tokens |

---

## Caractéristiques techniques

- **Zéro dépendance** Python (aucune dépendance tierce)
- **Indépendant** de Formules (fonctionne seul, enrichissement optionnel si `lectura-formules` est installé)
- **Python 3.10+** avec type hints complets (PEP-561)
- **Version** : 2.3.0
- **Licence** : AGPL-3.0 (non commerciale) — licence commerciale sur demande : [nous contacter]({{ '/contact/' | relative_url }})
