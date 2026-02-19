/**
 * Controlador de Fecha
 */

const DateController = {
  updateInterval: 60000, // 1 minuto
  timeoutId: null,

  /**
   * Inicializa el controlador
   */
  init: function() {
    DateView.init();
    this.updateDate();
  },

  /**
   * Actualiza la fecha
   */
  updateDate: function() {
    const dateData = DateModel.getCurrentDate();
    DateView.render(dateData);

    // Programar la siguiente actualización
    this.scheduleNextUpdate();
  },

  /**
   * Programa la siguiente actualización
   */
  scheduleNextUpdate: function() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      this.updateDate();
    }, this.updateInterval);
  }
};

window.DateController = DateController;

