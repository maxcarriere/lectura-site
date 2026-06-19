---
title: "Le point de vue Phonétique"
layout: default
permalink: /developpement/recherche/phonetique/
redirect_from:
  - /projets/lecture-augmentee/
---

<span class="status-badge status-cours">En cours</span>

## L'approche Lectura

Lectura adopte un **point de vue phonétique** sur le texte français : chaque mot est un objet multi-couches dont la prononciation, la structure syllabique, les liaisons et les lettres muettes sont calculables algorithmiquement. Cette approche distingue Lectura des outils orientés NLP statistique (qui ignorent la phonétique) et des outils de TTS (qui ne produisent que de l'audio).

L'objectif est de produire un texte que l'on peut **voir**, **entendre** et **explorer** à différents niveaux de granularité — un texte qui enseigne sa propre lecture.

---

## Pipeline de traitement en 8 étapes

Le cœur du projet est un pipeline modulaire (`lectura-main`) qui transforme un texte brut en un objet de lecture enrichi :

| Étape | Module | Sortie |
|-------|--------|--------|
| 1. **Tokenisation** | [Tokeniseur]({{ '/developpement/modules/outils/tokeniseur/' | relative_url }}) | Mots + ponctuations + formules détectées |
| 2. **Lecture des formules** | [Formules]({{ '/developpement/modules/outils/formules/' | relative_url }}) | Formules → texte lu + IPA |
| 3. **Phonémisation** | [Phonémiseur]({{ '/developpement/modules/outils/phonemiseur/' | relative_url }}) | IPA + POS + morphologie + liaisons |
| 4. **Groupes de lecture** | [Phonémiseur]({{ '/developpement/modules/outils/phonemiseur/' | relative_url }}) | Regroupement élision/liaison/enchaînement |
| 5. **Alignement G-P** | [Aligneur]({{ '/developpement/modules/outils/aligneur/' | relative_url }}) | Correspondance lettres ↔ sons |
| 6. **Syllabation** | [Aligneur]({{ '/developpement/modules/outils/aligneur/' | relative_url }}) | Syllabes avec attaque/noyau/coda |
| 7. **Lettres muettes** | [Aligneur]({{ '/developpement/modules/outils/aligneur/' | relative_url }}) | Marquage des graphèmes non prononcés |
| 8. **Timeline** | lectura-main | Synchronisation temporelle de chaque événement |

Chaque étape est un module indépendant, testable isolément. L'ensemble produit une structure de données riche qui alimente les différents formats de sortie (HTML interactif, JSON, vidéo, audio synchronisé).

---

## Couches d'enrichissement

Le texte enrichi contient plusieurs couches superposables :

- **Syllabique** : chaque mot découpé en syllabes, avec séparateurs visuels
- **Phonétique** : transcription IPA de chaque syllabe
- **Liaisons** : consonnes de liaison entre mots, avec indication du type (obligatoire, facultative)
- **Lettres muettes** : lettres présentes à l'écrit mais non prononcées
- **Coloration** : code couleur par type de son (voyelle, consonne, digramme…)
- **Audio** : lecture synchronisée syllabe par syllabe via TTS

---

## Pourquoi la phonétique ?

Le français est une langue **opaque** du point de vue orthographique : un même son peut s'écrire de dizaines de façons différentes (le son /o/ s'écrit o, au, eau, ô, ot, os, op, aud, aux, ault…). Cette opacité est le premier obstacle de l'apprentissage de la lecture.

L'approche phonétique de Lectura rend explicite ce qui est implicite dans l'orthographe :
- Quel son produit chaque lettre ou groupe de lettres ?
- Quelles lettres ne se prononcent pas ?
- Comment les mots se connectent-ils à l'oral (liaisons, élisions) ?
- Où se situent les frontières syllabiques ?

Ces informations, triviales pour un lecteur expert, sont précisément ce que l'apprenant doit construire.

---

## État d'avancement

Le pipeline est fonctionnel pour le français. Les modules de phonémisation, syllabation, alignement et liaison sont opérationnels et testés. L'intégration TTS permet une lecture audio synchronisée complète.

Les travaux en cours portent sur :
- l'optimisation de la qualité de l'alignement graphème-phonème (voir [Algorithmes d'alignement]({{ '/developpement/recherche/alignement/' | relative_url }})),
- l'ajout de couches prosodiques (accentuation, intonation),
- la génération de formats de sortie multiples (HTML, JSON, vidéo).
