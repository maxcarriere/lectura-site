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

Module autonome, **zero dependance** externe. Transforme toute formule ecrite en sa lecture francaise avec transcription phonetique IPA. Fonctionne en local (zero config) ou via l'API Lectura.

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

<div class="pyodide-demo" data-package="lectura-formules" data-code="
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
| `enrichir_formules(tokens)` | Enrichit les tokens d'une phrase |
| `int_to_roman(n)` / `roman_to_int(s)` | Chiffres romains |

---

## Installation

```bash
pip install lectura-formules
```

---

## Caracteristiques techniques

- **Zero dependance** Python
- **15+ types de formules** reconnus
- **Transcription phonetique IPA** automatique
- **Events alignes** : decomposition composant par composant avec positions
- **Sons WAV optionnels** (~12 Mo, 289 fichiers) disponibles sur GitHub
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (non commerciale) — licence commerciale sur demande : [contact@lec-tu-ra.com](mailto:contact@lec-tu-ra.com)
