---
title: Kit d'entraînement G2P / P2G
layout: default
permalink: /produits/ressources/kit-g2p-p2g/
---

<span class="status-badge status-dispo">Disponible</span>

Kit complet pour entraîner et reproduire les modèles [G2P]({{ '/developpement/modules/metiers/g2p/' | relative_url }}) et [P2G]({{ '/developpement/modules/metiers/p2g/' | relative_url }}) de Lectura.

| | |
|---|---|
| **Corpus phrases** | 22 649 phrases annotées (train / dev / test) |
| **Lexique aligné** | 1 163 639 mots avec alignement phone-graphème |
| **Scripts** | Préparation, entraînement, évaluation, export ONNX |
| **Sources** | UD French-GSD (CC BY-SA 4.0), GLAFF 1.2.1 (CC BY-SA 3.0), Lexique383 (CC BY-SA 4.0) |

---

## Corpus de phrases annotées

22 649 phrases du français avec annotation complète pour chaque token :

```json
{
  "sent_id": "fr-ud-train_00001",
  "text": "Les commotions cérébrales sont ...",
  "tokens": [
    {
      "form": "Les",
      "pos_tag": "ART:def",
      "phone": "le",
      "liaison": "none",
      "morpho": {"Number": "Plur", "Gender": "_"}
    },
    {
      "form": "commotions",
      "pos_tag": "NOM",
      "phone": "komosjɔ̃",
      "morpho": {"Gender": "Fem", "Number": "Plur"}
    }
  ]
}
```

| Split | Phrases | Usage |
|-------|---------|-------|
| Train | 17 968 | Entraînement |
| Dev | 2 969 | Validation / early stopping |
| Test | 1 712 | Évaluation finale |

Source : UD French-GSD (CC BY-SA 4.0), enrichi phonétiquement par Lectura.

---

## Lexique aligné

1 163 639 mots avec alignement caractère par caractère entre phonèmes et graphèmes :

```json
{"ipa": "abaka", "labels": ["a", "b", "a", "c", "a"]}
{"ipa": "ʃɔkɔla", "labels": ["ch", "o", "c", "o", "l", "a", "t_"]}
```

Sources : GLAFF 1.2.1 (CC BY-SA 3.0), Lexique383 (CC BY-SA 4.0).

---

## Scripts d'entraînement

Pipeline complet en Python (PyTorch) :

| Script | G2P | P2G | Rôle |
|--------|:---:|:---:|------|
| `preparer_donnees.py` | ✓ | ✓ | Alignement du corpus et création des splits |
| `entrainer.py` | ✓ | ✓ | Entraînement en 2 phases |
| `evaluer.py` | ✓ | ✓ | Évaluation multi-tâche |
| `exporter.py` | ✓ | ✓ | Export ONNX INT8 + poids JSON (NumPy) |

### Entraînement en 2 phases

1. **Pré-entraînement** sur le lexique aligné (~1M mots isolés, 30 epochs)
2. **Fine-tuning multi-tâche** sur les phrases (G2P/P2G + POS + morphologie + liaison, 80 epochs avec early stopping)

### Prérequis

- Python 3.10+
- PyTorch 2.0+
- Un GPU avec au moins 6 Go de VRAM (entraîné sur RTX 3060)

### Performances de référence

| Modèle | Tâche principale | Performance |
|--------|-----------------|-------------|
| G2P unifié | Graphème → Phonème | 98,5% précision |
| P2G unifié | Phonème → Graphème | ~95% précision |

Le kit fournit les données et les scripts d'entraînement. Les modèles pré-entraînés sont disponibles séparément via les paquets PyPI ([lectura-phonemiseur](https://pypi.org/project/lectura-phonemiseur/), [lectura-graphemiseur](https://pypi.org/project/lectura-graphemiseur/)).

---

## Sources et licences

- **UD French-GSD** : CC BY-SA 4.0
- **GLAFF 1.2.1** : CC BY-SA 3.0 (Franck Sajous, Nabil Hathout, Basilio Calderone)
- **Lexique383** : CC BY-SA 4.0 (Boris New, Christophe Pallier)

---

## Obtenir cette ressource

Les ressources sont distribuées sous forme d'archives zip, téléchargeables via l'API Lectura avec une clé d'accès.

1. [Contactez-nous]({{ '/contact/' | relative_url }}) pour obtenir une clé API avec accès aux ressources
2. Utilisez l'endpoint `GET /download/{resource_id}` de l'API pour télécharger l'archive
3. L'endpoint `GET /download/` liste les ressources disponibles et leurs identifiants

**Authentification :** header `Authorization: Bearer <votre_clé>` — les clés de type « paid » ou « unlimited » donnent accès au téléchargement.

<div class="cta-links" style="margin-top: 1.5rem;">
  <a href="{{ '/contact/' | relative_url }}">Nous contacter</a>
  <a href="https://api.lectura.world/docs#/Downloads" target="_blank">Documentation API</a>
</div>
