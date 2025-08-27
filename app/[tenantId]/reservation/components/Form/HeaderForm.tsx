import { CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Scissors, Sparkles, Star } from "lucide-react";
import React from "react";

export default function HeaderForm() {
  return (
    <div className="bg-gradient-to-r from-primary/70 via-primary/86 to-primary relative overflow-hidden rounded-b-sm lg:rounded-xl">
      <div className="absolute top-4 right-6 opacity-20">
        <Scissors className="h-16 w-16 text-white transform rotate-12 animate-pulse" />
      </div>
      <div className="absolute bottom-4 left-6 opacity-20">
        <Sparkles className="h-12 w-12 text-white animate-pulse" />
      </div>
      <div className="absolute top-8 left-1/4 opacity-15">
        <Star className="h-8 w-8 text-white animate-pulse" />
      </div>

      <CardHeader className="relative   -10 text-center lg:py-4 py-2">
       

        <CardTitle className="lg:text-4xl text-xl mt-5 lg:mt-0  font-bold text-white mb-3 tracking-wide">
          Reserva tu Cita
        </CardTitle>

        <p className="text-pink-100 lg:text-lg text-sm  font-semibold">
          Un espacio pensado para ti
        </p>

        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-1 w-12 bg-white/40 rounded-full"></div>
          <Heart className="h-4 w-4 text-white animate-pulse" />
          <div className="h-1 w-12 bg-white/40 rounded-full"></div>
        </div>
      </CardHeader>
    </div>
  );
}
