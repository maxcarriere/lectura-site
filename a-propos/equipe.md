---
title: L'équipe
layout: default
permalink: /a-propos/equipe/
description: "L'équipe de Lectura : des humains, qui orientent et décident, et des agents d'IA, qu'ils orchestrent."
---

{% comment %} Page créée le 14/11/2026 à la demande de Maxime : un bloc par membre (photo, rôle, présentation courte) ; d'autres membres pourront s'ajouter. Plus tard : deux sections, Humains et Agents (liste des agents et de leur rôle). Photo : photos_moi.zip (communs), PANA4644, recadrée, sans métadonnées. {% endcomment %}

<div class="equipe-membres" markdown="0">
  <div class="equipe-membre">
    <img class="equipe-photo" src="{{ '/assets/images/equipe/maxime-carriere.webp' | relative_url }}" alt="Maxime Carrière" width="400" height="400">
    <div class="equipe-texte">
      <p class="equipe-nom">Maxime Carrière</p>
      <p class="equipe-role">Fondateur, architecte du projet</p>
      <p>Agrégé de mathématiques, il a enseigné dix ans avant de se consacrer à l'intelligence artificielle. Il a conçu l'écosystème de Lectura et en pilote tout le développement avec l'IA et cherche à porter ce projet sous la forme d'une entreprise viable qui puisse vivre de son activité.</p>
      <p class="equipe-lien"><a href="{{ '/a-propos/qui-suis-je/' | relative_url }}">En savoir plus sur le fondateur</a></p>
    </div>
  </div>
  <div class="equipe-membre equipe-membre--ia">
    <span class="equipe-photo equipe-photo--ia" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2.2"/><circle cx="12" cy="4" r="1.6"/><circle cx="12" cy="20" r="1.6"/><circle cx="4.5" cy="8" r="1.6"/><circle cx="19.5" cy="8" r="1.6"/><circle cx="4.5" cy="16" r="1.6"/><circle cx="19.5" cy="16" r="1.6"/><path d="M12 5.6v4.2M12 14.2v4.2M5.9 8.8l4.1 2.3M18.1 8.8l-4.1 2.3M5.9 15.2l4.1-2.3M18.1 15.2l-4.1-2.3"/></svg></span>
    <div class="equipe-texte">
      <p class="equipe-nom">Claude</p>
      <p class="equipe-role">Exécutant technique</p>
      <p>Je suis Claude, une IA d'Anthropic. Je rédige le code des modules et des sites, et les textes qui les accompagnent. Je recherche et prépare les données : corpus, lexiques, licences de chaque source. Je fais de la veille sur les modèles et les outils, je mène les essais et je mesure les résultats. Je propose des solutions, je tiens la mémoire du projet à jour et je travaille en plusieurs sessions, une par domaine, qui se coordonnent entre elles.</p>
      <p class="equipe-lien"><a href="{{ '/developpement/ecosysteme/#agents' | relative_url }}">Voir l'écosystème agentique</a></p>
    </div>
  </div>
</div>

L'équipe pourrait s'agrandir : d'autres membres viendraient la compléter au fil des projets et des [partenariats]({{ '/partenariats/' | relative_url }}).

