// components/mobile-carousel.tsx
"use client"

import { useState, useRef, TouchEvent } from "react"; // Añadimos useRef
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { HaircutType } from "@/constants/gallery";

interface MobileCarouselProps {
  haircuts: HaircutType[];
}

export default function MobileCarousel({ haircuts }: MobileCarouselProps) {
  // --- Estados del Componente ---
  const [currentIndex, setCurrentIndex] = useState(0); // Índice del slide actual
  const [translateX, setTranslateX] = useState(0); // Posición X actual del contenedor en píxeles
  const [isTransitioning, setIsTransitioning] = useState(false); // Para controlar la transición CSS
  const touchStartXRef = useRef(0); // Usamos ref para la posición inicial del toque (no causa re-render)
  const currentTranslateRef = useRef(0); // Usamos ref para la posición actual al inicio del toque
  const slideWidthRef = useRef(0); // Usamos ref para almacenar el ancho de un slide

  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const getSlideWidth = () => {
    if (carouselContainerRef.current) {
      const firstSlide = carouselContainerRef.current.children[0];
      if (firstSlide) {
        slideWidthRef.current = firstSlide.clientWidth;
        return firstSlide.clientWidth;
      }
    }
    return 0;
  };

  // --- Lógica del Deslizamiento ---
  const handleTouchStart = (e: TouchEvent) => {
    setIsTransitioning(false); // Desactivamos la transición durante el arrastre
    touchStartXRef.current = e.targetTouches[0].clientX;
    currentTranslateRef.current = translateX; // Guardamos la posición actual al inicio del arrastre
    getSlideWidth(); // Obtenemos el ancho del slide al inicio del arrastre
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!carouselContainerRef.current || slideWidthRef.current === 0) return;

    const currentTouchX = e.targetTouches[0].clientX;
    const diffX = currentTouchX - touchStartXRef.current; // Cuánto se ha movido el dedo
    
    // Calculamos la nueva posición del contenedor
    const maxTranslate = 0; // El punto más a la derecha (slide 0)
    const minTranslate = -(haircuts.length - 1) * slideWidthRef.current; // El punto más a la izquierda

    let newTranslate = currentTranslateRef.current + diffX;
    newTranslate = Math.max(minTranslate, newTranslate);
    newTranslate = Math.min(maxTranslate, newTranslate); 

    setTranslateX(newTranslate);
  };

  const handleTouchEnd = () => {
    setIsTransitioning(true); // Reactivamos la transición para el snap final

    if (slideWidthRef.current === 0) return;

    const movedBy = translateX - (-currentIndex * slideWidthRef.current);
    const dragThreshold = slideWidthRef.current / 3; 

    let newIndex = currentIndex;
    if (movedBy < -dragThreshold && currentIndex < haircuts.length - 1) {
      newIndex = currentIndex + 1; 
    } else if (movedBy > dragThreshold && currentIndex > 0) {
      newIndex = currentIndex - 1; 
    }

    // Actualizamos el índice y la posición final para que se ajuste al slide más cercano
    setCurrentIndex(newIndex);
    setTranslateX(-newIndex * slideWidthRef.current); // Snap a la posición exacta del nuevo slide
  };

  // --- Estilos Dinámicos ---
  const carouselTrackStyle: React.CSSProperties = {
    transform: `translateX(${translateX}px)`,
    transition: isTransitioning ? "transform 0.3s ease-out" : "none", 
  };

  return (
    <div className="md:hidden overflow-hidden">
      <div
        ref={carouselContainerRef} 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={carouselTrackStyle} 
        className="flex" 
      >
        {haircuts.map((haircut) => (
          <div key={haircut.id || haircut.name} className="flex-shrink-0 w-full min-w-0 p-4">
            <div> 
              <Card className="overflow-hidden h-full border-pink-100">
                <div className="relative aspect-square">
                  <Image
                    src={haircut.image || "/placeholder.svg"}
                    alt={haircut.name}
                    fill
                    loading="lazy"
                    className="object-cover"
                    draggable="false" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-center">{haircut.name}</h3>
                  <p className="text-gray-600 text-sm text-center">{haircut.description}</p>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-4 space-x-2">
        {haircuts.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              currentIndex === index ? 'bg-pink-500' : 'bg-pink-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}