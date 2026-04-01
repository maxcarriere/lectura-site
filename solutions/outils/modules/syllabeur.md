---
title: Aligneur-Syllabeur
layout: default
permalink: /solutions/outils/modules/syllabeur/
---

<div class="module-header">
  <h1>Lectura Aligneur-Syllabeur</h1>
  <p class="module-tagline">Aligneur grapheme-phoneme et syllabeur phonologique du francais</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-aligneur/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Aligneur" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-aligneur</code>
  </div>
</div>

## Presentation

**Pivot central du pipeline Lectura.** Module autonome, **zero dependance** Python. Realise l'alignement lettre-par-lettre entre orthographe et phonetique, construit les groupes de lecture en gerant les phenomenes de chaine parlee, et decompose chaque syllabe en ses constituants phonologiques.

C'est grace a cet aligneur que les corpus d'entrainement des modeles [G2P]({{ '/solutions/outils/modules/g2p/' | relative_url }}) et [P2G]({{ '/solutions/outils/modules/p2g/' | relative_url }}) ont ete prepares. Sans lui, rien n'aurait ete possible.

---

## Ce que fait ce module

| # | Fonction | Description |
|---|----------|-------------|
| 1 | **Groupes de lecture** | Regroupe les mots lies par elision, liaison ou enchainement |
| 2 | **Alignement grapheme-phoneme** | Correspondance lettre-par-lettre entre orthographe et IPA |
| 3 | **Lettres muettes et fusionnees** | Detecte les lettres silencieuses et les graphemes multi-phonemes (x→ks) |
| 4 | **Syllabation ortho + phone** | Decoupe chaque groupe en syllabes au niveau phonetique ET orthographique |
| 5 | **Attaque / Noyau / Coda** | Decompose chaque syllabe en ses constituants avec phonemes distribues |
| 6 | **Spans** | Positions caractere de chaque syllabe, groupe et composant dans le texte source |

---

## Tester en ligne

*Le test en ligne utilise Lectura G2P comme phonemiseur et necessite le telechargement des poids du modele (~18 Mo). En local, `pip install lectura-aligneur` + eSpeak-NG fonctionne sans telechargement supplementaire.*

<div class="pyodide-demo" data-package="lectura-g2p,lectura-aligneur" data-numpy="1">
  <script type="text/x-python" class="demo-setup">
from pyodide.http import pyfetch
from pathlib import Path

response = await pyfetch('https://raw.githubusercontent.com/maxcarriere/lectura-modules/main/G2P/modeles_numpy/unifie_weights.json')
weights_text = await response.string()
Path('/tmp/unifie_weights.json').write_text(weights_text)

from lectura_nlp import get_model_path
from lectura_nlp.inference_numpy import NumpyInferenceEngine
from lectura_nlp.tokeniseur import tokeniser as _syl_tokeniser
from lectura_aligneur import LecturaSyllabeur, MotAnalyse

_syl_g2p_engine = NumpyInferenceEngine('/tmp/unifie_weights.json', str(get_model_path('unifie_vocab.json')))

class _G2PPhonemizer:
    def predict(self, word):
        result = _syl_g2p_engine.analyser([word])
        return result['g2p'][0] if result.get('g2p') else ''

global _syllabeur
_syllabeur = LecturaSyllabeur(phonemizer=_G2PPhonemizer())
global _g2p_engine_syl
_g2p_engine_syl = _syl_g2p_engine
global _tokeniser_syl
_tokeniser_syl = _syl_tokeniser
  </script>
  <script type="text/x-python" class="demo-run">
text = '{INPUT}'
tokens = _tokeniser_syl(text)
g2p_result = _g2p_engine_syl.analyser(tokens)

mots = []
for i, tok in enumerate(tokens):
    phone = g2p_result['g2p'][i] if i < len(g2p_result.get('g2p', [])) else ''
    liaison = g2p_result['liaison'][i] if i < len(g2p_result.get('liaison', [])) else 'none'
    mots.append(MotAnalyse(phone=phone, liaison=liaison))

result = _syllabeur.analyser_complet(mots)

lines = []
lines.append(f'Groupes de lecture : {result.nb_groupes}   Syllabes : {result.nb_syllabes}')
lines.append(f'Lecture :  {result.format_ligne1()}')
lines.append(f'Syllabes : {result.format_ligne2()}')
lines.append('')

for gi, rg in enumerate(result.groupes, 1):
    g = rg.groupe
    jonc = ', '.join(g.jonctions) if g.jonctions else '-'
    mots_txt = ' + '.join(m.text if hasattr(m, 'text') and m.text else '?' for m in g.mots)
    lines.append(f'G{gi}: [{mots_txt}]  /{g.phone_groupe}/  jonctions: {jonc}')
    for si, s in enumerate(rg.syllabes, 1):
        att_parts = []
        for p in s.attaque.phonemes:
            att_parts.append(f'{p.ipa}={p.grapheme}' if p.grapheme else p.ipa)
        noy_parts = []
        for p in s.noyau.phonemes:
            noy_parts.append(f'{p.ipa}={p.grapheme}' if p.grapheme else p.ipa)
        cod_parts = []
        for p in s.coda.phonemes:
            cod_parts.append(f'{p.ipa}={p.grapheme}' if p.grapheme else p.ipa)
        att = ','.join(att_parts) if att_parts else '-'
        noy = ','.join(noy_parts) if noy_parts else '-'
        cod = ','.join(cod_parts) if cod_parts else '-'
        lines.append(f'  σ{si} /{s.phone}/ <<{s.ortho}>>  att=[{att}] noy=[{noy}] cod=[{cod}]')
    lines.append('')

'\n'.join(lines)
  </script>
  <input type="text" class="demo-input" value="Les enfants sont arrives a la maison." placeholder="Entrez une phrase francaise...">
  <button class="demo-btn" type="button">Charger et tester (~18 Mo)</button>
  <pre class="demo-output">Cliquez sur le bouton pour charger le modele G2P et lancer la demo.</pre>
</div>

---

## Exemples de code

### Analyse d'un mot (API simple)

```python
from lectura_aligneur import LecturaSyllabeur

syllabeur = LecturaSyllabeur()    # eSpeak-NG par defaut
result = syllabeur.analyze("chocolat")

print(result.format_detail())
# chocolat -> /ʃɔkɔla/
#   σ1: /ʃɔ/ <<cho>> [0:3] att=ʃ noy=ɔ cod=-
#   σ2: /kɔ/ <<co>>  [3:5] att=k noy=ɔ cod=-
#   σ3: /la/ <<lat>>  [5:8] att=l noy=a cod=-

# Chaque syllabe expose son alignement grapheme-phoneme :
for s in result.syllabes:
    att = " ".join(f"{p.ipa}→{p.grapheme}" for p in s.attaque.phonemes)
    noy = " ".join(f"{p.ipa}→{p.grapheme}" for p in s.noyau.phonemes)
    print(f"  {s.ortho:6s} /{s.phone}/  att=[{att}] noy=[{noy}]  span={s.span}")
```

### Analyse complete avec groupes de lecture

```python
from lectura_aligneur import LecturaSyllabeur, MotAnalyse

syllabeur = LecturaSyllabeur()

# Mots annotes par le G2P (phone + liaison)
mots = [
    MotAnalyse(phone="lez", liaison="Lz"),    # les (liaison en z)
    MotAnalyse(phone="ɑ̃fɑ̃", liaison="none"),   # enfants
    MotAnalyse(phone="ʒu",  liaison="none"),    # jouent
]

result = syllabeur.analyser_complet(mots)

print(f"{result.nb_groupes} groupes, {result.nb_syllabes} syllabes")
print(f"Groupes : {result.format_ligne1()}")
print(f"Syllabes : {result.format_ligne2()}")
# 2 groupes, 4 syllabes
# Groupes : les enfants | jouent
# Syllabes : le.zɑ̃.fɑ̃ | ʒu
```

### Avec Lectura G2P comme phonemiseur

```python
from lectura_aligneur import LecturaSyllabeur
from lectura_nlp.inference_onnx import OnnxInferenceEngine
from lectura_nlp import get_model_path

g2p = OnnxInferenceEngine(get_model_path("unifie_int8.onnx"),
                           get_model_path("unifie_vocab.json"))

class G2PPhonemizer:
    def predict(self, word):
        return g2p.analyser([word])['g2p'][0]

syllabeur = LecturaSyllabeur(phonemizer=G2PPhonemizer())
```

---

## Architecture E1 / E2

Le module fonctionne en deux etapes, utilisables separement ou ensemble :

**E1 — Groupes de lecture** (`construire_groupes`)

Parcourt les mots annotes et les regroupe selon les phenomenes de chaine parlee :
- **Elision** : l'enfant → 1 groupe
- **Liaison** : les‿enfants → 1 groupe (consonne de liaison z, t, n, r, p)
- **Enchainement** : avec‿elle → 1 groupe (consonne finale resyllabee)

**E2 — Syllabation** (`syllabifier_groupes`)

Pour chaque groupe :
1. Syllabation IPA par modele de sonorite (5 classes : obstruantes, nasales, liquides, semi-voyelles, voyelles)
2. Alignement DFS grapheme-phoneme avec detection des lettres muettes et fusionnees
3. Construction des syllabes avec decomposition attaque/noyau/coda et correspondance grapheme

---

## Structures de donnees

| Classe | Champs principaux | Role |
|--------|-------------------|------|
| `Syllabe` | `phone`, `ortho`, `span`, `attaque`, `noyau`, `coda` | Syllabe decomposee avec alignement |
| `GroupePhonologique` | `phonemes[]` → `.phone`, `.grapheme` | Attaque, noyau ou coda d'une syllabe |
| `Phoneme` | `ipa`, `grapheme` | Phoneme individuel avec correspondance grapheme |
| `ResultatAnalyse` | `mot`, `phone`, `syllabes[]` | Analyse d'un mot |
| `MotAnalyse` | `token`, `phone`, `liaison`, `pos` | Mot annote par le G2P |
| `GroupeLecture` | `mots[]`, `phone_groupe`, `jonctions[]`, `span` | Groupe de lecture |
| `ResultatGroupe` | `groupe`, `syllabes[]` | Groupe syllabe |
| `ResultatSyllabation` | `groupes[]`, `nb_syllabes`, `nb_groupes` | Resultat complet |

---

## Role dans le pipeline Lectura

L'Aligneur-Syllabeur est le **pivot central** de Lectura :

1. **Preparation des corpus** — l'alignement grapheme-phoneme a permis de constituer les donnees d'entrainement des modeles G2P et P2G
2. **Lecture assistee** — les groupes de lecture avec syllabes colorees sont la base de l'interface de lecture augmentee
3. **Synthese vocale** — l'alignement et les spans permettent la synchronisation texte-audio

---

## Installation

```bash
pip install lectura-aligneur
```

**Phonemiseur pluggable** : utilisable avec votre propre phonemiseur, [eSpeak-NG](https://github.com/espeak-ng/espeak-ng), ou le module [Lectura G2P]({{ '/solutions/outils/modules/g2p/' | relative_url }}). N'importe quel objet avec une methode `phonemize(word)` ou `predict(word)` est accepte.

---

## Caracteristiques techniques

- **Zero dependance** Python
- **Alignement DFS** grapheme-phoneme avec gestion des lettres muettes et fusionnees
- **Modele de sonorite** pour la syllabation (5 classes phonologiques)
- **Architecture E1/E2** : construction des groupes puis syllabation, utilisables separement
- **Phonemiseur pluggable** : eSpeak-NG, Lectura G2P, ou tout objet compatible
- **Python 3.10+** avec type hints complets (PEP-561)
- **Double licence** : AGPL-3.0 (libre) / Licence commerciale
