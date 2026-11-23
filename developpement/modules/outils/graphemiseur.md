---
title: Graphemiseur
layout: default
permalink: /developpement/modules/outils/graphemiseur/
---

> **Génération v0, gratuite.** Ce module fait partie de la première génération de Lectura : code sous AGPL-3.0, modèles sous CC BY-NC 4.0 (téléchargés depuis Hugging Face au premier usage, puis hors ligne, sans clé). Usage commercial : compris dans toute licence Lectura v1, ou sur demande. Voir [Génération v0]({{ '/developpement/modules/v0/' | relative_url }}).

<div class="module-header">
  <h1>Lectura Graphemiseur</h1>
  <p class="module-tagline">Modèle BiLSTM V7 multi-tête — P2G + POS + Morphologie avec attention cross et lex_select</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-graphemiseur/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Graphemiseur" class="module-badge">GitHub</a>
    <a href="https://huggingface.co/lecturaworld/lectura-p2g-v0" class="module-badge">Hugging Face</a>
    <code class="module-install">pip install lectura-graphemiseur</code>
  </div>
</div>

## Présentation

Brique P2G : à partir d'une transcription phonétique IPA, elle reconstruit l'orthographe française. Un seul modèle **BiLSTM char-level multi-tête V7**, avec attention croisée mot-caractère et **lex_select** (choix parmi les candidats phonétiquement compatibles du lexique), prédit en une passe :

| Tâche | Description | Mesure (par mot) |
|-------|-------------|------------------|
| **P2G** | IPA → orthographe | voir le [pipeline P2G]({{ '/developpement/modules/metiers/p2g/' | relative_url }}) |
| **POS** | Étiquetage morphosyntaxique (19 étiquettes) | 98,3 % |
| **Morphologie** | Genre, nombre, temps, mode, personne, forme verbale | 94,7 à 99,7 % |

*Mesures de Lectura sur le jeu de développement (modèle V7).*

Tout tourne **en local**, avec ONNX Runtime (environ 2 ms par phrase sur CPU) : aucun appel à un serveur Lectura.

> **Brique ou chaîne** : le Graphémiseur est le modèle seul (IPA → orthographe). Pour la chaîne complète, avec formules et noms propres, voir le [pipeline P2G]({{ '/developpement/modules/metiers/p2g/' | relative_url }}).

---

## Exemple de code

```python
from lectura_graphemiseur import creer_engine

# Premier appel : télécharge les poids (36,6 Mo) dans ~/.lectura/models/p2g/
engine = creer_engine()

result = engine.analyser(["le", "ɑ̃fɑ̃", "sɔ̃", "aʁive", "a", "la", "mɛzɔ̃"])

print(result["ortho"])   # ['les', 'enfants', 'sont', 'arrives', 'a', 'la', 'maison']
print(result["pos"])     # ['ART:def', 'NOM', 'AUX', 'VER', 'PRE', 'ART:def', 'NOM']
print(result["morpho"])  # {'Number': ['Plur', 'Plur', ...], 'Gender': [...], ...}
```

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="https://lingua.lectura.world/p2g">Essayer la graphémisation en ligne (génération actuelle) →</a>
</div>

---

## Installation

```bash
pip install lectura-graphemiseur    # installe aussi onnxruntime et numpy
```

---

## Modèles

Les poids ne sont pas dans le paquet. Au premier usage, `creer_engine()` télécharge depuis Hugging Face ([lecturaworld/lectura-p2g-v0](https://huggingface.co/lecturaworld/lectura-p2g-v0), 7 fichiers, 36,6 Mo) les poids du modèle et le lexique phonétique `phone_lexicon.db`, vérifie leur empreinte SHA-256 et les range dans `~/.lectura/models/p2g/` (ou `$LECTURA_MODELS_DIR/p2g/`, ou le dossier passé en `models_dir=`). Ensuite, le module n'utilise plus le réseau.

Avec `LECTURA_HORS_LIGNE=1`, aucun téléchargement n'a lieu : si des poids manquent, l'erreur indique les fichiers attendus, leurs empreintes et comment les poser à la main.

---

## Architecture du modèle (V7)

```
Phrase IPA → Char Embedding (64d) → Shared BiLSTM (2x192h → 384d)
                                          |
                  +-----------------------+--------------------+
                  v                                             v
        Word representations              Word repr (384d) + Phone Lex Features (28d)
        (fwd[last] || bwd[first])                          |
                                                 Word BiLSTM (192h → 384d)
                                                       |
                                            +--------------+--------------+
                                           POS        Morpho (x6)    Attention Cross
                                                                    → P2G Head
                                                                    → Lex_Select Head
```

- **Phone_lex_features (28d)** : un vecteur par mot, construit à partir de `phone_lexicon.db` (19 dimensions de catégories, 3 de morphologie, 6 de features lexicales). Sans ce lexique, le modèle fonctionne quand même (features à zéro).
- **Lex_select** : choix de la forme écrite parmi les candidats phonétiquement compatibles du lexique.
- **Post-traitement** : reconnaissance des formules (nombres, sigles, dates, par `lectura-formules`), cohérence morphologique (accords) et accents.

---

## Limites connues

- Le P2G est ambigu par nature pour les homophones (est/et, ses/ces…) ; le contexte de la phrase n'en résout qu'une partie.
- Les marques morphologiques muettes (-s du pluriel, -e du féminin) restent la principale source d'erreur.
- Le modèle ne gère ni la ponctuation ni la casse (l'entrée est de l'IPA pur).
- Les mots hors vocabulaire sont moins bien traités qu'en contexte.

---

## Licence

- **Code** : AGPL-3.0-or-later.
- **Modèle** (poids) : CC BY-NC 4.0, sans usage commercial.
- **Table de données** : le lexique phonétique `phone_lexicon.db`, téléchargé avec les poids, est sous CC BY-SA 4.0 (adapté de GLÀFF, de Lexique 3.83 et du Wiktionnaire ; sources dans le fichier NOTICE du paquet).
- **Usage commercial ou intégration dans un produit fermé** : compris dans toute licence Lectura v1, ou sur demande par la [page Contact]({{ '/contact/' | relative_url }}).
