"use client";

import { useCarouselNavigation } from "@/hooks/useCarrouselNavigation";
import DesktopCarousel from "./desktop-carousel";
import MobileCarousel from "./mobile-carousel"; 
import { HaircutType } from "@/constants/gallery";

interface GalleryProps {
  haircuts: HaircutType[]; 
}

export default function Gallery({ haircuts }: GalleryProps) { 
  const totalImages = haircuts.length; 

  if (!haircuts || haircuts.length === 0) {
    return (
      <section id="galeria" className="py-16 text-center text-gray-600">
        <p>No hay imágenes en la galería para mostrar en este momento.</p>
      </section>
    );
  }


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
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary/70">
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

        <div className="hidden md:flex justify-center mt-10 space-x-2">
          {Array.from({ length: desktopTotalPages }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              className={`w-3 h-3 rounded-full transition-colors ${
                desktopCurrentSlideIndex >= pageIndex * 3 &&
                desktopCurrentSlideIndex < (pageIndex + 1) * 3
                  ? "bg-primary"
                  : "bg-secondary"
              }`}
              onClick={() => goToDesktopPage(pageIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
