---
title: TTS Monospeaker
layout: default
permalink: /solutions/modules/tts/
---

<div class="module-header">
  <h1>Lectura TTS Monospeaker</h1>
  <p class="module-tagline">Synthese vocale neuronale francais — FastPitch-Lite + HiFi-GAN (ONNX)</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-tts-monospeaker/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/TTS-Monospeaker" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-tts-monospeaker</code>
  </div>
</div>

## Presentation

Moteur de synthese vocale neuronale pour le francais, base sur **FastPitch-Lite** (modele acoustique) et **HiFi-GAN** (vocoder). Produit un signal audio naturel a 22050 Hz a partir de texte ou de phonemes IPA.

| Caracteristique | Valeur |
|-----------------|--------|
| **Qualite** | Voix feminine naturelle (corpus SIWIS) |
| **Debit** | ~50x temps-reel sur CPU (ONNX) |
| **Taille modele** | ~17 Mo (ONNX INT8, 3 fichiers) |
| **Entree** | Texte francais ou phonemes IPA |
| **Sortie** | Audio 22050 Hz, float32 |
| **Controles prosodiques** | Pitch, energie, debit, pauses |
| **Retimbre** | Changement de voix optionnel via OpenVoice `[vc]` |

Deux modes d'utilisation : **API** (zero dependance, zero config) ou **local** (ONNX Runtime, inference offline).

---

## Essayer en ligne

*La demo utilise l'API Lectura — aucun telechargement necessaire.*

<div class="tts-demo">
  <input type="text" class="tts-input" value="Bonjour, je suis la voix de Lectura." placeholder="Entrez du texte francais...">
  <button class="tts-btn" type="button">Synthetiser</button>
  <div class="tts-progress-container"><div class="tts-progress"></div></div>
  <pre class="tts-output">Cliquez sur le bouton pour synthetiser.</pre>
  <table class="tts-timings"></table>
</div>

<script src="{{ '/assets/js/tts-demo.js' | relative_url }}"></script>

---

## Exemple de code

```python
from lectura_tts_monospeaker import creer_engine

engine = creer_engine()  # mode API par defaut (zero config)

# A partir de texte
audio = engine.synthesize(text="Bonjour, comment allez-vous ?")
print(f"Duree : {len(audio) / 22050:.2f}s")

# A partir d'IPA avec controles prosodiques
audio = engine.synthesize(
    ipa="bɔ̃ʒuʁ kɔmɑ̃ ale vu",
    pitch_shift=0.0,
    pitch_range=1.3,
    energy_scale=1.0,
    duration_scale=1.0,
)

# Sauvegarder en WAV
engine.save_wav(audio, "output.wav")
```

---

## Architecture

```
Texte → [G2P: grapheme→phoneme] → Phonemes IPA
                                        ↓
                              FastPitch-Lite Encoder
                              (phone_ids → enc_out + dur/pitch/energy)
                                        ↓
                              Length Regulation + Prosody Embedding
                                        ↓
                              FastPitch-Lite Decoder
                              (decoder_in → mel spectrogram 80 bandes)
                                        ↓
                              HiFi-GAN Vocoder
                              (mel → waveform 22050 Hz)
```

Le pipeline complet est split en **3 modeles ONNX** independants pour une flexibilite maximale (quantification, streaming, remplacement individuel).

---

## Installation

```bash
pip install lectura-tts-monospeaker              # mode API (zero config, zero dependance)
pip install lectura-tts-monospeaker[onnx]        # backend ONNX Runtime local
pip install lectura-tts-monospeaker[onnx,g2p]    # avec G2P integre (texte → audio)
pip install lectura-tts-monospeaker[onnx,g2p,vc] # + retimbre multi-voix (OpenVoice)
pip install lectura-tts-monospeaker[all]         # tout
```

Par defaut, le module utilise l'API Lectura (aucune configuration necessaire). Le backend local ONNX necessite les modeles pre-entraines, disponibles sous [licence commerciale](mailto:contact@lec-tu-ra.com).

### Retimbre (optionnel)

Avec `[vc]`, le parametre `voix=` permet de changer le timbre de la voix synthetisee via OpenVoice (zero-shot) :

```python
from lectura_tts_monospeaker import synthetiser

# Voix preset
audio = synthetiser("Bonjour le monde.", voix="bernard")

# Blend de voix
audio = synthetiser("Bonjour.", voix={"siwis": 0.5, "nadine": 0.5})

# Variante grave/aigu (-1 a +1)
audio = synthetiser("Bonjour.", voix="ezwa", voix_variante=-0.5)
```

Presets disponibles : siwis, ezwa, nadine, bernard, gilles, zeckou.

---

## Caracteristiques techniques

- **FastPitch-Lite V6** : ~5M parametres, encodeur + decodeur, GAN fine-tuning
- **HiFi-GAN** : vocoder universel, signal 22050 Hz
- **2 backends** : API (zero config) ou ONNX Runtime local (modeles sous licence commerciale)
- **Controles prosodiques** : pitch_shift, pitch_range, energy_scale, duration_scale, pause_scale
- **Retimbre optionnel** `[vc]` : changement de voix via OpenVoice zero-shot (6 presets, blend pondere, variante formants)
- **Factory `creer_engine()`** : detection automatique du meilleur mode
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (code) — les modeles pre-entraines sont sous [licence commerciale](mailto:contact@lec-tu-ra.com)
