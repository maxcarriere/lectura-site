---
title: VC (Voice Conversion)
layout: default
permalink: /solutions/modules/vc/
---

<div class="module-header">
  <h1>Lectura VC</h1>
  <p class="module-tagline">Conversion vocale neuronale francais — RVC + OpenVoice zero-shot, ONNX pur</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-vc/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/VC" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-vc</code>
  </div>
</div>

## Presentation

Module de conversion vocale (voice conversion) pour le francais, combinant deux backends ONNX :
- **RVC** : conversion vers 6 voix pre-entrainees via HuBERT + RMVPE + Synthesizer
- **OpenVoice v2** : conversion zero-shot vers une voix arbitraire (5-10s de reference)

| Caracteristique | Valeur |
|-----------------|--------|
| **Voix RVC** | 6 speakers (3F + 3M) : Ezwa, Nadine, Siwis, Bernard, Gilles, Zeckou |
| **Zero-shot** | OpenVoice v2 — n'importe quelle voix avec 5-10s de reference |
| **Modes** | rvc, zeroshot, cascade (RVC + OpenVoice), auto |
| **Modeles** | 10 fichiers ONNX (~1.52 Go total) |
| **Backends** | ONNX Runtime pur (pas de PyTorch) |
| **Entree** | Audio WAV/MP3 (toute frequence) |
| **Sortie** | Audio converti (frequence native du backend) |
| **Controles** | protect, pitch_modification, tau (OpenVoice) |

---

## Essayer en ligne

*La demo utilise l'API Lectura — aucun telechargement necessaire.*

<div class="vc-demo">
  <div class="vc-controls">
    <div class="vc-mode-select">
      <label for="vc-mode">Mode :</label>
      <select id="vc-mode">
        <option value="rvc" selected>RVC (voix pre-entrainee)</option>
        <option value="zeroshot">Zero-shot (voix arbitraire)</option>
      </select>
    </div>

    <div class="vc-rvc-options">
      <label for="vc-speaker">Voix cible :</label>
      <select id="vc-speaker">
        <option value="siwis">Siwis (F)</option>
        <option value="ezwa">Ezwa (F)</option>
        <option value="nadine">Nadine (F)</option>
        <option value="bernard" selected>Bernard (M)</option>
        <option value="gilles">Gilles (M)</option>
        <option value="zeckou">Zeckou (M)</option>
      </select>
    </div>

    <div class="vc-zeroshot-options" style="display:none;">
      <label for="vc-reference">Audio de reference :</label>
      <input type="file" id="vc-reference" accept="audio/*">
    </div>
  </div>

  <div class="vc-input-section">
    <label>Audio source :</label>
    <div class="vc-input-buttons">
      <span class="vc-file-wrapper">
        <input type="file" id="vc-audio-file" accept="audio/*" style="display:none;">
        <button type="button" id="vc-file-btn" class="vc-btn-secondary">Parcourir</button>
        <span id="vc-file-name">(Aucun fichier selectionne)</span>
      </span>
      <span class="vc-separator">ou</span>
      <button type="button" id="vc-record-btn" class="vc-btn-secondary">&#x1F3A4; Enregistrer</button>
      <span id="vc-record-status"></span>
    </div>
    <audio id="vc-audio-preview" controls style="display:none; width:100%; margin-top:8px;"></audio>
  </div>

  <button type="button" id="vc-convert-btn" class="tts-btn">Convertir</button>
  <div class="tts-progress-container"><div class="tts-progress" id="vc-progress"></div></div>
  <pre class="tts-output" id="vc-output">Selectionnez un fichier audio ou enregistrez votre voix, puis cliquez sur Convertir.</pre>
  <audio id="vc-audio-result" controls style="display:none; width:100%; margin-top:8px;"></audio>
</div>

<script src="{{ '/assets/js/vc-demo.js' | relative_url }}"></script>

---

## Exemple de code

```python
from lectura_vc import creer_engine

# Creer un engine VC
engine = creer_engine(mode="auto")

# Conversion RVC vers une voix pre-entrainee
audio, sr = engine.convert(
    audio="input.wav",
    speaker="bernard",
    mode="rvc",
)
print(f"Duree : {len(audio) / sr:.2f}s, SR : {sr} Hz")

# Conversion zero-shot vers une voix arbitraire
audio, sr = engine.convert(
    audio="input.wav",
    reference="reference_5s.wav",
    mode="zeroshot",
    tau=0.3,
)

# Mode cascade : RVC (proxy genre) + OpenVoice (timbre exact)
audio, sr = engine.convert(
    audio="input.wav",
    speaker="nadine",
    reference="cible.wav",
    mode="cascade",
)

# Sauvegarder le resultat
import soundfile as sf
sf.write("output.wav", audio, sr)
```

```python
# Liste des speakers disponibles
engine = creer_engine()
print(engine.available_speakers)
# ['ezwa', 'nadine', 'bernard', 'gilles', 'zeckou', 'siwis']
```

---

## Architecture

```
Mode RVC :
  Audio source -> HuBERT (features) -> RMVPE (F0)
                                          |
                              Synthesizer_{speaker} (ONNX)
                                          |
                                   Audio converti


Mode Zero-shot (OpenVoice v2) :
  Audio source  -> OpenVoice SE -> source embedding
  Audio ref     -> OpenVoice SE -> target embedding
                                          |
                              OpenVoice VC (ONNX)
                              (source audio + src_se + tgt_se + tau)
                                          |
                                   Audio converti


Mode Cascade :
  Audio source -> [RVC speaker proxy] -> [OpenVoice timbre] -> Audio converti
```

Les 10 modeles ONNX :
- `hubert.onnx` (361 Mo) — extraction de features vocales
- `rmvpe.onnx` (345 Mo) — estimation de frequence fondamentale (F0)
- `openvoice_se.onnx` (3.2 Mo) — extraction de speaker embedding
- `openvoice_vc.onnx` (123 Mo) — conversion zero-shot
- 6x `synthesizer_{speaker}.onnx` (~116 Mo) — synthesizers RVC par voix

---

## Installation

```bash
pip install lectura-vc       # module public (inference via API)
```

Le module public (~30 Ko) utilise l'API Lectura pour l'inference. Le backend local ONNX necessite les modeles pre-entraines (~1.52 Go), disponibles sous [licence commerciale](mailto:contact@lec-tu-ra.com).

---

## Caracteristiques techniques

- **RVC ONNX** : HuBERT + RMVPE + Synthesizer, 6 voix pre-entrainees
- **OpenVoice v2 ONNX** : conversion zero-shot, n'importe quelle voix cible
- **4 modes** : rvc, zeroshot, cascade, auto (choix automatique)
- **Auto-adaptation** : pitch et protection ajustes automatiquement selon le speaker
- **ONNX Runtime pur** : pas de dependance PyTorch
- **Factory `creer_engine()`** : detection automatique des modeles
- **Lazy loading** : chaque backend charge a la demande
- **Python 3.10+** avec type hints complets (PEP-561)
- **Licence** : AGPL-3.0 (code) — les modeles pre-entraines sont sous [licence commerciale](mailto:contact@lec-tu-ra.com)
