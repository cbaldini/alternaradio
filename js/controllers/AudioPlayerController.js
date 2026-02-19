/**
 * Controlador del reproductor de audio
 */

const AudioPlayerController = {
  audioElement: null,
  audioSource: null,

  /**
   * Inicializa el reproductor
   */
  init: function() {
    this.audioElement = document.getElementById('main-audio');
    this.audioSource = document.getElementById('audio-source');

    if (!this.audioElement || !this.audioSource) {
      console.error('Elementos de audio no encontrados');
      return;
    }

    if (!window.CONFIG) {
      console.error('CONFIG no está definido');
      return;
    }

    this.audioSource.src = CONFIG.streamUrl;
    this.audioElement.load();

    // Iniciar autoplay después de un delay
    setTimeout(() => this.startAutoplay(), 500);
  },

  /**
   * Inicia la reproducción automática
   */
  startAutoplay: function() {
    // Estrategia: iniciar con muted y luego quitar mute
    this.audioElement.muted = true;
    const playPromise = this.audioElement.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Autoplay iniciado correctamente (muted)');
          // Intentar quitar mute después de 1 segundo
          setTimeout(() => {
            this.audioElement.muted = false;
            console.log('Mute removido');
          }, 1000);
        })
        .catch((error) => {
          console.log('Error al iniciar autoplay:', error.message);
          // Fallback: reproducir cuando el usuario interactúe
          this.setupUserInteractionFallback();
        });
    }
  },

  /**
   * Configura fallback para interacción del usuario
   */
  setupUserInteractionFallback: function() {
    const userInteractionHandler = () => {
      this.audioElement.muted = false;
      this.audioElement.play().catch(err => console.log('Error en fallback:', err));
      document.removeEventListener('click', userInteractionHandler);
      document.removeEventListener('touchend', userInteractionHandler);
    };

    document.addEventListener('click', userInteractionHandler);
    document.addEventListener('touchend', userInteractionHandler);
  }
};

window.AudioPlayerController = AudioPlayerController;

