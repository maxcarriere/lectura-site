---
title: Analyse du langage
layout: default
permalink: /solutions/analyse-langage/
redirect_from:
  - /solutions/nlp/
  - /solutions/nlp/g2p/
  - /solutions/nlp/p2g/
  - /solutions/nlp/aligneur/
  - /solutions/nlp/formules/
---

Lectura propose plusieurs outils d'analyse du langage francais. Chaque brique fonctionne de maniere autonome et s'integre dans un pipeline complet : du texte brut jusqu'a l'analyse phonetique, grammaticale et syllabique.

---

## Tokenisation

Transformer un texte en suite de **tokens** (mots, ponctuation, formules) avec normalisation typographique. Le tokeniseur detecte automatiquement plus de 15 types de formules : nombres, dates, heures, sigles, monnaies, pourcentages, expressions mathematiques.

<div class="pyodide-demo" data-package="lectura-tokeniseur>=2.3.0" data-code="
from lectura_tokeniseur import tokenise, Formule
tokens = tokenise('{INPUT}')
lines = []
for t in tokens:
    detail = t.formule_type.name if isinstance(t, Formule) else ''
    lines.append(f'{t.text:25s} {t.type.name:12s} {detail}')
'\n'.join(lines)
">
  <input type="text" class="demo-input" value="Le 25/12/2024, il a lu 42 pages pour 12,50 EUR." placeholder="Tapez du texte francais...">
  <button class="demo-btn" type="button">Tester</button>
  <pre class="demo-output">Cliquez sur le bouton pour lancer la demo.</pre>
</div>

---

## Phonemisation (orthographe vers phonetique)

Transformer l'orthographe en transcription phonetique IPA. Le pipeline gere les **liaisons**, les **homographes** et predit simultanement la categorie grammaticale (20 etiquettes : NOM, VER, ADJ, ART, PRE...) ainsi que la morphologie (nombre, genre, temps, personne, mode).

Precision : **98.5%** par mot, avec desambiguisation contextuelle.

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
  <input type="text" class="demo-input" value="Les enfants sont arrives a la maison." placeholder="Entrez une phrase francaise...">
  <button class="demo-btn" type="button">Tester</button>
  <pre class="demo-output">Cliquez sur le bouton pour lancer la demo.</pre>
</div>

---

## Graphemisation (phonetique vers orthographe)

Le chemin inverse : a partir d'une transcription phonetique IPA, reconstruire l'orthographe francaise avec accentuation, accords et reconnaissance des noms propres. Precision : **~96%** par mot (pipeline complet).

<div class="ipa-keyboard">
  <span class="ipa-key" data-char="i" title="i">i <small>(i)</small></span>
  <span class="ipa-key" data-char="e" title="e ferme">e <small>(e)</small></span>
  <span class="ipa-key" data-char="ɛ" title="e ouvert">ɛ <small>(ai)</small></span>
  <span class="ipa-key" data-char="a" title="a">a <small>(a)</small></span>
  <span class="ipa-key" data-char="ɑ" title="a posterieur">ɑ <small>(a)</small></span>
  <span class="ipa-key" data-char="ɔ" title="o ouvert">ɔ <small>(o)</small></span>
  <span class="ipa-key" data-char="o" title="o ferme">o <small>(o)</small></span>
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
lines.append('\u2500' * 60)
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
  <input type="text" class="demo-input demo-input--ipa" value="le ɑ̃fɑ̃ sɔ̃ aʁive a la mɛzɔ̃" placeholder="Entrez des phonemes IPA separes par des espaces...">
  <button class="demo-btn" type="button">Tester</button>
  <pre class="demo-output">Cliquez sur le bouton pour lancer la demo.</pre>
</div>

---

## Aligneur syllabique

Aligne une sequence orthographique avec une sequence phonemique : **decoupage en syllabes** (orthographiques et phonetiques), identification des **lettres muettes**, decomposition attaque/noyau/coda, et gestion des groupes de lecture (elision, liaison, enchainement).

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
  <input type="text" class="demo-input" value="Les enfants sont arrives a la maison" placeholder="Entrez une phrase francaise...">
  <button class="demo-btn" type="button">Tester</button>
  <pre class="demo-output">Cliquez sur le bouton pour lancer la demo.</pre>
</div>

---

## Formules

Reconnaissance des types de formules (nombres, dates, heures, sigles, monnaies, expressions mathematiques...), passage d'une formule a son ecriture textuelle ou phonetique et vice versa. Plus de 15 types pris en charge.

| Type | Exemple | Lecture |
|------|---------|--------|
| Nombre | `42` | quarante-deux |
| Date | `25/12/2024` | vingt-cinq decembre deux-mille-vingt-quatre |
| Heure | `14h30` | quatorze heures trente |
| Sigle | `SNCF` | esse-enne-ce-effe |
| Maths | `2x+5x-3` | deux x au carre plus cinq x moins trois |

<div class="pyodide-demo" data-package="lectura-formules>=3.2.0" data-code="
from lectura_formules import lire_formule
r = lire_formule('NOMBRE', '{INPUT}')
lines = []
lines.append(f'Formule :    {INPUT}')
lines.append(f'Lecture :    {r.display_fr}')
lines.append(f'Phonetique : {r.phone}')
if r.events:
    lines.append('')
    lines.append('Events alignes :')
    for e in r.events:
        s, end = e.span_num if e.span_num else (0, 0)
        lines.append(f'  {e.ortho:20s} {e.phone:15s} span_num=[{s}:{end}]')
'\n'.join(lines)
">
  <input type="text" class="demo-input" value="42" placeholder="Tapez une formule (nombre, date, heure, sigle...)">
  <button class="demo-btn" type="button">Tester</button>
  <pre class="demo-output">Cliquez sur le bouton pour lancer la demo.</pre>
</div>

---

## Applications

Ces outils d'analyse du langage constituent la **base de tous les pipelines Lectura** :

- **Synthese vocale (TTS)** : le pipeline G2P + Aligneur + Formules alimente les moteurs de synthese vocale. Chaque mot est phonemise, aligne et syllabe avant d'etre prononce.
- **Reconnaissance vocale (STT)** : le pipeline inverse (P2G + Formules) reconstruit le texte a partir des phonemes detectes par le decodeur acoustique.
- **Apprentissage de la lecture** : l'aligneur produit les syllabes colorees, les groupes de lecture et les lettres muettes utilises dans les programmes de lecture assistee.
- **Correction orthographique** : la chaine G2P → P2G permet de detecter les erreurs phonetiquement coherentes (un mot mal ecrit mais prononce correctement).
- **Annotation de corpus** : etiquetage POS, morphologie et phonetique automatiques pour la recherche linguistique.
- **Accessibilite** : transcription phonetique pour les apprenants FLE, affichage syllabique pour les lecteurs en difficulte.

---

## En savoir plus

Chaque outil est disponible comme module Python independant avec documentation technique complete :

- [Tokeniseur]({{ '/developpement/modules/outils/tokeniseur/' | relative_url }}) — normalisation et tokenisation
- [Phonemiseur (G2P)]({{ '/developpement/modules/metiers/g2p/' | relative_url }}) — orthographe vers phonetique
- [Graphemiseur (P2G)]({{ '/developpement/modules/metiers/p2g/' | relative_url }}) — phonetique vers orthographe
- [Aligneur-Syllabeur]({{ '/developpement/modules/outils/aligneur/' | relative_url }}) — alignement et syllabation
- [Formules]({{ '/developpement/modules/outils/formules/' | relative_url }}) — lecture des formules

---

## Contact

Pour integrer ces outils dans votre projet : [admin@lectura.world](mailto:admin@lectura.world)
