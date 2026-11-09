// Phrase d'accueil lue par la voix de Lectura, surlignée au rythme de l'audio (minutage dans data-d / data-f, en ms).
// Maxime, 09/11/2026 : la lecture part d'elle-même une fois la carte chargée ; une flèche de chaque côté la rejoue.
// Les navigateurs bloquent souvent le son sans geste du visiteur : dans ce cas, le surlignage passe seul, en
// silence, et les flèches s'animent pour inviter à écouter.
(function () {
  var bloc = document.querySelector('.accueil-phrase');
  if (!bloc) return;
  var unites = Array.prototype.slice.call(bloc.querySelectorAll('.ap-u'));
  var fleches = Array.prototype.slice.call(document.querySelectorAll('.ap-fleche, .ap-ecouter'));
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
  function muet() {
    horloge = 'muet';
    debutMuet = performance.now();
    bloc.classList.add('ap-en-cours');
    fleches.forEach(function (f) { f.classList.add('ap-invite'); });
    raf = requestAnimationFrame(peindre);
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
        fleches.forEach(function (f) { f.classList.remove('ap-invite'); });
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
