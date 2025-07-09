import { useReservation } from "@/context/ReservationContext";
import { Heart } from "lucide-react";



export default function CustomerInfo() {
  const {bookingData} = useReservation()

  return (
    <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-purple-100">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="p-2 sm:p-3 bg-purple-100 rounded-full">
          <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
        </div>
        <h3 className="text-lg sm:text-2xl font-bold text-gray-800">
          ¡Te esperamos, {bookingData?.fullName}!
        </h3>
      </div>
      <div className="bg-white/70 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-purple-200 space-y-2">
        <p className="text-sm sm:text-base text-gray-700">
          <span className="font-medium">📧 Confirmación enviada a:</span>{" "}
          {bookingData?.email}
        </p>
      </div>
    </div>
  );
}