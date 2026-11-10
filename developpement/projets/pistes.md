---
title: Ingénierie des modèles
layout: default
permalink: /developpement/recherche/ingenierie-modeles/
redirect_from:
  - /developpement/projets/pistes/
---

Cette page présente les choix d'architecture retenus pour les modèles neuraux de la première génération de Lectura (v0, juillet 2026), ce qui a fonctionné et ce qui a échoué. La génération actuelle (v1) en a tiré les leçons ; la suivante (v2), en préparation, porte sur la voix, en français et en anglais.

---

## Choix d'architecture

### Le parti pris : des modèles spécialisés et légers

Plutôt que d'utiliser de gros modèles end-to-end, Lectura fait le choix de **modèles spécialisés** pour chaque tâche. Chaque modèle ne résout qu'une partie du problème, ce qui permet d'utiliser des architectures modestes, entraînables sur un seul GPU (RTX 3060).

| Modèle | Architecture | Paramètres | Taille ONNX |
|--------|-------------|------------|-------------|
| [Phonémiseur]({{ '/developpement/modules/outils/phonemiseur/' | relative_url }}) (G2P) | BiLSTM multi-tête | 1,75M | 1,8 Mo |
| [Graphémiseur]({{ '/developpement/modules/outils/graphemiseur/' | relative_url }}) (P2G) | BiLSTM V7 + attention cross + lex_select | 3,2M | 4,4 Mo |
| [Décodeur CTC]({{ '/developpement/modules/outils/ctc/' | relative_url }}) (STT) | CNN-BiGRU-CTC | 13,2M | 49 Mo |
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

Le décodeur acoustique utilise un **frontend CNN** (2 couches convolutives avec stride 2 pour un sous-échantillonnage x4) suivi de **BiGRU** (5 couches, 384 unités bidirectionnelles) et d'une **tête CTC**.

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

- **La prosodie du TTS diphonique.** Le modèle prosodique par règles donne une voix parfois monotone ou incohérente sur les phrases longues (voir [limites du TTS diphonique]({{ '/developpement/recherche/tts-diphonique/' | relative_url }})).

- **Le WER du pipeline STT.** De l'ordre de 15 %, le taux d'erreur mot reste élevé. C'est un résultat honorable pour un si petit modèle, mais il reste une marge d'amélioration non négligeable.
