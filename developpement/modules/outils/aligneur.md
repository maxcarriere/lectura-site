---
title: Aligneur-Syllabeur
layout: default
permalink: /developpement/modules/outils/aligneur/
redirect_from:
  - /solutions/modules/syllabeur/
---

<div class="module-header">
  <h1>Lectura Aligneur-Syllabeur</h1>
  <p class="module-tagline">Aligneur graphème-phonème et syllabeur phonologique du français</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-aligneur/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Aligneur" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-aligneur</code>
  </div>
</div>

## Présentation

**Pivot central du pipeline Lectura.** Module autonome, **zéro dépendance** Python. Réalise l'alignement lettre-par-lettre entre orthographe et phonétique et décompose chaque syllabe en ses constituants phonologiques. Les groupes de lecture (élision, liaison, enchaînement) sont construits en amont par le [Phonémiseur]({{ '/developpement/modules/metiers/g2p/' | relative_url }}) ; l'Aligneur les reçoit en entrée pour la syllabation.

C'est grâce à cet aligneur que les corpus d'entraînement des modèles [G2P]({{ '/developpement/modules/metiers/g2p/' | relative_url }}) et [P2G]({{ '/developpement/modules/metiers/p2g/' | relative_url }}) ont été préparés. Sans lui, rien n'aurait été possible.

---

## Ce que fait ce module

| # | Fonction | Description |
|---|----------|-------------|
| 1 | **Alignement graphème-phonème** | Correspondance lettre-par-lettre entre orthographe et IPA |
| 2 | **Lettres muettes et fusionnées** | Détecte les lettres silencieuses et les graphèmes multi-phonèmes (x→ks) |
| 3 | **Syllabation ortho + phone** | Découpe chaque groupe en syllabes au niveau phonétique ET orthographique |
| 4 | **Attaque / Noyau / Coda** | Décompose chaque syllabe en ses constituants avec phonèmes distribués |
| 5 | **Spans** | Positions caractère de chaque syllabe, groupe et composant dans le texte source |

---

## Tester en ligne

*Le test en ligne utilise l'API Lectura (G2P + Aligneur) — aucun téléchargement nécessaire.*

<div class="pyodide-demo" data-package="lectura-aligneur" data-numpy="0">
  <script type="text/x-python" class="demo-setup">
from pyodide.http import pyfetch
import json

async def _aligneur_api_call(word, phone=None):
    resp = await pyfetch('https://api.lectura.world/aligneur/analyze',
        method='POST',
        headers={'Content-Type': 'application/json'},
        body=json.dumps({'word': word, 'phone': phone}))
    return await resp.json()

async def _g2p_api_call(tokens):
    resp = await pyfetch('https://api.lectura.world/g2p/analyser',
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
  <input type="text" class="demo-input" value="Les enfants sont arrivés à la maison" placeholder="Entrez une phrase française...">
  <button class="demo-btn" type="button">Tester</button>
  <pre class="demo-output">Cliquez sur le bouton pour lancer la démo.</pre>
</div>

---

## Exemples de code

### Analyse d'un mot (API simple)

```python
from lectura_aligneur import LecturaSyllabeur

syllabeur = LecturaSyllabeur()    # mode API par défaut
result = syllabeur.analyze("chocolat")

print(result.format_detail())
# chocolat -> /ʃɔkɔla/
#   σ1: /ʃɔ/ <<cho>> [0:3] att=ʃ noy=ɔ cod=-
#   σ2: /kɔ/ <<co>>  [3:5] att=k noy=ɔ cod=-
#   σ3: /la/ <<lat>>  [5:8] att=l noy=a cod=-

# Chaque syllabe expose son alignement graphème-phonème :
for s in result.syllabes:
    att = " ".join(f"{p.ipa}→{p.grapheme}" for p in s.attaque.phonemes)
    noy = " ".join(f"{p.ipa}→{p.grapheme}" for p in s.noyau.phonemes)
    print(f"  {s.ortho:6s} /{s.phone}/  att=[{att}] noy=[{noy}]  span={s.span}")
```

### Analyse complète avec groupes de lecture

```python
from lectura_aligneur import LecturaSyllabeur, MotAnalyse

syllabeur = LecturaSyllabeur()

# Mots annotés par le G2P (phone + liaison)
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

### Avec Lectura Phonémiseur

```python
from lectura_aligneur import LecturaSyllabeur
from lectura_phonemiseur import creer_engine

g2p = creer_engine()    # mode API par défaut

class G2PPhonemizer:
    def predict(self, word):
        return g2p.analyser([word])['g2p'][0]

syllabeur = LecturaSyllabeur(phonemizer=G2PPhonemizer())
```

---

## Architecture

L'Aligneur reçoit en entrée les [groupes de lecture]({{ '/developpement/modules/metiers/g2p/' | relative_url }}) construits par le Phonémiseur (élision, liaison, enchaînement) et effectue la **syllabation** (`syllabifier_groupes`) :

Pour chaque groupe :
1. Syllabation IPA par modèle de sonorité (5 classes : obstruantes, nasales, liquides, semi-voyelles, voyelles)
2. Alignement DFS graphème-phonème avec détection des lettres muettes et fusionnées
3. Construction des syllabes avec décomposition attaque/noyau/coda et correspondance graphème

---

## Structures de données

| Classe | Champs principaux | Rôle |
|--------|-------------------|------|
| `Syllabe` | `phone`, `ortho`, `span`, `attaque`, `noyau`, `coda` | Syllabe décomposée avec alignement |
| `GroupePhonologique` | `phonemes[]` → `.phone`, `.grapheme` | Attaque, noyau ou coda d'une syllabe |
| `Phoneme` | `ipa`, `grapheme` | Phonème individuel avec correspondance graphème |
| `ResultatAnalyse` | `mot`, `phone`, `syllabes[]` | Analyse d'un mot |
| `MotAnalyse` | `token`, `phone`, `liaison`, `pos` | Mot annoté par le G2P |
| `GroupeLecture` | `mots[]`, `phone_groupe`, `jonctions[]`, `span` | Groupe de lecture |
| `ResultatGroupe` | `groupe`, `syllabes[]` | Groupe syllabé |
| `ResultatSyllabation` | `groupes[]`, `nb_syllabes`, `nb_groupes` | Résultat complet |

---

## Rôle dans le pipeline Lectura

L'Aligneur-Syllabeur est le **pivot central** de Lectura :

1. **Préparation des corpus** — l'alignement graphème-phonème a permis de constituer les données d'entraînement des modèles G2P et P2G
2. **Lecture assistée** — les groupes de lecture avec syllabes colorées sont la base de l'interface de lecture augmentée
3. **Synthèse vocale** — l'alignement et les spans permettent la synchronisation texte-audio

---

## Installation

```bash
pip install lectura-aligneur       # mode API par défaut (zéro dépendance)
```

**Phonémiseur pluggable** : utilisable avec votre propre phonémiseur, [eSpeak-NG](https://github.com/espeak-ng/espeak-ng), ou le module [Lectura Phonémiseur]({{ '/developpement/modules/metiers/g2p/' | relative_url }}). N'importe quel objet avec une méthode `phonemize(word)` ou `predict(word)` est accepté.

---

## Caractéristiques techniques

- **Zéro dépendance** Python
- **Bi-modal** : mode API (zéro config) ou mode local avec données embarquées
- **Alignement DFS** graphème-phonème avec gestion des lettres muettes et fusionnées
- **Modèle de sonorité** pour la syllabation (5 classes phonologiques)
- **Syllabation** des groupes de lecture construits par le Phonémiseur
- **Phonémiseur pluggable** : eSpeak-NG, Lectura Phonémiseur, ou tout objet compatible
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (non commerciale) — licence commerciale sur demande : [admin@lectura.world](mailto:admin@lectura.world)
