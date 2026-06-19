---
title: Applications pédagogiques
layout: default
permalink: /developpement/projets/applications-pedagogiques/
---

<span class="status-badge status-avenir">À venir</span>

## Vision

Les modules Lectura sont conçus pour alimenter des applications pédagogiques dans trois domaines :

---

## Lecture assistée

Aide à l'apprentissage de la lecture pour les enfants et les adultes en alphabétisation :

- **Texte enrichi** : syllabes colorées, phonèmes affichés, lettres muettes grisées
- **Lecture synchronisée** : audio syllabe par syllabe via le [moteur TTS Diphone]({{ '/developpement/modules/outils/tts-diphone/' | relative_url }}) (modes FLUIDE, MOT_A_MOT, SYLLABES)
- **Progression adaptée** : difficulté croissante (syllabes simples → complexes → liaisons → lettres muettes)
- **Feedback vocal** : l'élève lit à voix haute, le [pipeline STT]({{ '/developpement/modules/metiers/stt/' | relative_url }}) transcrit et compare

---

## Français Langue Étrangère (FLE)

Outils pour les apprenants du français comme langue seconde :

- **Prononciation** : comparaison entre la prononciation de l'apprenant et la transcription IPA attendue (via CTC)
- **Liaisons et enchaînements** : visualisation interactive des connexions entre mots
- **Minimal pairs** : exercices de discrimination phonétique générés depuis le [lexique]({{ '/developpement/lexique/' | relative_url }})
- **Dictée** : le TTS dicte, l'apprenant écrit, le correcteur valide

---

## Orthophonie

Support pour les professionnels de la rééducation du langage :

- **Évaluation phonologique** : transcription automatique de la parole de l'enfant (CTC) et comparaison avec la cible
- **Exercices ciblés** : génération de listes de mots par phonème, position syllabique ou complexité
- **Suivi de progression** : mesures objectives (PER, accuracy par phonème) sur les séances successives
- **Matériel adapté** : génération automatique de supports visuels avec le [pipeline phonétique]({{ '/developpement/recherche/phonetique/' | relative_url }})

---

## Modules concernés

| Application | Modules principaux |
|-------------|-------------------|
| Lecture assistée | TTS Diphone, Pipeline G2P, Aligneur |
| FLE | CTC, Pipeline G2P, Lexique, TTS |
| Orthophonie | CTC, Pipeline G2P, Lexique, Formules |

---

## État

Ces applications sont en phase de conception. Les briques techniques sous-jacentes (TTS, STT, G2P, Aligneur) sont opérationnelles. Le développement des interfaces utilisateur et des parcours pédagogiques est planifié.
