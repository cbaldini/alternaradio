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
    console.log('DateController.init() - Iniciando...');

    if (!window.DateModel) {
      console.error('DateController.init() - DateModel no está definido');
      return;
    }

    if (!window.DateView) {
      console.error('DateController.init() - DateView no está definido');
      return;
    }

    DateView.init();
    this.updateDate();

    console.log('DateController.init() - Inicializado correctamente');
  },

  /**
   * Actualiza la fecha
   */
  updateDate: function() {
    console.log('DateController.updateDate() - Actualizando fecha...');

    try {
      const dateData = DateModel.getCurrentDate();
      console.log('DateController.updateDate() - Datos obtenidos:', dateData);

      DateView.render(dateData);

      // Programar la siguiente actualización
      this.scheduleNextUpdate();
    } catch (error) {
      console.error('DateController.updateDate() - Error:', error);
    }
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

