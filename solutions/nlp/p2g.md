---
title: "P2G — Graphémisation"
layout: default
permalink: /solutions/nlp/p2g/
---

## Reconstruisez l'orthographe à partir de la phonétique

Vous disposez d'une transcription phonétique IPA et avez besoin de retrouver l'orthographe française correcte ? Le module P2G de Lectura reconstruit le texte écrit à partir des sons, en tenant compte du contexte grammatical.

---

## Ce que Lectura propose

Un service de conversion phonème → graphème pour le français, accessible via API ou comme package Python. Le P2G reconstruit l'orthographe à partir d'une séquence IPA, avec gestion des homophones, des formules et des noms propres.

---

## Bénéfices clés

- **~95% de précision** sur la conversion phonème → orthographe (modèle core)
- **~96% en pipeline complet** avec reconnaissance des formules et noms propres
- **Gestion des homophones** : sélection lexicale contextuelle (lex_select)
- **Zero configuration** : fonctionne via l'API sans modèle à télécharger

---

## Cas d'usage

- **Transcription vocale** : convertir la sortie d'un STT phonétique en texte lisible
- **Dictée automatique** : reconstituer l'orthographe à partir de la prononciation
- **Outils d'apprentissage** : vérifier la correspondance son-écriture
- **Sous-titrage** : pipeline audio → phonèmes → texte

---

## Essayer

Le P2G est disponible en démo interactive avec l'API Lectura.

<a class="more-link" href="{{ '/developpement/modules/metiers/p2g/' | relative_url }}">Documentation technique & démo →</a>

---

## Contact

Pour intégrer le P2G dans votre projet : [admin@lectura.world](mailto:admin@lectura.world)
