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

Fonctionne en mode règles sans aucun modèle (~F1 0.77) ou avec modèles optionnels pour une précision améliorée (~F1 0.82). Dépendance unique : `lectura-lexique`.

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

Évaluation sur un corpus de 800 phrases issues de Wicopaco (Wikipedia français), contenant des erreurs réelles d'apprenants et de rédacteurs.

| Correcteur | Précision | Rappel | F1 | F0.5 | Vitesse |
|------------|-----------|--------|----|------|---------|
| **Lectura** (règles + modèles) | **0.94** | **0.73** | **0.82** | **0.89** | ~55 ms/phrase |
| **Lectura** (règles seules) | **0.93** | **0.65** | **0.77** | **0.86** | ~15 ms/phrase |
| Grammalecte | 0.54 | 0.26 | 0.35 | 0.44 | ~40 ms/phrase |
| LanguageTool | 0.30 | 0.37 | 0.33 | 0.31 | ~12 600 ms/phrase |

*Précision = corrections correctes / total corrections proposées. Rappel = erreurs détectées / total erreurs dans le corpus. F0.5 privilégie la précision (éviter les faux positifs).*

Le correcteur Lectura privilégie la **précision** : il propose peu de corrections erronées, ce qui est essentiel pour un usage non supervisé. Les modèles optionnels (BiLSTM + n-gram) améliorent surtout le rappel sur les homophones phonétiques.

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

## Dépendances

| Package | Rôle |
|---------|------|
| `lectura-lexique` | Accès au lexique français (formes, fréquences, POS, morphologie) |

## Licence

Distribué sous licence **AGPL-3.0** (non commerciale) — voir [LICENCE.txt](https://github.com/maxcarriere/lectura-modules/blob/main/Correcteur/LICENCE.txt).

Pour un usage commercial, contacter [contact@lec-tu-ra.com](mailto:contact@lec-tu-ra.com).
