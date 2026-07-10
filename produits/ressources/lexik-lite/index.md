---
title: LeXiK
layout: default
permalink: /produits/ressources/lexik/
redirect_from:
  - /produits/ressources/lexik-lite/
---

<span class="status-badge status-dispo">Disponible</span>

**LeXiK** est la base lexicale de Lectura (1,52 million d'entrées de formes, phonétique et morphologie), destinée à l'intégration dans des applications, la recherche linguistique ou le développement d'outils de traitement du français.

---

## Fichiers

Deux fichiers CSV (encodage UTF-8), accompagnés d'un décodeur Multext en Python :

| Fichier | Entrées | Taille | Description |
|---------|---------|--------|-------------|
| `lexik_lite.csv` | 1 518 155 | ~131 Mo | Toutes les formes (hors entités nommées) |
| `lexik_lite_freq.csv` | 314 212 | ~28 Mo | Uniquement les formes avec fréquence > 0 |
| `multext_decoder.py` | — | — | Script Python de décodage des codes Multext |

---

## Colonnes

| Colonne | Description | Exemple |
|---------|-------------|---------|
| `ortho` | Forme orthographique | chocolat |
| `lemme` | Lemme de rattachement | chocolat |
| `cgram` | Catégorie grammaticale | NOM |
| `multext` | Code morphologique Multext | Ncms |
| `phone` | Transcription phonétique IPA | ʃokola |
| `syllabes` | Découpage syllabique (séparateur `.`) | ʃo.ko.la |
| `orthocode` | Code orthographique Lectura | cho.co.lat° |
| `freq_composite` | Fréquence composite (moyenne pondérée de 4 sources) | 23.48 |
| `source` | Source de la donnée | GLAFF |

---

## Codes Multext

Le code `multext` encode les propriétés morphologiques sur une chaîne compacte. Le script `multext_decoder.py` permet de le décoder :

```python
from multext_decoder import decode_multext

decode_multext("Ncms")
# {'categorie': 'Nom', 'type': 'commun', 'genre': 'masculin', 'nombre': 'singulier'}

decode_multext("Vmip3s-")
# {'categorie': 'Verbe', 'type': 'principal', 'mode': 'indicatif',
#  'temps': 'présent', 'personne': '3', 'nombre': 'singulier'}

decode_multext("Yms")
# {'categorie': 'Sigle', 'genre': 'masculin', 'type': 'sigle'}
```

### Catégories principales

| Code | Catégorie | Positions suivantes |
|------|-----------|---------------------|
| N | Nom | type (c/p), genre (m/f), nombre (s/p) |
| V | Verbe | type (m/v), mode, temps, personne, nombre |
| A | Adjectif | type, degré, genre, nombre |
| D | Déterminant | type, genre, nombre |
| P | Pronom | type, genre, nombre |
| R | Adverbe | type, degré |
| S | Adposition | type (p/d) |
| C | Conjonction | type (c/s) |
| Y | Sigle | genre (m/f), type (s/a) |
| I | Interjection | — |

Le caractère `-` indique une valeur non spécifiée.

---

## Sources

Les données proviennent de trois sources, indiquées dans la colonne `source` :

- **GLAFF** (1,24M formes) : GLAFF 1.2.1, sous licence CC BY-SA 3.0
- **WIK** (~100K formes) : données extraites du Wiktionnaire
- **LEX** (~10K formes) : Lexique383, sous licence CC BY-SA 4.0

---

## Fréquences

La fréquence composite est une moyenne pondérée de quatre corpus :

- Frantext (littérature française)
- LM10 (corpus journalistique)
- frWaC (web francophone)
- OpenSubtitles (sous-titres)

Une valeur vide signifie qu'aucune fréquence n'a été trouvée dans les corpus de référence.

---

## Obtenir cette ressource

Deux modes d'accès sont disponibles :

- **Lien direct** : [contactez-nous]({{ '/contact/' | relative_url }}) en précisant la ressource souhaitée, nous vous envoyons un lien de téléchargement personnalisé par email.
- **Via l'API** : utilisez l'endpoint `GET /download/{resource_id}` avec votre clé API. Voir la [documentation API](https://api.lectura.world/docs#/Downloads).

<div class="cta-links" style="margin-top: 1.5rem;">
  <a href="{{ '/contact/' | relative_url }}">Nous contacter</a>
  <a href="{{ '/produits/ressources/#obtenir' | relative_url }}">Détails d'accès</a>
</div>
