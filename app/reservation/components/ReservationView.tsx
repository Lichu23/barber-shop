"use client"
import { useReservation } from "../context/ReservationContext";
import ReservationForm from "./ReservationForm";
import { SuccessCard } from "./SuccessCard";
import { SuccessModal } from "./SuccessModal";

export const ReservationView = () => {
  const { success } = useReservation();

  if (success)
    return (
      <SuccessModal title="Cita reservada correctamente">
        <SuccessCard />
      </SuccessModal>
    );

  return (
    <div className="p-5">
      <ReservationForm />
    </div>
  );
};
