"use server";

import { ActionResult, Booking } from "@/types/booking";
import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "../utils/supabase/serverRouteHandler";

export async function saveBooking(
  formData: FormData
): Promise<ActionResult<Booking>> {
  const fullName = formData.get("fullName") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const service = formData.get("service") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const email = formData.get("email") as string;

  if (!fullName || !phoneNumber || !service || !date || !time || !email) {
    return {
      error:
        "Missing data to submit the form correctly or userId doesn't exist",
    };
  }
  const supabase = await createServerSupabaseClient();

  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          full_name: fullName,
          phone_number: phoneNumber,
          service,
          date,
          appointment_time: time,
          email,
        },
      ])
      .select();

    if (error) {
      // Supabase devuelve un objeto `error` en caso de fallo de la operación DB.
      console.error("Error inserting new member:", error);
      return { error: error.message };
    }

    if (!data) {
      // Si la inserción fue exitosa pero no se devolvieron datos (ej. si no usas .select())
      // Aunque con .select().single() esto no debería ocurrir en inserciones exitosas.
      return { error: "No data returned after successful insertion." };
    }
    revalidatePath("/reservation");
    return { success: true };
  } catch (error) {
    console.error("An unexpected error occurred in addMemberAction:", error);
    return {
      error: "An unexpected server error occurred. Please try again.",
    };
  }
}
