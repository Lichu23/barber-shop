// utils/monthlyBookings.ts

import { Booking } from "@/types/booking";


export type MonthlySummary = {
  month: string;
  bookingsCount: number;
  totalEarnings: number;
};

export function groupBookingsByMonth(bookings: Booking[]): MonthlySummary[] {
  const map = new Map<string, MonthlySummary>();

  bookings.forEach(({ date, total_price }) => {
    const d = new Date(date);
    const monthKey = `${d.getFullYear()}-${d.getMonth() + 1}`;
    const monthName = d.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    if (!map.has(monthKey)) {
      map.set(monthKey, {
        month: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        bookingsCount: 0,
        totalEarnings: 0,
      });
    }
    const summary = map.get(monthKey)!;
    summary.bookingsCount += 1;
    summary.totalEarnings += total_price;
  });

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.month).getTime() - new Date(a.month).getTime()
  );
}
