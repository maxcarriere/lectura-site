"""Image de l'accueil de la vitrine (Maxime, 09/11/2026 : « dans l'esprit » de l'ancien bandeau, plus grande, sans texte).

FLUX.2 [klein] 4B, celui de Ressources (venv, cache et révision figée), hors ligne. À lancer seulement avec l'accord
du guichet (Lectura Techno). Mêmes garde-fous que Ressources/Mots-Images/fabrication/generer_images.py.

  R=/data/work/projets/lectura/workspace/Ressources
  HF_HUB_OFFLINE=1 $R/_outils/venv/bin/python _outils/image_accueil.py --graines 4

Sortie : /data/work/projets/lectura/workspace/Vitrine/accueil-images/<prompt>-<graine>.png (+ .json)
"""
from __future__ import annotations

import argparse
import json
import os
import signal
import time
from pathlib import Path

R = Path("/data/work/projets/lectura/workspace/Ressources")
os.environ.setdefault("HF_HUB_CACHE", str(R / "_outils" / "hf-cache"))
os.environ.setdefault("HF_HUB_OFFLINE", "1")
DOSSIER = R / "_outils/hf-cache/models--black-forest-labs--FLUX.2-klein-4B/snapshots/e7b7dc27f91deacad38e78976d1f2b499d76a294"
SORTIE = Path("/data/work/projets/lectura/workspace/Vitrine/accueil-images")
BANDEAU = Path(__file__).resolve().parent.parent / "assets/images/banniere.png"

COMMUN = ("wide panoramic digital painting, warm parchment and sunrise tones, soft light, detailed, elegant, "
          "storybook quality, harmonious composition with empty calm space in the middle, "
          "absolutely no text, no words, no letters, no captions, no watermark")
PROMPTS = {
    "voix": ("on the left, a human head in profile shown in anatomical cross-section with the mouth, tongue and "
             "vocal tract, golden sound waves flowing from the mouth across the scene to the right; in the centre "
             "a vintage studio microphone and small brass gears; on the right a young child holding a tablet and an "
             "open illustrated storybook, reading happily; " + COMMUN),
    "livre": ("a large open book in the centre whose pages release flowing ribbons of sound waves and colourful "
              "syllable tiles drifting into the sky; on the left a human profile silhouette speaking; on the right "
              "a young child reading on a tablet; vintage microphone and brass gears in the background; " + COMMUN),
    "esprit": ("same subjects and mood as the reference banner (speaking head in cross-section, sound waves, "
               "microphone, gears, child reading a tablet and a book), recomposed as a large wide illustration; "
               + COMMUN),
}
ARRET = False


def _stop(*_):
    global ARRET
    ARRET = True


def cours() -> bool:
    import subprocess
    return any(subprocess.run(["pgrep", "-x", n], capture_output=True).returncode == 0
               for n in ("obs", "xournalpp", "xournal"))


def main() -> None:
    import psutil
    import torch
    from diffusers import Flux2KleinPipeline
    from PIL import Image
    from transformers import AutoTokenizer, Qwen3ForCausalLM

    ap = argparse.ArgumentParser()
    ap.add_argument("--prompts", nargs="+", default=list(PROMPTS))
    ap.add_argument("--graines", type=int, default=4)
    ap.add_argument("--largeur", type=int, default=1536)
    ap.add_argument("--hauteur", type=int, default=768)
    ap.add_argument("--pas", type=int, default=4)
    a = ap.parse_args()
    signal.signal(signal.SIGINT, _stop)
    signal.signal(signal.SIGTERM, _stop)
    SORTIE.mkdir(parents=True, exist_ok=True)
    ram = lambda: psutil.virtual_memory().available / 2**30
    while ram() < 10.5:   # seuil du guichet (Lectura Techno, 09/11) : on attend, on ne force pas
        print(f"attente : RAM disponible {ram():.1f} Go < 10,5 Go", flush=True)
        time.sleep(30)

    tok = AutoTokenizer.from_pretrained(DOSSIER / "tokenizer")
    enc = Qwen3ForCausalLM.from_pretrained(DOSSIER / "text_encoder", torch_dtype=torch.bfloat16).to("cuda")
    pe = Flux2KleinPipeline.from_pretrained(DOSSIER, text_encoder=enc, tokenizer=tok, transformer=None, vae=None,
                                            torch_dtype=torch.bfloat16)
    with torch.no_grad():
        embeds = {k: pe.encode_prompt(prompt=PROMPTS[k], device="cuda")[0].to("cpu") for k in a.prompts}
    del pe, enc, tok
    torch.cuda.empty_cache()
    while ram() < 10.5:
        print(f"attente avant le transformeur : RAM disponible {ram():.1f} Go", flush=True)
        time.sleep(30)
    pipe = Flux2KleinPipeline.from_pretrained(DOSSIER, text_encoder=None, tokenizer=None,
                                              torch_dtype=torch.bfloat16).to("cuda")
    pipe.set_progress_bar_config(disable=True)
    ref = Image.open(BANDEAU).convert("RGB")
    for k in a.prompts:
        for g in range(1, a.graines + 1):
            f = SORTIE / f"{k}-{g}.png"
            if f.exists():
                continue
            while cours():   # pause si OBS ou Xournal tourne (règle du guichet)
                print("pause : OBS ou Xournal ouvert", flush=True)
                time.sleep(60)
            if ARRET or ram() < 8 or torch.cuda.memory_reserved() > 11.5 * 2**30:
                print("arrêt propre", flush=True)
                return
            t = time.time()
            with torch.no_grad():
                img = pipe(image=ref if k == "esprit" else None, prompt_embeds=embeds[k].to("cuda"),
                           height=a.hauteur, width=a.largeur, num_inference_steps=a.pas, guidance_scale=1.0,
                           generator=torch.Generator("cuda").manual_seed(1000 + g)).images[0]
            img.save(f)
            f.with_suffix(".json").write_text(json.dumps({"prompt": PROMPTS[k], "graine": 1000 + g, "pas": a.pas,
                                                          "taille": [a.largeur, a.hauteur], "reference": k == "esprit",
                                                          "duree_s": round(time.time() - t, 1)}, ensure_ascii=False))
            print(f, round(time.time() - t, 1), "s", flush=True)


if __name__ == "__main__":
    main()
