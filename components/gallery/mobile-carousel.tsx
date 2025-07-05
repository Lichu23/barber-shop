"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { HaircutType } from "@/constants/gallery"

interface MobileCarouselProps {
  haircuts: HaircutType[]
  currentSlide: number
  onPrevSlide: () => void
  onNextSlide: () => void
}

export default function MobileCarousel({ haircuts, currentSlide, onPrevSlide, onNextSlide }: MobileCarouselProps) {
  return (
    <div className="md:hidden">
      <div className="relative">
        <Card className="overflow-hidden hover:shadow-lg transition-shadow border-pink-100">
          <div className="relative aspect-[4/5]">
            <Image
              src={haircuts[currentSlide].image || "/placeholder.svg"}
              alt={haircuts[currentSlide].name}
              fill
              loading="lazy"
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg text-center mb-2 text-gray-800">{haircuts[currentSlide].name}</h3>
            <p className="text-gray-600 text-sm text-center hidden md:block">{haircuts[currentSlide].description}</p>
          </div>
        </Card>

        {/* Controles del carrusel móvil */}
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
