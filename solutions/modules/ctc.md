---
title: STT
layout: default
permalink: /solutions/modules/ctc/
---

<div class="module-header">
  <h1>Lectura STT</h1>
  <p class="module-tagline">Transcription audio du francais — phones IPA et texte orthographique</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-stt/" class="module-badge">STT PyPI</a>
    <a href="https://pypi.org/project/lectura-ctc/" class="module-badge">CTC PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/STT" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-stt[p2g]</code>
  </div>
</div>

## Presentation

Trois modules pour la transcription audio du francais :

| Module | Couche | Entree | Sortie | pip install |
|--------|--------|--------|--------|-------------|
| **Lectura CTC** | couche 1 | audio 16 kHz | phones IPA | `pip install lectura-ctc` |
| **Lectura STT** | couche 2 | audio 16 kHz | texte orthographique | `pip install lectura-stt[p2g]` |
| **Lectura STT-Formules** | specialise | audio 16 kHz | tokens semantiques | `pip install lectura-stt-formules[inference]` |

**CTC** est le decodeur phonetique neural (CNN-BiGRU-CTC medium, 10.6M parametres, PER ~4.34%). Il convertit un signal audio en une sequence de phones IPA avec separateurs de mots, liaisons et ponctuation. Le modele medium supporte les sigles et formules grace a un fine-tuning specialise.

**STT** est le pipeline complet qui chaine CTC avec le graphemiseur P2G pour reconstituer le texte francais, avec gestion des elisions, de la ponctuation et des majuscules. Si `lectura-p2g` est installe, les formules (nombres, sigles) et les noms propres sont aussi traites.

**STT-Formules** est un modele CTC autonome et leger (~600K parametres) entraine specifiquement pour la reconnaissance de formules. Au lieu de phonemes IPA, il produit directement des tokens semantiques (87 classes : nombres, mois, devises, lettres, etc.), avec un TER de ~1.17%. Ideal pour les applications de saisie vocale de donnees structurees.

### Specifications CTC

| Caracteristique | Valeur |
|-----------------|--------|
| **Architecture** | CNN [48, 96] (2 couches) + BiGRU 384x4 + CTC head |
| **Parametres** | 10.6M |
| **Performance** | PER ~4.34% (formules v2) |
| **Vocabulaire** | 59 tokens (46 phones IPA + liaisons + ponctuation + speciaux) |
| **Audio** | PCM float32 mono, 16 kHz |
| **Mel** | 80 bins, n_fft=512, hop=160, win=400 |
| **Modele** | ONNX INT8, ~38 Mo |
| **Backends** | ONNX Runtime (local) ou API serveur |

### Benchmark STT (pipeline complet)

| Metrique | Corpus | Score |
|----------|--------|-------|
| **WER** | all (lectures + conversations + formules) | **~23.5%** |
| **WER** | parole courante (sans formules) | **~19.7%** |
| **PER** | CTC seul (phone error rate) | **~4.34%** |

---

## Essayer en ligne

*La demo utilise l'API Lectura — aucun telechargement necessaire.*

<style>
#ctc-output-ipa, #ctc-output-texte {
  white-space: normal;
  word-wrap: break-word;
  line-height: 1.8;
  font-size: 1.05em;
}
#ctc-output-ipa .ctc-word {
  display: inline-block;
  background: var(--code-bg, #f5f5f5);
  border-radius: 4px;
  padding: 2px 6px;
  margin: 2px 4px 2px 0;
}
.ctc-output-label {
  font-weight: bold;
  font-size: 0.85em;
  color: var(--muted-fg, #888);
  margin-bottom: 4px;
}
.ctc-output-block {
  margin-bottom: 12px;
}
.ctc-muted {
  color: var(--muted-fg, #888);
  font-style: italic;
}
</style>

<div class="ctc-demo">
  <div class="ctc-input-section">
    <label>Audio source :</label>
    <div class="vc-input-buttons">
      <span class="vc-file-wrapper">
        <input type="file" id="ctc-audio-file" accept="audio/*" style="display:none;">
        <button type="button" id="ctc-file-btn" class="vc-btn-secondary">Parcourir</button>
        <span id="ctc-file-name">(Aucun fichier)</span>
      </span>
      <span class="vc-separator">ou</span>
      <button type="button" id="ctc-record-btn" class="vc-btn-secondary">&#x1F3A4; Enregistrer</button>
      <span id="ctc-record-status"></span>
    </div>
    <audio id="ctc-audio-preview" controls style="display:none; width:100%; margin-top:8px;"></audio>
  </div>

  <div class="ctc-input-section" style="margin-top:8px;">
    <label for="ctc-mode">Mode :</label>
    <select id="ctc-mode" class="vc-btn-secondary" style="padding:4px 8px;">
      <option value="standard">Standard</option>
      <option value="formules">Formules (nombres, sigles…)</option>
      <option value="ipa">CTC seul (IPA)</option>
    </select>
  </div>

  <button type="button" id="ctc-transcribe-btn" class="tts-btn">Transcrire</button>
  <div class="tts-progress-container"><div class="tts-progress" id="ctc-progress"></div></div>

  <div class="ctc-output-block">
    <div class="ctc-output-label">Phonetique (IPA)</div>
    <pre class="tts-output" id="ctc-output-ipa">Selectionnez un fichier audio ou enregistrez votre voix, puis cliquez sur Transcrire.</pre>
  </div>
  <div class="ctc-output-block">
    <div class="ctc-output-label">Texte (STT)</div>
    <pre class="tts-output" id="ctc-output-texte"></pre>
  </div>
</div>

<script src="{{ '/assets/js/ctc-demo.js' | relative_url }}"></script>

---

## Exemple de code

### CTC seul (phones IPA)

```python
import numpy as np
from lectura_ctc import creer_engine

engine = creer_engine()

# Transcrire un fichier WAV (charger avec wave/soundfile)
import wave
with wave.open("bonjour.wav", "rb") as wf:
    sr = wf.getframerate()
    audio = np.frombuffer(
        wf.readframes(wf.getnframes()), dtype=np.int16
    ).astype(np.float32) / 32768.0

ipa = engine.transcrire(audio, sr=sr)
print(ipa)  # "b ɔ̃ ʒ u ʁ"
```

### Pipeline STT (audio → texte)

```python
from lectura_stt import creer_engine

engine = creer_engine()  # CTC + P2G automatique

result = engine.transcrire(audio, sr=16000)
print(result.ipa)    # "b ɔ̃ ʒ u ʁ | l ə | m ɔ̃ d ."
print(result.texte)  # "Bonjour le monde."
```

```bash
# CLI CTC : transcrire un fichier
python -m lectura_ctc bonjour.wav

# CLI CTC : enregistrer au micro
python -m lectura_ctc --micro

# CLI CTC : enregistrer 5 secondes
python -m lectura_ctc --micro --duree 5

# CLI CTC : mode continu (Ctrl+C pour quitter)
python -m lectura_ctc --micro --continu
```

### STT-Formules (audio → tokens semantiques)

```python
from lectura_stt_formules import creer_engine

engine = creer_engine()

result = engine.transcrire("nombre.wav")
print(result["names"])   # ["DEUX", "CENT", "VINGT", "ET", "UN"]
print(result["tokens"])  # [4, 25, 20, 29, 3]
print(" ".join(result["names"]))  # "DEUX CENT VINGT ET UN"
```

Le vocabulaire de sortie comprend 87 tokens semantiques : nombres atomiques (0-16), dizaines, echelles, connecteurs, mois, heures, devises, pourcentages, ordinaux, fractions et lettres A-Z pour les sigles.

---

## Architecture

### Pipeline STT (audio → texte)

```
Audio 16kHz mono
     │
     ▼
┌─────────────┐
│ lectura-ctc  │  CNN-BiGRU-CTC medium (10.6M params)
└─────┬───────┘
      │
      ▼
  "b ɔ̃ ʒ u ʁ | l ə | m ɔ̃ d ."     (IPA brut)
      │
      ▼
┌─────────────┐
│ _parse_ctc   │  extraction mots IPA + ponctuation + liaisons
└─────┬───────┘
      │
      ▼
  ["bɔ̃ʒuʁ", "lə", "mɔ̃d"]          (mots IPA)
      │
      ▼
┌─────────────┐
│ lectura-p2g  │  graphemiseur + formules + noms propres
└─────┬───────┘
      │
      ▼
  ["bonjour", "le", "monde"]        (mots ortho)
      │
      ▼
┌─────────────┐
│ _assembler   │  majuscules + elisions + ponctuation
└─────┬───────┘
      │
      ▼
  "Bonjour le monde."               (texte final)
```

### Modele CTC (detail)

```
Audio 16kHz mono
     │
     ▼
┌─────────────┐
│ Mel spectro  │  numpy pur (80 bins, 100 fps)
│ STFT + log   │
└─────┬───────┘
      │  (1, 1, 80, T)
      ▼
┌─────────────┐
│ CNN Frontend │  2x Conv2d stride 2 → subsampling ×4
└─────┬───────┘
      │  (1, T/4, 1280)
      ▼
┌─────────────┐
│ BiGRU ×4     │  4 couches bidirectionnelles (384h)
└─────┬───────┘
      │  (1, T/4, 512)
      ▼
┌─────────────┐
│ CTC head     │  Linear → 59 classes
└─────┬───────┘
      │  (1, T/4, 59)
      ▼
┌─────────────┐
│ CTC greedy   │  argmax + deduplique + supprime blanks
│ decode       │
└─────┬───────┘
      │
      ▼
  "b ɔ̃ ʒ u ʁ | l ə | m ɔ̃ d"
```

---

## Installation

```bash
# Pipeline STT complet (audio → texte, avec P2G + formules)
pip install lectura-stt[p2g]

# STT avec backend ONNX (inference locale rapide)
pip install lectura-stt[onnx,p2g]

# CTC seul (audio → phones IPA)
pip install lectura-ctc[onnx]

# Mode API uniquement (sans ONNX)
pip install lectura-ctc

# Avec support micro (CLI)
pip install lectura-ctc[onnx,micro]

# STT-Formules (tokens semantiques, inference locale)
pip install lectura-stt-formules[inference]
```

Par defaut, les modules utilisent l'**API Lectura** si aucun modele local n'est trouve. Pour l'inference locale, installez les modeles ONNX dans `~/.lectura/models/` ou utilisez le backend ONNX avec les modeles embarques (disponibles sous [licence commerciale](mailto:contact@lec-tu-ra.com)).

---

## Caracteristiques techniques

### CTC (couche 1)

- **CNN-BiGRU-CTC medium** : 10.6M parametres, PER ~4.34%
- **Mel spectrogram numpy pur** : pas de dependance torchaudio
- **Decodage CTC greedy** : zero dependance
- **59 tokens** : 46 phones IPA francais + 6 liaisons + 5 ponctuations + 2 speciaux
- **ONNX INT8** : modele quantifie ~38 Mo
- **CLI integree** : `python -m lectura_ctc` (fichier WAV ou micro)
- **Factory `creer_engine()`** : cascade auto ONNX → API

### STT (couche 2)

- **WER ~23.5%** (all) / **~19.7%** (parole courante)
- **Pipeline optimal** : CTC → postproc (strip_liaisons, split_elisions, merge_and_rescore) → P2G → texte
- **Pipeline CTC + P2G** : audio → texte francais en une ligne de code
- **P2G optionnel** : fonctionne en mode phones seuls si P2G non installe
- **Cascade P2G** : `lectura-p2g` (complet) → `lectura-graphemiseur` (core) → aucun
- **Elisions automatiques** : l', d', j', n', s', qu', m', t', c'
- **Ponctuation et majuscules** : reconstruction fidele du texte
- **Formules** : nombres, sigles (via `lectura-p2g`)
- **Python 3.10+** avec type hints complets
- **Licence** : AGPL-3.0 (code) — modeles sous [licence commerciale](mailto:contact@lec-tu-ra.com)
