"use client";

import { formatDate } from "@/app/utils/formatDate";
import { createClient } from "@/app/utils/supabase/createClient";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBookingForm } from "@/hooks/useBookingForm";
import { useEffect, useState } from "react";
import { ALL_TIMES } from "../constants/times";

export default function ReservationForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [selectService, setSelectService] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<Date | null>(null);
  const [appointmentTime, setAppointmentTime] = useState<string>("");
  const [availableTimes, setAvailableTimes] = useState<string[]>(ALL_TIMES);



  const { handleSaveBooking, loading, msg } = useBookingForm({
    fullName,
    appointmentTime,
    bookingDate,
    email,
    phoneNumber,
    selectService,
  });

  const saveNewBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleSaveBooking(formData);
  };

  useEffect(() => {
    const controller = new AbortController();

    async function fetchReservedTimes() {
      if (!bookingDate) {
        setAvailableTimes(ALL_TIMES);
        setAppointmentTime("");
        return;
      }

      const supabase = createClient();
      const formattedDate = formatDate(bookingDate);

      const { data, error } = await supabase
        .from("bookings")
        .select("appointment_time")
        .eq("date", formattedDate);

      if (error) {
        console.error("Error fetching reserved times:", error.message);
        setAvailableTimes(ALL_TIMES);
        return;
      }

      const reservedTimes =
        data?.map((record) => record.appointment_time) ?? [];
      const freeTimes = ALL_TIMES.filter(
        (time) => !reservedTimes.includes(time)
      );

      setAvailableTimes(freeTimes);
      setAppointmentTime(""); // reset selección al cambiar fecha
    }

    fetchReservedTimes();
    return () => {
      controller.abort;
    };
  }, [bookingDate]);

  return (
    <form onSubmit={saveNewBooking} className="border p-4 space-y-6">
      <CardHeader>
        <CardTitle className="text-gray-800 flex items-center">
          Formulario de Reserva
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName" className="text-gray-700">
              Nombre Completo
            </Label>
            <Input
              required
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              id="fullName"
              placeholder="Tu nombre"
              className="border-pink-200 focus:border-pink-400"
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber" className="text-gray-700">
              Teléfono
            </Label>
            <Input
              required
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(Number(e.target.value))}
              id="phoneNumber"
              placeholder="Tu teléfono"
              className="border-pink-200 focus:border-pink-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="service" className="text-gray-700">
              Servicio
            </Label>
            <Select
              required
              value={selectService}
              onValueChange={setSelectService}
            >
              <SelectTrigger
                id="elige_un_servicio"
                className="border-pink-200 focus:border-pink-400"
              >
                <SelectValue placeholder="Selecciona un servicio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="balayage">Balayage - €85</SelectItem>
                <SelectItem value="coloracion">
                  Coloración Capilar - €65
                </SelectItem>
                <SelectItem value="estilismo">
                  Estilismo Capilar - €45
                </SelectItem>
                <SelectItem value="extensiones">
                  Extensiones de Cabello - €120
                </SelectItem>
                <SelectItem value="mechas">Mechas - €55</SelectItem>
                <SelectItem value="rizado">Pelo Rizado - €40</SelectItem>
                <SelectItem value="peinados">Peinados - €35</SelectItem>
                <SelectItem value="pelucas">
                  Colocación de Pelucas - €25
                </SelectItem>
                <SelectItem value="completo">
                  Paquete Completo - €135
                </SelectItem>
                <SelectItem value="novia">Paquete Novia - €165</SelectItem>
              </SelectContent>
            </Select>
            {/* Campo oculto para el valor seleccionado */}
            <input type="hidden" name="service" value={selectService} />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <Input
              type="email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="correo@correo.com"
              className="border-pink-200 focus:border-pink-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date" className="text-gray-700">
              Fecha Preferida
            </Label>
            <Input
              required
              name="date"
              value={formatDate(bookingDate)}
              onChange={(e) => {
                const value = e.target.value;
                setBookingDate(value ? new Date(value) : null);
              }}
              id="date"
              type="date"
              className="border-pink-200 focus:border-pink-400"
            />
          </div>
          <div>
            <Label htmlFor="time" className="text-gray-700">
              Hora Preferida
            </Label>
            <Select
              value={appointmentTime}
              onValueChange={setAppointmentTime}
              disabled={!bookingDate || availableTimes.length === 0}
            >
              <SelectTrigger className="border-pink-200 focus:border-pink-400">
                <SelectValue
                  placeholder={
                    !bookingDate
                      ? "Selecciona una fecha"
                      : availableTimes.length === 0
                      ? "No hay horarios disponibles"
                      : "Selecciona hora"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.length === 0 ? (
                  <SelectItem value="" disabled>
                    No hay horarios disponibles
                  </SelectItem>
                ) : (
                  availableTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time.slice(0, 5)} {/* Mostrar HH:mm */}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {/* Campo oculto para el valor seleccionado */}
            <input type="hidden" name="time" value={appointmentTime} />
          </div>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Reservando..." : "Reservar Turno"}
        </button>
      </CardContent>
      <p>{msg}</p>
    </form>
  );
}
