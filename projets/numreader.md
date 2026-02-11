---
title: NumReader — Moteur de lecture des nombres
layout: default
permalink: /projets/numreader/
---

## Objectif

Construire un moteur de lecture de nombres (≤ 4 chiffres) capable de :
- convertir un nombre entre trois écritures : numérique, texte français, chiffres romains,
- produire une lecture audio concaténative,
- synchroniser son et affichage par un surlignage pédagogique.

## Architecture

Le projet repose sur un pipeline en 8 étapes, organisé en deux phases :

### Phase E1 — Affichage et Lecture

1. **Normalisation et validation** de l'entrée utilisateur
2. **Construction de la Line source** (représentation interne ordonnée d'unités de lecture)
3. **Calcul de la valeur numérique**
4. **Conversion vers les Lines cibles** (les deux autres systèmes d'écriture)
5. **Post-traitement** (ajustement des variantes, enrichissement des unités)
6. **Affichage et lecture audio simple**

### Phase E2 — Alignement et Surlignage

7. **Enrichissement en rangs** (structure positionnelle : milliers, centaines, dizaines, unités)
8. **Construction des pistes** (SoundTrack + DisplayTrack) et de la **Timeline** (synchronisation son/affichage par intersection des rangs)

### Principe fondamental

La synchronisation entre le son et l'affichage ne repose jamais sur la forme du texte ni sur des règles linguistiques implicites. Elle repose exclusivement sur les **intervalles de rangs** portés par les segments. Cela permet notamment d'afficher un nombre en chiffres romains tout en le lisant en français, avec un surlignage correct.

## Modèle de données

Le moteur manipule les objets suivants :

- **Unité** : brique atomique de lecture (ex : `[10]`, `[1000]`, `[et1]`). Toutes les unités sont déclarées dans un fichier CSV, aucune n'est créée dynamiquement.
- **Line** : suite ordonnée d'Unités représentant une écriture du nombre (numérique, texte français, romaine).
- **Nombre** : orchestrateur regroupant les Lines et les lignes de lecture pour un nombre donné.
- **Segment** : regroupement d'unités contiguës couvrant un intervalle de rangs (E2).
- **Timeline** : suite d'événements associant son et zones de surlignage (E2).

## Données

Les données sont entièrement déclaratives :
- `unites.csv` : table centrale de toutes les unités de lecture (label, base, variante, valeur, son, affichage)
- `numeraux.csv` : correspondance token français → unité
- `symboles.csv` : correspondance symbole romain → unité
- `romains.csv` : correspondance bloc numérique → séquence romaine
- 49 fichiers audio WAV (PCM, mono, 44100 Hz, 16 bits)

## Stack technique

- **Langage** : Python
- **Desktop** : PyQt5 + Pygame (audio)
- **Mobile** : Kivy + Buildozer (Android)
- **Tests** : pytest
- **Données** : CSV + WAV

## État d'avancement

| Composant | Statut |
|-----------|--------|
| Pipeline E1 (conversions + lecture) | Fonctionnel |
| Pipeline E2 (alignement + surlignage) | Fonctionnel |
| Interface desktop (Windows) | Fonctionnelle |
| Interface mobile (Android) | En finalisation |
| Interface web | À venir |
| Exécutable Windows (.exe) | Disponible |

## Liens

- Dépôt GitHub : *(lien à ajouter)*
- Page produit : [NumReader — Lecture des nombres]({{ '/produits/numreader/' | relative_url }})

---

[← Retour aux projets]({{ '/projets/' | relative_url }})
