---
title: Modules
layout: default
permalink: /solutions/modules/
---

Quatorze packages Python autonomes pour le traitement linguistique et la synthese vocale du francais, distribues sur PyPI. Installez tout d'un coup avec `pip install lectura` ou chaque module independamment. Zero dependance sur les modules de base, type hints complets (Python 3.10+).

<div class="home-grid">
  <div class="home-card">
    <h2>Tokeniseur</h2>
    <p>Normalisation et tokenisation du francais, detection de 15+ types de formules.</p>
    <code class="card-install">pip install lectura-tokeniseur</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/modules/tokeniseur/' | relative_url }}">Details & Demo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-tokeniseur/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/Tokeniseur">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Phonemiseur (G2P)</h2>
    <p>Modele unifie BiLSTM : phonemisation IPA (98.5%), POS-tagging, morphologie, liaison, groupes de lecture.</p>
    <code class="card-install">pip install lectura-phonemiseur</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/modules/g2p/' | relative_url }}">Details & Demo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-phonemiseur/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/Phonemiseur">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Graphemiseur (P2G)</h2>
    <p>Modele core P2G V7 : conversion IPA → orthographe avec attention cross et lex_select (~95%), POS-tagging (98%), morphologie. Pipeline complet (formules + noms propres) : <code>pip install lectura-p2g</code>.</p>
    <code class="card-install">pip install lectura-graphemiseur</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/modules/p2g/' | relative_url }}">Details & Demo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-graphemiseur/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/Graphemiseur">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Aligneur-Syllabeur</h2>
    <p>Pivot central : alignement grapheme-phoneme, groupes de lecture, syllabation avec attaque/noyau/coda.</p>
    <code class="card-install">pip install lectura-aligneur</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/modules/syllabeur/' | relative_url }}">Details & Demo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-aligneur/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/Aligneur">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Lexique</h2>
    <p>Outil generique d'acces a un lexique francais (Lexique383, GLAFF, LeXiK...) : conjugaison, rimes, synonymes, anagrammes.</p>
    <code class="card-install">pip install lectura-lexique</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/modules/lexique/' | relative_url }}">Details</a>
      <a class="more-link" href="https://pypi.org/project/lectura-lexique/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/Lexique">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Formules</h2>
    <p>Lecture des nombres, dates, heures, sigles, monnaies, fractions — avec phonetique IPA.</p>
    <code class="card-install">pip install lectura-formules</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/modules/formules/' | relative_url }}">Details & Demo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-formules/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/Formules">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>Correcteur</h2>
    <p>Correction orthographique et grammaticale : homophones, accords, conjugaison, participes passes.</p>
    <code class="card-install">pip install lectura-correcteur</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/modules/correcteur/' | relative_url }}">Details</a>
      <a class="more-link" href="https://pypi.org/project/lectura-correcteur/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/Correcteur">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>STT</h2>
    <p>Transcription audio du francais : decodeur CTC medium (audio → phones IPA, 10.6M params, PER ~4.34%) + pipeline STT complet (CTC + P2G v7 + post-traitement grammatical, WER ~15% — comparable a Whisper small avec 10x moins de parametres).</p>
    <code class="card-install">pip install lectura-stt[p2g]</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/modules/ctc/' | relative_url }}">Details & Demo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-ctc/">CTC PyPI</a>
      <a class="more-link" href="https://pypi.org/project/lectura-stt/">STT PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/STT">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>TTS Monospeaker</h2>
    <p>Synthese vocale neuronale francais : FastPitch-Lite V6 + HiFi-GAN, controles prosodiques, retimbre multi-voix optionnel, ~50x temps-reel.</p>
    <code class="card-install">pip install lectura-tts-monospeaker</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/modules/tts/' | relative_url }}">Details & Demo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-tts-monospeaker/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/TTS-Monospeaker">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>TTS Diphone</h2>
    <p>Synthese vocale par concatenation de diphones WORLD : prosodie reglee, retimbre multi-voix, 3 modes de lecture, 44.1 kHz.</p>
    <code class="card-install">pip install lectura-tts-diphone</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/modules/tts-diphone/' | relative_url }}">Details & Demo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-tts-diphone/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/TTS-Diphone">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>TTS Multi-Speaker</h2>
    <p>Synthese vocale multi-speaker : 6 voix francaises + 7 styles, encodeur unifie ONNX, ~40 Mo INT8.</p>
    <code class="card-install">pip install lectura-tts-multispeaker</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/modules/tts-multispeaker/' | relative_url }}">Details & Demo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-tts-multispeaker/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/TTS-MultiSpeaker">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>VoiceConversion</h2>
    <p>Conversion vocale neuronale : meta-package unifie RVC + OpenVoice zero-shot, presets, blend de voix.</p>
    <code class="card-install">pip install lectura-vc</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/modules/vc/' | relative_url }}">Details & Demo</a>
      <a class="more-link" href="https://pypi.org/project/lectura-vc/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/VC">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>VC ZeroShot</h2>
    <p>Conversion vocale zero-shot via OpenVoice v2 : presets, blend pondere, trick SR formants, ~126 Mo.</p>
    <code class="card-install">pip install lectura-vc-zeroshot</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/modules/vc-zeroshot/' | relative_url }}">Details</a>
      <a class="more-link" href="https://pypi.org/project/lectura-vc-zeroshot/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/VC-ZeroShot">GitHub</a>
    </div>
  </div>
  <div class="home-card">
    <h2>VC Locuteurs</h2>
    <p>Conversion vocale RVC vers 6 voix francaises pre-entrainees (3F + 3M), ONNX pur, ~1.4 Go.</p>
    <code class="card-install">pip install lectura-vc-locuteurs</code>
    <div class="card-links">
      <a class="more-link" href="{{ '/solutions/modules/vc-locuteurs/' | relative_url }}">Details</a>
      <a class="more-link" href="https://pypi.org/project/lectura-vc-locuteurs/">PyPI</a>
      <a class="more-link" href="https://github.com/maxcarriere/lectura-modules/tree/main/VC-Locuteurs">GitHub</a>
    </div>
  </div>
</div>

---

## Installation rapide

```bash
# Tous les modules d'un coup
pip install lectura

# Un seul module
pip install lectura-tokeniseur

# Phonemiseur (G2P) — fonctionne immediatement via l'API (zero config)
pip install lectura-phonemiseur

# Pipeline G2P complet (tokeniseur + formules + phonemiseur + groupes de lecture)
pip install lectura-g2p

# Pipeline P2G complet (graphemiseur + formules + noms propres)
pip install lectura-p2g

# Pipeline STT complet (audio → texte, CTC + P2G)
pip install lectura-stt[p2g]
```

Par defaut, les modules Phonemiseur, Graphemiseur et Aligneur-Syllabeur utilisent l'**API Lectura** (`api.lec-tu-ra.com`) — aucune configuration necessaire. Pour l'inference locale, installez les modeles et les backends optionnels (`lectura-phonemiseur[onnx]`).
