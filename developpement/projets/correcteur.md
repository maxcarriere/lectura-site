---
title: Projet Correcteur
layout: default
permalink: /developpement/projets/correcteur/
redirect_from:
  - /developpement/modules/metiers/correcteur/
  - /solutions/modules/correcteur/
---

<span class="status-badge status-cours">En cours</span>

## Présentation

Pipeline de correction orthographique et grammaticale du français, à base de **règles linguistiques** avec support optionnel de modèles statistiques (BiLSTM edit tagger, modèle de langue n-gram).

<div class="module-links">
  <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Correcteur" class="module-badge">GitHub</a>
  <code class="module-install">pip install lectura-correcteur</code>
</div>

---

## Types de corrections

| Type | Exemple | Correction |
|------|---------|------------|
| **Orthographe** | *les enfant* | les enfants |
| **Accords** | *une grand maison* | une grande maison |
| **Conjugaison** | *ils mange* | ils mangent |
| **Homophones** | *il a manger* | il a mangé |
| **Participes passés** | *la lettre que j'ai ecrit* | la lettre que j'ai écrite |
| **Resegmentation** | *jai faim* | j'ai faim |

---

## Benchmark comparatif

Évaluation GEC débiaisée sur 180 phrases (158 erronées, 22 correctes) couvrant orthographe, accords, conjugaison, homophones et phrases correctes.

| Correcteur | Précision | Rappel | F0.5 | F1 |
|------------|-----------|--------|------|-----|
| **Lectura** (règles) | **0.790** | 0.599 | **0.742** | 0.681 |
| **Lectura** (règles + scoring) | 0.782 | **0.633** | 0.747 | **0.700** |
| Grammalecte | 0.465 | 0.388 | 0.447 | 0.423 |
| Baseline (ne rien faire) | 1.000 | 0.000 | 0.000 | 0.000 |

*Précision = corrections correctes / total corrections proposées. Rappel = erreurs détectées / total erreurs dans le corpus. F0.5 privilégie la précision (éviter les faux positifs).*

Le correcteur Lectura privilégie la **précision** : il propose peu de corrections erronées, ce qui est essentiel pour un usage non supervisé.

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
    activer_orthographe=True,     # Vérification lexicale (OOV)
    activer_grammaire=True,       # Accords, conjugaison, homophones
    activer_resegmentation=True,  # Apostrophes et agglutinations
    activer_azerty=True,          # Corrections AZERTY
    max_suggestions=5,            # Suggestions par mot
    activer_editeur_homophones=True,  # BiLSTM (si modèle présent)
    activer_lm=True,              # N-gram (si modèle présent)
)

correcteur = Correcteur(lex, config=config)
```

Le correcteur se rabat automatiquement sur les règles si les modèles optionnels sont absents.

---

## Modes de fonctionnement

| Mode | Dépendance | Taille | Installation |
|------|------------|--------|--------------|
| **Lexique complet** | `lectura-lexique` | ~900 Mo | `pip install lectura-correcteur[sqlite]` |
| **Lexique léger** | aucune | ~50 Mo | Inclus dans le wheel privé |
| **API** | aucune | 0 Mo | `pip install lectura-correcteur` |

---

## Feuille de route

- Amélioration du rappel (détection des erreurs de style, répétitions)
- Intégration d'un modèle de langue plus large (5-gram)
- Support des règles typographiques françaises
- Mode « explication pédagogique » pour chaque correction

---

## Licence

AGPL-3.0 (non commerciale) — licence commerciale sur demande : [admin@lectura.world](mailto:admin@lectura.world)
