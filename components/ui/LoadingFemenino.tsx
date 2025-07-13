// components/ui/LoadingFemenino.tsx
"use client"; // Marca como Client Component si es necesario

import { Loader2, Scissors } from "lucide-react"; // Loader2 para el spinner, Scissors para un toque temático
import React from "react";

interface LoadingFemeninoProps {
  /**
   * Texto opcional para mostrar junto al spinner.
   * Por defecto: "Estilizando tu look..."
   */
  text?: string;
  /**
   * Clase CSS adicional para el contenedor principal.
   */
  className?: string;
}

const LoadingFemenino: React.FC<LoadingFemeninoProps> = ({
  text = "Estilizando tu look...",
  className,
}) => {
    
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 p-8 rounded-lg bg-pink-50 shadow-lg ${className}`}>
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
        {/* Icono superpuesto para un toque temático */}
        <Scissors className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-pink-600" />
      </div>
      <p className="text-lg font-semibold text-pink-700 text-center">
        {text}
      </p>
      <p className="text-sm text-pink-500 text-center">
        Un momento, por favor...
      </p>
    </div>
  );
};

export default LoadingFemenino;