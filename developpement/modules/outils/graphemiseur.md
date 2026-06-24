---
title: Graphemiseur
layout: default
permalink: /developpement/modules/outils/graphemiseur/
---

<div class="module-header">
  <h1>Lectura Graphemiseur</h1>
  <p class="module-tagline">Modèle BiLSTM V7 multi-tête — P2G + POS + Morphologie avec attention cross et lex_select</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-graphemiseur/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Graphemiseur" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-graphemiseur</code>
  </div>
</div>

## Présentation

Brique atomique P2G : à partir d'une transcription phonétique IPA, reconstruit l'orthographe française. Un seul modèle **BiLSTM char-level multi-tête V7 avec attention cross word-char et lex_select** (3.2M paramètres, ONNX INT8 = 4.4 Mo).

| Tâche | Description | Performance |
|-------|-------------|-------------|
| **P2G** | IPA vers orthographe (modèle core + lex_select) | ~95% word accuracy |
| **POS** | Étiquetage morpho-syntaxique (19 tags) | ~98% accuracy |
| **Morphologie** | Genre, nombre, temps, mode, personne | 95-98% |

Quatre backends d'inférence : **API** (zero config), **ONNX Runtime**, **NumPy**, ou **pur Python** (zéro dépendance).

> **Brique vs Pipeline** : Le Graphémiseur est le modèle core (IPA → orthographe brute). Pour le pipeline complet P2G (avec formules, noms propres, entités), voir [lectura-p2g]({{ '/developpement/modules/metiers/p2g/' | relative_url }}).

---

## Exemple de code

```python
from lectura_graphemiseur import creer_engine

engine = creer_engine()   # mode API par défaut (zero config)

result = engine.analyser(["le", "ɑ̃fɑ̃", "sɔ̃", "aʁive", "a", "la", "mɛzɔ̃"])

print(result["ortho"])   # ['les', 'enfants', 'sont', 'arrives', 'a', 'la', 'maison']
print(result["pos"])     # ['ART:def', 'NOM', 'AUX', 'VER', 'PRE', 'ART:def', 'NOM']
```

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="{{ '/solutions/analyse-langage/#graphémisation-phonétique-vers-orthographe' | relative_url }}">Essayer la graphémisation en ligne →</a>
</div>

---

## Architecture du modèle (V7)

Le P2G V7 ajoute un mécanisme d'**attention cross word-char** : les représentations de mots issues des têtes POS/Morpho sont projetées vers les positions caractère par attention, améliorant la résolution des ambiguïtés contextuelles. Le **lex_select** choisit parmi les candidats phonétiquement compatibles du lexique par une tête neuronale dédiée.

```
Phrase IPA → Char Embedding (64d) → Shared BiLSTM (2x192h → 384d)
                                          |
                  +-----------------------+--------------------+
                  v                                             v
        Word representations              Word repr (384d) + Phone Lex Features (28d)
        (fwd[last] || bwd[first])                          |
                                                 Word BiLSTM (192h → 384d)
                                                       |
                                            +--------------+--------------+
                                           POS        Morpho (x6)    Attention Cross
                                                                    → P2G Head
                                                                    → Lex_Select Head
```

**Phone_lex_features (28d)** : le modèle reçoit un vecteur de 28 dimensions par mot, construit à partir du `phone_lexicon.db` (lexique phonétique SQLite) : 19d POS one-hot + 3d morpho (genre, nombre) + 6d features lexicales. Le **lex_select** sélectionne la meilleure forme orthographique parmi les candidats phonétiquement compatibles du lexique. Sans phone_lexicon, le modèle fonctionne en mode dégradé (features = zeros).

---

## Installation

```bash
# Modèle core (zéro dépendance)
pip install lectura-graphemiseur             # mode API (zero config)
pip install lectura-graphemiseur[onnx]       # backend ONNX Runtime local (~2 ms/phrase)
pip install lectura-graphemiseur[numpy]      # backend NumPy local
pip install lectura-graphemiseur[lexique]    # + lectura-lexique (phone_lex_features)
pip install lectura-graphemiseur[all]        # onnx + numpy + lexique
```

Par défaut, le module utilise l'API Lectura (aucune configuration nécessaire). Les backends locaux (ONNX, NumPy) nécessitent les modèles pré-entraînés, disponibles sous [licence commerciale]({{ '/contact/' | relative_url }}).

---

## Caractéristiques techniques

- **3.2M paramètres**, modèle ONNX INT8 = 4.4 Mo
- **4 backends** : API (zero config), ONNX Runtime (~2 ms), NumPy (~50 ms), pur Python (~200 ms)
- **Word feedback** : les informations POS/morpho enrichissent la prédiction P2G
- **Phone_lex_features (28d)** : features construites depuis `phone_lexicon.db` (lexique phonétique SQLite)
- **Lex_select** : sélection lexicale parmi candidats phonétiques
- **Zéro dépendance** : le graphémiseur core n'importe pas `lectura_formules`
- **Factory `creer_engine()`** : détection automatique du meilleur backend
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (non commerciale) — licence commerciale sur demande : [nous contacter]({{ '/contact/' | relative_url }})
