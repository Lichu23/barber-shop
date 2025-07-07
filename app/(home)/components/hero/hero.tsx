import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Phone, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section id="inicio" className="relative">
      <HeroMain />
      <ContactBar />
    </section>
  )
}

function HeroMain() {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <Image
        src="/images/hero-fachada-chiky.png"
        alt="Chiky Peluquería - Fachada del local"
        fill
        className="object-cover"
        priority
        quality={60}
      />
      <div className="relative z-20 text-center text-white px-4 w-full max-w-4xl mx-auto">
        <h2
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        >
          Belleza y <span className="text-pink-300">Elegancia</span>
        </h2>
        <p
          className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
        >
          Tu peluquería de confianza en el corazón de la ciudad. Más de 15 años creando looks únicos y cuidando tu
          belleza natural
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button asChild size="lg" className="bg-pink-500 text-white text-lg sm:text-xl hover:bg-pink-600 w-full sm:w-auto">
            <Link href="/reservation">Reserva Ya</Link>
          </Button>
          <Button asChild
            size="lg"
            variant="outline"
            className="text-black text-lg sm:text-xl bg-white border-white hover:bg-gray-100 hover:text-black w-full sm:w-auto"
          >
            <Link href="/chiky-services">Ver Servicios</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function ContactBar() {
  return (
    <div className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {/* Teléfono */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div className="text-center md:text-left">
              <p className="font-semibold text-lg">691 872 269</p>
              <p className="text-sm text-gray-300">Llámanos ahora</p>
            </div>
          </div>

          {/* Dirección */}
          <div className="flex items-center justify-center md:justify-center gap-3">
            <div className="bg-blue-500 rounded-full p-2 flex-shrink-0">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="text-center md:text-left">
              <p className="font-semibold text-lg">Carrer d'Elkano, 82 Bjs</p>
              <p className="text-sm text-gray-300">Sants-Montjuïc, 08004 Barcelona</p>
            </div>
          </div>

          {/* Horarios */}
          <div className="flex items-center justify-center md:justify-end gap-3">
            <div className="bg-pink-500 rounded-full p-2 flex-shrink-0">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div className="text-center md:text-left">
              <p className="font-semibold text-lg">Lunes a Sábado</p>
              <p className="text-sm text-gray-300">9:00 - 20:00 hrs • Domingo Cerrado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
