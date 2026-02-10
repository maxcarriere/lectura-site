(function() {
  var btn = document.querySelector('.menu-toggle');
  var menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    var hidden = menu.getAttribute('aria-hidden') === 'true';
    menu.setAttribute('aria-hidden', !hidden);
    btn.setAttribute('aria-expanded', hidden);
  });
  document.addEventListener('click', function(e) {
    if (menu.getAttribute('aria-hidden') === 'true') return;
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();
