---
title: Formules
layout: default
permalink: /developpement/modules/outils/formules/
redirect_from:
  - /solutions/modules/formules/
---

<div class="module-header">
  <h1>Lectura Formules</h1>
  <p class="module-tagline">Lecture algorithmique des formules pour le français</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-formules/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Formules" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-formules</code>
  </div>
</div>

## Présentation

Module autonome, **zéro dépendance** externe (aucune dépendance Python tierce). Transforme toute formule écrite en sa lecture française avec transcription phonétique IPA. Fonctionne en local (zéro config) ou via l'API Lectura.

Nombres, sigles, dates, téléphones, heures, monnaies, ordinaux, fractions, notations scientifiques, expressions mathématiques, coordonnées GPS — tout est couvert.

Chaque formule est décomposée en **events alignés** : chaque composant de la formule est associé à son texte lu, sa transcription IPA, et sa position dans la formule source. Cet alignement permet la lecture synchronisée et la **lecture audio** à partir d'une banque de sons WAV (~12 Mo, 289 fichiers disponibles sur GitHub).

*Pour une démo complète avec lecture audio et alignement visuel, voir le programme [Lectura Formule]({{ '/produits/programmes/' | relative_url }}).*

---

## Types de formules supportés

| Type | Exemple | Lecture |
|------|---------|--------|
| **Nombre** | `42` | quarante-deux |
| **Date** | `25/12/2024` | vingt-cinq décembre deux-mille-vingt-quatre |
| **Heure** | `14h30` | quatorze heures trente |
| **Téléphone** | `06 12 34 56 78` | zéro-six, douze, trente-quatre... |
| **Sigle** | `SNCF` | esse-enne-ce-effe |
| **Ordinal** | `3e` | troisième |
| **Fraction** | `3/4` | trois quarts |
| **Monnaie** | `42 EUR` | quarante-deux euros |
| **Pourcentage** | `50%` | cinquante pour cent |
| **Maths** | `2x²+5x-3` | deux x au carré plus cinq x moins trois |
| **Romain** | `XIV` | quatorze |

---

## Exemple

```python
from lectura_formules import lire_formule

result = lire_formule("NOMBRE", "42")
print(result.display_fr)    # "quarante-deux"
print(result.phone)         # "kaʁɑ̃tdø"

# Events alignés : chaque composant avec son texte, IPA et position
for event in result.events:
    print(f"  {event.ortho:15s}  {event.phone:10s}  sound_id={event.sound_id}")
# quarante         kaʁɑ̃t       sound_id=
# deux             dø           sound_id=

result = lire_formule("DATE", "25/12/2024")
print(result.display_fr)    # "vingt-cinq décembre deux-mille-vingt-quatre"
```

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="{{ '/solutions/analyse-langage/#formules' | relative_url }}">Essayer les Formules en ligne →</a>
</div>

---

## Alignement et lecture audio

Chaque formule est décomposée en **events** (`EventFormuleLecture`) qui fournissent :

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

Les fichiers WAV (~12 Mo, 289 sons) sont disponibles sur GitHub. Le programme **Lectura Formule** offre une démo interactive complète avec lecture audio synchronisée.

---

## Reconnaissance IPA → formule

**Nouveau en 3.2.0** — Le chemin inverse : à partir d'une transcription IPA, retrouver la formule source et le texte français.

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

La reconnaissance est **tolérante aux espaces** (manquants, supplémentaires ou corrects) et **vérifiée par aller-retour** : la formule reconstruite est relue par le moteur forward, et le résultat n'est retourné que si l'IPA produit correspond à l'entrée.

---

## Reconnaissance de formules mathématiques

**Nouveau en 3.3.0** — Reconnaissance inverse des expressions mathématiques : opérateurs, fonctions, lettres grecques, exposants, racines et parenthèses intelligentes.

```python
from lectura_formules import reconnaitre_maths_ipa

reconnaitre_maths_ipa("dø plys tʁwa eɡal sɛ̃k")                  # → "2+3=5"
reconnaitre_maths_ipa("ɛf də iks eɡal dø iks o kaʁe plys sɛ̃k iks mwɛ̃ tʁwa")  # → "f(x)=2x²+5x-3"
reconnaitre_maths_ipa("ø eɡal ɛm se o kaʁe")                     # → "E=mc²"
reconnaitre_maths_ipa("sinys də iks")                              # → "sin(x)"
reconnaitre_maths_ipa("ʁasin kaʁe də nœf")                        # → "√9"
reconnaitre_maths_ipa("alfa plys bɛta eɡal ɡama")                 # → "α+β=γ"
```

La détection de **spans** permet de reconnaître les formules à l'intérieur de phrases IPA complètes :

```python
from lectura_formules import detect_formula_spans

spans = detect_formula_spans(["la", "fɔʁmyl", "dø", "plys", "tʁwa", "eɡal", "sɛ̃k", "ɛ", "kɔnɥ"])
# → [(2, 7, <result: "2+3=5">)]
```

Des variantes **tolérantes STT** (`reconnaitre_maths_ipa_stt`, `detect_formula_spans_stt`) gèrent les approximations des moteurs de reconnaissance vocale (normalisation vocalique, variantes CTC, tolérance Levenshtein).

---

## Détecteur unifié STT (heures, dates, fractions)

**Nouveau en 3.6.0** — Le détecteur `detect_formule_spans_stt` remplace `detect_number_spans` en mode STT. Il détecte automatiquement tous les types de formules (nombres, heures, dates, monnaies, pourcentages, fractions, ordinaux) dans une phrase IPA produite par un pipeline STT.

```python
from lectura_formules import detect_formule_spans_stt

# Heure : "quinze heures cinquante-sept"
spans = detect_formule_spans_stt(["kɛ̃z", "œʁ", "sɛ̃kɑ̃t", "sɛt"])
# → [(0, 4, <result: "15h57">)]

# Date : "treize décembre mille neuf cents"
spans = detect_formule_spans_stt(["tʁɛz", "desɑ̃bʁ", "mil", "nœf", "sɑ̃"])
# → [(0, 5, <result: "13/12/1900">)]

# Fraction : "trois cinquième"
spans = detect_formule_spans_stt(["tʁwa", "sɛ̃kjɛm"])
# → [(0, 2, <result: "3/5">)]
```

La distinction fraction/ordinal repose sur le contexte multi-mots : "trois cinquième" (2 mots) → fraction 3/5, "cinquième" seul → ordinal 5e.

Le pré-filtre `_is_formule_token` accepte les catégories nombre, mois, heure_word, devise, pourcent et ordinal (plus large que l'ancien `_is_number_token` qui n'acceptait que nombre et special).

---

## Tolérance CTC pour la reconnaissance STT

**Nouveau en 3.5.0** — Le pipeline STT (CTC + P2G) produit de l'IPA globalement correct, mais avec des variantes phonétiques mineures qui faisaient échouer la détection de formules. La version 3.5.0 gère automatiquement ces confusions CTC :

| Confusion | Exemple | Effet |
|-----------|---------|-------|
| Nasales (`ɛ̃` / `œ̃` / `ɑ̃`) | "un" : `ɛ̃` → `ɑ̃` | Reconnu |
| Voisement (`k`/`ɡ`, `t`/`d`, `p`/`b`) | "quarante" : `kaʁɑ̃t` → `ɡaʁɑ̃t` | Reconnu |
| Glides manquantes (`lj` → `l`) | "million" : `miljɔ̃` → `milɔ̃` | Reconnu |
| Consonnes finales (`tʁ` → `t`) | "quatre" : `katʁ` → `kat` | Reconnu |
| Consonne finale `/s/` optionnelle (`ys` → `y`) | "plus" : `plys` → `ply` | Reconnu |

Les variantes sont générées automatiquement pour toutes les entrées de la table de lookup (nombres, mois, devises, symboles).

### Modes de détection des nombres

La fonction `detect_number_spans` propose trois modes de détection :

| Mode | Usage | Comportement |
|------|-------|-------------|
| `"num"` | Conversion explicite | Convertit tous les nombres, y compris isolés |
| `"auto"` | Mode par défaut STT | Exige 2+ tokens nombre consécutifs — jamais de conversion pour un mot isolé (trois, cent, vingt) |
| `"texte"` | Pas de formules | Aucune conversion numérique |

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
| `lire_formule(type, texte)` | Point d'entrée principal — lit une formule typée |
| `lire_nombre(texte)` | Nombres : "42" → "quarante-deux" |
| `lire_date(texte)` | Dates : "25/12/2024" → "vingt-cinq décembre..." |
| `lire_heure(texte)` | Heures : "14h30" → "quatorze heures trente" |
| `lire_telephone(texte)` | Téléphones : "06 12 34 56 78" |
| `lire_sigle(texte)` | Sigles : "SNCF" → "esse-enne-ce-effe" |
| `lire_ordinal(texte)` | Ordinaux : "3e" → "troisième" |
| `lire_fraction(texte)` | Fractions : "3/4" → "trois quarts" |
| `lire_monnaie(texte)` | Monnaies : "42 EUR" → "quarante-deux euros" |
| `lire_pourcentage(texte)` | Pourcentages : "50%" → "cinquante pour cent" |
| `reconnaitre_ipa(ipa)` | **Inverse** : IPA → formule source (nombre, date, heure, monnaie, %) |
| `reconnaitre_ipa_stt(ipa)` | **Inverse STT** : idem avec tolérance CTC (variantes, Levenshtein) |
| `reconnaitre_maths_ipa(ipa)` | **Inverse maths** : IPA → formule mathématique |
| `reconnaitre_maths_ipa_stt(ipa)` | **Inverse maths STT** : idem avec tolérance CTC |
| `detect_formula_spans(words)` | Détection de formules math dans une phrase IPA |
| `detect_formula_spans_stt(words)` | Idem avec tolérance STT |
| `detect_formule_spans_stt(words)` | **Détecteur unifié STT** : heures, dates, monnaies, %, fractions, nombres |
| `detect_number_spans(words, mode=)` | Détection de nombres (modes : `num`, `auto`, `texte`) |
| `detect_sigle_spans(words)` | Détection de sigles dans une phrase IPA |
| `enrichir_formules(tokens)` | Enrichit les tokens d'une phrase |
| `int_to_roman(n)` / `roman_to_int(s)` | Chiffres romains |

---

## Installation

```bash
pip install lectura-formules
```

---

## Caractéristiques techniques

- **Zéro dépendance** Python (aucune dépendance tierce, indépendant du Tokeniseur)
- **15+ types de formules** reconnus
- **Transcription phonétique IPA** automatique
- **Events alignés** : décomposition composant par composant avec positions
- **Sons WAV optionnels** (~12 Mo, 289 fichiers) disponibles sur GitHub
- **Python 3.10+** avec type hints complets (PEP-561)
- **Version** : 3.6.0
- **Licence** : AGPL-3.0 (non commerciale) — licence commerciale sur demande : [admin@lectura.world](mailto:admin@lectura.world)
