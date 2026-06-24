---
title: Corpus de Syllabes
layout: default
permalink: /produits/ressources/corpus-syllabes/
---

<span class="status-badge status-dispo">Disponible</span>

Les syllabes les plus fréquentes du français, avec leur décomposition phonétique et des fichiers audio associés.

| | |
|---|---|
| **Syllabes** | 4 307 syllabes (couverture 95% et 99% des occurrences) |
| **Liaison** | 1 474 syllabes de liaison |
| **Composants** | 570 composants (attaques, codas, noyaux) |
| **Audio** | Voix Polly-Lea (F) et Polly-Remi (M), 6 713 fichiers chacun |
| **Formules** | 282 fichiers audio (lettres, nombres, symboles) |

---

## Données

### syllabes.csv / syllabes_liaison.csv

| Colonne | Description | Exemple |
|---------|-------------|---------|
| `syllabe_ipa` | Transcription phonétique (IPA) | `de` |
| `ortho` | Graphie(s) possible(s) | `dé` |
| `frequence` | Fréquence d'usage (rang) | `1400` |
| `pseudo_ortho` | Graphie simplifiée pour affichage | `des` |

Les syllabes de liaison sont séparées car elles n'apparaissent qu'en contexte de liaison entre deux mots.

### composants.csv

| Colonne | Description | Exemple |
|---------|-------------|---------|
| `type` | Type de composant | `attaque`, `coda`, `noyau` |
| `ipa` | Transcription phonétique | `ʁ` |
| `ortho` | Graphie(s) | `r` |
| `pseudo_ortho` | Graphie simplifiée | `r` |

---

## Filtrage

Le corpus source contient 5 825 syllabes. 44 ont été exclues :
- 15 syllabes sans voyelle (clusters consonantiques isolés)
- 29 syllabes avec clusters consonantiques impossibles (4+ consonnes consécutives)

---

## Audio

Deux voix générées via Amazon Polly (voix neuronales françaises) :

- **Polly-Lea** : voix féminine (6 713 fichiers, ~26 Mo)
- **Polly-Remi** : voix masculine (6 713 fichiers, ~20 Mo)

Les formules sont des enregistrements audio pour les exercices (lettres, nombres, symboles, etc.) : 282 fichiers.

---

## Sources

- **Corpus de syllabes** : Lectura (Maxime Carrière)
- **Audio** : Amazon Polly (voix neuronales Lea et Remi)

---

## Obtenir cette ressource

Les ressources sont distribuées sous forme d'archives zip, téléchargeables via l'API Lectura avec une clé d'accès.

1. [Contactez-nous]({{ '/contact/' | relative_url }}) pour obtenir une clé API avec accès aux ressources
2. Utilisez l'endpoint `GET /download/{resource_id}` de l'API pour télécharger l'archive
3. L'endpoint `GET /download/` liste les ressources disponibles et leurs identifiants

**Authentification :** header `Authorization: Bearer <votre_clé>` — les clés de type « paid » ou « unlimited » donnent accès au téléchargement.

<div class="cta-links" style="margin-top: 1.5rem;">
  <a href="{{ '/contact/' | relative_url }}">Nous contacter</a>
  <a href="https://api.lectura.world/docs#/Downloads" target="_blank">Documentation API</a>
</div>
