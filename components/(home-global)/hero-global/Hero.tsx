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
    <div className="flex flex-col justify-center lg:justify-center items-center mx-auto h-dvh px-4  bg-blue-300 text-white">
      <div className="flex flex-col  gap-5 lg:gap-8 ">
        <h1 className="font-bold text-4xl lg:text-6xl">
          Páginas Web con{" "}
          <span className="text-blue-900">Sistema de Reservas</span>
        </h1>
        <p className="font-semibold text-lg text-white lg:text-3xl lg:max-w-[600px]">
          En <span className="font-bold text-blue-900">Lichu.org</span> creamos
          tu pagina web personalizada con un sistema de reservas 
          conectado a tu google calendar.
        </p>

        <div className="flex flex-col gap-5 lg:flex-row">
          {features.map((feature) => (
            <FeatureCards
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
