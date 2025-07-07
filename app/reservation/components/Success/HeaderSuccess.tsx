import { CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Sparkles, Star, CheckCircle } from "lucide-react";

export function SuccessHeader() {
  return (
    <div className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/10"></div>

      {/* Elementos decorativos de fondo */}
      <div className="absolute top-4 right-6 opacity-20">
        <Heart className="h-16 w-16 text-white transform rotate-12 animate-pulse" />
      </div>
      <div className="absolute bottom-4 left-6 opacity-20">
        <Sparkles className="h-12 w-12 text-white animate-bounce" />
      </div>
      <div className="absolute top-8 left-1/4 opacity-15">
        <Star className="h-8 w-8 text-white animate-pulse delay-100" />
      </div>
      <div className="absolute bottom-8 right-1/4 opacity-15">
        <Star className="h-6 w-6 text-white animate-pulse delay-200" />
      </div>

      <CardHeader className="relative z-10 text-center py-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm animate-pulse">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <div className="flex gap-1">
            <Sparkles className="h-6 w-6 text-green-200 animate-pulse" />
            <Sparkles className="h-4 w-4 text-green-100 animate-pulse delay-100" />
          </div>
        </div>

        <CardTitle className="text-4xl font-bold text-white mb-3 tracking-wide">¡Reserva Confirmada! 🎉</CardTitle>

        <p className="text-green-100 text-lg font-medium">✨ Tu cita ha sido reservada exitosamente ✨</p>

        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-1 w-12 bg-white/40 rounded-full"></div>
          <CheckCircle className="h-4 w-4 text-green-200" />
          <div className="h-1 w-12 bg-white/40 rounded-full"></div>
        </div>
      </CardHeader>
    </div>
  )
}