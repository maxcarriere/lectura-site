---
title: P2G — Phoneme vers Grapheme
layout: default
permalink: /solutions/modules/p2g/
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

Quatre backends d'inference : **API** (zero config), **ONNX Runtime**, **NumPy**, ou **pur Python** (zero dependance).

---

## Tester en ligne

*Le test en ligne utilise l'API Lectura — aucun telechargement de modele necessaire.*

<div class="ipa-keyboard">
  <span class="ipa-key" data-char="i" title="i">i <small>(i)</small></span>
  <span class="ipa-key" data-char="e" title="e ferme">e <small>(é)</small></span>
  <span class="ipa-key" data-char="ɛ" title="e ouvert">ɛ <small>(ai)</small></span>
  <span class="ipa-key" data-char="a" title="a">a <small>(a)</small></span>
  <span class="ipa-key" data-char="ɑ" title="a posterieur">ɑ <small>(a)</small></span>
  <span class="ipa-key" data-char="ɔ" title="o ouvert">ɔ <small>(o)</small></span>
  <span class="ipa-key" data-char="o" title="o ferme">o <small>(ô)</small></span>
  <span class="ipa-key" data-char="u" title="ou">u <small>(ou)</small></span>
  <span class="ipa-key" data-char="y" title="u">y <small>(u)</small></span>
  <span class="ipa-key" data-char="ø" title="eu ferme">ø <small>(oeu)</small></span>
  <span class="ipa-key" data-char="œ" title="eu ouvert">œ <small>(eu)</small></span>
  <span class="ipa-key" data-char="ə" title="e muet">ə <small>(e)</small></span>
  <span class="ipa-key" data-char="ɑ̃" title="an, en">ɑ̃ <small>(an)</small></span>
  <span class="ipa-key" data-char="ɛ̃" title="in, ain">ɛ̃ <small>(in)</small></span>
  <span class="ipa-key" data-char="ɔ̃" title="on">ɔ̃ <small>(on)</small></span>
  <span class="ipa-key" data-char="œ̃" title="un">œ̃ <small>(un)</small></span>
  <span class="ipa-key" data-char="j" title="yod">j <small>(y)</small></span>
  <span class="ipa-key" data-char="w" title="semi-voyelle ou">w <small>(w)</small></span>
  <span class="ipa-key" data-char="ɥ" title="semi-voyelle u">ɥ <small>(u)</small></span>
  <span class="ipa-key" data-char="p" title="p">p</span>
  <span class="ipa-key" data-char="b" title="b">b</span>
  <span class="ipa-key" data-char="t" title="t">t</span>
  <span class="ipa-key" data-char="d" title="d">d</span>
  <span class="ipa-key" data-char="k" title="k">k</span>
  <span class="ipa-key" data-char="ɡ" title="g dur">ɡ <small>(gu)</small></span>
  <span class="ipa-key" data-char="f" title="f">f</span>
  <span class="ipa-key" data-char="v" title="v">v</span>
  <span class="ipa-key" data-char="s" title="s">s</span>
  <span class="ipa-key" data-char="z" title="z">z</span>
  <span class="ipa-key" data-char="ʃ" title="ch">ʃ <small>(ch)</small></span>
  <span class="ipa-key" data-char="ʒ" title="j, ge">ʒ <small>(j)</small></span>
  <span class="ipa-key" data-char="m" title="m">m</span>
  <span class="ipa-key" data-char="n" title="n">n</span>
  <span class="ipa-key" data-char="ɲ" title="gn">ɲ <small>(gn)</small></span>
  <span class="ipa-key" data-char="ŋ" title="ng">ŋ <small>(ng)</small></span>
  <span class="ipa-key" data-char="l" title="l">l</span>
  <span class="ipa-key" data-char="ʁ" title="r">ʁ <small>(r)</small></span>
</div>

<div class="pyodide-demo" data-package="lectura-p2g" data-numpy="0">
  <script type="text/x-python" class="demo-setup">
from pyodide.http import pyfetch
import json

async def _p2g_api_call(ipa_words):
    resp = await pyfetch('https://api.lec-tu-ra.com/p2g/analyser',
        method='POST',
        headers={'Content-Type': 'application/json'},
        body=json.dumps({'ipa_words': ipa_words}))
    return await resp.json()
  </script>
  <script type="text/x-python" class="demo-run">
tokens = '{INPUT}'.split()
result = await _p2g_api_call(tokens)
lines = []
lines.append(f"{'IPA':<16}{'Orthographe':<20}{'POS'}")
lines.append('-' * 48)
for i, tok in enumerate(tokens):
    ortho = result['ortho'][i] if i < len(result['ortho']) else ''
    pos = result['pos'][i] if i < len(result['pos']) else ''
    lines.append(f"{tok:<16}{ortho:<20}{pos}")
'\n'.join(lines)
  </script>
  <input type="text" class="demo-input demo-input--ipa" value="le ɑ̃fɑ̃ sɔ̃ aʁive a la mɛzɔ̃" placeholder="Entrez des phonemes IPA separes par des espaces...">
  <button class="demo-btn" type="button">Tester</button>
  <pre class="demo-output">Cliquez sur le bouton pour lancer la demo.</pre>
</div>

---

## Exemple de code

```python
from lectura_p2g import creer_engine

engine = creer_engine()   # mode API par defaut (zero config)

result = engine.analyser(["le", "ɑ̃fɑ̃", "sɔ̃", "aʁive", "a", "la", "mɛzɔ̃"])

print(result["ortho"])   # ['les', 'enfants', 'sont', 'arrives', 'a', 'la', 'maison']
print(result["pos"])     # ['ART:def', 'NOM', 'AUX', 'VER', 'PRE', 'ART:def', 'NOM']
```

---

## Architecture du modele (v3)

Le P2G utilise un mecanisme de **word feedback** : les representations de mots issues des tetes POS/Morpho sont diffusees aux positions caractere correspondantes avant la prediction P2G finale.

```
Phrase IPA → Char Embedding (64d) → Shared BiLSTM (2x160h → 320d)
                                          |
                  +-----------------------+--------------------+
                  v                                             v
        Word representations              Word repr (320d) + Lex Features (24d)
        (fwd[last] || bwd[first])                          |
                                                 Word BiLSTM (192h → 384d)
                                                       |
                                            +--------------+--------------+
                                           POS        Morpho (x6)    Word Feedback
                                                                    → P2G Head (704d → 1198)
```

**Features lexicales (optionnel)** : si un fichier `lexique_pos_candidates.json` est present dans le dossier modeles, le modele recoit un vecteur de 24 dimensions par mot (candidats POS du lexique). Cela ameliore la prediction POS et la morphologie, ce qui ameliore aussi la reconstruction orthographique via le word feedback. Sans lexique, le modele fonctionne normalement. Ce fichier est inclus avec les modeles (licence commerciale).

---

## Installation

```bash
pip install lectura-p2g             # mode API (zero config, zero dependance)
pip install lectura-p2g[onnx]       # backend ONNX Runtime local (~2 ms/phrase)
pip install lectura-p2g[numpy]      # backend NumPy local
```

---

## Caracteristiques techniques

- **2.56M parametres**, modele ONNX INT8 = 2.6 Mo
- **4 backends** : API (zero config), ONNX Runtime (~2 ms), NumPy (~50 ms), pur Python (~200 ms)
- **Word feedback** : les informations POS/morpho enrichissent la prediction P2G
- **Factory `creer_engine()`** : detection automatique du meilleur backend
- **Features lexicales** (optionnel) : candidats POS pour ameliorer POS/morpho (inclus avec les modeles)
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (non commerciale) — licence commerciale sur demande : [contact@lec-tu-ra.com](mailto:contact@lec-tu-ra.com)
