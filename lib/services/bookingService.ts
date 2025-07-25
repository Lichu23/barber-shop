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
}

export async function insertBooking(bookingData: BookingToInsert): Promise<{ data?: Booking; error?: string }> {
  const supabase = await createServerSupabaseClient();

  try {
    // 1. Guardar la reserva en Supabase
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

export async function updateBookingGoogleCalendarEventId(bookingId: string, googleCalendarEventId: string): Promise<{ success: boolean; error?: string }> {
    const supabase = await createServerSupabaseClient();
    try {
        const { error: updateError } = await supabase
            .from("bookings")
            .update({ google_calendar_event_id: googleCalendarEventId })
            .eq("id", bookingId);

        if (updateError) {
            console.error("Error al actualizar google_calendar_event_id en Supabase:", updateError);
            return { success: false, error: updateError.message };
        }
        return { success: true };
    } catch (err: any) {
        console.error("Excepción al actualizar google_calendar_event_id:", err);
        return { success: false, error: "Error inesperado al actualizar el ID del evento de Google Calendar." };
    }
}
