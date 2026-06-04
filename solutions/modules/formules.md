---
title: Formules
layout: default
permalink: /solutions/modules/formules/
---

<div class="module-header">
  <h1>Lectura Formules</h1>
  <p class="module-tagline">Lecture algorithmique des formules pour le francais</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-formules/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Formules" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-formules</code>
  </div>
</div>

## Presentation

Module autonome, **zero dependance** externe (aucune dependance Python tierce). Transforme toute formule ecrite en sa lecture francaise avec transcription phonetique IPA. Fonctionne en local (zero config) ou via l'API Lectura.

Nombres, sigles, dates, telephones, heures, monnaies, ordinaux, fractions, notations scientifiques, expressions mathematiques, coordonnees GPS — tout est couvert.

Chaque formule est decomposee en **events alignes** : chaque composant de la formule est associe a son texte lu, sa transcription IPA, et sa position dans la formule source. Cet alignement permet la lecture synchronisee et la **lecture audio** a partir d'une banque de sons WAV (~12 Mo, 289 fichiers disponibles sur GitHub).

*Pour une demo complete avec lecture audio et alignement visuel, voir le programme [Lectura Formule]({{ '/solutions/programmes/' | relative_url }}).*

---

## Types de formules supportes

| Type | Exemple | Lecture |
|------|---------|--------|
| **Nombre** | `42` | quarante-deux |
| **Date** | `25/12/2024` | vingt-cinq decembre deux-mille-vingt-quatre |
| **Heure** | `14h30` | quatorze heures trente |
| **Telephone** | `06 12 34 56 78` | zero-six, douze, trente-quatre... |
| **Sigle** | `SNCF` | esse-enne-ce-effe |
| **Ordinal** | `3e` | troisieme |
| **Fraction** | `3/4` | trois quarts |
| **Monnaie** | `42 EUR` | quarante-deux euros |
| **Pourcentage** | `50%` | cinquante pour cent |
| **Maths** | `2x²+5x-3` | deux x au carre plus cinq x moins trois |
| **Romain** | `XIV` | quatorze |

---

## Exemple

```python
from lectura_formules import lire_formule

result = lire_formule("NOMBRE", "42")
print(result.display_fr)    # "quarante-deux"
print(result.phone)         # "kaʁɑ̃tdø"

# Events alignes : chaque composant avec son texte, IPA et position
for event in result.events:
    print(f"  {event.ortho:15s}  {event.phone:10s}  sound_id={event.sound_id}")
# quarante         kaʁɑ̃t       sound_id=
# deux             dø           sound_id=

result = lire_formule("DATE", "25/12/2024")
print(result.display_fr)    # "vingt-cinq decembre deux-mille-vingt-quatre"
```

---

## Essayer en ligne

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
  <button class="demo-btn" type="button">Essayer</button>
  <pre class="demo-output">Cliquez sur « Essayer » pour lancer la demo.</pre>
</div>

---

## Alignement et lecture audio

Chaque formule est decomposee en **events** (`EventFormuleLecture`) qui fournissent :

| Champ | Description |
|-------|-------------|
| `ortho` | Texte lu du composant (ex: "quarante") |
| `phone` | Transcription IPA (ex: "kaʁɑ̃t") |
| `span_source` | Position dans la formule source |
| `composant` | Index du composant (pour regroupement) |
| `sound_id` | Identifiant du son WAV correspondant |

Cet alignement permet de :
- **Surligner** chaque partie de la formule pendant la lecture
- **Jouer les sons** WAV composant par composant
- **Synchroniser** l'affichage visuel avec l'audio

Les fichiers WAV (~12 Mo, 289 sons) sont disponibles sur GitHub. Le programme **Lectura Formule** offre une demo interactive complete avec lecture audio synchronisee.

---

## Reconnaissance IPA → formule

**Nouveau en 3.2.0** — Le chemin inverse : a partir d'une transcription IPA, retrouver la formule source et le texte francais.

```python
from lectura_formules import reconnaitre_ipa

result = reconnaitre_ipa("kaʁɑ̃t dø")
print(result.display_num)   # "42"
print(result.display_fr)    # "quarante-deux"
print(result.phone)         # "kaʁɑ̃t dø"

# Fonctionne pour tous les types de formules
reconnaitre_ipa("kɛ̃z maʁs dø mil vɛ̃ katʁ")     # → "15/03/2024"
reconnaitre_ipa("katɔʁz œʁ tʁɑ̃t")               # → "14h30"
reconnaitre_ipa("kaʁɑ̃t dø øʁo")                  # → "42€"
reconnaitre_ipa("sɛ̃kɑ̃t puʁ sɑ̃")                 # → "50%"
```

La reconnaissance est **tolerante aux espaces** (manquants, supplementaires ou corrects) et **verifiee par aller-retour** : la formule reconstruite est relue par le moteur forward, et le resultat n'est retourne que si l'IPA produit correspond a l'entree.

---

## Reconnaissance de formules mathematiques

**Nouveau en 3.3.0** — Reconnaissance inverse des expressions mathematiques : operateurs, fonctions, lettres grecques, exposants, racines et parentheses intelligentes.

```python
from lectura_formules import reconnaitre_maths_ipa

reconnaitre_maths_ipa("dø plys tʁwa eɡal sɛ̃k")                  # → "2+3=5"
reconnaitre_maths_ipa("ɛf də iks eɡal dø iks o kaʁe plys sɛ̃k iks mwɛ̃ tʁwa")  # → "f(x)=2x²+5x-3"
reconnaitre_maths_ipa("ø eɡal ɛm se o kaʁe")                     # → "E=mc²"
reconnaitre_maths_ipa("sinys də iks")                              # → "sin(x)"
reconnaitre_maths_ipa("ʁasin kaʁe də nœf")                        # → "√9"
reconnaitre_maths_ipa("alfa plys bɛta eɡal ɡama")                 # → "α+β=γ"
```

La detection de **spans** permet de reconnaitre les formules a l'interieur de phrases IPA completes :

```python
from lectura_formules import detect_formula_spans

spans = detect_formula_spans(["la", "fɔʁmyl", "dø", "plys", "tʁwa", "eɡal", "sɛ̃k", "ɛ", "kɔnɥ"])
# → [(2, 7, <result: "2+3=5">)]
```

Des variantes **tolerantes STT** (`reconnaitre_maths_ipa_stt`, `detect_formula_spans_stt`) gerent les approximations des moteurs de reconnaissance vocale (normalisation vocalique, variantes CTC, tolerance Levenshtein).

---

## API principale

| Fonction | Description |
|----------|-------------|
| `lire_formule(type, texte)` | Point d'entree principal — lit une formule typee |
| `lire_nombre(texte)` | Nombres : "42" → "quarante-deux" |
| `lire_date(texte)` | Dates : "25/12/2024" → "vingt-cinq decembre..." |
| `lire_heure(texte)` | Heures : "14h30" → "quatorze heures trente" |
| `lire_telephone(texte)` | Telephones : "06 12 34 56 78" |
| `lire_sigle(texte)` | Sigles : "SNCF" → "esse-enne-ce-effe" |
| `lire_ordinal(texte)` | Ordinaux : "3e" → "troisieme" |
| `lire_fraction(texte)` | Fractions : "3/4" → "trois quarts" |
| `lire_monnaie(texte)` | Monnaies : "42 EUR" → "quarante-deux euros" |
| `lire_pourcentage(texte)` | Pourcentages : "50%" → "cinquante pour cent" |
| `reconnaitre_ipa(ipa)` | **Inverse** : IPA → formule source (nombre, date, heure, monnaie, %) |
| `reconnaitre_maths_ipa(ipa)` | **Inverse maths** : IPA → formule mathematique |
| `detect_formula_spans(words)` | Detection de formules math dans une phrase IPA |
| `detect_number_spans(words)` | Detection de nombres dans une phrase IPA |
| `detect_sigle_spans(words)` | Detection de sigles dans une phrase IPA |
| `enrichir_formules(tokens)` | Enrichit les tokens d'une phrase |
| `int_to_roman(n)` / `roman_to_int(s)` | Chiffres romains |

---

## Installation

```bash
pip install lectura-formules
```

---

## Caracteristiques techniques

- **Zero dependance** Python (aucune dependance tierce, independant du Tokeniseur)
- **15+ types de formules** reconnus
- **Transcription phonetique IPA** automatique
- **Events alignes** : decomposition composant par composant avec positions
- **Sons WAV optionnels** (~12 Mo, 289 fichiers) disponibles sur GitHub
- **Python 3.10+** avec type hints complets (PEP-561)
- **Version** : 3.3.0
- **Licence** : AGPL-3.0 (non commerciale) — licence commerciale sur demande : [contact@lec-tu-ra.com](mailto:contact@lec-tu-ra.com)
