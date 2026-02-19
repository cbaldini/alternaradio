/**
 * Controlador del clima
 */

const WeatherController = {
  updateInterval: 300000, // 5 minutos
  timeoutId: null,

  /**
   * Inicializa el controlador
   */
  init: function() {
    WeatherView.init();
    // Esperar 1 segundo antes de la primera carga
    setTimeout(() => {
      this.loadData();
    }, 1000);
  },

  /**
   * Carga los datos del clima
   */
  loadData: function() {
    WeatherModel.fetchWeatherData()
      .then(data => {
        if (data) {
          WeatherView.render(data);
        }
        // Programar la siguiente actualización
        this.scheduleNextUpdate();
      })
      .catch(err => {
        console.error('Error al cargar clima:', err);
        // Intentar de nuevo en 1 minuto
        this.timeoutId = setTimeout(() => {
          this.loadData();
        }, 60000);
      });
  },

  /**
   * Programa la siguiente actualización
   */
  scheduleNextUpdate: function() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      this.loadData();
    }, this.updateInterval);
  }
};

window.WeatherController = WeatherController;

