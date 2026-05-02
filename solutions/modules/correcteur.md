---
title: Correcteur
layout: default
permalink: /solutions/modules/correcteur/
---

<div class="module-header">
  <h1>Lectura Correcteur</h1>
  <p class="module-tagline">Correcteur orthographique et grammatical du francais</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-correcteur/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Correcteur" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-correcteur</code>
  </div>
</div>

## Presentation

Pipeline de correction a base de **regles linguistiques** avec support optionnel de modeles statistiques (BiLSTM edit tagger, modele de langue n-gram). Corrige l'orthographe, la grammaire, les homophones, les accords, la conjugaison et les participes passes.

Fonctionne en mode regles sans aucun modele (~F1 0.77) ou avec modeles optionnels pour une precision amelioree (~F1 0.82). Dependance unique : `lectura-lexique`.

---

## Types de corrections

| Type | Exemple | Correction |
|------|---------|------------|
| **Orthographe** | *les enfant* | les enfants |
| **Accords** | *une grand maison* | une grande maison |
| **Conjugaison** | *ils mange* | ils mangent |
| **Homophones** | *il a manger* | il a mange |
| **Participes passes** | *la lettre que j'ai ecrit* | la lettre que j'ai ecrite |
| **Resegmentation** | *jai faim* | j'ai faim |

---

## Exemple

```python
from lectura_lexique import Lexique
from lectura_correcteur import Correcteur, CorrecteurConfig

lex = Lexique("lexique.db")
correcteur = Correcteur(lex)

result = correcteur.corriger("Les enfant mange des pomme.")
print(result.phrase_corrigee)
# "Les enfants mangent des pommes."

for c in result.corrections:
    print(f"  {c.original} -> {c.corrige} ({c.type_correction.value})")
```

---

## Configuration

```python
config = CorrecteurConfig(
    activer_orthographe=True,     # Verification lexicale (OOV)
    activer_grammaire=True,       # Accords, conjugaison, homophones
    activer_resegmentation=True,  # Apostrophes et agglutinations
    activer_azerty=True,          # Corrections AZERTY
    max_suggestions=5,            # Suggestions par mot
    activer_editeur_homophones=True,  # BiLSTM (si modele present)
    activer_lm=True,              # N-gram (si modele present)
)

correcteur = Correcteur(lex, config=config)
```

Le correcteur se rabat automatiquement sur les regles si les modeles optionnels sont absents.

---

## Dependances

| Package | Role |
|---------|------|
| `lectura-lexique` | Acces au lexique francais (formes, frequences, POS, morphologie) |

## Licence

Distribue sous licence **AGPL-3.0** (non commerciale) — voir [LICENCE.txt](https://github.com/maxcarriere/lectura-modules/blob/main/Correcteur/LICENCE.txt).

Pour un usage commercial, contacter [contact@lec-tu-ra.com](mailto:contact@lec-tu-ra.com).
