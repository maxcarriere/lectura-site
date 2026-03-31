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

---

## Fonctionnalites

| Fonction | Description |
|----------|-------------|
| **Syllabation** | Decoupage en syllabes selon les regles phonologiques du francais |
| **Groupes de lecture** | Regroupement des syllabes pour la lecture assistee |
| **Liaisons** | Elisions, liaisons obligatoires/facultatives, enchainements |
| **Phonemiseur pluggable** | Backend eSpeak-NG par defaut, compatible avec Lectura G2P |
| **Formules** | Gestion des spans de formules (nombres lus, dates, etc.) |

---

## Exemple

```python
from lectura_syllabeur import LecturaSyllabeur

syllabeur = LecturaSyllabeur()
resultat = syllabeur.syllabifier("Les enfants jouent dans la cour.")

for mot in resultat.mots:
    syllabes = "-".join(s.texte for s in mot.syllabes)
    print(f"{mot.forme:15s}  {syllabes}")
```

```
Les               Les
enfants           en-fants
jouent            jouent
dans              dans
la                la
cour              cour
```

---

## Exemple de sortie

Phrase : *Les enfants jouent dans la cour.*

```
Mot              Syllabes (IPA)
-----------------------------------
Les              /le/ (1 syll.)
enfants          /ɑ̃.fɑ̃/ (2 syll.)
jouent           /ʒu/ (1 syll.)
dans             /dɑ̃/ (1 syll.)
la               /la/ (1 syll.)
cour             /kuʁ/ (1 syll.)
```

*La demo interactive Syllabeur necessite eSpeak-NG (phonemiseur), non disponible dans le navigateur. Installez localement pour tester : `pip install lectura-syllabeur`.*

---

## Installation

```bash
pip install lectura-syllabeur
```

---

## Caracteristiques techniques

- **Zero dependance** Python
- **Phonemiseur pluggable** : eSpeak-NG ou Lectura G2P
- **Python 3.10+** avec type hints complets (PEP-561)
- **Double licence** : AGPL-3.0 (libre) / Licence commerciale
