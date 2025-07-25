// components/mobile-carousel.tsx
"use client"

import { useState, TouchEvent } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { HaircutType } from "@/constants/gallery";

interface MobileCarouselProps {
  haircuts: HaircutType[];
}

export default function MobileCarousel({ haircuts }: MobileCarouselProps) {
  // --- Estados del Componente ---
  const [currentIndex, setCurrentIndex] = useState(0); // Índice del slide actual
  const [touchStartX, setTouchStartX] = useState(0);   // Posición X donde empieza el toque
  const [touchMoveX, setTouchMoveX] = useState(0);   // Posición X mientras se mueve el dedo
  const [isDragging, setIsDragging] = useState(false); // Bandera para saber si se está deslizando

  // --- Lógica del Deslizamiento ---
  const handleTouchStart = (e: TouchEvent) => {
    // Guardamos la posición inicial del dedo y reiniciamos el movimiento
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchMoveX(0); // Reseteamos el movimiento en cada nuevo toque
    setIsDragging(true); // Empezamos a arrastrar
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    // Calculamos cuánto se ha movido el dedo desde el inicio
    const currentX = e.targetTouches[0].clientX;
    setTouchMoveX(currentX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false); // Terminamos el arrastre

    const dragThreshold = 50; // Umbral de 50px para considerarlo un "swipe"

    // Si el deslizamiento fue hacia la izquierda y superó el umbral
    if (touchMoveX < -dragThreshold && currentIndex < haircuts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    // Si el deslizamiento fue hacia la derecha y superó el umbral
    else if (touchMoveX > dragThreshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    
    // Reseteamos el movimiento para que no haya salto visual
    setTouchMoveX(0);
  };

  // --- Estilos Dinámicos ---
  const containerStyle = {
    // Movemos el contenedor entero basado en el índice actual
    transform: `translateX(-${currentIndex * 100}%)`,
    // Añadimos la pequeña animación de deslizamiento solo cuando no se está arrastrando
    transition: !isDragging ? "transform 0.3s ease-out" : "none",
  };

  const dragStyle = {
    // Este estilo se aplica solo mientras arrastramos para el efecto visual inmediato
    transform: `translateX(${touchMoveX}px)`,
  };

  return (
    <div className="md:hidden overflow-hidden">
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={containerStyle}
        className="flex"
      >
        {haircuts.map((haircut) => (
          <div key={haircut.id || haircut.name} className="flex-shrink-0 w-full min-w-0 p-4">
            {/* Aplicamos el estilo de arrastre aquí */}
            <div style={isDragging ? dragStyle : {}}>
              <Card className="overflow-hidden h-full border-pink-100">
                 <div className="relative aspect-square">
                   <Image
                     src={haircut.image || "/placeholder.svg"}
                     alt={haircut.name}
                     fill
                     loading="lazy"
                     className="object-cover"
                     // Evitar que la imagen sea arrastrable por sí sola
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
      
      {/* Opcional: Indicadores de posición (puntos) */}
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