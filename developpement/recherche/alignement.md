---
title: Algorithmes d'alignement
layout: default
permalink: /developpement/recherche/alignement/
---

<span class="status-badge status-cours">En cours</span>

## Le problème

L'alignement graphème-phonème consiste à établir la correspondance entre les lettres écrites d'un mot et les sons qu'elles produisent. En français, ce mapping est complexe :

- Un phonème peut correspondre à 1, 2, 3 ou 4 graphèmes (ex : /ʃ/ → « ch », /o/ → « eau »)
- Un graphème peut ne produire aucun son (lettres muettes : « t » de « chat »)
- Les frontières ne sont pas évidentes (« oignon » → /ɔɲɔ̃/)

Ce problème est au cœur de l'[approche phonétique]({{ '/developpement/recherche/phonetique/' | relative_url }}) de Lectura : sans alignement fiable, impossible de colorier les syllabes, marquer les lettres muettes ou synchroniser l'audio avec le texte.

---

## Approche DFS (Depth-First Search)

L'algorithme principal de l'[Aligneur-Syllabeur]({{ '/developpement/modules/outils/aligneur/' | relative_url }}) utilise une recherche en profondeur (DFS) avec backtracking pour explorer toutes les correspondances possibles entre une séquence de graphèmes et une séquence de phonèmes.

### Principe

1. À chaque position, l'algorithme essaie toutes les correspondances connues (1→1, 2→1, 3→1, 4→1, ou graphème muet)
2. Il avance dans les deux séquences simultanément
3. Si une impasse est atteinte, il fait un backtracking
4. Parmi toutes les solutions valides, il sélectionne la meilleure selon un score

### Score de sélection

Quand plusieurs alignements sont possibles, le modèle de **sonorité** départage :
- Préférence pour les correspondances les plus courantes (fréquence dans le lexique)
- Pénalité pour les correspondances rares ou ambiguës
- Respect de la structure syllabique (attaque-noyau-coda)

---

## Modèle de sonorité

Le modèle de sonorité encode les contraintes phonotactiques du français pour guider la syllabation :

| Classe | Sonorité | Exemples |
|--------|----------|----------|
| Occlusives | 1 | p, t, k, b, d, g |
| Fricatives | 2 | f, s, ʃ, v, z, ʒ |
| Nasales | 3 | m, n, ɲ |
| Liquides | 4 | l, ʁ |
| Semi-voyelles | 5 | j, w, ɥ |
| Voyelles | 6 | a, e, i, o, u, y... |

La syllabation respecte le **Principe de Sonorité Séquentielle** (SSP) : la sonorité croît vers le noyau de la syllabe et décroît vers les marges. Les exceptions (clusters /st/, /sp/, /sk/ en attaque) sont gérées par des règles spécifiques au français.

---

## Défis spécifiques au français

| Défi | Exemple | Solution |
|------|---------|----------|
| **Digrammes** | « ch » → /ʃ/, « ou » → /u/ | Table de correspondances multi-caractères |
| **Lettres muettes finales** | « chat » → /ʃa/ | Le « t » est marqué muet |
| **E caduc** | « samedi » → /samdi/ ou /samədi/ | Variantes de prononciation |
| **Liaisons** | « les‿enfants » | Resyllabification inter-mots |
| **Nasalisation** | « en » → /ɑ̃/ vs « ennui » → /ɑ̃nɥi/ | Contexte phonotactique |
| **X, S pluriels** | « enfants » → /ɑ̃fɑ̃/ | Graphèmes muets de flexion |

---

## État d'avancement

L'algorithme DFS avec modèle de sonorité est implémenté et opérationnel dans le module [Aligneur-Syllabeur]({{ '/developpement/modules/outils/aligneur/' | relative_url }}). Il couvre la quasi-totalité du vocabulaire français courant.

Les travaux en cours portent sur :
- les cas limites (mots d'emprunt, noms propres étrangers),
- l'optimisation de la table de correspondances pour les mots rares,
- l'intégration de feedback statistique depuis le corpus aligné (1.16M entrées).
