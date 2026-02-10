// Script pour empêcher Dark Reader et autres extensions de modifier les couleurs
(function() {
  'use strict';
  
  // Fonction pour forcer les couleurs du texte dans le parchemin
  function forceTextColors() {
    var parchmentContent = document.querySelector('.parchment-content');
    var parchmentMiddle = document.querySelector('.parchment-middle');
    
    if (parchmentContent) {
      // Force la couleur sur tous les éléments de texte
      var allElements = parchmentContent.querySelectorAll('*');
      allElements.forEach(function(el) {
        var computedStyle = window.getComputedStyle(el);
        var currentColor = computedStyle.color;
        
        // Si la couleur n'est pas proche de #0d0d0d (noir), la forcer
        if (currentColor && !currentColor.match(/rgb\(13,\s*13,\s*13\)|rgba\(13,\s*13,\s*13/)) {
          el.style.setProperty('color', '#0d0d0d', 'important');
          el.style.setProperty('-webkit-text-fill-color', '#0d0d0d', 'important');
        }
      });
      
      // Force aussi sur l'élément parent
      parchmentContent.style.setProperty('color', '#0d0d0d', 'important');
      parchmentContent.style.setProperty('-webkit-text-fill-color', '#0d0d0d', 'important');
    }
    
    if (parchmentMiddle) {
      parchmentMiddle.style.setProperty('color', '#0d0d0d', 'important');
      parchmentMiddle.style.setProperty('-webkit-text-fill-color', '#0d0d0d', 'important');
    }
    
    // Force les couleurs sur les liens
    var links = document.querySelectorAll('.parchment-content a, .arborescence-textes a, .navigation-dossier a, .project-list a, .product-list a');
    links.forEach(function(link) {
      link.style.setProperty('color', '#0d0d0d', 'important');
      link.style.setProperty('-webkit-text-fill-color', '#0d0d0d', 'important');
    });
  }
  
  // Exécute immédiatement
  forceTextColors();
  
  // Surveille les changements du DOM (au cas où Dark Reader injecterait des styles)
  var observer = new MutationObserver(function(mutations) {
    var shouldForce = false;
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        shouldForce = true;
      }
      if (mutation.addedNodes.length > 0) {
        shouldForce = true;
      }
    });
    if (shouldForce) {
      setTimeout(forceTextColors, 100);
    }
  });
  
  // Observe les changements sur le body
  if (document.body) {
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
      childList: true,
      subtree: true
    });
  }
  
  // Réexécute après le chargement complet
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceTextColors);
  }
  
  // Réexécute après le chargement de toutes les ressources
  window.addEventListener('load', function() {
    setTimeout(forceTextColors, 500);
  });
  
  // Réexécute périodiquement pour contrer les modifications persistantes
  setInterval(forceTextColors, 2000);
})();
