"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  CheckCircle,
  Sparkles,
  Heart,
  Calendar,
  Clock,
  Scissors,
  DollarSign,
  MapPin,
  ExternalLink,
  Home,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useState } from "react"
import { formatTimeTo12H } from "@/utils/formatTime"
import { useReservation } from "../../context/ReservationContext"

// Tipos basados en tu schema
export type BookingDataWithTotal = {
  fullName: string
  phoneNumber: string
  email: string
  services: string[]
  date: string
  time: string
  totalPrice: number
}



export default function SuccessCard() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const {bookingData} = useReservation()

  const chikyDireccion =
    "https://www.google.com/maps/place/Peluqueria+Latina+Chiky/@41.3741889,2.1573992,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4a265d7ffcf57:0xb70d1351b6080e80!8m2!3d41.3741889!4d2.1599741!16s%2Fg%2F11b7dzd2rc?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"

  const handleGoHome = () => {
    // Lógica para ir al inicio
  }

  const handleCancelAppointment = () => {
    // Lógica para cancelar turno
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 lg:p-2  flex items-center lg:justify-center">
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
            <p className="text-green-100 text-base sm:text-lg">Tu cita ha sido reservada exitosamente</p>
          </CardHeader>
        </div>

        <CardContent className="p-4 sm:p-8 space-y-4 sm:space-y-6">
          {/* Servicios - Mobile Optimized */}
          <div className="bg-gradient-to-r from-pink-50/50 to-rose-50/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-pink-100">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-pink-100 rounded-full">
                <Scissors className="h-4 w-4 sm:h-6 sm:w-6 text-pink-600" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800">Servicios</h3>
            </div>

            {bookingData?.services.length === 1 ? (
              // Un solo servicio
              <div className="bg-white/70 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-pink-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-base sm:text-lg font-bold text-gray-800">{bookingData?.services[0]}</h4>
                  </div>
                  <div className="text-right">
                    <Scissors className="h-5 w-5 text-pink-500" />
                  </div>
                </div>
              </div>
            ) : (
              // Múltiples servicios con acordeón
              <Collapsible open={isServicesOpen} onOpenChange={setIsServicesOpen}>
                <CollapsibleTrigger className="w-full bg-white/70 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-pink-200 hover:bg-white/90 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="text-left flex-1">
                      <h4 className="text-base sm:text-lg font-bold text-gray-800">
                        {bookingData?.services.length} Servicios Seleccionados
                      </h4>
                     
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isServicesOpen ? (
                        <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-2 sm:mt-3 space-y-2">
                  {bookingData?.services.map((service, index) => (
                    <div
                      key={index}
                      className="bg-white/70 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-pink-200 ml-2 sm:ml-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h5 className="text-sm sm:font-semibold font-medium text-gray-800">{service}</h5>
                        </div>
                        <Scissors className="h-4 w-4 text-pink-500 flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>

          {/* Precio Total - Mobile Optimized */}
          <div className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-green-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-3 bg-green-100 rounded-full">
                  <DollarSign className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-800">Total</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl sm:text-4xl font-bold text-green-600">${bookingData?.totalPrice}</p>
                <p className="text-xs sm:text-sm text-gray-600">Precio final</p>
              </div>
            </div>
          </div>

          {/* Fecha y Hora - Mobile Optimized */}
          <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-blue-100">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800">Fecha y Hora</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white/70 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-200 text-center">
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mx-auto mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Fecha</p>
                <p className="text-sm sm:text-xl font-bold text-gray-800 leading-tight">{bookingData?.date}</p>
              </div>

              <div className="bg-white/70 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-200 text-center">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mx-auto mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Hora</p>
                <p className="text-sm sm:text-xl font-bold text-gray-800">{formatTimeTo12H(bookingData?.time)}</p>
              </div>
            </div>
          </div>

          {/* Información del Cliente - Nueva sección */}
          <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-purple-100">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-purple-100 rounded-full">
                <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800">¡Te esperamos, {bookingData?.fullName}!</h3>
            </div>

            <div className="bg-white/70 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-purple-200 space-y-2">
              <p className="text-sm sm:text-base text-gray-700">
                <span className="font-medium">📧 Confirmación enviada a:</span> {bookingData?.email}
              </p>
        
            </div>
          </div>

          {/* Ubicación - Mobile Optimized */}
          <div className="bg-gradient-to-r from-indigo-50/50 to-blue-50/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-indigo-100">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-indigo-100 rounded-full">
                <MapPin className="h-4 w-4 sm:h-6 sm:w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800">Ubicación</h3>
            </div>

            <div className="bg-white/70 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-indigo-200">
              <p className="text-sm sm:font-bold font-semibold text-gray-800 mb-1">Chiky Peluquería</p>
              <p className="text-xs sm:text-base text-gray-600 mb-3 leading-relaxed">
                Carrer d'Elkano, 82 Bjs
                <br />
                Sants-Montjuïc, 08004 Barcelona
              </p>
              <Button
                asChild
                className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg text-sm sm:text-base"
              >
                <a href={chikyDireccion} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Ver en Google Maps
                </a>
              </Button>
            </div>
          </div>

          {/* Botones - Mobile Optimized */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 pt-2 sm:pt-4">
            <Button
              onClick={handleGoHome}
              className="w-full flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-4 sm:py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-base"
            >
              <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Ir al Inicio
            </Button>
            <Button
              onClick={handleCancelAppointment}
              variant="outline"
              className="w-full flex-1 border-2 border-red-300 text-red-600 hover:bg-red-50 font-semibold py-4 sm:py-3 px-6 rounded-xl transition-all duration-300 bg-transparent text-base sm:text-base"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Cancelar Turno
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
