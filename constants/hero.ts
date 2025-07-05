import { Phone, MapPin, Clock } from "lucide-react"

export const heroContent = {
  title: "Belleza y",
  titleHighlight: "Elegancia",
  description:
    "Tu peluquería de confianza en el corazón de la ciudad. Más de 15 años creando looks únicos y cuidando tu belleza natural",
  primaryButton: "Reserva Ya",
  secondaryButton: "Ver Servicios",
  backgroundImage: "/images/hero-fachada-chiky.png",
  backgroundAlt: "Chiky Peluquería - Fachada del local",
}

export const contactInfo = [
  {
    icon: Phone,
    title: "691 872 269",
    subtitle: "Llámanos ahora",
    bgColor: "bg-green-500",
  },
  {
    icon: MapPin,
    title: "Carrer d'Elkano, 82 Bjs",
    subtitle: "Sants-Montjuïc, 08004 Barcelona",
    bgColor: "bg-blue-500",
  },
  {
    icon: Clock,
    title: "Lunes a Sábado",
    subtitle: "9:00 - 20:00 hrs • Domingo Cerrado",
    bgColor: "bg-pink-500",
  },
]

export type ContactInfoItem = (typeof contactInfo)[0]
