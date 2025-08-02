"use client"; 

import { Card, CardContent } from "@/components/ui/card";
import { ServiceOption } from "@/constants/services";
import {
  Palette, Sparkles, Scissors, Star, Heart, HandHeart, Wand2, 
  Gem, Smile, User, Flower2, Crown, Brush, 
} from 'lucide-react';


const LucideIconMap: Record<string, React.ElementType> = {
  Palette: Palette,
  Sparkles: Sparkles,
  Scissors: Scissors,
  Star: Star,
  Heart: Heart,
  HandHeart: HandHeart,
  Wand2: Wand2,
  Gem: Gem,
  Smile: Smile,
  User: User,
  Flower2: Flower2,
  Crown: Crown,
  Brush: Brush,
};

interface ServiceCardProps {
  service: ServiceOption; 
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = service.icon_name ? LucideIconMap[service.icon_name] : null;

  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0, 
    maximumFractionDigits: 2,
  }).format(service.price);

  return (
    <Card className="hover:shadow-lg transition-shadow border-pink-100 h-full flex flex-col justify-between">
      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center w-full">
          {IconComponent && ( // Renderiza el icono solo si IconComponent existe
            <div className="bg-primary/15 p-3 rounded-full mb-4 flex-shrink-0">
              <IconComponent className="h-8 w-8 text-primary" />
            </div>
          )}
          <div className="text-center w-full">
            <h3 className="font-semibold text-lg text-gray-800 mb-2">{service.name}</h3>
            {service.description && ( // Muestra la descripción si existe
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
            )}
          </div>
        </div>
        <span className="font-bold text-primary text-2xl mt-auto"> {/* mt-auto para empujar el precio al final */}
          {formattedPrice}
        </span>
      </CardContent>
    </Card>
  );
}