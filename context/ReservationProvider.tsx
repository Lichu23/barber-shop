"use client";

import { ReactNode, useState } from "react";
import {ReservationContext} from "./ReservationContext"
import { BookingDataWithTotal } from "@/hooks/useBookingForm";



export function ReservationProvider({ children }: { children: ReactNode }) {

  
    function resetReservation() {
    }

  return (
    <ReservationContext.Provider value={{  resetReservation}}>
      {children}
    </ReservationContext.Provider>
  );
}
