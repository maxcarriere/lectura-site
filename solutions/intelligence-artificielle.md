---
title: "Intelligence artificielle"
layout: default
permalink: /solutions/intelligence-artificielle/
redirect_from:
  - /a-propos/methode/
  - /solutions/travail-ia/
description: "L'intelligence artificielle chez Lectura : des modèles légers, qui orchestrent règles et apprentissage, et un environnement de travail organisé autour de l'IA."
---

{% comment %} Troisième axe des Solutions (Maxime, 11/11/2026). Refondue le 14/11 sur le plan de Maxime : deux parties, Modèles et Environnement de travail, avec Fonctionnalités, Applications possibles et Services ; la vision (rôle de l'humain) passe dans « La vision de Lectura ». Ancienne version : brain/lectura/site/anciennes-pages/solutions_intelligence-artificielle_2026-11-14.md. Chiffres : solutions/technologiques.md ; matériel : brain/lectura/techno/STATE.md. {% endcomment %}

L'intelligence artificielle est présente chez Lectura à deux niveaux : comme **technologie**, avec des modèles que Lectura conçoit et entraîne lui-même, et comme **méthode de travail**, puisque Lectura a été entièrement développé avec elle. Cette double expérience peut profiter à d'autres entreprises.

---

## Modèles {#modeles}

Pour réaliser une tâche au mieux, il faut distinguer ce qui peut se faire **analytiquement**, par une opération qui passe d'informations correctes à des informations correctes (une règle, un lexique, un alignement), et ce qui ne peut se faire que **statistiquement**, par inférence à partir d'exemples. Le modèle orchestre ensuite les deux : avancer par la règle là où la tâche suit une logique, laisser l'apprentissage compléter là où elle n'en suit aucune.

Chaque élément analytique réduit l'espace des chemins possibles : le modèle a moins à apprendre, il lui faut moins de données et moins de paramètres. Les modèles de Lectura en sont l'application : la conversion de l'écrit en sons, par exemple, est guidée par l'alignement entre les lettres et les sons.

**Composantes / Fonctionnalités**

- **Modèles légers** : 21 millions de paramètres pour l'analyse de la phrase, 4 millions pour la conversion entre l'écrit et les sons, 13 millions pour la reconnaissance vocale. Ils tournent sans carte graphique, sur un serveur ou dans une application (chiffres détaillés dans les [solutions technologiques]({{ '/solutions/technologiques/' | relative_url }})).
- **Moins de données** : ce que la règle prend en charge n'a pas à être appris ; le modèle se concentre sur ce qui n'obéit à aucune logique.
- **Moins de ressources matérielles** : les modèles de Lectura sont entraînés sur une seule carte graphique grand public.
- **Données libres et communautaires** : les modèles sont construits à partir de ressources ouvertes, lexiques libres, Wiktionnaire, Wikidata, corpus de parole publics, plutôt que de données propriétaires.
- **Modèles lisibles et réglables** : chaque étape a un rôle défini (analyse, conversion, alignement, voix). On peut corriger une étape, une règle ou une entrée du lexique sans toucher au reste : le modèle n'est pas une grande boîte noire.

**Applications possibles**

- **Local et autonome** : des modèles qui tournent directement sur un téléphone ou un ordinateur, sans connexion ni serveur distant.
- **Économique** : moins de calcul et moins de données à réunir, donc des coûts d'entraînement et d'hébergement réduits.
- **Écologique** : moins d'énergie consommée, à l'entraînement comme à l'usage.
- **Peu de données disponibles** : langues régionales ou minoritaires, vocabulaires spécialisés (médical, juridique…), pour lesquels on manque d'exemples pour entraîner un gros modèle.

**Produits / Services**

- Préparation de corpus d'entraînement : nettoyage, phonétisation, alignement, annotation grammaticale.
- Conception d'architectures de modèles : identifier la part analytique d'une tâche, et ce qu'il reste à apprendre.
- Entraînement et évaluation de modèles compacts, mesurés sur des jeux de test publics que les modèles n'ont pas vus à l'entraînement.
- Audit d'un projet d'IA : ce que des règles peuvent prendre en charge, et ce que cela économise.

---

## Environnement de travail {#environnement-de-travail}

Lectura a été entièrement développé avec l'IA, intégrée comme partenaire de production à tout le cycle de développement : à l'IA la partie technique, à l'humain l'orientation et les décisions (voir [La vision de Lectura]({{ '/a-propos/vision/' | relative_url }})). Le gain ne vient pas de l'outil seul, mais de l'organisation qui l'entoure.

**Composantes / Fonctionnalités**

- **Écosystème modulaire** : des briques communes à plusieurs projets ; le même traitement phonétique sert la synthèse vocale, la reconnaissance vocale et le correcteur. Les progrès d'une composante profitent aux autres, et ses erreurs se repèrent à travers elles.
- **Méthode itérative** : c'est la conséquence de l'organisation systémique. On n'avance pas de façon linéaire, une tâche après l'autre, mais de façon arborescente, en structurant le général avant le particulier.
- **Contexte documenté** : chaque décision et chaque convention sont consignées dans des fichiers que l'IA relit à chaque session ; le projet se documente en avançant.
- **Agents coordonnés** : une session d'IA par domaine (technologie, site, diffusion…), qui se coordonnent entre elles et laissent à l'humain les décisions irréversibles.
- **Veille et essais** : tester un outil sans préjugé avant de se faire un avis ; certains projets ambitieux à un moment donné deviennent réalisables quelques mois plus tard.
- **Éthique** : licences et droits d'auteur respectés, aucune donnée protégée utilisée sans autorisation, transparence sur l'usage de l'IA.

**Applications possibles**

- Mener un projet de développement avec l'IA, seul ou en petite équipe.
- Piloter plusieurs projets en parallèle sans perdre la cohérence d'ensemble.
- Documenter, rédiger et rechercher l'information à grande échelle.
- Raccourcir le délai entre une idée et son premier essai.

**Produits / Services**

- Éclairage sur le fonctionnement de l'IA : ce qu'elle sait faire, et où elle bute.
- Construction du contexte de l'entreprise : documentation, conventions et règles de travail que l'IA relit à chaque session.
- Installation d'un environnement de travail préparamétré : outils comme Claude Code, agents, permissions.
- Accompagnement dans l'organisation d'un projet mené avec l'IA.
- Formation à l'usage de ces outils.
