"use client"
import { useReservation } from "../../context/ReservationContext";
import ReservationForm from "../Form/ReservationForm";
import { SuccessCard } from "../Success/SuccessCard";
import { SuccessModal } from "../Success/SuccessModal";

export const ReservationView = () => {
  const { success } = useReservation();

  if (success)
    return (
      <SuccessModal>
        <SuccessCard />
      </SuccessModal>
    );

  return (
    <div className="p-5">
      <ReservationForm />
    </div>
  );
};
