import { createServerSupabaseClient } from '@/utils/supabase/serverRouteHandler';
import { NextResponse } from 'next/server';

interface Booking {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  services: string | string[];
  date: string;
  appointment_time: string;
  total_price: number;
  appointment_datetime: string;
  reminder_sent_at?: string; 
}

export async function GET(request: Request) {
  // --- SEGURIDAD: Protege esta ruta API en producción ---
  // if (request.headers.get('Authorization') !== `Bearer ${process.env.REMINDER_API_KEY}`) {
  //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  // }

  const supabase = await createServerSupabaseClient();
  let now = new Date(); 
  now.setMilliseconds(0); 

  // --- RANGO MODIFICADO: Citas entre 30 minutos y 45 minutos en el futuro ---
  const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutos en milisegundos
  thirtyMinutesFromNow.setMilliseconds(0); 
  
  const fortyFiveMinutesFromNow = new Date(now.getTime() + 45 * 60 * 1000); // 45 minutos en milisegundos
  fortyFiveMinutesFromNow.setMilliseconds(0); 

  // --- Mensajes de depuración (eliminar en producción) ---
  console.log(`[DEBUG] Current time (UTC): ${now.toISOString()}`);
  console.log(`[DEBUG] Query range: FROM ${thirtyMinutesFromNow.toISOString()} TO ${fortyFiveMinutesFromNow.toISOString()} (UTC)`); // Rango de depuración actualizado
  // --- Fin mensajes de depuración ---

  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      // Buscar citas cuya hora de inicio sea estrictamente después de 30 minutos a partir de ahora
      .gt('appointment_datetime', thirtyMinutesFromNow.toISOString()) 
      // y menor o igual que 45 minutos a partir de ahora
      .lte('appointment_datetime', fortyFiveMinutesFromNow.toISOString()) 
      // Solo citas para las que NO se ha enviado un recordatorio
      .is('reminder_sent_at', null); 

    if (error) {
      console.error('Error fetching bookings for reminders:', error);
      return NextResponse.json({ message: 'Error fetching bookings' }, { status: 500 });
    }

    if (!bookings || bookings.length === 0) {
      console.log('No bookings found for reminders in this interval.');
      return NextResponse.json({ message: 'No bookings found for reminders' }, { status: 200 });
    }

    console.log(`Found ${bookings.length} bookings for reminders.`);
    bookings.forEach(booking => {
      console.log(`[DEBUG] Booking found: ID=${booking.id}, Time=${booking.appointment_datetime}, Reminder Sent=${booking.reminder_sent_at || 'N/A'}`);
    });

    for (const booking of bookings as Booking[]) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: booking.email, 
            fullName: booking.full_name,
            service: Array.isArray(booking.services) ? booking.services.join(", ") : booking.services,
            date: booking.date,
            time: booking.appointment_time,
            totalPrice: booking.total_price,
            isReminder: true 
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed to send reminder email for booking ${booking.full_name} (${booking.id}): ${errorText}`);
        } else {
          console.log(`Reminder email sent to ${booking.email} for booking ${booking.full_name} (${booking.id})`);
          await supabase.from('bookings').update({ reminder_sent_at: new Date().toISOString() }).eq('id', booking.id);
        }
      } catch (emailError) {
        console.error(`Error sending reminder email for booking ${booking.full_name} (${booking.id}):`, emailError);
      }
    }

    return NextResponse.json({ message: 'Reminder emails processed successfully' }, { status: 200 });

  } catch (error) {
    console.error('An unexpected error occurred in send-reminders API:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
