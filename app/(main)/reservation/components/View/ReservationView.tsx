"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ReservationForm from "../Form/ReservationForm";
import { useReservation } from "@/context/ReservationContext";

export const ReservationView = () => {
const { success } = useReservation(); // Obtén resetReservation
  const router = useRouter();


  useEffect(() => {
    if (success) {
      router.push('/success');
    }
  }, [success, router]);


  return (
    <div className="w-full lg:min-h-screen lg:flex lg:items-center lg:justify-center">
      <ReservationForm />
    </div>
  );
};
