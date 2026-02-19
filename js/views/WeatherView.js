/**
 * Vista para actualizar la UI del clima
 */

const WeatherView = {
  elements: {
    weatherMobile: null,
    weatherDesktop: null
  },

  /**
   * Inicializa los elementos del DOM
   */
  init: function() {
    this.elements.weatherMobile = document.getElementById('id-weather');
    this.elements.weatherDesktop = document.getElementById('id-weather-desktop');
  },

  /**
   * Actualiza la vista con los nuevos datos del clima
   */
  render: function(data) {
    if (!data || data.temperature === null) return;

    const weatherHTML = data.temperature + '&deg;C, ' + data.city;

    if (this.elements.weatherMobile) {
      this.elements.weatherMobile.innerHTML = weatherHTML;
    }
    if (this.elements.weatherDesktop) {
      this.elements.weatherDesktop.innerHTML = weatherHTML;
    }
  }
};

window.WeatherView = WeatherView;

