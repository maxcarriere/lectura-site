---
title: TTS Multi-Speaker
layout: default
permalink: /solutions/modules/tts-multispeaker/
---

<div class="module-header">
  <h1>Lectura TTS Multi-Speaker</h1>
  <p class="module-tagline">Synthese vocale neuronale multi-speaker francais — 6 voix + style conditioning (ONNX)</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-tts-multispeaker/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/TTS-MultiSpeaker" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-tts-multispeaker</code>
  </div>
</div>

## Presentation

Moteur de synthese vocale neuronale multi-speaker pour le francais, base sur **FastPitch-Lite** (modele acoustique unifie) et **HiFi-GAN** (vocoder). Supporte **6 voix** et **8 presets de style** avec un modele unique de ~17 Mo.

| Caracteristique | Valeur |
|-----------------|--------|
| **Voix** | 6 speakers (3F + 3M) : Siwis, Ezwa, Nadine, Bernard, Gilles, Zeckou |
| **Style** | 8 presets : neutral, expressive, calm, dialogue, fast, slow, rising, suspense |
| **Taille modele** | ~17.6 Mo (ONNX INT8, 3 fichiers unifies) |
| **Debit** | ~50x temps-reel sur CPU (ONNX) |
| **Entree** | Texte francais ou phonemes IPA |
| **Sortie** | Audio 22050 Hz, float32 |
| **Controles prosodiques** | Pitch, energie, debit, pauses + vecteur style 5D |

Deux modes d'utilisation : **API** (zero dependance, zero config) ou **local** (ONNX Runtime, inference offline).

---

## Essayer en ligne

*La demo utilise l'API Lectura — aucun telechargement necessaire.*

<div class="tts-demo tts-multi-demo">
  <div class="tts-controls">
    <label for="tts-speaker">Voix :</label>
    <select id="tts-speaker" class="tts-speaker">
      <option value="siwis" selected>Siwis (F)</option>
      <option value="ezwa">Ezwa (F)</option>
      <option value="nadine">Nadine (F)</option>
      <option value="bernard">Bernard (M)</option>
      <option value="gilles">Gilles (M)</option>
      <option value="zeckou">Zeckou (M)</option>
    </select>
    <label for="tts-style">Style :</label>
    <select id="tts-style" class="tts-style">
      <option value="" selected>neutral</option>
      <option value="expressive">expressive</option>
      <option value="calm">calm</option>
      <option value="dialogue">dialogue</option>
      <option value="fast">fast</option>
      <option value="slow">slow</option>
      <option value="rising">rising</option>
      <option value="suspense">suspense</option>
    </select>
  </div>
  <input type="text" class="tts-input" value="Bonjour, je suis la voix de Lectura." placeholder="Entrez du texte francais...">
  <button class="tts-btn" type="button">Synthetiser</button>
  <div class="tts-progress-container"><div class="tts-progress"></div></div>
  <pre class="tts-output">Cliquez sur le bouton pour synthetiser.</pre>
  <table class="tts-timings"></table>
</div>

<script src="{{ '/assets/js/tts-multi-demo.js' | relative_url }}"></script>

---

## Exemple de code

```python
from lectura_tts_multispeaker import creer_engine, liste_speakers

# Lister les voix disponibles
for s in liste_speakers():
    print(f"{s['label']} ({s['gender']})")

# Creer un engine (mode API par defaut)
engine = creer_engine()

# Synthese avec choix de voix et style
audio = engine.synthesize(
    text="Bonjour, comment allez-vous ?",
    speaker="bernard",
    style="expressive",
)
print(f"Duree : {len(audio.samples) / audio.sample_rate:.2f}s")

# Changer de voix dynamiquement
engine.set_speaker("nadine")
audio = engine.synthesize(
    text="Je suis Nadine, enchantee.",
    style="calm",
)

# Synthese a partir de phonemes IPA avec style personnalise
audio = engine.synthesize_phonemes(
    "bɔ̃ʒuʁ kɔmɑ̃ ale vu",
    phrase_type=0,
    style_vector=[0.8, 0.6, 1.0, 0.0, 0.0],
    pitch_range=1.3,
    energy_scale=1.0,
)
```

---

## Architecture

```
Texte → [G2P: grapheme→phoneme] → Phonemes IPA
                                        ↓
                              FastPitch-Lite Encoder (unifie)
                              (phone_ids + speaker_id + style_vector
                               → enc_out + dur/pitch/energy)
                                        ↓
                              Length Regulation + Prosody Embedding
                                        ↓
                              FastPitch-Lite Decoder
                              (decoder_in → mel spectrogram 80 bandes)
                                        ↓
                              HiFi-GAN Vocoder
                              (mel → waveform 22050 Hz)
```

Le pipeline complet utilise **3 modeles ONNX unifies** : un encodeur partage pour les 6 voix (avec `speaker_id` et `style_vector` en entree), un decodeur et un vocoder.

---

## Installation

```bash
pip install lectura-tts-multispeaker           # mode API (zero config, zero dependance)
pip install lectura-tts-multispeaker[onnx]     # backend ONNX Runtime local
pip install lectura-tts-multispeaker[onnx,g2p] # avec G2P integre (texte → audio)
```

Par defaut, le module utilise l'API Lectura (aucune configuration necessaire). Le backend local ONNX necessite les modeles pre-entraines, disponibles sous [licence commerciale](mailto:contact@lec-tu-ra.com).

---

## Caracteristiques techniques

- **FastPitch-Lite unifie** : 3.8M parametres, 6 speakers + style conditioning (5 dims)
- **HiFi-GAN** : vocoder universel, signal 22050 Hz
- **2 backends** : API (zero config) ou ONNX Runtime local (modeles sous licence commerciale)
- **6 voix** : Siwis, Ezwa, Nadine (F) — Bernard, Gilles, Zeckou (M)
- **8 presets de style** : neutral, expressive, calm, dialogue, fast, slow, rising, suspense
- **Controles prosodiques** : pitch_shift, pitch_range, energy_scale, duration_scale, pause_scale
- **Factory `creer_engine()`** : detection automatique du meilleur mode
- **`set_speaker()`** : changement de voix dynamique sans recharger les modeles
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (code) — les modeles pre-entraines sont sous [licence commerciale](mailto:contact@lec-tu-ra.com)
