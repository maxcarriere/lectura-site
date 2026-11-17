---
title: Conversion vocale
layout: default
permalink: /developpement/modules/metiers/vc/
redirect_from:
  - /solutions/modules/vc/
---

> **Démo de conversion vocale.** La démo de cette page passe par le service de démonstration de Lectura et ses voix de démonstration (`fr-f1` à `fr-h3`) : elle ne montre pas le module v0. Le module gratuit, à installer en local, est [VC ZeroShot]({{ '/developpement/modules/outils/vc-zeroshot/' | relative_url }}) (code sous AGPL-3.0, OpenVoice et AudioSeal sous licence MIT, préréglages sous CC BY 4.0) ; voir [Génération v0]({{ '/developpement/modules/v0/' | relative_url }}).

<div class="module-header">
  <h1>Conversion vocale</h1>
  <p class="module-tagline">Conversion vocale pour le français — module ZeroShot (OpenVoice) et démo en ligne</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-vc-zeroshot/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/VC-ZeroShot" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-vc-zeroshot</code>
  </div>
</div>

## Présentation

Conversion vocale pour le français. Le module publié de la génération v0 est **[VC ZeroShot]({{ '/developpement/modules/outils/vc-zeroshot/' | relative_url }})** (`lectura-vc-zeroshot`) : OpenVoice V2, en local, vers un préréglage ou vers une voix de référence. N'utilisez que votre propre voix, ou celle d'une personne qui vous a donné son accord écrit. Toute sortie porte un filigrane IA (AudioSeal) qu'il est interdit de retirer (règlement européen sur l'IA, art. 50).

| Caractéristique | Valeur |
|-----------------|--------|
| **Zero-shot** | Un préréglage, ou un enregistrement de référence fourni avec consentement |
| **Préréglages** | 3 timbres : `fr-f1`, voix mélangée féminine (`melange-f`), voix mélangée masculine (`melange-h`) |
| **Mélange** | Mélange pondéré de préréglages |
| **Backends** | ONNX Runtime pur (pas de PyTorch) |

---

## Essayer en ligne

*La démo tourne sur le serveur de Lectura : rien à installer. Le module, lui, tourne en local.*

<div class="vc-demo">
  <div class="vc-controls">
    <input type="hidden" id="vc-mode" value="zeroshot">

    <div class="vc-zeroshot-options">
      <div id="vc-preset-options">
        <label for="vc-preset">Preset :</label>
        <select id="vc-preset">
          <option value="fr-f1" selected>Voix féminine 1</option>
          <option value="fr-f2">Voix féminine 2</option>
          <option value="fr-f3">Voix féminine 3</option>
          <option value="fr-h1">Voix masculine 1</option>
          <option value="fr-h2">Voix masculine 2</option>
          <option value="fr-h3">Voix masculine 3</option>
        </select>
      </div>
      <div style="display:flex; gap:0.3em; align-items:center; margin-top:0.3em;">
        <label for="vc-sr-override" style="font-size:0.9em;">Variante formants :</label>
        <select id="vc-sr-override">
          <option value="">Neutre</option>
          <option value="16000">Légèrement aigu</option>
          <option value="11025">Aigu (enfant)</option>
          <option value="33000">Légèrement grave</option>
          <option value="44100">Grave (homme)</option>
        </select>
      </div>
    </div>
  </div>

  <div class="vc-input-section">
    <label>Audio source :</label>
    <div class="vc-input-buttons">
      <span class="vc-file-wrapper">
        <input type="file" id="vc-audio-file" accept="audio/*" style="display:none;">
        <button type="button" id="vc-file-btn" class="vc-btn-secondary">Parcourir</button>
        <span id="vc-file-name">(Aucun fichier sélectionné)</span>
      </span>
      <span class="vc-separator">ou</span>
      <button type="button" id="vc-record-btn" class="vc-btn-secondary">&#x1F3A4; Enregistrer</button>
      <span id="vc-record-status"></span>
    </div>
    <audio id="vc-audio-preview" controls style="display:none; width:100%; margin-top:8px;"></audio>
  </div>

  <button type="button" id="vc-convert-btn" class="tts-btn">Convertir</button>
  <div class="tts-progress-container"><div class="tts-progress" id="vc-progress"></div></div>
  <pre class="tts-output" id="vc-output">Sélectionnez un fichier audio ou enregistrez votre voix, puis cliquez sur Convertir.</pre>
  <audio id="vc-audio-result" controls style="display:none; width:100%; margin-top:8px;"></audio>
</div>

<script src="{{ '/assets/js/vc-demo.js' | relative_url }}"></script>

---

## Exemple de code

```python
from lectura_vc_zeroshot import creer_engine

engine = creer_engine()

# vers un préréglage
audio, sr = engine.convert("source.wav", "melange-h")

# mélange pondéré de préréglages
audio, sr = engine.convert("source.wav", {"fr-f1": 0.5, "melange-f": 0.5})
```

Plus d'exemples sur la page [VC ZeroShot]({{ '/developpement/modules/outils/vc-zeroshot/' | relative_url }}).

---

## Briques utilisées

| Brique | Rôle |
|--------|------|
| [VC ZeroShot]({{ '/developpement/modules/outils/vc-zeroshot/' | relative_url }}) | OpenVoice V2, conversion zero-shot en local |

---

## Installation

```bash
pip install lectura-vc-zeroshot
```

Au premier usage, le paquet télécharge depuis Hugging Face ([lecturaworld/lectura-vc-zeroshot-v0](https://huggingface.co/lecturaworld/lectura-vc-zeroshot-v0)) les modèles OpenVoice V2 et AudioSeal (licence MIT) et les préréglages (CC BY 4.0), puis tout tourne hors ligne, sans clé : voir [VC ZeroShot]({{ '/developpement/modules/outils/vc-zeroshot/' | relative_url }}).
