"use client";

import { ReactNode, useState } from "react";
import {ReservationContext} from "./ReservationContext"
import { BookingDataWithTotal } from "@/hooks/useBookingForm";



export function ReservationProvider({ children }: { children: ReactNode }) {
  const [success, setSuccess] = useState(false);
  const [bookingData, setBookingData] = useState<BookingDataWithTotal | null>(null);

  return (
    <ReservationContext.Provider value={{bookingData, setBookingData,setSuccess,success}}>
      {children}
    </ReservationContext.Provider>
  );
}
