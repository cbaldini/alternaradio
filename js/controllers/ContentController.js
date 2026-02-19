/**
 * Controlador de contenido dinámico (SPA Router)
 */

const ContentController = {
  contentContainer: null,

  /**
   * Inicializa el controlador
   */
  init: function() {
    this.contentContainer = document.getElementById('content');
    if (!this.contentContainer) {
      console.error('Contenedor de contenido no encontrado');
      return;
    }

    this.loadFromHash();
    window.addEventListener('hashchange', () => this.loadFromHash());
  },

  /**
   * Resuelve la ruta del hash
   */
  resolvePath: function(hash) {
    const parts = hash.split('/');
    const root = parts[0];
    const slug = parts[1];

    if (hash === '' || hash === 'inicio') return 'views/main.html';
    if (hash === 'contacto') return 'views/contacto.html';

    if (root === 'ies') {
      return slug ? `views/informe_economico_semanal/${slug}.html` : 'views/informe_economico_semanal/ies.html';
    }
    if (root === 'hr') {
      return slug ? `views/humana_resistencia/${slug}.html` : 'views/humana_resistencia/hr.html';
    }
    if (root === 'lml') {
      return slug ? `views/libertad_motosierra_licuadora/${slug}.html` : 'views/libertad_motosierra_licuadora/lml.html';
    }
    if (root === 'veo') {
      return slug ? `views/voz_en_off/${slug}.html` : 'views/voz_en_off/veo.html';
    }

    return 'views/main.html';
  },

  /**
   * Carga contenido basado en el hash
   */
  loadFromHash: function() {
    const hash = window.location.hash.substring(1);
    const path = this.resolvePath(hash);

    fetch(path, { cache: 'no-store' })
      .then(res => res.ok ? res.text() : Promise.reject(res))
      .then(html => {
        this.contentContainer.innerHTML = html;

        // Inicializar selectores de programa si existe el módulo
        if (window.ProgramSelect && typeof window.ProgramSelect.init === 'function') {
          window.ProgramSelect.init(this.contentContainer);
        }
      })
      .catch(() => {
        this.contentContainer.innerHTML = '<p>No se pudo cargar el contenido.</p>';
      });
  },

  /**
   * Navega a una ruta específica
   */
  navigate: function(route) {
    window.location.hash = '#' + route;
  }
};

window.ContentController = ContentController;

