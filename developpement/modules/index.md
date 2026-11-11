---
title: Modules
layout: default
permalink: /developpement/modules/
redirect_from:
  - /solutions/modules/
---

Les modules de Lectura sont des briques Python qui relient le texte, la phonétique et la voix. Il en existe deux générations.

## La génération actuelle (v1)

En service sur nos serveurs depuis octobre 2026, elle fait tourner les démos de [LecturaLingua](https://lingua.lectura.world), [LecturaVoice](https://voice.lectura.world) et [LecturaLexique](https://lexique.lectura.world). Elle n'est pas publiée : ni son code ni ses modèles ne sont distribués. Elle s'obtient sous licence, selon le parcours décrit dans [licences]({{ '/solutions/services/licences/' | relative_url }}) : démo, licence d'évaluation, licence commerciale. Notre API sert seulement aux démos : nous vendons les modèles, qui tournent chez vous.

Elle est organisée autour de la phonétique, pivot commun entre le texte et la voix :

| Fonction | Modules |
|----------|---------|
| Texte ⇄ phonétique (G2P, P2G), analyse grammaticale, syllabation, en français et en anglais | Transducer ; métiers NLP-FR et NLP-EN |
| Lexique embarqué | Lexicon |
| Correction orthographique | Corrector |
| Traduction français ⇄ anglais | Translator |
| Synthèse vocale du français, six voix | Synthesizer ; métier TTS |
| Reconnaissance vocale du français | Decoder ; métier STT |
| Alignement d'un texte sur sa lecture, sous-titres | Aligner, Subtitler |

## Les programmes de bureau

Des logiciels de bureau construits sur ces modules ont été prototypés au printemps et à l'été 2026 (Lectura Voice Edition, Lectura Lexique Viewer, Lectura Formule). Ils sont en pause ; une partie de leurs fonctions est en ligne sur les sites projets. Voir [les programmes]({{ '/produits/programmes/' | relative_url }}).

## La première génération (v0, archives)

Publiée en juillet 2026 sur PyPI et [GitHub](https://github.com/maxcarriere/lectura-modules), sous licence AGPL-3.0, elle compte dix-sept paquets Python, organisés en **briques outils** (modules atomiques réutilisables) et **pipelines métiers** (chaînes applicatives). Elle n'est plus développée ; sa documentation reste en ligne ci-dessous.

<div class="home-grid">
  <div class="home-card">
    <h2>12 Briques outils</h2>
    <p>Modules atomiques : tokenisation, formules, alignement, lexique, phonémiseur, graphémiseur, CTC, 3 moteurs TTS, 2 moteurs VC.</p>
    <a class="more-link" href="{{ '/developpement/modules/outils/' | relative_url }}">Voir les briques outils</a>
  </div>
  <div class="home-card">
    <h2>5 Pipelines métiers</h2>
    <p>Chaînes applicatives : G2P, P2G, TTS (3 moteurs), STT, VoiceConversion.</p>
    <a class="more-link" href="{{ '/developpement/modules/metiers/' | relative_url }}">Voir les pipelines</a>
  </div>
</div>

---

### Installation (v0)

```bash
# Meta-package : installez uniquement ce dont vous avez besoin
pip install "lectura[tokeniseur,formules]"   # 2 briques NLP
pip install "lectura[g2p]"                   # pipeline G2P complet
pip install "lectura[tts-mono]"              # pipeline TTS Monospeaker

# Groupes de commodité
pip install "lectura[nlp]"                   # 6 briques NLP
pip install "lectura[tts]"                   # 3 pipelines TTS
pip install "lectura[onnx]"                  # backends ONNX pour tous les modèles
pip install "lectura[all]"                   # tout

# Ou directement le package
pip install lectura-tokeniseur               # un seul module
pip install lectura-g2p                      # un pipeline
```

### Extras disponibles dans le meta-package `lectura`

| Extra | Contenu |
|-------|---------|
| `[tokeniseur]` | lectura-tokeniseur |
| `[formules]` | lectura-formules |
| `[phonemiseur]` | lectura-phonemiseur |
| `[graphemiseur]` | lectura-graphemiseur |
| `[aligneur]` | lectura-aligneur |
| `[lexique]` | lectura-lexique |
| `[decodeur]` | lectura-decodeur |
| `[g2p]` | Pipeline G2P (tokeniseur + formules + phonémiseur + lexique) |
| `[p2g]` | Pipeline P2G (graphémiseur + formules + lexique) |
| `[stt]` | Pipeline STT (décodeur + P2G) |
| `[tts-mono]` | Pipeline TTS Monospeaker + G2P |
| `[tts-multi]` | Pipeline TTS Multi-Speaker + G2P |
| `[tts-dipho]` | Pipeline TTS Diphone + G2P |
| `[tts]` | Les 3 pipelines TTS |
| `[vc]` | Conversion vocale (ZeroShot + Locuteurs) |
| `[nlp]` | 6 briques NLP (tokeniseur, formules, phonémiseur, graphémiseur, aligneur, lexique) |
| `[onnx]` | Backends ONNX pour tous les modèles |
| `[all]` | Tout |

Les modèles ne sont pas inclus dans ces paquets. Le mode API qu'ils prévoient date de cette génération : l'API de Lectura sert aujourd'hui aux démos et n'est pas proposée comme service.
