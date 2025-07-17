import { NextResponse } from 'next/server';
import { google, Auth } from 'googleapis'; 
import { createClient, SupabaseClient } from '@supabase/supabase-js'; 
import { calendar_v3 } from 'googleapis/build/src/apis/calendar/v3'; 

// Tipar las variables de entorno
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI; // Necesario para inicializar OAuth2Client

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey); 

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
  console.error('Error: Faltan variables de entorno para Google OAuth en el servidor. Revisar .env.local');

  throw new Error('Configuración de Google OAuth incompleta en el servidor.');
}

interface AdminSettings {
    google_refresh_token: string;
    google_calendar_id: string;
}

// Función para obtener un cliente de calendario autenticado por el refresh_token
async function getAuthenticatedCalendarClient(ownerSecretKey: string): Promise<{ calendar: calendar_v3.Calendar; calendarId: string }> {
    // Recuperar refresh_token y calendarId de Supabase para el Owner
    const { data, error } = await supabase
        .from('admin_settings')
        .select('google_refresh_token, google_calendar_id')
        .eq('owner_secret_key', ownerSecretKey)
        .single<AdminSettings>(); 

    if (error || !data || !data.google_refresh_token || !data.google_calendar_id) {
        console.error('Error al recuperar tokens de Google del Owner:', error);
        throw new Error('Configuración de Google Calendar no encontrada o incompleta para este Owner. Por favor, asegúrate de que el Owner haya conectado su calendario.');
    }

    const oauth2Client: Auth.OAuth2Client = new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
        refresh_token: data.google_refresh_token,
    });

    // Refrescar el access token si es necesario (el módulo googleapis lo maneja automáticamente con refresh_token)
    // await oauth2Client.getAccessToken(); // Esta línea no es estrictamente necesaria si usas setCredentials con refresh_token

    return {
        calendar: google.calendar({ version: 'v3', auth: oauth2Client }),
        calendarId: data.google_calendar_id,
    };
}

interface CreateEventRequest {
    ownerSecretKey: string;
    summary: string;
    description?: string; 
    startDateTime: string;
    endDateTime: string;
}

export async function POST(req: Request): Promise<NextResponse> { 
    try {
        const { ownerSecretKey, summary, description, startDateTime, endDateTime }: CreateEventRequest = await req.json();
        console.log('--- ownerSecretKey recibido en POST /api/google-calendar:', ownerSecretKey); // <-- ¡Añade esta línea!

        if (!ownerSecretKey || !summary || !startDateTime || !endDateTime) {
            return NextResponse.json({ message: 'Faltan detalles esenciales del evento o la clave del Owner.' }, { status: 400 });
        }

        const { calendar, calendarId } = await getAuthenticatedCalendarClient(ownerSecretKey);

        const event: calendar_v3.Schema$Event = {
            summary: summary,
            description: description,
            start: { dateTime: startDateTime, timeZone: 'Europe/Madrid' }, 
            end: { dateTime: endDateTime, timeZone: 'Europe/Madrid' },   // Ajusta la zona horaria según sea necesario
            reminders: { useDefault: false, overrides: [{ method: 'email', minutes: 60 }, { method: 'popup', minutes: 15 }] },
        };

        const response: { data: { id?: string | null } } = await calendar.events.insert({
            calendarId: calendarId,
            requestBody: event,
        });

        const eventId: string | null | undefined = response.data.id; 
        console.log(`Evento de Google Calendar creado: ${eventId} para Owner: ${ownerSecretKey}`);

        return NextResponse.json({ message: 'Evento creado exitosamente', eventId: eventId }, { status: 200 });

    } catch (error: any) { 
        console.error('Error al crear evento de Google Calendar:', error);
        return NextResponse.json(
            { error: 'Fallo al crear evento de Google Calendar', details: error.message || 'Error desconocido' },
            { status: (error as any).code || 500 } 
        );
    }
}

interface DeleteEventRequest {
    ownerSecretKey: string;
    eventId: string;
}

export async function DELETE(req: Request): Promise<NextResponse> {
    try {
        const { ownerSecretKey, eventId }: DeleteEventRequest = await req.json();

        if (!ownerSecretKey || !eventId) {
            return NextResponse.json({ message: 'Faltan detalles esenciales para eliminar o la clave del Owner.' }, { status: 400 });
        }

        const { calendar, calendarId } = await getAuthenticatedCalendarClient(ownerSecretKey);

        await calendar.events.delete({
            calendarId: calendarId,
            eventId: eventId,
        });

        console.log(`Evento de Google Calendar eliminado: ${eventId} para Owner: ${ownerSecretKey}`);
        return NextResponse.json({ message: 'Evento eliminado exitosamente' }, { status: 200 });

    } catch (error: any) { // Tipar el error
        console.error('Error al eliminar evento de Google Calendar:', error);
        return NextResponse.json(
            { error: 'Fallo al eliminar evento de Google Calendar', details: error.message || 'Error desconocido' },
            { status: (error as any).code || 500 }
        );
    }
}