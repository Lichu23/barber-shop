"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allServiceOptions } from "@/constants/services";
import { useAvailableTimes } from "@/hooks/useAvailableTimes";
import { useBookingForm } from "@/hooks/useBookingForm";
import {
  FormValues,
  reservationSchema,
} from "@/app/(main)/reservation/schema/reservationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, Sparkles, Star } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputForm } from "./InputForm";
import { SelectForm } from "./SelectForm";
import { toast } from "sonner";
import { MultiSelectForm } from "./MultiSelect";

export default function ReservationForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      services: [],
      date: "",
      time: "",
    },
  });

  const bookingDate = watch("date");

  const { handleSaveBooking, loading } = useBookingForm();

  const saveNewBooking: SubmitHandler<FormValues> = async (data) => {
    const controller = new AbortController();

    const result = await handleSaveBooking(data);

    if (result.success) {
      toast.success("¡Éxito!", {
        description: result.message,
        duration: 5000,
      });
    } else {
      toast.error("Error", {
        description: result.message,
        duration: 5000,
      });
    }
      return () => {
      controller.abort;
    };
  };

  const availableTimes = useAvailableTimes({ bookingDate, setValue });

  return (
    <form
      onSubmit={handleSubmit(saveNewBooking)}
      className="border   rounded-xl lg:space-y-8 space-y-7  text-sm lg:text  lg:min-w-[1200px] lg:m-2 "
    >
      <div className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 relative overflow-hidden rounded-b-sm lg:rounded-xl">
        <div className="absolute top-4 right-6 opacity-20">
          <Heart className="h-16 w-16 text-white transform rotate-12" />
        </div>
        <div className="absolute bottom-4 left-6 opacity-20">
          <Sparkles className="h-12 w-12 text-white" />
        </div>
        <div className="absolute top-8 left-1/4 opacity-15">
          <Star className="h-8 w-8 text-white" />
        </div>

        <CardHeader className="relative z-10 text-center lg:py-4 py-2">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex gap-1">
              <Sparkles className="h-6 w-6 text-pink-200 animate-pulse" />
              <Sparkles className="h-4 w-4 text-pink-100 animate-pulse delay-100" />
            </div>
          </div>

          <CardTitle className="lg:text-4xl text-xl  font-bold text-white mb-3 tracking-wide">
            Reserva tu Cita de Belleza
          </CardTitle>

          <p className="text-pink-100 lg:text-lg text-sm  font-semibold">
            ✨ Déjanos realzar tu belleza natural ✨
          </p>

          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-1 w-12 bg-white/40 rounded-full"></div>
            <Heart className="h-4 w-4 text-pink-200" />
            <div className="h-1 w-12 bg-white/40 rounded-full"></div>
          </div>
        </CardHeader>
      </div>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputForm
            control={control}
            error={errors}
            label="👤 Nombre Completo"
            name="fullName"
            type="text"
            placeholder="ej: Maria Rodriguez"
          />
          <InputForm
            control={control}
            error={errors}
            label="📱 Teléfono"
            name="phoneNumber"
            type="tel"
            placeholder="ej: 3416833699"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MultiSelectForm
            error={errors}
            name="services"
            label="💅 Servicios"
            control={control}
            options={allServiceOptions}
          />

          <InputForm
            control={control}
            error={errors}
            label="📧 Email"
            name="email"
            type="text"
            placeholder="ej: correo@gmail.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputForm
            control={control}
            error={errors}
            label="📅 Fecha Preferida"
            name="date"
            type="date"
          />
          <SelectForm
            name="time"
            control={control}
            label="🕐 Hora Preferida"
            options={availableTimes.map((time) => ({
              value: time,
              label: time.slice(0, 5), // HH:mm
            }))}
            placeholder={
              !bookingDate
                ? "Selecciona una fecha"
                : availableTimes.length === 0
                  ? "No hay horarios disponibles"
                  : "Selecciona hora"
            }
            error={errors}
            disabled={!bookingDate || availableTimes.length === 0}
          />
        </div>

        <Button
          className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 text-white text-lg lg:text-xl font-bold py-4 px-8 w-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>✨ Reservando tu cita...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <Heart className="h-6 w-6" />
              <span className="text-sm lg:text-lg">
                {" "}
                Reservar mi Cita de Belleza
              </span>
              <Sparkles className="h-5 w-5" />
            </div>
          )}
        </Button>
      </CardContent>
    </form>
  );
}
