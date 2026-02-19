(function () {
  'use strict';

  function stripProgramPrefix(programKey, text) {
    if (!text) return '';

    var t = String(text).trim();

    if (programKey === 'ies') {
      // "Informe Económico Semanal 87 - ..." => "87 - ..."
      t = t.replace(/^Informe\s+Econ[oó]mico\s+Semanal\s*/i, '');
      // Si queda algo tipo "87 - ..." / "87-..." / "87" lo respetamos
      return t;
    }

    if (programKey === 'hr') {
      // "Programa 14" => "14"
      t = t.replace(/^Programa\s*/i, '');
      return t.trim();
    }

    if (programKey === 'lml') {
      // "Libertad, Motosierra y Licuadora - Programa 11" => "11"
      t = t.replace(/^Libertad,\s*Motosierra\s+y\s+Licuadora\s*-\s*/i, '');
      t = t.replace(/^Programa\s*/i, '');
      return t.trim();
    }

    if (programKey === 'veo') {
      // "Voz en Off - 10/01/2025 (Alterna Radio)" => "10/01/2025 (Alterna Radio)"
      t = t.replace(/^Voz\s+en\s+Off\s*-\s*/i, '');
      return t;
    }

    return t;
  }

  function resolveEpisodePath(programKey, value) {
    var slug = String(value || '').replace(/^#/, '').split('/')[1] || '';
    if (!slug) return '';

    var dirs = {
      ies: 'informe_economico_semanal',
      hr: 'humana_resistencia',
      lml: 'libertad_motosierra_licuadora',
      veo: 'voz_en_off'
    };

    var dirName = dirs[programKey] || '';
    if (!dirName) return '';

    var path = window.location.pathname || '';
    var inDir = path.indexOf('/' + dirName + '/') !== -1;
    var base = inDir ? '' : dirName + '/';

    return base + slug + '.html';
  }

  function buildCopyUrl(value) {
    var base = (window.CONFIG && CONFIG.domain) ? CONFIG.domain : (window.location.origin + window.location.pathname);
    return base + value;
  }

  function renderEpisode(container, programKey, value) {
    if (!value) return;

    var episodePath = resolveEpisodePath(programKey, value);
    if (!episodePath) return;

    var embed = container.querySelector('.program-episode-embed');
    if (!embed) {
      embed = document.createElement('div');
      embed.className = 'program-episode-embed';
      var img = container.querySelector('img');
      if (img && img.parentNode) {
        // Insertar ANTES de la imagen, no después
        img.parentNode.insertBefore(embed, img);
      } else {
        container.appendChild(embed);
      }
    }

    fetch(episodePath, { cache: 'no-store' })
      .then(function (res) { return res.ok ? res.text() : Promise.reject(res); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var titleEl = doc.querySelector('h2');
        var sourceEl = doc.querySelector('audio source');
        var title = titleEl ? titleEl.textContent.trim() : '';
        var src = sourceEl ? sourceEl.getAttribute('src') : '';

        if (!src) {
          embed.innerHTML = '<p>No se pudo cargar la emisión.</p>';
          return;
        }

        var url = buildCopyUrl(value);
        var textareaId = 'urlCopied-' + programKey;

        embed.innerHTML = ''
          + '<h3 class="program-episode-title">' + title + '</h3>'
          + '<audio controls autoplay>'
          + '  <source src="' + src + '" type="audio/mpeg">'
          + '</audio>'
          + '<div class="program-episode-actions">'
          + '  <button type="button" class="copy-link" data-copy-url="' + url + '" data-textarea-id="' + textareaId + '">Copiar vínculo</button>'
          + '  <a href="' + src + '"><button type="button">Descargar</button></a>'
          + '</div>'
          + '<p>Vínculo: <textarea id="' + textareaId + '" rows="1" cols="87">' + url + '</textarea></p>';

        var copyButton = embed.querySelector('.copy-link');
        if (copyButton) {
          copyButton.addEventListener('click', function () {
            var targetUrl = copyButton.getAttribute('data-copy-url') || '';
            var targetId = copyButton.getAttribute('data-textarea-id');
            var textarea = targetId ? document.getElementById(targetId) : null;

            if (textarea) {
              textarea.value = targetUrl;
              textarea.focus();
              textarea.select();
            }

            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(targetUrl).catch(function () {});
            } else if (textarea) {
              try {
                document.execCommand('copy');
              } catch (e) {}
            }
          });
        }
      })
      .catch(function () {
        embed.innerHTML = '<p>No se pudo cargar la emisión.</p>';
      });
  }

  function buildIndexUrl(value) {
    var selected = String(value || '').replace(/^#/, '');
    var path = window.location.pathname || '';

    // Si ya estamos en index, basta con el hash
    if (/\/index\.html$/i.test(path)) {
      return '#' + selected;
    }

    var rootMarker = '/alternaradio/';
    var idx = path.toLowerCase().indexOf(rootMarker);

    if (idx !== -1) {
      var rootPath = path.slice(0, idx + rootMarker.length);
      var currentDir = path.replace(/\/[^/]*$/, '/');
      var suffix = currentDir.slice(rootPath.length);
      var depth = suffix.split('/').filter(Boolean).length;
      var rel = depth > 0 ? ('../'.repeat(depth) + 'index.html') : 'index.html';
      return rel + '#' + selected;
    }

    return 'index.html#' + selected;
  }

  function buildSelectFromLinks(programKey, root) {
    var scope = root || document;
    var container = scope.querySelector('[data-program-select="' + programKey + '"]');
    if (!container) {
      console.log('No se encontró container para', programKey);
      return;
    }

    // Evitar duplicar el select si ya se inicializó
    if (container.querySelector('.program-episode-select')) {
      console.log('Select ya existe para', programKey);
      return;
    }

    var linksHost = container;
    var links = linksHost.querySelectorAll('a[href^="#' + programKey + '/"]');
    if (!links || !links.length) {
      console.log('No se encontraron links para', programKey);
      return;
    }

    console.log('Creando select para', programKey, 'con', links.length, 'links');

    var select = document.createElement('select');
    select.className = 'program-episode-select';
    select.setAttribute('aria-label', 'Elegir emisión');

    // Agregar opción placeholder
    var placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Seleccionar emisión';
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    links.forEach(function (a) {
      var option = document.createElement('option');
      option.value = a.getAttribute('href');
      option.textContent = stripProgramPrefix(programKey, a.textContent);
      select.appendChild(option);
    });

    select.addEventListener('change', function () {
      if (select.value) {
        var targetHash = String(select.value || '').replace(/^#/, '');
        // Todos los programas navegan directamente a la página de la emisión
        window.location.hash = targetHash;
      }
    });

    // Reemplazar el listado visual por el select, pero dejar los links ocultos como fallback
    linksHost.classList.add('program-select-enhanced');

    var wrapper = document.createElement('div');
    wrapper.className = 'program-select-wrapper';
    wrapper.appendChild(select);

    // Insertar antes de la imagen para mantenerlo arriba
    var img = container.querySelector('img');
    if (img) {
      img.parentNode.insertBefore(wrapper, img);
      console.log('Select insertado antes de la imagen para', programKey);
    } else {
      container.insertBefore(wrapper, container.firstChild);
      console.log('Select insertado al inicio para', programKey);
    }

    // Sincronizar con hash actual si hay uno específico
    var currentHash = (window.location.hash || '').replace(/^#/, '');
    if (currentHash && currentHash !== programKey) {
      var match = Array.prototype.find.call(select.options, function (opt) {
        return opt.value === '#' + currentHash;
      });
      if (match) {
        select.value = match.value;
      }
    }
  }

  function init(root) {
    ['ies', 'hr', 'lml', 'veo'].forEach(function (k) { buildSelectFromLinks(k, root); });
  }

  // Exponer para páginas cargadas dinámicamente
  window.ProgramSelect = {
    init: init
  };

  // Ejecutar inmediatamente
  console.log('program-select.js cargado');
  init(document);
})();
