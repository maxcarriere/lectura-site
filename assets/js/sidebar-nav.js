(function () {
  'use strict';

  /* ------------------------------------------------------------------
   * 1. Mesure header / footer → CSS custom properties
   * ----------------------------------------------------------------*/
  function measureLayout() {
    var header = document.querySelector('.site-header');
    var footer = document.querySelector('.site-footer');
    if (header) {
      document.documentElement.style.setProperty(
        '--header-height', header.offsetHeight + 'px'
      );
    }
    if (footer) {
      document.documentElement.style.setProperty(
        '--footer-height', footer.offsetHeight + 'px'
      );
    }
  }

  /* ------------------------------------------------------------------
   * 2. Accordeon generique (sidebar + mobile)
   * ----------------------------------------------------------------*/
  function setupAccordion(container, toggleSelector, childrenSelector) {
    if (!container) return;
    container.addEventListener('click', function (e) {
      var btn = e.target.closest(toggleSelector);
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();

      var header = btn.parentElement;
      var children = header.nextElementSibling;
      if (!children || !children.classList.contains(childrenSelector.replace('.', ''))) return;

      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isOpen);
      children.setAttribute('aria-hidden', isOpen);

      // Toggle parent group class
      var group = header.parentElement;
      if (group) {
        group.classList.toggle('nav-group--open', !isOpen);
        group.classList.toggle('mobile-nav-group--open', !isOpen);
      }
    });
  }

  /* ------------------------------------------------------------------
   * 3. Hamburger mobile
   * ----------------------------------------------------------------*/
  function setupHamburger() {
    var btn = document.querySelector('.menu-toggle');
    var menu = document.getElementById('mobile-nav');
    if (!btn || !menu) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var hidden = menu.getAttribute('aria-hidden') === 'true';
      menu.setAttribute('aria-hidden', !hidden);
      btn.setAttribute('aria-expanded', hidden);
    });

    document.addEventListener('click', function (e) {
      if (menu.getAttribute('aria-hidden') === 'true') return;
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------------------------------
   * 4. Init
   * ----------------------------------------------------------------*/
  function init() {
    measureLayout();

    // Sidebar accordion (desktop)
    setupAccordion(
      document.querySelector('.site-sidebar'),
      '.nav-toggle',
      '.nav-children'
    );

    // Mobile accordion
    setupAccordion(
      document.getElementById('mobile-nav'),
      '.mobile-nav-toggle',
      '.mobile-nav-children'
    );

    // Hamburger
    setupHamburger();
  }

  // Mesure au chargement et au resize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('load', measureLayout);
  window.addEventListener('resize', measureLayout);
})();
