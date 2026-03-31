(function () {
  'use strict';

  var pyodideReady = null;
  var pyodideInstance = null;

  /**
   * Charge Pyodide une seule fois (lazy, au premier clic "Essayer").
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
   * Installe un package depuis PyPI via micropip.
   */
  function installPackage(py, pkg) {
    return py.loadPackage('micropip').then(function () {
      return py.runPythonAsync('import micropip; await micropip.install("' + pkg + '")');
    });
  }

  /**
   * Lance la demo pour un bloc .pyodide-demo.
   * Attributs data- :
   *   data-package : nom pip (ex: "lectura-tokeniseur")
   *   data-code    : code Python a executer (le placeholder {INPUT} est remplace)
   */
  function runDemo(block) {
    var input = block.querySelector('.demo-input');
    var output = block.querySelector('.demo-output');
    var btn = block.querySelector('.demo-btn');
    var pkg = block.getAttribute('data-package');
    var codeTpl = block.getAttribute('data-code');
    var text = input ? input.value.trim() : '';
    if (!text) return;

    output.textContent = 'Chargement de Python...';
    btn.disabled = true;

    loadPyodide()
      .then(function (py) {
        output.textContent = 'Installation de ' + pkg + '...';
        return installPackage(py, pkg).then(function () { return py; });
      })
      .then(function (py) {
        output.textContent = 'Execution...';
        var code = codeTpl.replace(/\{INPUT\}/g, text.replace(/'/g, "\\'"));
        return py.runPythonAsync(code);
      })
      .then(function (result) {
        output.textContent = result;
        btn.disabled = false;
      })
      .catch(function (err) {
        output.textContent = 'Erreur : ' + err.message;
        btn.disabled = false;
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
      // Enter dans le champ input
      var input = block.querySelector('.demo-input');
      if (input) {
        input.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') { e.preventDefault(); runDemo(block); }
        });
      }
    });
  });
})();
