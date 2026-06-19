---
title: Phonemiseur
layout: default
permalink: /developpement/modules/outils/phonemiseur/
---

<div class="module-header">
  <h1>Lectura Phonemiseur</h1>
  <p class="module-tagline">Modèle BiLSTM char-level multi-tête — G2P + POS + Morphologie + Liaison</p>
  <div class="module-links">
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Phonemiseur" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-phonemiseur</code>
  </div>
</div>

## Présentation

Brique atomique de phonémisation : un seul modèle **BiLSTM char-level multi-tête** (1.75M paramètres, ONNX INT8 = 1.8 Mo) qui prédit simultanément 4 tâches à partir de tokens français :

| Tâche | Description | Performance (par mot) |
|-------|-------------|-------------|
| **G2P** | Transcription phonémique IPA | 98.5% accuracy |
| **POS** | Étiquetage morpho-syntaxique (19 tags) | 98.2% accuracy |
| **Morphologie** | Genre, nombre, temps, mode, personne | 95-99% accuracy |
| **Liaison** | Liaisons obligatoires/facultatives | F1 90.6% |

*Performances mesurées sur un corpus de test de phrases françaises complètes (mots en contexte).*

Quatre backends d'inférence : **API** (zero config), **ONNX Runtime** (~2 ms/phrase), **NumPy** (~50 ms), ou **pur Python** (~200 ms, zéro dépendance).

> **Brique vs Pipeline** : Le Phonémiseur est le modèle brut (tokens → prédictions). Pour le pipeline complet G2P (texte → phonèmes avec tokenisation, formules, groupes de lecture et syllabation), voir [lectura-g2p]({{ '/developpement/modules/metiers/g2p/' | relative_url }}).

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
