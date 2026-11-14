---
title: Recherche
layout: default
permalink: /developpement/recherche/
description: "Les domaines de recherche de Lectura (alignement des lettres et des sons, analyse grammaticale depuis la phonétique, moteur vocal, part de la règle et de l'apprentissage) et ce qui en a été publié : LeXiK sur ORTOLANG, modules, articles et notes techniques."
---

{% comment %} Premier jet du 14/11/2026, sur le plan de Maxime : deux sections, Domaines de recherche et Publications. Sources : brain/lectura/techno/OBJECTIF.md (alignement natif, principe analytique / statistique, calibrage, partition), techno/DECISIONS.md (moteur vocal du 10/11, alignement linéaire du 13/11, analyse grammaticale dans le moteur du 13/11), solutions/technologiques.md (scores depuis la phonétique, fonctionnalités sans équivalent publié), diffusion/LEXIK.md (ORTOLANG, handle), diffusion/PLAN.md (Hugging Face publié le 03/11), liens.md (v0 : 17 paquets PyPI, GitHub, AGPL-3.0). Les quatre anciennes cartes (point de vue phonétique, algorithmes, TTS diphonique, ingénierie des modèles) passent dans Publications. Ancienne version à copier dans anciennes-pages/ avant remplacement. {% endcomment %}

Les outils de Lectura reposent sur quelques questions de fond, travaillées dans la durée. Cette page les présente, avec ce qui en a été publié.

---

## Domaines de recherche {#domaines}

### L'alignement des lettres et des sons {#alignement}

Savoir quelles lettres portent quel son est le point de départ de Lectura. L'alignement établit cette correspondance lettre par lettre, lettres muettes comprises ; la syllabation alignée découpe ensuite le mot en syllabes, à la fois dans l'orthographe et dans la phonétique. Dans la génération actuelle des outils, l'alignement est conservé à chaque conversion entre l'écrit et les sons, et les modules savent déjà aligner un enregistrement sur son texte.

Le travail en cours prolonge cet alignement jusqu'à la voix : rattacher chaque lettre d'un texte à son son, à sa coupure (syllabe, liaison, ponctuation…) et à son instant dans l'enregistrement. Les principes de l'alignement et de la syllabation sont décrits dans les [algorithmes développés]({{ '/developpement/recherche/algorithmes/' | relative_url }}).

### L'analyse grammaticale depuis la phonétique {#analyse-phonetique}

Lectura analyse une phrase à partir de sa seule prononciation : catégorie de chaque mot, lemme, genre, nombre, temps, fonction dans la phrase. Les scores restent proches de ceux de l'analyse faite depuis l'orthographe : 97,0 % de catégories justes depuis la phonétique, contre 97,7 % depuis le texte (détail dans les [solutions technologiques]({{ '/solutions/technologiques/#analyse-du-langage' | relative_url }})). C'est ce qui permet au correcteur de passer par le son, et à la reconnaissance vocale d'écrire à partir des phonèmes.

La question étudiée maintenant est celle de la cohérence : jusqu'où la grammaire aide-t-elle à retrouver les mots dans la parole, à placer leurs frontières et à trancher entre deux homophones ?

### Un moteur vocal de nouvelle génération {#moteur-vocal}

Plutôt que deux modèles séparés, l'un pour dire un texte, l'autre pour l'entendre, Lectura prépare un seul moteur qui fait les deux : analyser un son et le produire. Il travaille sur une représentation explicite de la parole, en couches : ce qui est dit (les phonèmes), comment c'est dit (la prosodie, le style), qui le dit (le timbre) et dans quelles conditions (le canal : bruit, salle, micro). Les compétences visées sont la conversion vocale, le clonage d'une voix et une meilleure qualité, avec un modèle qui reste léger.

Les données, en français et en anglais, sont en cours de préparation ; le premier entraînement vient ensuite. Les approches précédentes de Lectura en synthèse vocale sont décrites dans [TTS diphonique]({{ '/developpement/recherche/tts-diphonique/' | relative_url }}) et [ingénierie des modèles]({{ '/developpement/recherche/ingenierie-modeles/' | relative_url }}).

### La part de la règle et la part de l'apprentissage {#analytique-statistique}

Les modèles de Lectura avancent par la règle là où une tâche suit une logique, et laissent l'apprentissage compléter là où elle n'en suit aucune (voir [la vision de Lectura]({{ '/a-propos/vision/' | relative_url }}) et [Intelligence artificielle]({{ '/solutions/intelligence-artificielle/#modeles' | relative_url }})). Ce principe reste à éprouver, et l'équilibre entre les deux se mesure : en traçant la qualité d'un modèle selon sa taille et la quantité de données, avec et sans un élément analytique, l'écart entre les courbes chiffre ce que cet élément épargne en paramètres et en heures de données. Les premiers essais sont en cours.

Une question voisine porte sur la représentation des données : elle doit être assez fine pour ne rien perdre de ce que la tâche doit distinguer, et assez grossière pour ne pas dépenser de paramètres sur ce qui n'importe pas.

### Un horizon : une langue explicite {#langue-explicite}

Au-delà de ces axes, Lectura s'intéresse à l'idée d'une langue universelle explicite, fondée sur la phonétique : voir [la vision de Lectura]({{ '/a-propos/vision/' | relative_url }}).

---

## Publications {#publications}

### Ressources

- **3 novembre 2026** : copie de LeXiK sur [Hugging Face](https://huggingface.co/datasets/lecturaworld/lexik), identique à la version publiée sur ORTOLANG.
- **29 octobre 2026** : **LeXiK** v1.0, lexique du français, publié sur [ORTOLANG](https://hdl.handle.net/11403/lexik) avec sa documentation, sous licence CC BY-SA 4.0. Identifiant de citation : hdl.handle.net/11403/lexik.

### Logiciels

- **Juillet 2026** : première génération des modules (v0), dix-sept paquets Python publiés sur [PyPI](https://pypi.org/user/lectura/), avec leur code sur [GitHub](https://github.com/maxcarriere/lectura-modules), sous licence AGPL-3.0. Elle n'est plus développée ; sa documentation reste en ligne dans [les modules]({{ '/developpement/modules/' | relative_url }}).

### Articles

- **11 novembre 2026** : [Le point de vue phonétique]({{ '/articles/le-point-de-vue-phonetique/' | relative_url }}), l'approche fondamentale de Lectura.
- **3 novembre 2026** : [Les syllabes du français, avec leurs sons]({{ '/articles/corpus-de-syllabes/' | relative_url }}), un corpus de 4 946 syllabes tiré de LeXiK.
- **30 octobre 2026** : [LeXiK et WiKiLeXiK]({{ '/articles/lexik-et-wikilexik/' | relative_url }}), ce que LeXiK apporte aux lexiques du français.
- **29 octobre 2026** : [LeXiK est publié sur ORTOLANG]({{ '/articles/lexik-publie-sur-ortolang/' | relative_url }}).

### Notes techniques

- [Algorithmes développés]({{ '/developpement/recherche/algorithmes/' | relative_url }}) : alignement graphème-phonème, syllabation, groupes de lecture et liaisons, lecture des nombres.
- [TTS diphonique]({{ '/developpement/recherche/tts-diphonique/' | relative_url }}) : un moteur expérimental de synthèse par concaténation de diphones.
- [Ingénierie des modèles]({{ '/developpement/recherche/ingenierie-modeles/' | relative_url }}) : les choix d'architecture de la première génération, ce qui a fonctionné et ce qui a échoué.

---

Un partenaire peut faire avancer l'un de ces domaines : voir [Partenariats]({{ '/partenariats/' | relative_url }}).
