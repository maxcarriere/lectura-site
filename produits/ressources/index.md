---
title: Ressources
layout: default
permalink: /produits/ressources/
---

Corpus, données linguistiques et kits d'entraînement distribués par Lectura. Ces ressources sont le fruit du travail de développement des modules et peuvent servir de base à des projets de recherche, d'éducation ou de développement.

<div class="home-grid">
  <div class="home-card">
    <h2>LeXiK Lite</h2>
    <p>Versions allégées du lexique LeXiK : complète (1,52M entrées) et fréquente (314K entrées). Phonétique IPA, syllabes, orthocode, fréquences, morphologie.</p>
    <span class="status-badge status-dispo">Disponible</span>
    <div class="card-links">
      <a class="more-link" href="{{ '/produits/ressources/lexik-lite/' | relative_url }}">Détails</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Kit d'entraînement G2P / P2G</h2>
    <p>Corpus annoté (22 649 phrases), lexique aligné (1,16M mots), scripts d'entraînement PyTorch et modèles pré-entraînés pour reproduire les pipelines G2P et P2G de Lectura.</p>
    <span class="status-badge status-dispo">Disponible</span>
    <div class="card-links">
      <a class="more-link" href="{{ '/produits/ressources/kit-g2p-p2g/' | relative_url }}">Détails</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Corpus de Voix</h2>
    <p>880K phrases françaises avec transcription phonétique IPA alignée, issues de SIWIS, M-AILABS et Common Voice. Textes et alignements fournis, audio récupérable via les sources ouvertes.</p>
    <span class="status-badge status-dispo">Disponible</span>
    <div class="card-links">
      <a class="more-link" href="{{ '/produits/ressources/corpus-voix/' | relative_url }}">Détails</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Corpus de Syllabes</h2>
    <p>4 307 syllabes + 1 474 de liaison, avec décomposition phonétique et fichiers audio (voix homme et femme, Amazon Polly).</p>
    <span class="status-badge status-dispo">Disponible</span>
    <div class="card-links">
      <a class="more-link" href="{{ '/produits/ressources/corpus-syllabes/' | relative_url }}">Détails</a>
    </div>
  </div>
</div>

---

## Obtenir les ressources {#obtenir}

Les ressources sont distribuées sous forme d'archives zip. Deux modes d'accès sont disponibles :

### Lien direct (par email)

La façon la plus simple. [Contactez-nous]({{ '/contact/' | relative_url }}) en précisant les ressources souhaitées : nous vous envoyons par email un lien de téléchargement personnalisé, valable pour une durée limitée.

### Via l'API

Pour les développeurs ou les usages automatisés :

1. Contactez-nous pour obtenir une clé API avec accès aux ressources
2. Utilisez l'endpoint `GET /download/{resource_id}` de l'API pour télécharger les archives
3. L'endpoint `GET /download/` liste les ressources disponibles et leurs identifiants

**Authentification :** header `Authorization: Bearer <votre_clé>` — les clés de type « paid » ou « unlimited » donnent accès au téléchargement.

**Tarification :** nous contacter pour connaître les modalités d'accès selon votre usage (recherche, éducation, commercial).

<div class="cta-links" style="margin-top: 1.5rem;">
  <a href="{{ '/contact/' | relative_url }}">Nous contacter</a>
  <a href="https://api.lectura.world/docs#/Downloads" target="_blank">Documentation API</a>
</div>
