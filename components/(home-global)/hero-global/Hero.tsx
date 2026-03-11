import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Star, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-center items-center min-h-dvh px-4 overflow-hidden bg-zinc-950 animate-fade-in">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-amber-400 text-sm font-medium px-4 py-2 rounded-full">
          <Zap className="w-4 h-4" />
          Reservas automáticas con Google Calendar
        </div>

        {/* Headline */}
        <h1 className="font-extrabold text-5xl lg:text-7xl leading-tight text-white">
          Tu barbería online,{" "}
          <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            siempre abierta
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-zinc-400 text-lg lg:text-xl max-w-2xl leading-relaxed">
          Crea tu página web con reservas 24hs integradas en Google Calendar.
          Olvídate de las llamadas y céntrate en lo que mejor sabes hacer.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button
            size="lg"
            className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-5 text-base rounded-xl shadow-lg shadow-amber-500/20 transition-all"
            asChild
          >
            <Link
              href="https://wa.me/34623735521?text=Hola,%20estoy%20interesado%20en%20crear%20una%20pagina%20web."
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
            className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white px-8 py-5 text-base rounded-xl transition-all"
          >
            <Calendar className="mr-2 w-5 h-5" />
            Ver Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-8 pt-8 border-t border-zinc-800 w-full">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-extrabold text-white">+5</span>
            <span className="text-sm text-zinc-500">Barberías activas</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-extrabold text-white">24/7</span>
            <span className="text-sm text-zinc-500">Reservas online</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <span className="text-3xl font-extrabold text-white">4.9</span>
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <span className="text-sm text-zinc-500">Valoración media</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-extrabold text-white">1 mes</span>
            <span className="text-sm text-zinc-500">Gratis al empezar</span>
          </div>
        </div>
      </div>
    </section>
  );
}
