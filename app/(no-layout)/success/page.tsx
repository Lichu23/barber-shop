"use client"
import { useReservation } from '@/context/ReservationContext';
import { SuccessView } from './components/Success/SuccessView';

export default function page() {
   const { bookingData } = useReservation();

  
  if (!bookingData) {
    return null; // O un spinner, 
  }

  return (
    <SuccessView/>
  )
}
