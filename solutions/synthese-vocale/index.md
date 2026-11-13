---
title: Synthèse vocale
layout: default
permalink: /solutions/synthese-vocale/
redirect_from:
  - /solutions/tts/
  - /solutions/tts/multispeaker/
  - /solutions/tts/monospeaker/
  - /solutions/tts/diphone/
description: "La synthèse vocale de Lectura : six voix françaises, sept styles, trois moteurs, surlignage synchronisé mot par mot ou syllabe par syllabe, sans carte graphique. Capacités de la génération actuelle."
---

{% comment %} Réécrite le 12/11/2026 (Maxime) : capacités de la génération actuelle (v1, en service depuis le 15/10), sans démo (les démos sont sur LecturaVoice). Faits : voice.lectura.world/tts (lu le 12/11) et brain/lectura/techno/tts/STATE.md. Ancienne version (démos) : brain/lectura/site/anciennes-pages/solutions_synthese-vocale_2026-11-12.md. {% endcomment %}

La synthèse vocale de Lectura lit un texte français à voix haute. Elle ne part pas des lettres mais des sons : le texte passe d'abord par l'[analyse du langage]({{ '/solutions/analyse-langage/' | relative_url }}), qui le prononce mot par mot en tenant compte de la grammaire, des liaisons, des nombres et des sigles. La voix n'a donc pas à apprendre l'orthographe, et l'on sait à chaque instant quel son, quelle syllabe et quel mot sont prononcés. Toutes ces capacités s'écoutent sur [LecturaVoice](https://voice.lectura.world/tts).

## Ce qu'elle sait faire

**Lire avec plusieurs voix et plusieurs styles.** Six voix sont disponibles, trois féminines et trois masculines, et chacune peut lire selon sept styles : neutre, narratif, dialogue, expressif, méditatif, rapide ou lent. On peut ainsi donner une voix à chaque personnage d'une histoire, ou adapter le ton au contenu.

**Choisir entre trois moteurs.** Un moteur à plusieurs voix, décliné en deux modèles (l'un plus soigné, l'autre plus léger) ; un moteur à une seule voix, de haute qualité ; et un moteur expérimental par concaténation de diphones, pensé pour la pédagogie.

**Surligner le texte pendant la lecture.** Chaque son produit est daté. Le texte peut donc être surligné en même temps que la voix, mot par mot ou syllabe par syllabe, et lu selon trois modes : fluide, mot à mot, ou syllabe par syllabe. C'est ce qui en fait un outil d'apprentissage de la lecture, et pas seulement de lecture à voix haute.

**Varier le timbre.** Sur le moteur à une voix et le moteur par diphones, un changement de timbre (issu de la génération précédente) transforme la voix (homme, enfant).

**Lire une prononciation donnée.** La synthèse accepte aussi une entrée directement en phonétique, ce qui permet de contrôler exactement ce qui est prononcé.

## Comment c'est construit

Les moteurs neuronaux reposent sur deux architectures (FastPitch et Matcha-Conformer) et un vocodeur HiFi-GAN, entraînés par Lectura sur des corpus de parole ouverts, transcrits en phonétique par son analyse du langage. Ils tournent sans carte graphique ; le modèle à une voix pèse 127 Mo, le modèle à plusieurs voix 300 Mo.

## Les mesures

Pour mesurer l'intelligibilité, la reconnaissance vocale de Lectura a relu 100 phrases synthétisées : selon la voix et le moteur, le taux d'erreur sur les sons va de **1,1 % à 3,0 %**, et le taux d'erreur sur les mots de **11,9 % à 14,7 %**. La génération actuelle traite le français ; l'anglais est prévu dans la génération suivante.

## À quoi elle sert

- **Apprentissage de la lecture** : lecture syllabe par syllabe, surlignage synchronisé, moteur pédagogique.
- **Livres audio et narration** : plusieurs voix et plusieurs styles pour les personnages et le récit.
- **Applications éducatives et accessibilité** : lecture à voix haute de tout contenu, avec le contrôle du débit.
- **Applications embarquées** : une synthèse qui tourne chez le client, sans carte graphique ni service distant.

La documentation de la première génération (v0, publiée sur PyPI et GitHub) reste disponible dans [Développement > Modules]({{ '/developpement/modules/' | relative_url }}). Pour intégrer la synthèse vocale dans un produit : [l'offre aux entreprises]({{ '/offres/entreprises/' | relative_url }}) ou [Contact]({{ '/contact/' | relative_url }}).
