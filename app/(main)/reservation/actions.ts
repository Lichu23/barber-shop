"use server";

import { BookingDataWithTotal } from "@/hooks/useBookingForm";
import { ActionResult, Booking } from "@/types/booking";
import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "../../../utils/supabase/serverRouteHandler";
import { v4 as uuidv4 } from 'uuid'; // Importa uuid para generar tokens

export async function saveBooking(
  bookingData: BookingDataWithTotal
): Promise<ActionResult<Booking>> {
  const {
    fullName,
    date,
    email,
    phoneNumber,
    services,
    time,
    totalPrice,
    appointmentDateTime,
  } = bookingData;

  if (
    !fullName ||
    !phoneNumber ||
    !services ||
    !date ||
    !time ||
    !email ||
    !totalPrice ||
    !appointmentDateTime
  ) {
    return {
      error:
        "Missing data to submit the form correctly or userId doesn't exist",
    };
  }
  const cancellationToken = uuidv4()
  const supabase = await createServerSupabaseClient();
  try {
    // 1. Guardar la reserva en Supabase
    const { data: insertedData, error: insertError } = await supabase
      .from("bookings")
      .insert({
        full_name: fullName,
        email: email,
        phone_number: phoneNumber,
        services: Array.isArray(services) ? services : [services],
        date: date,
        appointment_time: time,
        total_price: totalPrice,
        appointment_datetime: appointmentDateTime, 
        reminder_sent_at: null, 
        google_calendar_event_id: null,
        cancellation_token: cancellationToken
      })
      .select(); // Añade .select() para obtener los datos insertados, incluyendo el ID

    if (insertError) {
      console.error("Error al guardar la reserva en Supabase:", insertError);
      return { error: insertError.message };
    }

    const newBooking = insertedData[0];

    // 2. Crear evento en Google Calendar
    try {
    
      const start = new Date(appointmentDateTime);
      const durationMinutes = 45;
      const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

      const googleCalendarResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/google-calendar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            summary: `Cita con ${fullName} - ${bookingData.detailedServices?.map((s) => s.label).join(", ") || services}`,
            description: `Servicios: ${bookingData.detailedServices?.map((s) => s.label).join(", ") || services}\nTotal: ${totalPrice}€\nTeléfono: ${phoneNumber}\nEmail: ${email}`,
            startDateTime: start.toISOString(),
            endDateTime: end.toISOString(),
            bookingId: newBooking.id, // Pasa el ID de la reserva si lo necesitas en la API de calendario
          }),
        }
      );

      if (!googleCalendarResponse.ok) {
        const errorText = await googleCalendarResponse.text();
        console.error("Error al crear evento de Google Calendar:", errorText);

      } else {
        const googleCalendarData = await googleCalendarResponse.json();
        const googleCalendarEventId = googleCalendarData.eventId;

        // 3. Actualizar la reserva en Supabase con el ID del evento de Google Calendar
        if (googleCalendarEventId) {
          const { error: updateError } = await supabase
            .from("bookings")
            .update({ google_calendar_event_id: googleCalendarEventId })
            .eq("id", newBooking.id);

          if (updateError) {
            console.error(
              "Error al actualizar la reserva con el ID del evento de Google Calendar:",
              updateError
            );
          } else {
            console.log(
              `Reserva ${newBooking.id} actualizada con ID de evento de Google Calendar: ${googleCalendarEventId}`
            );
          }
        }
      }
    } catch (calendarError: any) {
      console.error(
        "Error inesperado durante la creación del evento de Google Calendar:",
        calendarError.message
      );
    }

    revalidatePath("/reservation"); // Revalida la ruta si es necesario
    return { data: newBooking, success: true }; // Devuelve la reserva insertada y éxito
  } catch (error: any) {
    console.error("Ocurrió un error inesperado en saveBooking:", error.message);
    return {
      error: "Ocurrió un error inesperado al guardar la reserva.",
    };
  }
}
