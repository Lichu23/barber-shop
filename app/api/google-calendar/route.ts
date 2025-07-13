// app/api/google-calendar/route.ts
import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Asegúrate de que estas variables de entorno estén configuradas
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'); 
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_CALENDAR_ID) {
  console.error('Error: Faltan variables de entorno para la API de Google Calendar.');

}

// Configura la autenticación JWT para la cuenta de servicio
const auth = new google.auth.JWT({ // Ahora es un objeto
  email: GOOGLE_CLIENT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

// Crea una instancia del cliente de Google Calendar
const calendar = google.calendar({ version: 'v3', auth });


export async function POST(req: Request) {
  try {
    const { 
      summary, 
      description, 
      startDateTime, 
      endDateTime, 
      // attendees, // Eliminamos esta variable de la desestructuración
      bookingId // Opcional: Para asociar el evento con la reserva en caso de necesitar eliminarlo
    } = await req.json();

    // Validar datos de entrada básicos
    if (!summary || !startDateTime || !endDateTime) {
      return NextResponse.json({ message: 'Faltan detalles esenciales del evento.' }, { status: 400 });
    }

    // El formato de fecha y hora para Google Calendar debe ser RFC3339 (ISO string con zona horaria)
    const event = {
      summary: summary,
      description: description,
      start: {
        dateTime: startDateTime,
        timeZone: 'Europe/Madrid', // ¡IMPORTANTE! Ajusta a la zona horaria de tus citas
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Europe/Madrid', // Misma zona horaria que el inicio
      },
      // attendees: attendees || [], // CAMBIO AQUÍ: Comentamos o eliminamos la línea de attendees
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 60 }, // Recordatorio por email 60 minutos antes
          { method: 'popup', minutes: 15 }, // Recordatorio pop-up 15 minutos antes
        ],
      },
      // Puedes añadir más propiedades aquí, como 'location', 'colorId', etc.
    };

    // Inserta el evento en el calendario de Google
    const response = await calendar.events.insert({
      calendarId: GOOGLE_CALENDAR_ID,
      requestBody: event,
    });

    const eventId = response.data.id;
    console.log(`Evento de Google Calendar creado: ${eventId}`);

    return NextResponse.json({ 
      message: 'Evento creado exitosamente', 
      eventId: eventId // Devuelve el ID del evento de Google Calendar
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error al crear evento de Google Calendar:', error); 
    return NextResponse.json(
      { error: 'Fallo al crear evento de Google Calendar', details: error.message || 'Error desconocido' },
      { status: error.code || 500 } 
    );
  }
}

// Opcional: Ruta para eliminar un evento (necesitarías el eventId para esto)
export async function DELETE(req: Request) {
  try {
    const { eventId } = await req.json();

    if (!eventId) {
      return NextResponse.json({ message: 'Falta eventId para eliminar.' }, { status: 400 });
    }

    await calendar.events.delete({
      calendarId: GOOGLE_CALENDAR_ID,
      eventId: eventId,
    });

    console.log(`Evento de Google Calendar eliminado: ${eventId}`);
    return NextResponse.json({ message: 'Evento eliminado exitosamente' }, { status: 200 });

  } catch (error: any) {
    console.error('Error al eliminar evento de Google Calendar:', error); 
    return NextResponse.json(
      { error: 'Fallo al eliminar evento de Google Calendar', details: error.message || 'Error desconocido' },
      { status: error.code || 500 }
    );
  }
}
