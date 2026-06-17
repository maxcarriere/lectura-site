---
title: Phonemiseur (G2P)
layout: default
permalink: /developpement/modules/metiers/g2p/
redirect_from:
  - /solutions/modules/g2p/
---

<div class="module-header">
  <h1>Lectura Phonemiseur</h1>
  <p class="module-tagline">Modèle unifié G2P + POS + Morphologie + Liaison pour le français</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-phonemiseur/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Phonemiseur" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-phonemiseur</code>
  </div>
</div>

## Présentation

Un seul modèle **BiLSTM char-level multi-tête** (1.75M paramètres, ONNX INT8 = 1.8 Mo) qui prédit simultanément 4 tâches à partir du texte français :

| Tâche | Description | Performance (par mot) |
|-------|-------------|-------------|
| **G2P** | Transcription phonémique IPA | 98.5% accuracy |
| **POS** | Étiquetage morpho-syntaxique (19 tags) | 98.2% accuracy |
| **Morphologie** | Genre, nombre, temps, mode, personne | 95-99% accuracy |
| **Liaison** | Liaisons obligatoires/facultatives | F1 90.6% |
| **Groupes de lecture** | Regroupement des mots liés par élision, liaison ou enchaînement | — |

*Performances mesurées sur un corpus de test de phrases françaises complètes (mots en contexte).*

Le module inclut également la **construction des groupes de lecture** (`construire_groupes_lecture`) : à partir des informations de liaison, il regroupe les mots connectés par élision (l'enfant), liaison (les‿enfants) ou enchaînement (avec‿elle). Ces groupes sont ensuite transmis à l'[Aligneur-Syllabeur]({{ '/developpement/modules/outils/aligneur/' | relative_url }}) pour la syllabation.

Quatre backends d'inférence : **API** (zero config), **ONNX Runtime** (~2 ms/phrase), **NumPy** (~50 ms), ou **pur Python** (~200 ms, zéro dépendance).

### G2P vs eSpeak-NG

Le Phonémiseur Lectura se distingue d'eSpeak-NG par sa prise en compte du **contexte phrastique** : il prédit la prononciation, la catégorie grammaticale, la morphologie et les liaisons en une seule passe. eSpeak-NG phonémise chaque mot isolément, sans désambiguïsation contextuelle (homographes, liaisons).

---

## Tester en ligne

*Le test en ligne utilise l'API Lectura — aucun téléchargement de modèle nécessaire.*

<div class="pyodide-demo" data-package="lectura-phonemiseur" data-numpy="0">
  <script type="text/x-python" class="demo-setup">
from pyodide.http import pyfetch
import json

async def _g2p_api_call(tokens):
    resp = await pyfetch('https://api.lectura.world/g2p/analyser',
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
  <input type="text" class="demo-input" value="Les enfants sont arrivés à la maison." placeholder="Entrez une phrase française...">
  <button class="demo-btn" type="button">Tester</button>
  <pre class="demo-output">Cliquez sur le bouton pour lancer la démo.</pre>
</div>

---

## Exemple de code

```python
from lectura_phonemiseur import creer_engine

engine = creer_engine()   # mode API par défaut (zero config)

result = engine.analyser(["Les", "enfants", "sont", "arrivés", "à", "la", "maison"])

print(result["g2p"])      # ['le', 'ɑ̃fɑ̃', 'sɔ̃', 'aʁive', 'a', 'la', 'mɛzɔ̃']
print(result["pos"])      # ['ART:def', 'NOM', 'AUX', 'VER:pper', 'PRE', 'ART:def', 'NOM']
print(result["liaison"])  # ['Lz', 'none', 'Lt', 'none', 'none', 'none', 'none']
```

---

## Architecture du modèle

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

**Features lexicales (optionnel)** : si `lectura-lexique` est installé, le modèle reçoit un vecteur de 24 dimensions par mot (candidats POS du lexique). Cela améliore la prédiction POS, la morphologie et les liaisons. Sans lexique, le modèle fonctionne normalement.

---

## Installation

```bash
pip install lectura-phonemiseur             # mode API (zero config, zéro dépendance)
pip install lectura-phonemiseur[onnx]       # backend ONNX Runtime local (~2 ms/phrase)
pip install lectura-phonemiseur[numpy]      # backend NumPy local
```

Par défaut, le module utilise l'API Lectura (aucune configuration nécessaire). Les backends locaux (ONNX, NumPy) nécessitent les modèles pré-entraînés, disponibles sous [licence commerciale](mailto:admin@lectura.world).

---

## Caractéristiques techniques

- **1.75M paramètres**, modèle ONNX INT8 = 1.8 Mo
- **4 backends** : API (zero config), ONNX Runtime (~2 ms), NumPy (~50 ms), pur Python (~200 ms)
- **Factory `creer_engine()`** : détection automatique du meilleur backend
- **Séparateurs mots composés** : `sep_hyphen=True`, `sep_apos=True` pour conserver les tirets et apostrophes dans l'IPA (`aba-ʒuʁ`, `d'abɔʁ`)
- **30 000 corrections lexicales** intégrées (table plate + homographes POS-aware)
- **Features lexicales** (optionnel) : candidats POS via `lectura-lexique` pour améliorer POS/morpho/liaison
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (non commerciale) — licence commerciale sur demande : [admin@lectura.world](mailto:admin@lectura.world)
