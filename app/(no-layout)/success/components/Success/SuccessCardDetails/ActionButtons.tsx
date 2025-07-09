import { Button } from "@/components/ui/button";
import { Home, X } from "lucide-react";

interface ActionButtonsProps {
  createNewReservation: () => void;
  handleCancelAppointment: () => void;
  isCancelling: boolean;
}

export default function ActionButtons({
  createNewReservation,
  handleCancelAppointment,
  isCancelling,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 pt-2 sm:pt-4">
      <Button
        onClick={createNewReservation}
        className="w-full flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-4 sm:py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-base"
      >
        <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
        Crear nueva cita
      </Button>
      <Button
        onClick={handleCancelAppointment} // Changed to the correct handler
        variant="outline"
        className="w-full flex-1 border-2 border-red-300 text-red-600 hover:bg-red-50 font-semibold py-4 sm:py-3 px-6 rounded-xl transition-all duration-300 bg-transparent text-base sm:text-base"
        disabled={isCancelling}
      >
        <X className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
        {isCancelling ? <p>Cancelando turno...</p> : <p>Cancelar Turno</p>}
      </Button>
    </div>
  );
}
