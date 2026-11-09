// Phrase d'accueil lue par la voix de Lectura, surlignée au rythme de l'audio (minutage dans data-d / data-f, en ms).
// La lecture part au clic (les navigateurs bloquent le son automatique) : bouton « Écouter » ou clic sur la phrase.
(function () {
  var bloc = document.querySelector('.accueil-phrase');
  if (!bloc) return;
  var unites = Array.prototype.slice.call(bloc.querySelectorAll('.ap-u'));
  var bouton = bloc.querySelector('.ap-ecouter');
  var audio = new Audio(bloc.getAttribute('data-audio'));
  audio.preload = 'none';
  var raf = null;

  function peindre() {
    var t = audio.currentTime * 1000;
    unites.forEach(function (u) {
      var d = +u.getAttribute('data-d'), f = +u.getAttribute('data-f');
      u.classList.toggle('ap-lu', t >= d && t < f);
      u.classList.toggle('ap-deja', t >= f);
    });
    if (!audio.paused && !audio.ended) raf = requestAnimationFrame(peindre);
  }
  function fin() {
    cancelAnimationFrame(raf);
    unites.forEach(function (u) { u.classList.remove('ap-lu', 'ap-deja'); });
    bloc.classList.remove('ap-en-cours');
  }
  function lire() {
    if (!audio.paused) { audio.pause(); fin(); return; }
    audio.currentTime = 0;
    bloc.classList.add('ap-en-cours');
    var p = audio.play();
    if (p && p.catch) p.catch(fin);
    raf = requestAnimationFrame(peindre);
  }
  audio.addEventListener('ended', fin);
  bouton.addEventListener('click', lire);
  bloc.querySelectorAll('.ap-ligne').forEach(function (l) { l.addEventListener('click', lire); });
})();
