// Passage entre la carte « Lectura World » et la suite de l'accueil, comme sur zmaths.net (Maxime, 09/11/2026).
// - Flèches de part et d'autre de la phrase, ou un coup de molette vers le bas : on descend à la présentation.
// - Bouton « Afficher la carte des projets » de l'en-tête, ou un coup de molette vers le haut en tête de la
//   présentation : on remonte à la carte.
// - Si le défilement s'arrête entre les deux (pavé tactile, doigt), on se cale sur le plus proche.
// Hors de l'accueil, le bouton de l'en-tête fait descendre la carte sur place, comme à l'accueil (Maxime, 14 et 15/11/2026) ;
// la flèche, un cran de molette vers le bas, Échap ou un glissement du doigt vers le haut la font remonter,
// et l'on retrouve la page là où on l'avait laissée (elle n'a pas bougé dessous). Sans script, le bouton reste un lien vers l'accueil.
(function () {
  var zone = document.querySelector('.page-wrapper');
  var haut = document.querySelector('.accueil-haut');
  var suite = document.querySelector('.page-wrapper .parchment');
  if (!zone || !haut || !suite) { carteVolante(); return; }
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

  function carteVolante() {
    var bouton = document.getElementById('header-carte');
    var cv = document.getElementById('carte-volante');
    if (!bouton || !cv) return;
    var img = cv.querySelector('.carte-fond');
    var fleche = cv.querySelector('.cv-fermer');
    var bloque = false;  // pendant le glissement
    function ouvrir() {
      if (!cv.hidden || bloque) return;
      if (img && !img.getAttribute('src')) img.setAttribute('src', img.getAttribute('data-src'));
      cv.hidden = false;
      void cv.offsetHeight;  // pour que le glissement parte du haut
      cv.classList.add('cv-ouverte');
      document.body.classList.add('carte-ouverte');
      bloque = true; setTimeout(function () { bloque = false; fleche.focus({ preventScroll: true }); }, 650);
    }
    function fermer() {
      if (cv.hidden || bloque) return;
      cv.classList.remove('cv-ouverte');
      document.body.classList.remove('carte-ouverte');
      bloque = true;
      setTimeout(function () { cv.hidden = true; bloque = false; bouton.focus({ preventScroll: true }); }, 650);
    }
    bouton.addEventListener('click', function (e) {
      if (window.matchMedia('(max-width: 699px)').matches) return;  // téléphone : pas de carte
      e.preventDefault();
      ouvrir();
    });
    fleche.addEventListener('click', fermer);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fermer(); });
    // Molette : un cran vers le bas referme, comme à l'accueil ; la page dessous ne défile pas.
    cv.addEventListener('wheel', function (e) {
      e.preventDefault();
      if (e.deltaY > 2 && !e.ctrlKey) fermer();
    }, { passive: false });
    // Tablette : un glissement du doigt vers le haut referme.
    var y0 = null;
    cv.addEventListener('touchstart', function (e) { y0 = e.touches[0].clientY; }, { passive: true });
    cv.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
    cv.addEventListener('touchend', function (e) {
      if (y0 !== null && y0 - e.changedTouches[0].clientY > 40) fermer();
      y0 = null;
    });
  }
})();
