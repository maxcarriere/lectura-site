---
title: TTS Multi-Speaker
layout: default
permalink: /developpement/modules/metiers/tts-multi/
redirect_from:
  - /solutions/modules/tts-multispeaker/
---

<div class="module-header">
  <h1>Lectura TTS Multi-Speaker</h1>
  <p class="module-tagline">Synthèse vocale neuronale multi-speaker français — 6 voix + style conditioning (ONNX)</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-tts-multispeaker/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/TTS-MultiSpeaker" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-tts-multispeaker</code>
  </div>
</div>

## Présentation

Moteur de synthèse vocale neuronale multi-speaker pour le français, basé sur **FastPitch-Lite v6** (modèle acoustique unifié, d_model=256) et **HiFi-GAN** (vocoder). Supporte **6 voix** et **8 presets de style** avec un modèle unique.

| Caractéristique | Valeur |
|-----------------|--------|
| **Voix** | 6 speakers (3F + 3M) : Siwis, Ezwa, Nadine, Bernard, Gilles, Zeckou |
| **Style** | 7 presets : neutre, narratif, dialogue, expressif, méditatif, rapide, lent |
| **Taille modèle** | ~40 Mo (ONNX INT8) / ~118 Mo (ONNX FP32) |
| **Débit** | ~50x temps-réel sur CPU (ONNX) |
| **Entrée** | Texte français ou phonèmes IPA |
| **Sortie** | Audio 22050 Hz, float32 |
| **Contrôles prosodiques** | Pitch, énergie, débit, pauses + vecteur style 5D |

Deux modes d'utilisation : **API** (zéro dépendance, zero config) ou **local** (ONNX Runtime, inférence offline).

---

## Essayer en ligne

*La démo utilise l'API Lectura — aucun téléchargement nécessaire.*

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
      <option value="neutre" selected>neutre</option>
      <option value="narratif">narratif</option>
      <option value="dialogue">dialogue</option>
      <option value="expressif">expressif</option>
      <option value="meditatif">méditatif</option>
      <option value="rapide">rapide</option>
      <option value="lent">lent</option>
    </select>
  </div>
  <input type="text" class="tts-input" value="Bonjour, je suis la voix de Lectura." placeholder="Entrez du texte français...">
  <button class="tts-btn" type="button">Synthétiser</button>
  <div class="tts-progress-container"><div class="tts-progress"></div></div>
  <pre class="tts-output">Cliquez sur le bouton pour synthétiser.</pre>
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

# Créer un engine (mode API par défaut)
engine = creer_engine()

# Synthèse avec choix de voix et style
audio = engine.synthesize(
    text="Bonjour, comment allez-vous ?",
    speaker="bernard",
    style="expressif",
)
print(f"Durée : {len(audio.samples) / audio.sample_rate:.2f}s")

# Changer de voix dynamiquement
engine.set_speaker("nadine")
audio = engine.synthesize(
    text="Je suis Nadine, enchantée.",
    style="narratif",
)

# Synthèse à partir de phonèmes IPA avec style personnalisé
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

Le pipeline complet utilise **3 modèles ONNX unifiés** : un encodeur partagé pour les 6 voix (avec `speaker_id` et `style_vector` en entrée), un décodeur et un vocoder.

---

## Installation

```bash
pip install lectura-tts-multispeaker           # mode API (zero config, zéro dépendance)
pip install lectura-tts-multispeaker[onnx]     # backend ONNX Runtime local
pip install lectura-tts-multispeaker[onnx,g2p] # avec G2P intégré (texte → audio)
```

Par défaut, le module utilise l'API Lectura (aucune configuration nécessaire). Le backend local ONNX nécessite les modèles pré-entraînés, disponibles sous [licence commerciale](mailto:admin@lectura.world).

---

## Caractéristiques techniques

- **FastPitch-Lite v6 unifié** : 24.3M paramètres (d_model=256, 4 layers, 4 heads, d_ff=1024), 6 speakers + style conditioning (5 dims)
- **HiFi-GAN** : vocoder universel, signal 22050 Hz
- **2 backends** : API (zero config) ou ONNX Runtime local (modèles sous licence commerciale)
- **6 voix** : Siwis, Ezwa, Nadine (F) — Bernard, Gilles, Zeckou (M)
- **7 presets de style** : neutre, narratif, dialogue, expressif, méditatif, rapide, lent
- **Controles prosodiques** : pitch_shift, pitch_range, energy_scale, duration_scale, pause_scale
- **Factory `creer_engine()`** : détection automatique du meilleur mode
- **`set_speaker()`** : changement de voix dynamique sans recharger les modèles
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (code) — les modèles pré-entraînés sont sous [licence commerciale](mailto:admin@lectura.world)

---

## Notes de version

### v1.4.0

- **Encodeur variance amélioré** : remplacement de l'encodeur par un modèle hybride (variance Matcha + décodeur FFT FastPitch) qui améliore la synthèse des mots courts et isolés
- Meilleure prédiction des durées et du pitch pour les séquences courtes (1-3 mots)
- Pas de changement d'API — compatible avec le code existant
