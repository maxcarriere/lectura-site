---
title: Pipelines métiers
layout: default
permalink: /developpement/modules/metiers/
---

Pipelines applicatifs qui orchestrent les [briques outils]({{ '/developpement/modules/outils/' | relative_url }}) pour répondre à un besoin métier complet. Chaque pipeline combine plusieurs modules atomiques dans une chaîne cohérente.

<div class="home-grid">
  <div class="home-card">
    <h2>Pipeline G2P</h2>
    <p>Texte → phonèmes IPA : tokenisation, formules, phonémisation, liaison, syllabation.</p>
    <code class="card-install">pip install lectura-g2p</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/metiers/g2p/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://pypi.org/project/lectura-g2p/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/G2P">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Pipeline P2G</h2>
    <p>Phonèmes IPA → texte : graphémiseur + formules + noms propres + entités.</p>
    <code class="card-install">pip install lectura-p2g</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/metiers/p2g/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://pypi.org/project/lectura-p2g/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/P2G">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Pipeline TTS</h2>
    <p>Texte → audio : G2P + choix de moteur (Monospeaker, Multi-Speaker, Diphone) + VC optionnel.</p>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/metiers/tts/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/TTS">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Pipeline STT</h2>
    <p>Audio → texte : Décodeur (PER ~4.34%) + P2G + formules. WER ~15%, 10x plus léger que Whisper.</p>
    <code class="card-install">pip install lectura-stt</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/metiers/stt/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://pypi.org/project/lectura-stt/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/STT">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Pipeline VC</h2>
    <p>Conversion vocale : méta-package unifié RVC + OpenVoice zero-shot, 4 modes, 6 voix.</p>
    <code class="card-install">pip install lectura-vc</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/metiers/vc/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://pypi.org/project/lectura-vc/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/VC">GitHub</a>
    </div>
  </div>
</div>
