// Passage entre la carte « Lectura World » et la suite de l'accueil, comme sur zmaths.net (Maxime, 09/11/2026).
// - Flèches de part et d'autre de la phrase, ou un coup de molette vers le bas : on descend à la présentation.
// - Bouton « Afficher la carte des projets » de l'en-tête, ou un coup de molette vers le haut en tête de la
//   présentation : on remonte à la carte.
// - Si le défilement s'arrête entre les deux (pavé tactile, doigt), on se cale sur le plus proche.
// Hors de l'accueil, le bouton de l'en-tête est un simple lien vers l'accueil.
(function () {
  var zone = document.querySelector('.page-wrapper');
  var haut = document.querySelector('.accueil-haut');
  var suite = document.querySelector('.page-wrapper .parchment');
  if (!zone || !haut || !suite) return;
  if (window.matchMedia('(max-width: 699px)').matches) {  // téléphone : pas de carte (Maxime, 11/11), défilement libre
    document.body.classList.remove('sur-carte');
    return;
  }
  var bouton = document.getElementById('header-carte');
  var enCours = false;

  function seuil() { return suite.offsetTop; }
  function aller(y) {
    enCours = true;
    zone.scrollTo({ top: y, behavior: 'smooth' });
    setTimeout(function () { enCours = false; }, 700);
  }
  function versSuite() { aller(seuil()); }
  function versCarte() { aller(0); }

  // État « sur la carte » : sert à masquer le bouton de l'en-tête tant que la carte est visible.
  function etat() { document.body.classList.toggle('sur-carte', zone.scrollTop < seuil() / 2); }
  etat();

  document.querySelectorAll('.ap-fleche').forEach(function (f) { f.addEventListener('click', versSuite); });
  if (bouton) bouton.addEventListener('click', function (e) { e.preventDefault(); versCarte(); });

  // Molette : un seul cran suffit, dans les deux sens, entre la carte et le haut de la présentation.
  zone.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaY) < 2 || e.ctrlKey) return;
    var st = zone.scrollTop, s = seuil();
    if (e.deltaY > 0 && st < s - 2) { e.preventDefault(); if (!enCours) versSuite(); }
    else if (e.deltaY < 0 && st <= s + 2 && st > 0) { e.preventDefault(); if (!enCours) versCarte(); }
  }, { passive: false });

  // Autres défilements (tactile, clavier, barre) : calage sur le plus proche, comme Zmaths.
  var minuterie = null;
  zone.addEventListener('scroll', function () {
    etat();
    if (enCours) return;
    clearTimeout(minuterie);
    minuterie = setTimeout(function () {
      var st = zone.scrollTop, s = seuil();
      if (st > 0 && st < s) aller(st < s / 2 ? 0 : s);
    }, 120);
  });
})();
