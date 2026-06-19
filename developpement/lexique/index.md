---
title: Lexique & Données
layout: default
permalink: /developpement/lexique/
redirect_from:
  - /developpement/ressources/
  - /developpement/ressources/lexik/
  - /developpement/ressources/kit-g2p-p2g/
  - /developpement/ressources/corpus/
  - /solutions/ressources/
  - /solutions/ressources/lexik/
  - /solutions/ressources/kit-g2p-p2g/
---

Corpus, données linguistiques et modèles pré-entraînés qui alimentent les modules Lectura.

---

## LeXiK — Base lexicale

<div class="module-header">
  <p class="module-tagline">1,35 million d'entrées, 25 colonnes — orthographe, morphologie, phonétique, fréquences, sémantique</p>
  <div class="module-links">
    <a href="https://lexique.lectura.world" class="module-badge">lexique.lectura.world</a>
  </div>
</div>

LeXiK est la base lexicale de Lectura : une compilation structurée de sources linguistiques libres, unifiée dans un format unique.

| | |
|---|---|
| **Entrées** | 1 350 000 formes fléchies |
| **Colonnes** | 25 (ortho, lemme, cgram, phone, synonymes, définition...) |
| **Formats** | CSV (213 Mo) et SQLite (optimisé, avec index) |
| **Sources** | Compilation de bases libres (GLAFF, Wiktionnaire, OpenSubtitles...) |

### Contenu détaillé

- **Identification et morphologie** : forme orthographique, lemme, catégorie grammaticale (POS), code Multext, genre, nombre, et pour les verbes : mode, temps, personne
- **Phonétique** : transcription IPA, nombre de syllabes, découpage syllabique et variantes de prononciation
- **Fréquences** : quatre corpus croisés — Frantext (littérature), frWaC (web), OpenSubtitles (oral) et LM10 (textes pour enfants)
- **Sémantique** : synonymes, antonymes, domaine sémantique, définition, registre, étymologie et exemples

### Utilisation avec le module Lexique

LeXiK est directement compatible avec le module [`lectura-lexique`]({{ '/developpement/modules/outils/lexique/' | relative_url }}). Le module reconnaît automatiquement les 25 colonnes et expose toutes ses méthodes :

```python
from lectura_lexique import Lexique

with Lexique("lexique_lectura.db") as lex:
    lex.conjuguer("manger")       # table de conjugaison complète
    lex.rimes("maison")           # mots rimant en -zɔ̃
    lex.synonymes("grand")        # ['abondant', 'adulte', 'ample', ...]
    lex.anagrammes("chien")       # ['chine', 'niche', ...]
    lex.definition("maison")      # ["Bâtiment servant d'habitation."]
    lex.filtrer(cgram="NOM", genre="f", freq_min=100)
```

---

## Kit d'entraînement G2P / P2G

<div class="module-header">
  <p class="module-tagline">Corpus annoté, scripts d'entraînement et modèles pré-entraînés pour le français</p>
</div>

Kit complet pour entraîner et reproduire les modèles [G2P]({{ '/developpement/modules/metiers/g2p/' | relative_url }}) et [P2G]({{ '/developpement/modules/metiers/p2g/' | relative_url }}) de Lectura.

| | |
|---|---|
| **Corpus phrases** | 22 649 phrases annotées (train / dev / test) |
| **Lexique aligné** | 1 163 639 mots avec alignement phone-graphème |
| **Scripts** | Préparation, entraînement, évaluation, export ONNX |
| **Modèles** | G2P unifié (98.5%) + P2G unifié (93.1%) |
| **Taille totale** | ~215 Mo |
| **Sources** | UD French-GSD (CC BY-SA 4.0), GLAFF 1.2.1 (CC BY-SA 3.0), Lexique383 (CC BY-SA 4.0) |

### Corpus de phrases annotées

22 649 phrases du français avec annotation complète pour chaque token :

```json
{
  "sent_id": "fr-ud-train_00001",
  "text": "Les commotions cérébrales sont ...",
  "tokens": [
    {"form": "Les", "pos_tag": "ART:def", "phone": "le", "morpho": {"Number": "Plur"}},
    {"form": "commotions", "pos_tag": "NOM", "phone": "komosjɔ̃", "morpho": {"Gender": "Fem", "Number": "Plur"}}
  ]
}
```

| Split | Phrases | Usage |
|-------|---------|-------|
| Train | 17 968 | Entraînement |
| Dev | 2 969 | Validation / early stopping |
| Test | 1 712 | Évaluation finale |

### Lexique aligné

1 163 639 mots avec alignement caractère par caractère entre phonèmes et graphèmes :

```json
{"ipa": "abaka", "labels": ["a", "b", "a", "c", "a"]}
{"ipa": "ʃɔkɔla", "labels": ["ch", "o", "c", "o", "l", "a", "t_"]}
```

### Scripts d'entraînement

Pipeline complet en Python (PyTorch) :

| Script | G2P | P2G | Rôle |
|--------|:---:|:---:|------|
| `preparer_donnees.py` | ✓ | ✓ | Alignement du corpus et création des splits |
| `entrainer.py` | ✓ | ✓ | Entraînement en 2 phases |
| `evaluer.py` | ✓ | ✓ | Évaluation multi-tâche |
| `exporter.py` | ✓ | ✓ | Export ONNX INT8 + poids JSON (NumPy) |

**Entraînement en 2 phases :**
1. **Pré-entraînement** sur le lexique aligné (1M mots isolés, 30 epochs)
2. **Fine-tuning multi-tâche** sur les phrases (G2P/P2G + POS + morphologie + liaison, 80 epochs avec early stopping)

### Modèles pré-entraînés

| Modèle | Tâches | ONNX INT8 | Poids JSON |
|--------|--------|-----------|------------|
| **G2P unifié** | G2P + POS + morphologie + liaison | 1.8 Mo | 18 Mo |
| **P2G unifié** | P2G + POS + morphologie | 2.6 Mo | 26 Mo |

---

## Corpus d'entraînement

<span class="status-badge status-avenir">À venir</span>

Documentation des corpus d'entraînement utilisés par les modèles Lectura : données audio, corpus textuels annotés, et jeux de données de validation.

---

## Obtenir les données {#obtenir}

LeXiK et le kit G2P/P2G ne sont pas encore distribués publiquement. Si vous êtes intéressé pour un projet de recherche, un outil éducatif ou un produit commercial, contactez-nous :

<a href="mailto:admin@lectura.world" class="module-badge">admin@lectura.world</a>
