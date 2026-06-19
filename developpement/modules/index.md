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
# Tous les modules d'un coup
pip install lectura

# Pipeline G2P complet (tokeniseur + formules + phonémiseur + groupes de lecture)
pip install lectura-g2p

# Pipeline P2G complet (graphémiseur + formules + noms propres)
pip install lectura-p2g

# Pipeline STT complet (audio → texte, Décodeur + P2G)
pip install lectura-stt

# TTS Monospeaker avec G2P (texte → audio)
pip install lectura-tts-mono[onnx]

# Un seul module outil
pip install lectura-tokeniseur
```

Par défaut, les modules Phonémiseur, Graphémiseur et Décodeur utilisent l'**API Lectura** (`api.lectura.world`) — aucune configuration nécessaire. Pour l'inférence locale, installez les backends optionnels (ex : `lectura-phonemiseur[onnx]`).
