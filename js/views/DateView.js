/**
 * Vista de Fecha
 */

const DateView = {
  elements: {
    date: null,
    dateDesktop: null,
    time: null,
    timeDesktop: null
  },

  /**
   * Inicializa la vista
   */
  init: function() {
    this.elements.date = document.getElementById('id-date');
    this.elements.dateDesktop = document.getElementById('id-date-desktop');
    this.elements.time = document.getElementById('id-time');
    this.elements.timeDesktop = document.getElementById('id-time-desktop');

    console.log('DateView.init() - Elementos encontrados:', {
      date: !!this.elements.date,
      dateDesktop: !!this.elements.dateDesktop,
      time: !!this.elements.time,
      timeDesktop: !!this.elements.timeDesktop
    });
  },

  /**
   * Renderiza la fecha
   * @param {Object} dateData - Datos de la fecha
   */
  render: function(dateData) {
    if (!dateData) {
      console.warn('DateView.render() - No hay datos de fecha');
      return;
    }

    // Renderizar fecha
    if (this.elements.date) {
      this.elements.date.textContent = dateData.formattedDate;
    }

    if (this.elements.dateDesktop) {
      this.elements.dateDesktop.textContent = dateData.formattedDate;
    }

    // Renderizar hora
    if (this.elements.time) {
      this.elements.time.textContent = dateData.formattedTime;
    }

    if (this.elements.timeDesktop) {
      this.elements.timeDesktop.textContent = dateData.formattedTime;
    }

    console.log('DateView.render() - Fecha actualizada:', dateData.formattedDate, dateData.formattedTime);
  }
};

window.DateView = DateView;

