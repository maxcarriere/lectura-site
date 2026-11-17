---
title: Phonemiseur
layout: default
permalink: /developpement/modules/outils/phonemiseur/
---

> **Génération v0, gratuite.** Ce module fait partie de la première génération de Lectura : code sous AGPL-3.0, modèles sous CC BY-NC 4.0 (téléchargés depuis Hugging Face au premier usage, puis hors ligne, sans clé). Usage commercial : compris dans toute licence Lectura v1, ou sur demande. Voir [Génération v0]({{ '/developpement/modules/v0/' | relative_url }}).

<div class="module-header">
  <h1>Lectura Phonemiseur</h1>
  <p class="module-tagline">Modèle BiLSTM char-level multi-tête — G2P + POS + Morphologie + Liaison</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-phonemiseur/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Phonemiseur" class="module-badge">GitHub</a>
    <a href="https://huggingface.co/lecturaworld/lectura-g2p-v0" class="module-badge">Hugging Face</a>
    <code class="module-install">pip install lectura-phonemiseur</code>
  </div>
</div>

## Présentation

Brique de phonémisation : un seul modèle **BiLSTM char-level multi-tête** (1,75 million de paramètres, ONNX INT8 = 1,8 Mo) qui prédit en une passe, à partir de tokens français :

| Tâche | Description | Mesure (par mot) |
|-------|-------------|------------------|
| **G2P** | Transcription phonémique IPA | 98,5 % de mots justes |
| **POS** | Étiquetage morphosyntaxique (19 étiquettes) | 98,5 % |
| **Morphologie** | Genre, nombre, temps, mode, personne, forme verbale | 96 à 99,8 % |
| **Liaison** | Liaisons obligatoires et facultatives | F1 90,6 % |

*Mesures de Lectura sur le jeu de développement (modèle V4, avec features lexicales), mots en contexte de phrase. Sur des mots isolés hors vocabulaire, le G2P descend vers 92 %.*

Tout tourne **en local**, avec ONNX Runtime (environ 2 ms par phrase sur CPU) : aucun appel à un serveur Lectura.

> **Brique ou chaîne** : le Phonémiseur est le modèle seul (tokens → prédictions). Pour partir d'un texte brut, avec tokenisation, formules et groupes de lecture (syllabation en option), voir le [pipeline G2P]({{ '/developpement/modules/metiers/g2p/' | relative_url }}).

---

## Exemple de code

```python
from lectura_phonemiseur import creer_engine
from lectura_phonemiseur.tokeniseur import tokeniser

# Premier appel : télécharge les poids (1,9 Mo) dans ~/.lectura/models/g2p/
engine = creer_engine()

tokens = tokeniser("Les enfants sont arrivés à la maison.")
result = engine.analyser(tokens)

print(result["g2p"])      # ['le', 'ɑ̃fɑ̃', 'sɔ̃', 'aʁive', 'a', 'la', 'mɛzɔ̃']
print(result["pos"])      # ['ART:def', 'NOM', 'AUX', 'VER', 'PRE', 'ART:def', 'NOM']
print(result["liaison"])  # ['Lz', 'none', 'Lt', 'none', 'none', 'none', 'none']
print(result["morpho"])   # {'Number': ['Plur', ...], 'Gender': [...], ...}
```

### Séparateurs des mots composés

```python
# IPA plat (par défaut)
result = engine.analyser(["abat-jour", "d'abord"])
print(result["g2p"])  # ['abaʒuʁ', 'dabɔʁ']

# Séparateurs conservés
result = engine.analyser(["abat-jour", "d'abord"], sep_hyphen=True, sep_apos=True)
print(result["g2p"])  # ['aba-ʒuʁ', "d'abɔʁ"]
```

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="https://lingua.lectura.world/g2p">Essayer la phonémisation en ligne (génération actuelle) →</a>
</div>

---

## Installation

```bash
pip install lectura-phonemiseur    # installe aussi onnxruntime et numpy
```

---

## Modèles

Les poids ne sont pas dans le paquet. Au premier usage, `creer_engine()` les télécharge depuis Hugging Face ([lecturaworld/lectura-g2p-v0](https://huggingface.co/lecturaworld/lectura-g2p-v0), 2 fichiers, 1,9 Mo), vérifie leur empreinte SHA-256 et les range dans `~/.lectura/models/g2p/` (ou `$LECTURA_MODELS_DIR/g2p/`, ou le dossier passé en `models_dir=`). Ensuite, le module n'utilise plus le réseau.

Avec `LECTURA_HORS_LIGNE=1`, aucun téléchargement n'a lieu : si des poids manquent, l'erreur indique les fichiers attendus, leurs empreintes et comment les poser à la main.

---

## Corrections et features lexicales

Le post-traitement applique trois niveaux de corrections :

1. **Homographes selon la catégorie** (environ 2 700 entrées) ;
2. **Table de corrections** (environ 3 500 corrections manuelles) ;
3. **Corrections du lexique** (facultatif, environ 30 000 entrées), avec `creer_engine(corrections_lexique=True)`.

Le modèle accepte aussi un vecteur de 24 dimensions par mot, construit à partir d'un lexique de candidats POS. Il est détecté automatiquement si [`lectura-lexique`]({{ '/developpement/modules/outils/lexique/' | relative_url }}) est installé, ou passé par `lexicon_path`. Sans lexique, le modèle fonctionne normalement.

---

## Architecture du modèle (V4)

```
Phrase → Char Embedding (64d) → Shared BiLSTM (2x160h → 320d)
                                        |
                    +-------------------+-------------------+
                    v                                       v
              G2P Head (per-char)         Word repr (320d) + Lex Features (24d)
              Linear(320→40)                        |
                                          Word BiLSTM (128h → 256d)
                                                |
                                    +---+---+---+---+---+---+---+
                                   POS Num Gen VF  Mood Tns Per Liaison
```

---

## Limites connues

- Sur des mots isolés hors vocabulaire, le G2P est moins bon qu'en contexte (environ 92 %).
- La liaison `Lp` est très rare dans les données d'entraînement (F1 = 66,7 %).
- Les noms propres et les néologismes peuvent recevoir des transcriptions approximatives.

---

## Licence

- **Code** : AGPL-3.0-or-later.
- **Modèle** (poids) : CC BY-NC 4.0, sans usage commercial.
- **Tables de données** (corrections, homographes) : CC BY-SA 4.0, adaptées de GLÀFF, de Lexique 3.83 et du Wiktionnaire ; sources dans le fichier NOTICE du paquet.
- **Usage commercial ou intégration dans un produit fermé** : compris dans toute licence Lectura v1, ou sur demande par la [page Contact]({{ '/contact/' | relative_url }}).
