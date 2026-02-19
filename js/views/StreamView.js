/**
 * Vista para actualizar la UI del stream
 */

const StreamView = {
  elements: {
    title: null,
    titleMobile: null,
    listeners: null,
    listenersMobile: null
  },

  /**
   * Inicializa los elementos del DOM
   */
  init: function() {
    this.elements.title = document.getElementById('title');
    this.elements.titleMobile = document.getElementById('title-mobile');
    this.elements.listeners = document.getElementById('listeners');
    this.elements.listenersMobile = document.getElementById('listeners-mobile');

    console.log('StreamView.init() - Elementos encontrados:', {
      title: !!this.elements.title,
      titleMobile: !!this.elements.titleMobile,
      listeners: !!this.elements.listeners,
      listenersMobile: !!this.elements.listenersMobile
    });
  },

  /**
   * Actualiza la vista con los nuevos datos
   */
  render: function(data) {
    console.log('StreamView.render() - Datos recibidos:', data);

    if (this.elements.title) {
      this.elements.title.textContent = data.title;
    }
    if (this.elements.titleMobile) {
      this.elements.titleMobile.textContent = data.title;
    }
    if (this.elements.listeners) {
      this.elements.listeners.textContent = data.listeners;
    }
    if (this.elements.listenersMobile) {
      this.elements.listenersMobile.textContent = data.listeners;
    }

    // Actualizar título de la ventana
    if (data.title) {
      document.title = data.title + ' | Alterna Radio FM 88.1 MHZ';
    }

    // Recalcular marquee en móvil si existe
    if (window.__updateMobileInfoMarquee) {
      setTimeout(window.__updateMobileInfoMarquee, 0);
    }
  }
};

window.StreamView = StreamView;

