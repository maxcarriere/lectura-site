---
title: "L'API publique"
layout: default
permalink: /developpement/api/
description: "L'API publique de Lectura, ouverte : une seule API générale, gratuite et sans clé, pour utiliser la génération v1 des modules depuis votre code : lexique, lecture, écriture, correction, synthèse et reconnaissance vocales."
---

{% comment %} Page créée le 23/11/2026 (Maxime, « suite du chantier » 1, brain/ecosysteme/infra/DECISIONS.md ; principe dans
infra/DISTRIBUTION.md). 24/11 : API v1 ouverte à 12 h 58 (Modèles v0 et v1, infra/API-V1.md), voix comprise. Quotas jamais chiffrés
(Maxime, 24/11 : « c'est interne »). La documentation complète, tirée de la source unique, viendra sur cette page. {% endcomment %}

<span class="status-badge status-dispo">Ouverte</span>

## Présentation {#presentation}

L'API publique donne accès à la génération actuelle des modules de Lectura, la [v1]({{ '/developpement/modules/v1/' | relative_url }}). C'est **une seule API générale**, à l'adresse `https://api.lectura.world/v1` : une adresse et une documentation pour tous les services. Elle est **gratuite** et s'utilise **sans clé**, depuis n'importe quel langage capable d'envoyer une requête HTTP (JavaScript, Python, Java, C#, Swift, PHP…), sans rien installer.

Les démos de [LecturaLingua](https://lingua.lectura.world), de [LecturaVoice](https://voice.lectura.world) et de [LecturaLexique](https://lexique.lectura.world) en sont elles-mêmes clientes : ce qu'on y voit est exactement ce que l'API renvoie.

## Les services {#services}

| Service | Ce qu'il fait |
|---|---|
| Lexique | le dictionnaire LeXiK : formes, lemmes, catégories, prononciations |
| Lecture d'un texte | chaque mot analysé : prononciation, syllabes, catégorie et traits |
| Écriture depuis la phonétique | le texte écrit à partir de sa prononciation, accords et homophones compris |
| Correction | le texte corrigé, avec l'explication de chaque correction |
| Synthèse vocale | le texte lu par l'une des voix de Lectura, avec chaque mot et chaque syllabe datés |
| Reconnaissance vocale | le texte d'un enregistrement court, avec sa phonétique et les mots datés |

## Un usage limité {#quotas}

L'usage de chaque service est limité, pour répartir la capacité du serveur entre tous. Pour aller au-delà, ou pour ne pas dépendre d'un serveur, les modèles tournent chez vous, sous licence commerciale.

## Le code et les modèles {#code}

| Génération | Code | Modèles | Utilisation |
|---|---|---|---|
| [v0](/developpement/modules/v0/) | public, sous AGPL-3.0 | publics sur Hugging Face | en local, gratuite |
| [v1](/developpement/modules/v1/) | sous AGPL-3.0, publication en préparation | privés, sur le serveur de Lectura | par l'API publique, gratuite |
| [v2](/developpement/modules/v2/) | — | — | en développement |

Le code de la v1 sera publié sous AGPL-3.0 : il appelle l'API publique, sans embarquer les modèles, qui restent sur le serveur de Lectura.

## Licence commerciale et modèles en local {#licence}

<span class="status-badge status-dispo">Sur demande</span>

Pour faire tourner les modèles v1 chez vous, sur vos serveurs ou dans votre application ou pour les utiliser dans un produit vendu, sans limite de quotas : la licence commerciale et les modèles se discutent avec Lectura. Les modules et leur prix indicatif sont présentés sur [LecturaLingua](https://lingua.lectura.world/modules/obtenir).

[Contacter Lectura]({{ '/contact/' | relative_url }}){: .btn }

## Documentation {#documentation}

Les routes, leurs entrées et leurs sorties : pour le texte et le lexique, la [documentation de LecturaLingua](https://lingua.lectura.world/documentation/v1) ; pour la voix, celle de [LecturaVoice](https://voice.lectura.world/documentation/v1#api). Référence complète : [api.lectura.world/v1/docs](https://api.lectura.world/v1/docs).
