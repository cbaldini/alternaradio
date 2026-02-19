/**
 * Modelo para manejar datos del stream de radio
 */

const StreamModel = {
  currentData: {
    title: '',
    listeners: 0
  },

  /**
   * Actualiza los datos del stream
   */
  updateData: function(data) {
    const source = Helpers.pickSource(data && data.icestats ? data.icestats.source : null);

    if (source) {
      let title = source.title || source.server_name || source.server_description || '';
      title = Helpers.fixEncoding(title);
      title = Helpers.cleanTitle(title);

      this.currentData.title = title;
      this.currentData.listeners = source.listeners != null ? source.listeners :
                                   (source.listener_peak != null ? source.listener_peak : 0);
    }

    return this.currentData;
  },

  /**
   * Obtiene los datos actuales
   */
  getData: function() {
    return this.currentData;
  }
};

window.StreamModel = StreamModel;

