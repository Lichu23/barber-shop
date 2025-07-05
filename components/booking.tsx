import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, User, Phone } from "lucide-react"

export default function Booking() {
  return (
    <section id="reservar" className="py-20 bg-gradient-to-b from-rose-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Agenda tu Transformación</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reserva tu cita y déjanos crear el look perfecto para ti. Te contactaremos para confirmar todos los detalles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="bg-white border-pink-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-pink-500" />
                Formulario de Reserva
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700">
                    Nombre Completo
                  </Label>
                  <Input id="name" placeholder="Tu nombre" className="border-pink-200 focus:border-pink-400" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-700">
                    Teléfono
                  </Label>
                  <Input id="phone" placeholder="Tu teléfono" className="border-pink-200 focus:border-pink-400" />
                </div>
              </div>

              <div>
                <Label htmlFor="service" className="text-gray-700">
                  Servicio
                </Label>
                <Select>
                  <SelectTrigger className="border-pink-200 focus:border-pink-400">
                    <SelectValue placeholder="Selecciona un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balayage">Balayage - €85</SelectItem>
                    <SelectItem value="coloracion">Coloración Capilar - €65</SelectItem>
                    <SelectItem value="estilismo">Estilismo Capilar - €45</SelectItem>
                    <SelectItem value="extensiones">Extensiones de Cabello - €120</SelectItem>
                    <SelectItem value="mechas">Mechas - €55</SelectItem>
                    <SelectItem value="rizado">Pelo Rizado - €40</SelectItem>
                    <SelectItem value="peinados">Peinados - €35</SelectItem>
                    <SelectItem value="pelucas">Colocación de Pelucas - €25</SelectItem>
                    <SelectItem value="completo">Paquete Completo - €135</SelectItem>
                    <SelectItem value="novia">Paquete Novia - €165</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-gray-700">
                    Fecha Preferida
                  </Label>
                  <Input id="date" type="date" className="border-pink-200 focus:border-pink-400" />
                </div>
                <div>
                  <Label htmlFor="time" className="text-gray-700">
                    Hora Preferida
                  </Label>
                  <Select>
                    <SelectTrigger className="border-pink-200 focus:border-pink-400">
                      <SelectValue placeholder="Selecciona hora" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="14:00">02:00 PM</SelectItem>
                      <SelectItem value="15:00">03:00 PM</SelectItem>
                      <SelectItem value="16:00">04:00 PM</SelectItem>
                      <SelectItem value="17:00">05:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-gray-700">
                  Notas Adicionales
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Cuéntanos sobre tu cabello actual, alergias, o el look que sueñas conseguir..."
                  className="border-pink-200 focus:border-pink-400"
                />
              </div>

              <Button className="w-full bg-pink-500 text-white hover:bg-pink-600 text-lg py-3">Enviar Reserva</Button>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="bg-white border-pink-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-pink-500" />
                  Horarios de Atención
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Lunes - Sábado:</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingos:</span>
                    <span>Cerrado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-pink-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center">
                  <User className="mr-2 h-5 w-5 text-pink-500" />
                  Información Importante
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-3">
                <p>• Las citas se confirman por teléfono o WhatsApp</p>
                <p>• Cancelaciones con 4 horas de anticipación</p>
                <p>• Aceptamos efectivo, tarjetas y transferencias</p>
                <p>• Consulta de imagen gratuita para nuevas clientas</p>
                <p>• Productos profesionales de alta gama incluidos</p>
                <p>• Descuentos especiales para estudiantes y grupos</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">¿Prefieres llamar?</h3>
                <p className="text-lg font-semibold">691 872 269</p>
                <p className="text-sm mt-2">Atención inmediata de 9 AM a 8 PM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
