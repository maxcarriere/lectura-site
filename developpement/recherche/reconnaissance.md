---
title: Reconnaissance vocale
layout: default
permalink: /developpement/recherche/reconnaissance/
---

<span class="status-badge status-cours">En cours</span>

## Le projet

L'axe reconnaissance vocale de Lectura développe un pipeline de transcription audio adapté au français, avec une architecture en deux couches : un décodeur CTC phonétique (audio → phones IPA) et un pipeline STT complet (audio → texte orthographique).

L'enjeu est de proposer une alternative légère aux modèles massifs (Whisper, etc.) en exploitant la structure phonétique du français et le pipeline P2G de Lectura.

---

## Modules associés

- [STT]({{ '/developpement/modules/metiers/stt/' | relative_url }}) — Pipeline de transcription complet
- [P2G]({{ '/developpement/modules/metiers/p2g/' | relative_url }}) — Conversion phonèmes → orthographe
- [Formules]({{ '/developpement/modules/outils/formules/' | relative_url }}) — Reconnaissance des nombres, dates, sigles

---

## État d'avancement

Le pipeline CTC + P2G est fonctionnel avec un WER d'environ 15%, comparable à Whisper small avec 10x moins de paramètres (~43 Mo de modèles). Le modèle STT-Formules est opérationnel pour la reconnaissance de données structurées.

Les travaux en cours portent sur l'amélioration du WER et l'ajout de la ponctuation contextuelle.
