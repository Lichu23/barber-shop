"use server";

import { ServiceOption } from "@/constants/services";
import {
  insertBooking,
  updateBookingGoogleCalendarEventId,
} from "@/lib/services/bookingService";
import { sendConfirmationEmail } from "@/lib/services/emailService";
import { createGoogleCalendarEvent } from "@/lib/services/googleCalendarService";
import {
  getAdminSettingsByTenantId,
  getTenantProfileById,
} from "@/lib/services/tenantServices";
import { ActionResult, Booking } from "@/types/booking";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { FormValues } from "./schema/reservationSchema";
import { fromZonedTime } from "date-fns-tz";
import { headers } from "next/headers";
const PLATFORM_DOMAINS = new Set(["lichu.org", "www.lichu.org", "localhost"]);

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

  const timeZone = "Europe/Madrid";
  const localDateTime = fromZonedTime(`${date}T${time}`, timeZone); // <-- SOLO CAMBIA ESTO
  const appointmentDateTime = localDateTime.toISOString();

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
      appointment_datetime: appointmentDateTime,
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
      const start = new Date(appointmentDateTime);
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
    const { data: tenantData, error: tenantDataError } =
      await getTenantProfileById(tenantId);

    if (tenantDataError || !tenantData) {
      console.error(
        `Error: Falta de tenantId ${tenantId} u ocurrio un error inesperado al obtener la data.`,
        tenantDataError
      );
      return {
        error: `ocurrio un error inesperado al obtener la data. (ID: ${tenantId}).`,
      };
    }

    try {
      const servicesForEmail: string =
        detailedServices?.map((s) => s.name).join(", ") ||
        (Array.isArray(services) ? services.join(", ") : services);

      const { success: emailSuccess, error: emailError } =
        await sendConfirmationEmail({
          to: email,
          subject: `¡Reserva confirmada en ${tenantData?.salon_name}!`,
          fullName: fullName,
          service: servicesForEmail,
          date: date,
          time: time,
          totalPrice: totalPrice,
          bookingId: newBooking.id,
          cancellationToken: cancellationToken,
          tenantId: tenantId,
          appointmentDateTime: appointmentDateTime,
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

    const requestHeaders = await headers();
    const host = requestHeaders.get("host");
    const normalizedHost = host?.split(":")[0].replace(/^www\./, "") || "";
    const isCustomDomain = !PLATFORM_DOMAINS.has(normalizedHost);

    const basePath = isCustomDomain ? "" : `/${tenantId}`;
    const successUrl = `${basePath}/success?bookingId=${newBooking.id}`;

    revalidatePath(`/${tenantId}/reservation`);
    redirect(successUrl);
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
