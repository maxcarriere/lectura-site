---
title: Modules métiers
layout: default
permalink: /developpement/modules/metiers/
---

Pipelines spécialisés construits sur les [modules outils]({{ '/developpement/modules/outils/' | relative_url }}). Chaque module métier combine plusieurs briques pour répondre à un besoin applicatif.

<div class="home-grid">
  <div class="home-card">
    <h2>Phonémiseur (G2P)</h2>
    <p>Modèle unifié BiLSTM : phonémisation IPA (98.5%), POS-tagging, morphologie, liaison, groupes de lecture.</p>
    <code class="card-install">pip install lectura-phonemiseur</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/metiers/g2p/' | relative_url }}">Détails & Démo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-phonemiseur/">PyPI</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Graphémiseur (P2G)</h2>
    <p>Modèle core P2G V7 : conversion IPA → orthographe avec attention cross et lex_select (~95%).</p>
    <code class="card-install">pip install lectura-graphemiseur</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/metiers/p2g/' | relative_url }}">Détails & Démo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-graphemiseur/">PyPI</a>
    </div>
  </div>
  <div class="home-card">
    <h2>TTS Monospeaker</h2>
    <p>Synthèse vocale neuronale : FastPitch-Lite V6 + HiFi-GAN, contrôles prosodiques, ~50x temps-réel.</p>
    <code class="card-install">pip install lectura-tts-monospeaker</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/metiers/tts-mono/' | relative_url }}">Détails & Démo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-tts-monospeaker/">PyPI</a>
    </div>
  </div>
  <div class="home-card">
    <h2>TTS Diphone</h2>
    <p>Synthèse par concaténation de diphones WORLD : prosodie réglée, retimbre multi-voix, 44.1 kHz.</p>
    <code class="card-install">pip install lectura-tts-diphone</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/metiers/tts-diphone/' | relative_url }}">Détails & Démo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-tts-diphone/">PyPI</a>
    </div>
  </div>
  <div class="home-card">
    <h2>TTS Multi-Speaker</h2>
    <p>Synthèse multi-speaker : 6 voix françaises + 7 styles, encodeur unifié ONNX, ~40 Mo INT8.</p>
    <code class="card-install">pip install lectura-tts-multispeaker</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/metiers/tts-multi/' | relative_url }}">Détails & Démo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-tts-multispeaker/">PyPI</a>
    </div>
  </div>
  <div class="home-card">
    <h2>STT</h2>
    <p>Transcription audio : décodeur CTC medium (PER ~4.34%) + pipeline STT complet (WER ~15%).</p>
    <code class="card-install">pip install lectura-stt[p2g]</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/metiers/stt/' | relative_url }}">Détails & Démo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-stt/">PyPI</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Correcteur</h2>
    <p>Correction orthographique et grammaticale : homophones, accords, conjugaison, participes passés.</p>
    <code class="card-install">pip install lectura-correcteur</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/metiers/correcteur/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://pypi.org/project/lectura-correcteur/">PyPI</a>
    </div>
  </div>
  <div class="home-card">
    <h2>VoiceConversion</h2>
    <p>Conversion vocale neuronale : méta-package unifié RVC + OpenVoice zero-shot, presets, blend de voix.</p>
    <code class="card-install">pip install lectura-vc</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/metiers/vc/' | relative_url }}">Détails & Démo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-vc/">PyPI</a>
    </div>
  </div>
  <div class="home-card">
    <h2>VC ZeroShot</h2>
    <p>Conversion vocale zero-shot via OpenVoice v2 : presets, blend pondéré, trick SR formants, ~126 Mo.</p>
    <code class="card-install">pip install lectura-vc-zeroshot</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/metiers/vc-zeroshot/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://pypi.org/project/lectura-vc-zeroshot/">PyPI</a>
    </div>
  </div>
  <div class="home-card">
    <h2>VC Locuteurs</h2>
    <p>Conversion vocale RVC vers 6 voix françaises pré-entraînées (3F + 3M), ONNX pur, ~1.4 Go.</p>
    <code class="card-install">pip install lectura-vc-locuteurs</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/developpement/modules/metiers/vc-locuteurs/' | relative_url }}">Détails</a>
      <a class="more-link" href="https://pypi.org/project/lectura-vc-locuteurs/">PyPI</a>
    </div>
  </div>
</div>
