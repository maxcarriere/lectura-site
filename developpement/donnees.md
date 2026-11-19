---
title: "Corpus d'entraînement"
layout: default
permalink: /developpement/donnees/
description: "Les corpus d'entraînement de Lectura : textes annotés en grammaire et en phonétique, parole alignée, et leurs sources publiques."
---

{% comment %} Réécrite le 19/11/2026 (Maxime : uniformiser les ressources sur le schéma de l'écosystème ; LeXiK n'est plus présenté deux fois). Faits repris des pages Corpus de LecturaLingua et LecturaVoice (en ligne le 19/11). Ancienne version : brain anciennes-pages/developpement_donnees_2026-11-19.md. {% endcomment %}

Les modèles de Lectura apprennent sur deux sortes de données : des textes annotés et de la parole enregistrée. Lectura les rassemble à partir de sources publiques, puis les prépare avec ses propres modules : transcription phonétique, syllabes, alignement des lettres et des sons, alignement du texte sur l'audio, filtrage des passages mal transcrits. La phonétique de base vient du lexique [LeXiK]({{ '/developpement/lexique/' | relative_url }}).

## Les textes annotés {#textes}

L'analyse grammaticale s'appuie sur des corpus annotés publics, dont les corpus français du projet Universal Dependencies. Lectura y ajoute la phonétique et l'étend à des phrases qu'elle annote elle-même.

- **Corpus Phrases** : 128 715 phrases françaises avec leur grammaire et leur phonétique (syllabes, liaisons, correspondances lettres-sons) ; 28 715 phrases de six banques Universal Dependencies, dont la grammaire est annotée à la main, et 100 000 phrases annotées par Lectura (œuvres du domaine public, Common Voice, Tatoeba). Disponible sur demande, sur [LecturaLingua](https://lingua.lectura.world/corpus).

## La parole {#parole}

Les voix de la génération actuelle ont été entraînées sur des corpus de parole publics, dont SIWIS. La [génération suivante]({{ '/developpement/modules/v2/' | relative_url }}) rassemble des corpus publics de parole lue et spontanée, en français et en anglais : Common Voice, Multilingual LibriSpeech, VoxPopuli, SUMM-RE, LibriTTS-R ou VCTK, par exemple. Chaque corpus est rangé avec sa provenance et sa licence ; ce qu'un corpus livré peut contenir, l'audio en particulier, dépend des licences de ses sources.

- **Corpus SIWIS aligné** : les annotations de Lectura sur la SIWIS French Speech Synthesis Database (transcription phonétique, alignement des mots et des sons sur l'enregistrement), prêtes pour l'entraînement ; l'audio n'est pas livré, un script le télécharge depuis sa source officielle. Disponible sur demande, sur [LecturaVoice](https://voice.lectura.world/corpus).

## Sur mesure {#sur-mesure}

Lectura prépare aussi vos propres corpus : transcription, phonémisation, alignement (voir les [offres]({{ '/offres/pro/#corpus' | relative_url }}) ou la [page de contact]({{ '/contact/' | relative_url }})).
