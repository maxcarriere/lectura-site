---
title: Pipeline G2P
layout: default
permalink: /developpement/modules/metiers/g2p/
redirect_from:
  - /solutions/modules/g2p/
---

> **Génération v0, gratuite.** Ce module fait partie de la première génération de Lectura : code sous AGPL-3.0, modèles sous CC BY-NC 4.0 (téléchargés depuis Hugging Face au premier usage, puis hors ligne, sans clé). Usage commercial : compris dans toute licence Lectura v1, ou sur demande. Voir [Génération v0]({{ '/developpement/modules/v0/' | relative_url }}).

<div class="module-header">
  <h1>Pipeline G2P</h1>
  <p class="module-tagline">Texte français → phonétique IPA — pipeline complet : tokenisation, formules, phonémiseur neuronal, groupes de lecture, syllabation en option</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-g2p/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/G2P-Pipeline" class="module-badge">GitHub</a>
    <a href="https://huggingface.co/lecturaworld/lectura-g2p-v0" class="module-badge">Hugging Face</a>
    <code class="module-install">pip install lectura-g2p</code>
  </div>
</div>

## Présentation

Le pipeline G2P transforme un texte brut en phonétique IPA. Il assemble le tokeniseur, le lecteur de formules et le phonémiseur neuronal, puis construit les groupes de lecture. Avec l'option `[aligneur]`, il aligne aussi graphèmes et phonèmes et découpe en syllabes.

Le [Phonémiseur]({{ '/developpement/modules/outils/phonemiseur/' | relative_url }}) seul part de tokens ; le pipeline part du texte.

### Pipeline

```
Texte brut
    │
    ▼
┌──────────────────┐
│ Tokeniseur        │  normalisation + détection des formules
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
│ Groupes de lecture│  élisions, liaisons, enchaînements
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Aligneur-Syllabeur│  (option [aligneur]) alignement + syllabation
└────────┬─────────┘
         │
         ▼
  Phonétique IPA, catégories, liaisons, groupes, syllabes
```

### Briques utilisées

| Brique | Paquet | Rôle dans le pipeline |
|--------|--------|-----------------------|
| [Tokeniseur]({{ '/developpement/modules/outils/tokeniseur/' | relative_url }}) | `lectura-tokeniseur` | Normalisation et détection des formules |
| [Formules]({{ '/developpement/modules/outils/formules/' | relative_url }}) | `lectura-formules` | Lecture des formules détectées |
| [Phonémiseur]({{ '/developpement/modules/outils/phonemiseur/' | relative_url }}) | `lectura-phonemiseur` | Modèle G2P, catégories, morphologie, liaisons |
| [Aligneur-Syllabeur]({{ '/developpement/modules/outils/aligneur/' | relative_url }}) | `lectura-aligneur` | Alignement et syllabation (option `[aligneur]`) |
| [Lexique]({{ '/developpement/modules/outils/lexique/' | relative_url }}) | `lectura-lexique` | Lexique utilisé par le Phonémiseur |

---

## Ce qu'il vaut

- **99,1 %** de mots justes en contexte de phrase, sur un corpus de français parlé (ParisStories).
- Les liaisons obligatoires sont faites dans **86 %** des cas.

*Mesures de Lectura, novembre 2026.*

---

## Exemple de code

```python
from lectura_g2p import analyser_phrase, creer_engine

engine = creer_engine()   # premier appel : télécharge les poids (1,9 Mo)

# Texte → mots, phonétique IPA, catégories, liaisons
result = analyser_phrase("Bonjour, il est 14h30.", engine=engine)
print(result.tokens)
print(result.phones)
```

### Phrases IPA (pour la synthèse vocale)

```python
from lectura_g2p import texte_vers_phrases_ipa, creer_engine

engine = creer_engine()
for ipa, type_phrase in texte_vers_phrases_ipa("Bonjour. Comment vas-tu ?", engine=engine):
    print(type_phrase, ipa)
```

### Avec syllabation

```python
from lectura_g2p import analyser_phrase

result = analyser_phrase("Les enfants jouent.", syllabifier=True)   # demande lectura-aligneur
print(result.format_ligne2())
```

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="https://lingua.lectura.world/g2p">Essayer le G2P en ligne (génération actuelle) →</a>
</div>

---

## Installation

```bash
pip install lectura-g2p              # pipeline complet
pip install lectura-g2p[aligneur]    # + alignement graphème-phonème et syllabation
```

| Extra | Contenu |
|-------|---------|
| *(aucun)* | Pipeline G2P complet (tokeniseur + formules + phonémiseur + groupes de lecture) |
| `[aligneur]` | + alignement graphème-phonème et syllabation (`lectura-aligneur`) |

---

## Modèles

Tout tourne en local, avec ONNX Runtime : aucun appel à un serveur Lectura.

Les poids ne sont pas dans les paquets. Au premier usage, `creer_engine()` les télécharge depuis Hugging Face ([lecturaworld/lectura-g2p-v0](https://huggingface.co/lecturaworld/lectura-g2p-v0), 2 fichiers, 1,9 Mo), vérifie leur empreinte SHA-256 et les range dans `~/.lectura/models/g2p/` (ou `$LECTURA_MODELS_DIR/g2p/`). Ensuite, le module n'utilise plus le réseau.

Avec `LECTURA_HORS_LIGNE=1`, aucun téléchargement n'a lieu : si des poids manquent, l'erreur indique les fichiers attendus et comment les poser à la main.

---

## Licence

- **Code** : AGPL-3.0-or-later.
- **Modèle** (poids) : CC BY-NC 4.0, sans usage commercial.
- **Tables de données** des briques (corrections, homographes, sigles) : CC BY-SA 4.0 ; sources dans le fichier NOTICE de chaque paquet.
- **Usage commercial ou intégration dans un produit fermé** : compris dans toute licence Lectura v1, ou sur demande par la [page Contact]({{ '/contact/' | relative_url }}).
