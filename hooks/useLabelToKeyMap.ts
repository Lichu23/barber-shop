"use client";

import { Booking } from "@/types/booking";
import { MonthlySummaryType } from "@/utils/monthlyBookings";
import { normalizeMonthLabel, toMonthKey } from "@/utils/toMonthKey";
import { useMemo } from "react";

const MONTHS_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
const monthKeyFromEsLabel = (label: string): string | null => {
  // soporta "agosto 2025" o "agosto de 2025" 
  const parts = label.toLowerCase().split(" ").filter(Boolean); // ["agosto","2025"] o ["agosto","de","2025"]
  const monthName = parts[0]; 
  const year = parts.at(-1); 
  const monthIndex = MONTHS_ES.indexOf(monthName);
  if (monthIndex === -1 || !year) return null;
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
};

export const useLabelToKeyMap = (
  monthlySummary: MonthlySummaryType[],
  bookings: Booking[]
) => {
  return useMemo(() => {
    const map = new Map<string, string>();

    monthlySummary.forEach(({ month }) => {
      // 1. Intentar parsear directamente "agosto de 2025"
      const parsedKey = monthKeyFromEsLabel(month);
      if (parsedKey) {
        map.set(month, parsedKey);
        return;
      }

      // 2. Si no, buscar un booking que coincida
      const match = bookings.find((b) => {
        const [y, m] = toMonthKey(b.date).split("-");
        const d = new Date(Date.UTC(Number(y), Number(m) - 1, 1));
        return normalizeMonthLabel(d) === month.toLowerCase();
      });

      if (match) {
        map.set(month, toMonthKey(match.date));
      }
    });

    return map;
  }, [monthlySummary, bookings]);
};
