---
title: Données
layout: default
permalink: /developpement/donnees/
description: "Les données sur lesquelles reposent les modèles de Lectura : lexique, textes annotés, corpus de parole publics, et leur préparation."
---

Les modèles de Lectura apprennent sur deux sortes de données : des données écrites (lexique, textes annotés) et de la parole enregistrée. Cette page présente leurs catégories et leurs sources.

## Le lexique

**LeXiK**, notre lexique du français, est compilé à partir de sources libres, corrigé et enrichi : prononciation, syllabes, alignement des lettres et des sons. Il fournit aux modèles leurs données d'entraînement de base pour la phonétique. Le dictionnaire **WiKiLeXiK** y ajoute des données ouvertes : le Wiktionnaire (par l'extraction Kaikki) et Wikidata. Les sources et leurs licences sont détaillées sur [LecturaLexique](https://lexique.lectura.world/licences).

## Les textes annotés

L'analyse grammaticale s'appuie sur des corpus annotés publics, dont les corpus français du projet Universal Dependencies.

## La parole

Les voix de la génération actuelle ont été entraînées sur des corpus de parole publics, dont SIWIS et M-AILABS. La génération suivante, en préparation, rassemble des corpus publics de parole lue et spontanée, en français et en anglais : Common Voice, Multilingual LibriSpeech, VoxPopuli, SUMM-RE, LibriTTS-R ou VCTK, par exemple.

Chaque corpus est rangé avec sa provenance et sa licence. Nous le préparons avec nos propres outils : transcription phonétique, alignement du texte sur l'audio, filtrage des passages mal transcrits. Nos [corpus d'entraînement]({{ '/produits/ressources/corpus-entrainement/' | relative_url }}) sont proposés sur devis ; ce qu'ils peuvent contenir, l'audio en particulier, dépend des licences de leurs sources.

## Ce que Lectura produit

Les données produites par Lectura (le lexique LeXiK, les corpus d'entraînement, les corpus de syllabes et de mots) sont présentées dans [Ressources]({{ '/produits/ressources/' | relative_url }}) et sur [LecturaLexique](https://lexique.lectura.world). Pour un besoin de données particulier, voir le service de [préparation des données]({{ '/solutions/services/preparation-donnees/' | relative_url }}) ou [nous contacter]({{ '/contact/' | relative_url }}).
