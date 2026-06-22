---
title: Ingénierie des modèles
layout: default
permalink: /developpement/recherche/ingenierie-modeles/
redirect_from:
  - /developpement/projets/pistes/
---

Cette page présente les choix d'architecture retenus pour les modèles neuraux de Lectura, ce qui a fonctionné, ce qui a échoué, et les pistes d'amélioration à explorer.

---

## Choix d'architecture

### Le parti pris : des modèles spécialisés et légers

Plutôt que d'utiliser de gros modèles end-to-end, Lectura fait le choix de **modèles spécialisés** pour chaque tâche. Chaque modèle ne résout qu'une partie du problème, ce qui permet d'utiliser des architectures modestes, entraînables sur un seul GPU (RTX 3060).

| Modèle | Architecture | Paramètres | Taille ONNX |
|--------|-------------|------------|-------------|
| [Phonémiseur]({{ '/developpement/modules/outils/phonemiseur/' | relative_url }}) (G2P) | BiLSTM multi-tête | 1,75M | 1,8 Mo |
| [Graphémiseur]({{ '/developpement/modules/outils/graphemiseur/' | relative_url }}) (P2G) | BiLSTM V7 + attention cross + lex_select | 3,2M | 4,4 Mo |
| [Décodeur CTC]({{ '/developpement/modules/outils/ctc/' | relative_url }}) (STT) | CNN-BiGRU-CTC | 10,6M | 38 Mo |
| [TTS Mono]({{ '/developpement/modules/outils/tts-mono/' | relative_url }}) | Matcha-Conformer + HiFi-GAN | 17,9M | ~29 Mo |
| [TTS Multi]({{ '/developpement/modules/outils/tts-multi/' | relative_url }}) | FastPitch-Lite v6 + HiFi-GAN | 24,3M | ~40 Mo |

Tous les modèles sont quantifiés en **ONNX INT8** pour le déploiement, ce qui les rend utilisables sur des appareils modestes (smartphone, Raspberry Pi).

### BiLSTM pour le texte

Les modèles textuels (Phonémiseur et Graphémiseur) utilisent des **BiLSTM** (Bidirectional Long Short-Term Memory) au niveau caractère. Ce choix s'est imposé pour plusieurs raisons :

- Le français se traite naturellement caractère par caractère (les correspondances graphème-phonème sont locales avec un contexte limité)
- Les BiLSTM capturent bien le contexte bidirectionnel nécessaire pour les ambiguïtés (« les poules du couvent couvent »)
- L'architecture est suffisamment légère pour tourner en temps réel sur CPU

L'architecture **multi-tête** permet de partager un même encodeur BiLSTM entre plusieurs tâches (G2P, POS tagging, morphologie, liaison), ce qui réduit la taille totale et améliore chaque tâche par apprentissage conjoint.

### CNN-BiGRU-CTC pour l'audio

Le décodeur acoustique utilise un **frontend CNN** (2 couches convolutives avec stride 2 pour un sous-échantillonnage x4) suivi de **BiGRU** (4 couches, 384 unités bidirectionnelles) et d'une **tête CTC**.

Le choix du CTC (Connectionist Temporal Classification) est fondamental : il permet d'aligner automatiquement l'audio et la transcription phonétique sans alignement explicite. Le modèle produit directement des phonèmes IPA, pas du texte. C'est le pipeline P2G qui se charge ensuite de la conversion en texte.

### Conformer pour le TTS

Le modèle TTS monospeaker utilise une architecture **Matcha-Conformer** (Conformer 6 couches, d_model=256) avec **flow-matching ODE-CFM**. Le Conformer combine l'attention (Transformer) et la convolution (CNN), ce qui lui permet de capturer à la fois les dépendances longue distance et les patterns locaux dans la séquence de phonèmes.

---

## Ce qui a fonctionné

- **La factorisation phonétique.** Le fait de passer par une représentation phonétique intermédiaire permet d'entraîner chaque modèle sur des données plus simples et plus homogènes. Le Phonémiseur atteint 98,5 % de précision, le Graphémiseur environ 95 %.

- **L'architecture multi-tête.** Partager un encodeur entre G2P, POS tagging et morphologie améliore toutes les tâches. La détection de liaison (F1 90,6 %) bénéficie directement de l'information grammaticale.

- **L'attention cross mot-caractère (P2G).** Le Graphémiseur V7 utilise un mécanisme d'attention qui projette les représentations de mots sur les positions de caractères. Cela a permis un saut de performance significatif pour la résolution des homophones.

- **Le lex_select (P2G).** Une tête spécialisée qui sélectionne la meilleure forme orthographique parmi les candidats du lexique, plutôt que de générer l'orthographe caractère par caractère. Cela élimine de nombreuses erreurs.

- **Le CTC phonétique.** Produire des phonèmes plutôt que du texte simplifie le problème acoustique (correspondance bijective son/phonème) et le PER atteint 4,34 %, ce qui est compétitif avec des modèles beaucoup plus gros.

---

## Ce qui a échoué ou reste limité

- **La synthèse concaténative par syllabes.** Le corpus n'était pas assez large pour couvrir toutes les syllabes du français (voir [TTS diphonique]({{ '/developpement/recherche/tts-diphonique/' | relative_url }})).

- **La sélection d'unités pour le TTS diphonique.** Les cassures spectrales entre unités sélectionnées dans des contextes différents produisaient un résultat haché. Le moyennage a résolu le problème mais au prix d'un timbre moins naturel.

- **Le WER du pipeline STT.** À environ 15 % en parole conversationnelle, le taux d'erreur mot reste élevé. L'essentiel de l'erreur vient du passage P2G (homophones, accords) et non du décodeur acoustique.

- **La prosodie du TTS diphonique.** Le modèle prosodique par règles donne une voix parfois monotone ou incohérente sur les phrases longues (voir [limites du TTS diphonique]({{ '/developpement/recherche/tts-diphonique/' | relative_url }})).

---

## Pistes à explorer

### Conformer pour le STT, le G2P et le P2G

Les modèles textuels (G2P, P2G) utilisent des BiLSTM et le décodeur acoustique des BiGRU. L'architecture **Conformer**, qui combine attention (Transformer) et convolution (CNN), est déjà utilisée pour le TTS avec de bons résultats. L'étendre aux autres modèles permettrait :

- Pour le **STT** : mieux capturer les patterns locaux et les dépendances longues dans le signal audio, ce qui réduirait le PER.
- Pour le **G2P/P2G** : étendre l'attention à la **phrase complète** plutôt qu'au mot avec un contexte limité. Cela résoudrait mieux les ambiguïtés qui dépendent du contexte lointain (« le fils du directeur est fils unique »).

### GAN adversarial pour le TTS

L'ajout d'un **discriminateur adversarial** (GAN) à l'entraînement du modèle acoustique pourrait améliorer le naturel de la voix synthétisée. Le discriminateur force le modèle à produire des spectrogrammes indistinguables de spectrogrammes réels, ce qui réduit les artefacts de moyennage.

### Augmentation progressive de la taille des modèles

Les modèles actuels sont volontairement petits (1,75M à 24,3M paramètres). Une piste est d'**augmenter progressivement leur taille** pour mesurer le gain en qualité par rapport au coût en ressources. L'objectif n'est pas d'atteindre des tailles massives, mais de trouver le point d'équilibre entre qualité et portabilité.

### Modèle prédictif de prosodie

Remplacer le modèle prosodique par règles du TTS diphonique par un **modèle appris** (réseau de neurones entraîné sur des données prosodiques annotées) permettrait d'obtenir une intonation plus naturelle et plus variée.
