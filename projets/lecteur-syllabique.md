---
title: Lecteur syllabique
layout: default
permalink: /projets/lecteur-syllabique/
---

## Objectif

Développer un moteur de lecture syllabique capable de transformer un texte en français en une lecture progressive, synchronisée et visuellement enrichie.

## Cœur algorithmique

Le lecteur syllabique repose sur un ensemble de modules développés et testés sur des volumes importants de données linguistiques :

### Module de phonémisation
- Modèle léger (TFLite) entraîné sur environ 300 000 mots
- Approche mot à mot (sans contexte phrastique à ce stade)
- Conversion du texte en séquence de phonèmes

### Alignement graphème / phonème
- Mise en correspondance des lettres et des sons
- Taux de réussite supérieur à 99 %
- Identification des lettres portées par plusieurs phonèmes
- Identification des lettres muettes

### Syllabation
- Découpage de la phonétique en syllabes (attaque, noyau, coda)
- Projection des syllabes phonétiques sur l'orthographe via l'alignement

### Inventaire des syllabes
- Inventaire complet des syllabes phonétiques du français
- Enrichissement par les liaisons et les groupes phonologiques
- 36 phonèmes recensés
- Enregistrements audio via TTS à entrée phonétique

### Gestion des liaisons et enchaînements
- Prise en compte de la phonétique, de l'orthographe, de la catégorie grammaticale
- Gestion des h muets et h aspirés

### Tokenisation
- Transformation d'un texte en structure hiérarchique de lecture
- Niveaux : groupe de lecture → mot → syllabe → token

### Lecture synchronisée
- Affichage paramétrable du texte
- Lecture progressive avec surlignage en temps réel

## Versions envisagées

Le lecteur est conçu pour être décliné sur plusieurs supports :
- **Version web** : interface accessible depuis un navigateur
- **Version desktop** : application autonome
- **Version mobile** : application Android/iOS

## État d'avancement

| Composant | Statut |
|-----------|--------|
| Moteur de phonémisation | Fonctionnel |
| Alignement graphème/phonème | Fonctionnel (>99 %) |
| Syllabation | Fonctionnel |
| Tokenisation | Fonctionnel (code brouillon) |
| Lecture synchronisée | Prototype |
| Interface web | À venir |

Le code existant est reconnu comme brouillon et hétérogène, mais constitue une **preuve de concept fonctionnelle** validant l'ensemble de la chaîne de traitement.

## Liens

- Dépôt GitHub : *(lien à ajouter)*
- Page produit : [Lecteur syllabique (web)]({{ '/produits/lecteur-syllabique-web/' | relative_url }})

---

[← Retour aux projets]({{ '/projets/' | relative_url }})
