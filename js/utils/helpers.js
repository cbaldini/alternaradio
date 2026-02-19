/**
 * Utilidades y funciones helper
 */

const Helpers = {
  /**
   * Carga un archivo JSON
   */
  loadJSON: function(path, success) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer';
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const decoder = new TextDecoder('utf-8');
        const text = decoder.decode(xhr.response);
        success(JSON.parse(text));
      }
    };
    xhr.open('GET', path, true);
    xhr.send();
  },

  /**
   * Selecciona la fuente correcta del stream
   */
  pickSource: function(source) {
    if (Array.isArray(source)) {
      for (let i = 0; i < source.length; i += 1) {
        const item = source[i];
        if (item && (item.mount === '/play' || (item.listenurl && item.listenurl.indexOf('/play') !== -1))) {
          return item;
        }
      }
      return source[0] || null;
    }
    return source || null;
  },

  /**
   * Corrige la codificación de texto
   */
  fixEncoding: function(text) {
    if (!text) return text;
    try {
      return decodeURIComponent(escape(text));
    } catch (e) {
      return text;
    }
  },

  /**
   * Limpia el título de la canción
   */
  cleanTitle: function(title) {
    if (!title) return title;
    // Quitar 1-3 números al inicio y también punto/guion inicial si existe
    return title.replace(/^\s*(?:[.\-–]\s*)?\d{1,3}\s*(?:[.\-–]\s*)?/, '');
  },

  /**
   * Copia texto al portapapeles
   */
  copyToClipboard: function(text, textareaId) {
    const textarea = textareaId ? document.getElementById(textareaId) : null;

    if (textarea) {
      textarea.value = text;
      textarea.focus();
      textarea.select();
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    } else if (textarea) {
      try {
        document.execCommand('copy');
      } catch (e) {}
    }
  }
};

// Exportar para uso global
window.Helpers = Helpers;

