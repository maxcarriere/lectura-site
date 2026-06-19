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

## Tester en ligne

*Le test en ligne utilise l'API Lectura — aucun téléchargement de modèle nécessaire.*

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
    resp = await pyfetch('https://api.lectura.world/p2g/analyser',
        method='POST',
        headers={'Content-Type': 'application/json'},
        body=json.dumps({'ipa_words': ipa_words}))
    return await resp.json()
  </script>
  <script type="text/x-python" class="demo-run">
tokens = '{INPUT}'.split()
result = await _p2g_api_call(tokens)
lines = []
lines.append(f"{'IPA':<16}{'Orthographe':<16}{'POS':<12}{'Morphologie'}")
lines.append('─' * 60)
morpho = result.get('morpho', {})
traits = ['Number', 'Gender', 'VerbForm', 'Mood', 'Tense', 'Person']
pad = ' ' * 44
for i, tok in enumerate(tokens):
    ortho = result['ortho'][i] if i < len(result['ortho']) else ''
    pos = result['pos'][i] if i < len(result['pos']) else ''
    m = []
    for t in traits:
        v = morpho.get(t, ['_'] * len(tokens))
        val = v[i] if i < len(v) else '_'
        if val != '_':
            m.append(f"{t}={val}")
    if m:
        lines.append(f"{tok:<16}{ortho:<16}{pos:<12}{m[0]}")
        for feat in m[1:]:
            lines.append(f"{pad}{feat}")
    else:
        lines.append(f"{tok:<16}{ortho:<16}{pos:<12}")
'\n'.join(lines)
  </script>
  <input type="text" class="demo-input demo-input--ipa" value="le ɑ̃fɑ̃ sɔ̃ aʁive a la mɛzɔ̃" placeholder="Entrez des phonèmes IPA séparés par des espaces...">
  <button class="demo-btn" type="button">Tester</button>
  <pre class="demo-output">Cliquez sur le bouton pour lancer la démo.</pre>
</div>

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
```

Par défaut, le module utilise l'API Lectura (aucune configuration nécessaire). Les backends locaux (ONNX, NumPy) nécessitent les modèles pré-entraînés, disponibles sous [licence commerciale](mailto:admin@lectura.world).

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
- **Licence** : AGPL-3.0 (non commerciale) — licence commerciale sur demande : [admin@lectura.world](mailto:admin@lectura.world)
