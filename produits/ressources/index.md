---
title: Ressources
layout: default
permalink: /produits/ressources/
---

Corpus, données linguistiques et kits d'entraînement distribués par Lectura. Ces ressources sont le fruit du travail de développement des modules et peuvent servir de base à des projets de recherche, d'éducation ou de développement.

<div class="home-grid">
  <div class="home-card">
    <h2>LeXiK Lite</h2>
    <p>Versions allégées du lexique LeXiK (1,35M entrées), adaptées à l'embarqué et à l'intégration dans des applications. Plusieurs niveaux de couverture disponibles, du plus complet (syllabes, orthocode) au plus léger (uniquement les mots fréquents).</p>
    <span class="status-badge status-cours">En préparation</span>
    <div class="card-links">
      <a class="more-link" href="#lexik-lite">Détails</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Kit d'entraînement G2P / P2G</h2>
    <p>Corpus annoté (22 649 phrases), lexique aligné (1,16M mots), scripts d'entraînement PyTorch et modèles pré-entraînés pour reproduire les pipelines G2P et P2G de Lectura.</p>
    <span class="status-badge status-cours">En préparation</span>
    <div class="card-links">
      <a class="more-link" href="#kit-g2p-p2g">Détails</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Corpus de voix</h2>
    <p>Corpus de parole française avec transcription phonétique IPA alignée. Les textes et alignements sont fournis directement, les fichiers audio sont récupérables via les sources ouvertes (Common Voice, LibriVox).</p>
    <span class="status-badge status-cours">En préparation</span>
    <div class="card-links">
      <a class="more-link" href="#corpus-voix">Détails</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Corpus de syllabes</h2>
    <p>Les syllabes les plus fréquentes du français (couverture 95% et 99%), avec leurs attaques, codas, phonèmes et éléments de formules. Inclut les fichiers audio (voix homme et femme).</p>
    <span class="status-badge status-cours">En préparation</span>
    <div class="card-links">
      <a class="more-link" href="#corpus-syllabes">Détails</a>
    </div>
  </div>
</div>

---

## LeXiK Lite {#lexik-lite}

Versions allégées de la base lexicale [LeXiK]({{ '/developpement/lexique/' | relative_url }}) (1,35 million d'entrées), destinées à être embarquées dans des applications ou utilisées comme référence linguistique.

Plusieurs versions sont envisagées selon le niveau de détail :

| Version | Contenu | Usage type |
|---------|---------|------------|
| **Complète** | Phonétique IPA, syllabes, orthocode, fréquences, morphologie | Recherche, analyse linguistique |
| **Standard** | Phonétique IPA, syllabes, fréquences | Intégration dans des applications |
| **Minimale** | Phonétique IPA, fréquences (mots freq > 0 uniquement) | Embarqué, mobile, lookup rapide |

Le format de distribution est en cours de définition.

---

## Kit d'entraînement G2P / P2G {#kit-g2p-p2g}

Kit complet pour entraîner et reproduire les modèles [G2P]({{ '/developpement/modules/metiers/g2p/' | relative_url }}) et [P2G]({{ '/developpement/modules/metiers/p2g/' | relative_url }}) de Lectura.

| | |
|---|---|
| **Corpus phrases** | 22 649 phrases annotées (train / dev / test) |
| **Lexique aligné** | 1 163 639 mots avec alignement phone-graphème |
| **Scripts** | Préparation, entraînement, évaluation, export ONNX |
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

Le kit fournit les données et les scripts d'entraînement. Les modèles pré-entraînés sont disponibles séparément via les paquets PyPI ([lectura-phonemiseur](https://pypi.org/project/lectura-phonemiseur/), [lectura-graphemiseur](https://pypi.org/project/lectura-graphemiseur/)).

---

## Corpus de voix {#corpus-voix}

Corpus de parole française avec transcription phonétique IPA. Le corpus fournit les textes et les alignements phonétiques. Les fichiers audio ne sont pas redistribués directement : ils sont récupérables via les sources ouvertes d'origine (Common Voice, LibriVox) à l'aide d'un script fourni ou des liens directs.

Ce que le corpus contient :

| | |
|---|---|
| **Textes** | Phrases transcrites et normalisées |
| **Phonétique** | Transcription IPA alignée pour chaque phrase |
| **Métadonnées** | Locuteur, durée, source |
| **Script de récupération** | Téléchargement automatique des fichiers audio depuis les sources |

---

## Corpus de syllabes {#corpus-syllabes}

Les syllabes les plus fréquentes du français, avec leur décomposition phonétique et des fichiers audio associés.

| | |
|---|---|
| **Couverture 95%** | Syllabes couvrant 95% des occurrences en français courant |
| **Couverture 99%** | Syllabes couvrant 99% des occurrences |
| **Décomposition** | Attaque, noyau, coda pour chaque syllabe |
| **Phonèmes** | Inventaire complet des phonèmes du français |
| **Formules** | Éléments de formules (nombres, dates, etc.) |
| **Audio** | Fichiers audio voix homme et voix femme |

Les fichiers audio peuvent être générés avec les voix Lectura via l'API.

---

## Obtenir les ressources {#obtenir}

Ces ressources sont en cours de préparation. Si vous êtes intéressé pour un projet de recherche, un outil éducatif ou un usage commercial, n'hésitez pas à nous contacter pour discuter de vos besoins et des modalités d'accès.

<a href="{{ '/contact/' | relative_url }}" class="module-badge">Nous contacter</a>
