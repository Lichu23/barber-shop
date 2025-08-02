
export function formatTimeTo24H(timeStr: string | undefined | null): string {
  if (!timeStr) return "";

  try {
    let dateInputStr = timeStr;

    if (!timeStr.includes('T') && timeStr.match(/^\d{2}:\d{2}(:\d{2})?$/)) {
      dateInputStr = `2000-01-01T${timeStr}Z`; // Ejemplo: "2000-01-01T17:00:00Z"
    }

    const dateObj = new Date(dateInputStr);

    if (isNaN(dateObj.getTime())) {
      console.error(`[formatTime] ERROR: Cadena de tiempo inválida detectada (después de ajuste): "${timeStr}" -> Intentando "${dateInputStr}"`);
      return "Hora inválida";
    }



    const formatter = new Intl.DateTimeFormat('es-ES', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false, // <-- ¡Esto asegura el formato de 24 horas (ej. 17:00)!
      hourCycle: 'h23', // <-- ¡Esto asegura el ciclo de 0 a 23 horas!
      timeZone: 'Europe/Madrid', // Zona horaria explícita para la visualización (CEST/CET)
      // timeZoneName: 'short', // Puedes quitar esta línea si no quieres "CEST" o "CET" en el resultado final
    });

    const formattedTime = formatter.format(dateObj);
    return formattedTime;

  } catch (e: any) {
    console.error(`[formatTime] EXCEPCIÓN al formatear la hora '${timeStr}':`, e.message);
    return "Hora inválida";
  }
}