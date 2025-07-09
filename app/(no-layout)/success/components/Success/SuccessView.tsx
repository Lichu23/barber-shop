"use client";

import { useReservation } from "@/context/ReservationContext";
import { useState } from "react";
import SuccessCard from "./SuccessCard";
import { useRouter } from "next/navigation";
import { cancelBooking } from "../../action";
import { toast } from "sonner";

export const SuccessView = () => {
  const router = useRouter();
  const { resetReservation, bookingData } = useReservation();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const createNewReservation = () => {
    resetReservation();
    router.push("/reservation");
  };

  const handleCancelAppointment = async () => {
    // Ensure we have booking data before attempting to cancel
        if (!bookingData) {
      toast.error("Error", {
        description: "No se encontraron datos de la reserva para cancelar.",
      });
      return;
    }
    
    setIsCancelling(true); // Start loading state

    try {
      const result = await cancelBooking(
        bookingData.email,
        bookingData.date,
        bookingData.time
      );

      if (result.success) {
        console.log("¡Reserva cancelada exitosamente!");
        resetReservation(); // This clears bookingData in context
        router.push("/?cancelSuccess=true"); // <--- Add query parameter here!
        
      } else {
        toast.error("Error", {
          description: result.error || "Fallo al cancelar la reserva.",
          duration: 5000,
        });
        console.error("Error al cancelar:", result.error);
      }
    } catch (error) {
      toast.error("Error", {
        description: "Ocurrió un error inesperado al cancelar la reserva.",
        duration: 5000,
      });
      console.error("Error inesperado en cancelación:", error);
    } finally {
      setIsCancelling(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
        <p className="text-gray-600">
          Cargando detalles de la reserva o no se encontró ninguna reserva
          confirmada.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 lg:p-2 flex items-center lg:justify-center">
      <SuccessCard
        bookingData={bookingData}
        isServicesOpen={isServicesOpen}
        setIsServicesOpen={setIsServicesOpen}
        createNewReservation={createNewReservation}
        handleCancelAppointment={handleCancelAppointment}
        isCancelling={isCancelling}
      />
    </div>
  );
};
