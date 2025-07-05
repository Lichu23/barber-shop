"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReservation } from "../../context/ReservationContext";

export const SuccessCard = () => {
  const {bookingData} = useReservation()
  const chikyDireccion = "https://www.google.com/maps/place/Peluqueria+Latina+Chiky/@41.3741889,2.1573992,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4a265d7ffcf57:0xb70d1351b6080e80!8m2!3d41.3741889!4d2.1599741!16s%2Fg%2F11b7dzd2rc?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
  
    return (
    <Card>
      <CardHeader>
        <CardTitle>Cita Reservada correctamente</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <h2 className="font-bold text-xl">Detalles de tu cita:</h2> 
        <p><strong>Servicio:</strong> {bookingData?.service}</p>
        <p><strong>Horario de la cita:</strong>{bookingData?.time} </p>
        <p><strong>Confirmación enviada a:</strong>  {bookingData?.email}</p>
        <p>
        <strong>Dirección: </strong> 
        <a className="text-blue-400" href={chikyDireccion} target="_blank">
            Carrer d'Elkano, 82 Bjs Sants-Montjuïc, 08004 Barcelona
        </a>
        </p>
        <p>¡Te esperamos en Chiky Peluquería,{bookingData?.fullName} !</p>
      </CardContent>
    </Card>
  );
};
