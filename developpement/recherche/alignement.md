---
title: Algorithmes développés
layout: default
permalink: /developpement/recherche/algorithmes/
redirect_from:
  - /developpement/recherche/alignement/
---

Lectura repose sur plusieurs algorithmes spécialisés, développés pour traiter les particularités du français. Cette page décrit les principaux : l'alignement graphème-phonème, la syllabation, les groupes de lecture (liaisons) et la lecture des nombres.

---

## 1. Alignement graphème-phonème

L'alignement consiste à établir la correspondance entre les lettres écrites d'un mot et les sons qu'elles produisent. En français, ce problème est complexe :

- Un phonème peut correspondre à 1, 2, 3 ou 4 graphèmes (ex : /ʃ/ → « ch », /o/ → « eau »)
- Un graphème peut ne produire aucun son (lettres muettes : le « t » de « chat »)
- Certaines frontières sont ambiguës (« oignon » → /ɔɲɔ̃/)

Sans alignement fiable, impossible de colorier les syllabes, marquer les lettres muettes ou synchroniser l'audio avec le texte. C'est une brique fondamentale de l'[approche phonétique]({{ '/developpement/recherche/phonetique/' | relative_url }}) de Lectura.

### Table de correspondances

L'alignement repose sur une **table de correspondances graphème-phonème** construite à partir du [Lexique383](http://www.lexique.org/), une base lexicale de référence pour le français. Cette table recense les associations connues entre séquences de lettres et phonèmes IPA.

Plusieurs cas particuliers sont pris en charge :

| Cas | Exemple | Traitement |
|-----|---------|------------|
| **Digrammes** | « ch » → /ʃ/, « ou » → /u/ | Correspondances multi-caractères dans la table |
| **Lettres muettes** | « chat » → /ʃa/ | Le « t » est marqué muet |
| **Diphones inséparables** | « oi » → /wa/, « ien » → /jɛ̃/ | Traités comme des blocs |
| **Lettres valant 2 phonèmes** | « x » → /ɡz/ (exiger) ou /ks/ (taxi) | Le graphème produit deux sons |
| **Nasalisation contextuelle** | « en.fant » → /ɑ̃.fɑ̃/ vs « é.ner.gie » → /e.nɛʁ.ʒi/ | Le digramme « en » est tantôt une voyelle nasale, tantôt deux unités séparées |
| **Flexions muettes** | « enfants » → /ɑ̃fɑ̃/ | Le « s » du pluriel ne se prononce pas |
| **Mots d'emprunt** | « week-end », « parking » | Prononciations spécifiques intégrées à la table |

### Algorithme DFS

L'algorithme principal de l'[Aligneur-Syllabeur]({{ '/developpement/modules/outils/aligneur/' | relative_url }}) utilise une **recherche en profondeur** (DFS, Depth-First Search) avec backtracking pour explorer toutes les correspondances possibles entre une séquence de graphèmes et une séquence de phonèmes.

Le principe est le suivant :

1. À chaque position, l'algorithme essaie toutes les correspondances connues (1→1, 2→1, 3→1, 4→1, ou graphème muet)
2. Il avance simultanément dans les deux séquences (lettres et phonèmes)
3. Si une impasse est atteinte, il fait un backtracking
4. Parmi toutes les solutions valides, il sélectionne la meilleure selon un **score**

Le score favorise les correspondances les plus fréquentes dans le lexique et pénalise les associations rares ou ambiguës. Cela permet de lever les ambiguïtés lorsque plusieurs alignements sont possibles pour un même mot.

### Résultats

L'algorithme couvre la quasi-totalité du vocabulaire français courant avec une précision supérieure à 95 % sur le corpus aligné (1,16 million d'entrées). Les travaux en cours portent sur les cas limites : mots d'emprunt, noms propres étrangers et optimisation de la table pour les mots rares.

---

## 2. Syllabation

### La syllabe

Une syllabe est une unité phonologique composée de trois parties :

- l'**attaque** : consonne(s) initiale(s) (facultative)
- le **noyau** : voyelle centrale (obligatoire)
- la **coda** : consonne(s) finale(s) (facultative)

Par exemple, dans « par.tir » : « par » a une attaque /p/, un noyau /a/ et une coda /ʁ/ ; « tir » a une attaque /t/, un noyau /i/ et une coda /ʁ/.

### Origine : la synthèse concaténative

L'idée initiale de Lectura était de construire une synthèse vocale concaténative à partir de **syllabes** enregistrées. En théorie, il suffit de découper les mots en syllabes, puis de concaténer les échantillons audio correspondants.

En pratique, cette approche s'est heurtée à un problème majeur : les transitions entre syllabes produisaient des artefacts audibles. L'approche par **diphones** (paires de demi-phonèmes chevauchants) s'est révélée bien plus efficace, car elle capture naturellement les transitions entre sons. C'est cette approche qui a donné le [TTS diphonique]({{ '/developpement/recherche/tts-diphonique/' | relative_url }}).

La syllabation reste cependant essentielle pour un autre usage : la **lecture augmentée**.

### Syllabation pour la lecture

Dans le contexte de l'apprentissage de la lecture, la décomposition syllabique est un outil pédagogique fondamental. Elle permet de colorier les syllabes, guider le déchiffrage et rendre la structure du mot visible.

Le défi est d'aligner la **syllabation phonétique** (fondée sur les sons) avec une **syllabation orthographique** (fondée sur les lettres) lisible et cohérente. L'alignement graphème-phonème décrit plus haut rend cette correspondance possible : une fois que chaque lettre est associée à un phonème, les frontières syllabiques phonétiques se projettent sur l'orthographe.

### Modèle de sonorité

La syllabation phonétique repose sur un **modèle de sonorité** qui encode les contraintes phonotactiques du français :

| Classe | Sonorité | Exemples |
|--------|----------|----------|
| Occlusives | 1 | p, t, k, b, d, g |
| Fricatives | 2 | f, s, ʃ, v, z, ʒ |
| Nasales | 3 | m, n, ɲ |
| Liquides | 4 | l, ʁ |
| Semi-voyelles | 5 | j, w, ɥ |
| Voyelles | 6 | a, e, i, o, u, y... |

Le **Principe de Sonorité Séquentielle** (SSP) stipule que la sonorité croît vers le noyau de la syllabe et décroît vers les marges. Ce principe, combiné avec le **principe d'attaque maximale** (on rattache le maximum de consonnes à l'attaque de la syllabe suivante), guide le placement des frontières syllabiques.

Les exceptions propres au français (clusters /st/, /sp/, /sk/ en attaque) sont gérées par des règles spécifiques.

### Choix de syllabation orthographique

La projection de la syllabation phonétique sur l'orthographe impose quelques choix :

- Les **consonnes doubles** ne sont pas séparées lorsqu'elles correspondent à un seul phonème (« al.lu.mer » et non « al.l.u.mer »).
- Les **lettres valant deux phonèmes** (comme le « x » de « exiger ») sont préservées comme un bloc dans la syllabe orthographique, même si elles chevauchent la frontière phonétique. C'est cette situation que l'[orthocode](https://lexique.lectura.world/documentation) note avec le marqueur `²` (ex : `e.x²i.ger`).
- Les **diphones inséparables** (« oi », « ien ») restent groupés.

---

## 3. Groupes de lecture et liaisons

La syllabation décrite ci-dessus opère au niveau du mot isolé. Mais à l'oral, les mots ne sont pas séparés : ils se connectent par des phénomènes de **liaison** et d'**enchaînement**. Pour produire une lecture augmentée fidèle à l'oral, il faut regrouper les mots en **groupes de lecture** et gérer la resyllabification inter-mots.

### Liaison et enchaînement

La **liaison** consiste à prononcer une consonne finale habituellement muette lorsque le mot suivant commence par une voyelle :

> « les enfants » → /le.zɑ̃.fɑ̃/ (le « s » de « les », normalement muet, se prononce /z/)

L'**enchaînement** est un phénomène différent : une consonne finale toujours prononcée se rattache à la syllabe du mot suivant :

> « une amie » → /y.na.mi/ (le « n » de « une » est toujours prononcé)

La distinction est importante car la liaison est soumise à des règles grammaticales, alors que l'enchaînement est automatique.

### Algorithme de liaison

L'algorithme de liaison de Lectura est **déterministe** et repose sur la **catégorie grammaticale** des mots. Il implémente les règles de liaison du français standard :

- **Liaisons obligatoires** : déterminant + nom (« les‿enfants »), pronom + verbe (« ils‿ont »), adjectif + nom (« petit‿ami »), après certaines prépositions (« en‿été »)
- **Liaisons interdites** : après un nom singulier (« le chat // est »), après « et » (« lui et // elle »), devant un « h aspiré » (« les // haricots »)
- **Liaisons facultatives** : dans les autres cas, une analyse contextuelle décide

La gestion du **h aspiré** et du **h muet** repose sur une table lexicale : les mots commençant par un « h aspiré » (comme « haricot », « héros ») bloquent la liaison, alors que les mots commençant par un « h muet » (comme « homme », « heure ») la permettent.

### Groupes de lecture

Un **groupe de lecture** est un ensemble de mots consécutifs liés par des liaisons ou des enchaînements. À l'intérieur d'un groupe, la syllabation traverse les frontières de mots :

> « les enfants » forme un seul groupe de lecture : /le.zɑ̃.fɑ̃/ (3 syllabes, pas 2 + 2)

Ces groupes sont nécessaires pour produire un coloriage syllabique fidèle à la prononciation réelle. Sans eux, la lecture augmentée traiterait chaque mot isolément, ce qui donnerait un résultat éloigné de l'oral.

### Corpus annoté

Un corpus de phrases annotées en liaisons est en cours de constitution pour permettre un apprentissage statistique des cas facultatifs. L'objectif est de compléter les règles déterministes par un modèle probabiliste entraîné sur des données réelles.

---

## 4. Lecture des nombres et formules

### Le problème

La lecture à voix haute des nombres est un problème en apparence simple, mais qui recèle une complexité notable. Le nombre « 2014 » se dit « deux-mille-quatorze » en français, s'écrit « MMXIV » en chiffres romains, et chaque représentation suit des règles propres. La lecture des nombres implique à la fois des conversions entre systèmes, une lecture audio correcte et, dans un contexte pédagogique, un surlignage synchronisé.

### Le concept de « Line »

Le moteur de lecture des nombres repose sur un concept central : la **Line** (ligne d'unités). Une Line est une suite ordonnée d'**unités de lecture**, chacune représentant une brique atomique du nombre.

Chaque unité possède :
- une **base** (ex : `[10]`, `[100]`, `[1000]`)
- un **type** : additif (par défaut), multiplicatif ou soustractif
- une **valeur numérique**
- un **texte affichable** et un **son associé**

Pour un même nombre, le moteur construit plusieurs Lines correspondant à différents systèmes d'écriture :

| Système | Exemple (2014) | Line |
|---------|---------------|------|
| Numérique | 2014 | `[2000][000][10][4]` |
| Texte français | deux-mille-quatorze | `[2][1000][14]` |
| Romain | MMXIV | `[1000][1000][10][1][5]` |

### Conversions

Le moteur convertit librement entre les trois systèmes. La **valeur numérique** sert de pivot : chaque Line peut être évaluée (en appliquant les opérations multiplicatives et soustractives, puis en additionnant), et une nouvelle Line peut être reconstruite dans le système cible.

Par exemple, pour convertir une Line numérique en Line texte français, le moteur applique des transformations successives : remplacement de `[70]` par `[60][10]`, de `[80]` par `[4][20]` (avec `[4]` multiplicatif), regroupement des « teens » (`[10][4]` → `[14]`), etc.

### Lecture audio et surlignage

La lecture audio est **concaténative** : chaque unité est associée à un fichier son pré-enregistré, et la lecture consiste à enchaîner ces sons dans l'ordre de la Line. Aucune synthèse vocale n'intervient.

Pour le surlignage pédagogique, les unités sont enrichies par des **rangs** (unités, dizaines, centaines, milliers) et regroupées en **segments**. Deux pistes indépendantes sont construites : une **SoundTrack** (piste audio) et une **DisplayTrack** (piste d'affichage). Leur synchronisation repose sur les intervalles de rangs, ce qui permet de croiser librement le son d'un système avec l'affichage d'un autre (par exemple, entendre « deux-mille-quatorze » tout en voyant « 2014 » avec surlignage synchronisé).

### Extensions

Le moteur, initialement conçu pour les nombres de 1 à 4 chiffres, est prévu pour s'étendre aux grands nombres et aux formules mathématiques simples (additions, fractions). Le concept de Line et d'unités de lecture se prête à ces extensions sans modification de l'architecture de base.
