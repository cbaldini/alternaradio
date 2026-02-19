# Alterna Radio - Arquitectura MVC

## 📁 Estructura del Proyecto

```
alternaradio/
├── index.html                 # Página principal (HTML limpio, sin JS inline)
├── style.css                  # Estilos CSS
├── js/                        # JavaScript organizado en MVC
│   ├── app.js                 # Aplicación principal - Inicializa todo
│   ├── config.js              # Configuración del sitio
│   ├── audio-manager.js       # Gestor de reproducción de audio
│   ├── program-select.js      # Selectores de programas
│   │
│   ├── utils/                 # Utilidades y helpers
│   │   └── helpers.js         # Funciones auxiliares (loadJSON, encoding, etc.)
│   │
│   ├── models/                # Modelos (Datos)
│   │   ├── StreamModel.js     # Modelo de datos del stream
│   │   └── WeatherModel.js    # Modelo de datos del clima
│   │
│   ├── views/                 # Vistas JS (Actualización del DOM)
│   │   ├── StreamView.js      # Vista del stream (título, oyentes)
│   │   └── WeatherView.js     # Vista del clima
│   │
│   └── controllers/           # Controladores (Lógica de negocio)
│       ├── StreamController.js      # Control del stream
│       ├── WeatherController.js     # Control del clima
│       ├── ContentController.js     # Control de contenido dinámico (SPA)
│       ├── AudioPlayerController.js # Control del reproductor
│       └── UIController.js          # Control de la interfaz (menú, responsive)
│
├── views/                     # Templates HTML (Vistas de contenido)
│   ├── main.html              # Página principal
│   ├── contacto.html          # Página de contacto
│   ├── informe_economico_semanal/  # Programa IES
│   ├── humana_resistencia/         # Programa HR
│   ├── libertad_motosierra_licuadora/  # Programa LML
│   └── voz_en_off/                 # Programa VEO
│
├── img/                       # Imágenes
├── fonts/                     # Fuentes
└── archivo/                   # Archivos de audio
```

## 🏗️ Arquitectura MVC

### **Model (Modelo)**
Responsable de los datos y la lógica de negocio.

- **StreamModel.js**: Gestiona datos del stream de radio (título de la canción, oyentes)
- **WeatherModel.js**: Gestiona datos del clima (temperatura, ciudad)

### **View (Vista)**
Responsable de actualizar la interfaz de usuario.

- **StreamView.js**: Actualiza los elementos del DOM relacionados con el stream
- **WeatherView.js**: Actualiza los elementos del DOM relacionados con el clima

### **Controller (Controlador)**
Coordina entre el Modelo y la Vista.

- **StreamController.js**: Obtiene datos del stream y actualiza la vista
- **WeatherController.js**: Obtiene datos del clima y actualiza la vista
- **ContentController.js**: Maneja la navegación SPA (Single Page Application)
- **AudioPlayerController.js**: Controla la reproducción de audio
- **UIController.js**: Maneja la interfaz (menú hamburguesa, responsive)

### **App.js**
Punto de entrada de la aplicación. Inicializa todos los módulos en el orden correcto.

## 🔄 Flujo de Datos

```
1. Usuario interactúa → UIController
2. Controller solicita datos → Model
3. Model obtiene/procesa datos (API, JSON)
4. Model devuelve datos → Controller
5. Controller pasa datos → View
6. View actualiza el DOM
```

## 🚀 Inicialización

El archivo `app.js` inicializa todos los módulos al cargar la página:

```javascript
App.init() {
  UIController.init()            // Inicializa la interfaz
  AudioPlayerController.init()   // Inicializa el reproductor
  StreamController.init()        // Inicia actualización del stream
  WeatherController.init()       // Inicia actualización del clima
  ContentController.init()       // Inicializa el router SPA
  AudioManager.init()            // Gestor de audio
}
```

## 📦 Módulos Principales

### **Helpers (utils/helpers.js)**
Funciones auxiliares reutilizables:
- `loadJSON()`: Carga archivos JSON con encoding UTF-8
- `fixEncoding()`: Corrige problemas de codificación
- `cleanTitle()`: Limpia títulos de canciones
- `copyToClipboard()`: Copia texto al portapapeles

### **StreamController**
- Actualiza cada 3 segundos
- Obtiene datos del servidor Icecast
- Actualiza título de canción y número de oyentes

### **WeatherController**
- Actualiza cada 5 minutos
- Obtiene datos de OpenWeatherMap API
- Muestra temperatura de Miramar

### **ContentController (SPA Router)**
- Maneja navegación sin recargar la página
- Carga contenido dinámicamente según el hash (#inicio, #ies, etc.)
- Inicializa selectores de programas después de cargar contenido

### **AudioPlayerController**
- Maneja autoplay del stream
- Gestiona fallbacks para políticas de navegadores
- Coordina con AudioManager

### **UIController**
- Menú hamburguesa (móvil)
- Dropdowns
- Ajuste dinámico del padding
- Marquee de información en móvil

## 🎯 Ventajas de esta Arquitectura

✅ **Separación de responsabilidades**: Cada módulo tiene una función específica
✅ **Mantenibilidad**: Fácil encontrar y modificar código
✅ **Escalabilidad**: Agregar nuevas funcionalidades es sencillo
✅ **Reutilización**: Los modelos y vistas pueden usarse en diferentes contextos
✅ **Testeable**: Cada módulo puede testearse independientemente
✅ **Organización profesional**: Sigue estándares de la industria
✅ **HTML limpio**: Sin código JavaScript inline

## 🔧 Mantenimiento

### Agregar una nueva funcionalidad:

1. **Crear el Modelo** (`js/models/NuevoModel.js`)
2. **Crear la Vista** (`js/views/NuevaView.js`)
3. **Crear el Controlador** (`js/controllers/NuevoController.js`)
4. **Agregar scripts al index.html** en el orden correcto
5. **Inicializar en app.js** dentro de `App.init()`

### Modificar funcionalidad existente:

- **Cambiar datos**: Editar el Model correspondiente
- **Cambiar UI**: Editar la View correspondiente
- **Cambiar lógica**: Editar el Controller correspondiente

## 📝 Convenciones de Código

- Nombres en **PascalCase** para módulos principales (StreamController)
- Nombres en **camelCase** para funciones y variables
- Comentarios JSDoc para funciones públicas
- Mensajes de consola para debugging

## 🌐 Compatibilidad

- Todos los módulos son compatibles con ES5+ para soportar navegadores antiguos
- Uso de `var`, `function` y métodos compatibles
- Fallbacks para funcionalidades modernas (clipboard, etc.)

## 📚 Recursos

- **Patrón MVC**: https://en.wikipedia.org/wiki/Model–view–controller
- **SPA (Single Page Application)**: Navegación sin recargar la página
- **Modularización**: Separación de código en archivos lógicos

---

**Versión**: 2.0.0  
**Última actualización**: Febrero 2026  
**Autor**: Alterna Radio

