import React from "react";
interface MonthlySummary {
  month: string;
  bookingsCount: number;
  totalEarnings: number;
}

interface Props {
  monthlySummary: MonthlySummary[];
}

export default function MonthlySummary({monthlySummary}: Props) {
  return (
    <>
      {monthlySummary.length === 0 ? (
        <p>No tienes reservas aún.</p>
      ) : (
        <div className="flex flex-col">
          <h2 className="text-xl lg:text-3xl font-bold mb-4">
            Registro Mensuales
          </h2>
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
    </>
  );
}
