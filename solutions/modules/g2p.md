---
title: G2P — Grapheme vers Phoneme
layout: default
permalink: /solutions/modules/g2p/
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

Quatre backends d'inference : **API** (zero config), **ONNX Runtime** (~2 ms/phrase), **NumPy** (~50 ms), ou **pur Python** (~200 ms, zero dependance).

### G2P vs eSpeak-NG

Le modele Lectura G2P se distingue d'eSpeak-NG par sa prise en compte du **contexte phrastique** : il predit la prononciation, la categorie grammaticale, la morphologie et les liaisons en une seule passe. eSpeak-NG phonemise chaque mot isolement, sans desambiguisation contextuelle (homographes, liaisons).

---

## Tester en ligne

*Le test en ligne utilise l'API Lectura — aucun telechargement de modele necessaire.*

<div class="pyodide-demo" data-package="lectura-g2p" data-numpy="0">
  <script type="text/x-python" class="demo-setup">
from pyodide.http import pyfetch
import json

async def _g2p_api_call(tokens):
    resp = await pyfetch('https://api.lec-tu-ra.com/g2p/analyser',
        method='POST',
        headers={'Content-Type': 'application/json'},
        body=json.dumps({'tokens': tokens}))
    return await resp.json()
  </script>
  <script type="text/x-python" class="demo-run">
import re
_punct_re = re.compile(r'^[,;:!?.\u2026\u00ab\u00bb"()\[\]{}\u2013\u2014/]+$')
tokens = '{INPUT}'.split()
result = await _g2p_api_call(tokens)
lines = []
lines.append(f"{'Token':<16}{'IPA':<16}{'POS':<12}{'Liaison'}")
lines.append('-' * 56)
for i, tok in enumerate(tokens):
    if _punct_re.match(tok):
        continue
    ipa = result['g2p'][i] if i < len(result['g2p']) else ''
    pos = result['pos'][i] if i < len(result['pos']) else ''
    lia = result['liaison'][i] if i < len(result['liaison']) else ''
    lines.append(f"{tok:<16}{ipa:<16}{pos:<12}{lia}")
'\n'.join(lines)
  </script>
  <input type="text" class="demo-input" value="Les enfants sont arrivés à la maison." placeholder="Entrez une phrase francaise...">
  <button class="demo-btn" type="button">Tester</button>
  <pre class="demo-output">Cliquez sur le bouton pour lancer la demo.</pre>
</div>

---

## Exemple de code

```python
from lectura_nlp import creer_engine

engine = creer_engine()   # mode API par defaut (zero config)

result = engine.analyser(["Les", "enfants", "sont", "arrivés", "à", "la", "maison"])

print(result["g2p"])      # ['le', 'ɑ̃fɑ̃', 'sɔ̃', 'aʁive', 'a', 'la', 'mɛzɔ̃']
print(result["pos"])      # ['ART:def', 'NOM', 'AUX', 'VER:pper', 'PRE', 'ART:def', 'NOM']
print(result["liaison"])  # ['Lz', 'none', 'Lt', 'none', 'none', 'none', 'none']
```

---

## Architecture du modele

```
Phrase → Char Embedding (64d) → Shared BiLSTM (2x160h → 320d)
                                        |
                    +-------------------+-------------------+
                    v                                       v
              G2P Head (per-char)         Word repr (320d) + Lex Features (24d)
              Linear(320→40)                        |
                                          Word BiLSTM (128h → 256d)
                                                |
                                    +---+---+---+---+---+---+---+
                                   POS Num Gen VF  Mood Tns Per Liaison
```

**Features lexicales (optionnel)** : si un fichier `lexique_pos_candidates.json` est present dans le dossier modeles, le modele recoit un vecteur de 24 dimensions par mot (candidats POS du lexique). Cela ameliore la prediction POS, la morphologie et les liaisons. Sans lexique, le modele fonctionne normalement. Ce fichier est inclus avec les modeles (licence commerciale).

---

## Installation

```bash
pip install lectura-g2p             # mode API (zero config, zero dependance)
pip install lectura-g2p[onnx]       # backend ONNX Runtime local (~2 ms/phrase)
pip install lectura-g2p[numpy]      # backend NumPy local
```

---

## Caracteristiques techniques

- **1.75M parametres**, modele ONNX INT8 = 1.8 Mo
- **4 backends** : API (zero config), ONNX Runtime (~2 ms), NumPy (~50 ms), pur Python (~200 ms)
- **Factory `creer_engine()`** : detection automatique du meilleur backend
- **Features lexicales** (optionnel) : candidats POS pour ameliorer POS/morpho/liaison (inclus avec les modeles)
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (non commerciale) — licence commerciale sur demande : [contact@lec-tu-ra.com](mailto:contact@lec-tu-ra.com)
