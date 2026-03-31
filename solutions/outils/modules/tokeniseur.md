---
title: Tokeniseur
layout: default
permalink: /solutions/outils/modules/tokeniseur/
---

<div class="module-header">
  <h1>Lectura Tokeniseur</h1>
  <p class="module-tagline">Normalisateur et tokeniseur complet pour le francais</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-tokeniseur/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Tokeniseur" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-tokeniseur</code>
  </div>
</div>

## Presentation

Module autonome, **zero dependance** externe. Normalise le texte francais (typographie, espaces, Unicode) et le decoupe en tokens structures : mots, ponctuation et **formules** detectees automatiquement.

Le Tokeniseur identifie et classifie plus de 15 types de formules :

- Nombres (entiers, decimaux, negatifs)
- Dates, heures, telephones
- Sigles et acronymes
- Ordinaux, fractions, pourcentages
- Monnaies, unites de mesure
- Expressions mathematiques
- Chiffres romains

---

## Exemple

```python
from lectura_tokeniseur import tokenise

tokens = tokenise("Le 25 decembre 2024, il faisait -3°C a Paris.")

for token in tokens:
    print(f"{token.text:25s}  {token.type.name}")
```

```
Le                         MOT
25 decembre 2024           FORMULE
,                          PONCTUATION
il                         MOT
faisait                    MOT
-3°C                       FORMULE
a                          MOT
Paris                      MOT
.                          PONCTUATION
```

---

## Essayer en ligne

<div class="pyodide-demo" data-package="lectura-tokeniseur" data-code="
from lectura_tokeniseur import tokenise
tokens = tokenise('{INPUT}')
lines = []
for t in tokens:
    lines.append(f'{t.text:25s} {t.type.name}')
'\n'.join(lines)
">
  <input type="text" class="demo-input" value="Le 25 decembre 2024, il a lu 42 pages." placeholder="Tapez du texte francais...">
  <button class="demo-btn" type="button">Essayer</button>
  <pre class="demo-output">Cliquez sur « Essayer » pour lancer la demo.</pre>
</div>

---

## Fonctionnalites

| Fonction | Description |
|----------|-------------|
| **Normalisation** | Typographie francaise, espaces, nettoyage Unicode |
| **Tokenisation** | Decoupage en mots, ponctuation, separateurs |
| **Detection de formules** | 15+ types : nombres, dates, heures, sigles, monnaies... |
| **API simple** | `tokenise(texte)` renvoie une liste de tokens |

---

## Caracteristiques techniques

- **Zero dependance** Python
- **Python 3.10+** avec type hints complets (PEP-561)
- **Double licence** : AGPL-3.0 (libre) / Licence commerciale
