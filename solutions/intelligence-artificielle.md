---
title: "Intelligence artificielle"
layout: default
permalink: /solutions/intelligence-artificielle/
redirect_from:
  - /a-propos/methode/
  - /solutions/travail-ia/
description: "L'intelligence artificielle chez Lectura : comprendre l'IA, concevoir et entraîner des modèles, et organiser le travail avec elle."
---

{% comment %} Troisième axe des Solutions (Maxime, 11/11/2026) : l'ancienne page « Méthode : le rôle de l'IA », présentée comme une solution. Renommé « Intelligence artificielle » et élargi (Maxime, 12/11) : l'organisation du travail en reste une composante importante. Ancienne version : brain/lectura/site/anciennes-pages/solutions_travail-ia_2026-11-12.md. {% endcomment %}

L'intelligence artificielle est présente partout chez Lectura, à deux niveaux :

- **comme technologie** : les voix, la reconnaissance vocale et l'analyse du français reposent sur des modèles que Lectura conçoit et entraîne lui-même. Préparer les données, choisir une architecture, entraîner un modèle, mesurer ce qu'il vaut : c'est une façon de comprendre l'IA de l'intérieur, de savoir ce qu'elle sait faire et ce qu'elle ne sait pas faire ;
- **comme méthode de travail** : Lectura a été entièrement développé avec l'IA, selon une organisation décrite sur cette page.

Cette expérience n'est pas propre à Lectura : comprendre l'IA, savoir quand et comment entraîner un modèle, organiser un projet avec elle, tout cela peut profiter à d'autres entreprises. C'est en cela qu'elle est une **solution**, au même titre que la technologie et les outils éducatifs.

<span class="status-badge">Axe en cours de structuration</span>

Ce que Lectura envisage de proposer : un éclairage sur le fonctionnement de l'IA et l'entraînement des modèles, un environnement de travail préparamétré, un document qui explique l'organisation d'un projet mené avec l'IA, et une formation à l'usage d'outils comme Claude Code. Pour en parler : [Contact]({{ '/contact/' | relative_url }}).

---

## Le rôle de l'IA

Les projets Lectura sont développés selon une méthode de **développement augmenté par l'IA** : l'intelligence artificielle intervient comme un partenaire de production à part entière, intégré à l'ensemble du cycle de développement.

La méthode de travail elle-même fait partie du projet. Comment piloter un écosystème de projets en s'appuyant sur l'IA comme partenaire de production ? Comment maintenir la qualité et la cohérence à cette échelle ? Lectura est aussi un terrain d'apprentissage sur ces questions.

### Avec l'IA, pas par l'IA

L'utilisation de l'IA dans le projet Lectura ne vise pas la production en masse à moindre coût. L'objectif est de produire mieux, en répartissant les tâches de façon optimale entre l'humain et la machine.

**L'IA** est mobilisée là où elle est meilleure et plus rapide que l'humain : le paramétrage technique, l'écriture du code, la rédaction des textes, le graphisme, la recherche d'information et de données. Le gain de temps est considérable. Mais l'IA ne se limite pas à une meilleure exécution des tâches : sa capacité de recherche et de synthèse lui permet aussi d'explorer des pistes nouvelles, de toucher des horizons qui seraient restés hors de portée autrement.

**L'humain** reste indispensable, car l'IA ne peut pas travailler de façon totalement autonome. Paradoxalement, les décisions humaines sont peut-être plus importantes qu'avant : l'intuition, les idées, l'évaluation de la qualité, le bon sens, l'orientation des projets : tout cela est essentiel pour arriver à un résultat de qualité. Sans cette vision d'ensemble, le résultat reste générique, car par défaut l'IA renvoie la « moyenne » : quelques bouts de code isolés ou un livrable standard, sans plus-value par rapport à ce qui existe déjà sur Internet et surtout impossible à améliorer ou à imbriquer avec le reste. L'humain est aussi celui qui identifie quand l'IA part dans une mauvaise direction, et cela arrive souvent, notamment lors des réinitialisations de contexte. Sans cette vigilance, ce sont des heures de travail perdues, voire des manipulations aux conséquences plus ou moins désastreuses.

### Vers une redéfinition du travail humain ?

C'est sans doute le déplacement qui est en train de s'opérer dans le monde du travail. Hier, les profils les plus recherchés étaient des spécialistes qui excellaient dans un domaine technique particulier. Aujourd'hui, ce qui compte davantage, c'est la vision globale : être capable de construire l'architecture d'un projet, de savoir ce qui est possible et ce qui ne l'est pas, de connaître les capacités réelles de l'IA et ce qu'elle ne pourra pas remplacer dans le développement d'un projet.

Une partie des critiques adressées à l'IA trouve sans doute son origine ici. Toute une élite intellectuelle et académique se retrouve soudainement à perdre l'avantage que lui conférait son expertise sur le reste de la population. C'est compréhensible, et ces inquiétudes sont recevables. Mais on peut aussi envisager cette technologie comme un formidable outil de démocratisation, qui donne à chacun, quelle que soit sa formation ou sa position académique, l'accès à des compétences autrefois réservées à quelques-uns. Et si l'expertise technique devient accessible à tous, cela poussera les hommes à développer leurs vraies compétences humaines, celles qui restent hors de portée d'une machine : l'intuition, la créativité, la sensibilité émotionnelle.

Si le monde du travail tel qu'on le connaît est en train de se transformer, à quoi ressemblera celui de demain ? Une partie de la réponse passe par la façon même de structurer les projets.

## Les principes de la méthode

#### Un écosystème modulaire

Pour que le développement avec l'IA soit rentable, il faut paralléliser. Ne plus nécessairement développer un projet isolé, mais anticiper ce qui pourrait être développé en parallèle, afin d'aboutir non pas à un programme, mais à plusieurs, chacun utilisant les mêmes briques de façon différente. Le même pipeline phonétique sert par exemple la synthèse vocale, la reconnaissance vocale et le correcteur. Un corpus construit pour un modèle est réutilisable ailleurs. Une architecture de modèle réalisée une fois est transférable à d'autres projets. La modularité est essentielle pour pouvoir réinvestir.

L'autre avantage d'un écosystème, c'est que les progrès réalisés sur une composante profitent à l'ensemble. Les erreurs, elles, sont plus facilement identifiables : certaines ne se révèlent qu'à travers une des composantes du projet. Et les impasses trouvent parfois une issue imprévue en développant des composantes annexes.

#### Une méthode itérative

Avec l'IA, on ne développe pas de façon linéaire. On itère : on produit, on corrige, on réoriente, et le résultat s'améliore progressivement. Cet aspect itératif se retrouve à toutes les échelles. Sur une tâche simple et ciblée, on affine jusqu'à obtenir le bon résultat. À l'échelle d'un projet, on restructure au fil des retours et des découvertes. À l'échelle de l'écosystème lui-même, l'ensemble se renforce de façon progressive et continue, comme un organisme qui apprend de ses propres cycles.

#### Le contexte, clé de l'efficacité

Pour que l'IA produise un résultat pertinent, elle doit comprendre le projet dans lequel elle intervient. Sans contexte, elle génère du code générique ou des réponses inadaptées, déconnectées de l'architecture existante et des choix déjà faits. Une grande partie du travail d'architecture consiste justement à construire ce contexte et à le préciser au fur et à mesure.

Concrètement, cela passe par une documentation continue en Markdown : chaque décision, chaque convention, chaque structure est consignée dans des fichiers que l'IA peut intégrer à chaque session de travail. Le projet se documente lui-même en avançant, et l'IA devient progressivement plus efficace parce qu'elle dispose d'une vision de plus en plus complète de ce qui a été fait, de ce qui est en cours et de ce qui est visé.

#### Flexibilité et ouverture d'esprit

Avant d'avoir un quelconque avis sur une méthode ou un outil : le tester sans préjugé, observer ses possibilités réelles. Dans un monde technologique qui évolue de semaine en semaine, il faut être réactif et prêt à intégrer de nouveaux outils, même quand les anciens semblent déjà efficaces. Parfois, on peut aussi miser directement sur le progrès : certains projets qui semblaient ambitieux en janvier deviennent tout à fait réalisables en juillet.

#### Éthique

Le recours massif à l'IA dans un processus de production soulève des questions qu'il serait irresponsable d'ignorer. Le respect des licences et des droits d'auteur est une priorité dans tous les projets Lectura. Ce principe est inscrit dans la charte de travail transmise aux différents agents : aucune donnée protégée ne doit être utilisée sans autorisation, aucun contenu ne doit être présenté comme original s'il ne l'est pas. La transparence sur l'utilisation de l'IA, dont cette page est l'illustration, fait également partie de cette exigence.
