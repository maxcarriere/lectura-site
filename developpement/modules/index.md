---
title: Modules
layout: default
permalink: /developpement/modules/
redirect_from:
  - /solutions/modules/
---

Dix-sept packages Python autonomes pour le traitement linguistique et la synthèse vocale du français, organisés en **briques outils** (modules atomiques réutilisables) et **pipelines métiers** (chaînes applicatives). Zero dépendance sur les modules de base, type hints complets (Python 3.10+).

<div class="home-grid">
  <div class="home-card">
    <h2>12 Briques outils</h2>
    <p>Modules atomiques : tokenisation, formules, alignement, lexique, phonémiseur, graphémiseur, CTC, 3 moteurs TTS, 2 moteurs VC.</p>
    <a class="more-link" href="{{ '/developpement/modules/outils/' | relative_url }}">Voir les briques outils</a>
  </div>
  <div class="home-card">
    <h2>5 Pipelines métiers</h2>
    <p>Chaînes applicatives : G2P, P2G, TTS (3 moteurs), STT, VoiceConversion.</p>
    <a class="more-link" href="{{ '/developpement/modules/metiers/' | relative_url }}">Voir les pipelines</a>
  </div>
</div>

---

## Installation rapide

```bash
# Meta-package : installez uniquement ce dont vous avez besoin
pip install "lectura[tokeniseur,formules]"   # 2 briques NLP
pip install "lectura[g2p]"                   # pipeline G2P complet
pip install "lectura[tts-mono]"              # pipeline TTS Monospeaker

# Groupes de commodité
pip install "lectura[nlp]"                   # 6 briques NLP
pip install "lectura[tts]"                   # 3 pipelines TTS
pip install "lectura[onnx]"                  # backends ONNX pour tous les modèles
pip install "lectura[all]"                   # tout

# Ou directement le package
pip install lectura-tokeniseur               # un seul module
pip install lectura-g2p                      # un pipeline
```

### Extras disponibles dans le meta-package `lectura`

| Extra | Contenu |
|-------|---------|
| `[tokeniseur]` | lectura-tokeniseur |
| `[formules]` | lectura-formules |
| `[phonemiseur]` | lectura-phonemiseur |
| `[graphemiseur]` | lectura-graphemiseur |
| `[aligneur]` | lectura-aligneur |
| `[lexique]` | lectura-lexique |
| `[decodeur]` | lectura-decodeur |
| `[g2p]` | Pipeline G2P (tokeniseur + formules + phonémiseur + lexique) |
| `[p2g]` | Pipeline P2G (graphémiseur + formules + lexique) |
| `[stt]` | Pipeline STT (décodeur + P2G) |
| `[tts-mono]` | Pipeline TTS Monospeaker + G2P |
| `[tts-multi]` | Pipeline TTS Multi-Speaker + G2P |
| `[tts-dipho]` | Pipeline TTS Diphone + G2P |
| `[tts]` | Les 3 pipelines TTS |
| `[vc]` | Conversion vocale (ZeroShot + Locuteurs) |
| `[nlp]` | 6 briques NLP (tokeniseur, formules, phonémiseur, graphémiseur, aligneur, lexique) |
| `[onnx]` | Backends ONNX pour tous les modèles |
| `[all]` | Tout |

Par défaut, les modules Phonémiseur, Graphémiseur et Décodeur utilisent l'**API Lectura** (`api.lectura.world`) — aucune configuration nécessaire. Pour l'inférence locale, installez les backends optionnels (ex : `lectura-phonemiseur[onnx]`). Les modèles pré-entraînés ne sont pas inclus dans les packages et sont disponibles sous [licence commerciale](mailto:admin@lectura.world).
