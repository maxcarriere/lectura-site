---
title: G2P — Grapheme vers Phoneme
layout: default
permalink: /solutions/outils/modules/g2p/
---

<div class="module-header">
  <h1>Lectura G2P</h1>
  <p class="module-tagline">Modele unifie G2P + POS + Morphologie + Liaison pour le francais</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-g2p/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/G2P" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-g2p</code>
  </div>
</div>

## Presentation

Un seul modele **BiLSTM char-level multi-tete** (1.75M parametres, ONNX INT8 = 1.8 Mo) qui predit simultanement 4 taches a partir du texte francais :

| Tache | Description | Performance |
|-------|-------------|-------------|
| **G2P** | Transcription phonemique IPA | 98.5% word accuracy |
| **POS** | Etiquetage morpho-syntaxique (19 tags) | 98.2% accuracy |
| **Morphologie** | Genre, nombre, temps, mode, personne | 95-99% |
| **Liaison** | Liaisons obligatoires/facultatives | F1 90.6% |

Trois backends d'inference : **ONNX Runtime** (~2 ms/phrase), **NumPy** (~50 ms), ou **pur Python** (~200 ms, zero dependance).

---

## Exemple

```python
from lectura_nlp import get_model_path
from lectura_nlp.inference_onnx import OnnxInferenceEngine
from lectura_nlp.tokeniseur import tokeniser

engine = OnnxInferenceEngine(get_model_path("unifie_int8.onnx"),
                              get_model_path("unifie_vocab.json"))

tokens = tokeniser("Les enfants sont arrives a la maison.")
result = engine.analyser(tokens)

print(result["g2p"])      # ['le', 'ɑ̃fɑ̃', 'sɔ̃', 'aʁive', 'a', 'la', 'mɛzɔ̃']
print(result["pos"])      # ['ART:def', 'NOM', 'AUX', 'VER', 'PRE', 'ART:def', 'NOM']
print(result["liaison"])  # ['Lz', 'none', 'Lt', 'none', 'none', 'none', 'none']
```

---

## Essayer en ligne

<div class="pyodide-demo" data-package="lectura-g2p" data-code="
from lectura_nlp import get_model_path
from lectura_nlp.inference_pure import PurePythonInferenceEngine
from lectura_nlp.tokeniseur import tokeniser
import json, pathlib
weights_path = get_model_path('unifie_weights.json')
vocab_path = get_model_path('unifie_vocab.json')
engine = PurePythonInferenceEngine(str(weights_path), str(vocab_path))
tokens = tokeniser('{INPUT}')
r = engine.analyser(tokens)
lines = []
for i, t in enumerate(r['tokens']):
    lines.append(f'{t:15s} {r[&quot;g2p&quot;][i]:10s} {r[&quot;pos&quot;][i]:10s} {r[&quot;liaison&quot;][i]}')
'Token           IPA        POS        Liaison\n' + '-'*50 + '\n' + '\n'.join(lines)
">
  <input type="text" class="demo-input" value="Les enfants sont arrives a la maison." placeholder="Tapez une phrase francaise...">
  <button class="demo-btn" type="button">Essayer</button>
  <pre class="demo-output">Cliquez sur « Essayer » pour lancer la demo (backend pur Python, ~200 ms/phrase).</pre>
</div>

---

## Architecture du modele

```
Phrase → Char Embedding (64d) → Shared BiLSTM (2×160h → 320d)
                                        │
                    ┌───────────────────┼───────────────────┐
                    ↓                                       ↓
              G2P Head (per-char)              Word BiLSTM (128h → 256d)
              Linear(320→40)                        │
                                    ┌───┬───┬───┬───┬───┬───┬───┐
                                   POS Num Gen VF  Mood Tns Per Liaison
```

---

## Installation

```bash
pip install lectura-g2p             # zero dependance (backend pur Python)
pip install lectura-g2p[numpy]      # backend NumPy
pip install lectura-g2p[onnx]       # backend ONNX Runtime (le plus rapide)
```

---

## Caracteristiques techniques

- **1.75M parametres**, modele ONNX INT8 = 1.8 Mo
- **3 backends** : ONNX Runtime, NumPy, pur Python
- **Python 3.10+** avec type hints complets (PEP-561)
- **Double licence** : AGPL-3.0 (libre) / Licence commerciale
