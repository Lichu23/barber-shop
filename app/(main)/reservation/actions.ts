"use server";

import { BookingDataWithTotal } from "@/hooks/useBookingForm";
import { ActionResult, Booking } from "@/types/booking";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid"; // Importa uuid para generar tokens
import {
  insertBooking,
  updateBookingGoogleCalendarEventId,
} from "@/lib/services/bookingService";
import { createGoogleCalendarEvent } from "@/lib/services/googleCalendarService";
import { error } from "console";
import { sendConfirmationEmail } from "@/lib/services/emailService";

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
  const cancellationToken = uuidv4();
  const ownerSecretKeyForBookings = process.env.OWNER_SECRET_KEY_FOR_BOOKINGS;
  const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // Asegúrate de tener esta variable de entorno

  if (!ownerSecretKeyForBookings) {
    console.error(
      "Error: OWNER_SECRET_KEY_FOR_BOOKINGS no está configurada en el servidor."
    );
    return {
      error: "Configuración del propietario para el calendario no encontrada.",
    };
  }

  if (!NEXT_PUBLIC_BASE_URL) {
    console.error(
      "Error: NEXT_PUBLIC_BASE_URL no está configurada en el servidor."
    );
    return {
      error: "URL base de la aplicación no configurada correctamente.",
    };
  }

  try {
    // 1. Guardar la reserva en Supabase
    const { data: newBooking, error: insertError } = await insertBooking({
      full_name: fullName,
      email: email, //"lisandroxarenax@gmail.com"
      phone_number: phoneNumber,
      services: Array.isArray(services) ? services : [services],
      date: date,
      appointment_time: time,
      total_price: totalPrice,
      appointment_datetime: appointmentDateTime,
      reminder_sent_at: null,
      cancellation_token: cancellationToken,
      google_calendar_event_id: null,
    });

    if (insertError || !newBooking) {
      console.error("Error al guardar la reserva en Supabase:", insertError);
      return { error: insertError || "Error inesperado al guardar reserva." };
    }

    // 2. Crear evento en Google Calendar
    let googleCalendarEventId: string | null = null;

    try {
      const start = new Date(appointmentDateTime);
      const durationMinutes = 45;
      const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

      const { eventId, error: googleCalendarError } =
        await createGoogleCalendarEvent({
          summary: `Cita con ${fullName}`,
          description: `Servicios: ${bookingData.detailedServices?.map((s) => s.label).join(", ") || services}\nTotal: ${totalPrice}€\nTeléfono: ${phoneNumber}\nEmail: ${email}\n\nToken de Cancelación: https://www.lichu.org/api/cancel-booking?token=${cancellationToken}`,
          startDateTime: start.toISOString(),
          endDateTime: end.toISOString(),
          ownerSecretKey: ownerSecretKeyForBookings,
        });

      if (!eventId || googleCalendarError) {
        console.error(
          "Error al crear evento de Google Calendar:",
          googleCalendarError
        );
      } else {
        googleCalendarEventId = eventId || null;
        // 5. Actualizar la reserva en Supabase con el ID del evento de Google Calendar
        if (googleCalendarEventId && newBooking.id) {
          const { success: updateSuccess, error: updateError } =
            await updateBookingGoogleCalendarEventId(
              newBooking.id,
              googleCalendarEventId
            );
          if (updateError) {
            console.error(
              "Error al actualizar reserva con ID de evento GC:",
              updateError
            );
          } else {
            console.log(
              `Reserva ${newBooking.id} actualizada con ID de evento GC: ${googleCalendarEventId}`
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

    try {
    const servicesForEmail: string = bookingData.detailedServices?.map((s) => s.label).join(", ") || (Array.isArray(services) ? services.join(", ") : services);

      const { success: emailSuccess, error: emailError } =
        await sendConfirmationEmail({
          to: email,
          subject: "¡Reserva confirmada en Chiky!",
          fullName: fullName,
          service: servicesForEmail,
          date: date,
          time: time,
          totalPrice: totalPrice,
          bookingId: newBooking.id,
          cancellationToken: cancellationToken,
        });
      if (emailError) {
        console.error("Error al enviar email de confirmación:", emailError);
      } else {
        console.log("Email de confirmación enviado correctamente.");
      }
    } catch (emailError: any) {
      console.error(
        "Error inesperado durante el envío del email de confirmación:",
        emailError.message
      );
    }

    revalidatePath("/reservation"); // Revalida la ruta si es necesario
    return {
      data: { ...newBooking, google_calendar_event_id: googleCalendarEventId },
      success: true,
    };
  } catch (error: any) {
    console.error("Ocurrió un error inesperado en saveBooking:", error.message);
    return {
      error: "Ocurrió un error inesperado al guardar la reserva.",
    };
  }
}
