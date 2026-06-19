---
title: Pipeline G2P
layout: default
permalink: /developpement/modules/metiers/g2p/
redirect_from:
  - /solutions/modules/g2p/
---

<div class="module-header">
  <h1>Pipeline G2P</h1>
  <p class="module-tagline">Texte français → phonèmes IPA — pipeline complet avec tokenisation, formules, liaison et syllabation</p>
  <div class="module-links">
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/G2P" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-g2p</code>
  </div>
</div>

## Présentation

Le pipeline G2P orchestre 5 briques outils pour transformer un texte brut en une transcription phonétique IPA enrichie. Contrairement au [Phonémiseur]({{ '/developpement/modules/outils/phonemiseur/' | relative_url }}) (modèle brut), le pipeline gère la tokenisation, les formules, les groupes de lecture et la syllabation.

### Pipeline

```
Texte brut
    │
    ▼
┌──────────────────┐
│ Tokeniseur        │  normalisation + détection formules
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Formules          │  lecture des nombres, dates, sigles → mots + IPA
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Phonémiseur       │  BiLSTM multi-tête (G2P + POS + morpho + liaison)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Groupes de lecture│  regroupement par élision/liaison/enchaînement
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Aligneur-Syllabeur│  alignement graphème-phonème + syllabation
└────────┬─────────┘
         │
         ▼
  Texte enrichi (phonèmes, syllabes, liaisons, lettres muettes)
```

### Briques utilisées

| Brique | Package | Rôle dans le pipeline |
|--------|---------|----------------------|
| [Tokeniseur]({{ '/developpement/modules/outils/tokeniseur/' | relative_url }}) | `lectura-tokeniseur` | Normalisation + détection de formules |
| [Formules]({{ '/developpement/modules/outils/formules/' | relative_url }}) | `lectura-formules` | Lecture des formules détectées |
| [Phonémiseur]({{ '/developpement/modules/outils/phonemiseur/' | relative_url }}) | `lectura-phonemiseur` | Modèle G2P + POS + liaison |
| [Aligneur-Syllabeur]({{ '/developpement/modules/outils/aligneur/' | relative_url }}) | `lectura-aligneur` | Alignement + syllabation |
| [Lexique]({{ '/developpement/modules/outils/lexique/' | relative_url }}) | `lectura-lexique` | Features lexicales (optionnel) |

---

## G2P vs eSpeak-NG

Le pipeline G2P Lectura se distingue d'eSpeak-NG par sa prise en compte du **contexte phrastique** : le Phonémiseur prédit la prononciation, la catégorie grammaticale, la morphologie et les liaisons en une seule passe. eSpeak-NG phonémise chaque mot isolément, sans désambiguïsation contextuelle (homographes, liaisons).

| | Lectura G2P | eSpeak-NG |
|---|---|---|
| **Contexte** | Phrase complète (BiLSTM) | Mot isolé |
| **Homographes** | Désambiguïsés par POS | Non traités |
| **Liaisons** | Détectées et marquées | Non gérées |
| **Formules** | 15+ types (nombres, dates...) | Limité |
| **Syllabes** | Alignement graphème-phonème | Non disponible |

---

## Exemple de code

```python
from lectura_phonemiseur import creer_engine

engine = creer_engine()   # mode API par défaut (zero config)

result = engine.analyser(["Les", "enfants", "sont", "arrivés", "à", "la", "maison"])

print(result["g2p"])      # ['le', 'ɑ̃fɑ̃', 'sɔ̃', 'aʁive', 'a', 'la', 'mɛzɔ̃']
print(result["pos"])      # ['ART:def', 'NOM', 'AUX', 'VER:pper', 'PRE', 'ART:def', 'NOM']
print(result["liaison"])  # ['Lz', 'none', 'Lt', 'none', 'none', 'none', 'none']
```

### Pipeline complet (texte → structure enrichie)

```python
from lectura_g2p import analyser_texte

result = analyser_texte("Les enfants sont arrivés à la maison.")
# result contient : tokens, phonèmes, POS, liaisons, groupes de lecture, syllabes
```

---

## Installation

```bash
# Pipeline complet
pip install lectura-g2p

# Phonémiseur seul (modèle brut)
pip install lectura-phonemiseur

# Avec backend ONNX local
pip install lectura-phonemiseur[onnx]
```

Par défaut, les modules utilisent l'API Lectura (aucune configuration nécessaire). Pour l'inférence locale, installez les backends optionnels (`lectura-phonemiseur[onnx]`).

---

## Performances

| Tâche | Métrique | Score |
|-------|----------|-------|
| **G2P** | Accuracy (par mot) | 98.5% |
| **POS** | Accuracy | 98.2% |
| **Liaison** | F1 macro | 90.6% |
| **Morphologie** | Accuracy | 95-99% |

*Mesurées sur un corpus de test de phrases françaises complètes (mots en contexte).*
