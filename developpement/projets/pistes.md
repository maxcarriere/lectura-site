---
title: Pistes d'amélioration
layout: default
permalink: /developpement/projets/pistes/
---

<span class="status-badge status-avenir">À venir</span>

Idées et chantiers planifiés pour améliorer les modules et l'écosystème Lectura.

---

## Modules existants

- **G2P** : gestion des mots d'emprunt (anglicismes, noms propres étrangers), amélioration de la prédiction des liaisons facultatives
- **P2G** : augmentation du vocabulaire de noms propres, meilleure gestion des néologismes
- **CTC** : réduction du WER (objectif ~10%), ajout de la ponctuation contextuelle, support du bruit ambiant
- **TTS** : voix supplémentaires, expressivité émotionnelle, clonage à partir de 30s d'audio
- **Aligneur** : optimisation pour les mots composés, meilleur support des emprunts

## Nouveaux modules

- **Détection de langue** : identification français/anglais/autre dans les textes mixtes
- **Prosodie** : modèle prédictif de l'intonation (non basé sur des règles)
- **Segmentation audio** : détection des frontières de phrases et de tours de parole

## Infrastructure

- Documentation interactive (notebooks Jupyter intégrés)
- Benchmarks automatisés et publics
- API v2 avec WebSocket pour le streaming TTS/STT
