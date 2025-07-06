"use client";
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
    <div className="w-full lg:min-h-screen lg:flex lg:items-center lg:justify-center">
        <ReservationForm />
    </div>
  );
};
