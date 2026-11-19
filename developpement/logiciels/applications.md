---
title: Applications
layout: default
permalink: /developpement/logiciels/applications/
redirect_from:
  - /produits/applications/
description: "Les applications mobiles de Lectura, prévues pour 2027, pour Android et iOS ; un premier test, NumReader."
---

{% comment %} Réécrite le 19/11/2026 (Maxime : « pas encore démarré, prévu aussi en 2027 ; une seule appli test pour le moment, NumReader ; compatible Android + Apple ; pas besoin de parler de produit spécifique »). Faits : inventaire du 19/11 (workspace/Applications/num4chiffres : Flutter, APK release du 05/03/2026, captures snapshots/). Ancienne version : brain anciennes-pages/produits_applications_2026-11-19.md. {% endcomment %}

<span class="status-badge status-avenir">Prévues pour 2027</span>

## Principes {#principes}

Les applications de Lectura seront développées **une seule fois pour Android et iOS**, avec un même code (Flutter). Elles embarqueront ce dont elles ont besoin, les sons ou les modèles, pour marcher **sans connexion**. Les produits qui en sortiront seront présentés quand ils seront en développement.

## Un premier test : NumReader {#numreader}

Une application test a été réalisée en 2026 pour valider la chaîne de fabrication : **NumReader** lit les nombres jusqu'à quatre chiffres. On saisit un nombre, au clavier ou à la voix, en chiffres, en lettres ou en chiffres romains ; l'application l'affiche sous les trois formes et le lit à voix haute, en surlignant la partie prononcée.

<div class="captures-appli" markdown="0">
  <img src="{{ '/assets/images/logiciels/numreader-1.png' | relative_url }}" alt="NumReader : le nombre romain LXXXVIII converti en 88 et en « quatre-vingt-huit »" width="216" height="257" loading="lazy">
  <img src="{{ '/assets/images/logiciels/numreader-2.png' | relative_url }}" alt="NumReader pendant la lecture de 1054 : « cinquante » est surligné, avec le chiffre 5 et la lettre L correspondants" width="216" height="257" loading="lazy">
</div>

Elle tourne sur Android ; le même code est prévu pour iOS. Ses sons sont produits par une voix de synthèse (Google Cloud Text-to-Speech).

[Télécharger NumReader pour Android]({{ '/assets/telechargements/numreader-0.1.0.apk' | relative_url }}) (version test 0.1.0, fichier APK, 50 Mo). L'application n'est pas sur le Play Store : pour l'installer, autorisez l'installation depuis cette source quand Android le demande.
