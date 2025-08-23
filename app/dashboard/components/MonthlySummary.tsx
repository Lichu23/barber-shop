"use client";
import { useFilteredBookings } from "@/hooks/useFilteredBookings";
import { useLabelToKeyMap } from "@/hooks/useLabelToKeyMap";
import { Booking } from "@/types/booking";
import { MonthlySummaryType } from "@/utils/monthlyBookings";
import { useState } from "react";

interface Props {
  monthlySummary: MonthlySummaryType[];
  bookings: Booking[];
}

export default function MonthlySummary({ monthlySummary, bookings }: Props) {
  const labelToKey = useLabelToKeyMap(monthlySummary, bookings);
  const [selectedMonthKey, setSelectedMonthKey] = useState<string | null>(null);
  const filteredBookings = useFilteredBookings(bookings, selectedMonthKey);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedMonthKey(null);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className="mb-5 w-full lg:border lg:w-fit p-4 py-2 bg-white rounded-xl lg:shadow-lg lg:h-96 ">
      <div className="flex flex-col justify-center  gap-5 lg:gap-0">
        <h2 className="text-xl lg:text-3xl font-bold lg:mt-3">
          Registros Mensuales
        </h2>

        {monthlySummary.length === 0 ? (
          <p className="text-base lg:text-xl">No tienes reservas aún.</p>
        ) : (
          <div className="flex flex-col lg:gap-3  gap-5 lg:mt-5 h-72 overflow-y-auto">
            {monthlySummary.map(({ month, bookingsCount, totalEarnings }) => {
              const monthKey = labelToKey.get(month) ?? null;
              return (
                <div
                  key={month}
                  className="border hover:border-black border-gray-200 lg:p-2 p-2 rounded-xl cursor-pointer shadow-md"
                  onClick={() => monthKey && setSelectedMonthKey(monthKey)}
                >
                  <h3 className="text-base lg:text-xl font-bold">
                    Mes de {month}:{" "}
                    <span className="font-normal">
                      {bookingsCount} {bookingsCount === 1 ? "cita" : "citas"}
                    </span>
                  </h3>
                  <p className="text-base lg:text-xl font-bold">
                    Ganancias:{" "}
                    <span className="font-normal">
                      {totalEarnings.toFixed(2)} €
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {selectedMonthKey && (
        <div
          className={`${isClosing ? "opacity-0" : "opacity-100 bg-black/50"} fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-300 `}
          onClick={handleClose}
        >
          <div
            className={`${isClosing ? "opacity-0 translate-y-4" : "opacity-0 translate-y-2 animate-fade-in "}  bg-white rounded-2xl shadow-2xl p-6 w-11/12 md:w-2/3 lg:w-1/2  overflow-y-auto`}
            onClick={(e) => e.stopPropagation()} // evitar que clic dentro cierre
          >
            <h2 className="text-2xl font-bold mb-4">
              Citas de{" "}
              {(() => {
                const [year, month] = selectedMonthKey.split("-");
                const date = new Date(
                  Date.UTC(Number(year), Number(month) - 1, 1)
                );
                return new Intl.DateTimeFormat("es-ES", {
                  month: "long",
                  year: "numeric",
                }).format(date);
              })()}
            </h2>

            {filteredBookings.length === 0 ? (
              <p>No hay citas este mes.</p>
            ) : (
              <ul className="space-y-3 h-80 lg:h-90 overflow-y-auto">
                {filteredBookings.map((booking) => (
                  <li
                    key={booking.id}
                    className="border p-3 rounded-lg shadow-sm flex flex-col"
                  >
                    <span className="font-bold">{booking.full_name}</span>
                    <span>
                      📅{" "}
                      {new Date(booking.date + "T00:00:00Z").toLocaleDateString(
                        "es-ES"
                      )}
                      {booking.appointment_time
                        ? ` • ⏰ ${booking.appointment_time}`
                        : null}
                    </span>
                    <span className="text-green-600 font-semibold">
                      💶 {booking.total_price.toFixed(2)} €
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <button
              className="mt-6 px-4 py-2 text-sm font-bold lg:font-base bg-red-500 w-full lg:w-fit text-white rounded-xl hover:bg-red-600"
              onClick={handleClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
