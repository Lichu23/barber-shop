"use client";

import { saveBooking } from "@/app/(main)/reservation/actions";
import { useReservation } from "@/context/ReservationContext";
import { FormValues } from "@/app/(main)/reservation/schema/reservationSchema";
import { calculateTotalPrice } from "@/utils/calculateTotalPrice";
import { Dispatch, SetStateAction, useState } from "react";
import { allServiceOptions, ServiceOption } from "@/constants/services";

interface BookingResponse {
  handleSaveBooking: (formData: FormValues) => Promise<BookingResult>;
  loading: boolean;
  msg: string;
  setMsg: Dispatch<SetStateAction<string>>;
}

type BookingResult = {
  success: boolean;
  message: string;
};

export type BookingDataWithTotal = FormValues & {
  totalPrice: number;
  detailedServices: ServiceOption[];
  appointmentDateTime: string;
};

export const useBookingForm = (): BookingResponse => {
  const { setSuccess, setBookingData } = useReservation();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSaveBooking(
    formData: FormValues
  ): Promise<BookingResult> {
    try {
      setLoading(true);

      const selectedServicesValues = Array.isArray(formData.services)
        ? formData.services
        : [formData.services];
      const totalPrice = calculateTotalPrice(selectedServicesValues);

      const detailedServices: ServiceOption[] = selectedServicesValues
        .map((serviceValue) =>
          allServiceOptions.find((o) => o.value === serviceValue)
        )
        .filter((service): service is ServiceOption => service !== undefined); // Filter out any undefined results

      const appointmentDateTime = new Date(
        `${formData.date}T${formData.time}`
      ).toISOString();

      const result = await saveBooking({
        ...formData,
        totalPrice,
        appointmentDateTime,
      } as BookingDataWithTotal);

      const servicesForEmail = Array.isArray(formData.services)
        ? formData.services.join(", ")
        : formData.services;

      if (result?.error) {
        setSuccess(false);
        return { success: false, message: "Error: " + result.error };
      }

      setBookingData({
        ...formData,
        totalPrice,
        detailedServices,
        appointmentDateTime,
      });
      setSuccess(true);

     return {
          success: true,
          message:
            "Reserva guardada correctamente y email enviado al correo electronico.",
        };
    } catch (error) {
      console.error(`Hubo un error: ${error}`);
      setSuccess(false);
      return {
        success: false,
        message: "Ocurrió un error al guardar la reserva o enviar el email.",
      };
    } finally {
      setLoading(false);
    }
  }
  return { handleSaveBooking, loading, msg, setMsg };
};
