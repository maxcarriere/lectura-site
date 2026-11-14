---
title: "L'écosystème du projet"
layout: default
permalink: /developpement/ecosysteme/
description: "Comment les projets de Lectura s'appuient les uns sur les autres : le lexique, le texte, la voix et les produits, avec la phonétique comme pivot commun."
---

{% comment %} Page créée le 11/11/2026 (structure de Maxime). Faits repris des pages Modules, Données, Lexique et Projets, et de la page 1500 Mots de LecturaLexique. {% endcomment %}

Les projets de Lectura ne sont pas des produits séparés : ils s'appuient les uns sur les autres. Leur pivot commun est la **phonétique**, qui relie le texte écrit et la voix. Chaque projet donne ses propres résultats, nourrit les autres et sert à les vérifier.

{% include schema-ecosysteme.html %}

## Le lexique, socle commun

[LeXiK]({{ '/developpement/lexique/' | relative_url }}), le lexique du français de Lectura, donne pour chaque mot sa prononciation syllabée, son analyse grammaticale, l'alignement de ses lettres sur ses sons et sa fréquence. Il fournit aux modèles leurs données d'entraînement de base pour la phonétique, et il s'est construit en même temps qu'eux : chacun a fait progresser l'autre. Le dictionnaire WiKiLeXiK le relie au Wiktionnaire et à Wikidata ; le module Lexicon l'embarque dans une application. Projet : [LecturaLexique](https://lexique.lectura.world).

## Le texte

Les modules de traitement du texte (NLP-FR et NLP-EN) passent de l'écrit à la phonétique et inversement (G2P, P2G), analysent la grammaire et découpent les syllabes. Le correcteur orthographique en découle : il passe par le son pour retrouver le mot voulu (G2P puis P2G). Projet : [LecturaLingua](https://lingua.lectura.world).

## La voix

La synthèse vocale (TTS) lit des sons plutôt que des lettres : elle reçoit la phonétique produite par les modules de texte. La reconnaissance vocale (STT) fait le chemin inverse, de la voix vers la phonétique puis vers le texte. L'alignement d'un texte sur sa lecture donne les sous-titres et le surlignage synchronisé. Les corpus de parole qui entraînent ces modèles sont eux-mêmes préparés avec les outils de Lectura : transcription phonétique, alignement, filtrage. Projet : [LecturaVoice](https://voice.lectura.world).

## Les produits

Les produits réutilisent ces briques. Les corpus de LecturaLexique (syllabes, mots illustrés) en sont tirés : la phonétique, les syllabes et l'alignement des lettres sur les sons viennent des modules de texte, les données lexicales de LeXiK. Les [applications pédagogiques]({{ '/developpement/projets/applications-pedagogiques/' | relative_url }}) reposent sur la voix et le surlignage synchronisé. Les [programmes de bureau]({{ '/produits/programmes/' | relative_url }}), prototypés en 2026, assemblaient déjà ces briques.

## L'écosystème modulaire {#modules}

{% include schema-modules.html %}

---

## Pour aller plus loin

- [Les modules]({{ '/developpement/modules/' | relative_url }}) : le détail des briques, génération par génération ;
- [Les ressources]({{ '/developpement/ressources/' | relative_url }}) : le lexique, les données et les corpus ;
- [La recherche]({{ '/developpement/recherche/' | relative_url }}) : les axes de recherche et les publications ;
- [Les projets transversaux]({{ '/developpement/projets/' | relative_url }}) : le correcteur et les applications pédagogiques.
