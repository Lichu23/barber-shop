"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingDataWithTotal } from "@/hooks/useBookingForm";
import { CheckCircle, Heart, Sparkles } from "lucide-react";
import ActionButtons from "./SuccessCardDetails/ActionButtons";
import CustomerInfo from "./SuccessCardDetails/CustomerInfo";
import DateTimeDetails from "./SuccessCardDetails/DateTimeDetails";
import LocationDetails from "./SuccessCardDetails/LocationDetails";
import ServiceDetails from "./SuccessCardDetails/ServiceDetails";

interface BookingConfirmationCardProps {
  bookingData: BookingDataWithTotal;
  isServicesOpen: boolean;
  setIsServicesOpen: (isOpen: boolean) => void;
  createNewReservation: () => void;
  handleCancelAppointment: () => void;
  isCancelling: boolean
}

export default function SuccessCard({
  createNewReservation,
  isServicesOpen,
  setIsServicesOpen,
  isCancelling
}: BookingConfirmationCardProps) {
  return (
    <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-2xl lg:rounded-2xl rounded-none border-0 overflow-hidden">
      <div className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="absolute top-2 sm:top-4 right-3 sm:right-6 opacity-20">
          <Heart className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
        </div>
        <div className="absolute bottom-2 sm:bottom-4 left-3 sm:left-6 opacity-20">
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        </div>

        <CardHeader className="relative z-10 text-center py-4 sm:py-6">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-green-200" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
            ¡Reserva Confirmada!
          </CardTitle>
          <p className="text-green-100 text-base sm:text-lg">
            Tu cita ha sido reservada exitosamente
          </p>
        </CardHeader>
      </div>

      <CardContent className="p-4 sm:p-8 space-y-4 sm:space-y-6">
        
        <ServiceDetails
          isServicesOpen={isServicesOpen}
          setIsServicesOpen={setIsServicesOpen}
        />
        
        <DateTimeDetails  />

        <CustomerInfo

        />
        <LocationDetails />

        <ActionButtons
          createNewReservation={createNewReservation}
          isCancelling={isCancelling}
        />
      </CardContent>
    </Card>
  );
}
