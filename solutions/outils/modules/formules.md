---
title: Formules
layout: default
permalink: /solutions/outils/modules/formules/
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

Module autonome, **zero dependance** externe. Transforme toute formule ecrite en sa lecture francaise avec transcription phonetique IPA.

Nombres, sigles, dates, telephones, heures, monnaies, ordinaux, fractions, notations scientifiques, expressions mathematiques, coordonnees GPS — tout est couvert.

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
print(result.phone)         # "ka.ʁɑ̃t.dø"

result = lire_formule("DATE", "25/12/2024")
print(result.display_fr)    # "vingt-cinq decembre deux-mille-vingt-quatre"
```

---

## Essayer en ligne

<div class="pyodide-demo" data-package="lectura-formules" data-code="
from lectura_formules import lire_formule
r = lire_formule('NOMBRE', '{INPUT}')
f'Formule :    {INPUT}\nLecture :    {r.display_fr}\nPhonetique : {r.phone}'
">
  <input type="text" class="demo-input" value="42" placeholder="Tapez une formule (nombre, date, heure, sigle...)">
  <button class="demo-btn" type="button">Essayer</button>
  <pre class="demo-output">Cliquez sur « Essayer » pour lancer la demo.</pre>
</div>

---

## API principale

| Fonction | Description |
|----------|-------------|
| `lire_formule(texte)` | Point d'entree principal — detecte le type et lit |
| `lire_nombre(texte)` | Nombres : "42" → "quarante-deux" |
| `lire_date(texte)` | Dates : "25/12/2024" → "vingt-cinq decembre..." |
| `lire_heure(texte)` | Heures : "14h30" → "quatorze heures trente" |
| `lire_telephone(texte)` | Telephones : "06 12 34 56 78" |
| `lire_sigle(texte)` | Sigles : "SNCF" → "esse-enne-ce-effe" |
| `lire_ordinal(texte)` | Ordinaux : "3e" → "troisieme" |
| `lire_fraction(texte)` | Fractions : "3/4" → "trois quarts" |
| `lire_monnaie(texte)` | Monnaies : "42 EUR" → "quarante-deux euros" |
| `lire_pourcentage(texte)` | Pourcentages : "50%" → "cinquante pour cent" |
| `int_to_roman(n)` / `roman_to_int(s)` | Chiffres romains |
| `enrichir_formules(tokens)` | Enrichit les tokens d'une phrase |

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
- **Sons WAV optionnels** (~12 Mo, 289 fichiers) disponibles sur GitHub
- **Python 3.10+** avec type hints complets (PEP-561)
- **Double licence** : AGPL-3.0 (libre) / Licence commerciale
