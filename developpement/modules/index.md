---
title: Modules
layout: default
permalink: /developpement/modules/
redirect_from:
  - /solutions/modules/
---

Quatorze packages Python autonomes pour le traitement linguistique et la synthèse vocale du français, distribués sur PyPI. Installez tout d'un coup avec `pip install lectura` ou chaque module indépendamment. Zero dépendance sur les modules de base, type hints complets (Python 3.10+).

<div class="home-grid">
  <div class="home-card">
    <h2>Modules outils</h2>
    <p>Briques atomiques réutilisables : tokenisation, formules, alignement graphème-phonème, accès lexical.</p>
    <a class="more-link" href="{{ '/developpement/modules/outils/' | relative_url }}">Voir les modules outils</a>
  </div>
  <div class="home-card">
    <h2>Modules métiers</h2>
    <p>Pipelines spécialisés : G2P, P2G, TTS (3 moteurs), STT, correcteur, conversion vocale (3 variantes).</p>
    <a class="more-link" href="{{ '/developpement/modules/metiers/' | relative_url }}">Voir les modules métiers</a>
  </div>
</div>

---

## Installation rapide

```bash
# Tous les modules d'un coup
pip install lectura

# Un seul module
pip install lectura-tokeniseur

# Phonémiseur (G2P) — fonctionne immédiatement via l'API (zero config)
pip install lectura-phonemiseur

# Pipeline G2P complet (tokeniseur + formules + phonémiseur + groupes de lecture)
pip install lectura-g2p

# Pipeline P2G complet (graphémiseur + formules + noms propres)
pip install lectura-p2g

# Pipeline STT complet (audio → texte, CTC + P2G)
pip install lectura-stt[p2g]
```

Par défaut, les modules Phonémiseur, Graphémiseur et Aligneur-Syllabeur utilisent l'**API Lectura** (`api.lectura.world`) — aucune configuration nécessaire. Pour l'inférence locale, installez les modèles et les backends optionnels (`lectura-phonemiseur[onnx]`).
