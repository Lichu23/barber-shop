"use server"
import { ActionResult } from "@/types/booking";
import { createServerSupabaseClient } from "@/utils/supabase/serverRouteHandler";
import { revalidatePath } from "next/cache";

export async function cancelBooking(
  email: string,
  date: string,
  time: string
): Promise<ActionResult<void>> {
  if (!email || !date || !time) {
    return {
      error:
        "Missing required information (email, date, or time) to cancel the booking.",
    };
  }

  const supabase = await createServerSupabaseClient();

   try {
    const { error, count } = await supabase
      .from("bookings")
      .delete()
      .eq("email", email)
      .eq("date", date)
      .eq("appointment_time", time);

    if (error) {
      console.error("Error al cancelar la reserva:", error);
      return { error: error.message };
    }

    if (count === 0) {
      return { error: "Reserva no encontrada o ya cancelada." };
    }

    revalidatePath("/reservation");
    revalidatePath("/success");

    return { success: true };
  } catch (error) {
    console.error("Ocurrió un error inesperado en cancelBooking:", error);
    return {
      error: "Ocurrió un error inesperado en el servidor. Por favor, inténtalo de nuevo.",
    };
  }
}

