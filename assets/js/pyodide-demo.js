(function () {
  'use strict';

  var pyodideReady = null;
  var pyodideInstance = null;
  var installedPackages = {};

  /**
   * Charge Pyodide une seule fois (lazy, au premier clic).
   */
  function loadPyodide() {
    if (pyodideReady) return pyodideReady;
    pyodideReady = new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js';
      script.onload = function () {
        window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/' })
          .then(function (py) {
            pyodideInstance = py;
            resolve(py);
          })
          .catch(reject);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
    return pyodideReady;
  }

  /**
   * Installe un package depuis PyPI via micropip (cache par nom).
   */
  function installPackage(py, pkg) {
    if (installedPackages[pkg]) return Promise.resolve();
    return py.loadPackage('micropip').then(function () {
      return py.runPythonAsync('import micropip; await micropip.install("' + pkg + '")');
    }).then(function () {
      installedPackages[pkg] = true;
    });
  }

  /**
   * Installe plusieurs packages (comma-separated).
   */
  function installPackages(py, pkgStr) {
    var packages = pkgStr.split(',').map(function (p) { return p.trim(); });
    return packages.reduce(function (promise, p) {
      return promise.then(function () { return installPackage(py, p); });
    }, Promise.resolve());
  }

  /**
   * Lance la demo pour un bloc .pyodide-demo.
   *
   * Attributs / elements :
   *   data-package  : nom(s) pip, comma-separated
   *   data-code     : code Python inline (simple demos)
   *   data-numpy    : "1" si numpy est requis (charge le built-in Pyodide)
   *   <script class="demo-setup"> : code Python async execute une seule fois (model download)
   *   <script class="demo-run">   : code Python execute a chaque clic ({INPUT} remplace)
   */
  function runDemo(block) {
    var input = block.querySelector('.demo-input');
    var output = block.querySelector('.demo-output');
    var btn = block.querySelector('.demo-btn');
    var pkg = block.getAttribute('data-package');
    var needsNumpy = block.getAttribute('data-numpy') === '1';

    // Code sources : script elements (priorite) ou data-code attribute
    var setupEl = block.querySelector('script.demo-setup');
    var runEl = block.querySelector('script.demo-run');
    var setupCode = setupEl ? setupEl.textContent.trim() : null;
    var codeTpl = runEl ? runEl.textContent.trim() : block.getAttribute('data-code');

    var text = input ? input.value.trim() : '';
    if (!text) return;

    output.textContent = 'Chargement de Python...';
    btn.disabled = true;

    loadPyodide()
      .then(function (py) {
        // Charger numpy depuis le CDN Pyodide si necessaire
        if (needsNumpy && !block._numpyLoaded) {
          output.textContent = 'Chargement de NumPy...';
          return py.loadPackage('numpy').then(function () {
            block._numpyLoaded = true;
            return py;
          });
        }
        return py;
      })
      .then(function (py) {
        output.textContent = 'Installation des packages...';
        return installPackages(py, pkg).then(function () { return py; });
      })
      .then(function (py) {
        // Setup unique : telechargement du modele, creation du moteur
        if (setupCode && !block._setupDone) {
          output.textContent = 'Telechargement du modele...';
          return py.runPythonAsync(setupCode).then(function () {
            block._setupDone = true;
            return py;
          });
        }
        return py;
      })
      .then(function (py) {
        output.textContent = 'Execution...';
        var code = codeTpl.replace(/\{INPUT\}/g, text.replace(/'/g, "\\'"));
        return py.runPythonAsync(code);
      })
      .then(function (result) {
        output.textContent = result;
        btn.disabled = false;
        // Apres premier chargement du modele, changer le libelle du bouton
        if (setupCode) btn.textContent = 'Essayer';
      })
      .catch(function (err) {
        output.textContent = 'Erreur : ' + err.message;
        btn.disabled = false;
      });
  }

  /**
   * Clavier IPA : insere un caractere dans le champ input le plus proche.
   */
  function initIpaKeyboards() {
    var keyboards = document.querySelectorAll('.ipa-keyboard');
    keyboards.forEach(function (kb) {
      var input = kb.nextElementSibling;
      // Chercher le .demo-input dans le bloc demo suivant
      if (input) input = input.querySelector('.demo-input');
      if (!input) return;

      var keys = kb.querySelectorAll('.ipa-key');
      keys.forEach(function (key) {
        key.addEventListener('click', function () {
          var ch = key.getAttribute('data-char');
          if (!ch) return;
          var start = input.selectionStart || input.value.length;
          var end = input.selectionEnd || input.value.length;
          input.value = input.value.substring(0, start) + ch + input.value.substring(end);
          input.focus();
          var newPos = start + ch.length;
          input.setSelectionRange(newPos, newPos);
        });
      });
    });
  }

  // Attache les handlers au chargement
  document.addEventListener('DOMContentLoaded', function () {
    var demos = document.querySelectorAll('.pyodide-demo');
    demos.forEach(function (block) {
      var btn = block.querySelector('.demo-btn');
      if (btn) {
        btn.addEventListener('click', function () { runDemo(block); });
      }
      var input = block.querySelector('.demo-input');
      if (input) {
        input.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') { e.preventDefault(); runDemo(block); }
        });
      }
    });

    initIpaKeyboards();
  });
})();
