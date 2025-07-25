// components/gallery.tsx
"use client";

import { haircuts } from "@/constants/gallery"; 
import { useCarouselNavigation } from "@/hooks/useCarrouselNavigation";
import DesktopCarousel from "./desktop-carousel";
import MobileCarousel from "./mobile-carousel"; 

export default function Gallery() {
  const totalImages = haircuts.length; 

  // --- Hook para el Carrusel de Escritorio (3 imágenes por página) ---
  const {
    currentSlideIndex: desktopCurrentSlideIndex,
    nextSlide: nextDesktopSlide,
    prevSlide: prevDesktopSlide,
    goToSlide: goToDesktopPage,
    totalPages: desktopTotalPages,
  } = useCarouselNavigation({
    totalItems: totalImages,
    itemsPerPage: 3, 
    loop: true, 
  });


  return (
    <section id="galeria">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Nuestros Trabajos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto hidden md:block">
            Descubre las transformaciones más espectaculares y encuentra la
            inspiración para tu nuevo look
          </p>
        </div>

        <DesktopCarousel
          haircuts={haircuts}
          currentSlide={desktopCurrentSlideIndex}
          onPrevSlide={prevDesktopSlide}
          onNextSlide={nextDesktopSlide}
        />

        <MobileCarousel haircuts={haircuts} />

        <div className="hidden md:flex justify-center mt-8 space-x-2">
          {Array.from({ length: desktopTotalPages }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              className={`w-3 h-3 rounded-full transition-colors ${
                desktopCurrentSlideIndex >= pageIndex * 3 &&
                desktopCurrentSlideIndex < (pageIndex + 1) * 3
                  ? "bg-pink-500"
                  : "bg-gray-300"
              }`}
              onClick={() => goToDesktopPage(pageIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
