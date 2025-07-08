"use client"
import { SuccessView } from '@/app/(main)/reservation/components/Success/SuccessView';
import { useReservation } from '@/app/(main)/reservation/context/ReservationContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function page() {
   const { bookingData } = useReservation();
  const router = useRouter(); 

  useEffect(() => {
    if (!bookingData) {
      router.replace("/reservation"); 
    }
  }, [bookingData, router]);

  if (!bookingData) {
    return null; // O un spinner, 
  }

  return (

    <SuccessView/>
  )
}
