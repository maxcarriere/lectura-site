---
title: Aligneur-Syllabeur
layout: default
permalink: /developpement/modules/outils/aligneur/
redirect_from:
  - /solutions/modules/syllabeur/
---

> **Génération v0, gratuite.** Ce module fait partie de la première génération de Lectura : code sous AGPL-3.0, sans modèle à télécharger. Tout tourne en local, sans clé. Usage commercial : compris dans toute licence Lectura v1, ou sur demande. Voir [Génération v0]({{ '/developpement/modules/v0/' | relative_url }}).

<div class="module-header">
  <h1>Lectura Aligneur-Syllabeur</h1>
  <p class="module-tagline">Aligneur graphème-phonème et syllabeur phonologique du français</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-aligneur/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/Aligneur" class="module-badge">GitHub</a>
    <code class="module-install">pip install lectura-aligneur</code>
  </div>
</div>

## Présentation

**Pivot central du pipeline Lectura.** Module autonome, **zéro dépendance** Python. Il aligne lettre par lettre l'orthographe et la phonétique, et décompose chaque syllabe en attaque, noyau et coda, avec la correspondance graphème-phonème.

Les groupes de lecture (élisions, liaisons, enchaînements) sont construits en amont par le [Phonémiseur]({{ '/developpement/modules/outils/phonemiseur/' | relative_url }}). L'Aligneur les reçoit tout faits et se concentre sur l'alignement et la syllabation.

C'est grâce à cet alignement que les corpus d'entraînement des modèles [G2P]({{ '/developpement/modules/metiers/g2p/' | relative_url }}) et [P2G]({{ '/developpement/modules/metiers/p2g/' | relative_url }}) ont été préparés.

---

## Ce que fait ce module

| Fonction | Description |
|----------|-------------|
| **Alignement graphème-phonème** | Correspondance lettre par lettre entre orthographe et IPA (algorithme DFS) |
| **Lettres muettes** | Détection et marquage des lettres silencieuses (e, s, t, d, h, x…) |
| **Lettres fusionnées** | Graphèmes à plusieurs phonèmes (x = ks/gz, y…) |
| **Groupes de lecture** | Accepte les groupes construits par le Phonémiseur (élision, liaison, enchaînement) |
| **Syllabation phonologique** | Découpage en syllabes par modèle de sonorité (IPA et orthographe) |
| **Attaque / noyau / coda** | Chaque syllabe décomposée en ses constituants, phonèmes distribués |
| **Spans** | Position de chaque syllabe, groupe et composant dans le texte source |
| **Phonémiseur au choix** | eSpeak-NG (par défaut), Lectura Phonémiseur, ou tout objet avec `.phonemize()` / `.predict()` |
| **Formules** | Lectures de formules (nombres, dates…) avec événements alignés |

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="https://lingua.lectura.world/syllabes">Essayer l'Aligneur en ligne (génération actuelle) →</a>
</div>

---

## Exemples de code

### Analyse d'un mot

```python
from lectura_aligneur import LecturaSyllabeur

syllabeur = LecturaSyllabeur()    # eSpeak-NG par défaut
result = syllabeur.analyze("chocolat")

print(result.format_detail())
# chocolat -> /ʃɔkɔla/
#   σ1: /ʃɔ/ <<cho>> [0:3] att=ʃ noy=ɔ cod=-
#   σ2: /kɔ/ <<co>>  [3:5] att=k noy=ɔ cod=-
#   σ3: /la/ <<lat>>  [5:8] att=l noy=a cod=-

# Chaque syllabe expose son alignement :
for s in result.syllabes:
    att = " ".join(f"{p.ipa}→{p.grapheme}" for p in s.attaque.phonemes)
    noy = " ".join(f"{p.ipa}→{p.grapheme}" for p in s.noyau.phonemes)
    cod = " ".join(f"{p.ipa}→{p.grapheme}" for p in s.coda.phonemes)
    print(f"  {s.ortho:6s} /{s.phone}/  att=[{att}] noy=[{noy}] cod=[{cod}]  span={s.span}")
# cho    /ʃɔ/  att=[ʃ→ch] noy=[ɔ→o] cod=[]  span=(0, 3)
# co     /kɔ/  att=[k→c]  noy=[ɔ→o] cod=[]  span=(3, 5)
# lat    /la/  att=[l→l]  noy=[a→a] cod=[]   span=(5, 8)
```

### Analyse complète avec groupes de lecture

`analyser_complet()` prend une liste de `MotAnalyse` (produite par le G2P), construit les groupes de lecture en appliquant liaisons, enchaînements et élisions, puis syllabe chaque groupe :

```python
from lectura_aligneur import LecturaSyllabeur, MotAnalyse

syllabeur = LecturaSyllabeur()

# Mots annotés par le G2P (phone + liaison)
mots = [
    MotAnalyse(phone="lez", liaison="Lz"),    # les (liaison en z)
    MotAnalyse(phone="ɑ̃fɑ̃", liaison="none"),   # enfants
    MotAnalyse(phone="ʒu",  liaison="none"),    # jouent
]

result = syllabeur.analyser_complet(mots)

print(f"{result.nb_groupes} groupes, {result.nb_syllabes} syllabes")
print(f"Groupes : {result.format_ligne1()}")
print(f"Syllabes : {result.format_ligne2()}")
# 2 groupes, 4 syllabes
# Groupes : les enfants | jouent
# Syllabes : le.zɑ̃.fɑ̃ | ʒu
```

### Syllabation directe de l'IPA

```python
syllabeur = LecturaSyllabeur()
syllabes = syllabeur.syllabify_ipa("ʃɔkɔla")
print(syllabes)  # ['ʃɔ', 'kɔ', 'la']
```

### Avec le Phonémiseur Lectura

Le [Phonémiseur]({{ '/developpement/modules/outils/phonemiseur/' | relative_url }}) tourne lui aussi en local : ses poids sont téléchargés depuis Hugging Face au premier usage (1,9 Mo, licence CC BY-NC 4.0).

```python
from lectura_aligneur import LecturaSyllabeur
from lectura_phonemiseur import creer_engine

g2p = creer_engine()   # premier appel : télécharge les poids dans ~/.lectura/models/g2p/

# Tout objet avec .predict(word) est accepté
class G2PPhonemizer:
    def predict(self, word):
        return g2p.analyser([word])['g2p'][0]

syllabeur = LecturaSyllabeur(phonemizer=G2PPhonemizer())
result = syllabeur.analyze("maison")
```

---

## Structures de données

| Classe | Rôle |
|--------|------|
| `ResultatAnalyse` | Analyse d'un mot : `mot`, `phone`, `syllabes[]` |
| `Syllabe` | Syllabe : `phone`, `ortho`, `span`, `attaque`, `noyau`, `coda` |
| `GroupePhonologique` | Attaque, noyau ou coda : liste de `Phoneme` avec `ipa` et `grapheme` |
| `Phoneme` | Phonème : `ipa` (ex. « ʃ ») et `grapheme` (ex. « ch ») |
| `MotAnalyse` | Mot annoté : `token`, `phone`, `liaison`, `pos` |
| `GroupeLecture` | Groupe de lecture : `mots[]`, `phone_groupe`, `jonctions[]`, `span` |
| `ResultatGroupe` | Groupe syllabé : `groupe` et `syllabes[]` |
| `ResultatSyllabation` | Résultat complet : `groupes[]`, `nb_syllabes`, `nb_groupes` |
| `OptionsGroupes` | Options : `gerer_elisions`, `gerer_liaisons`, `gerer_enchainement` |

---

## Rôle dans le pipeline Lectura

1. **Préparation des corpus** : l'alignement graphème-phonème a permis de constituer les données d'entraînement des modèles G2P et P2G.
2. **Lecture assistée** : les groupes de lecture et les syllabes colorées sont la base de l'interface de lecture.
3. **Synthèse vocale** : l'alignement et les spans permettent de synchroniser le texte et l'audio.

---

## Installation

```bash
pip install lectura-aligneur
```

---

## Caractéristiques techniques

- **Zéro dépendance** Python
- **Alignement DFS** graphème-phonème, avec lettres muettes et fusionnées
- **Modèle de sonorité** pour la syllabation (5 classes : obstruantes, nasales, liquides, semi-voyelles, voyelles)
- **Deux étapes** utilisables séparément : groupes de lecture (construits par le Phonémiseur), puis syllabation
- **Phonémiseur au choix** : eSpeak-NG, Lectura Phonémiseur, ou tout objet compatible
- **Python 3.10+**, avec annotations de type complètes (PEP 561)

---

## Licence

- **Code** : AGPL-3.0-or-later.
- **Tables de données** (alphabet phonétique, correspondances phonème-graphèmes, lettres muettes…) : écrites par Lectura, sous la licence du code (voir le fichier NOTICE du paquet).
- **Usage commercial ou intégration dans un produit fermé** : compris dans toute licence Lectura v1, ou sur demande par la [page Contact]({{ '/contact/' | relative_url }}).
