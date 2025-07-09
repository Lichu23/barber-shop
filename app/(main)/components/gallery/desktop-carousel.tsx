// components/desktop-carousel.tsx
"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { HaircutType } from "@/constants/gallery" // Asegúrate de que esta ruta sea correcta

interface DesktopCarouselProps {
  haircuts: HaircutType[] // Este array ya contendrá TODAS las imágenes
  currentSlide: number // Este `currentSlide` es el índice de inicio del grupo actual
  onPrevSlide: () => void
  onNextSlide: () => void
}

export default function DesktopCarousel({ haircuts, currentSlide, onPrevSlide, onNextSlide }: DesktopCarouselProps) {
  const imagesPerPage = 3; // Cuántas imágenes mostrar en la vista de escritorio

  // Aquí es donde se "corta" el array de `haircuts` para mostrar solo las 3 visibles
  const visibleHaircuts = haircuts.slice(currentSlide, currentSlide + imagesPerPage);

  // Opcional: Si quieres que el carrusel se "rellene" con imágenes del principio
  // cuando no hay suficientes al final para completar el set de 3 (para un loop visual más suave),
  // la lógica sería más compleja y generalmente requiere duplicar elementos al inicio/final.
  // Pero para un loop "lógico" con índices, `slice` y la gestión del padre es suficiente.

  return (
    <div className="hidden md:block">
      <div className="relative">
        <div className="grid grid-cols-3 gap-6">
          {/* Mapeamos solo las imágenes visibles */}
          {visibleHaircuts.map((haircut) => (
            <Card key={haircut.id || haircut.name} className="overflow-hidden hover:shadow-lg transition-shadow border-pink-100">
              <div className="relative aspect-[4/5]">
                <Image
                  src={haircut.image || "/placeholder.svg"}
                  alt={haircut.name}
                  fill
                  loading="lazy"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-center mb-2 text-gray-800">{haircut.name}</h3>
                <p className="text-gray-600 text-sm text-center">{haircut.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Controles del carrusel */}
        {/* Los botones no necesitan estar deshabilitados si el loop es infinito */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-pink-200 text-pink-500 hover:text-pink-600"
          onClick={onPrevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-pink-200 text-pink-500 hover:text-pink-600"
          onClick={onNextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}