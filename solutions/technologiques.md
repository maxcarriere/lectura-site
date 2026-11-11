---
title: Solutions technologiques
layout: default
permalink: /solutions/technologiques/
description: "La technologie de Lectura : la phonétique comme passerelle entre l'écrit et l'oral, des données lexicales et vocales, des modèles neuronaux spécialisés."
---

La technologie de Lectura traite le français (et de plus en plus l'anglais) de l'écrit jusqu'à la voix. Elle repose sur trois choix.

## La phonétique, passerelle entre l'écrit et l'oral

Nos briques de lecture et de voix passent par la même étape : la **transcription phonétique**. Le texte est d'abord converti en sons (G2P), puis les sons en voix ; dans l'autre sens, la voix est transcrite en sons, puis les sons en texte (P2G). Ce passage commun relie des tâches que l'on traite d'habitude séparément : l'analyse du texte, la synthèse vocale, la reconnaissance vocale.

Il apporte aussi une précision utile à la lecture : chaque son produit ou reconnu est daté. On peut donc surligner le texte en même temps que la voix, mot par mot ou syllabe par syllabe. L'approche est expliquée dans [le point de vue phonétique]({{ '/articles/le-point-de-vue-phonetique/' | relative_url }}).

## Des données lexicales et vocales

Le socle est **LeXiK**, notre lexique du français : orthographe, prononciation, syllabes, alignement des lettres et des sons, analyse grammaticale, fréquences. Il est publié sous licence libre et sert à la fois aux modèles et aux produits. Les modèles vocaux s'entraînent sur des corpus de parole publics, préparés et transcrits par nos propres outils : voir [Données]({{ '/developpement/donnees/' | relative_url }}).

## Des modèles neuronaux spécialisés

Plutôt qu'un seul grand modèle, Lectura assemble des modèles neuronaux spécialisés, chacun pour une tâche : phonémisation, analyse grammaticale, synthèse, reconnaissance. Ils sont conçus pour tourner sans carte graphique, ce qui permet de les embarquer dans une application.

La génération actuelle (v1) est en service sur nos serveurs et se teste par les démos. La génération suivante (v2), en préparation, porte sur la voix, en français et en anglais. La première génération (v0) reste publiée sous licence AGPL-3.0 : voir [Modules]({{ '/developpement/modules/' | relative_url }}).

## Ce que la technologie apporte

<div class="home-grid">
  <div class="home-card">
    <h2>Analyse du langage</h2>
    <p>Tokenisation, analyse grammaticale, phonémisation, graphémisation, syllabation, lecture des nombres et des formules.</p>
    <a class="more-link" href="{{ '/solutions/analyse-langage/' | relative_url }}">Découvrir</a>
  </div>
  <div class="home-card">
    <h2>Synthèse vocale</h2>
    <p>Six voix de synthèse françaises, avec le surlignage synchronisé du texte lu.</p>
    <a class="more-link" href="{{ '/solutions/synthese-vocale/' | relative_url }}">Découvrir</a>
  </div>
  <div class="home-card">
    <h2>Reconnaissance vocale</h2>
    <p>La transcription de la parole, en phonétique puis en orthographe.</p>
    <a class="more-link" href="{{ '/solutions/reconnaissance-vocale/' | relative_url }}">Découvrir</a>
  </div>
  <div class="home-card">
    <h2>Lexique</h2>
    <p>LeXiK et le dictionnaire WiKiLeXiK : formes, prononciation, morphologie, définitions.</p>
    <a class="more-link" href="{{ '/solutions/lexique/' | relative_url }}">Découvrir</a>
  </div>
</div>

Les démos sont sur [LecturaLingua](https://lingua.lectura.world) (l'écrit) et [LecturaVoice](https://voice.lectura.world) (la voix). Pour utiliser ces briques dans un produit : [offre aux entreprises]({{ '/offres/entreprises/' | relative_url }}).
