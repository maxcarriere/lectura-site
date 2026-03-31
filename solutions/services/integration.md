---
title: Integration logicielle
layout: default
permalink: /solutions/services/integration/
---

Integration des modules de traitement linguistique Lectura dans vos applications et workflows existants.

## API et modules Python

<span class="status-badge status-conception">En conception</span>

Les modules Lectura (syllabeur, G2P, P2G, POS-tagger, detection des liaisons) sont distribues comme packages Python independants sur PyPI. Ils peuvent etre integres dans n'importe quelle application Python via un simple `pip install`.

Chaque module expose une API claire et documentee, avec des entrees/sorties typees.

---

## Pipeline d'enrichissement

<span class="status-badge status-cours">En cours</span>

Le pipeline `lectura-main` enchaine les modules de traitement pour produire un texte enrichi multi-couches : decoupage syllabique, transcription phonetique, identification des liaisons, marquage des lettres muettes, coloration phonetique.

La sortie peut prendre plusieurs formats : HTML annote, JSON structure, ou texte balise. Ce pipeline est disponible comme service d'integration pour les editeurs et developpeurs souhaitant enrichir automatiquement leurs contenus de lecture.
