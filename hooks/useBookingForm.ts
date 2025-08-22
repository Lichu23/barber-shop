"use client";

import { saveBooking } from "@/app/[tenantId]/reservation/actions";
import { FormValues } from "@/app/[tenantId]/reservation/schema/reservationSchema";
import { Dispatch, SetStateAction, useState } from "react";
import { ServiceOption } from "@/constants/services";

interface BookingResponse {
  handleSaveBooking: (
    formData: FormValues,
    params: { tenantId: string }
  ) => Promise<BookingResult>;
  loading: boolean;
  msg: string;
  setMsg: Dispatch<SetStateAction<string>>;
}

type BookingResult = {
  success?: boolean;
  message?: string;
};



export const useBookingForm = (
  allServices: ServiceOption[]
): BookingResponse => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSaveBooking(
    formData: FormValues,
    params: { tenantId: string }
  ): Promise<BookingResult> {
    try {
      setLoading(true);

      const result = await saveBooking(formData, allServices, params);
      if (result?.error) {
        return { success: false, message: "Error: " + result.error };
      }
      return {
        success: true,
        message:
          "Reserva completada, pero no se detectó redirección automática. Por favor, verifica.",
      };
    } catch (error: unknown) {
      if (error && typeof error === "object" && "message" in error) {
        const err = error as Error;
        if (err.message === "NEXT_REDIRECT") {
          throw error;
        } else {
          console.error(
            `Hubo un error real al guardar la reserva: ${err.message}`
          );
          return {
            success: false,
            message: `Ocurrió un error: ${err.message}`,
          };
        }
      } else {
        // Handle cases where the thrown error is not an Error object
        console.error(`Hubo un error desconocido: ${error}`);
        return {
          success: false,
          message: "Ocurrió un error inesperado al guardar la reserva.",
        };
      }
    } finally {
      setLoading(false);
    }
  }
  return { handleSaveBooking, loading, msg, setMsg };
};
