"""Fabrique la phrase lue de l'accueil (Maxime, 09/11/2026 ; brain/lectura/site/CADRAGE.md §V3.2).

Appelle une fois la synthèse de Lectura (api.lectura.world, route /tts/synthetiser), qui rend l'audio et le minutage
de chaque lettre (coupures de syllabes comprises), puis écrit :
  - assets/sons/accueil-phrase.mp3   l'audio (servi tel quel : la page n'appelle pas l'API) ;
  - _includes/accueil-phrase.html    la phrase en HTML, chaque syllabe (ligne 1) ou mot (ligne 2) avec son minutage.
À relancer si la phrase ou la voix changent (voix v2, par exemple) :
  python3 _outils/phrase_accueil.py [--voix siwis]
"""
from __future__ import annotations

import argparse
import base64
import html
import json
import pathlib
import subprocess
import tempfile
import urllib.request

RACINE = pathlib.Path(__file__).resolve().parent.parent
LIGNE1 = "Bienvenue sur Lectura World."
LIGNE2 = "L’IA au service du langage et de sa lecture."
# Graphie lue par la voix -> graphie affichée. Maxime, 09/11 : « World » se dit /wɔʁld/ (o ouvert, r français) ;
# la voix française le lit ainsi sous la graphie « Worlde » (e muet), vérifié sur les phonèmes rendus par l'API.
PRONONCIATION = {"Worlde": "World"}


def synthese(texte: str, voix: str) -> dict:
    corps = json.dumps({"texte": texte, "voix": voix}).encode()
    req = urllib.request.Request("https://api.lectura.world/tts/synthetiser", data=corps,
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.loads(r.read())["resultat"]


def syllabes(phrase: dict, texte: str) -> str:
    """Ligne 1 : chaque mot découpé en syllabes colorées (s1, s2, s3 en alternance), lettres muettes en .m."""
    lettres = {l["position"]: l for l in phrase["lettres"]}
    morceaux, n = [], 0
    for mot in phrase["mots"]:
        forme = texte[mot["position"]:mot["fin_texte"]]
        if forme in PRONONCIATION:  # mot lu sous une autre graphie : une seule unité, affichée normalement
            morceaux.append(f'<span class="ap-u s{n % 3 + 1}" data-d="{mot["debut"]}" data-f="{mot["fin"]}">'
                            f'{html.escape(PRONONCIATION[forme])}</span>')
            n += 1
            continue
        syl: list[list[dict]] = []
        for pos in range(mot["position"], mot["fin_texte"]):
            l = lettres.get(pos)
            if l is None:
                continue
            if l["coupure"] == "SYL" or not syl:
                syl.append([])
            syl[-1].append(l)
        spans = []
        for s in syl:
            debut = min(l["debut"] for l in s)
            fin = max(l["fin"] for l in s)
            txt = "".join(f'<span class="m">{html.escape(texte[l["position"]])}</span>' if l["phone"] == "_M"
                          else html.escape(texte[l["position"]]) for l in s)
            spans.append(f'<span class="ap-u s{n % 3 + 1}" data-d="{debut}" data-f="{fin}">{txt}</span>')
            n += 1
        morceaux.append("".join(spans))
    return " ".join(morceaux)


def mots(phrase: dict, texte: str, decalage: int) -> str:
    """Ligne 2 : chaque mot surligné à son tour."""
    out, curseur = [], phrase["mots"][0]["position"]
    for m in phrase["mots"]:
        out.append(html.escape(texte[curseur:m["position"]]))
        out.append(f'<span class="ap-u" data-d="{m["debut"]}" data-f="{m["fin"]}">'
                   f'{html.escape(texte[m["position"]:m["fin_texte"]])}</span>')
        curseur = m["fin_texte"]
    out.append(html.escape(texte[curseur:].strip()))
    return "".join(out)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--voix", default="siwis")
    args = ap.parse_args()
    lu = f"{LIGNE1} {LIGNE2}"
    for graphie_lue, affichee in PRONONCIATION.items():
        lu = lu.replace(affichee, graphie_lue)
    r = synthese(lu, args.voix)
    al = r["alignement"]
    texte = al["texte"]
    p1, p2 = al["phrases"]
    ligne1 = syllabes(p1, texte)
    ligne2 = mots(p2, texte, 0)
    sons = RACINE / "assets" / "sons"
    sons.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(suffix=".wav") as wav:
        wav.write(base64.b64decode(r["audio_base64"]))
        wav.flush()
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav.name, "-ac", "1", "-b:a", "64k",
                        str(sons / "accueil-phrase.mp3")], check=True)
    inc = (
        "{%- comment -%} Fichier produit par _outils/phrase_accueil.py (voix « " + args.voix + " » de Lectura) : "
        "ne pas modifier à la main. {%- endcomment -%}\n"
        '<div class="accueil-phrase" data-audio="{{ \'/assets/sons/accueil-phrase.mp3\' | relative_url }}">\n'
        f'  <p class="ap-ligne ap-ligne1">{ligne1}</p>\n'
        f'  <p class="ap-ligne ap-ligne2">{ligne2}</p>\n'
        '  <button type="button" class="ap-ecouter" aria-label="Écouter la phrase lue par la voix de Lectura">'
        '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>'
        '<span>Écouter</span></button>\n'
        "</div>\n"
    )
    (RACINE / "_includes" / "accueil-phrase.html").write_text(inc, encoding="utf-8")
    print(f"durée {r['duree']} ms ; ligne 1 : {LIGNE1} ; ligne 2 : {LIGNE2}")


if __name__ == "__main__":
    main()
