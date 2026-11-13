---
title: Reconnaissance vocale
layout: default
permalink: /solutions/reconnaissance-vocale/
redirect_from:
  - /solutions/stt/
description: "La reconnaissance vocale de Lectura passe par la phonétique : transcription orthographique et phonétique, phonèmes datés, alignement d'un texte sur sa lecture et sous-titres. Un modèle de 13 millions de paramètres, sans carte graphique."
---

{% comment %} Réécrite le 12/11/2026 (Maxime) : capacités de la génération actuelle (v1, CTC v3 en service depuis le 16/10), sans démo (les démos sont sur LecturaVoice). Faits : voice.lectura.world/stt et /sous-titrage (lus le 12/11), brain/lectura/techno/stt/STATE.md. Ancienne version (démo) : brain/lectura/site/anciennes-pages/solutions_reconnaissance-vocale_2026-11-12.md. {% endcomment %}

La reconnaissance vocale de Lectura ne cherche pas à deviner directement des mots. Elle décode d'abord les **phonèmes**, les sons de la langue : il n'y en a qu'une trentaine en français, au lieu de centaines de milliers de formes écrites. L'[analyse du langage]({{ '/solutions/analyse-langage/' | relative_url }}) réécrit ensuite ces sons en orthographe, en réglant les accords et les homophones grâce à la construction de la phrase. Toutes ces capacités se testent sur [LecturaVoice](https://voice.lectura.world/stt).

## Ce qu'elle sait faire

**Transcrire la parole, en sons et en texte.** À partir d'un enregistrement ou de la voix au micro, elle donne la transcription orthographique et la transcription phonétique. Les nombres peuvent être écrits en chiffres ou en lettres.

**Entendre ce qui est réellement prononcé.** Parce qu'elle passe par les sons, la transcription phonétique rend compte de ce que dit le locuteur, et non de ce qu'il aurait dû dire. Pour un enfant qui apprend à lire, c'est précieux : une erreur de lecture reste visible au lieu d'être corrigée en silence.

**Dater chaque son.** Chaque phonème reconnu est daté et accompagné d'un indice de confiance. La relecture de l'audio peut ainsi être surlignée par mot, par syllabe ou par phonème.

**Aligner un texte sur sa lecture.** À partir d'un texte et de sa lecture (une voix enregistrée, une voix de synthèse, un livre audio), chaque mot, syllabe et phonème est daté. On peut alors relire en karaoké, ralentir la lecture, colorer les sons, et exporter des sous-titres (SRT, VTT) ou une ligne de temps.

## Comment c'est construit

Le modèle acoustique, entraîné par Lectura, ne compte que **13 millions de paramètres** et pèse 50 Mo une fois compressé ; il tourne sans carte graphique, ce qui permet de l'embarquer. Un modèle de langue phonétique l'aide à choisir entre les suites de sons possibles, avant le passage à l'orthographe.

## Les mesures

| Mesure (jeu de test FLEURS, que le modèle n'a jamais vu) | Résultat |
|---|---|
| Taux d'erreur sur les mots, chaîne complète | **15,7 %** |
| Pour comparaison : Whisper small (244 millions de paramètres, qui a probablement vu des données de FLEURS à l'entraînement), même mesure | 13,3 % |

La génération actuelle traite le français ; l'anglais est prévu dans la génération suivante.

## À quoi elle sert

- **Apprentissage de la lecture** : écouter un enfant lire, repérer ses erreurs, surligner ce qu'il lit.
- **Sous-titrage** : aligner un texte connu sur son enregistrement, ou transcrire une vidéo ou un podcast.
- **Saisie vocale** : dictée dans une application ou un formulaire, avec les nombres et les dates.
- **Applications embarquées** : une transcription qui tourne sur l'appareil, grâce à la petite taille du modèle.

La documentation de la première génération (v0) reste disponible dans [Développement > Modules]({{ '/developpement/modules/' | relative_url }}). Pour intégrer la reconnaissance vocale dans un produit : [l'offre aux entreprises]({{ '/offres/entreprises/' | relative_url }}) ou [Contact]({{ '/contact/' | relative_url }}).
