---
title: Correcteur
layout: default
permalink: /solutions/modules/correcteur/
---

<div class="module-header">
  <h1>Lectura Correcteur</h1>
  <p class="module-tagline">Correcteur orthographique et grammatical du français</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-correcteur/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Correcteur" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-correcteur</code>
  </div>
</div>

## Présentation

Pipeline de correction à base de **règles linguistiques** avec support optionnel de modèles statistiques (BiLSTM edit tagger, modèle de langue n-gram). Corrige l'orthographe, la grammaire, les homophones, les accords, la conjugaison et les participes passés.

Fonctionne en mode règles (~F1 0.70) ou avec scoring unifié pour une précision améliorée (~F1 0.70, meilleur rappel). Trois modes : lexique complet (`lectura-lexique`), lexique léger intégré, ou API.

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

## Compatibilité lexique

Le Correcteur fonctionne avec n'importe quelle base lexicale chargée via `lectura-lexique` : Lexique383, GLAFF, LeXiK, ou tout lexique au format compatible. Il suffit de passer l'objet `Lexique` au constructeur.

---

## Modes de fonctionnement

| Mode | Dépendance | Taille | Installation |
|------|------------|--------|--------------|
| **Lexique complet** | `lectura-lexique` | ~900 Mo | `pip install lectura-correcteur[sqlite]` |
| **Lexique léger** | aucune | ~50 Mo | Inclus dans le wheel privé |
| **API** | aucune | 0 Mo | `pip install lectura-correcteur` |

La factory `creer_correcteur()` détecte automatiquement le mode disponible (lexique complet → léger → API).

## Licence

Distribué sous licence **AGPL-3.0** (non commerciale) — voir [LICENCE.txt](https://github.com/maxcarriere/lectura-modules/blob/main/Correcteur/LICENCE.txt).

Pour un usage commercial, contacter [contact@lec-tu-ra.com](mailto:contact@lec-tu-ra.com).
