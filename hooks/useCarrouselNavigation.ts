"use client";

// hooks/useCarouselNavigation.ts
import { useState, useCallback } from 'react';

interface UseCarouselNavigationProps {
  totalItems: number;
  itemsPerPage: number;
  initialIndex?: number;
  loop?: boolean; // Para controlar si queremos loop o no
}

interface UseCarouselNavigationResult {
  currentSlideIndex: number;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  totalPages: number; // Útil para los indicadores de puntos
}

export function useCarouselNavigation({
  totalItems,
  itemsPerPage,
  initialIndex = 0,
  loop = true,
}: UseCarouselNavigationProps): UseCarouselNavigationResult {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialIndex);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Navegación hacia adelante
  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => {
      let newIndex = prevIndex + itemsPerPage;
      if (loop && newIndex >= totalItems) {
        return 0; // Vuelve al principio si el loop está activado y llegamos al final
      }
      // Si no hay loop o no hemos llegado al final, no permitimos ir más allá del último grupo
      return Math.min(newIndex, totalItems - (totalItems % itemsPerPage === 0 ? itemsPerPage : totalItems % itemsPerPage));
    });
  }, [totalItems, itemsPerPage, loop]);

  // Navegación hacia atrás
  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => {
      let newIndex = prevIndex - itemsPerPage;
      if (loop && newIndex < 0) {
        // Vuelve al último grupo si el loop está activado y nos pasamos del principio
        if (totalItems % itemsPerPage !== 0) {
            return totalItems - (totalItems % itemsPerPage);
        } else {
            return totalItems - itemsPerPage;
        }
      }
      // Si no hay loop o no hemos llegado al principio, no permitimos ir más allá de 0
      return Math.max(0, newIndex);
    });
  }, [totalItems, itemsPerPage, loop]);

  // Navegación a un slide específico (útil para los puntos)
  const goToSlide = useCallback((pageIndex: number) => {
    setCurrentSlideIndex(pageIndex * itemsPerPage);
  }, [itemsPerPage]);

  return {
    currentSlideIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    totalPages,
  };
}