import { Booking } from "@/types/booking";
import { createServerSupabaseClient } from "@/utils/supabase/serverRouteHandler";

interface BookingToInsert {
  full_name: string;
  email: string;
  phone_number: string;
  services: string[];
  date: string;
  appointment_time: string;
  total_price: number;
  appointment_datetime: string;
  cancellation_token: string;
  google_calendar_event_id?: string | null; // Puede ser nulo al inicio
  reminder_sent_at?: string | null; // Puede ser nulo al inicio
  tenant_id: string;
}

export async function getBookingById(bookingId: string, tenantId: string): Promise<{ data?: Booking; error?: string }> {
    const supabase = await createServerSupabaseClient();
    await supabase.rpc('set_current_tenant_id', { tenant_id_value: tenantId });

    try {
        const { data: booking, error: fetchError } = await supabase
            .from('bookings')
            .select('*')
            .eq('id', bookingId)
            .eq('tenant_id', tenantId)
            .single<Booking>();

        if (fetchError || !booking) {
            return { error: fetchError?.message || `Reserva con ID ${bookingId} para tenant ${tenantId} no encontrada.` };
        }
        return { data: booking };
    } catch (err: any) {
        return { error: err.message || 'Error inesperado al buscar reserva por ID.' };
    }
}


export async function insertBooking(
  bookingData: BookingToInsert
): Promise<{ data?: Booking; error?: string }> {
  const supabase = await createServerSupabaseClient();

  try {
    const { data: insertedData, error: insertError } = await supabase
      .from("bookings")
      .insert(bookingData)
      .select();

    if (insertError) {
      console.error("Error al guardar la reserva en Supabase:", insertError);
      return { error: insertError.message };
    }
    return { data: insertedData[0] as Booking };
  } catch (err: any) {
    console.error("Excepción al insertar reserva en Supabase:", err);
    return { error: "Error inesperado al insertar reserva." };
  }
}

export async function updateBookingGoogleCalendarEventId(
  bookingId: string,
  googleCalendarEventId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerSupabaseClient();
  try {
    const { error: updateError } = await supabase
      .from("bookings")
      .update({ google_calendar_event_id: googleCalendarEventId })
      .eq("id", bookingId);

    if (updateError) {
      console.error(
        "Error al actualizar google_calendar_event_id en Supabase:",
        updateError
      );
      return { success: false, error: updateError.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error("Excepción al actualizar google_calendar_event_id:", err);
    return {
      success: false,
      error:
        "Error inesperado al actualizar el ID del evento de Google Calendar.",
    };
  }
}

export async function getBookingByCancellationDetails(
  bookingId: string,
  cancellationToken: string,
  tenantId: string
): Promise<{ data?: Booking; error?: string }> {
  const supabase = await createServerSupabaseClient();
  await supabase.rpc("set_current_tenant_id", { tenant_id_value: tenantId });

  try {
    const { data: booking, error: fetchError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .eq("cancellation_token", cancellationToken)
      .eq("tenant_id", tenantId)
      .single();

    if (fetchError || !booking) {
      return {
        error: fetchError?.message || "Reserva no encontrada o token inválido.",
      };
    }
    return { data: booking as Booking }; // <-- Asegúrate de que Booking tenga services: string[]
  } catch (err: any) {
    return {
      error: err.message || "Error al buscar reserva por token de cancelación.",
    };
  }
}

export async function deleteBookingById(
  bookingId: string | undefined,
  tenantId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerSupabaseClient();
      await supabase.rpc('set_current_tenant_id', { tenant_id_value: tenantId }); // <-- ¡AÑADIDO!

  try {
    const { error: deleteError } = await supabase
      .from("bookings")
      .delete()
      .eq("id", bookingId)
      .eq("tenant_id", tenantId);

    if (deleteError) {
      return { success: false, error: deleteError.message };
    }
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Error inesperado al eliminar la reserva.",
    };
  }
}

export async function getBookingsForReminders(
  tenantId: string,
  fromDateTime: string,
  toDateTime: string
): Promise<{ data?: Booking[]; error?: string }> {
  const supabase = await createServerSupabaseClient();
  await supabase.rpc("set_tenant_id", { tenant_id_value: tenantId });

  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("tenant_id", tenantId)
      .gt("appointment_datetime", fromDateTime)
      .lte("appointment_datetime", toDateTime)
      .is("reminder_sent_at", null);

    if (error) {
      return { error: error.message };
    }
    return { data: data as Booking[] };
  } catch (err: any) {
    return {
      error: err.message || "Error al buscar reservas para recordatorios.",
    };
  }
}

export async function getBookingsByTenantId(tenantId: string): Promise<{ data?: Booking[]; error?: string }> {
  const supabase = await createServerSupabaseClient();
  await supabase.rpc('set_current_tenant_id', { tenant_id_value: tenantId });

  try {
    const { data: bookings, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('tenant_id', tenantId);

    if (fetchError) {
      return { error: fetchError.message };
    }
    return { data: bookings ?? [] };
  } catch (err: any) {
    return { error: err.message || 'Error inesperado al buscar reservas por tenant.' };
  }
}