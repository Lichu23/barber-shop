import { MonthlySummaryType } from "@/utils/monthlyBookings";
import React from "react";

interface Props {
  monthlySummary: MonthlySummaryType[];
}

export default function MonthlySummary({ monthlySummary }: Props) {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-xl lg:text-3xl font-bold mb-4">Registros Mensuales</h2>
      {monthlySummary.length === 0 ? (
        <p className="text-base lg:text-xl">No tienes reservas aún.</p>
      ) : (
        <div className="w-full h-full">
          {monthlySummary.map(({ month, bookingsCount, totalEarnings }) => (
            <div key={month}>
              <h3 className="text-base lg:text-xl ">
                Mes de {month}:{" "}
                <span className="font-normal">
                  {bookingsCount} {bookingsCount === 1 ? "cita" : "citas"}
                </span>
              </h3>
              <p className="text-base lg:text-xl">
                Ganancias: <span>{totalEarnings.toFixed(2)} €</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
