
export interface HaircutType {
  id?: string; // El ID de Supabase
  tenant_id: string; // ID del tenant al que pertenece
  image_url: string; // URL de la imagen
  name: string;      // Nombre del corte
  description: string; // Descripción del corte
  order?: number;    // Opcional, para ordenar
}