"use client";
import { BookingDataWithTotal } from "@/hooks/useBookingForm";
import { createContext, useContext } from "react";

type ReservationContext = {
  success: boolean;
  setSuccess: (val: boolean) => void;
  bookingData: BookingDataWithTotal | null;
  setBookingData: (data: BookingDataWithTotal | null) => void;
};

export const ReservationContext = createContext<ReservationContext | undefined>(undefined)

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) throw new Error("useReservation debe usarse dentro de ReservationProvider");
  return context;
};



