---
title: Ressources
layout: default
permalink: /solutions/outils/ressources/
---

Des corpus, des donnees et des supports visuels librement utilisables pour l'enseignement de la lecture.

## Corpus syllabique

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Un corpus structure de 55 lecons (51 lecons + 4 listes de mots-outils) couvrant l'integralite de la progression syllabique du francais : des sons isoles aux graphies complexes (ill, tion, -elle/-ette, etc.).

Chaque lecon est un fichier YAML contenant : le phoneme cible, les graphies associees, la transcription IPA, des mots exemples, des phrases et des exercices. Le tout valide par un schema strict.

Organisation en 5 parties :
- **P1** (lecons 01–06) : Sons — lettres et phonemes isoles
- **P2** (lecons 07–27) : Syllabes CV simples et cas ambigus
- **P3** (lecons 28–36) : Digrammes vocaliques (ou, on, oi, an, in, ai, eu, au…)
- **P4** (lecons 37–44) : Syllabes inversees, groupes consonantiques, lettres muettes
- **P5** (lecons 45–51) : Sons complexes (ill, y, ail/eil, ien/ion, tion, x/w…)

---

## LeXiK — Lexique francais Lectura

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Base lexicale de 1,35 million d'entrees et 25 colonnes : orthographe, morphologie, phonetique IPA, 4 corpus de frequences, synonymes, antonymes, definitions. Compilation de sources libres (GLAFF, Wiktionnaire, OpenSubtitles...) dans un format unifie CSV/SQLite.

Compatible avec le module [`lectura-lexique`]({{ '/solutions/outils/modules/lexique/' | relative_url }}) pour des requetes avancees : conjugaison, rimes, anagrammes, recherche multi-critere.

<a class="more-link" href="{{ '/solutions/outils/ressources/lexik/' | relative_url }}">En savoir plus</a>

---

## Kit d'entrainement G2P / P2G

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Kit complet pour reproduire les modeles [G2P]({{ '/solutions/outils/modules/g2p/' | relative_url }}) et [P2G]({{ '/solutions/outils/modules/p2g/' | relative_url }}) : 22 649 phrases annotees (phonetique, POS, morphologie, liaison), 1,16 million de mots avec alignement phone-grapheme, scripts d'entrainement PyTorch en 2 phases, et modeles pre-entraines ONNX + NumPy.

Sources : UD French-GSD, GLAFF, Lexique383 (licences CC BY-SA).

<a class="more-link" href="{{ '/solutions/outils/ressources/kit-g2p-p2g/' | relative_url }}">En savoir plus</a>

---

## Base lexicale Lexique383

<span class="status-badge status-fonctionnel">Fonctionnel</span>

Extraction et enrichissement de la base Lexique383 (142 000 mots) : conversion SAMPA→IPA, syllabation automatique, analyse des attaques et codas, croisement avec les frequences Manulex (textes pour enfants).

Donnees produites : tables de syllabes, couverture TTS (avec et sans schwa pedagogique), syllabes de liaison par resyllabification des codas.

---

## Imagier illustre

<span class="status-badge status-cours">En cours</span>

163 images generees par IA (SDXL + LoRA style livre pour enfants), chacune associee a un mot de la progression syllabique. Format 1024×1024, style coherent. Le pipeline de generation est automatise : une liste de mots produit un batch d'images en ~18 secondes par image.

L'imagier sert de support visuel au manuel syllabique et aux applications interactives.
