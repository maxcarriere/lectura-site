// Phrase d'accueil lue par la voix de Lectura, surlignée au rythme de l'audio (minutage dans data-d / data-f, en ms).
// Maxime, 09/11/2026 : la lecture part d'elle-même une fois la carte chargée ; un clic sur la phrase la rejoue.
// Les navigateurs bloquent le son tant que le visiteur n'a rien touché sur la page : dans ce cas, rien ne s'anime ;
// le bouton Play apparaît et la lecture (son et surlignage ensemble) part au clic (Maxime, 11/11).
(function () {
  var bloc = document.querySelector('.accueil-phrase');
  if (!bloc) return;
  var unites = Array.prototype.slice.call(bloc.querySelectorAll('.ap-u'));
  var fleches = Array.prototype.slice.call(document.querySelectorAll('.ap-ecouter'));
  var audio = new Audio(bloc.getAttribute('data-audio'));
  audio.preload = 'auto';
  var raf = null, horloge = null, debutMuet = 0;
  var duree = Math.max.apply(null, unites.map(function (u) { return +u.getAttribute('data-f'); })) + 300;

  function temps() { return horloge === 'audio' ? audio.currentTime * 1000 : performance.now() - debutMuet; }
  function peindre() {
    var t = temps();
    unites.forEach(function (u) {
      var d = +u.getAttribute('data-d'), f = +u.getAttribute('data-f');
      u.classList.toggle('ap-lu', t >= d && t < f);
      u.classList.toggle('ap-deja', t >= f);
    });
    var fini = horloge === 'audio' ? (audio.paused || audio.ended) : t > duree;
    if (fini) { fin(); return; }
    raf = requestAnimationFrame(peindre);
  }
  function fin() {
    cancelAnimationFrame(raf);
    horloge = null;
    unites.forEach(function (u) { u.classList.remove('ap-lu', 'ap-deja'); });
    bloc.classList.remove('ap-en-cours');
  }
  // Le son n'a pas pu partir seul (navigateur) : il part au premier geste du visiteur (clic, toucher, touche),
  // tant que la carte est à l'écran. La molette ne compte pas comme un geste pour les navigateurs.
  var gesteAttendu = false;
  function auPremierGeste() {
    if (gesteAttendu) return;
    gesteAttendu = true;
    function go(e) {
      ['pointerdown', 'keydown', 'touchend'].forEach(function (t) { document.removeEventListener(t, go, true); });
      if (e.target.closest && e.target.closest('.ap-ligne, .ap-ecouter, .ap-fleche, a')) return;  // la phrase gère son clic ; un lien quitte la page
      if (document.body.classList.contains('sur-carte') && horloge !== 'audio') lire(false);
    }
    ['pointerdown', 'keydown', 'touchend'].forEach(function (t) { document.addEventListener(t, go, true); });
  }
  function muet() {
    auPremierGeste();
    bloc.classList.add('ap-invite');
  }
  function lire(auto) {
    if (horloge === 'audio') { audio.pause(); fin(); return; }
    fin();
    audio.currentTime = 0;
    horloge = 'audio';
    bloc.classList.add('ap-en-cours');
    var p = audio.play();
    if (p && p.then) {
      p.then(function () {
        bloc.classList.remove('ap-invite');
        raf = requestAnimationFrame(peindre);
      }).catch(function () { fin(); if (auto) muet(); });
    } else {
      raf = requestAnimationFrame(peindre);
    }
  }
  fleches.forEach(function (f) { f.addEventListener('click', function () { lire(false); }); });
  bloc.querySelectorAll('.ap-ligne').forEach(function (l) { l.addEventListener('click', function () { lire(false); }); });

  // Départ automatique, une fois la carte chargée (pas si le visiteur a demandé moins d'animations).
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var fond = document.querySelector('.carte-fond');
  function depart() { setTimeout(function () { lire(true); }, 400); }
  if (!fond || fond.complete) depart(); else fond.addEventListener('load', depart, { once: true });
})();
