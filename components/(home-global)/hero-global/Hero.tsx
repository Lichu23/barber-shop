import React from "react";
import FeatureCards from "./FeatureCards";
import { Globe, Calendar, Eye, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  const features = [
    { icon: Globe, title: "Pagina Web Profesional" },
    { icon: Calendar, title: "Reservas Automaticas" },
    { icon: Eye, title: "Aumento de Visibilidad" },
  ];

  return (
    <div className="flex flex-col justify-center lg:justify-center items-center mx-auto h-dvh px-4  bg-gradient-to-b from-sky-50 via-white to-sky-100 ">
      <div className="flex flex-col  gap-8 lg:gap-14 lg:max-w-4xl">
        <h1 className="font-bold text-4xl lg:text-6xl bg-gradient-to-r from-sky-600 via-sky-300 to-sky-700 bg-clip-text text-transparent">
          Páginas Web con Reservas 24hs
        </h1>
        <p className=" text-lg  lg:text-3xl lg:max-w-4xl text-sky-800">
          <span className="font-bold">
            Gana visibilidad para tu negocio y consigue nuevos clientes.{" "}
          </span>{" "}
          <br />
          Con nuestras paginas web personalizadas con reservas online y liberate
          de las llamadas para dedicarte por completo a tu trabajo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            className="bg-sky-400 to-sky-300 hover:bg-sky-300 hover:to-sky-400 text-white px-8 py-5 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Comenzar Ahora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-sky-300 flex gap-2 text-sky-600 hover:bg-sky-50 hover:text-sky-400 lg:px-8 lg:py-5 text-lg rounded-xl "
          >
            <Play className=""/>
            Ver Demo
          </Button>
        </div>
        {/* {features.map((feature) => (
            <FeatureCards
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
            />
          ))} */}
      </div>
    </div>
  );
}
