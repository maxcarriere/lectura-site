// Mots clés de l'en-tête : un seul visible à la fois, il s'allume puis s'éteint (Maxime, 09/11/2026).
(function () {
  var mots = document.querySelectorAll('.header-mots .mot-cle');
  if (mots.length < 2) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var i = 0, pause = false;
  var zone = document.querySelector('.header-mots');
  zone.addEventListener('mouseenter', function () { pause = true; });
  zone.addEventListener('mouseleave', function () { pause = false; });
  zone.addEventListener('focusin', function () { pause = true; });
  zone.addEventListener('focusout', function () { pause = false; });
  setInterval(function () {
    if (pause || document.hidden) return;
    var avant = mots[i];
    i = (i + 1) % mots.length;
    avant.classList.remove('mot-cle--actif');
    avant.setAttribute('tabindex', '-1'); avant.setAttribute('aria-hidden', 'true');
    mots[i].classList.add('mot-cle--actif');
    mots[i].removeAttribute('tabindex'); mots[i].removeAttribute('aria-hidden');
  }, 3200);
})();
