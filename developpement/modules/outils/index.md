---
title: Modules outils
layout: default
permalink: /developpement/modules/outils/
---

Briques atomiques réutilisables du pipeline Lectura. Chaque module est autonome et peut être utilisé indépendamment. Les briques sont combinées par les [pipelines métiers]({{ '/developpement/modules/metiers/' | relative_url }}) pour former des applications complètes.

## Traitement du texte

<div class="home-grid">
  <div class="home-card">
    <h2>Tokeniseur</h2>
    <p>Normalisation et tokenisation du français, détection de 15+ types de formules.</p>
    <code class="card-install">pip install lectura-tokeniseur</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/outils/tokeniseur/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/Tokeniseur">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Formules</h2>
    <p>Lecture des nombres, dates, heures, sigles, monnaies, fractions — avec phonétique IPA.</p>
    <code class="card-install">pip install lectura-formules</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/outils/formules/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://pypi.org/project/lectura-formules/">PyPI</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Phonémiseur</h2>
    <p>Modèle BiLSTM multi-tête (1.75M params) : G2P 98.5%, POS, morphologie, liaison.</p>
    <code class="card-install">pip install lectura-phonemiseur</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/outils/phonemiseur/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/Phonemiseur">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Graphémiseur</h2>
    <p>Modèle BiLSTM V7 (3.2M params) : P2G ~95%, attention cross, lex_select.</p>
    <code class="card-install">pip install lectura-graphemiseur</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/outils/graphemiseur/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://pypi.org/project/lectura-graphemiseur/">PyPI</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Aligneur-Syllabeur</h2>
    <p>Pivot central : alignement graphème-phonème, groupes de lecture, syllabation avec attaque/noyau/coda.</p>
    <code class="card-install">pip install lectura-aligneur</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/outils/aligneur/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/Aligneur">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Lexique</h2>
    <p>Outil générique d'accès à un lexique français : conjugaison, rimes, synonymes, anagrammes.</p>
    <code class="card-install">pip install lectura-lexique</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/outils/lexique/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/Lexique">GitHub</a>
    </div>
  </div>
</div>

## Synthèse, reconnaissance et conversion vocale

<div class="home-grid">
  <div class="home-card">
    <h2>TTS Monospeaker</h2>
    <p>Matcha-Conformer + HiFi-GAN (17.9M params) : 7 styles, flow-matching, ~30x temps-réel.</p>
    <code class="card-install">pip install lectura-monospeaker</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/outils/tts-mono/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://pypi.org/project/lectura-monospeaker/">PyPI</a>
    </div>
  </div>
  <div class="home-card">
    <h2>TTS Multi-Speaker</h2>
    <p>FastPitch-Lite v6 (24.3M params) : 6 voix, 7 styles, encodeur unifié, ~50x temps-réel.</p>
    <code class="card-install">pip install lectura-multispeaker</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/outils/tts-multi/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://pypi.org/project/lectura-multispeaker/">PyPI</a>
    </div>
  </div>
  <div class="home-card">
    <h2>TTS Diphone</h2>
    <p>Concaténation WORLD (1290 diphones) : prosodie réglée, 3 modes de lecture, 44.1 kHz.</p>
    <code class="card-install">pip install lectura-diphone</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/outils/tts-diphone/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://pypi.org/project/lectura-diphone/">PyPI</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Décodeur</h2>
    <p>Décodeur phonétique neural CNN-BiGRU-CTC (10.6M params, PER ~4.34%) + STT-Formules (600K params).</p>
    <code class="card-install">pip install lectura-decodeur</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/outils/ctc/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://pypi.org/project/lectura-decodeur/">PyPI</a>
    </div>
  </div>
  <div class="home-card">
    <h2>VC ZeroShot</h2>
    <p>OpenVoice v2 ONNX : conversion zero-shot, presets, blend pondéré, trick SR formants (~126 Mo).</p>
    <code class="card-install">pip install lectura-vc-zeroshot</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/outils/vc-zeroshot/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://pypi.org/project/lectura-vc-zeroshot/">PyPI</a>
    </div>
  </div>
  <div class="home-card">
    <h2>VC Locuteurs</h2>
    <p>RVC ONNX : 6 voix françaises pré-entraînées (3F + 3M), HuBERT + RMVPE (~1.4 Go).</p>
    <code class="card-install">pip install lectura-vc-locuteurs</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/outils/vc-locuteurs/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://pypi.org/project/lectura-vc-locuteurs/">PyPI</a>
    </div>
  </div>
</div>
