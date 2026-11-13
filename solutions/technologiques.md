---
title: Solutions technologiques
layout: default
permalink: /solutions/technologiques/
description: "Ce que savent faire les outils de Lectura, chiffres à l'appui : analyse du français et de l'anglais, synthèse vocale, reconnaissance vocale, lexique. Des modèles compacts, qui tournent sans carte graphique."
---

{% comment %} Réécrite le 13/11/2026 sur le plan de Maxime : le concret, chiffré ; quelques paragraphes, puis des listes (fonctionnalités, applications, améliorations prévues). Chiffres relevés le 13/11 dans les STATE de techno, les ETAT des modèles et les pages de lingua, voice et lexique (relevé : brain/lectura/site/STATE.md, 13/11). Ancienne version : brain/lectura/site/anciennes-pages/solutions_technologiques_2026-11-13.md. {% endcomment %}

Les outils de Lectura vont de l'écrit à la voix, et de la voix à l'écrit. Tous reposent sur l'**alignement entre les lettres et les sons** (graphèmes et phonèmes), qui relie l'orthographe à la prononciation. Ils sont compacts, tournent **sans carte graphique** et peuvent être installés chez le client, sur ses serveurs ou dans son application.

Les chiffres ci-dessous concernent la génération en service, celle des démos de [LecturaLingua](https://lingua.lectura.world) et de [LecturaVoice](https://voice.lectura.world). Ils sont mesurés sur des jeux de test publics, que les modèles n'ont pas vus à l'entraînement.

---

## Analyse du langage

L'analyse du français repose sur deux modèles. Un **modèle de phrase** analyse la phrase grammaticalement ; il transmet cette analyse à un **modèle de mot**, qui passe de l'orthographe à la phonétique ou de la phonétique à l'orthographe, en gardant l'alignement entre lettres et sons. Cet alignement guide le modèle dans la conversion elle-même, ce qui explique une part de sa précision. Un lexique embarqué complète le modèle de mot.

Avec 99,8 % des mots bien prononcés, environ 96 % bien écrits à partir de la prononciation et 97,7 % des catégories grammaticales justes, Lectura se place parmi les meilleurs outils du marché pour le français, en phonétisation (G2P), en graphémisation (P2G) et en étiquetage grammatical.

Plusieurs de ses fonctionnalités n'ont pas, à la connaissance de Lectura, d'équivalent publié : l'analyse grammaticale depuis la seule prononciation, l'alignement des lettres et des sons conservé à chaque conversion, et la syllabation alignée de l'orthographe et de la phonétique.

**Fonctionnalités**

- **Tokenisation et normalisation** : découpage de la phrase, ponctuation, formules (sigles et acronymes, nombres, dates, heures, monnaies, unités), avec une table de près de 4 900 abréviations.
- **Analyse grammaticale** (test Universal Dependencies ; scores depuis l'orthographe / depuis la phonétique) : pour chaque mot de la phrase, sa catégorie grammaticale, parmi 18 (97,7 % / 97,0 %) ; son lemme (98,6 % / 97,8 %) ; sa morphologie, 17 traits comme le genre, le nombre, le temps ou la personne (catégorie et traits justes : 93,5 % / 90,7 %) ; et sa fonction dans la phrase, parmi 65 relations de dépendance (76,7 % / 76,1 %).
- **G2P, de l'écrit à l'oral** : 99,8 % des mots prononcés correctement ; 97,8 % pour les mots que le modèle n'a jamais vus, sans lexique.
- **P2G, de l'oral à l'écrit** : environ 96 % des mots bien écrits à partir de la prononciation (FLEURS, test), homophones et accords compris.
- **Alignement graphèmes-phonèmes** : 99,2 % des mots alignés correctement.
- **Syllabation**, phonétique et orthographique, les deux alignées.
- **Identification des lettres particulières** : lettres muettes, consonnes de liaison et h aspiré.
- **Options de lecture** : élisions, liaisons, enchaînements, e caducs, schwas finaux.
- **Taille et vitesse** : environ 60 Mo de modèles pour la lecture, lexique compris (110 Mo avec l'écriture) ; environ 25 phrases par seconde sur un serveur à 4 cœurs, sans carte graphique.

Lectura propose également un **correcteur** fondé sur cette technologie. Après une première passe de correction syntaxique, il fait passer la phrase par la phonétique. Ce détour « neutralise » les erreurs d'écriture : l'orthographe correcte est reconstruite à partir de la prononciation (regraphémisation), et l'analyse grammaticale de la phrase est complétée à partir de la phonétique, ce qui permet de corriger des erreurs d'accord et d'homophones. Chaque correction possède en plus un traçage, qui permet de fournir une explication pédagogique.

Comparaison sur le corpus WiCoPaCo (4 820 phrases, même banc pour les trois outils, mesure de Lectura) :

<div class="table-defilante" markdown="1">

| | Lectura | Grammalecte | LanguageTool |
|---|---|---|---|
| Corrections justes | **60,2 %** | 35,0 % | 38,8 % |
| Fautes trouvées | 49,7 % | 41,9 % | **51,5 %** |
| Fausses alertes (textes corrects) | **0,7 ‰** | 6,8 ‰ | 9,5 ‰ |

</div>

**Anglais** : un module équivalent existe pour l'anglais, avec les mêmes fonctionnalités (catégories justes à 95,0 % depuis le texte, 94,9 % depuis la phonétique), et un correcteur anglais. Il peut être complété d'un modèle de traduction anglais ↔ français, qui n'est pas développé par Lectura : OPUS-MT, de l'université d'Helsinki (licence Apache 2.0).

**Applications possibles**

- Phonémisation de corpus, notamment pour l'ingénierie vocale.
- Lecture syllabique pour l'apprentissage de la lecture (voir les [solutions pédagogiques]({{ '/solutions/educatives/' | relative_url }})).
- Analyse et correction de textes à visée pédagogique.
- Apprentissage de l'anglais.
- Aide à l'élaboration de lexiques.

**Améliorations prévues** : extension à d'autres langues.

[Le détail]({{ '/solutions/analyse-langage/' | relative_url }}) · [Essayer sur LecturaLingua](https://lingua.lectura.world)

---

## Synthèse vocale

La synthèse vocale lit un texte français à voix haute. Elle s'appuie sur l'analyse du langage, et lit donc des sons plutôt que des lettres : elle sait à quel instant chaque son est prononcé.

**Fonctionnalités**

- **Moteur multi-voix** : six voix (trois féminines, trois masculines) et sept styles de lecture (neutre, narratif, dialogue, expressif, méditatif, rapide, lent).
- **Moteur à une voix**, de qualité supérieure, avec les mêmes styles.
- **Moteur par diphones**, expérimental, pensé pour la pédagogie.
- **Entrée phonémique** : la prononciation peut être donnée directement en phonèmes, ce qui permet de corriger celle d'un mot.
- **Lecture des sigles, des nombres et des formules**, grâce à l'analyse du langage.
- **Lecture des sons courts** (syllabes, phonèmes), qui permet la lecture syllabique.
- **Horodatage de chaque phonème**, qui permet un surlignage synchronisé du texte, mot à mot.
- **Intelligibilité** : relue par la reconnaissance vocale, la voix de synthèse donne entre 1,1 et 3,0 % d'erreurs sur les sons selon les voix (CommonVoice, test).
- **Vitesse** : 3,5 à 4 fois plus rapide que le temps réel sur un processeur ordinaire, sans carte graphique.
- **Qualité** proche de celle de Kokoro.

**Applications possibles**

- Création de livres audio.
- Création de la bande vocale d'une vidéo, avec sous-titrage synchronisé.
- Applications d'apprentissage de la lecture.
- Voix embarquée dans une application ou un produit.
- Modèle de votre propre voix, pour un répondeur automatique ou des messages vocaux (avec la nouvelle génération de voix).

**Améliorations prévues** : une nouvelle génération de voix, en préparation, qui permettra :

- la **conversion vocale** : changer le timbre ou la prosodie d'une voix ;
- le **clonage vocal** : reproduire une voix à partir d'un échantillon ;
- une **qualité supérieure**, avec un modèle qui reste de taille portable ;
- d'**autres langues**.

[Le détail]({{ '/solutions/synthese-vocale/' | relative_url }}) · [Écouter sur LecturaVoice](https://voice.lectura.world/tts)

---

## Reconnaissance vocale

La reconnaissance vocale décode d'abord les **sons** prononcés, puis l'analyse du langage les écrit en orthographe, en tranchant les homophones et les accords par la construction de la phrase. Cette étape phonétique entend ce qui est réellement prononcé, y compris les erreurs de lecture.

**Fonctionnalités**

- **Transcription** d'un enregistrement ou de la voix au micro, en orthographe et en phonétique, avec les nombres écrits en chiffres ou en lettres.
- **Reconnaissance des sons réellement prononcés**, erreurs de lecture comprises, plutôt que des mots attendus.
- **Horodatage de chaque phonème**, avec un indice de confiance, qui permet un surlignage synchronisé par mot, par syllabe ou par phonème.
- **Alignement d'un texte sur sa lecture** : 79 % des débuts de mots placés à 50 ms près, 95 % à 100 ms près.
- **Sous-titres** synchronisés (SRT, VTT).
- **Taille** : un modèle acoustique de 13 millions de paramètres (50 Mo), qui tourne sans carte graphique.

**Mesures** (FLEURS, test, 676 phrases, même normalisation pour tous) :

<div class="table-defilante" markdown="1">

| | Taille | Erreurs de mots | Erreurs de sons |
|---|---|---|---|
| Lectura | 13 M de paramètres (modèle acoustique) | 15,7 % | **5,7 %** |
| Whisper small (OpenAI) | 244 M de paramètres | **13,3 %** | — |

</div>

Whisper small, près de vingt fois plus gros, a probablement vu des données de FLEURS à l'entraînement.

**Applications possibles**

- Suivi de la lecture à voix haute d'un enfant, avec repérage des erreurs.
- Sous-titrage synchronisé de vidéos.
- Lecture karaoké d'un texte sur sa voix.
- Alignement de livres audio sur leur texte.
- Saisie vocale dans une application ou un formulaire.
- Phonétisation de corpus de parole, pour l'ingénierie vocale.

**Améliorations prévues** : une nouvelle génération du modèle acoustique, en préparation, qui permettra :

- une meilleure précision, avec un modèle qui reste de taille portable ;
- d'**autres langues**.

[Le détail]({{ '/solutions/reconnaissance-vocale/' | relative_url }}) · [Essayer sur LecturaVoice](https://voice.lectura.world/stt)

---

## Lexique

Tous ces outils reposent sur un lexique que Lectura a construit et corrigé lui-même, en réunissant les grandes bases libres du français.

**Fonctionnalités**

- **LeXiK** : près de 2,9 millions d'entrées de mots (2,2 millions de graphies), plus les locutions et les formes spéciales, dont plus de 400 000 noms propres prononcés ; pour chaque entrée, la prononciation syllabée, l'analyse grammaticale, l'alignement des lettres et des sons, et la fréquence. Publié sous licence libre (CC BY-SA 4.0) sur [ORTOLANG](https://hdl.handle.net/11403/lexik).
- **WiKiLeXiK** : un dictionnaire en ligne qui relie LeXiK au Wiktionnaire et à Wikidata (688 000 définitions, 2,5 millions d'entités).
- **Lexicon** : le lexique dans une application, en français et en anglais, de 25 à 73 Mo à télécharger ; validité d'un mot, fréquence, prononciations, homophones, rimes, lemmes, conjugaison, recherche multicritère.
- **Ressources dérivées** : un corpus des 4 946 syllabes du français avec leur son, et un corpus de 1 553 mots illustrés.

**Applications possibles** : jeux de lettres et de mots, outils d'orthographe, applications d'apprentissage, recherche en linguistique.

[Le lexique en détail]({{ '/solutions/lexique/' | relative_url }}) · [LecturaLexique](https://lexique.lectura.world)

---

## Fabrication de supports

De ces outils, Lectura sait tirer des supports finis, en réunissant la mise en page, la voix, l'image et l'application.

- **Livres et documents** : mise en page automatique de textes syllabiques ou enrichis, en page à imprimer ou en PDF ; un manuel de lecture syllabique est en prototype.
- **Programmes** : des logiciels de bureau construits sur les modules (édition vocale, consultation du lexique, formules), prototypés en 2026 et en pause.
- **Applications** : des applications pour Android et iOS, en cours.
- **Images, audio et vidéo** : banques d'images générées pour l'apprentissage (près de 14 000 images pour les mots illustrés), sons enregistrés par la synthèse (plus de 5 300 fichiers pour le corpus des syllabes), vidéos sous-titrées ou en karaoké synchronisées sur la voix.

---

Pour utiliser ces outils dans un produit, sous licence et chez vous : [l'offre aux entreprises]({{ '/offres/entreprises/' | relative_url }}).
