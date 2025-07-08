"use server";

import { BookingDataWithTotal } from "@/hooks/useBookingForm";
import { ActionResult, Booking } from "@/types/booking";
import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "../../../utils/supabase/serverRouteHandler";

export async function saveBooking(
  data: BookingDataWithTotal
): Promise<ActionResult<Booking>> {
  const {fullName,date,email,phoneNumber,services,time, totalPrice} = data

  if (!fullName || !phoneNumber || !services || !date || !time || !email || !totalPrice) {
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
          services,
          date,
          appointment_time: time,
          email,
          total_price: totalPrice
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting new member:", error);
      return { error: error.message };
    }

    if (!data) {
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
