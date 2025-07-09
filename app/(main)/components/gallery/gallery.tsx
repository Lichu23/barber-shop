// components/gallery.tsx
"use client";

import { haircuts } from "@/constants/gallery"; // Asegúrate de que esta ruta sea correcta
import DesktopCarousel from "./desktop-carousel";
import MobileCarousel from "./mobile-carousel"; // Asegúrate de que esta ruta sea correcta
import { useCarouselNavigation } from "@/hooks/useCarrouselNavigation";

export default function Gallery() {
  const totalImages = haircuts.length; // Cantidad total de imágenes disponibles

  // --- Hook para el Carrusel de Escritorio (3 imágenes por página) ---
  const {
    currentSlideIndex: desktopCurrentSlideIndex,
    nextSlide: nextDesktopSlide,
    prevSlide: prevDesktopSlide,
    goToSlide: goToDesktopPage,
    totalPages: desktopTotalPages,
  } = useCarouselNavigation({
    totalItems: totalImages,
    itemsPerPage: 3, // 3 imágenes por vista para desktop
    loop: true, // Queremos loop infinito
  });

  // --- Hook para el Carrusel Móvil (asumiendo 1 imagen por página) ---
  const {
    currentSlideIndex: mobileCurrentSlideIndex,
    nextSlide: nextMobileSlide,
    prevSlide: prevMobileSlide,
    goToSlide: goToMobileSlide,
  } = useCarouselNavigation({
    totalItems: totalImages,
    itemsPerPage: 1, // 1 imagen por vista para móvil
    loop: true, // Queremos loop infinito
  });

  return (
    <section id="galeria" className="py-20">
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

        {/* Carrusel para Desktop */}
        <DesktopCarousel
          haircuts={haircuts} // Pasa el array completo de imágenes
          currentSlide={desktopCurrentSlideIndex} // El hook nos da el índice de inicio
          onPrevSlide={prevDesktopSlide}
          onNextSlide={nextDesktopSlide}
        />

        {/* Carrusel para Móvil */}
        {/* Asume que MobileCarousel también puede usar `currentSlide` como un índice de inicio
            y que internamente aplicará `slice` para mostrar 1 imagen, o simplemente mostrará
            haircuts[currentSlide]. Si tu MobileCarousel ya está diseñado para mostrar 1 imagen a la vez
            con un índice de 0 a `haircuts.length - 1`, esta configuración es correcta.
        */}
        <MobileCarousel
          haircuts={haircuts}
          currentSlide={mobileCurrentSlideIndex}
          onPrevSlide={prevMobileSlide}
          onNextSlide={nextMobileSlide}
        />

        {/* Indicadores de puntos para el carrusel de ESCRITORIO */}
        {/* Son para los "grupos" de 3 imágenes */}
        <div className="hidden md:flex justify-center mt-8 space-x-2">
          {Array.from({ length: desktopTotalPages }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              className={`w-3 h-3 rounded-full transition-colors ${
                // Activa el punto si el `currentSlideIndex` del desktop está en este grupo
                desktopCurrentSlideIndex >= pageIndex * 3 && // Usamos 3 (imagesPerPageDesktop) directamente aquí
                desktopCurrentSlideIndex < (pageIndex + 1) * 3
                  ? "bg-pink-500"
                  : "bg-gray-300"
              }`}
              onClick={() => goToDesktopPage(pageIndex)}
            />
          ))}
        </div>

        {/* Indicadores de puntos para el carrusel MÓVIL */}
        {/* Son para cada imagen individual */}
        <div className="flex justify-center mt-8 space-x-2 md:hidden">
          {haircuts.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === mobileCurrentSlideIndex
                  ? "bg-pink-500"
                  : "bg-gray-300"
              }`}
              onClick={() => goToMobileSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
