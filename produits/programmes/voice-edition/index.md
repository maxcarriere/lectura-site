---
title: Lectura Voice Edition
layout: default
permalink: /produits/programmes/voice-edition/
---

<span class="status-badge status-avenir">En pause</span>

Lectura Voice Edition est un environnement de lecture assistée qui combine **synthèse vocale**, **reconnaissance vocale** et **sous-titrage synchronisé** avec un **mode syllabique**. Le texte est prononcé à haute voix pendant que chaque mot ou syllabe est surligné en temps réel, offrant un support visuel et auditif pour l'apprentissage de la lecture.

---

## Synthèse vocale

Voice Edition s'appuie sur les trois moteurs TTS de Lectura :

- **Multi-Speaker** — six voix françaises (trois féminines, trois masculines) et des préréglages de lecture.
- **Monospeaker** — voix haute qualité avec contrôles prosodiques fins (pitch, énergie, débit, pauses).
- **Diphone** — moteur par concaténation, particulièrement adapté au mode syllabique grâce à sa prononciation précise et uniforme de chaque syllabe.

Un système de **conversion vocale** (changement de timbre, variantes homme/enfant) est combinable avec chaque moteur.

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

Le pipeline de reconnaissance vocale de Lectura (décodeur acoustique + convertisseur phonèmes vers texte) permet d'écouter l'utilisateur et de transcrire sa parole. Cela ouvre la voie à des fonctions de lecture interactive :

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

- [Synthèse vocale]({{ '/solutions/technologiques/' | relative_url }}#synthese-vocale) — présentation des trois moteurs TTS
- [Reconnaissance vocale]({{ '/solutions/technologiques/' | relative_url }}#reconnaissance-vocale) — pipeline STT
- [Analyse du langage]({{ '/solutions/technologiques/' | relative_url }}#analyse-du-langage) — phonémisation, alignement syllabique, formules

---

*Logiciel en pause. La synthèse vocale avec surlignage et le sous-titrage sont accessibles en ligne sur [LecturaVoice](https://voice.lectura.world).*
