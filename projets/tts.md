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

Plutôt qu'un moteur unique, le système intègre **7 moteurs TTS** derrière une interface commune (`TTSEngine`), chacun avec ses caractéristiques :

| Moteur | Type | Qualité | Vitesse | Licence |
|--------|------|---------|---------|---------|
| Kokoro-82M | ONNX neural | Bonne | Rapide | Apache 2.0 |
| Piper VITS | Neural léger | Bonne (vitesse lente) | Rapide | MIT |
| MBROLA | Diphones | Correcte | Très rapide | AGPL |
| eSpeak-NG | Formants | Basique | Instantané | GPL v3 |
| Qwen3-TTS | Transformer | Très bonne | Lent (GPU) | Apache 2.0 |
| Chatterbox | Neural 500M | Très bonne | Lent (GPU) | MIT |
| Zonos | Transformer 1.6B | Excellente | Lent (GPU) | Apache 2.0 |

Cette diversité permet de choisir le moteur adapté au contexte : Kokoro ou Piper pour un usage courant, MBROLA pour le temps réel, Zonos pour la meilleure qualité.

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

Les 7 moteurs sont intégrés et fonctionnels. Le moteur concaténatif avec P2G fonctionne avec n'importe quel backend TTS. La prosodie est opérationnelle.

Les travaux en cours portent sur :
- l'amélioration de la qualité des transitions entre syllabes concaténées,
- l'ajout de voix supplémentaires,
- l'optimisation des temps de chargement des modèles GPU.
