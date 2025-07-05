"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { HaircutType } from "@/constants/gallery"

interface DesktopCarouselProps {
  haircuts: HaircutType[]
  currentSlide: number
  onPrevSlide: () => void
  onNextSlide: () => void
}

export default function DesktopCarousel({ haircuts, currentSlide, onPrevSlide, onNextSlide }: DesktopCarouselProps) {
  return (
    <div className="hidden md:block">
      <div className="relative">
        <div className="grid grid-cols-3 gap-6">
          {haircuts.map((haircut, index) => {
            const slideIndex = (currentSlide + index) % haircuts.length
            const currentHaircut = haircuts[slideIndex]
            return (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow border-pink-100">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={currentHaircut.image || "/placeholder.svg"}
                    alt={currentHaircut.name}
                    fill
                    loading="lazy"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-center mb-2 text-gray-800">{currentHaircut.name}</h3>
                  <p className="text-gray-600 text-sm text-center">{currentHaircut.description}</p>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Controles del carrusel */}
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
