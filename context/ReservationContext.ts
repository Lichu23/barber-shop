"use client";
import { createContext, useContext } from "react";

type ReservationContext = {
  resetReservation: () => void;
};

export const ReservationContext = createContext<ReservationContext | undefined>(undefined)

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) throw new Error("useReservation debe usarse dentro de ReservationProvider");
  return context;
};



