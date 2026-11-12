---
title: Analyse du langage
layout: default
permalink: /solutions/analyse-langage/
redirect_from:
  - /solutions/nlp/
  - /solutions/nlp/g2p/
  - /solutions/nlp/p2g/
  - /solutions/nlp/aligneur/
  - /solutions/nlp/formules/
description: "L'analyse du français et de l'anglais écrits par Lectura : analyse grammaticale depuis le texte ou la phonétique, transcription phonétique, réécriture de l'orthographe, correction, lecture syllabique. Capacités et mesures de la génération actuelle."
---

{% comment %} Réécrite le 12/11/2026 (Maxime) : capacités de la génération actuelle (v1), sans démo (les démos sont sur LecturaLingua). Chiffres : page À propos de lingua.lectura.world, lue le 12/11. Ancienne version (démos v0) : brain/lectura/site/anciennes-pages/solutions_analyse-langage_2026-11-12.md. {% endcomment %}

L'analyse du langage est la brique sur laquelle reposent tous les outils de Lectura. Elle lit un texte comme le ferait un lecteur attentif : elle reconnaît la nature et la fonction de chaque mot, sait comment il se prononce, et peut le réécrire à partir de sa prononciation. Elle fonctionne en français et en anglais ; en anglais, la phonétique suit l'accent américain et marque l'accent tonique. Toutes ces capacités se testent sur [LecturaLingua](https://lingua.lectura.world).

## Ce qu'elle sait faire

**Analyser une phrase, à partir du texte ou de sa prononciation.** Pour chaque mot, l'analyse donne en une seule passe sa catégorie grammaticale (18 classes), ses traits (genre, nombre, personne, temps, mode… 17 traits), son lemme et sa fonction : le mot dont il dépend et la relation qui les unit (65 relations). Elle reconnaît aussi les amalgames (*au* = *à* + *le*) et les liaisons avec le mot suivant. Sa particularité est de pouvoir partir de la seule phonétique : comme un auditeur, elle comprend une phrase sans en voir l'orthographe.

**Passer de l'écrit à l'oral (G2P).** Le texte est transcrit en alphabet phonétique international, découpé en syllabes, avec ses liaisons, son *h* aspiré et l'alignement de chaque lettre avec le son qu'elle produit. Les nombres, les dates, les heures et les sigles sont lus. La prononciation tient compte de l'analyse : *couvent* ne se lit pas de la même façon selon qu'il est nom ou verbe.

**Passer de l'oral à l'écrit (P2G).** À partir d'une prononciation, la phrase est réécrite en orthographe correcte. Le choix entre homophones (*vers*, *verre*, *vert*…), les accords et les lettres muettes se déduisent de la construction de la phrase. Grâce au lemme, une forme jamais vue s'écrit juste : *ils publient* se construit à partir de *publier*. C'est cette étape qui permet à la reconnaissance vocale de Lectura de passer des sons au texte.

**Corriger.** Le correcteur lit chaque mot avec son orthographe et sa prononciation, et s'appuie sur la construction de la phrase pour corriger ce qui ne s'entend pas : accords, conjugaisons, homophones (*a* / *à*). Chaque correction est expliquée, et un mode automatique ne garde que les corrections sûres. L'anglais est en version préliminaire.

**Préparer la lecture syllabique.** Grâce à l'alignement des lettres et des sons, le texte peut être découpé en syllabes telles qu'on les prononce, chaque son dans sa couleur, les lettres muettes estompées et les liaisons marquées : une page prête à imprimer pour apprendre à lire.

## Comment c'est construit

L'analyse repose sur deux modèles neuronaux compacts, complétés par des algorithmes (découpage du texte, lecture des nombres et des sigles, règles de liaison et de *e* muet) et par le lexique [LeXiK]({{ '/solutions/lexique/' | relative_url }}) :

- un **analyseur de phrase**, qui lit les lettres, les phonèmes ou les deux (21,3 millions de paramètres, 43 Mo), pré-entraîné sur environ 6 millions de phrases puis affiné sur les corpus Universal Dependencies du français ;
- un **modèle de mot**, qui donne la prononciation d'un mot écrit et l'orthographe d'un mot prononcé, toujours sous forme de couples lettres / son alignés (4 millions de paramètres, 8 Mo), entraîné sur LeXiK.

Avec le lexique embarqué, l'ensemble tient dans environ **60 Mo**, sans carte graphique.

## Les mesures

| Mesure | Français | Anglais |
|---|---|---|
| Mots prononcés correctement (texte → phonétique) | 99,8 % | — |
| Mots jamais vus, prononcés correctement | 97,8 % | — |
| Mots réécrits à l'identique après un aller-retour écrit → oral → écrit | 94,3 % | 93,7 % |
| Catégories grammaticales justes, depuis le texte | 97,7 % | 95,0 % |
| Catégories grammaticales justes, depuis la phonétique | 97,0 % | 94,9 % |
| Lemmes justes, depuis le texte | 98,5 % | 98,2 % |
| Fonctions justes (LAS), depuis le texte | 76,7 % | 77,2 % |

Mesures de la génération actuelle, sur les corpus de test Universal Dependencies ; le détail est sur [la page À propos de LecturaLingua](https://lingua.lectura.world/a-propos).

## À quoi elle sert

L'analyse du langage alimente la synthèse vocale (chaque mot est analysé et prononcé avant d'être dit), la reconnaissance vocale (le texte est reconstruit à partir des sons), la correction et les outils d'apprentissage de la lecture. Elle peut aussi servir seule : annoter des corpus pour la recherche, transcrire en phonétique pour les apprenants du français, afficher un texte en syllabes pour les lecteurs en difficulté.

La documentation de la première génération de ces outils (v0, publiée sur PyPI et GitHub) reste disponible dans [Développement > Modules]({{ '/developpement/modules/' | relative_url }}). Pour intégrer l'analyse du langage dans un produit : [l'offre aux entreprises]({{ '/offres/entreprises/' | relative_url }}) ou [Contact]({{ '/contact/' | relative_url }}).
