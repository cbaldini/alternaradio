// Gestor global de audio para coordinar reproducción
const AudioManager = {
  // Referencia al reproductor principal de la radio
  mainAudio: null,

  // Estado de pausa (para recordar si fue pausado por un programa)
  wasPausedByProgram: false,

  // Inicializar el gestor
  init: function() {
    this.mainAudio = document.getElementById('main-audio');
    console.log('AudioManager inicializado');

    // Bind the handler to preserve 'this' context
    const self = this;
    window.addEventListener('hashchange', function() {
      console.log('AudioManager: hashchange event detected');
      self.handleNavigation();
    });

    // Si se reproduce cualquier otro audio, pausar la radio en vivo
    document.addEventListener('play', function(e) {
      if (e.target && e.target.tagName === 'AUDIO' && e.target.id !== 'main-audio') {
        self.pauseMainAudio();
      }
    }, true);
  },

  // Pausar el audio principal (radio en vivo)
  pauseMainAudio: function() {
    if (this.mainAudio && !this.mainAudio.paused) {
      console.log('AudioManager: Pausando radio en vivo...');
      this.mainAudio.pause();
      this.wasPausedByProgram = true;
    }
  },

  // Reanudar el audio principal
  resumeMainAudio: function() {
    if (this.mainAudio && this.mainAudio.paused) {
      console.log('AudioManager: Intentando reanudar radio...');
      // Solo intentar reproducir si está permitido
      const playPromise = this.mainAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('AudioManager: Radio reanudada exitosamente');
            this.wasPausedByProgram = false;
          })
          .catch(error => {
            console.log('AudioManager: No se puede reanudar (requiere interacción del usuario):', error.name);
          });
      }
    } else {
      console.log('AudioManager: Audio no está pausado o no existe');
    }
  },

  // Manejar navegación
  handleNavigation: function() {
    const hash = window.location.hash.substring(1) || 'inicio';
    const mainRoute = hash.split('/')[0];

    console.log('AudioManager: Hash detectado:', hash, '| Ruta principal:', mainRoute);

    // Si vuelve al inicio o no está en un programa, reanudar la radio
    if (mainRoute === 'inicio' || mainRoute === '' || mainRoute === 'contacto') {
      console.log('AudioManager: Ruta permite radio, reanudando...');
      this.resumeMainAudio();
    } else {
      console.log('AudioManager: Ruta es un programa, sin acción');
    }
  }
};

