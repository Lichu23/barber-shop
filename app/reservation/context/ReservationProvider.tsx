"use client";

import { ReactNode, useState } from "react";
import {ReservationContext} from "./ReservationContext"

export interface BookingData  {
  fullName: string;
  phoneNumber: number;
  email: string;
  service: string;
  date: string;
  time: string;
};

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [success, setSuccess] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  return (
    <ReservationContext.Provider value={{bookingData, setBookingData,setSuccess,success}}>
      {children}
    </ReservationContext.Provider>
  );
}
