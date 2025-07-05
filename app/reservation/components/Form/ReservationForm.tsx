"use client";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICE_OPTIONS } from "@/constants/services";
import { useAvailableTimes } from "@/hooks/useAvailableTimes";
import { useBookingForm } from "@/hooks/useBookingForm";
import { FormValues, reservationSchema } from "@/schema/reservationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputForm } from "./InputForm";
import { SelectForm } from "./SelectForm";
import { Button } from "@/components/ui/button";

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
      service: "",
      date: "",
      time: "",
    },
  });

  const bookingDate = watch("date");

  const { handleSaveBooking, loading, msg } = useBookingForm();

  const saveNewBooking: SubmitHandler<FormValues> = (data) => {
    handleSaveBooking(data);
  };

  const availableTimes = useAvailableTimes({ bookingDate, setValue });

  return (
    <form
      onSubmit={handleSubmit(saveNewBooking)}
      className="border rounded-xl p-4 space-y-6 text-sm lg:text"
    >
      <CardHeader>
        <CardTitle className="text-gray-800 flex items-center">
          Formulario de Reserva
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputForm
            control={control}
            error={errors}
            label="Nombre Completo"
            name="fullName"
            type="text"
            placeholder="ej: Pedro Rodriguez"
          />
          <InputForm
            control={control}
            error={errors}
            label="Teléfono"
            name="phoneNumber"
            type="tel"
            placeholder="ej: 3416833699"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectForm
            error={errors}
            name="service"
            label="Servicio"
            control={control}
            options={SERVICE_OPTIONS}
          />

          <InputForm
            control={control}
            error={errors}
            label="Email"
            name="email"
            type="text"
            placeholder="ej: correo@gmail.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputForm
            control={control}
            error={errors}
            label=" Fecha Preferida"
            name="date"
            type="date"
          />
          <SelectForm
            name="time"
            control={control}
            label="Hora Preferida"
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
          className="bg-pink-500 text-white text-md lg:text-lg hover:bg-pink-600 w-full sm:w-auto"
          type="submit"
          disabled={loading}
        >
          {loading ? "Reservando..." : "Reservar Turno"}
        </Button>
      </CardContent>
      <p>{msg}</p>
    </form>
  );
}

//antes: 250
