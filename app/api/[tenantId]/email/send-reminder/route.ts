import { getBookingsForReminders } from "@/lib/services/bookingService";
import { sendReminderEmail } from "@/lib/services/emailService";
import { createServerSupabaseClient } from "@/utils/supabase/serverRouteHandler";
import { NextResponse } from "next/server";

interface Booking {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  services: string | string[];
  date: string;
  total_price: number;
  appointment_datetime: string;
  reminder_sent_at?: string;
}

export async function GET(request: Request, { params }: { params: { tenantId: string } }) {
  const {tenantId} = params
  const expectedApiKey = process.env.REMINDER_API_KEY; // Captura el valor esperado
  
  if (!tenantId) { return NextResponse.json({ message: 'Tenant ID no proporcionado para recordatorios.' }, { status: 400 }); }

  if (
    request.headers.get("Authorization") !==
    `Bearer ${expectedApiKey}`
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createServerSupabaseClient();
  let now = new Date();
  now.setMilliseconds(0);

  //Citas entre 30 minutos y 45 minutos.
  const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutos en milisegundos

  const fortyFiveMinutesFromNow = new Date(now.getTime() + 45 * 60 * 1000); // 45 minutos en milisegundos



  try {
    const { data: bookings, error } = await getBookingsForReminders(tenantId, thirtyMinutesFromNow.toISOString(), fortyFiveMinutesFromNow.toISOString()); // <-- Pasa el rango
        if (error) { console.error('Error al obtener bookings para recordatorios:', error); return NextResponse.json({ message: 'Error fetching bookings' }, { status: 500 }); }
        if (!bookings || bookings.length === 0) { console.log('No bookings found for reminders in this interval for tenant:', tenantId); return NextResponse.json({ message: 'No bookings found for reminders' }, { status: 200 }); }

        if (!bookings || bookings.length === 0) {
          console.log("No bookings found for reminders in this interval.");
          return NextResponse.json(
            { message: "No bookings found for reminders" },
            { status: 200 }
          );
        }

    console.log(`Found ${bookings.length} bookings for reminders.`);

   for (const booking of bookings as Booking[]) {
    try {
      const servicesForEmail = Array.isArray(booking.services) ? booking.services.join(", ") : booking.services;
      await sendReminderEmail({
        to: booking.email,
        fullName: booking.full_name,
        service: servicesForEmail,
        date: booking.date,
        time: booking.appointment_datetime, 
        totalPrice: booking.total_price, 
        bookingId: booking.id, 
        isReminder: true, 
        tenantId:tenantId,
        appointmentDateTime:booking.appointment_datetime
      });

      await supabase.from('bookings').update({ reminder_sent_at: new Date().toISOString() }).eq('id', booking.id);
    } catch (emailError: any) { console.error(`Error sending reminder email for booking ${booking.full_name} (${booking.id}):`, emailError); }
  }
  return NextResponse.json({ message: 'Reminder emails processed successfully' }, { status: 200 });

} catch (error: any) {
  console.error("An unexpected error occurred in send-reminders API:", error);
  return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
}
}
