---
title: Licences
layout: default
permalink: /offres/licences/
description: "Les licences de Lectura en un coup d'œil : modèles v0 (gratuits, en local), v1 (gratuite par l'API publique, licence commerciale et modèles sur demande) et v2 (en développement), ressources en licence Créateur ou Pro, conditions de vente."
---

{% comment %} Maxime, 19/11/2026 : une page qui regroupe tous les cas de licence, comme Tarifs pour les prix. Sources : DECISIONS du 19/11 (v1 en vente, avantage v2, embarquement), règle des licences des ressources du 16/11 (lectura/CLAUDE.md), grille des modules (prix sur les sites projets). La page Pro garde un résumé et renvoie ici. Modèles réécrits le 23/11 selon infra/DISTRIBUTION.md (ancienne version : anciennes-pages/offres_licences_2026-11-23.md). {% endcomment %}

Lectura ne vend pas la propriété de ses produits : l'achat donne une licence d'utilisation. Cette page rassemble les cas ; pour chaque produit, le contrat de licence, présenté avant l'achat, fait foi.

---

## Modèles {#modeles}

### v0 : gratuite, en local {#v0}

La [v0]({{ '/developpement/modules/v0/' | relative_url }}) est gratuite et s'installe en local :

- code sous AGPL-3.0, sur GitHub et PyPI ;
- modèles neuronaux publics sur Hugging Face, sous CC BY-NC 4.0 (usage non commercial) ;
- tables lexicales sous CC BY-SA 4.0 ; banque de diphones et timbres de voix sous CC BY 4.0 ;
- usage commercial (intégration dans un produit fermé, modèles hors du cadre non commercial) : sur demande ; toute licence Lectura v1 couvre aussi la v0.

### v1 : gratuite par l'API, licence et modèles sur demande {#v1}

La [v1]({{ '/developpement/modules/v1/' | relative_url }}) s'utilise gratuitement par l'[API publique]({{ '/developpement/api/' | relative_url }}) de Lectura, sans clé, avec un usage limité ; elle fait aussi tourner les démos des sites. Son code sera publié sous AGPL-3.0 ; ses modèles restent privés, sur le serveur de Lectura.

Pour faire tourner les modèles v1 chez vous, sur vos serveurs ou dans votre application ou pour les utiliser dans un produit vendu, sans limite de quotas, la licence commerciale et les modèles sont **sur demande** ([contact]({{ '/contact/' | relative_url }})) :

- une licence pour l'organisation qui l'acquiert et les personnes qui travaillent pour elle ;
- les voix livrées sont des voix de synthèse, sans nom de personne ; la licence en encadre l'usage (pas de recherche des voix d'origine, mention de l'IA pour les sons diffusés) ;
- sur devis : le code d'entraînement et les données, l'accompagnement dans l'intégration logicielle.

Prix indicatifs des modules de langage, de 999 à 1 999 € HT selon les modules, sur [LecturaLingua](https://lingua.lectura.world/modules/obtenir) ; modules de voix sur demande. Le lexique [LeXiK](https://lexique.lectura.world) est libre (CC BY-SA 4.0, usage commercial permis) et se télécharge gratuitement ; le module Lexicon (code sous AGPL, à publier) et la base Lexicon, qui en est tirée et que sert l'API publique, sont présentés sur [LecturaLexique](https://lexique.lectura.world/modules/v1).

### v2 : en développement {#v2}

La [v2]({{ '/developpement/modules/v2/' | relative_url }}) est en cours de développement : des modèles plus performants, de nouvelles fonctionnalités comme le clonage de voix, des modèles plus légers.

---

## Ressources {#ressources}

Les corpus et les ressources (sons, images, données) se vendent sous deux licences :

- **Créateur** : pour une seule personne, tout usage, y compris professionnel, sauf l'intégration dans un produit vendu ou qui rapporte un revenu, et sauf l'entraînement d'un modèle d'IA ;
- **Pro** : pour l'entité qui l'acquiert et les personnes qui travaillent pour elle, sans restriction d'usage, produits vendus et entraînement compris.

Dans les deux cas, les fichiers eux-mêmes ne peuvent être ni revendus, ni redistribués, ni mis à disposition. Les données d'entraînement se vendent en licence Pro. Le corpus Syllabes garde pour l'instant les conditions indiquées sur sa page. Le détail de chaque produit : [licences des corpus](https://lexique.lectura.world/licences/corpus) sur LecturaLexique.

Le dictionnaire WiKiLeXiK, le lexique LeXiK et les échantillons sont gratuits, sous leurs propres licences, indiquées sur [LecturaLexique](https://lexique.lectura.world).

---

## Conditions de vente {#cgv}

Les ventes sur les sites de Lectura et sur devis sont réservées aux professionnels ; certains produits sont aussi proposés aux particuliers sur Gumroad. Les achats relèvent des [conditions générales de vente]({{ '/cgv/' | relative_url }}). Les prix sont sur la page [Tarifs]({{ '/offres/tarifs/' | relative_url }}).
