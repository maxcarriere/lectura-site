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
import wave

RACINE = pathlib.Path(__file__).resolve().parent.parent
LIGNE1 = "Bienvenue sur Lectura World :"
LIGNE2 = "L’IA au service du langage et de sa lecture."
# Graphie lue par la voix -> graphie affichée. Maxime, 09/11 : « World » se dit /wɔʁld/ (o ouvert, r français) ;
# la voix française le lit ainsi sous la graphie « Worlde » (e muet), vérifié sur les phonèmes rendus par l'API.
PRONONCIATION = {"Worlde": "World"}


def synthese(texte: str, voix: str, style: str, vitesse: float) -> dict:
    # Moteur « multi » (voix entraînées, modèle High) : le moteur par défaut (« mono » + changement de timbre)
    # sonnait mal (Maxime, 10/11).
    corps = json.dumps({"texte": texte, "moteur": "multi", "voix": voix, "model": "high", "style": style, "duration_scale": vitesse}).encode()
    req = urllib.request.Request("https://api.lectura.world/tts/synthetiser", data=corps,
                                 headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.loads(r.read())["resultat"]


VOYELLES = set("aeiouyɑɛɔøœəɛ̃ɑ̃ɔ̃œ̃") | {"ɛ̃", "ɑ̃", "ɔ̃", "œ̃"}
SEMI = {"j", "w", "ɥ"}


def classes_sons(lettres: list[dict]) -> list[str]:
    """Classe de couleur de chaque lettre, comme la lecture syllabique de LecturaLingua :
    k-c consonne, k-v voyelle, k-x son composé (semi-voyelle + voyelle, ex. « ien », « oi »), m muette.
    Une lettre « _C » prolonge le son de la précédente."""
    out: list[str] = []
    for i, l in enumerate(lettres):
        ph = l["phone"]
        if ph == "_M":
            out.append("m")
        elif ph == "_C":
            out.append(out[-1] if out else "k-c")
        elif ph in SEMI and i + 1 < len(lettres) and lettres[i + 1]["phone"] == "_C":
            out.append("k-x")
        elif ph in VOYELLES or ph.rstrip("̃") in VOYELLES:
            out.append("k-v")
        else:
            out.append("k-c")
    return out


def syllabes(phrase: dict, texte: str) -> str:
    """Ligne 1 : chaque syllabe est une unité surlignée ; lettres colorées par son ; « · » entre les syllabes."""
    lettres = {l["position"]: l for l in phrase["lettres"]}
    morceaux = []
    for mot in phrase["mots"]:
        forme = texte[mot["position"]:mot["fin_texte"]]
        affiche = PRONONCIATION.get(forme, forme)  # « Worlde » lu, « World » affiché : on garde les lettres communes
        ls = [lettres[pos] for pos in range(mot["position"], mot["position"] + len(affiche)) if pos in lettres]
        cl = classes_sons(ls)
        syl: list[list[tuple[dict, str]]] = []
        for l, c in zip(ls, cl):
            if l["coupure"] == "SYL" or not syl:
                syl.append([])
            syl[-1].append((l, c))
        spans = []
        for s in syl:
            debut = min(l["debut"] for l, _ in s)
            fin = max(l["fin"] for l, _ in s)
            if s is syl[-1] and forme != affiche:
                fin = mot["fin"]
            txt = "".join(f'<span class="{c}">{html.escape(texte[l["position"]])}</span>' for l, c in s)
            spans.append(f'<span class="ap-u" data-d="{debut}" data-f="{fin}">{txt}</span>')
        morceaux.append('<span class="ap-pt">·</span>'.join(spans))
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


def lue(texte: str) -> str:
    for graphie_lue, affichee in PRONONCIATION.items():
        texte = texte.replace(affichee, graphie_lue)
    return texte


def decaler(phrases: list[dict], dt: int) -> dict:
    """Réunit les phrases rendues par l'API et décale leurs temps de dt ms."""
    mots_ = [dict(m, debut=m["debut"] + dt, fin=m["fin"] + dt) for ph in phrases for m in ph["mots"]]
    lettres_ = [dict(l, debut=l["debut"] + dt, fin=l["fin"] + dt) for ph in phrases for l in ph["lettres"]]
    return {"mots": mots_, "lettres": lettres_}


def main() -> None:
    # Maxime, 10/11 : ligne 1 rapide et expressive, ligne 2 narrative ; deux synthèses enchaînées.
    ap = argparse.ArgumentParser()
    ap.add_argument("--voix", default="siwis")
    ap.add_argument("--ligne2-dans-phrase", action="store_true",
                    help="ligne 2 tirée de la phrase entière (essai nadine) ; par défaut, lue seule (choix du 10/11, siwis)")
    ap.add_argument("--style1", default="expressif")
    ap.add_argument("--lenteur1", type=float, default=0.85, help="< 1 : plus rapide")
    ap.add_argument("--style2", default="narratif")
    ap.add_argument("--lenteur2", type=float, default=1.0)
    ap.add_argument("--pause", type=int, default=350, help="silence entre les deux lignes, en ms")
    ap.add_argument("--sortie", default=str(RACINE / "assets" / "sons" / "accueil-phrase.mp3"))
    ap.add_argument("--essai", action="store_true", help="n'écrit que l'audio (pour comparer des voix)")
    args = ap.parse_args()
    # La ligne 1 est lue avec « ! » (élan expressif) ; l'affichage garde « : ».
    r1 = synthese(lue(LIGNE1.rstrip(" :.") + " !"), args.voix, args.style1, args.lenteur1)
    # Ligne 2 (Maxime, 10/11 : « Nadine 3 le premier ») : tirée de la phrase entière lue en narratif, où elle sonne
    # mieux que lue seule ; on garde l'audio à partir de son premier mot.
    r2 = synthese(lue(f"{LIGNE1} {LIGNE2}" if args.ligne2_dans_phrase else LIGNE2), args.voix, args.style2, args.lenteur2)
    t2 = r2["alignement"]["texte"]
    coupe = t2.index(LIGNE2[:6])
    ph2 = decaler(r2["alignement"]["phrases"], 0)
    ph2 = {"mots": [m for m in ph2["mots"] if m["position"] >= coupe],
           "lettres": [l for l in ph2["lettres"] if l["position"] >= coupe]}
    debut2 = max(0, ph2["mots"][0]["debut"] - 40)
    with tempfile.TemporaryDirectory() as tmp:
        w1, w2, w2c = pathlib.Path(tmp, "1.wav"), pathlib.Path(tmp, "2.wav"), pathlib.Path(tmp, "2c.wav")
        w1.write_bytes(base64.b64decode(r1["audio_base64"]))
        w2c.write_bytes(base64.b64decode(r2["audio_base64"]))
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-ss", str(debut2 / 1000), "-i", str(w2c), str(w2)], check=True)
        with wave.open(str(w1)) as w:
            d1 = round(w.getnframes() * 1000 / w.getframerate())
            sr = w.getframerate()
        pathlib.Path(args.sortie).parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(w1), "-f", "lavfi", "-t", str(args.pause / 1000),
                        "-i", f"anullsrc=r={sr}:cl=mono", "-i", str(w2), "-filter_complex",
                        "[0:a][1:a][2:a]concat=n=3:v=0:a=1", "-ac", "1", "-b:a", "64k", args.sortie], check=True)
    print(f"ligne 1 {args.style1} x{args.lenteur1} : {d1} ms ; ligne 2 {args.style2} : {r2['duree'] - debut2} ms ; voix {args.voix}")
    if args.essai:
        return
    t1 = r1["alignement"]["texte"]
    ligne1 = syllabes(decaler(r1["alignement"]["phrases"], 0), t1)
    if LIGNE1.endswith(":"):
        ligne1 += '<span class="ap-pt"> :</span>'
    ligne2 = mots(decaler([ph2], d1 + args.pause - debut2), t2, 0)
    inc = (
        "{%- comment -%} Fichier produit par _outils/phrase_accueil.py (voix « " + args.voix + " » de Lectura) : "
        "ne pas modifier à la main. {%- endcomment -%}\n"
        '<div class="accueil-phrase" data-audio="{{ \'/assets/sons/accueil-phrase.mp3\' | relative_url }}?v={{ site.time | date: \'%s\' }}">\n'
        f'  <p class="ap-ligne ap-ligne1">{ligne1}</p>\n'
        f'  <p class="ap-ligne ap-ligne2">{ligne2}</p>\n'
        '  <button type="button" class="ap-ecouter" aria-label="Écouter la phrase lue par la voix de Lectura">'
        '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>'
        '<span>Écouter</span></button>\n'
        "</div>\n"
    )
    (RACINE / "_includes" / "accueil-phrase.html").write_text(inc, encoding="utf-8")


if __name__ == "__main__":
    main()
