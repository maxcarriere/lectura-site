---
title: VC ZeroShot
layout: default
permalink: /developpement/modules/outils/vc-zeroshot/
redirect_from:
  - /developpement/modules/metiers/vc-zeroshot/
  - /solutions/modules/vc-zeroshot/
---

> **Génération v0, gratuite.** Ce module fait partie de la première génération de Lectura : code sous AGPL-3.0 ; modèles OpenVoice et AudioSeal sous licence MIT, préréglages de timbre sous CC BY 4.0 (téléchargés depuis Hugging Face au premier usage, puis hors ligne, sans clé). Usage commercial : compris dans toute licence Lectura v1, ou sur demande. Voir [Génération v0]({{ '/developpement/modules/v0/' | relative_url }}).

<div class="module-header">
  <h1>Lectura VC ZeroShot</h1>
  <p class="module-tagline">Conversion vocale zero-shot du français par OpenVoice V2, en ONNX, en local, avec filigrane IA</p>
  <div class="module-links">
    <a href="https://pypi.org/project/lectura-vc-zeroshot/" class="module-badge">PyPI</a>
    <a href="https://github.com/maxcarriere/lectura-modules/tree/main/VC-ZeroShot" class="module-badge">GitHub</a>
    <a href="https://huggingface.co/lecturaworld/lectura-vc-zeroshot-v0" class="module-badge">Hugging Face</a>
    <code class="module-install">pip install lectura-vc-zeroshot</code>
  </div>
</div>

## Présentation

Conversion vocale zero-shot du français avec **OpenVoice V2**, en inférence ONNX pure (sans PyTorch), entièrement **en local**. Le module change le timbre d'un son : vers un préréglage, vers un mélange pondéré de préréglages, ou vers une voix de référence que vous fournissez.

Toute sortie est marquée comme générée par IA (filigrane **AudioSeal**).

| Caractéristique | Valeur |
|-----------------|--------|
| **Moteur** | OpenVoice V2, ONNX Runtime (sans PyTorch) |
| **Préréglages** | `fr-f1`, voix mélangée féminine (`melange-f`), voix mélangée masculine (`melange-h`) |
| **Mélange** | Mélange pondéré de préréglages |
| **Voix de référence** | Un enregistrement que vous fournissez, avec consentement (voir plus bas) |
| **Sortie** | Audio float32 à 22 050 Hz, déjà marqué |
| **Marquage** | Filigrane AudioSeal inaudible, impossible à désactiver |

---

## Essayer en ligne

<div class="try-online-btn">
  <a href="{{ '/developpement/modules/metiers/vc/#essayer-en-ligne' | relative_url }}">Essayer la conversion vocale en ligne →</a>
</div>

---

## Exemple de code

```python
from lectura_vc_zeroshot import creer_engine, PRESET_SPEAKERS

engine = creer_engine()
print(PRESET_SPEAKERS)                      # ['fr-f1', 'melange-f', 'melange-h']

# vers un préréglage
audio, sr = engine.convert("source.wav", "melange-h")

# mélange pondéré de préréglages
audio, sr = engine.convert("source.wav", {"fr-f1": 0.5, "melange-f": 0.5})

# vers une voix de référence que vous fournissez (zero-shot)
audio, sr = engine.convert("source.wav", "ma_voix.wav")
```

`audio` est un tableau float32 à 22 050 Hz, déjà marqué. Pour des conversions répétées, gardez le même `engine` (la fonction `convertir(...)` en crée un à chaque appel). Un nom qui n'est ni un préréglage ni un fichier existant lève `PresetInconnu`.

---

## Préréglages

Trois vecteurs de timbre ; aucun son n'est livré.

| Identifiant | Voix | Licence du vecteur |
|-------------|------|--------------------|
| `fr-f1` | féminine, corpus SIWIS | CC BY 4.0 |
| `melange-f` | voix mélangée féminine (plusieurs voix, dont SIWIS) | CC BY 4.0 |
| `melange-h` | voix mélangée masculine (plusieurs voix) | CC BY 4.0 |

Les voix mélangées sont des vecteurs moyens, mesurés pour ne ressembler à aucune des voix dont elles sont tirées. Le décalage de formants (`sr_override`) ne s'applique qu'aux références audio : avec un préréglage, il est ignoré.

---

## Voix de référence et consentement

Convertir vers une voix de référence quelconque est la fonction même d'un outil zero-shot : le module l'accepte, en local.

**N'utilisez que votre propre voix, ou celle d'une personne qui vous a donné son accord écrit.** Imiter la voix d'une personne sans son consentement peut porter atteinte à ses droits (Code civil, art. 9). Diffuser un tel contenu sans qu'il soit évident, ou expressément indiqué, qu'il est généré par un algorithme peut aussi constituer un délit (Code pénal, art. 226-8).

---

## Marquage IA

Toute sortie de conversion porte un filigrane inaudible **AudioSeal** (Meta, licence MIT). Aucune option ne le désactive : si le modèle du filigrane manque ou est altéré, la conversion échoue et ne rend aucun son.

**Ne retirez pas ce marquage** : le règlement européen sur l'IA (art. 50) l'exige.

Pour vérifier un son, sans PyTorch :

```python
import soundfile as sf
from lectura_vc_zeroshot._filigrane import detecter, marque_retrouvee

audio, sr = sf.read("sortie.wav", dtype="float32")
p, bits = detecter(audio, sr)
print(marque_retrouvee(p, bits))   # True : marque Lectura retrouvée
```

Le détecteur public d'AudioSeal (`audioseal_detector_16bits`, PyTorch) retrouve aussi la marque.

---

## Installation

```bash
pip install lectura-vc-zeroshot
```

Au premier usage, le paquet télécharge depuis Hugging Face ([lecturaworld/lectura-vc-zeroshot-v0](https://huggingface.co/lecturaworld/lectura-vc-zeroshot-v0)) ce qui lui manque, et vérifie chaque fichier par son empreinte SHA-256 :

| Fichier | Taille | Rôle | Licence |
|---------|--------|------|---------|
| `openvoice_se.onnx`, `openvoice_vc.onnx` | 3,3 Mo, 128 Mo | extracteur de timbre et convertisseur OpenVoice V2 | MIT (MyShell.ai) |
| `generator_base.onnx` | 58,9 Mo | générateur du filigrane AudioSeal | MIT (Meta) |
| `detector_base.onnx` | 34,7 Mo | détecteur AudioSeal (seulement si vous appelez `detecter`) | MIT (Meta) |
| `fr-f1.npy`, `melange-f.npy`, `melange-h.npy` | 1 Ko chacun | vecteurs de timbre des préréglages | CC BY 4.0 |

Les modèles vont dans `~/.lectura/models/vc/` (ou `$LECTURA_MODELS_DIR/vc/`, ou `models_dir=`). `LECTURA_HORS_LIGNE=1` interdit tout téléchargement ; le message d'erreur dit alors quoi poser à la main.

---

## Licence

- **Code** : AGPL-3.0-or-later.
- **Modèles** : OpenVoice V2 (MyShell.ai) et AudioSeal (Meta), sous licence MIT.
- **Préréglages de timbre** : CC BY 4.0 ; crédits dans le fichier NOTICE du paquet.
- **Usage commercial ou intégration dans un produit fermé** : compris dans toute licence Lectura v1, ou sur demande par la [page Contact]({{ '/contact/' | relative_url }}). Les modèles de tiers et les préréglages gardent leur propre licence.
