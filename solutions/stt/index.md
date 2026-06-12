---
title: STT
layout: default
permalink: /solutions/stt/
---

## Transcrivez l'audio français en texte

Vous avez besoin de transcrire de la parole française en texte ? Le STT de Lectura propose un pipeline léger et performant, comparable à Whisper small avec 10x moins de paramètres.

---

## Ce que Lectura propose

Un pipeline de transcription audio en deux couches : un décodeur CTC phonétique (audio → phones IPA) et un convertisseur P2G (phones → texte orthographique). Le tout en ~43 Mo de modèles, sans GPU.

---

## Bénéfices clés

- **WER ~15%** sur la parole courante, comparable à Whisper small (241M params)
- **10x plus léger** : ~43 Mo de modèles contre 461 Mo pour Whisper small
- **Pipeline phonétique** : exploite la structure du français pour une meilleure précision
- **Reconnaissance des formules** : nombres, dates, sigles détectés automatiquement

---

## Cas d'usage

- **Sous-titrage** : transcription automatique de vidéos et podcasts
- **Saisie vocale** : dictée pour applications et formulaires
- **Analyse de contenu** : indexation et recherche dans des archives audio
- **Applications embarquées** : transcription sur appareil (mobile, IoT) grâce à la taille réduite

---

## Essayer

Le STT est disponible en démo interactive (enregistrement micro ou fichier audio).

<a class="more-link" href="{{ '/developpement/modules/metiers/stt/' | relative_url }}">Documentation technique & démo →</a>

---

## Contact

Pour intégrer le STT dans votre projet : [admin@lectura.world](mailto:admin@lectura.world)
