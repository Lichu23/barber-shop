// components/ui/LoadingFemenino.tsx
"use client"; // Marca como Client Component si es necesario

import { Loader2, Scissors } from "lucide-react"; // Loader2 para el spinner, Scissors para un toque temático
import React from "react";

interface LoadingFemeninoProps {
  text?: string;
  className?: string;
}

const LoadingFemenino: React.FC<LoadingFemeninoProps> = ({
  text = "Cargando...",
  className,
}) => {
    
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 p-8 rounded-lg bg-primary/10 shadow-lg ${className}`}>
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <Scissors className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-primary" />
      </div>
      <p className="text-lg font-semibold text-primary text-center">
        {text}
      </p>
      <p className="text-sm text-primary text-center">
        Un momento, por favor...
      </p>
    </div>
  );
};

export default LoadingFemenino;