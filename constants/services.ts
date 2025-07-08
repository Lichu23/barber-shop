import {
  Palette,
  Sparkles,
  Scissors,
  Star,
  Heart,
  Crown,
  Flower2,
  User,
  Wand2,
  Gem,
  Smile,
  Brush,
  HandHeart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MainService = {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
};

export type AdditionalService = {
  name: string;
  price: string;
  icon: LucideIcon;
};

export type SpecialPackage = {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  savings?: string;
  border?: string;
  iconColor?: string;
  priceColor?: string;
};

export interface ServiceOption {
  value: string;
  label: string;
  price: number;
}

const href = "/chiky-services";

export const mainServices: MainService[] = [
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
  {
    icon: HandHeart,
    title: "Masaje Capilar Relajante",
    description:
      "Disfruta de un masaje capilar que estimula el cuero cabelludo y promueve el bienestar.",
    price: "€25",
  },
  {
    icon: Wand2,
    title: "Tratamiento Detox",
    description:
      "Elimina toxinas y revitaliza tu cabello con nuestro exclusivo tratamiento detox.",
    price: "€35",
  },
];

export const additionalServices: AdditionalService[] = [
  { name: "Mechas", price: "€55", icon: Gem },
  { name: "Pelo Rizado", price: "€40", icon: Smile },
  { name: "Peinados", price: "€35", icon: Star },
  { name: "Colocación de Pelucas", price: "€25", icon: User },
  { name: "Tratamiento Capilar", price: "€30", icon: Heart },
  { name: "Lavado y Peinado", price: "€20", icon: Scissors },
  { name: "Alisado de Keratina", price: "€70", icon: Flower2 },
  { name: "Recogidos para Eventos", price: "€45", icon: Crown },
  { name: "Maquillaje Exprés", price: "€30", icon: Brush },
];

export const specialPackages: SpecialPackage[] = [
  {
    icon: Crown,
    title: "Paquete Completo",
    description: "Corte + Coloración + Peinado + Tratamiento",
    price: "€135",
    savings: "Ahorra €25",
    iconColor: "text-rose-600",
    priceColor: "text-rose-600",
  },
  {
    icon: Heart,
    title: "Paquete Novia",
    description: "Peinado + Extensiones + Tratamiento Especial",
    price: "€165",
    savings: "Incluye prueba previa",
    border: "border-rose-200",
    iconColor: "text-rose-600",
    priceColor: "text-rose-600",
  },
  {
    icon: Flower2,
    title: "Paquete Fiesta",
    description: "Peinado + Maquillaje + Tratamiento Exprés",
    price: "€90",
    savings: "Ideal para eventos y celebraciones",
    iconColor: "text-pink-400",
    priceColor: "text-pink-600",
  },
];

export const mainServiceOptions: ServiceOption[] = [
  {
    value: "Balayage",
    label: "Balayage (€85)",
    price: 85,
  },
  {
    value: "Coloración Capilar",
    label: "Coloración Capilar (€65)",
    price: 65,
  },
  {
    value: "Estilismo Capilar",
    label: "Estilismo Capilar (€45)",
    price: 45,
  },
  {
    value: "Extensiones de Cabello",
    label: "Extensiones de Cabello (€120)",
    price: 120,
  },
  {
    value: "Tratamientos Nutritivos",
    label: "Tratamientos Nutritivos (€50)",
    price: 50,
  },
  {
    value: "Masaje Capilar Relajante",
    label: "Masaje Capilar Relajante (€25)",
    price: 25,
  },
  {
    value: "Tratamiento Detox",
    label: "Tratamiento Detox (€35)",
    price: 35,
  },
];

// 2. Opciones de servicios adicionales
export const additionalServiceOptions = [
  {
    value: "Mechas",
    label: "Mechas (€55)",
    price: 55,
  },
  {
    value: "Pelo Rizado",
    label: "Pelo Rizado (€40)",
    price: 40,
  },
  {
    value: "Peinados",
    label: "Peinados (€35)",
    price: 35,
  },
  {
    value: "Colocación de Pelucas",
    label: "Colocación de Pelucas (€25)",
    price: 25,
  },
  {
    value: "Tratamiento Capilar",
    label: "Tratamiento Capilar (€30)",
    price: 30,
  },
  {
    value: "Lavado y Peinado",
    label: "Lavado y Peinado (€20)",
    price: 20,
  },
  {
    value: "Alisado de Keratina",
    label: "Alisado de Keratina (€70)",
    price: 70,
  },
  {
    value: "Recogidos para Eventos",
    label: "Recogidos para Eventos (€45)",
    price: 45,
  },
  {
    value: "Maquillaje Exprés",
    label: "Maquillaje Exprés (€30)",
    price: 30,
  },
];

// 3. Opciones de paquetes especiales
export const specialPackageOptions = [
  {
    value: "Paquete Completo",
    label: "Paquete Completo (€135)",
    price: 135,
  },
  {
    value: "Paquete Novia",
    label: "Paquete Novia (€165)",
    price: 165,
  },
  {
    value: "Paquete Fiesta",
    label: "Paquete Fiesta (€90)",
    price: 90,
  },
];

export const allServiceOptions = [
  ...mainServiceOptions,
  ...additionalServiceOptions,
  ...specialPackageOptions,
];
