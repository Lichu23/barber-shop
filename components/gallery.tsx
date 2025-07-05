"use client"

import { useState } from "react"
import { haircuts } from "@/constants/gallery"
import DesktopCarousel from "@/components/gallery/desktop-carousel"
import MobileCarousel from "@/components/gallery/mobile-carousel"

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % haircuts.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + haircuts.length) % haircuts.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section id="galeria" className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Nuestros Trabajos</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto hidden md:block">
            Descubre las transformaciones más espectaculares y encuentra la inspiración para tu nuevo look
          </p>
        </div>

        {/* Carrusel para Desktop */}
        <DesktopCarousel
          haircuts={haircuts}
          currentSlide={currentSlide}
          onPrevSlide={prevSlide}
          onNextSlide={nextSlide}
        />

        {/* Carrusel para Móvil */}
        <MobileCarousel
          haircuts={haircuts}
          currentSlide={currentSlide}
          onPrevSlide={prevSlide}
          onNextSlide={nextSlide}
        />

        {/* Indicadores de puntos */}
        <div className="flex justify-center mt-8 space-x-2">
          {haircuts.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-pink-500" : "bg-gray-300"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
