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

| Tache | Description | Performance (par mot) |
|-------|-------------|-------------|
| **G2P** | Transcription phonemique IPA | 98.5% accuracy |
| **POS** | Etiquetage morpho-syntaxique (19 tags) | 98.2% accuracy |
| **Morphologie** | Genre, nombre, temps, mode, personne | 95-99% accuracy |
| **Liaison** | Liaisons obligatoires/facultatives | F1 90.6% |

*Performances mesurees sur un corpus de test de phrases francaises completes (mots en contexte).*

Trois backends d'inference : **ONNX Runtime** (~2 ms/phrase), **NumPy** (~50 ms), ou **pur Python** (~200 ms, zero dependance).

### G2P vs eSpeak-NG

Le modele Lectura G2P se distingue d'eSpeak-NG par sa prise en compte du **contexte phrastique** : il predit la prononciation, la categorie grammaticale, la morphologie et les liaisons en une seule passe. eSpeak-NG phonemise chaque mot isolement, sans desambiguisation contextuelle (homographes, liaisons).

Une comparaison en ligne n'est pas possible (eSpeak-NG est un binaire systeme, non disponible dans le navigateur), mais vous pouvez comparer localement :

```bash
pip install lectura-g2p[onnx]
sudo apt install espeak-ng    # ou brew install espeak
```

---

## Tester en ligne

*Le test en ligne utilise le backend NumPy et necessite le telechargement des poids du modele (~18 Mo). En local, `pip install lectura-g2p[onnx]` offre une inference ~25x plus rapide (~2 ms/phrase).*

<div class="pyodide-demo" data-package="lectura-g2p" data-numpy="1">
  <script type="text/x-python" class="demo-setup">
from pyodide.http import pyfetch
from pathlib import Path

response = await pyfetch('https://raw.githubusercontent.com/maxcarriere/lectura-modules/main/G2P/modeles_numpy/unifie_weights.json')
weights_text = await response.string()
Path('/tmp/unifie_weights.json').write_text(weights_text)

from lectura_nlp import get_model_path
from lectura_nlp.inference_numpy import NumpyInferenceEngine
from lectura_nlp.tokeniseur import tokeniser as _g2p_tokeniser

global _g2p_engine
_g2p_engine = NumpyInferenceEngine('/tmp/unifie_weights.json', str(get_model_path('unifie_vocab.json')))
  </script>
  <script type="text/x-python" class="demo-run">
tokens = _g2p_tokeniser('{INPUT}')
result = _g2p_engine.analyser(tokens)
lines = []
lines.append(f"{'Token':<16}{'IPA':<16}{'POS':<12}{'Liaison'}")
lines.append('-' * 56)
for i, tok in enumerate(tokens):
    ipa = result['g2p'][i] if i < len(result['g2p']) else ''
    pos = result['pos'][i] if i < len(result['pos']) else ''
    lia = result['liaison'][i] if i < len(result['liaison']) else ''
    lines.append(f"{tok:<16}{ipa:<16}{pos:<12}{lia}")
'\n'.join(lines)
  </script>
  <input type="text" class="demo-input" value="Les enfants sont arrives a la maison." placeholder="Entrez une phrase francaise...">
  <button class="demo-btn" type="button">Charger et tester (~18 Mo)</button>
  <pre class="demo-output">Cliquez sur le bouton pour charger le modele et lancer la demo.</pre>
</div>

---

## Exemple de code

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

## Architecture du modele

```
Phrase → Char Embedding (64d) → Shared BiLSTM (2x160h → 320d)
                                        |
                    +-------------------+-------------------+
                    v                                       v
              G2P Head (per-char)              Word BiLSTM (128h → 256d)
              Linear(320→40)                        |
                                    +---+---+---+---+---+---+---+
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
- **3 backends** : ONNX Runtime (~2 ms), NumPy (~50 ms), pur Python (~200 ms)
- **Python 3.10+** avec type hints complets (PEP-561)
- **Double licence** : AGPL-3.0 (libre) / Licence commerciale
