/**
 * Aplicación principal - Inicializa todos los módulos
 */

const App = {
  maxRetries: 50,
  retryCount: 0,

  /**
   * Verifica que todas las dependencias estén cargadas
   */
  checkDependencies: function() {
    const required = [
      'DateModel', 'DateView', 'DateController',
      'WeatherModel', 'WeatherView', 'WeatherController',
      'StreamModel', 'StreamView', 'StreamController',
      'ContentController', 'AudioPlayerController', 'UIController'
    ];

    const missing = required.filter(dep => !window[dep]);

    if (missing.length > 0) {
      console.warn('Dependencias faltantes (intento ' + (this.retryCount + 1) + '):', missing);
      return false;
    }

    console.log('Todas las dependencias cargadas correctamente');
    return true;
  },

  /**
   * Inicializa la aplicación
   */
  init: function() {
    console.log('Iniciando Alterna Radio App...');

    // Verificar dependencias
    if (!this.checkDependencies()) {
      this.retryCount++;
      if (this.retryCount < this.maxRetries) {
        console.log('Reintentando en 100ms...');
        setTimeout(() => this.init(), 100);
        return;
      } else {
        console.error('No se pudieron cargar todas las dependencias después de ' + this.maxRetries + ' intentos');
        return;
      }
    }

    // Inicializar todos los controladores en orden
    try {
      UIController.init();
      AudioPlayerController.init();
      StreamController.init();
      WeatherController.init();
      DateController.init();
      ContentController.init();

      // Inicializar AudioManager (gestor de audio)
      if (window.AudioManager) {
        AudioManager.init();
      }

      // Configurar marquee móvil
      this.setupMobileMarquee();

      console.log('Alterna Radio App iniciada correctamente');
    } catch (error) {
      console.error('Error al inicializar la aplicación:', error);
    }
  },

  /**
   * Configura el marquee para móvil
   */
  setupMobileMarquee: function() {
    // Recalcular en resize
    window.addEventListener('resize', () => {
      setTimeout(() => UIController.updateMobileInfoMarquee(), 50);
    });

    // Exponer globalmente para compatibilidad
    window.__updateMobileInfoMarquee = UIController.updateMobileInfoMarquee.bind(UIController);

    // Primera ejecución
    setTimeout(() => UIController.updateMobileInfoMarquee(), 700);
  },

  /**
   * Función helper para copiar URL (compatibilidad con código existente)
   */
  copyURL: function() {
    const hash = window.location.hash || '';
    const base = (window.CONFIG && CONFIG.domain) ?
                  CONFIG.domain :
                  (window.location.origin + window.location.pathname.replace(/\/[^/]*$/, ''));
    const url = base + hash;

    Helpers.copyToClipboard(url, 'urlCopied');
  }
};

// Exponer funciones globales para compatibilidad
window.Copy = App.copyURL.bind(App);
window.navigate = ContentController.navigate.bind(ContentController);

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

window.App = App;

