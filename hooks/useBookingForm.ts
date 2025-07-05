"use client";

import { saveBooking } from "@/app/reservation/actions";
import { useReservation } from "@/app/reservation/context/ReservationContext";
import { FormValues } from "@/schema/reservationSchema";
import { useState } from "react";

export const useBookingForm = () => {
  const { setSuccess, setBookingData } = useReservation();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSaveBooking(formData: FormValues) {
    try {
      setLoading(true);
      const result = await saveBooking(formData);

      if (result?.error) {
        setMsg("Error: " + result.error);
        setSuccess(false);
        return;
      }
      setBookingData({ ...formData });
      setMsg("Usuario creado correctamente");
      setSuccess(true);
    } catch (error) {
      console.log(`Hubo un error: ${error}`);
      setSuccess(false);
    } finally {
      setLoading(false);
      setMsg("Ocurrio un error al subir los datos.")
    }
  }
  return { handleSaveBooking, loading, msg, setMsg };
};
