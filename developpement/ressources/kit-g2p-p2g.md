---
title: Kit G2P / P2G
layout: default
permalink: /developpement/ressources/kit-g2p-p2g/
redirect_from:
  - /solutions/ressources/kit-g2p-p2g/
---

<div class="module-header">
  <h1>Kit d'entraînement G2P / P2G</h1>
  <p class="module-tagline">Corpus annoté, scripts d'entraînement et modèles pré-entraînés pour le français</p>
</div>

## Présentation

Kit complet pour entraîner et reproduire les modèles [G2P]({{ '/developpement/modules/metiers/g2p/' | relative_url }}) (graphème vers phonème) et [P2G]({{ '/developpement/modules/metiers/p2g/' | relative_url }}) (phonème vers graphème) de Lectura. Contient les données, les scripts et les modèles exportés.

| | |
|---|---|
| **Corpus phrases** | 22 649 phrases annotées (train / dev / test) |
| **Lexique aligné** | 1 163 639 mots avec alignement phone-graphème |
| **Scripts** | Préparation, entraînement, évaluation, export ONNX |
| **Modèles** | G2P unifié (98.5%) + P2G unifié (93.1%) |
| **Taille totale** | ~215 Mo |
| **Sources** | UD French-GSD (CC BY-SA 4.0), GLAFF 1.2.1 (CC BY-SA 3.0), Lexique383 (CC BY-SA 4.0) |
| **Licence** | À définir — [nous contacter](#obtenir-le-kit) |

---

## Contenu du kit

### 1. Corpus de phrases annotées

22 649 phrases du français avec annotation complète pour chaque token :

```json
{
  "sent_id": "fr-ud-train_00001",
  "text": "Les commotions cérébrales sont ...",
  "tokens": [
    {"form": "Les", "pos_tag": "ART:def", "phone": "le", "morpho": {"Number": "Plur"}},
    {"form": "commotions", "pos_tag": "NOM", "phone": "komosjɔ̃", "morpho": {"Gender": "Fem", "Number": "Plur"}},
    ...
  ]
}
```

| Split | Phrases | Usage |
|-------|---------|-------|
| Train | 17 968 | Entraînement |
| Dev | 2 969 | Validation / early stopping |
| Test | 1 712 | Évaluation finale |

Source : Universal Dependencies French-GSD, enrichi avec phonétique IPA et liaisons.

### 2. Lexique aligné

1 163 639 mots avec alignement caractère par caractère entre phonèmes et graphèmes :

```json
{"ipa": "abaka", "labels": ["a", "b", "a", "c", "a"]}
{"ipa": "ʃɔkɔla", "labels": ["ch", "o", "c", "o", "l", "a", "t_"]}
```

Le label `_CONT` marque les continuations dans les séquences multi-caractères (ex: "ch", "ou", "ss").

| Split | Entrées | Usage |
|-------|---------|-------|
| Train | 1 062 225 | Pré-entraînement sur mots isolés |
| Eval | 101 414 | Évaluation hors vocabulaire |

Sources : GLAFF 1.2.1 + Lexique383, phonétiquement alignés.

### 3. Scripts d'entraînement

Pipeline complet en Python (PyTorch) pour les deux directions :

| Script | G2P | P2G | Rôle |
|--------|:---:|:---:|------|
| `preparer_donnees.py` | ✓ | ✓ | Alignement du corpus et création des splits |
| `entrainer.py` | ✓ | ✓ | Entraînement en 2 phases |
| `evaluer.py` | ✓ | ✓ | Évaluation multi-tâche |
| `exporter.py` | ✓ | ✓ | Export ONNX INT8 + poids JSON (NumPy) |

**Entraînement en 2 phases :**
1. **Pré-entraînement** sur le lexique aligné (1M mots isolés, 30 epochs)
2. **Fine-tuning multi-tâche** sur les phrases (G2P/P2G + POS + morphologie + liaison, 80 epochs avec early stopping)

### 4. Modèles pré-entraînés

Deux modèles multi-tâches inclus, chacun au format ONNX INT8 et poids JSON :

| Modèle | Tâches | ONNX INT8 | Poids JSON |
|--------|--------|-----------|------------|
| **G2P unifié** | G2P + POS + morphologie + liaison | 1.8 Mo | 18 Mo |
| **P2G unifié** | P2G + POS + morphologie | 2.6 Mo | 26 Mo |

Tables de vocabulaire et corrections incluses.

---

## Architecture des modèles

```
Entrée → Char Embedding (64d) → Shared BiLSTM (2×160h → 320d)
                                        |
                    +-------------------+-------------------+
                    v                                       v
              Tête G2P/P2G (par char)          Word BiLSTM (128h → 256d)
              Linear(320 → n_classes)                  |
                                    +------+------+------+------+
                                   POS   Genre  Nombre  Mode  Temps ...
```

- **1.75M paramètres** (G2P) / **2.1M paramètres** (P2G)
- Entraînement : ~90 min sur GPU (phase 1 + phase 2)
- 3 backends d'inférence : ONNX Runtime (~2 ms), NumPy (~50 ms), pur Python (~200 ms)

---

## Performances

### G2P — Graphème vers Phonème

| Tâche | Métrique | Score |
|-------|----------|-------|
| **G2P** | Accuracy (par mot) | 98.5% |
| **G2P** | PER (Phoneme Error Rate) | 0.54% |
| **POS** | Accuracy | 98.2% |
| **Liaison** | F1 macro | 90.6% |
| **Morphologie** | Accuracy | 94–99% |

### P2G — Phonème vers Graphème

| Tâche | Métrique | Score |
|-------|----------|-------|
| **P2G** | Accuracy (par mot) | 93.1% |
| **P2G** | CER (Character Error Rate) | 2.19% |
| **POS** | Accuracy | 97.0% |
| **Morphologie** | Accuracy | 92–97% |

*Mesurées sur le split test (1 712 phrases, ~25 000 mots en contexte).*

---

## Obtenir le kit {#obtenir-le-kit}

Le kit d'entraînement G2P/P2G n'est pas encore distribué publiquement. Si vous êtes intéressé pour reproduire les modèles, entraîner sur vos propres données ou adapter les modèles à votre usage, contactez-nous :

<a href="mailto:admin@lectura.world" class="module-badge">admin@lectura.world</a>
