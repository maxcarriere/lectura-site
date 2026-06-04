---
title: Graphemiseur (P2G)
layout: default
permalink: /solutions/modules/p2g/
---

<div class="module-header">
  <h1>Lectura Graphemiseur</h1>
  <p class="module-tagline">Modele unifie P2G + POS + Morphologie pour le francais (IPA → orthographe)</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-graphemiseur/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Graphemiseur" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-graphemiseur</code>
  </div>
</div>

## Presentation

Le pendant inverse du G2P : a partir d'une transcription phonetique IPA, le P2G reconstruit l'orthographe francaise. Un seul modele **BiLSTM char-level multi-tete V6 avec word feedback et phone_lex_features** (2.56M parametres, ONNX INT8 = 2.6 Mo).

| Tache | Description | Performance |
|-------|-------------|-------------|
| **P2G** | IPA vers orthographe (modele core) | ~88% word accuracy |
| **P2G** | Pipeline complet (+ formules + noms propres) | 90.95% word accuracy |
| **POS** | Etiquetage morpho-syntaxique (19 tags) | 98.3% accuracy |
| **Morphologie** | Genre, nombre, temps, mode, personne | 94.7-99.7% |

Quatre backends d'inference : **API** (zero config), **ONNX Runtime**, **NumPy**, ou **pur Python** (zero dependance).

### Architecture en deux couches

En miroir de l'architecture G2P (lectura-phonemiseur + lectura-g2p) :

| Couche | Package | Contenu |
|--------|---------|---------|
| **Couche 1** | `lectura-graphemiseur` | Modele P2G core + lex_select + coherence morpho + accents |
| **Couche 2** | `lectura-p2g` | Pipeline complet = graphemiseur + formules + noms propres + entites |

Le graphemiseur (couche 1) est **zero dependance** — pas d'import de `lectura_formules`. Le pipeline complet (couche 2) orchestre formules, fusion de composes, coherence morpho, noms propres et reconnaissance d'entites notables.

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

<div class="pyodide-demo" data-package="lectura-graphemiseur" data-numpy="0">
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
from lectura_graphemiseur import creer_engine

engine = creer_engine()   # mode API par defaut (zero config)

result = engine.analyser(["le", "ɑ̃fɑ̃", "sɔ̃", "aʁive", "a", "la", "mɛzɔ̃"])

print(result["ortho"])   # ['les', 'enfants', 'sont', 'arrives', 'a', 'la', 'maison']
print(result["pos"])     # ['ART:def', 'NOM', 'AUX', 'VER', 'PRE', 'ART:def', 'NOM']
```

---

## Architecture du modele (V6)

Le P2G utilise un mecanisme de **word feedback** : les representations de mots issues des tetes POS/Morpho sont diffusees aux positions caractere correspondantes avant la prediction P2G finale.

Modele core : raw (82.32%) → lex_select (87.33%) → coherence morpho + accents (~88%).
Pipeline complet (`lectura-p2g`) : + formules + composés + noms propres + entités (90.95%).

```
Phrase IPA → Char Embedding (64d) → Shared BiLSTM (2x160h → 320d)
                                          |
                  +-----------------------+--------------------+
                  v                                             v
        Word representations              Word repr (320d) + Phone Lex Features (28d)
        (fwd[last] || bwd[first])                          |
                                                 Word BiLSTM (192h → 384d)
                                                       |
                                            +--------------+--------------+
                                           POS        Morpho (x6)    Word Feedback
                                                                    → P2G Head (704d → 1198)
```

**Phone_lex_features (28d)** : le modele V6 recoit un vecteur de 28 dimensions par mot, construit a partir du `phone_lexicon.db` (lexique phonetique SQLite) : 19d POS one-hot + 3d morpho (genre, nombre) + 6d features lexicales. Le **lex_select** choisit parmi les candidats phonetiquement compatibles du lexique. Sans phone_lexicon, le modele fonctionne en mode degrade (features = zeros).

---

## Installation

```bash
# Modele core (zero dependance)
pip install lectura-graphemiseur             # mode API (zero config)
pip install lectura-graphemiseur[onnx]       # backend ONNX Runtime local (~2 ms/phrase)
pip install lectura-graphemiseur[numpy]      # backend NumPy local

# Pipeline complet (graphemiseur + formules + noms propres)
pip install lectura-p2g
```

Par defaut, le module utilise l'API Lectura (aucune configuration necessaire). Les backends locaux (ONNX, NumPy) necessitent les modeles pre-entraines, disponibles sous [licence commerciale](mailto:contact@lec-tu-ra.com).

---

## Caracteristiques techniques

- **2.56M parametres**, modele ONNX INT8 = 2.6 Mo
- **4 backends** : API (zero config), ONNX Runtime (~2 ms), NumPy (~50 ms), pur Python (~200 ms)
- **Word feedback** : les informations POS/morpho enrichissent la prediction P2G
- **Phone_lex_features (28d)** : features construites depuis `phone_lexicon.db` (lexique phonetique SQLite)
- **Lex_select** : selection lexicale parmi candidats phonetiques
- **Pipeline `lectura-p2g`** : formules (nombres, sigles — mode chiffres par defaut), fusion de mots composes, noms propres, et reconnaissance de ~9000 entites notables via couche 2
- **Zero dependance** : le graphemiseur core n'importe pas `lectura_formules`
- **Factory `creer_engine()`** : detection automatique du meilleur backend
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (non commerciale) — licence commerciale sur demande : [contact@lec-tu-ra.com](mailto:contact@lec-tu-ra.com)
