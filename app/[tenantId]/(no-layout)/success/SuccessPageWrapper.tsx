"use client"
import { useTenant } from '@/context/TenantProvider';
import { Booking } from '@/types/booking';
import React from 'react'

interface Props {
    booking:Booking;
    formattedServices:string;
    formattedDate: string;
    formattedStartTime:string;
    formattedEndTime: string
}

export default function SuccessPageWrapper({ booking, formattedServices, formattedDate, formattedStartTime, formattedEndTime}: Props) {
  const {isCustomDomain, tenantId} = useTenant()
  const homeLink = isCustomDomain ? "/" : `/${tenantId}`;

  return (
     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <div className="text-green-500 text-6xl mb-4">✔</div>
        <h1 className="text-2xl lg:text-4xl font-extrabold text-gray-900 mb-4">
          ¡Reserva Confirmada!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Tu cita ha sido agendada con éxito. Aquí están los detalles:
        </p>

        <div className="text-left space-y-3">
          <p className="text-gray-800">
            <strong className="font-semibold">Nombre:</strong>{" "}
            {booking.full_name}
          </p>
          <p className="text-gray-800">
            <strong className="font-semibold">Email:</strong> {booking.email}
          </p>
          <p className="text-gray-800">
            <strong className="font-semibold">Teléfono:</strong>{" "}
            {booking.phone_number}
          </p>
          <p className="text-gray-800">
            <strong className="font-semibold">Servicios:</strong>{" "}
            {formattedServices}
          </p>
          <p className="text-gray-800">
            <strong className="font-semibold">Fecha:</strong> {formattedDate}
          </p>
          <p className="text-gray-800">
            <strong className="font-semibold">Hora:</strong>{" "}
            {formattedStartTime} - {formattedEndTime}
          </p>
          <p className="text-gray-800">
            <strong className="font-semibold">Precio Total:</strong>{" "}
            {booking.total_price}€
          </p>
        </div>

        <p className="text-md text-gray-600 mt-8">
          Te hemos enviado un email de confirmación con estos detalles.
        </p>

        <a
          href={homeLink}
          className="mt-8 inline-block bg-primary hover:bg-primary/85 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  )
}
