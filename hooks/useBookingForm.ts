"use client";

import { saveBooking } from "@/app/reservation/actions";
import { useReservation } from "@/app/reservation/context/ReservationContext";
import { FormValues } from "@/schema/reservationSchema";
import { Dispatch, SetStateAction, useState } from "react";

interface BookinResponse {
  handleSaveBooking: (formData: FormValues) => Promise<BookingResult>, 
  loading: boolean, 
  msg: string, 
  setMsg: Dispatch<SetStateAction<string>>
}

type BookingResult = {
  success: boolean;
  message: string;
};

export const useBookingForm = (): BookinResponse => {
  const { setSuccess, setBookingData } = useReservation();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSaveBooking(formData: FormValues):Promise<BookingResult> {
    try {
      setLoading(true);
      const result = await saveBooking(formData);

      if (result?.error) {
        setSuccess(false);
        return { success: false, message: "Error: " + result.error };

      }
      setBookingData({ ...formData });
      setSuccess(true);

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "lisandroxarenax@gmail.com",
          subject: "¡Reserva confirmada en Chiky!",
          fullName: formData.fullName,
          service: formData.service,
          date: formData.date,
          time: formData.time,
        }),
      });

      if (!response.ok) {
        setMsg("¡Ocurrio un error al guardar la reserva y enviar el email de confirmacion!");
        console.log(result.error)
        return { success: false, message: "Error: " + result.error }
      } else {
        setMsg(
          "Reserva guardada correctamente y email enviado al correo electronico."
        );
        return { success: true, message: "Reserva guardada correctamente y email enviado al correo electronico." }
      }
    } catch (error) {
      console.log(`Hubo un error: ${error}`);
      setSuccess(false);
      return { success: false, message: "Ocurrió un error al guardar la reserva o enviar el email." }
    } finally {
      setLoading(false);
    }
  }
  return { handleSaveBooking, loading, msg, setMsg };
};
