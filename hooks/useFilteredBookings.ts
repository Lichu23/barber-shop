"use client";

import { Booking } from "@/types/booking";
import { toMonthKey } from "@/utils/toMonthKey";
import { useMemo } from "react";

export const useFilteredBookings = (bookings: Booking[], monthKey: string | null) => {
  return useMemo(() => {
    if (!monthKey) return [];
    return bookings.filter((b) => toMonthKey(b.date) === monthKey);
  }, [bookings, monthKey]);
};
