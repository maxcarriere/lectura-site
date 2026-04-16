---
title: Aligneur-Syllabeur
layout: default
permalink: /solutions/modules/syllabeur/
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

C'est grace a cet aligneur que les corpus d'entrainement des modeles [G2P]({{ '/solutions/modules/g2p/' | relative_url }}) et [P2G]({{ '/solutions/modules/p2g/' | relative_url }}) ont ete prepares. Sans lui, rien n'aurait ete possible.

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

*Le test en ligne utilise l'API Lectura (G2P + Aligneur) — aucun telechargement necessaire.*

<div class="pyodide-demo" data-package="lectura-aligneur" data-numpy="0">
  <script type="text/x-python" class="demo-setup">
from pyodide.http import pyfetch
import json

async def _aligneur_api_call(word, phone=None):
    resp = await pyfetch('https://api.lec-tu-ra.com/aligneur/analyze',
        method='POST',
        headers={'Content-Type': 'application/json'},
        body=json.dumps({'word': word, 'phone': phone}))
    return await resp.json()

async def _g2p_api_call(tokens):
    resp = await pyfetch('https://api.lec-tu-ra.com/g2p/analyser',
        method='POST',
        headers={'Content-Type': 'application/json'},
        body=json.dumps({'tokens': tokens}))
    return await resp.json()
  </script>
  <script type="text/x-python" class="demo-run">
import re
text = '{INPUT}'
tokens = text.split()
tokens = [t for t in tokens if t]

# G2P
g2p = await _g2p_api_call(tokens)

lines = []
_punct_re = re.compile(r'^[,;:!?.\u2026\u00ab\u00bb"()\[\]{}\u2013\u2014/]+$')

for i, tok in enumerate(tokens):
    if _punct_re.match(tok):
        continue
    phone = g2p['g2p'][i] if i < len(g2p['g2p']) else ''
    if not phone:
        continue
    # Aligneur
    res = await _aligneur_api_call(tok, phone)
    lines.append(f"{tok} -> /{phone}/")
    for si, s in enumerate(res.get('syllabes', []), 1):
        att_parts = []
        for p in s.get('attaque', {}).get('phonemes', []):
            att_parts.append(f"{p['ipa']}={p['grapheme']}" if p.get('grapheme') else p['ipa'])
        noy_parts = []
        for p in s.get('noyau', {}).get('phonemes', []):
            noy_parts.append(f"{p['ipa']}={p['grapheme']}" if p.get('grapheme') else p['ipa'])
        cod_parts = []
        for p in s.get('coda', {}).get('phonemes', []):
            cod_parts.append(f"{p['ipa']}={p['grapheme']}" if p.get('grapheme') else p['ipa'])
        att = ','.join(att_parts) if att_parts else '-'
        noy = ','.join(noy_parts) if noy_parts else '-'
        cod = ','.join(cod_parts) if cod_parts else '-'
        span = s.get('span', [0,0])
        lines.append(f"  \u03c3{si} /{s['phone']}/ <<{s['ortho']}>> [{span[0]}:{span[1]}]  att=[{att}] noy=[{noy}] cod=[{cod}]")
    lines.append('')

'\n'.join(lines)
  </script>
  <input type="text" class="demo-input" value="Les enfants sont arrivés à la maison" placeholder="Entrez une phrase francaise...">
  <button class="demo-btn" type="button">Tester</button>
  <pre class="demo-output">Cliquez sur le bouton pour lancer la demo.</pre>
</div>

---

## Exemples de code

### Analyse d'un mot (API simple)

```python
from lectura_aligneur import LecturaSyllabeur

syllabeur = LecturaSyllabeur()    # mode API par defaut
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
from lectura_nlp import creer_engine

g2p = creer_engine()    # mode API par defaut

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
pip install lectura-aligneur       # mode API par defaut (zero dependance)
```

**Phonemiseur pluggable** : utilisable avec votre propre phonemiseur, [eSpeak-NG](https://github.com/espeak-ng/espeak-ng), ou le module [Lectura G2P]({{ '/solutions/modules/g2p/' | relative_url }}). N'importe quel objet avec une methode `phonemize(word)` ou `predict(word)` est accepte.

---

## Caracteristiques techniques

- **Zero dependance** Python
- **Bi-modal** : mode API (zero config) ou mode local avec donnees embarquees
- **Alignement DFS** grapheme-phoneme avec gestion des lettres muettes et fusionnees
- **Modele de sonorite** pour la syllabation (5 classes phonologiques)
- **Architecture E1/E2** : construction des groupes puis syllabation, utilisables separement
- **Phonemiseur pluggable** : eSpeak-NG, Lectura G2P, ou tout objet compatible
- **Python 3.10+** avec type hints complets (PEP-561)
- **Double licence** : AGPL-3.0 (libre) / Licence commerciale
