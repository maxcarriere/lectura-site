---
title: Confidentialité
layout: default
permalink: /confidentialite/
---

## Politique de confidentialité

Cette page décrit la politique de confidentialité du site **www.lectura.world**.

---

## Données collectées

Le site www.lectura.world est un **site statique** hébergé sur GitHub Pages. Il ne dispose d'aucun système de comptes utilisateurs, d'aucune base de données côté serveur et d'aucun formulaire de collecte de données personnelles.

**Aucune donnée personnelle n'est collectée par le site lui-même.** Seules les commandes en ligne en recueillent (section « Commandes » ci-dessous).

---

## Cookies

Le site **n'utilise aucun cookie**, ni cookie de suivi, ni cookie publicitaire, ni cookie d'analyse d'audience.

## Mesure d'audience

Pour connaître la fréquentation de ses pages, Lectura utilise **GoatCounter**, un outil de statistiques sans cookie, sur lectura.world et lexique.lectura.world. Il compte les pages vues, le site d'où vient le visiteur, le navigateur et le système, la langue, la taille d'écran et le pays (déduit de l'adresse IP, qui n'est pas conservée). Il ne dépose aucun cookie, ne suit pas le visiteur d'un site à l'autre et ne sert à aucune publicité. Lectura ne consulte que des chiffres d'ensemble. Ces statistiques sont traitées par GoatCounter, conformément à sa [politique de confidentialité](https://www.goatcounter.com/help/privacy).

---

## Données techniques d'hébergement

L'hébergeur (GitHub Pages) peut collecter des données techniques minimales dans le cadre de son fonctionnement normal (adresse IP, logs d'accès). Ces données sont traitées par GitHub conformément à sa propre [politique de confidentialité](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

Le sous-domaine **lexique.lectura.world**, hébergé sur un serveur dédié, enregistre des logs d'accès standard (adresse IP, date, page consultée) à des fins de maintenance technique. Ces logs ne sont pas exploités à des fins commerciales et sont supprimés périodiquement.

---

## Démonstrations en ligne {#demonstrations}

{% comment %}Texte de Lectura Droit (droit/CONFIDENTIALITE-API-PUBLIQUE.md, 24/11/2026) : remplace « traités en temps réel
et ne sont pas stockés. Aucun historique de requêtes n'est conservé », inexact. Ligne « Limitation de l'usage » alignée sur la v1 (sel tournant
déployé sur l'ancienne API le 24/11, Droit).{% endcomment %}

Les sites LecturaLingua, LecturaVoice et LecturaLexique proposent des démonstrations (analyse du langage, synthèse et reconnaissance vocales, recherche dans le dictionnaire). Les textes et les sons que vous y envoyez servent uniquement à produire le résultat (base légale : l'exécution du service que vous demandez, RGPD, art. 6.1 b). Ils ne sont pas conservés : un son peut être placé dans un fichier temporaire le temps du calcul, effacé aussitôt après. Ils ne servent pas à entraîner des modèles.

- **Journaux techniques du serveur** : adresse IP, date, adresse appelée et code de réponse, conservés 14 jours au plus pour la sécurité (intérêt légitime). Pour une recherche dans le dictionnaire, ou toute requête passée dans l'adresse, l'adresse appelée peut contenir le mot cherché.
- **Limitation de l'usage** : pour prévenir les abus, le serveur compte vos requêtes de la journée. Il ne garde pas votre adresse IP, seulement une empreinte calculée avec une clé aléatoire qui change chaque jour. Cette empreinte, la clé et les compteurs sont effacés au bout de deux jours (intérêt légitime).
- **Hébergement** : OVH, au Canada (décision d'adéquation de la Commission européenne). Ces données ne sont transmises à aucune autre entreprise.
- **Vos droits** : accès, rectification, effacement, limitation et opposition, en écrivant à lectura.world@gmail.com. Vous pouvez aussi saisir la CNIL ([www.cnil.fr](https://www.cnil.fr)).

---

## API publique v1 (api.lectura.world/v1) {#api}

{% comment %}Version définitive de Lectura Droit (droit/CONFIDENTIALITE-API-PUBLIQUE.md, 24/11/2026, relue). Ne pas
publier avant les cinq conditions en tête de ce fichier (zz-v1.conf, api-v1.log, minuteur du relevé, tampon nginx,
mode local sans réseau), puis le oui de Maxime.{% endcomment %}

L'API publique de Lectura permet d'analyser des textes et de produire de la voix. Les modules Lectura publiés en code libre l'appellent par défaut. Vous pouvez aussi l'appeler directement. Elle est gratuite, sans compte ni clé, avec un usage limité. Ce paragraphe vaut pour les adresses qui commencent par /v1 ; les autres services du site sont décrits dans la section « [Démonstrations en ligne](#demonstrations) ».

- **Responsable du traitement** : Maxime Carrière EI (Lectura), lectura.world@gmail.com.
- **Ce que vous envoyez** : les textes et, pour les services vocaux, les sons que vous ou votre programme transmettez à l'API. Ils sont traités en mémoire, uniquement pour produire le résultat demandé (base légale : l'exécution du service que vous demandez, RGPD, art. 6.1 b). **Ils ne sont enregistrés nulle part**, ni sur disque ni dans les journaux, même en cas d'erreur, et ne servent pas à entraîner des modèles.
- **Limitation de l'usage** : pour répartir la capacité du serveur et prévenir les abus, l'API compte vos requêtes de la journée, pour chaque service. Elle ne garde pas votre adresse IP, seulement une empreinte calculée avec une clé aléatoire qui change chaque jour (pour IPv6, sur le préfixe /64). Cette empreinte, la clé et les compteurs sont effacés au bout de deux jours ; après ce délai, plus rien ne relie ces données à votre adresse. Base légale : l'intérêt légitime de Lectura à assurer le fonctionnement du service (RGPD, art. 6.1 f).
- **Statistiques** : un relevé quotidien donne, pour chaque service, des totaux (requêtes, refus, temps de calcul, nombre de visiteurs). Il ne contient ni adresse IP, ni empreinte, ni contenu. Ces totaux ne contiennent aucune donnée personnelle et sont conservés pour le suivi du service.
- **Journaux techniques du serveur** : date, service appelé (sans le contenu de la requête), code de réponse, taille de la réponse, durée de traitement, logiciel client utilisé (user-agent) et adresse IP tronquée (dernier octet effacé en IPv4, seuls les trois premiers groupes gardés en IPv6). Ils sont conservés 14 jours, pour la sécurité (intérêt légitime).
- **Sons produits** : ils portent un marquage invisible qui signale qu'ils ont été générés par IA. Ce marquage est le même pour tous les sons : il ne contient aucune donnée sur vous ni sur votre requête.
- **Hébergement** : le serveur est hébergé par OVH au Canada, pays qui bénéficie d'une décision d'adéquation de la Commission européenne. Les données de l'API ne sont transmises à aucune autre entreprise.
- **Ce qu'il ne faut pas envoyer** : des données sensibles (santé, opinions, etc.), des données qui permettent d'identifier un enfant, ou la voix d'une personne sans son accord.
- **Si vous changez l'adresse de l'API** dans un module, vos données partent vers le serveur que vous avez choisi : Lectura n'en est plus responsable. En mode local, rien ne quitte votre machine.
- **Vos droits** : accès, rectification, effacement, limitation et opposition, en écrivant à lectura.world@gmail.com. Lectura ne garde pas votre adresse IP complète et ne peut donc pas, seule, retrouver vos requêtes (RGPD, art. 11). Si vous indiquez votre adresse IP et la date, elle peut retrouver et effacer ce qui reste. Sans demande de votre part, tout s'efface seul : en deux jours pour les compteurs, en quatorze jours pour les journaux. Vous pouvez aussi saisir la CNIL ([www.cnil.fr](https://www.cnil.fr)).

---

## Commandes

Lors d'un achat sur LecturaLexique, les données transmises (nom, entreprise ou organisation, adresse électronique, adresse de facturation, échanges) servent à traiter la commande, à facturer, à livrer et à assurer le support, en exécution du contrat et pour respecter les obligations comptables. Elles sont conservées le temps de la relation commerciale, puis le temps imposé par ces obligations pour les factures. Elles ne sont pas vendues. Le paiement est traité par Stripe, sous sa propre responsabilité ; Lectura n'a jamais accès aux données de la carte. Le fichier livré porte une licence au nom de l'acheteur (nom ou raison sociale, adresse e-mail, date et référence de la commande) ; ces données sont effacées de notre serveur 30 jours après l'expiration du lien de téléchargement, hors facture. Vos droits (accès, rectification, effacement, limitation, opposition, portabilité) s'exercent à lectura.world@gmail.com ; vous pouvez saisir la CNIL. Voir aussi les [conditions générales de vente]({{ '/cgv/' | relative_url }}).

## Liens externes

Le site contient des liens vers des sites tiers (GitHub, lexique.org, etc.). Lectura n'est pas responsable de la politique de confidentialité de ces sites.

---

## Contact

Pour toute question relative à la confidentialité : [contacter Lectura]({{ '/contact/' | relative_url }})
