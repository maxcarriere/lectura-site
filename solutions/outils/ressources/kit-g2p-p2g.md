---
title: Kit G2P / P2G
layout: default
permalink: /solutions/outils/ressources/kit-g2p-p2g/
---

<div class="module-header">
  <h1>Kit d'entrainement G2P / P2G</h1>
  <p class="module-tagline">Corpus annote, scripts d'entrainement et modeles pre-entraines pour le francais</p>
</div>

## Presentation

Kit complet pour entrainer et reproduire les modeles [G2P]({{ '/solutions/outils/modules/g2p/' | relative_url }}) (grapheme vers phoneme) et [P2G]({{ '/solutions/outils/modules/p2g/' | relative_url }}) (phoneme vers grapheme) de Lectura. Contient les donnees, les scripts et les modeles exportes.

| | |
|---|---|
| **Corpus phrases** | 22 649 phrases annotees (train / dev / test) |
| **Lexique aligne** | 1 163 639 mots avec alignement phone-grapheme |
| **Scripts** | Preparation, entrainement, evaluation, export ONNX |
| **Modeles** | G2P unifie (98.5%) + P2G unifie (93.1%) |
| **Taille totale** | ~215 Mo |
| **Sources** | UD French-GSD (CC BY-SA 4.0), GLAFF 1.2.1 (CC BY-SA 3.0), Lexique383 (CC BY-SA 4.0) |
| **Licence** | A definir — [nous contacter](#obtenir-le-kit) |

---

## Contenu du kit

### 1. Corpus de phrases annotees

22 649 phrases du francais avec annotation complete pour chaque token :

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
| Train | 17 968 | Entrainement |
| Dev | 2 969 | Validation / early stopping |
| Test | 1 712 | Evaluation finale |

Source : Universal Dependencies French-GSD, enrichi avec phonetique IPA et liaisons.

### 2. Lexique aligne

1 163 639 mots avec alignement caractere par caractere entre phonemes et graphemes :

```json
{"ipa": "abaka", "labels": ["a", "b", "a", "c", "a"]}
{"ipa": "ʃɔkɔla", "labels": ["ch", "o", "c", "o", "l", "a", "t_"]}
```

Le label `_CONT` marque les continuations dans les sequences multi-caracteres (ex: "ch", "ou", "ss").

| Split | Entrees | Usage |
|-------|---------|-------|
| Train | 1 062 225 | Pre-entrainement sur mots isoles |
| Eval | 101 414 | Evaluation hors vocabulaire |

Sources : GLAFF 1.2.1 + Lexique383, phonetiquement alignes.

### 3. Scripts d'entrainement

Pipeline complet en Python (PyTorch) pour les deux directions :

| Script | G2P | P2G | Role |
|--------|:---:|:---:|------|
| `preparer_donnees.py` | ✓ | ✓ | Alignement du corpus et creation des splits |
| `entrainer.py` | ✓ | ✓ | Entrainement en 2 phases |
| `evaluer.py` | ✓ | ✓ | Evaluation multi-tache |
| `exporter.py` | ✓ | ✓ | Export ONNX INT8 + poids JSON (NumPy) |

**Entrainement en 2 phases :**
1. **Pre-entrainement** sur le lexique aligne (1M mots isoles, 30 epochs)
2. **Fine-tuning multi-tache** sur les phrases (G2P/P2G + POS + morphologie + liaison, 80 epochs avec early stopping)

### 4. Modeles pre-entraines

Deux modeles multi-taches inclus, chacun au format ONNX INT8 et poids JSON :

| Modele | Taches | ONNX INT8 | Poids JSON |
|--------|--------|-----------|------------|
| **G2P unifie** | G2P + POS + morphologie + liaison | 1.8 Mo | 18 Mo |
| **P2G unifie** | P2G + POS + morphologie | 2.6 Mo | 26 Mo |

Tables de vocabulaire et corrections incluses.

---

## Architecture des modeles

```
Entree → Char Embedding (64d) → Shared BiLSTM (2×160h → 320d)
                                        |
                    +-------------------+-------------------+
                    v                                       v
              Tete G2P/P2G (par char)          Word BiLSTM (128h → 256d)
              Linear(320 → n_classes)                  |
                                    +------+------+------+------+
                                   POS   Genre  Nombre  Mode  Temps ...
```

- **1.75M parametres** (G2P) / **2.1M parametres** (P2G)
- Entrainement : ~90 min sur GPU (phase 1 + phase 2)
- 3 backends d'inference : ONNX Runtime (~2 ms), NumPy (~50 ms), pur Python (~200 ms)

---

## Performances

### G2P — Grapheme vers Phoneme

| Tache | Metrique | Score |
|-------|----------|-------|
| **G2P** | Accuracy (par mot) | 98.5% |
| **G2P** | PER (Phoneme Error Rate) | 0.54% |
| **POS** | Accuracy | 98.2% |
| **Liaison** | F1 macro | 90.6% |
| **Morphologie** | Accuracy | 94–99% |

### P2G — Phoneme vers Grapheme

| Tache | Metrique | Score |
|-------|----------|-------|
| **P2G** | Accuracy (par mot) | 93.1% |
| **P2G** | CER (Character Error Rate) | 2.19% |
| **POS** | Accuracy | 97.0% |
| **Morphologie** | Accuracy | 92–97% |

*Mesurees sur le split test (1 712 phrases, ~25 000 mots en contexte).*

---

## Obtenir le kit {#obtenir-le-kit}

Le kit d'entrainement G2P/P2G n'est pas encore distribue publiquement. Si vous etes interesse pour reproduire les modeles, entrainer sur vos propres donnees ou adapter les modeles a votre usage, contactez-nous :

<a href="mailto:contact@lec-tu-ra.com" class="module-badge">contact@lec-tu-ra.com</a>
