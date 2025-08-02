// app/api/[tenantId]/bookings/cancel/route.ts
"use server";
import { NextRequest, NextResponse } from "next/server";
import {
  getBookingByCancellationDetails,
  deleteBookingById,
} from "@/lib/services/bookingService";
import { deleteGoogleCalendarEvent } from "@/lib/services/googleCalendarService";
import { sendCancellationEmail } from "@/lib/services/emailService";
import { getAdminSettingsByTenantId } from "@/lib/services/tenantServices";

export async function POST(
  req: NextRequest,
  { params }: { params: { tenantId: string } }
): Promise<NextResponse> {
  const { tenantId } = await params;
  const { cancellationToken, bookingId } = await req.json();

  if (!tenantId) {
    return NextResponse.json(
      { error: "Tenant ID no proporcionado en la URL de la API." },
      { status: 400 }
    );
  }
  if (!cancellationToken || !bookingId) {
    return NextResponse.json(
      { error: "Faltan datos para la cancelación (token o ID de reserva)." },
      { status: 400 }
    );
  }

  try {
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
      return NextResponse.json(
        {
          error: `Configuración de Google Calendar no encontrada o incompleta para el salón (ID: ${tenantId}).`,
        },
        { status: 500 }
      );
    }
    const ownerSecretKeyForBookings = adminSettings.owner_secret_key;

    const { data: bookingToCancel, error: fetchError } =
      await getBookingByCancellationDetails(
        bookingId,
        cancellationToken,
        tenantId
      );
    if (fetchError || !bookingToCancel) {
      console.error(
        "Reserva no encontrada, token/ID inválido, o no coincide el Tenant ID."
      );
      return NextResponse.json(
        { error: "Reserva no encontrada o datos inválidos." },
        { status: 404 }
      );
    }

    if (bookingToCancel.google_calendar_event_id) {
      const { success: gcDeleteSuccess, error: gcDeleteError } =
        await deleteGoogleCalendarEvent({
          ownerSecretKey: ownerSecretKeyForBookings,
          eventId: bookingToCancel.google_calendar_event_id,
        });
      if (gcDeleteError) {
        console.error(
          "Error al eliminar evento de Google Calendar:",
          gcDeleteError
        );
      } else if (!gcDeleteSuccess) {
        console.warn(
          "No se pudo eliminar evento de Google Calendar por razón desconocida."
        );
      }
    }

    const { success: dbDeleteSuccess, error: dbDeleteError } =
      await deleteBookingById(bookingToCancel.id, tenantId);
    if (dbDeleteError) {
      console.error("Error al eliminar la reserva de Supabase:", dbDeleteError);
      return NextResponse.json({ error: dbDeleteError }, { status: 500 });
    } else if (!dbDeleteSuccess) {
      console.warn(
        "No se pudo eliminar reserva de Supabase por razón desconocida."
      );
    }

    const servicesForEmail: string = Array.isArray(bookingToCancel.services)
      ? bookingToCancel.services.join(", ")
      : bookingToCancel.services;

    const { success: emailSuccess, error: emailError } =
      await sendCancellationEmail({
        to: bookingToCancel.email,
        fullName: bookingToCancel.full_name,
        date: bookingToCancel.date,
        time: bookingToCancel.appointment_datetime,
        service: servicesForEmail,
        bookingId: bookingToCancel.id,
        cancellationToken: bookingToCancel.cancellation_token,
        totalPrice: bookingToCancel.total_price,
        tenantId: tenantId,
      });
    if (emailError) {
      console.error(
        "Error al enviar email de confirmación de cancelación:",
        emailError
      );
    } else if (!emailSuccess) {
      console.warn(
        "No se pudo enviar email de confirmación de cancelación por razón desconocida."
      );
    }

    return NextResponse.json(
      { message: "¡Reserva cancelada exitosamente!" },
      { status: 200 }
    ); 
  } catch (error: any) {
    console.error("Error inesperado en la API de cancelación:", error.message);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
