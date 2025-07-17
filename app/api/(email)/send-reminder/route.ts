import { createServerSupabaseClient } from "@/utils/supabase/serverRouteHandler";
import { NextResponse } from "next/server";

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
  const expectedApiKey = process.env.REMINDER_API_KEY; // Captura el valor esperado

  if (
    request.headers.get("Authorization") !==
    `Bearer ${expectedApiKey}`
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createServerSupabaseClient();
  // let now = new Date();
  // now.setMilliseconds(0);

  // //Citas entre 30 minutos y 45 minutos.
  // const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutos en milisegundos

  // const fortyFiveMinutesFromNow = new Date(now.getTime() + 45 * 60 * 1000); // 45 minutos en milisegundos


  // --- LÓGICA ESPECIAL PARA EL VÍDEO ---
  // Busca citas programadas para cualquier hora del DÍA DE HOY.

  const now = new Date();
  
  // Inicio del día de hoy (00:00:00)
  const today_start = new Date(now);
  today_start.setHours(0, 0, 0, 0);

  // Final del día de hoy (23:59:59)
  const today_end = new Date(now);
  today_end.setHours(23, 59, 59, 999);
  
  // --- FIN DE LA LÓGICA PARA EL VÍDEO ---

  try {
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("*")
      // Buscar citas  después de 30 minutos a partir de ahora
      // .gt('appointment_datetime', thirtyMinutesFromNow.toISOString())
      .gt("appointment_datetime", today_start.toISOString())

      // menor o igual que 45 minutos a partir de ahora
      // .lte('appointment_datetime', fortyFiveMinutesFromNow.toISOString())
      .lte("appointment_datetime", today_end.toISOString())

      // Solo citas para las que NO se ha enviado un recordatorio
      .is("reminder_sent_at", null);

    if (error) {
      console.error("Error fetching bookings for reminders:", error);
      return NextResponse.json(
        { message: "Error fetching bookings" },
        { status: 500 }
      );
    }

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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: booking.email,
              fullName: booking.full_name,
              service: Array.isArray(booking.services)
                ? booking.services.join(", ")
                : booking.services,
              date: booking.date,
              time: booking.appointment_time,
              totalPrice: booking.total_price,
              isReminder: true,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `Failed to send reminder email for booking ${booking.full_name} (${booking.id}): ${errorText}`
          );
        } else {
          console.log(
            `Reminder email sent to ${booking.email} for booking ${booking.full_name} (${booking.id})`
          );
          await supabase
            .from("bookings")
            .update({ reminder_sent_at: new Date().toISOString() })
            .eq("id", booking.id);
        }
      } catch (emailError) {
        console.error(
          `Error sending reminder email for booking ${booking.full_name} (${booking.id}):`,
          emailError
        );
      }
    }

    return NextResponse.json(
      { message: "Reminder emails processed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("An unexpected error occurred in send-reminders API:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
