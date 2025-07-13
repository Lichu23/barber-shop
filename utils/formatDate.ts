export const formatDate = (dateString:string | undefined) => {
    if (!dateString) return ''; // Maneja si la fecha es nula o indefinida
if (!dateString === undefined) return ''
    // 1. Crea un objeto Date. Asegúrate de añadir 'T00:00:00' para manejar correctamente las zonas horarias.
    const date = new Date(`${dateString}T00:00:00`);

     const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    return new Intl.DateTimeFormat('es-ES', options).format(date);
  };