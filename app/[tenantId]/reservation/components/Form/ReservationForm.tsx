"use client";
import {
  FormValues,
  reservationSchema,
} from "@/app/[tenantId]/reservation/schema/reservationSchema";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ServiceOption } from "@/constants/services";
import { useTenant } from "@/context/TenantProvider";
import { useAvailableTimes } from "@/hooks/useAvailableTimes";
import { useBookingForm } from "@/hooks/useBookingForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ellipsis, Heart, Loader2, Scissors, Sparkles } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import HeaderForm from "./HeaderForm";
import { InputForm } from "./InputForm";
import { MultiSelectForm } from "./MultiSelect";
import { SelectForm } from "./SelectForm";
import { useState } from "react";

interface Props {
  allServices: ServiceOption[];
  preselectedServices: ServiceOption[];
}

export default function ReservationForm({
  allServices,
  preselectedServices,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      services: preselectedServices.map((service) => service.value),
      date: "",
      time: "",
    },
  });

  const bookingDate = watch("date");
  const { tenantId } = useTenant();
  const { handleSaveBooking } = useBookingForm(allServices);
  const [loading, setLoading] = useState(true);
  const saveNewBooking: SubmitHandler<FormValues> = async (data) => {
    const controller = new AbortController();

    const result = await handleSaveBooking(data, { tenantId });

    if (result.success) {
      toast.success("¡Éxito!", {
        description: result.message,
        duration: 5000,
      });

      reset();
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

  const availableTimes = useAvailableTimes({ bookingDate, setValue, tenantId });

  const multiSelectOptions = allServices.map((service) => ({
    value: service.value,
    label: service.name,
    price: service.price,
  }));

  return (
    <form
      onSubmit={handleSubmit(saveNewBooking)}
      className="border  rounded-xl  space-y-7  text-sm lg:text  lg:min-w-[1200px] opacity-0 translate-y-4 animate-fade-in"
    >
      <HeaderForm />
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputForm<FormValues>
            control={control}
            error={errors}
            label="👤 Nombre Completo"
            name="fullName"
            type="text"
            placeholder="ej: Maria Rodriguez"
            disabled={loading}
          />
          <InputForm<FormValues>
            control={control}
            error={errors}
            label="📱 Teléfono"
            name="phoneNumber"
            type="tel"
            placeholder="ej: 3416833699"
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MultiSelectForm<FormValues>
            error={errors}
            name="services"
            label="✂ Servicios"
            control={control}
            options={multiSelectOptions}
          />

          <InputForm<FormValues>
            control={control}
            error={errors}
            label="📧 Email"
            name="email"
            type="text"
            placeholder="ej: correo@gmail.com"
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputForm<FormValues>
            control={control}
            error={errors}
            label="📅 Fecha Preferida"
            name="date"
            type="date"
            disabled={loading}
          />
          <SelectForm<FormValues>
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
          className="bg-gradient-to-r from-primary/70 via-primary/86 to-primary hover:opacity-70 text-white text-lg lg:text-xl font-bold py-4 px-8 w-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <span className="flex items-center animate-spin">
                <Scissors className="w-6 h-6 ease-linear" />
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <Heart className="h-6 w-6" />
              <span className="text-sm lg:text-lg">Reservar mi Cita</span>
              <Sparkles className="h-5 w-5" />
            </div>
          )}
        </Button>
      </CardContent>
    </form>
  );
}
