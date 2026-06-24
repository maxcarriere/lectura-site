---
title: Corpus de Voix
layout: default
permalink: /produits/ressources/corpus-voix/
---

<span class="status-badge status-dispo">Disponible</span>

Corpus de parole française avec transcription phonétique IPA, destiné à l'entraînement de modèles TTS et STT. Le corpus fournit les métadonnées (texte, phonétique, durée, locuteur). Les fichiers audio ne sont pas redistribués directement : ils sont récupérables via les sources ouvertes d'origine à l'aide d'un script fourni.

| | |
|---|---|
| **Corpus 1** | 97 012 phrases (SIWIS + M-AILABS) — 7 locuteurs professionnels |
| **Corpus 2** | 783 339 phrases (Common Voice) — ~20 000 locuteurs bénévoles |
| **Total** | 880 351 phrases avec transcription IPA alignée |
| **Métadonnées** | Locuteur, durée, source |
| **Script** | Téléchargement automatique des fichiers audio depuis les sources |

---

## Format des données (JSONL)

Chaque ligne est un objet JSON :

```json
{
  "text": "Patrick's Old Cathedral est maintenant une église paroissiale.",
  "phones": "p a t ʁ i k | ɔ l d | k a t e d ʁ a l | ɛ s t | m ɛ̃ t ə n ɑ̃ | y n | e ɡ l i z | p a ʁ w a s j a l",
  "duration": 7.812,
  "speaker": "cv_ee947622",
  "source": "common_voice",
  "audio_ref": "cv_0000000"
}
```

| Champ | Description |
|-------|-------------|
| `text` | Texte orthographique normalisé |
| `phones` | Transcription phonétique IPA (phonèmes séparés par espaces, mots par `\|`) |
| `duration` | Durée de l'audio en secondes |
| `speaker` | Identifiant du locuteur |
| `source` | Source de l'audio (`common_voice`, `mailabs`, `siwis`) |
| `audio_ref` | Référence pour retrouver le fichier audio d'origine |

---

## Corpus 1 : SIWIS + M-AILABS

97 012 phrases issues de livres audio lus par 7 locuteurs professionnels.

| Locuteur | Source | Genre |
|----------|--------|-------|
| nadine_eckert_boulet | M-AILABS | F |
| ezwa | M-AILABS | F |
| siwis_female | SIWIS | F |
| bernard | M-AILABS | M |
| gilles_g_le_blanc | M-AILABS | M |
| zeckou | M-AILABS | M |
| sous_les_mers (mix) | M-AILABS | Mix |

---

## Corpus 2 : Common Voice

783 339 phrases lues par ~20 000 locuteurs bénévoles (Common Voice v25.0).

---

## Vocabulaire phonétique

`vocab_phones.json` contient les 59 tokens utilisés :

- Phonèmes IPA standard du français
- Marqueurs de liaison : `[z]`, `[t]`, `[n]`, `[ʁ]`, `[p]`
- Élision : `[']`
- Enchaînement : `[-]`
- Ponctuation : `,` `.` `?` `!` `…`

---

## Récupération des fichiers audio

### Common Voice

1. Télécharger Common Voice FR depuis [commonvoice.mozilla.org](https://commonvoice.mozilla.org/fr/datasets)
2. Convertir les MP3 en WAV 16kHz mono
3. Les `audio_ref` (`cv_XXXXXXX`) correspondent aux clips indexés dans l'ordre du fichier `validated.tsv`

### M-AILABS

1. Télécharger le M-AILABS French Speech Dataset depuis [caito.de](https://www.caito.de/2019/01/03/the-m-ailabs-speech-dataset/)
2. Les `audio_ref` indiquent directement le chemin relatif dans l'archive

### SIWIS

1. Télécharger depuis [datashare.ed.ac.uk](https://datashare.ed.ac.uk/handle/10283/2353)
2. Les `audio_ref` des entrées source `siwis` référencent les fichiers WAV du corpus

---

## Transcription phonétique

Les transcriptions IPA ont été générées par le pipeline G2P de Lectura (précision ~98,5%) puis vérifiées et corrigées par alignement forcé (MFA).

---

## Sources et licences

- **Common Voice** (Mozilla) : CC-0 (domaine public)
- **M-AILABS Speech Dataset** : voir licence M-AILABS
- **SIWIS French Speech Synthesis Database** : licence académique
- **Transcriptions phonétiques** : Lectura (Maxime Carrière)

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
