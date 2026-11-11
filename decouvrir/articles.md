---
title: Articles
layout: default
permalink: /decouvrir/articles/
description: "Les articles de Lectura : l'approche phonétique, le travail avec l'IA, les nouveautés des projets."
---

{% comment %} Blog de Découvrir (Maxime, 11/11/2026) : les articles, du plus récent au plus ancien. Un article = un fichier dans _posts/ (AAAA-MM-JJ-titre.md). {% endcomment %}

Les articles de Lectura, publiés au fil des projets : les idées qui les portent, la façon de travailler, les nouveautés.

<ul class="articles-liste" markdown="0">
{%- for a in site.posts %}
  <li><a href="{{ a.url | relative_url }}">{{ a.title }}</a> <small><time datetime="{{ a.date | date_to_xmlschema }}">{% include date-fr.html date=a.date %}</time></small>{% if a.description %}<br><span class="al-resume">{{ a.description }}</span>{% endif %}</li>
{%- endfor %}
</ul>

<p class="article-meta">Suivre les nouveaux articles : <a href="{{ '/articles/feed.xml' | relative_url }}">flux RSS</a>.</p>
