---
title: Lectura Formule
layout: default
permalink: /produits/programmes/formule/
---

<span class="status-badge status-cours">En cours de développement</span>

Lectura Formule est une application interactive de lecture de formules françaises avec **alignement visuel** et **lecture audio synchronisée**. Chaque formule (nombre, date, heure, sigle, expression mathématique…) est décomposée en composants, et chaque composant est associé à son texte lu, sa transcription IPA et son fichier audio.

---

## Lecture audio synchronisée

L'application utilise les **events alignés** du module [Formules]({{ '/developpement/modules/outils/formules/' | relative_url }}) pour synchroniser :

- Le **surlignage** de chaque partie de la formule source pendant la lecture
- La **lecture audio** composant par composant à partir de la banque de sons WAV (299 fichiers)
- L'affichage de la **transcription IPA** en temps réel

---

## Types de formules

Tous les types supportés par le module Formules sont disponibles :

| Type | Exemple | Lecture |
|------|---------|--------|
| Nombre | `42` | quarante-deux |
| Date | `25/12/2024` | vingt-cinq décembre deux-mille-vingt-quatre |
| Heure | `14h30` | quatorze heures trente |
| Téléphone | `06 12 34 56 78` | zéro-six, douze, trente-quatre… |
| Sigle | `SNCF` | esse-enne-ce-effe |
| Monnaie | `42 EUR` | quarante-deux euros |
| Maths | `2x²+5x-3` | deux x au carré plus cinq x moins trois |

---

## En savoir plus

- [Module Formules]({{ '/developpement/modules/outils/formules/' | relative_url }}) — le module Python sous-jacent
- [Analyse du langage]({{ '/solutions/analyse-langage/#formules' | relative_url }}) — démo en ligne
