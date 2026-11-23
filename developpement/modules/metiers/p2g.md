---
title: Pipeline P2G
layout: default
permalink: /developpement/modules/metiers/p2g/
redirect_from:
  - /solutions/modules/p2g/
---

> **Génération v0, gratuite.** Ce module fait partie de la première génération de Lectura : code sous AGPL-3.0, modèles sous CC BY-NC 4.0 (téléchargés depuis Hugging Face au premier usage, puis hors ligne, sans clé). Usage commercial : compris dans toute licence Lectura v1, ou sur demande. Voir [Génération v0]({{ '/developpement/modules/v0/' | relative_url }}).

<div class="module-header">
  <h1>Pipeline P2G</h1>
  <p class="module-tagline">Phonétique IPA → texte français — pipeline complet : graphémiseur, formules, cohérence morphologique, noms propres</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-p2g/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/P2G-Pipeline" class="module-badge">GitHub</a>
    <a href="https://huggingface.co/lecturaworld/lectura-p2g-v0" class="module-badge">Hugging Face</a>
    <code class="module-install">pip install lectura-p2g</code>
  </div>
</div>

## Présentation

Le pipeline P2G reconstruit du texte français à partir de phonétique IPA. C'est le miroir du [pipeline G2P]({{ '/developpement/modules/metiers/g2p/' | relative_url }}).

### Architecture en deux couches

| Couche | Paquet | Contenu |
|--------|--------|---------|
| **Couche 1** | `lectura-graphemiseur` | Modèle P2G (poids téléchargés au premier usage) |
| **Couche 2** | `lectura-p2g` | Pipeline complet : graphémiseur + formules + cohérence morphologique + noms propres |

### Pipeline

```
Phonèmes IPA (mots séparés)
         │
         ▼
┌──────────────────────┐
│ Graphémiseur (V7)     │  BiLSTM + attention croisée + lex_select
│                        │  → orthographe + POS + morpho
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ Formules              │  nombres, sigles, dates
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ Cohérence morpho      │  accords, accents
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ Noms propres          │  reconnaissance des noms propres
└────────┬─────────────┘
         │
         ▼
  Texte français orthographié
```

### Briques utilisées

| Brique | Paquet | Rôle dans le pipeline |
|--------|--------|-----------------------|
| [Graphémiseur]({{ '/developpement/modules/outils/graphemiseur/' | relative_url }}) | `lectura-graphemiseur` | Modèle P2G (IPA → orthographe) |
| [Formules]({{ '/developpement/modules/outils/formules/' | relative_url }}) | `lectura-formules` | Nombres, sigles, dates |
| [Lexique]({{ '/developpement/modules/outils/lexique/' | relative_url }}) | `lectura-lexique` | Lexique utilisé par le pipeline |
| [Aligneur-Syllabeur]({{ '/developpement/modules/outils/aligneur/' | relative_url }}) | `lectura-aligneur` | Alignement graphème-phonème (option `[aligneur]`) |

---

## Exemple de code

```python
from lectura_p2g import analyser, creer_engine

engine = creer_engine()   # premier appel : télécharge les poids (36,6 Mo)
result = analyser(["le", "ɑ̃fɑ̃", "ʒu"], engine=engine)
print(result["ortho"])
```

### Avec alignement

```python
from lectura_p2g import analyser, creer_engine
from lectura_aligneur import LecturaSyllabeur

engine = creer_engine()
syl = LecturaSyllabeur()
result = analyser(["bɔ̃ʒuʁ"], engine=engine, aligner=syl)
print(result["alignments"][0].syllabes)
```

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="https://lingua.lectura.world/p2g">Essayer le P2G en ligne (génération actuelle) →</a>
</div>

---

## Installation

```bash
pip install lectura-p2g              # pipeline complet
pip install lectura-p2g[aligneur]    # + alignement graphème-phonème
```

---

## Modèles

Tout tourne en local : aucun appel à un serveur Lectura.

Les poids ne sont pas dans les paquets. Au premier usage, `creer_engine()` les télécharge depuis Hugging Face ([lecturaworld/lectura-p2g-v0](https://huggingface.co/lecturaworld/lectura-p2g-v0), 7 fichiers, 36,6 Mo, dont le lexique phonétique `phone_lexicon.db`), vérifie leur empreinte SHA-256 et les range dans `~/.lectura/models/p2g/` (ou `$LECTURA_MODELS_DIR/p2g/`). Ensuite, le module n'utilise plus le réseau.

Avec `LECTURA_HORS_LIGNE=1`, aucun téléchargement n'a lieu : si des poids manquent, l'erreur indique les fichiers attendus et comment les poser à la main.

Le paquet `lectura-p2g` lui-même contient des tables de données (corrections P2G et entités nommées, au format JSON), pas de modèle.

---

## Licence

- **Code** : AGPL-3.0-or-later.
- **Modèle** (poids) : CC BY-NC 4.0, sans usage commercial.
- **Tables de données** (corrections P2G, entités nommées, lexique phonétique `phone_lexicon.db`) : CC BY-SA 4.0, adaptées de GLÀFF, de Lexique 3.83 et du Wiktionnaire ; sources dans le fichier NOTICE de chaque paquet.
- **Usage commercial ou intégration dans un produit fermé** : compris dans toute licence Lectura v1, ou sur demande par la [page Contact]({{ '/contact/' | relative_url }}).
