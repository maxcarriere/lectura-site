---
title: Pipeline TTS
layout: default
permalink: /developpement/modules/metiers/tts/
---

<div class="module-header">
  <h1>Pipeline TTS</h1>
  <p class="module-tagline">Texte français → audio — pipeline G2P + choix de moteur + conversion vocale optionnelle</p>
</div>

## Présentation

Le pipeline TTS de Lectura combine le [pipeline G2P]({{ '/developpement/modules/metiers/g2p/' | relative_url }}) avec l'un des 3 moteurs acoustiques pour produire de l'audio à partir de texte. Une étape de conversion vocale optionnelle permet de changer le timbre en post-traitement.

### Pipeline

```
Texte français
      │
      ▼
┌───────────────┐
│ Pipeline G2P   │  tokenisation + formules + phonémisation + liaison
└───────┬───────┘
        │  phonèmes IPA + métadonnées prosodiques
        ▼
┌───────────────┐
│ Moteur TTS     │  choix parmi 3 moteurs (voir ci-dessous)
└───────┬───────┘
        │  audio brut
        ▼
┌───────────────┐
│ VC (optionnel) │  retimbre via OpenVoice ou RVC
└───────┬───────┘
        │
        ▼
  Audio final
```

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="{{ '/solutions/synthese-vocale/' | relative_url }}">Essayer la synthèse vocale en ligne →</a>
</div>

---

## Comparatif des 3 moteurs

| | [Monospeaker]({{ '/developpement/modules/outils/tts-mono/' | relative_url }}) | [Multi-Speaker]({{ '/developpement/modules/outils/tts-multi/' | relative_url }}) | [Diphone]({{ '/developpement/modules/outils/tts-diphone/' | relative_url }}) |
|---|---|---|---|
| **Architecture** | Matcha-Conformer + HiFi-GAN | FastPitch-Lite v6 + HiFi-GAN | Concaténation WORLD |
| **Paramètres** | 17.9M | 24.3M | — (diphones pré-calculés) |
| **Taille ONNX** | ~29 Mo (INT8) | ~40 Mo (INT8) | ~15 Mo |
| **Voix natives** | 1 (SIWIS) | 6 (3F + 3M) | 1 (SIWIS) |
| **Styles** | 7 presets (vecteur 5D) | 7 presets (vecteur 5D) | — |
| **Débit CPU** | ~30x temps-réel | ~50x temps-réel | Temps-réel |
| **Sortie** | 22050 Hz | 22050 Hz | 44100 Hz |
| **Modes lecture** | — | — | FLUIDE, MOT_A_MOT, SYLLABES |
| **Retimbre** | OpenVoice (optionnel) | — | OpenVoice (optionnel) |
| **Usage principal** | Voix naturelle haute qualité | Multi-voix, narration | Pédagogie, lecture assistée |

---

## Modes de lecture (Diphone)

Le moteur Diphone supporte 3 modes de lecture adaptés à l'apprentissage :

- **FLUIDE** : lecture naturelle, prosodie complète
- **MOT_A_MOT** : chaque mot articulé séparément avec pause inter-mots
- **SYLLABES** : chaque syllabe distinctement articulée

---

## Installation

```bash
# Monospeaker (Matcha-Conformer, haute qualité)
pip install lectura-tts-mono[onnx]

# Multi-Speaker (6 voix, rapide)
pip install lectura-tts-multi[onnx]

# Diphone (pédagogique, modes de lecture)
pip install "lectura-tts-dipho[local]"

# Avec retimbre (Monospeaker + OpenVoice)
pip install lectura-tts-mono[onnx,retimbre]

# Avec retimbre (Diphone + OpenVoice)
pip install "lectura-tts-dipho[local,retimbre]"

# Via le meta-package lectura
pip install "lectura[tts-mono]"              # Monospeaker + G2P
pip install "lectura[tts-multi]"             # Multi-Speaker + G2P
pip install "lectura[tts-dipho]"             # Diphone + G2P
pip install "lectura[tts]"                   # Les 3 moteurs
```

### Extras disponibles par pipeline

| Extra | `lectura-tts-mono` | `lectura-tts-multi` | `lectura-tts-dipho` |
|-------|:-----------:|:-------------:|:-------:|
| Backend local | `[onnx]` | `[onnx]` | `[local]` |
| `[retimbre]` | oui | oui | oui |
| `[aligneur]` (lecture syllabique) | oui | oui | oui |

Chaque pipeline inclut le G2P par défaut. Les moteurs bruts (`lectura-monospeaker`, `lectura-multispeaker`, `lectura-diphone`) fonctionnent aussi en mode **API** sans backend local.


---

## Exemple de code

```python
# Monospeaker — haute qualité, 7 styles
from lectura_monospeaker import creer_engine
engine = creer_engine()
result = engine.synthesize(text="Bonjour le monde.", style="narratif")

# Multi-Speaker — 6 voix
from lectura_multispeaker import creer_engine
engine = creer_engine()
audio = engine.synthesize(text="Bonjour.", speaker="bernard", style="expressif")

# Diphone — modes pédagogiques
from lectura_diphone import synthetiser
audio = synthetiser("Le chat dort.", voix="siwis")
```

---

## Briques utilisées

| Brique | Rôle |
|--------|------|
| [Pipeline G2P]({{ '/developpement/modules/metiers/g2p/' | relative_url }}) | Texte → phonèmes IPA |
| [TTS Monospeaker]({{ '/developpement/modules/outils/tts-mono/' | relative_url }}) | Moteur Matcha-Conformer |
| [TTS Multi-Speaker]({{ '/developpement/modules/outils/tts-multi/' | relative_url }}) | Moteur FastPitch-Lite v6 |
| [TTS Diphone]({{ '/developpement/modules/outils/tts-diphone/' | relative_url }}) | Moteur concaténation WORLD |
| [VC ZeroShot]({{ '/developpement/modules/outils/vc-zeroshot/' | relative_url }}) | Retimbre OpenVoice (optionnel) |
| [VC Locuteurs]({{ '/developpement/modules/outils/vc-locuteurs/' | relative_url }}) | Retimbre RVC (optionnel) |
