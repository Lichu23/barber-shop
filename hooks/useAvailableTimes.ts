"use client";

import { ALL_TIMES } from "@/app/(main)/reservation/constants/times";
import { createClient } from "@/utils/supabase/createClient";
import { FormValues } from "@/app/(main)/reservation/schema/reservationSchema";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { filterPastTimes } from "@/utils/timeAvailable";
interface Props {
  bookingDate: string | undefined;
  setValue: UseFormSetValue<FormValues>;
}

export const useAvailableTimes = ({ bookingDate, setValue }: Props) => {
  const [availableTimes, setAvailableTimes] = useState<string[]>(ALL_TIMES);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchReservedTimes() {
      if (!bookingDate) {
        setAvailableTimes(ALL_TIMES);
        setValue("time", "");
        return;
      }

      const supabase = createClient();

      const { data, error } = await supabase
        .from("bookings")
        .select("appointment_time")
        .eq("date", bookingDate);

      if (error) {
        console.error("Error fetching reserved times:", error.message);
        setAvailableTimes(ALL_TIMES);
        return;
      }

      const reservedTimes =
        data?.map((record) => record.appointment_time) ?? [];

      let freeTimes = ALL_TIMES.filter((time) => !reservedTimes.includes(time));

      freeTimes = filterPastTimes(freeTimes, bookingDate);
      
      setAvailableTimes(freeTimes);
      setValue("time", ""); // reset selección al cambiar fecha
    }

    fetchReservedTimes();
    return () => {
      controller.abort;
    };
  }, [bookingDate]);

  return availableTimes;
};
