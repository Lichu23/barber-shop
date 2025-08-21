import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Eye, Globe, Play } from "lucide-react";
import Link from "next/link";

export default function Hero() {
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
            asChild
          >
            <Link
              href="https://wa.me/34623735521?text=Hola,%20estoy%20interesado%20en%crear%20una%20pagina%20web."
              target="_blank"
              rel="noopener noreferrer"
            >
              Comenzar Ahora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-sky-300 flex gap-2 text-sky-600 hover:bg-sky-50 hover:text-sky-400 lg:px-8 lg:py-5 text-lg rounded-xl "
          >
            <Play className="" />
            Ver Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
