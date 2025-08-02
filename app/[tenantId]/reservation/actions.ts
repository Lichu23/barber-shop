"use server";

import { ServiceOption } from "@/constants/services";
import {
  insertBooking,
  updateBookingGoogleCalendarEventId,
} from "@/lib/services/bookingService";
import { sendConfirmationEmail } from "@/lib/services/emailService";
import { createGoogleCalendarEvent } from "@/lib/services/googleCalendarService";
import { getAdminSettingsByTenantId } from "@/lib/services/tenantServices";
import { ActionResult, Booking } from "@/types/booking";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { FormValues } from "./schema/reservationSchema";

export async function saveBooking(
  formData: FormValues,
  allServices: ServiceOption[],
  params: { tenantId: string }
): Promise<ActionResult<Booking>> {
  const { tenantId } = params;

  if (!tenantId) {
    console.error(
      "Error: tenantId no proporcionado en los parámetros de la ruta para saveBooking."
    );
    return { error: "ID de cliente no especificado para la reserva." };
  }

  const { fullName, date, email, phoneNumber, services, time } = formData;

  if (!fullName || !phoneNumber || !services || !date || !time || !email) {
    return {
      error:
        "Missing data to submit the form correctly or userId doesn't exist",
    };
  }

  const selectedServiceValues = Array.isArray(services) ? services : [services];
  const totalPrice = selectedServiceValues.reduce((sum, serviceValue) => {
    const option = allServices.find((option) => option.value === serviceValue);
    return sum + (option?.price ?? 0);
  }, 0);

  const detailedServices: ServiceOption[] = selectedServiceValues
    .map((serviceValue) =>
      allServices.find((option) => option.value === serviceValue)
    )
    .filter((service): service is ServiceOption => service !== undefined);

  const clientTimeZone = "Europe/Madrid"; // Define la zona horaria del cliente/salón
  const tempDateObj = new Date(`${date}T${time}`);
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute, second] = time.split(":").map(Number);
  const initialUTCDateTime = new Date(`${date}T${time}`);

  const appointmentDateObj = new Date(
    `${date}T${time}` // La fecha y hora como se ingresó (ej., "2025-08-01T19:00:00")
  );
  const madridDate = new Date(appointmentDateObj.toLocaleString('en-US', { timeZone: clientTimeZone }));
  const madridOffsetMinutes = (madridDate.getTime() - appointmentDateObj.getTime()) / 60000;
  const localSelectedDate = new Date(year, month - 1, day, hour, minute, second || 0); // Esto crea fecha en TZ local del servidor

    const yearVal = parseInt(date.substring(0,4), 10);
  const monthVal = parseInt(date.substring(5,7), 10) - 1; // Month is 0-indexed
  const dayVal = parseInt(date.substring(8,10), 10);
  const hourVal = parseInt(time.substring(0,2), 10);
  const minuteVal = parseInt(time.substring(3,5), 10);
  const secondVal = parseInt(time.substring(6,8) || '0', 10);

    const dt = new Date(Date.UTC(yearVal, monthVal, dayVal, hourVal, minuteVal, secondVal));
  const dateParts = date.split('-').map(Number);
  const timeParts = time.split(':').map(Number);

    const selectedLocalTimeOnServer = new Date(
      dateParts[0], dateParts[1] - 1, dateParts[2],
      timeParts[0], timeParts[1], timeParts[2] || 0
  );

    const currentOffsetMinutes = selectedLocalTimeOnServer.getTimezoneOffset(); // Server's offset from UTC

  const targetDate = new Date(
      selectedLocalTimeOnServer.getFullYear(),
      selectedLocalTimeOnServer.getMonth(),
      selectedLocalTimeOnServer.getDate(),
      selectedLocalTimeOnServer.getHours(),
      selectedLocalTimeOnServer.getMinutes(),
      selectedLocalTimeOnServer.getSeconds()
  );

    const appointmentDateTime = `${date}T${time}:00.000`; // YYYY-MM-DDTHH:mm:ss.SSS

      function getOffsetForTimeZone(date: string, time: string, timeZone: string): string {
      const dt = new Date(`${date}T${time}`);
      const offset = new Intl.DateTimeFormat('en-US', {
          timeZone,
          timeZoneName: 'longOffset', // Example: GMT+02:00
      }).format(dt);

      // Extract +HH:MM or -HH:MM
      const match = offset.match(/(GMT[+-]\d{2}:\d{2})/);
      if (match && match[1]) {
        return match[1].replace('GMT', ''); // Returns +02:00
      }
      return '+00:00'; // Default to UTC
  }

  const offsetString = getOffsetForTimeZone(date, time, 'Europe/Madrid');
  const finalAppointmentDateTimeUTC = new Date(`${appointmentDateTime}${offsetString}`).toISOString();

  const cancellationToken = uuidv4();
  // 2. Obtener la configuración del Owner para este Tenant
  const { data: adminSettings, error: adminSettingsError } =
    await getAdminSettingsByTenantId(tenantId);

  if (
    adminSettingsError ||
    !adminSettings ||
    !adminSettings.owner_secret_key ||
    !adminSettings.google_refresh_token ||
    !adminSettings.google_calendar_id
  ) {
    console.error(
      `Error: Configuración de Owner incompleta para tenantId ${tenantId}.`,
      adminSettingsError
    );
    return {
      error: `Configuración de Google Calendar no encontrada o incompleta para el salón (ID: ${tenantId}).`,
    };
  }

  const ownerSecretKeyForBookings = adminSettings.owner_secret_key; // Se obtiene dinámicamente

  const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  if (!NEXT_PUBLIC_BASE_URL) {
    console.error("Error: NEXT_PUBLIC_BASE_URL no está configurada.");
    return { error: "URL base de la aplicación no configurada correctamente." };
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
      appointment_datetime: finalAppointmentDateTimeUTC,
      reminder_sent_at: null,
      cancellation_token: cancellationToken,
      google_calendar_event_id: null,
      tenant_id: tenantId,
    });

    if (insertError || !newBooking) {
      console.error("Error al guardar la reserva en Supabase:", insertError);
      return { error: insertError || "Error inesperado al guardar reserva." };
    }

    // 2. Crear evento en Google Calendar
    let googleCalendarEventId: string | null = null;

    try {
      const start = new Date(finalAppointmentDateTimeUTC);
      const durationMinutes = 45;
      const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
      const servicesSummary = detailedServices.map((s) => s.name).join(", ");
      const servicesDescription = servicesSummary;

      const { eventId, error: googleCalendarError } =
        await createGoogleCalendarEvent({
          summary: `Cita con ${fullName}`,
          description: `Servicios: ${servicesDescription}\nTotal: ${totalPrice}€\nTeléfono: ${phoneNumber}\nEmail: ${email}\n\nToken de Cancelación: ${cancellationToken}\nID de Reserva: ${newBooking.id}\nTenant ID: ${tenantId}`,
          startDateTime: start.toISOString(),
          endDateTime: end.toISOString(),
          ownerSecretKey: ownerSecretKeyForBookings,
        });

      if (googleCalendarError) {
        console.error(
          "Error al crear evento de Google Calendar:",
          googleCalendarError
        );
        return {
          success: false,
          error: `Reserva creada en DB, pero falló creación evento en GC: ${googleCalendarError}`,
        };
      }

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
      const servicesForEmail: string =
        detailedServices?.map((s) => s.name).join(", ") ||
        (Array.isArray(services) ? services.join(", ") : services);

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
          tenantId: tenantId,
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
    revalidatePath(`/${tenantId}/reservation`);
    redirect(`/${tenantId}/success?bookingId=${newBooking.id}`);
  } catch (error: any) {
    if (
      error &&
      typeof error === "object" &&
      error.message === "NEXT_REDIRECT"
    ) {
      throw error; // Re-lanza la excepción NEXT_REDIRECT para que Next.js la gestione
    }

    console.error("Ocurrió un error inesperado en saveBooking:", error.message);
    return {
      error: "Ocurrió un error inesperado al guardar la reserva.",
    };
  }
}
