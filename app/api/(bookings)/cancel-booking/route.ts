// app/api/cancel-booking/route.ts
import { createServerSupabaseClient } from "@/utils/supabase/serverRouteHandler";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cancellationToken = searchParams.get("token");
  const bookingId = searchParams.get("id");

  if (!cancellationToken || !bookingId) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head><title>Error de Cancelación</title></head>
      <body>
        <h1>Error: Token de cancelación no proporcionado.</h1>
        <p>El enlace de cancelación no es válido.</p>
      </body>
      </html>
    `,
      { status: 400, headers: { "Content-Type": "text/html" } }
    );
  }

  const supabase = await createServerSupabaseClient();
  
  const ownerSecretKeyForBookings = process.env.OWNER_SECRET_KEY_FOR_BOOKINGS;

  if (!ownerSecretKeyForBookings) {
        console.error("Error: OWNER_SECRET_KEY_FOR_BOOKINGS no está configurada en el servidor para la cancelación.");
        return new NextResponse(`
            <!DOCTYPE html>
            <html>
            <head><title>Error Interno</title></head>
            <body>
                <h1>Error Interno del Servidor.</h1>
                <p>La configuración del sistema de calendario es incompleta. Por favor, contacta con el soporte.</p>
            </body>
            </html>
        `, { status: 500, headers: { 'Content-Type': 'text/html' } });
    }

  try {
    // 1. Buscar la reserva por el token de cancelación
    const { data: booking, error: fetchError } = await supabase
      .from("bookings")
      .select("*")
      .eq("cancellation_token", cancellationToken)
      .eq('id', bookingId)
      .single();

    if (fetchError || !booking) {
      console.error(
        "Error fetching booking by cancellation token:",
        fetchError
      );
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
        <head><title>Error de Cancelación</title></head>
        <body>
          <h1>Error: Cita no encontrada o token inválido.</h1>
          <p>La cita asociada a este enlace no existe o ya ha sido cancelada.</p>
        </body>
        </html>
      `,
        { status: 404, headers: { "Content-Type": "text/html" } }
      );
    }

    // 2. Eliminar el evento de Google Calendar si existe
    if (booking.google_calendar_event_id) {
      try {
        const googleCalendarResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/google-calendar`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ eventId: booking.google_calendar_event_id, ownerSecretKey: ownerSecretKeyForBookings}),
          }
        );

        if (!googleCalendarResponse.ok) {
          const errorText = await googleCalendarResponse.text();
          console.error(
            `Error al eliminar evento de Google Calendar ${booking.google_calendar_event_id}:`,
            errorText
          );
        } else {
          console.log(
            `Evento de Google Calendar ${booking.google_calendar_event_id} eliminado.`
          );
        }
      } catch (calendarError: any) {
        console.error(
          "Error inesperado al eliminar evento de Google Calendar:",
          calendarError.message
        );
      }
    }

    // 3. Eliminar la reserva de Supabase
    const { error: deleteError } = await supabase
      .from("bookings")
      .delete()
      .eq("id", booking.id);

    if (deleteError) {
      console.error("Error al eliminar la reserva de Supabase:", deleteError);
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
        <head><title>Error de Cancelación</title></head>
        <body>
          <h1>Error al cancelar la cita.</h1>
          <p>Hubo un problema al eliminar tu cita de nuestro sistema. Por favor, inténtalo de nuevo o contáctanos.</p>
        </body>
        </html>
      `,
        { status: 500, headers: { "Content-Type": "text/html" } }
      );
    }

    console.log(`Reserva ${booking.id} cancelada exitosamente.`);

    // 4. Enviar email de confirmación de cancelación al cliente
    try {
      const emailResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: booking.email,
            fullName: booking.full_name,
            date: booking.date,
            time: booking.appointment_time,
            service: Array.isArray(booking.services)
              ? booking.services.join(", ")
              : booking.services,
            isCancellationConfirmation: true,
          }),
        }
      );

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error(
          "Error al enviar email de confirmación de cancelación:",
          errorText
        );
      } else {
        console.log("Email de confirmación de cancelación enviado.");
      }
    } catch (emailError: any) {
      console.error(
        "Error inesperado durante el envío del email de confirmación de cancelación:",
        emailError.message
      );
    }

    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Cita Cancelada</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
          h1 { color: #28a745; } /* Verde para éxito */
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <h1>¡Cita Cancelada Exitosamente!</h1>
        <p>Tu cita para el ${booking.date} a las ${booking.appointment_time} ha sido cancelada.</p>
        <p>Hemos enviado un email de confirmación de cancelación a ${booking.email}.</p>
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}" class="button">Volver a la página principal</a>
      </body>
      </html>
    `,
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  } catch (error: any) {
    console.error("Error inesperado en la API de cancelación:", error);
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head><title>Error Interno</title></head>
      <body>
        <h1>Error Interno del Servidor.</h1>
        <p>Ha ocurrido un problema inesperado. Por favor, inténtalo de nuevo más tarde.</p>
      </body>
      </html>
    `,
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}
