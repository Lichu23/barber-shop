import { Palette, Scissors, Sparkles, Crown, Star, Heart } from "lucide-react";

export const SERVICE_OPTIONS = [
  { value: "balayage", label: "Balayage - €85" },
  { value: "coloracion", label: "Coloración Capilar - €65" },
  { value: "estilismo", label: "Estilismo Capilar - €45" },
  { value: "extensiones", label: "Extensiones de Cabello - €120" },
  { value: "mechas", label: "Mechas - €55" },
  { value: "rizado", label: "Pelo Rizado - €40" },
  { value: "peinados", label: "Peinados - €35" },
  { value: "pelucas", label: "Colocación de Pelucas - €25" },
  { value: "completo", label: "Paquete Completo - €135" },
  { value: "novia", label: "Paquete Novia - €165" },
];

export const mainServices = [
  {
    icon: Palette,
    title: "Balayage",
    description:
      "Técnica francesa de coloración que ilumina tu cabello de forma natural y sofisticada",
    price: "€85",
  },
  {
    icon: Sparkles,
    title: "Coloración Capilar",
    description:
      "Transforma tu look con colores vibrantes y técnicas profesionales de última generación",
    price: "€65",
  },
  {
    icon: Scissors,
    title: "Estilismo Capilar",
    description:
      "Cortes personalizados que realzan tu personalidad y estilo único",
    price: "€45",
  },
  {
    icon: Star,
    title: "Extensiones de Cabello",
    description:
      "Cabello más largo y voluminoso al instante con extensiones de máxima calidad",
    price: "€120",
  },
  {
    icon: Heart,
    title: "Tratamientos Nutritivos",
    description:
      "Mascarillas y tratamientos que devuelven vida y brillo a tu cabello",
    price: "€50",
  },
];

export const additionalServices = [
  { name: "Mechas", price: "€55" },
  { name: "Pelo Rizado", price: "€40" },
  { name: "Peinados", price: "€35" },
  { name: "Colocación de Pelucas", price: "€25" },
  { name: "Tratamiento Capilar", price: "€30" },
  { name: "Lavado y Peinado", price: "€20" },
];

export const specialPackages = [
  {
    icon: Crown,
    title: "Paquete Completo",
    description: "Corte + Coloración + Peinado + Tratamiento",
    price: "€135",
    savings: "Ahorra €25",
    gradient: "from-rose-100 to-pink-100",
    border: "border-rose-200",
    iconColor: "text-rose-600",
    priceColor: "text-rose-600",
  },
  {
    icon: Heart,
    title: "Paquete Novia",
    description: "Peinado + Extensiones + Tratamiento Especial",
    price: "€165",
    savings: "Incluye prueba previa",
    gradient: "from-rose-100 to-pink-100",
    border: "border-rose-200",
    iconColor: "text-rose-600",
    priceColor: "text-rose-600",
  },
];

export type MainService = (typeof mainServices)[0];
export type AdditionalService = (typeof additionalServices)[0];
export type SpecialPackage = (typeof specialPackages)[0];
