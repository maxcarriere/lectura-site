---
title: Logiciels de bureau
layout: default
permalink: /developpement/logiciels/bureau/
redirect_from:
  - /produits/programmes/
  - /solutions/programmes/
  - /produits/programmes/voice-edition/
  - /produits/programmes/lexique-viewer/
  - /produits/programmes/formule/
description: "Les logiciels de bureau de Lectura : des programmes Python qui font tourner les modules en local, prototypés en 2026, en développement pour 2027."
---

{% comment %} Réécrite le 19/11/2026 (Maxime : « Programmes → Logiciels de bureau ; pas besoin de réexpliquer les produits ; présenter les principes, les premiers essais de 2026 puis la pause pour se concentrer sur les modules »). Faits : inventaire du 19/11 (workspace/Programmes : Voice Edition et Lexique Viewer en PySide6 empaquetés par PyInstaller, Saisie en PySide6, Formules en Tkinter ; derniers fichiers début juillet 2026). Anciennes pages : brain anciennes-pages/produits_programmes_*_2026-11-19.md. {% endcomment %}

<span class="status-badge status-cours">En développement</span> Prévus pour 2027.

## Principes {#principes}

Les logiciels de bureau de Lectura assemblent ses [modules]({{ '/developpement/modules/v1/' | relative_url }}) dans une interface de travail :

- **en Python**, comme les modules eux-mêmes, qu'ils appellent directement ;
- **en local** : les modèles tournent sur la machine de l'utilisateur, sans connexion et sans envoyer ses textes ou ses enregistrements ;
- **une interface de bureau** (Qt), livrée en un seul programme à installer ;
- **les mêmes briques que les sites projets** : ce qu'on essaie en ligne sur LecturaLingua ou LecturaVoice se retrouve dans le logiciel, avec les fonctions d'un outil de travail (fichiers, projets, export).

## Premiers essais {#essais}

Au printemps et à l'été 2026, Lectura a prototypé plusieurs programmes sur ce modèle : un éditeur qui donne une voix et des sous-titres synchronisés à une vidéo, un outil d'enrichissement de texte (phonétique, grammaire, fréquences, définitions) avec correction, un assistant de saisie, et un lecteur de formules (nombres, dates, heures, sigles). Ils ont montré que les modules pouvaient porter un logiciel complet.

<figure class="capture-logiciel">
  <img src="{{ '/assets/images/logiciels/explorateur-lexical.png' | relative_url }}" alt="Prototype d'explorateur lexical : recherche de mots par orthographe, phonétique, rimes ou anagrammes, avec filtres de catégorie, de fréquence et d'âge d'acquisition" width="960" height="600" loading="lazy">
  <figcaption>L'explorateur lexical, prototype de 2026 : recherche par orthographe, phonétique, rimes ou anagrammes, fiches des mots et des lemmes.</figcaption>
</figure>

Ces essais ont été **mis en pause en juillet 2026** pour concentrer le travail sur les modules eux-mêmes, devenus la [génération v1]({{ '/developpement/modules/v1/' | relative_url }}). Leur développement reprend sur cette base, pour 2027. Les produits qui en sortiront seront présentés quand ils seront en développement.

En attendant, leurs fonctions principales s'essaient en ligne : la synthèse et le sous-titrage sur [LecturaVoice](https://voice.lectura.world), l'analyse et la correction sur [LecturaLingua](https://lingua.lectura.world), le dictionnaire sur [LecturaLexique](https://lexique.lectura.world).
