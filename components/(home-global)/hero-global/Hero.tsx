import React from "react";
import FeatureCards from "./FeatureCards";
import { Globe, Calendar, Eye } from "lucide-react";

export default function Hero() {
  const features = [
    { icon: Globe, title: "Pagina Web Profesional" },
    { icon: Calendar, title: "Reservas Automaticas" },
    { icon: Eye, title: "Aumento de Visibilidad" },
  ];
  
  return (
    <div className="flex flex-col justify-center lg:justify-center items-center mx-auto h-dvh px-4  bg-gradient-to-b  from-sky-400 to-sky-300 text-white">
      <div className="flex flex-col  gap-8 lg:gap-14 lg:max-w-4xl">
        <h1 className="font-bold text-4xl lg:text-6xl">
          Páginas Web con{" "}
          <span className="text-blue-900">Reservas 24hs</span>
        </h1>
        <p className=" text-lg text-white lg:text-3xl lg:max-w-4xl">
          <span className="font-bold">Gana visibilidad para tu negocio y consigue nuevos clientes. </span> <br />
          Con nuestras paginas web personalizadas con reservas online y liberate de las llamadas para dedicarte por completo a tu trabajo.    
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
