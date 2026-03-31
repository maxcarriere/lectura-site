---
title: Syllabeur
layout: default
permalink: /solutions/outils/modules/syllabeur/
---

<div class="module-header">
  <h1>Lectura Syllabeur</h1>
  <p class="module-tagline">Analyseur syllabique complet du francais</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-syllabeur/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Syllabeur" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-syllabeur</code>
  </div>
</div>

## Presentation

Module autonome, **zero dependance** Python. Decoupe les mots francais en syllabes selon les regles phonologiques, identifie les groupes de lecture, et gere les phenomenes de chaine parlee : elisions, liaisons et enchainements.

**Phonemiseur pluggable** : utilisable avec votre propre phonemiseur, eSpeak-NG, ou le module Lectura G2P. N'importe quel objet avec une methode `phonemize(word)` ou `predict(word)` est accepte.

---

## Fonctionnalites

| Fonction | Description |
|----------|-------------|
| **Syllabation** | Decoupage en syllabes selon les regles phonologiques du francais |
| **Groupes de lecture** | Regroupement des syllabes pour la lecture assistee |
| **Liaisons** | Elisions, liaisons obligatoires/facultatives, enchainements |
| **Phonemiseur pluggable** | eSpeak-NG, Lectura G2P, ou tout objet compatible |
| **Formules** | Gestion des spans de formules (nombres lus, dates, etc.) |
| **API IPA directe** | `syllabify_ipa(phone)` pour travailler sans phonemiseur |

---

## Tester en ligne

*Le test en ligne utilise Lectura G2P comme phonemiseur et necessite le telechargement des poids du modele (~18 Mo). En local, `pip install lectura-syllabeur` + eSpeak-NG fonctionne sans telechargement supplementaire.*

<div class="pyodide-demo" data-package="lectura-g2p,lectura-syllabeur" data-numpy="1">
  <script type="text/x-python" class="demo-setup">
from pyodide.http import pyfetch
from pathlib import Path

response = await pyfetch('https://raw.githubusercontent.com/maxcarriere/lectura-modules/main/G2P/modeles_numpy/unifie_weights.json')
weights_text = await response.string()
Path('/tmp/unifie_weights.json').write_text(weights_text)

from lectura_nlp import get_model_path
from lectura_nlp.inference_numpy import NumpyInferenceEngine
from lectura_nlp.tokeniseur import tokeniser as _syl_tokeniser
from lectura_syllabeur import LecturaSyllabeur

_syl_g2p_engine = NumpyInferenceEngine('/tmp/unifie_weights.json', str(get_model_path('unifie_vocab.json')))

class _G2PPhonemizer:
    def predict(self, word):
        result = _syl_g2p_engine.analyser([word])
        return result['g2p'][0] if result.get('g2p') else ''

global _syllabeur
_syllabeur = LecturaSyllabeur(phonemizer=_G2PPhonemizer())
  </script>
  <script type="text/x-python" class="demo-run">
results = _syllabeur.analyze_text('{INPUT}')
lines = []
lines.append(f"{'Mot':<18}{'Phonetique':<16}{'Syllabes'}")
lines.append('-' * 50)
for r in results:
    syl_str = '.'.join(r.syllabes) if r.syllabes else r.phone
    lines.append(f"{r.mot:<18}{r.phone:<16}{syl_str}")
'\n'.join(lines)
  </script>
  <input type="text" class="demo-input" value="Les enfants jouent dans la cour." placeholder="Entrez une phrase francaise...">
  <button class="demo-btn" type="button">Charger et tester (~18 Mo)</button>
  <pre class="demo-output">Cliquez sur le bouton pour charger le modele G2P et lancer la demo.</pre>
</div>

---

## Exemples de code

### Avec eSpeak-NG (par defaut)

```python
from lectura_syllabeur import LecturaSyllabeur

syllabeur = LecturaSyllabeur()  # utilise eSpeak-NG
resultat = syllabeur.analyze_text("Les enfants jouent dans la cour.")

for r in resultat:
    print(f"{r.mot:15s}  {'.'.join(r.syllabes)}")
```

### Avec Lectura G2P comme phonemiseur

```python
from lectura_syllabeur import LecturaSyllabeur
from lectura_nlp.inference_onnx import OnnxInferenceEngine
from lectura_nlp import get_model_path

# Creer le moteur G2P
g2p = OnnxInferenceEngine(get_model_path("unifie_int8.onnx"),
                           get_model_path("unifie_vocab.json"))

# Wrapper avec methode .predict()
class G2PPhonemizer:
    def predict(self, word):
        result = g2p.analyser([word])
        return result['g2p'][0] if result.get('g2p') else ''

syllabeur = LecturaSyllabeur(phonemizer=G2PPhonemizer())
resultat = syllabeur.analyze_text("Le chocolat est delicieux.")
```

### API IPA directe (sans phonemiseur)

```python
from lectura_syllabeur import LecturaSyllabeur

syllabeur = LecturaSyllabeur()
syllabes = syllabeur.syllabify_ipa("ʃɔkɔla")
print(syllabes)  # ['ʃɔ', 'kɔ', 'la']
```

---

## Installation

```bash
pip install lectura-syllabeur
```

---

## Caracteristiques techniques

- **Zero dependance** Python
- **Phonemiseur pluggable** : eSpeak-NG, Lectura G2P, ou tout objet avec `.phonemize()` / `.predict()`
- **API IPA directe** : `syllabify_ipa()` pour un decoupage sans phonemiseur
- **Python 3.10+** avec type hints complets (PEP-561)
- **Double licence** : AGPL-3.0 (libre) / Licence commerciale
