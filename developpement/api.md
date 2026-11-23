---
title: "L'API publique"
layout: default
permalink: /developpement/api/
description: "L'API publique de Lectura, en préparation : une seule API générale, gratuite et sans clé, avec des quotas par service (lexique, texte, correction), pour utiliser la génération v1 des modules depuis votre code."
---

{% comment %} Page créée le 23/11/2026 (Maxime, « suite du chantier » 1, brain/ecosysteme/infra/DECISIONS.md ; principe dans
infra/DISTRIBUTION.md). L'API n'est pas encore ouverte : statut « En préparation », ni adresse ni quotas chiffrés tant que
Modèles v0 et v1 ne les a pas donnés (adresse prévue : https://api.lectura.world). Pas de « bientôt » sur la vitrine. {% endcomment %}

<span class="status-badge status-cours">En préparation</span>

## Présentation {#presentation}

L'API publique, en préparation, donnera accès à la génération actuelle des modules de Lectura, la [v1]({{ '/developpement/modules/v1/' | relative_url }}). C'est **une seule API générale** : une adresse et une documentation pour tous les services. Elle sera **gratuite** et s'utilisera **sans clé**, depuis n'importe quel langage capable d'envoyer une requête HTTP (JavaScript, Python, Java, C#, Swift, PHP…), sans rien installer.

Les démos de [LecturaLingua](https://lingua.lectura.world) en seront elles-mêmes clientes : ce qu'on y voit sera exactement ce que l'API renvoie. D'ici son ouverture, la v1 s'essaie dans ces démos, gratuitement et sans inscription.

## Les services {#services}

| Service | Ce qu'il fait |
|---|---|
| Lexique | le dictionnaire LeXiK : formes, lemmes, catégories, prononciations |
| Lecture d'un texte | chaque mot analysé : prononciation, syllabes, catégorie et traits |
| Écriture depuis la phonétique | le texte écrit à partir de sa prononciation, accords et homophones compris |
| Correction | le texte corrigé, avec l'explication de chaque correction |

La synthèse et la reconnaissance vocales rejoindront l'API plus tard, comme un service à part.

## Les quotas {#quotas}

Chaque service aura ses propres quotas, limités par jour et par adresse, et comptés selon la taille de la demande (des phrases pour le texte). Pour aller au-delà, ou pour ne pas dépendre d'un serveur, les modèles tournent chez vous, sous licence commerciale.

## Le code et les modèles {#code}

| Génération | Code | Modèles | Utilisation |
|---|---|---|---|
| [v0](/developpement/modules/v0/) | public, sous AGPL-3.0 | publics sur Hugging Face | en local, gratuite |
| [v1](/developpement/modules/v1/) | sous AGPL-3.0, publication en préparation | privés, sur le serveur de Lectura | par l'API publique, gratuite |
| [v2](/developpement/modules/v2/) | — | — | en préparation |

Le code de la v1 sera publié sous AGPL-3.0 : il appelle l'API publique, sans embarquer les modèles, qui restent sur le serveur de Lectura.

## Licence commerciale et modèles en local {#licence}

<span class="status-badge status-dispo">Sur demande</span>

Pour faire tourner les modèles v1 chez vous, sur vos serveurs ou dans votre application ou pour les utiliser dans un produit vendu, sans limite de quotas : la licence commerciale et les modèles se discutent avec Lectura. Les modules et leur prix indicatif sont présentés sur [LecturaLingua](https://lingua.lectura.world/offre/licences).

[Contacter Lectura]({{ '/contact/' | relative_url }}){: .btn }

## Documentation {#documentation}

Les routes, leurs entrées et leurs sorties : [documentation de l'API](https://lingua.lectura.world/documentation/v1), sur LecturaLingua.
