---
title: Blog
layout: default
permalink: /decouvrir/articles/
description: "Le blog de Lectura : les nouveautés des projets et, au fil des articles, les différents aspects de Lectura (phonétique, lexique, voix, travail avec l'IA)."
---

{% comment %} Blog de Découvrir (Maxime, 11/11/2026 ; nommé « Blog » et mis en blocs le 12/11, ancienne version dans brain/lectura/site/anciennes-pages/). Un article = un fichier dans _posts/ (AAAA-MM-JJ-titre.md) ; le résumé du bloc est sa « description ». {% endcomment %}

Les articles de ce blog présentent les nouveautés de Lectura, ou un aspect du projet : les idées qui le portent, ses ressources, ses outils et sa façon de travailler. Chaque nouveauté y est d'abord racontée, avant d'être relayée sur les réseaux.

---

<div class="blog-liste" markdown="0">
{%- for a in site.posts %}
  <article class="blog-bloc">
    <h2><a href="{{ a.url | relative_url }}">{{ a.title }}</a></h2>
    <p class="article-meta"><time datetime="{{ a.date | date_to_xmlschema }}">{% include date-fr.html date=a.date %}</time></p>
    <p class="blog-resume">{% if a.description %}{{ a.description }}{% else %}{{ a.excerpt | strip_html | truncatewords: 40 }}{% endif %}</p>
    <a class="more-link" href="{{ a.url | relative_url }}">Lire l'article</a>
  </article>
{%- endfor %}
</div>

<p class="article-meta">Suivre les nouveaux articles : <a href="{{ '/articles/feed.xml' | relative_url }}">flux RSS</a>.</p>
