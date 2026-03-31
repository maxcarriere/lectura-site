---
title: P2G — Phoneme vers Grapheme
layout: default
permalink: /solutions/outils/modules/p2g/
---

<div class="module-header">
  <h1>Lectura P2G</h1>
  <p class="module-tagline">Modele unifie P2G + POS + Morphologie pour le francais (IPA → orthographe)</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-p2g/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/P2G" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-p2g</code>
  </div>
</div>

## Presentation

Le pendant inverse du G2P : a partir d'une transcription phonetique IPA, le P2G reconstruit l'orthographe francaise. Un seul modele **BiLSTM char-level multi-tete avec word feedback** (2.56M parametres, ONNX INT8 = 2.6 Mo).

| Tache | Description | Performance |
|-------|-------------|-------------|
| **P2G** | IPA vers orthographe | 93.1% word accuracy, 2.2% CER |
| **POS** | Etiquetage morpho-syntaxique (19 tags) | 97.0% accuracy |
| **Morphologie** | Genre, nombre, temps, mode, personne | 92-97% |

Trois backends d'inference : **ONNX Runtime**, **NumPy**, ou **pur Python** (zero dependance).

---

## Exemple

```python
from lectura_p2g import get_model_path
from lectura_p2g.inference_onnx import OnnxInferenceEngine

engine = OnnxInferenceEngine(get_model_path("unifie_p2g_v2_int8.onnx"),
                              get_model_path("unifie_p2g_v2_vocab.json"))

result = engine.analyser(["le", "ɑ̃fɑ̃", "sɔ̃", "aʁive", "a", "la", "mɛzɔ̃"])

print(result["ortho"])   # ['les', 'enfants', 'sont', 'arrives', 'a', 'la', 'maison']
print(result["pos"])     # ['ART:def', 'NOM', 'AUX', 'VER', 'PRE', 'ART:def', 'NOM']
```

---

## Essayer en ligne

<div class="pyodide-demo" data-package="lectura-p2g" data-code="
from lectura_p2g import get_model_path
from lectura_p2g.inference_pure import PurePythonInferenceEngine
weights_path = get_model_path('unifie_p2g_v2_weights.json')
vocab_path = get_model_path('unifie_p2g_v2_vocab.json')
engine = PurePythonInferenceEngine(str(weights_path), str(vocab_path))
ipa_words = '{INPUT}'.split()
r = engine.analyser(ipa_words)
lines = []
for i, w in enumerate(r['ipa_words']):
    lines.append(f'{w:15s} → {r[&quot;ortho&quot;][i]:15s} {r[&quot;pos&quot;][i]}')
'IPA             → Orthographe     POS\n' + '-'*45 + '\n' + '\n'.join(lines)
">
  <input type="text" class="demo-input" value="le ɑ̃fɑ̃ sɔ̃ aʁive a la mɛzɔ̃" placeholder="Entrez des mots en IPA separes par des espaces...">
  <button class="demo-btn" type="button">Essayer</button>
  <pre class="demo-output">Cliquez sur « Essayer » pour lancer la demo (backend pur Python).</pre>
</div>

---

## Architecture du modele (v2)

Le P2G utilise un mecanisme de **word feedback** : les representations de mots issues des tetes POS/Morpho sont diffusees aux positions caractere correspondantes avant la prediction P2G finale.

```
Phrase IPA → Char Embedding (64d) → Shared BiLSTM (2×160h → 320d)
                                          │
                  ┌───────────────────────┼────────────────────┐
                  ↓                                             ↓
        Word representations                          Word BiLSTM (192h → 384d)
        (fwd[last] || bwd[first])                          │
                                            ┌──────────────┼──────────────┐
                                           POS        Morpho (×6)    Word Feedback
                                                                    → P2G Head (704d → 1198)
```

---

## Installation

```bash
pip install lectura-p2g             # zero dependance (backend pur Python)
pip install lectura-p2g[numpy]      # backend NumPy
pip install lectura-p2g[onnx]       # backend ONNX Runtime (le plus rapide)
```

---

## Caracteristiques techniques

- **2.56M parametres**, modele ONNX INT8 = 2.6 Mo
- **3 backends** : ONNX Runtime, NumPy, pur Python
- **Word feedback** : les informations POS/morpho enrichissent la prediction P2G
- **Python 3.10+** avec type hints complets (PEP-561)
- **Double licence** : AGPL-3.0 (libre) / Licence commerciale
