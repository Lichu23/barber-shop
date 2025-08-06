import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Phone, MapPin, Clock } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  tenantId: string;
  salonName: string;
  slogan: string;
  description: string;
  imageUrl: string;
  contactPhone: string;
  contactAddress: string;
  openingHoursSummary: string;
  openingHoursDetail: string;
  contactEmailForUsers: string;
}

export default function Hero({
  tenantId,
  salonName, // Aunque no se usa aquí directamente, es bueno tenerlo en las props si se necesita.
  slogan,
  description,
  imageUrl,
  contactPhone,
  contactAddress,
  openingHoursSummary,
  openingHoursDetail,
}: HeroProps) {
  return (
    <section id="inicio" className="relative">
      <HeroMain
        tenantId={tenantId}
        slogan={slogan}
        description={description}
        imageUrl={imageUrl}
      />
      <ContactBar
        contactPhone={contactPhone}
        contactAddress={contactAddress}
        openingHoursSummary={openingHoursSummary}
        openingHoursDetail={openingHoursDetail}
      />
    </section>
  );
}

interface HeroMainProps {
  tenantId: string;
  slogan: string;
  description: string;
  imageUrl: string;
}

function HeroMain({ tenantId, slogan, description, imageUrl }: HeroMainProps) {
  return (
    <div className="relative h-[calc(100dvh-5rem)] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <Image
        src={imageUrl}
        fill
        className="object-cover"
        priority
        quality={60}
        alt={slogan}
      />

      <div className="relative z-20 text-center text-white px-4 w-full max-w-4xl mx-auto">
        <h2
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        >
          {slogan}
        </h2>
        <p
          className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
        >
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button
            asChild
            size="lg"
            className="bg-primary text-white text-lg sm:text-xl hover:bg-primary/90 w-full sm:w-auto"
          >
            <Link href={`/${tenantId}/select-services`}>Reserva Ya</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-secondary-foreground text-lg sm:text-xl bg-white border-white hover:bg-gray-100 hover:text-secondary-foreground w-full sm:w-auto"
          >
            <Link href={`/${tenantId}/services`}>Ver Servicios</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ContactBarProps {
  contactPhone: string;
  contactAddress: string;
  openingHoursSummary: string;
  openingHoursDetail: string;
}

function ContactBar({
  contactPhone,
  contactAddress,
  openingHoursSummary,
  openingHoursDetail,
}: ContactBarProps) {
  return (
    <div className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {contactPhone && (
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="bg-green-500 rounded-full p-2 flex-shrink-0">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div className="text-center md:text-left">
                <p className="font-semibold text-lg">{contactPhone}</p>
                <p className="text-sm text-gray-300">Llámanos ahora</p>
              </div>
            </div>
          )}

          {/* Dirección */}
          {contactAddress && (
            <div className="flex items-center justify-center md:justify-center gap-3">
              <div className="bg-blue-500 rounded-full p-2 flex-shrink-0">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div className="text-center md:text-left">
                <p className="font-semibold text-lg">{contactAddress}</p>
              </div>
            </div>
          )}

          {/* Horarios */}
          {openingHoursSummary && openingHoursDetail && (
            <div className="flex items-center justify-center md:justify-end gap-3">
              <div className="bg-primary rounded-full p-2 flex-shrink-0">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div className="text-center md:text-left">
                <p className="font-semibold text-lg">{openingHoursSummary}</p>
                <p className="text-sm text-gray-300">{openingHoursDetail}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
