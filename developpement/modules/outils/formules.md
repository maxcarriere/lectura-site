---
title: Formules
layout: default
permalink: /developpement/modules/outils/formules/
redirect_from:
  - /solutions/modules/formules/
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

*Pour une demo complete avec lecture audio et alignement visuel, voir le programme [Lectura Formule]({{ '/produits/programmes/' | relative_url }}).*

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

## Detecteur unifie STT (heures, dates, fractions)

**Nouveau en 3.6.0** — Le detecteur `detect_formule_spans_stt` remplace `detect_number_spans` en mode STT. Il detecte automatiquement tous les types de formules (nombres, heures, dates, monnaies, pourcentages, fractions, ordinaux) dans une phrase IPA produite par un pipeline STT.

```python
from lectura_formules import detect_formule_spans_stt

# Heure : "quinze heures cinquante-sept"
spans = detect_formule_spans_stt(["kɛ̃z", "œʁ", "sɛ̃kɑ̃t", "sɛt"])
# → [(0, 4, <result: "15h57">)]

# Date : "treize decembre mille neuf cents"
spans = detect_formule_spans_stt(["tʁɛz", "desɑ̃bʁ", "mil", "nœf", "sɑ̃"])
# → [(0, 5, <result: "13/12/1900">)]

# Fraction : "trois cinquieme"
spans = detect_formule_spans_stt(["tʁwa", "sɛ̃kjɛm"])
# → [(0, 2, <result: "3/5">)]
```

La distinction fraction/ordinal repose sur le contexte multi-mots : "trois cinquieme" (2 mots) → fraction 3/5, "cinquieme" seul → ordinal 5e.

Le pre-filtre `_is_formule_token` accepte les categories nombre, mois, heure_word, devise, pourcent et ordinal (plus large que l'ancien `_is_number_token` qui n'acceptait que nombre et special).

---

## Tolerance CTC pour la reconnaissance STT

**Nouveau en 3.5.0** — Le pipeline STT (CTC + P2G) produit de l'IPA globalement correct, mais avec des variantes phonetiques mineures qui faisaient echouer la detection de formules. La version 3.5.0 gere automatiquement ces confusions CTC :

| Confusion | Exemple | Effet |
|-----------|---------|-------|
| Nasales (`ɛ̃` / `œ̃` / `ɑ̃`) | "un" : `ɛ̃` → `ɑ̃` | Reconnu |
| Voisement (`k`/`ɡ`, `t`/`d`, `p`/`b`) | "quarante" : `kaʁɑ̃t` → `ɡaʁɑ̃t` | Reconnu |
| Glides manquantes (`lj` → `l`) | "million" : `miljɔ̃` → `milɔ̃` | Reconnu |
| Consonnes finales (`tʁ` → `t`) | "quatre" : `katʁ` → `kat` | Reconnu |
| Consonne finale `/s/` optionnelle (`ys` → `y`) | "plus" : `plys` → `ply` | Reconnu |

Les variantes sont generees automatiquement pour toutes les entrees de la table de lookup (nombres, mois, devises, symboles).

### Modes de detection des nombres

La fonction `detect_number_spans` propose trois modes de detection :

| Mode | Usage | Comportement |
|------|-------|-------------|
| `"num"` | Conversion explicite | Convertit tous les nombres, y compris isoles |
| `"auto"` | Mode par defaut STT | Exige 2+ tokens nombre consecutifs — jamais de conversion pour un mot isole (trois, cent, vingt) |
| `"texte"` | Pas de formules | Aucune conversion numerique |

```python
from lectura_formules import detect_number_spans

# Mode auto : "sɑ̃" seul (cent) n'est pas converti
detect_number_spans(["sɑ̃"], min_span=1, mode="auto")       # → []

# Mode auto : "sɑ̃ dø" (cent deux) est converti
detect_number_spans(["sɑ̃", "dø"], min_span=1, mode="auto") # → [(0, 2, <102>)]

# Mode num : tout est converti
detect_number_spans(["sɑ̃"], min_span=1, mode="num")         # → [(0, 1, <100>)]
```

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
| `reconnaitre_ipa_stt(ipa)` | **Inverse STT** : idem avec tolerance CTC (variantes, Levenshtein) |
| `reconnaitre_maths_ipa(ipa)` | **Inverse maths** : IPA → formule mathematique |
| `reconnaitre_maths_ipa_stt(ipa)` | **Inverse maths STT** : idem avec tolerance CTC |
| `detect_formula_spans(words)` | Detection de formules math dans une phrase IPA |
| `detect_formula_spans_stt(words)` | Idem avec tolerance STT |
| `detect_formule_spans_stt(words)` | **Detecteur unifie STT** : heures, dates, monnaies, %, fractions, nombres |
| `detect_number_spans(words, mode=)` | Detection de nombres (modes : `num`, `auto`, `texte`) |
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
- **Version** : 3.6.0
- **Licence** : AGPL-3.0 (non commerciale) — licence commerciale sur demande : [admin@lectura.world](mailto:admin@lectura.world)
