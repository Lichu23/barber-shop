import { HandHeart, Heart, Palette, Scissors, Sparkles, Star, Wand2 } from "lucide-react";

export interface ServiceOption {
  id?: string; // El ID de Supabase
  tenant_id: string; // ID del tenant al que pertenece
  name: string; // Nombre del servicio (ej. "Balayage")
  description?: string; // Descripción del servicio (puede ser opcional si no la usas)
  price: number; // Precio del servicio
  image_url?: string; // URL del icono/imagen (si aplica)
  value: string; // Valor interno del servicio (ej. "balayage", usado en el formulario)
  order?: number; // Opcional, para ordenar
  category: string; // Nombre de la categoría/sección (ej. "Servicios Principales")
  icon_name?: string; // Nombre del icono de Lucide (ej. "Palette")
}

export const lucideIconsMap: Record<string, React.ElementType> = {
  Palette: Palette,
  Sparkles: Sparkles,
  Scissors: Scissors,
  Star: Star,
  Heart: Heart,
  HandHeart: HandHeart,
  Wand2: Wand2,
  // Añade aquí todos los iconos que uses
};
