"use client";
import { useReservation } from "../../context/ReservationContext";
import ReservationForm from "../Form/ReservationForm";
import { redirect } from "next/navigation";
import { SuccessView } from "../Success/SuccessModal";

export const ReservationView = () => {
  const { success } = useReservation();

  if (success) return <SuccessView/>

  return (
    <div className="w-full lg:min-h-screen lg:flex lg:items-center lg:justify-center">
      <ReservationForm />
    </div>
  );
};
