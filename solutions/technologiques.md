---
title: Solutions technologiques
layout: default
permalink: /solutions/technologiques/
description: "Ce que savent faire les outils de Lectura : analyse du français et de l'anglais écrits, synthèse vocale, reconnaissance vocale et alignement, données lexicales. Des modèles compacts, pensés pour tourner chez le client."
---

{% comment %} Réécrite le 12/11/2026 (Maxime) : pas de démo ici, mais les capacités des outils dans chaque domaine, d'après la génération actuelle (v1) présentée avec ses démos sur les sites projets. Chiffres : page À propos de LecturaLingua, pages de LecturaVoice (lues le 12/11), STATE de techno/tts et techno/stt. Ancienne version : brain/lectura/site/anciennes-pages/solutions_technologiques_2026-11-12.md. Plan voulu : SOLUTIONS-CONTENU.md. {% endcomment %}

Les outils de Lectura traitent la langue de l'écrit jusqu'à la voix, et de la voix jusqu'à l'écrit. Ils ont été construits autour d'un même principe, qui explique à la fois ce qu'ils savent faire et la forme qu'ils prennent.

## Un principe : relier chaque lettre au son qu'elle produit

Au cœur de tous les outils se trouve l'**alignement entre les graphèmes et les phonèmes** : chaque lettre, ou groupe de lettres, est rattachée au son qu'elle produit (*ch* → /ʃ/, *eau* → /o/, *x* muet). Cet alignement est la passerelle entre l'écrit et l'oral. Il permet de prononcer un texte, de le découper en syllabes telles qu'on les entend, de marquer les liaisons et les lettres muettes, et de faire le chemin inverse : réécrire une phrase à partir de sa prononciation.

Ce choix découle d'une volonté de **poser chaque problème au bon niveau**. La synthèse vocale, la reconnaissance vocale, la correction et l'apprentissage de la lecture passent tous par la prononciation : en traitant cette étape une seule fois, et bien, chaque outil hérite du travail des autres. C'est ce qui permet d'obtenir des outils à la fois précis et légers, plutôt qu'un seul grand modèle qui apprendrait tout en même temps.

De là viennent les contraintes que Lectura impose à ses technologies : des **modèles compacts**, de quelques dizaines à quelques centaines de mégaoctets ; un fonctionnement **sans carte graphique**, sur un simple processeur ; des outils **embarquables**, qui tournent chez le client (sur ses serveurs ou dans son application) sans dépendre d'un service distant ; et des **données d'entraînement ouvertes**, dont la provenance et la licence sont connues.

Chacun des domaines qui suivent se teste sur un site projet : l'écrit sur [LecturaLingua](https://lingua.lectura.world), la voix sur [LecturaVoice](https://voice.lectura.world), le lexique sur [LecturaLexique](https://lexique.lectura.world).

---

## Analyse du langage

L'analyse lit un texte comme le ferait un lecteur attentif : elle reconnaît la nature et la fonction de chaque mot, sait comment il se prononce, et peut le réécrire à partir de sa prononciation. Elle fonctionne en **français** et en **anglais**.

- **Analyse grammaticale** : catégorie, lemme, genre, nombre, temps, mode et fonction de chaque mot, avec l'arbre de la phrase. Elle peut partir du texte ou de la seule **phonétique**, ce qui permet de comprendre une phrase dont on ne connaît que la prononciation.
- **De l'écrit à l'oral (G2P)** : la transcription phonétique, avec les syllabes, les liaisons et l'alignement de chaque lettre avec son son. Les nombres, les dates et les sigles sont lus.
- **De l'oral à l'écrit (P2G)** : la phrase réécrite en orthographe correcte à partir de sa prononciation, avec le choix des homophones, les accords et les lettres muettes.
- **Correction** : un correcteur qui lit chaque mot avec son orthographe et sa prononciation, corrige les accords, les conjugaisons et les homophones, et explique chaque correction.
- **Lecture syllabique** : le texte découpé en syllabes, chaque son dans sa couleur, prêt à imprimer.

Le tout repose sur deux modèles neuronaux d'environ 60 Mo à eux deux, avec le lexique embarqué. Sur le français, 99,8 % des mots sont prononcés correctement, et 97,7 % des catégories grammaticales sont justes depuis le texte (97,0 % depuis la seule phonétique).

[Le détail des capacités et des mesures]({{ '/solutions/analyse-langage/' | relative_url }}) · [Essayer sur LecturaLingua](https://lingua.lectura.world)

---

## Synthèse vocale

La synthèse vocale lit un texte français à voix haute, en s'appuyant sur l'analyse du langage pour savoir comment prononcer chaque mot. Comme elle lit des sons et non des lettres, elle sait exactement à quel moment chaque son est prononcé.

- **Six voix**, trois féminines et trois masculines, et **sept styles** de lecture (neutre, narratif, dialogue, expressif, méditatif, rapide, lent).
- **Trois moteurs** : un moteur à plusieurs voix, un moteur à une voix de haute qualité, et un moteur par concaténation pensé pour la pédagogie, qui prononce chaque syllabe distinctement.
- **Surlignage synchronisé** du texte lu, mot par mot ou syllabe par syllabe, et trois modes de lecture : fluide, mot à mot, syllabe par syllabe.
- **Changement de timbre**, pour varier une voix (homme, enfant).

Les modèles tournent sans carte graphique. Relue par la reconnaissance vocale, la voix de synthèse est comprise avec un taux d'erreur sur les sons compris entre 1,1 % et 3,0 % selon les voix.

[Le détail des capacités]({{ '/solutions/synthese-vocale/' | relative_url }}) · [Écouter sur LecturaVoice](https://voice.lectura.world/tts)

---

## Reconnaissance vocale et alignement

La reconnaissance vocale de Lectura ne devine pas directement des mots : elle décode d'abord les **phonèmes**, une trentaine en français, puis l'analyse du langage les réécrit en orthographe, en réglant les accords et les homophones par la construction de la phrase. Cette étape phonétique a un avantage précieux pour l'apprentissage : elle entend ce qui est réellement prononcé, y compris les erreurs de lecture.

- **Transcription** orthographique et phonétique d'un enregistrement ou de la voix au micro, avec les nombres en chiffres ou en lettres.
- **Phonèmes datés**, avec un indice de confiance, et surlignage synchronisé par mot, syllabe ou phonème.
- **Alignement d'un texte sur sa lecture** (une voix, une voix de synthèse, un livre audio) : chaque mot, syllabe et phonème est daté, ce qui permet la lecture en karaoké, la lecture ralentie et l'export de sous-titres (SRT, VTT).

Le modèle acoustique ne compte que 13 millions de paramètres (50 Mo) et tourne sans carte graphique. Sur le jeu de test FLEURS, qu'il n'a jamais vu, il fait 15,7 % d'erreurs de mots ; à titre de comparaison, Whisper small, environ vingt fois plus gros (et qui a probablement vu ces données à l'entraînement), en fait 13,3 % sur la même mesure.

[Le détail des capacités]({{ '/solutions/reconnaissance-vocale/' | relative_url }}) · [Essayer sur LecturaVoice](https://voice.lectura.world/stt)

---

## Données

Tous ces outils reposent sur des données que Lectura a construites, corrigées et préparées lui-même.

- **LeXiK**, le lexique du français : près de 2,9 millions d'entrées, avec pour chacune sa prononciation syllabée, son analyse grammaticale, l'alignement des lettres et des sons et sa fréquence, dont plus de 400 000 noms propres prononcés. Il est publié sous licence libre sur [ORTOLANG](https://hdl.handle.net/11403/lexik), et consultable dans le dictionnaire [WiKiLeXiK](https://lexique.lectura.world/wikilexik), qui le relie au Wiktionnaire et à Wikidata.
- **Les corpus d'entraînement** : des corpus de parole publics, transcrits en phonétique par l'analyse du langage de Lectura et alignés sur l'audio, et de grands corpus de texte annotés. Disponibles sur demande (devis).
- **Des ressources dérivées**, sous licence : un corpus des syllabes du français avec leur son, un corpus de mots illustrés, sur [LecturaLexique](https://lexique.lectura.world).

[Le lexique en détail]({{ '/solutions/lexique/' | relative_url }}) · [Les données côté développement]({{ '/developpement/donnees/' | relative_url }})

---

Pour utiliser ces outils dans un produit, sous licence et chez vous : [l'offre aux entreprises]({{ '/offres/entreprises/' | relative_url }}).
