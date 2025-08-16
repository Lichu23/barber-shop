"use client";

import { FormValues } from "@/app/[tenantId]/reservation/schema/reservationSchema";
import { availableTimesFilter } from "@/utils/availableTimes";
import { supabaseClient } from "@/utils/supabase/createClientServer";
import { getDay, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
interface Props {
  bookingDate: string | undefined;
  setValue: UseFormSetValue<FormValues>;
  tenantId: string;
}

export const useAvailableTimes = ({
  bookingDate,
  setValue,
  tenantId,
}: Props) => {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  
  useEffect(() => {
    const controller = new AbortController();

    async function fetchReservedTimes() {
      if (!bookingDate) {
        setAvailableTimes([]);
        setValue("time", "");
        return;
      }

      const { data: tenant, error: tenantError } = await supabaseClient
        .from("tenants")
        .select("available_times")
        .eq("tenant_id", tenantId)
        .single();

      if (tenantError || !tenant?.available_times) {
        console.error("Error fetching tenant available times:", tenantError?.message);
        setAvailableTimes([]);
        return;
      }

      let availableTimesJson: Record<string, [string, string][]> = {};

      if (typeof tenant.available_times === "string") {
        try {
          availableTimesJson = JSON.parse(tenant.available_times);
        } catch (e) {
          console.error("Error parsing tenant available_times:", e);
          setAvailableTimes([]);
          return;
        }
      } else if (typeof tenant.available_times === "object") {
        availableTimesJson = tenant.available_times;
      }

      // Obtener día de la semana (0=domingo, 1=lunes,...)
      const dateObj = parseISO(bookingDate);
      const dayNumber = getDay(dateObj);
      const dayNames = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
      const dayKey = dayNames[dayNumber];

      const dayRanges = availableTimesJson[dayKey] || [];

      // Generar todos los slots del día a partir de los rangos
      const tenantSlots: string[] = [];
      dayRanges.forEach(([start, end]) => {
        let [hour, minute] = start.split(":").map(Number);
        const [endHour, endMinute] = end.split(":").map(Number);
        while (hour < endHour || (hour === endHour && minute < endMinute)) {
          const slot = `${hour.toString().padStart(2,"0")}:${minute.toString().padStart(2,"0")}`;
          tenantSlots.push(slot);
          minute += 30; // intervalos de 30 minutos
          if (minute >= 60) {
            minute = 0;
            hour += 1;
          }
        }
      });

      const { data: bookings, error: bookingsError } = await supabaseClient
        .from("bookings")
        .select("appointment_time")
        .eq("tenant_id", tenantId)
        .eq("date", bookingDate);

      if (bookingsError) {
        console.error("Error fetching reserved times:", bookingsError.message);
        setAvailableTimes(tenantSlots);
        return;
      }

      const reservedTimes = bookings?.map(b => b.appointment_time.slice(0,5)) ?? [];

      let freeTimes = tenantSlots.filter(time => !reservedTimes.includes(time));
      freeTimes = availableTimesFilter(freeTimes, bookingDate);

      setAvailableTimes(freeTimes);
      setValue("time", "");
    }

    fetchReservedTimes();
    return () => controller.abort();
  }, [bookingDate]);


  return availableTimes;
};
