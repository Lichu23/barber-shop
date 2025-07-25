import { Button } from "@/components/ui/button";
import { Home, X } from "lucide-react";

interface ActionButtonsProps {
  createNewReservation: () => void;
  isCancelling: boolean;
}

export default function ActionButtons({
  createNewReservation,
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
    </div>
  );
}
