---
title: "Bienvenue sur Lectura.world !"
accueil: true
hide_title: true
accueil_image: /assets/images/accueil/planisphere.webp
layout: default
og_title: "Lectura — l'IA au service du langage et de sa lecture"
description: "Lectura met l'IA au service du langage et de sa lecture : lire à haute voix (synthèse et reconnaissance vocales, analyse du français écrit) et apprendre à lire (lecture syllabique, ressources éducatives). Démos gratuites, licences et services."
image: /assets/images/og-lectura.png
---

{% comment %} Accueil (structure de Maxime, 11/11/2026 au soir) : présentation et porteur, projets, plan du site en un paragraphe, contact. Pas de lien « phonétique » pour l'instant (la page pourrait disparaître). {% endcomment %}

Lectura est un écosystème de projets autour du **langage** et de sa **lecture**, construit sur l'exploitation de la phonétique comme passerelle naturelle entre la langue écrite et la langue parlée. Historiquement tourné vers le **français**, qui constitue son socle de développement, Lectura s'ouvre progressivement à d'autres langues, à commencer par l'anglais. Son enjeu est double : mettre l'intelligence artificielle au service de l'apprentissage, et s'inspirer de la façon dont l'humain apprend pour mieux apprendre à une machine.

Lectura est développé par Maxime Carrière, entrepreneur individuel, grâce à une méthode de développement augmenté par l'IA où l'intelligence artificielle est un partenaire de production à part entière.

<p class="ap-savoir ap-centre"><a href="{{ '/a-propos/vision/' | relative_url }}">En savoir plus sur Lectura</a><br>
<a href="{{ '/a-propos/qui-suis-je/' | relative_url }}">En savoir plus sur le porteur du projet</a></p>

---

<div class="accueil-projets" markdown="0">
  <h2>Les différents projets</h2>
  <div class="ap-projets">
    <a href="https://lexique.lectura.world" title="LecturaLexique : le lexique du français"><span class="cp-icone">{% include icone-projet.html nom='dictionary' %}</span><span>Lexique</span></a>
    <a href="https://lingua.lectura.world" title="LecturaLingua : l'écrit"><span class="cp-icone">{% include icone-projet.html nom='letters' %}</span><span>Lingua</span></a>
    <a href="https://voice.lectura.world" title="LecturaVoice : la voix"><span class="cp-icone">{% include icone-projet.html nom='headphones' %}</span><span>Voice</span></a>
  </div>
  <p class="ap-projets-suite">Les projets sont régulièrement améliorés et mis à jour. Les outils sont testables gratuitement et sans inscription. D’autres projets sont encore en phase de recherche ou en cours de développement.</p>
  <p class="ap-savoir"><a href="{{ '/decouvrir/projets/' | relative_url }}">En savoir plus sur les projets</a></p>
</div>

---

<div class="accueil-nouveautes" markdown="0">
  <h2>Nouveautés</h2>
  <table class="nouveautes-table">
  {%- for a in site.posts limit: 10 %}
    <tr><td class="nt-date"><time datetime="{{ a.date | date_to_xmlschema }}">{% include date-fr.html date=a.date %}</time></td><td class="nt-titre"><a href="{{ a.url | relative_url }}">{{ a.title }}</a></td></tr>
  {%- endfor %}
  </table>
  <p class="ap-savoir"><a href="{{ '/decouvrir/articles/' | relative_url }}">Tout le blog</a></p>
</div>

---

<h2 class="accueil-titre">Objectifs</h2>

L'objectif de Lectura est multiple : développer des solutions logicielles qui font avancer les technologies du langage et de la voix ; mettre ces avancées en application dans des produits numériques éducatifs et ludiques, à destination du grand public ; explorer de nouvelles méthodes de travail, en lien étroit avec l'intelligence artificielle.

D'un point de vue technique, Lectura peut être vu comme un écosystème de projets modulaires, dont les différents composants sont présentés dans la section [Développement]({{ '/developpement/' | relative_url }}). Lectura est ouvert aux [partenariats]({{ '/partenariats/' | relative_url }}), pour collaborer ou financer la suite de ses travaux.

L'[offre commerciale]({{ '/offres/' | relative_url }}) de Lectura s'adresse à la fois aux [entreprises]({{ '/offres/entreprises/' | relative_url }}), via ses briques logicielles, et aux [particuliers]({{ '/offres/particuliers/' | relative_url }}), via des produits éducatifs finis.

<p class="ap-savoir ap-centre"><a href="{{ '/solutions/' | relative_url }}">En savoir plus sur les solutions</a><br>
<a href="{{ '/offres/' | relative_url }}">En savoir plus sur les offres</a><br>
<a href="{{ '/developpement/' | relative_url }}">En savoir plus sur la partie technique</a><br>
<a href="{{ '/partenariats/' | relative_url }}">En savoir plus sur les partenariats</a></p>

---

<div class="accueil-contact" markdown="0">
  <h2>Contact &amp; Liens</h2>
  <p>Un projet, une question ? Écrivez à
    <a id="ac-email" class="ac-email" href="{{ '/contact/' | relative_url }}" aria-label="Adresse e-mail de Lectura"><span class="ac-rev">moc.liamg<span>&#64;</span>dlrow.arutcel</span></a>
    ou passez par la <a href="{{ '/contact/' | relative_url }}">page Contact</a>.</p>
  <p>N’hésitez pas à visiter les autres sites du même auteur : <a href="https://humanuscrit.com/">Humanuscrit</a> (écriture) et <a href="https://www.zmaths.net/">Zmaths</a> (cours de mathématiques).</p>
</div>
<script>
(function () {
  {% comment %} adresse écrite à l'envers dans le code (remise à l'endroit par le CSS) et lien assemblé par le script : illisible pour les robots {% endcomment %}
  var a = document.getElementById('ac-email');
  if (a) a.href = 'mailto:' + ['lectura.world', 'gmail.com'].join('@');
})();
</script>
