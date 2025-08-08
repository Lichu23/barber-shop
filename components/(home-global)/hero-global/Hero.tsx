import React from "react";
import FeatureCards from "./FeatureCards";
import { Globe, Calendar, Smartphone } from "lucide-react";

export default function Hero() {
  const features = [
    { icon: Globe, title: "Pagina Web Profesional" },
    { icon: Calendar, title: "Reservas Automaticas" },
    { icon: Smartphone, title: "100% Responsive" },
  ];
  return (
    <div className="flex flex-col lg:justify-center items-center mx-auto h-dvh lg:h-dvh bg-blue-300 px-8 text-white">
      <div className="flex flex-col mt-14 lg:mt-0 gap-5">
        <h1 className="font-bold text-5xl">
          Páginas Web con{" "}
          <span className="text-blue-900">Sistema de Reservas</span>
        </h1>
        <p className="font-semibold text-lg text-white   ">
          En <span className="font-bold text-blue-900">Lichu.org</span>{" "}
          transformamos tu negocio con páginas web profesionales que incluyen un
          sistema de reservas integrado con Google Calendar. Tus clientes
          reservan, tú te enfocas en brindar el servicio.
        </p>

        {features.map((feature) => (
        <FeatureCards
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
        />
      ))}
      </div>
    </div>
    
  );
}
