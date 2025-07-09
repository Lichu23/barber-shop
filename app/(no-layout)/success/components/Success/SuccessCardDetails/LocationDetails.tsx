import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LocationDetails() {
  const chikyDireccion = "https://www.google.com/maps/place/Peluqueria+Latina+Chiky/@41.3741889,2.1573992,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4a265d7ffcf57:0xb70d1351b6080e80!8m2!3d41.3741889!4d2.1599741!16s%2Fg%2F11b7dzd2rc?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"; // Placeholder URL

  return (
    <div className="bg-gradient-to-r from-indigo-50/50 to-blue-50/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-indigo-100">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="p-2 sm:p-3 bg-indigo-100 rounded-full">
          <MapPin className="h-4 w-4 sm:h-6 sm:w-6 text-indigo-600" />
        </div>
        <h3 className="text-lg sm:text-2xl font-bold text-gray-800">
          Ubicación
        </h3>
      </div>
      <div className="bg-white/70 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-indigo-200">
        <p className="text-sm sm:font-bold font-semibold text-gray-800 mb-1">
          Chiky Peluquería
        </p>
        <p className="text-xs sm:text-base text-gray-600 mb-3 leading-relaxed">
          Carrer d'Elkano, 82 Bjs
          <br />
          Sants-Montjuïc, 08004 Barcelona
        </p>
        <Button
          asChild
          className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg text-sm sm:text-base"
        >
          <a href={chikyDireccion} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Ver en Google Maps
          </a>
        </Button>
      </div>
    </div>
  );
}