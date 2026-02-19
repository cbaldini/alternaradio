/**
 * Controlador del stream de radio
 */

const StreamController = {
  updateInterval: 3000, // 3 segundos
  intervalId: null,

  /**
   * Inicializa el controlador
   */
  init: function() {
    StreamView.init();
    this.loadData();
    this.startAutoUpdate();
  },

  /**
   * Carga los datos del stream
   */
  loadData: function() {
    if (!window.CONFIG) {
      console.error('CONFIG no está definido');
      return;
    }

    Helpers.loadJSON(CONFIG.statusUrl, (data) => {
      const streamData = StreamModel.updateData(data);
      StreamView.render(streamData);
    });
  },

  /**
   * Inicia la actualización automática
   */
  startAutoUpdate: function() {
    this.intervalId = setInterval(() => {
      this.loadData();
    }, this.updateInterval);
  },

  /**
   * Detiene la actualización automática
   */
  stopAutoUpdate: function() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
};

window.StreamController = StreamController;

