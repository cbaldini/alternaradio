/**
 * Modelo de Fecha
 */

const DateModel = {
  /**
   * Obtiene la fecha y hora actual formateada en español
   * @returns {Object} Objeto con información de la fecha y hora
   */
  getCurrentDate: function() {
    try {
      const now = new Date();
      console.log('DateModel.getCurrentDate() - Fecha actual:', now);

      const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

      const diaSemana = diasSemana[now.getDay()];
      const dia = now.getDate();
      const mes = meses[now.getMonth()];
      const año = now.getFullYear();

      // Obtener hora y minutos
      const horas = String(now.getHours()).padStart(2, '0');
      const minutos = String(now.getMinutes()).padStart(2, '0');

      const result = {
        diaSemana: diaSemana,
        dia: dia,
        mes: mes,
        año: año,
        hora: horas,
        minutos: minutos,
        formattedDate: diaSemana + ' ' + dia + ' de ' + mes,
        formattedTime: horas + ':' + minutos
      };

      console.log('DateModel.getCurrentDate() - Resultado:', result);
      return result;
    } catch (error) {
      console.error('DateModel.getCurrentDate() - Error:', error);
      // Retornar valores por defecto en caso de error
      return {
        diaSemana: 'Error',
        dia: 0,
        mes: 'Error',
        año: 0,
        hora: '00',
        minutos: '00',
        formattedDate: 'Error de fecha',
        formattedTime: '00:00'
      };
    }
  }
};

window.DateModel = DateModel;

