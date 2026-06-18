---
title: Lectura Voice Edition
layout: default
permalink: /produits/programmes/voice-edition/
---

<span class="status-badge status-cours">En cours de développement</span>

Lectura Voice Edition est un environnement de lecture assistée qui combine **synthèse vocale**, **reconnaissance vocale** et **sous-titrage synchronisé** avec un **mode syllabique**. Le texte est prononcé à haute voix pendant que chaque mot ou syllabe est surligné en temps réel, offrant un support visuel et auditif pour l'apprentissage de la lecture.

---

## Synthèse vocale

Voice Edition s'appuie sur les trois moteurs TTS de Lectura :

- **Multi-Speaker** — 6 voix françaises (3 féminines, 3 masculines), 7 styles expressifs (neutre, narratif, dialogue, expressif, méditatif, rapide, lent). Modèle neuronal ~40 Mo, ~50x temps réel sur CPU.
- **Monospeaker** — voix haute qualité avec contrôles prosodiques fins (pitch, énergie, débit, pauses). Modèle ~17 Mo.
- **Diphone** — moteur par concaténation, particulièrement adapté au mode syllabique grâce à sa prononciation précise et uniforme de chaque syllabe.

Un système de **conversion vocale** (6 timbres, variantes homme/enfant) est combinable avec chaque moteur.

---

## Sous-titrage synchronisé

Chaque moteur TTS produit des **timestamps par phonème**, ce qui permet un surlignage synchronisé à trois niveaux de granularité :

| Mode | Description |
|------|-------------|
| **Fluide** | Lecture continue avec surlignage mot par mot |
| **Mot à mot** | Chaque groupe de lecture est prononcé individuellement avec surlignage |
| **Syllabes** | Chaque syllabe est prononcée séparément et surlignée au moment de sa lecture |

Le mode syllabique repose sur le pipeline complet de Lectura : phonémisation, alignement graphème-phonème, syllabation, gestion des liaisons et des lettres muettes. Les syllabes orthographiques et phonétiques sont calculées par l'Aligneur-Syllabeur, puis chacune est associée à son segment audio.

---

## Reconnaissance vocale

Le pipeline de reconnaissance vocale de Lectura (décodeur acoustique + convertisseur phonèmes vers texte, ~43 Mo) permet d'écouter l'utilisateur et de transcrire sa parole en temps réel. Cela ouvre la voie à des fonctions de lecture interactive :

- **Suivi de lecture** : comparer la prononciation de l'utilisateur au texte affiché.
- **Saisie vocale** : dicter du texte avec reconnaissance des nombres, dates et sigles.
- **Transcription phonétique** : afficher la transcription IPA de ce qui a été prononcé.

---

## Applications visées

- **Apprentissage de la lecture** : accompagnement visuel et auditif syllabe par syllabe pour les lecteurs débutants ou en difficulté.
- **FLE (Français Langue Étrangère)** : écouter la prononciation correcte tout en suivant le texte, puis s'enregistrer pour comparer.
- **Accessibilité** : lecture à voix haute de tout contenu textuel avec contrôle du débit et du mode de lecture.
- **Livres audio interactifs** : narration multi-voix avec sous-titrage synchronisé.

---

## En savoir plus

Les technologies sous-jacentes sont documentées en détail :

- [Synthèse vocale]({{ '/solutions/synthese-vocale/' | relative_url }}) — présentation des trois moteurs TTS
- [Reconnaissance vocale]({{ '/solutions/reconnaissance-vocale/' | relative_url }}) — pipeline STT
- [Analyse du langage]({{ '/solutions/analyse-langage/' | relative_url }}) — phonémisation, alignement syllabique, formules

---

*Version démo et licence à venir.*
