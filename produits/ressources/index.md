---
title: Ressources
layout: default
permalink: /produits/ressources/
---

Corpus, données linguistiques et kits d'entraînement distribués par Lectura. Ces ressources sont le fruit du travail de développement des modules et peuvent servir de base à des projets de recherche, d'éducation ou de développement.

<div class="home-grid">
  <div class="home-card">
    <h2>LeXiK Lite</h2>
    <p>Versions allégées du lexique LeXiK : complète (1,52M entrées) et fréquente (314K entrées). Phonétique IPA, syllabes, orthocode, fréquences, morphologie.</p>
    <span class="status-badge status-dispo">Disponible</span>
    <div class="card-links">
      <a class="more-link" href="#lexik-lite">Détails</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Kit d'entraînement G2P / P2G</h2>
    <p>Corpus annoté (22 649 phrases), lexique aligné (1,16M mots), scripts d'entraînement PyTorch et modèles pré-entraînés pour reproduire les pipelines G2P et P2G de Lectura.</p>
    <span class="status-badge status-dispo">Disponible</span>
    <div class="card-links">
      <a class="more-link" href="#kit-g2p-p2g">Détails</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Corpus de voix</h2>
    <p>880K phrases françaises avec transcription phonétique IPA alignée, issues de Common Voice et LibriVox. Textes et alignements fournis, audio récupérable via les sources ouvertes.</p>
    <span class="status-badge status-dispo">Disponible</span>
    <div class="card-links">
      <a class="more-link" href="#corpus-voix">Détails</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Corpus de syllabes</h2>
    <p>4 307 syllabes + 1 474 de liaison, avec décomposition phonétique et fichiers audio (voix homme et femme, Amazon Polly).</p>
    <span class="status-badge status-dispo">Disponible</span>
    <div class="card-links">
      <a class="more-link" href="#corpus-syllabes">Détails</a>
    </div>
  </div>
</div>

---

## LeXiK Lite {#lexik-lite}

Versions allégées de la base lexicale [LeXiK]({{ '/developpement/lexique/' | relative_url }}) (1,52 million d'entrées), destinées à être embarquées dans des applications ou utilisées comme référence linguistique.

Deux versions sont disponibles selon le niveau de détail :

| Version | Entrées | Contenu | Usage type |
|---------|---------|---------|------------|
| **Complète** | 1 518 155 | Phonétique IPA, syllabes, orthocode, fréquences, morphologie | Recherche, analyse linguistique |
| **Fréquente** | 314 212 | Phonétique IPA, fréquences (mots de fréquence > 0 uniquement) | Embarqué, mobile, lookup rapide |

Format CSV, encodage UTF-8. Un décodeur Multext (`multext_decoder.py`) est inclus pour interpréter les codes morphologiques.

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

Corpus de parole française avec transcription phonétique IPA. Le corpus fournit les textes et les alignements phonétiques. Les fichiers audio ne sont pas redistribués directement : ils sont récupérables via les sources ouvertes d'origine (Common Voice, LibriVox) à l'aide d'un script fourni.

| | |
|---|---|
| **Corpus 1** | 97 012 phrases (Common Voice) — train / val / test |
| **Corpus 2** | 783 339 phrases (LibriVox) — train / val / test |
| **Total** | 880 351 phrases avec transcription IPA alignée |
| **Métadonnées** | Locuteur, durée, source |
| **Script** | Téléchargement automatique des fichiers audio depuis les sources |

---

## Corpus de syllabes {#corpus-syllabes}

Les syllabes les plus fréquentes du français, avec leur décomposition phonétique et des fichiers audio associés.

| | |
|---|---|
| **Syllabes** | 4 307 syllabes (couverture 95% et 99% des occurrences) |
| **Liaison** | 1 474 syllabes de liaison |
| **Décomposition** | Attaque, noyau, coda pour chaque syllabe |
| **Composants** | Phonèmes, éléments de formules (nombres, dates, etc.) |
| **Audio** | Fichiers MP3, voix Polly Lea (femme) et Polly Mathieu (homme) |

---

## Obtenir les ressources {#obtenir}

Les ressources sont distribuées sous forme d'archives zip, téléchargeables via l'API Lectura avec une clé d'accès.

**Fonctionnement :**

1. Contactez-nous pour obtenir une clé API avec accès aux ressources
2. Utilisez l'endpoint `GET /download/{resource_id}` de l'API pour télécharger les archives
3. L'endpoint `GET /download/` liste les ressources disponibles et leurs identifiants

**Authentification :** header `Authorization: Bearer <votre_clé>` — les clés de type « paid » ou « unlimited » donnent accès au téléchargement.

**Tarification :** nous contacter pour connaître les modalités d'accès selon votre usage (recherche, éducation, commercial).

<div class="cta-links" style="margin-top: 1.5rem;">
  <a href="{{ '/contact/' | relative_url }}">Nous contacter</a>
  <a href="https://api.lectura.world/docs#/Downloads" target="_blank">Documentation API</a>
</div>
