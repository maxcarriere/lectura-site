---
title: Modules
layout: default
permalink: /solutions/outils/modules/
---

Six packages Python autonomes pour le traitement linguistique du francais, distribues sur PyPI. Installez tout d'un coup avec `pip install lectura` ou chaque module independamment. Zero dependance sur les modules de base, type hints complets (Python 3.10+).

<div class="home-grid">
  <div class="home-card">
    <h2>Tokeniseur</h2>
    <p>Normalisation et tokenisation du francais, detection de 15+ types de formules.</p>
    <code class="card-install">pip install lectura-tokeniseur</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/outils/modules/tokeniseur/' | relative_url }}">Details & Demo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-tokeniseur/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/Tokeniseur">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>G2P — Grapheme vers Phoneme</h2>
    <p>Modele unifie BiLSTM : phonemisation IPA (98.5%), POS-tagging, morphologie, liaison.</p>
    <code class="card-install">pip install lectura-g2p</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/outils/modules/g2p/' | relative_url }}">Details & Demo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-g2p/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/G2P">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>P2G — Phoneme vers Grapheme</h2>
    <p>Conversion IPA → orthographe avec word feedback (93.1%), POS-tagging, morphologie.</p>
    <code class="card-install">pip install lectura-p2g</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/outils/modules/p2g/' | relative_url }}">Details & Demo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-p2g/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/P2G">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Aligneur-Syllabeur</h2>
    <p>Pivot central : alignement grapheme-phoneme, groupes de lecture, syllabation avec attaque/noyau/coda.</p>
    <code class="card-install">pip install lectura-aligneur</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/outils/modules/syllabeur/' | relative_url }}">Details & Demo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-aligneur/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/Aligneur">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Lexique</h2>
    <p>Acces unifie au lexique francais : conjugaison, rimes, synonymes, anagrammes, recherche multi-critere.</p>
    <code class="card-install">pip install lectura-lexique</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/outils/modules/lexique/' | relative_url }}">Details</a>
      <a class="more-link" href="https://pypi.org/project/lectura-lexique/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/Lexique">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Formules</h2>
    <p>Lecture des nombres, dates, heures, sigles, monnaies, fractions — avec phonetique IPA.</p>
    <code class="card-install">pip install lectura-formules</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/outils/modules/formules/' | relative_url }}">Details & Demo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-formules/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/Formules">GitHub</a>
    </div>
  </div>
</div>

---

## Installation rapide

```bash
# Tous les modules d'un coup
pip install lectura

# Avec backends ONNX pour G2P/P2G (recommande)
pip install lectura[onnx]

# Un seul module
pip install lectura-tokeniseur

# G2P avec backend ONNX
pip install lectura-g2p[onnx]
```
