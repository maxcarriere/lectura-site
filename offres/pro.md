---
title: Pro
layout: default
permalink: /offres/pro/
redirect_from:
  - /offres/entreprises/
description: "L'offre de Lectura aux professionnels : licences commerciales des modules de langage et de voix, corpus de données, outils logiciels, services éditoriaux, développement, conseil en IA."
---

{% comment %} Maxime, 15/11/2026 : page Pro (ex-Entreprises), par type de produit ou service ; chaque produit renvoie au site projet qui le porte (langage → LecturaLingua, voix → LecturaVoice, Lexicon et corpus → LecturaLexique, logiciels pros → LecturaTools quand il existera). Développement et conseil IA sont transversaux. Les services éditoriaux ne renvoient à LecturaBooks que comme illustration. Anciennes versions : brain anciennes-pages/offres-entreprises_2026-11-15*.md. Prix : page Tarifs. Pastilles : vert = disponible, bleu = en préparation ou en développement. Licences réécrites le 23/11 selon infra/DISTRIBUTION.md (ancienne version : anciennes-pages/offres_pro_2026-11-23.md). {% endcomment %}

**Des outils pour le français écrit et parlé, qui tournent chez vous.** Lectura conçoit des modèles compacts d'analyse du texte et de la voix, qui fonctionnent sur un simple processeur, sans carte graphique ni service en ligne ; pour la phonétique et l'analyse grammaticale du français, ils se placent parmi les meilleurs du marché. Éditeurs, entreprises de l'edtech ou de la voix, organismes de formation, laboratoires : intégrez-les à vos produits, entraînez vos propres modèles sur ses données, ou confiez à Lectura un projet sur mesure.

Chaque produit s'essaie gratuitement, avec sa démo, sur le site du projet qui le porte. Les prix sont sur la page [Tarifs]({{ '/offres/tarifs/' | relative_url }}).

---

## Licences commerciales {#licences}

Des modèles mesurés, pas seulement promis :

- **99,8 %** de mots prononcés correctement et **97,7 %** de catégories grammaticales justes (Analyseur français) ;
- un correcteur qui se trompe nettement moins : **60,2 %** de corrections justes parmi celles qu'il propose, contre 35 à 39 % pour Grammalecte et LanguageTool ;
- une reconnaissance vocale proche de Whisper small, avec un modèle **près de vingt fois plus petit**.

Pour les essayer dans votre code : l'[API publique]({{ '/developpement/api/' | relative_url }}), gratuite et sans clé, en préparation. Pour les faire tourner chez vous : les modèles et la licence commerciale, sur demande.

### v0 : gratuite, en local {#v0}

La [v0]({{ '/developpement/modules/v0/' | relative_url }}) est gratuite et tourne chez vous : code sous AGPL-3.0, modèles publics sur Hugging Face, sous CC BY-NC 4.0. Usage commercial sur demande ; toute licence Lectura v1 couvre aussi la v0.

### v1 : gratuite par l'API, licence et modèles sur demande {#v1}

La v1 s'utilisera gratuitement par l'[API publique]({{ '/developpement/api/' | relative_url }}) de Lectura, en préparation, sans clé, avec des quotas par service ; son code sera publié sous AGPL-3.0 et ses modèles restent privés. Pour faire tourner les modèles chez vous, sur vos serveurs ou dans votre application, sans carte graphique, ou pour les intégrer à un produit vendu : la licence commerciale et les modèles se discutent avec Lectura. En option : le code d'entraînement et les données.

- **Modules de langage** <span class="status-badge status-dispo">Sur demande</span> · Analyseur, Correcteur et Traducteur, en français et en anglais : phonétique, syllabes, grammaire, correction, traduction. Prix indicatifs de 999 à 1 999 € HT, sur [LecturaLingua](https://lingua.lectura.world/offre/licences).
- **Modules de voix** <span class="status-badge status-dispo">Sur demande</span> · synthèse vocale (TTS), reconnaissance vocale (STT), alignement forcé, sous-titrage, sur [LecturaVoice](https://voice.lectura.world/modeles/v1).
- **Module Lexicon v1** <span class="status-badge status-cours">En préparation</span> · le module Lexicon (code sous AGPL, à publier), avec ses bases optimisées tirées de LeXiK, pour le français ; utilisable par l'API publique et compris dans les modules de langage. Base sur mesure sur devis, sur [LecturaLexique](https://lexique.lectura.world).

### v2 : en développement {#v2}

La génération suivante est en cours de développement. Elle vise des modèles plus performants (de meilleurs résultats aux bancs d'essai là où la v1 bute encore), de nouvelles fonctionnalités comme le clonage de voix, et des modèles plus légers.

Toutes les licences, modèles et ressources, sont détaillées sur la page [Licences]({{ '/offres/licences/' | relative_url }}).

### Autour des licences

- **API publique** <span class="status-badge status-cours">En préparation</span> · gratuite et sans clé, pour essayer les modules dans votre propre code ([en savoir plus]({{ '/developpement/api/' | relative_url }})).
- **Intégration logicielle** <span class="status-badge status-dispo">Sur devis</span> · intégration dans votre environnement, chaînes de traitement sur mesure, mise en service.
- **Voix personnalisée embarquée** <span class="status-badge status-dispo">Sur devis</span> · création de votre propre voix de synthèse, à embarquer directement sur vos appareils, utilisable hors ligne.
- **Reconnaissance vocale métier** <span class="status-badge status-dispo">Sur devis</span> · une reconnaissance adaptée à votre vocabulaire.
- **Nouvelle langue ou variété régionale** <span class="status-badge status-dispo">Sur devis</span> · un phonémiseur sur mesure.

→ [Essayer les démos de LecturaLingua](https://lingua.lectura.world) · [de LecturaVoice](https://voice.lectura.world) · [Demander une démo ou un devis]({{ '/contact/' | relative_url }})

---

## Corpus de données {#corpus}

Des données prêtes à l'emploi, pour entraîner vos modèles ou nourrir vos produits pédagogiques, préparées avec les outils de Lectura et vérifiées.

Les corpus se vendent sous deux licences :

- **Créateur** : pour une seule personne, tout usage, y compris professionnel, sauf l'intégration dans un produit vendu ou qui rapporte un revenu, et sauf l'entraînement d'un modèle d'IA ;
- **Pro** : pour l'entité qui l'acquiert et les personnes qui travaillent pour elle, sans restriction d'usage, produits vendus et entraînement compris.

Dans les deux cas, les fichiers eux-mêmes ne peuvent être ni revendus, ni redistribués, ni mis à disposition. Les données d'entraînement se vendent en licence Pro.

### Données d'entraînement

- **Corpus SIWIS aligné** <span class="status-badge status-dispo">Sur demande</span> · les annotations de Lectura sur le corpus de parole SIWIS : transcription phonétique, alignement des mots et des sons, sur [LecturaVoice](https://voice.lectura.world/corpus).
- **Corpus de phrases annotées** <span class="status-badge status-dispo">Sur demande</span> · 128 715 phrases annotées en phonétique et en grammaire, sur [LecturaLingua](https://lingua.lectura.world/corpus).
- **Données sur mesure** <span class="status-badge status-dispo">Sur devis</span> · préparation de vos corpus : transcription, phonémisation, alignement.

### Ressources éducatives

- **Corpus Syllabes** <span class="status-badge status-dispo">En vente</span> · les syllabes du français avec leur son, sur [LecturaLexique](https://lexique.lectura.world/corpus/syllabes).
- **Corpus 1500 Mots** <span class="status-badge status-dispo">En vente</span> · des mots illustrés du vocabulaire de l'enfant, sur [LecturaLexique](https://lexique.lectura.world/corpus/mots).

→ [Télécharger un échantillon gratuit](https://lexique.lectura.world/corpus) · [Demander un corpus sur mesure]({{ '/contact/' | relative_url }})

---

## Outils logiciels {#logiciels}

Les modules de Lectura réunis dans des logiciels prêts à l'emploi, prévus pour 2027 (voir les [logiciels]({{ '/developpement/logiciels/' | relative_url }})).

- **Orthophone** <span class="status-badge status-cours">En développement</span> · un logiciel pour les orthophonistes.
- **Voice Edition** <span class="status-badge status-cours">En développement</span> · un programme de bureau, éditeur vocal qui génère les sous-titres d'une vidéo.

---

## Services éditoriaux {#editorial}

Pour les éditeurs jeunesse et scolaires : faites de chaque livre un outil pour apprendre à lire, dans le livre papier lui-même ou par un support complémentaire. Lectura maîtrise toute la chaîne, de l'analyse du texte à la mise en page et à la voix.

- **Édition syllabique** <span class="status-badge status-dispo">Sur devis</span> · pour l'apprentissage de la lecture : syllabes, sons colorés, liaisons, lettres muettes.
- **Édition enrichie** <span class="status-badge status-dispo">Sur devis</span> · pour la compréhension du texte, en classe.
- **Supports complémentaires** <span class="status-badge status-dispo">Sur devis</span> · page web, vidéo de lecture guidée accompagnant un livre papier et qui enrichit le produit.
- **Livres audio** <span class="status-badge status-cours">En développement</span> · avec le nouveau moteur vocal (v2).

→ [Demander un exemple sur l'un de vos titres]({{ '/contact/' | relative_url }})

---

## Développement {#developpement}

Du modèle au produit fini : Lectura sait concevoir l'interface, l'application ou le site qui met un modèle entre les mains de ses utilisateurs, et préparer les données qui le font progresser. En prolongement d'un autre service, ou comme une prestation à part entière.

### Développement de supports

- **Réalisation de maquettes** <span class="status-badge status-dispo">Sur devis</span>
- **Création de site web** <span class="status-badge status-dispo">Sur devis</span>
- **Développement d'une application mobile** <span class="status-badge status-dispo">Sur devis</span>
- **Réalisation d'interface** <span class="status-badge status-dispo">Sur devis</span> · web ou bureau, pour un modèle ou un outil.

### Ingénierie des modèles

- **Préparation de données** <span class="status-badge status-dispo">Sur devis</span>
- **Automatisation de tâches** <span class="status-badge status-dispo">Sur devis</span>
- **Entraînement complet d'un modèle** <span class="status-badge status-dispo">Sur devis</span> · des données au modèle livré.

→ [Décrire votre projet]({{ '/contact/' | relative_url }})

---

## Conseil en IA {#conseil-ia}

Tout l'écosystème de Lectura, modèles, sites et données, a été développé avec l'IA. Lectura met cette expérience à votre service, pour que l'IA travaille vraiment pour votre activité (voir [Intelligence artificielle]({{ '/solutions/intelligence-artificielle/' | relative_url }})).

- **Audit** <span class="status-badge status-dispo">Sur devis</span> · ce que l'IA peut apporter à votre activité, et où elle bute.
- **Installation** <span class="status-badge status-dispo">Sur devis</span> · un environnement de travail préparamétré (outils comme Claude Code, agents, permissions).
- **Paramétrage** <span class="status-badge status-dispo">Sur devis</span> · le contexte de l'entreprise (documentation, conventions, règles de travail) et l'organisation d'un projet mené avec l'IA.
- **Formation** <span class="status-badge status-dispo">Sur devis</span> · à l'usage des outils et au fonctionnement de l'IA.

→ [Demander un audit ou une formation]({{ '/contact/' | relative_url }})

---

## Parlons de votre projet {#contact}

Décrivez votre projet à **lectura.world@gmail.com** ou par la [page de contact]({{ '/contact/' | relative_url }}) : Lectura vous répond avec une démo ciblée ou un devis.
