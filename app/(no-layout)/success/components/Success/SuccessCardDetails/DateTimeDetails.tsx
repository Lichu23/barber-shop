import { Calendar, Clock } from "lucide-react";
import { formatTimeTo12H } from "@/utils/formatTime"; 
import { useReservation } from "@/context/ReservationContext";
import { formatDate } from "@/utils/formatDate";

export default function DateTimeDetails() {
  const {bookingData} = useReservation()
  return (
    <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-blue-100">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
          <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
        </div>
        <h3 className="text-lg sm:text-2xl font-bold text-gray-800">
          Fecha y Hora
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-white/70 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-200 text-center">
          <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mx-auto mb-1 sm:mb-2" />
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Fecha</p>
          <p className="text-sm sm:text-xl font-bold text-gray-800 leading-tight">
            {formatDate(bookingData?.date)}
          </p>
        </div>
        <div className="bg-white/70 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-200 text-center">
          <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mx-auto mb-1 sm:mb-2" />
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Hora</p>
          <p className="text-sm sm:text-xl font-bold text-gray-800">
            {formatTimeTo12H(bookingData?.time)}
          </p>
        </div>
      </div>
    </div>
  );
}