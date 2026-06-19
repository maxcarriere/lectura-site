---
title: Pipeline P2G
layout: default
permalink: /developpement/modules/metiers/p2g/
redirect_from:
  - /solutions/modules/p2g/
---

<div class="module-header">
  <h1>Pipeline P2G</h1>
  <p class="module-tagline">Phonèmes IPA → texte français — pipeline complet avec formules, noms propres et entités</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-graphemiseur/" class="module-badge">PyPI (core)</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/P2G" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-p2g</code>
  </div>
</div>

## Présentation

Le pipeline P2G orchestre le [Graphémiseur]({{ '/developpement/modules/outils/graphemiseur/' | relative_url }}) (modèle core) avec des modules complémentaires pour reconstituer du texte français complet à partir de phonèmes IPA.

### Architecture en deux couches

| Couche | Package | Contenu | Performance |
|--------|---------|---------|-------------|
| **Couche 1** | `lectura-graphemiseur` | Modèle P2G core + lex_select + cohérence morpho + accents | ~95% word accuracy |
| **Couche 2** | `lectura-p2g` | Pipeline complet = graphémiseur + formules + noms propres + entités | ~96% word accuracy |

### Pipeline

```
Phonèmes IPA (mots séparés)
         │
         ▼
┌──────────────────────┐
│ Graphémiseur (V7)     │  BiLSTM + attention cross + lex_select
│                        │  → orthographe brute + POS + morpho
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ Lex Rescoring         │  lex_select parmi candidats phonétiques
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ Formules              │  reconnaissance nombres, sigles, expressions math
│                        │  (mode chiffres par défaut, tolerance="stt" pour STT)
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ Noms propres          │  reconnaissance de ~9000 entités notables
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ Cohérence morpho      │  accords, accents, fusion composés
└────────┬─────────────┘
         │
         ▼
  Texte français orthographié
```

### Briques utilisées

| Brique | Package | Rôle dans le pipeline |
|--------|---------|----------------------|
| [Graphémiseur]({{ '/developpement/modules/outils/graphemiseur/' | relative_url }}) | `lectura-graphemiseur` | Modèle P2G core (IPA → ortho) |
| [Formules]({{ '/developpement/modules/outils/formules/' | relative_url }}) | `lectura-formules` | Nombres, sigles en mode inverse |
| [Lexique]({{ '/developpement/modules/outils/lexique/' | relative_url }}) | `lectura-lexique` | Phone lexicon pour lex_select |

---

## Exemple de code

```python
# Couche 1 : Graphémiseur core (zéro dépendance)
from lectura_graphemiseur import creer_engine

engine = creer_engine()
result = engine.analyser(["le", "ɑ̃fɑ̃", "sɔ̃", "aʁive", "a", "la", "mɛzɔ̃"])
print(result["ortho"])   # ['les', 'enfants', 'sont', 'arrives', 'a', 'la', 'maison']
```

```python
# Couche 2 : Pipeline complet (formules + noms propres)
from lectura_p2g import creer_engine

engine = creer_engine()
result = engine.analyser(["sɛ̃k", "sɑ̃", "vɛ̃", "e", "œ̃"])
print(result["ortho"])   # ['521']  — formules reconnues et fusionnées
```

---

## Installation

```bash
# Modèle core (zéro dépendance)
pip install lectura-graphemiseur             # mode API (zero config)
pip install lectura-graphemiseur[onnx]       # backend ONNX Runtime local

# Pipeline complet (graphemiseur + formules + noms propres)
pip install lectura-p2g
```

Le graphémiseur (couche 1) est **zéro dépendance** — pas d'import de `lectura_formules`. Le pipeline complet (couche 2) orchestre formules, fusion de composés, cohérence morpho, noms propres et reconnaissance d'entités notables.

---

## Caractéristiques techniques

- **3.2M paramètres** (graphémiseur core), ONNX INT8 = 4.4 Mo
- **4 backends** : API (zero config), ONNX Runtime (~2 ms), NumPy (~50 ms), pur Python (~200 ms)
- **Lex_select** : sélection lexicale parmi candidats phonétiques
- **Pipeline `lectura-p2g`** : formules (mode chiffres, tolerance="stt"), fusion composés, noms propres, ~9000 entités notables
- **Zéro dépendance** (couche 1) : le graphémiseur n'importe pas `lectura_formules`
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 — licence commerciale sur demande : [admin@lectura.world](mailto:admin@lectura.world)
