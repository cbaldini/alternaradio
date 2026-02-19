/**
 * Aplicación principal - Inicializa todos los módulos
 */

const App = {
  /**
   * Inicializa la aplicación
   */
  init: function() {
    console.log('Iniciando Alterna Radio App...');

    // Inicializar todos los controladores en orden
    UIController.init();
    AudioPlayerController.init();
    StreamController.init();
    WeatherController.init();
    ContentController.init();

    // Inicializar AudioManager (gestor de audio)
    if (window.AudioManager) {
      AudioManager.init();
    }

    // Configurar marquee móvil
    this.setupMobileMarquee();

    console.log('Alterna Radio App iniciada correctamente');
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

