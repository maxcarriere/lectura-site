---
title: Synthèse vocale (TTS)
layout: default
permalink: /projets/tts/
---

<span class="status-badge status-cours">En cours</span>

## Le projet

Le projet TTS de Lectura développe un système de synthèse vocale adapté à l'apprentissage de la lecture. L'enjeu n'est pas de produire la voix la plus naturelle possible, mais de **prononcer clairement chaque syllabe** pour qu'un apprenant puisse associer ce qu'il voit à ce qu'il entend.

Cela implique des contraintes spécifiques : articulation lente et distincte, possibilité de prononcer des syllabes isolées, synchronisation précise entre texte et audio.

---

## Architecture multi-moteurs

Plutôt qu'un moteur unique, le système intègre **8 moteurs TTS** derrière une interface commune (`TTSEngine`), chacun avec ses caractéristiques :

| Moteur | Type | Qualité | Vitesse | Licence |
|--------|------|---------|---------|---------|
| **Lectura Multi-Speaker** | FastPitch-Lite v6 + HiFi-GAN | Bonne (6 voix, 7 styles) | Rapide | AGPL / Commercial |
| Kokoro-82M | ONNX neural | Bonne | Rapide | Apache 2.0 |
| Piper VITS | Neural léger | Bonne (vitesse lente) | Rapide | MIT |
| MBROLA | Diphones | Correcte | Très rapide | AGPL |
| eSpeak-NG | Formants | Basique | Instantané | GPL v3 |
| Qwen3-TTS | Transformer | Très bonne | Lent (GPU) | Apache 2.0 |
| Chatterbox | Neural 500M | Très bonne | Lent (GPU) | MIT |
| Zonos | Transformer 1.6B | Excellente | Lent (GPU) | Apache 2.0 |

Le moteur **Lectura Multi-Speaker** est le modèle propriétaire du projet : 6 voix françaises (3F + 3M), 8 presets de style, architecture FastPitch-Lite 256D entraînée en deux phases (L1 55K + GAN 20K steps), avec inference ONNX ~50x temps-réel sur CPU. Les autres moteurs sont des intégrations de projets open-source.

---

## TTS concaténatif

En complément de la synthèse fluide (mot ou phrase entière), un moteur de **concaténation syllabique** (`ConcatRenderer`) assemble des syllabes pré-synthétisées pour produire un audio pédagogique où chaque syllabe est distinctement articulée.

5 modes de rendu :
- **word_by_word** : chaque mot synthétisé séparément
- **fluid** : phrase complète, prosodie naturelle
- **prosodic** : phrase avec modulation prosodique (pitch, durée, jitter)
- **sliced** : syllabes découpées dans l'audio du mot entier
- **isolated** : chaque syllabe synthétisée indépendamment

---

## P2G (Phonème → Graphème)

Pour synthétiser une syllabe isolée (ex : /tʁa/), il faut d'abord la convertir en orthographe (« tra ») car les moteurs TTS attendent du texte écrit. Le module P2G résout ce problème avec une table de 3 493 syllabes (62 % issues de Lexique383, 38 % par règles de correspondance).

---

## Prosodie

Le système intègre un modèle prosodique réaliste :
- Variation de hauteur (pitch) de ±4 demi-tons
- Jitter corrélé entre syllabes successives
- Allongement de la syllabe finale de chaque groupe
- Couplage optimal entre durée et fréquence fondamentale

L'objectif est de produire un audio qui reste naturel même en lecture lente, sans l'effet robotique de la simple concaténation.

---

## État d'avancement

Les 8 moteurs sont intégrés et fonctionnels. Le moteur concaténatif avec P2G fonctionne avec n'importe quel backend TTS. La prosodie est opérationnelle.

Le modèle multi-speaker propriétaire (v6) est en production : 6 voix, 8 styles, export ONNX FP32 + INT8, disponible via API et en local.

Les travaux en cours portent sur :
- l'amélioration de la qualité des transitions entre syllabes concaténées,
- l'ajout de voix supplémentaires au modèle multi-speaker,
- l'optimisation des temps de chargement des modèles GPU.
