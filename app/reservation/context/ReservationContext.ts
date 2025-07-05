"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { BookingData } from "./ReservationProvider";

type ReservationContext = {
  success: boolean;
  setSuccess: (val: boolean) => void;
  bookingData: BookingData | null;
  setBookingData: (data: BookingData | null) => void;
};

export const ReservationContext = createContext<ReservationContext | undefined>(undefined)

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) throw new Error("useReservation debe usarse dentro de ReservationProvider");
  return context;
};



