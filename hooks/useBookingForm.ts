"use client";

import { saveBooking } from "@/app/reservation/actions";
import { useReservation } from "@/app/reservation/context/ReservationContext";
import { formatDate } from "@/app/utils/formatDate";
import { revalidatePath } from "next/cache";
import { useState } from "react";

type UseBookingFormProps = {
  fullName: string;
  phoneNumber: number;
  email: string;
  selectService: string;
  bookingDate: Date | null;
  appointmentTime: string;
};

export const useBookingForm = ({
  fullName,
  phoneNumber,
  email,
  selectService,
  bookingDate,
  appointmentTime,
}: UseBookingFormProps) => {
  const { setSuccess, setBookingData } = useReservation();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSaveBooking(formData: FormData) {
    try {
      setLoading(true);
      const result = await saveBooking(formData);

      if (result?.error) {
        setMsg("Error: " + result.error);
        setSuccess(false);
        return;
      }
      setBookingData({
        fullName,
        phoneNumber,
        email,
        service: selectService,
        date: formatDate(bookingDate),
        time: appointmentTime,
      });
      setMsg("Usuario creado correctamente")
      setSuccess(true)
    } catch (error) {
      console.log(`Hubo un error: ${error}`);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }
  return { handleSaveBooking, loading, msg, setMsg };
};
