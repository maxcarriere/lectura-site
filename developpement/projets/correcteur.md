---
title: Projet Correcteur
layout: default
permalink: /developpement/projets/correcteur/
redirect_from:
  - /developpement/modules/metiers/correcteur/
  - /solutions/modules/correcteur/
---

<span class="status-badge status-cours">En cours</span>

## L'idée

La correction orthographique peut se ramener à un problème phonétique. L'intuition est la suivante : la plupart des erreurs d'orthographe ne changent pas la prononciation de la phrase. Que l'on écrive « les enfant mange » ou « les enfants mangent », la phrase se prononce de la même façon.

Le pipeline du correcteur exploite cette observation en deux temps :

1. **Étape typographique** : correction des erreurs de frappe, resegmentation (« jai » → « j'ai »), accents manquants. Ces erreurs sont détectables sans analyse linguistique.
2. **Pipeline G2P / P2G** : le texte est converti en phonétique par le [Phonémiseur]({{ '/developpement/modules/outils/phonemiseur/' | relative_url }}) (G2P), puis reconverti en texte par le [Graphémiseur]({{ '/developpement/modules/outils/graphemiseur/' | relative_url }}) (P2G). Le graphémiseur, entraîné sur des phrases correctes, retrouve les accords, distingue les homophones et reconstruit l'orthographe attendue.

Le résultat est frappant : corriger un texte mal orthographié revient au même problème que transcrire une voix en texte propre. Dans les deux cas, on part d'une représentation phonétique (explicite pour la voix, reconstituée pour le texte) et on produit un texte orthographiquement correct. Le correcteur et le STT partagent ainsi le même cœur : le pipeline P2G.

Le correcteur combine cette approche phonétique avec des **règles linguistiques** et un support optionnel de modèles statistiques (BiLSTM edit tagger, modèle de langue n-gram).

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

## État actuel

Le correcteur est en cours de développement. Le point bloquant actuel est l'**amélioration du pipeline P2G** (phonèmes → texte). Avec une précision de ~95%, le Graphémiseur est satisfaisant pour la reconnaissance vocale (STT), où l'on accepte une transcription plus approximative. Ce n'est pas le cas pour un correcteur orthographique, qui exige une précision nettement supérieure pour ne pas introduire de nouvelles erreurs.

L'effort se concentre donc sur l'amélioration du [Graphémiseur]({{ '/developpement/modules/outils/graphemiseur/' | relative_url }}) avant de poursuivre le développement du correcteur.

---

## Évaluation

### Correcteurs comparés

L'évaluation porte sur les correcteurs accessibles pour le français :

| Correcteur | Type | Description |
|------------|------|-------------|
| **Lectura** | Phonétique + règles | Pipeline G2P/P2G + règles linguistiques |
| **Grammalecte** | Règles | Correcteur open source à base de règles |
| **LanguageTool** | Règles + ML | Correcteur open source multilingue |
| **Antidote** | Commercial | Référence commerciale pour le français |
| **BonPatron** | En ligne | Correcteur en ligne spécialisé français |

### Métriques

Les métriques standard en correction grammaticale (GEC) sont :

- **Précision** : corrections correctes / total corrections proposées (éviter les faux positifs)
- **Rappel** : erreurs détectées / total erreurs dans le corpus
- **F0.5** : moyenne harmonique privilégiant la précision (métrique de référence en GEC, car un correcteur qui introduit de nouvelles erreurs est pire qu'un correcteur prudent)
- **F1** : moyenne harmonique équilibrée entre précision et rappel

### Corpus d'évaluation

Un point essentiel de l'évaluation est l'utilisation de **plusieurs corpus** aux profils différents. Un correcteur peut exceller sur un type d'erreurs et échouer sur un autre. Les corpus envisagés :

| Corpus | Profil | Intérêt |
|--------|--------|---------|
| **WiCoPaCo** | Erreurs de contributeurs Wikipédia (natifs) | Fautes courantes du français courant |
| **CEFLE** | Productions d'apprenants FLE (niveaux CECRL) | Erreurs d'accords, conjugaison, interférences L1 |
| **Lang-8** (sous-ensemble français) | Textes corrigés par la communauté | Variété de niveaux et de types d'erreurs |
| **Corpus manuel Lectura** | Phrases construites couvrant chaque type d'erreur | Couverture systématique (homophones, accords, etc.) |

Évaluer sur un seul corpus risque de biaiser les résultats : un corpus d'apprenants FLE surreprésente les erreurs d'interférence, un corpus de natifs surreprésente les fautes d'inattention et les homophones. La combinaison de plusieurs sources donne une image plus fiable des forces et faiblesses de chaque correcteur.

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

## Licence

AGPL-3.0 (non commerciale) — licence commerciale sur demande : [nous contacter]({{ '/contact/' | relative_url }})
