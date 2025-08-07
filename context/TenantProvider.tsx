// app/providers/TenantProvider.tsx
"use client"; // Este archivo contendrá el hook, que se usa en el cliente.

import { createContext, useContext, ReactNode } from 'react';

// 1. Define la "forma" de los datos que compartiremos
interface TenantContextType {
  tenantId: string;
  isCustomDomain: boolean;
}

// 2. Crea el Context de React
// Le damos un valor inicial de `null`.
const TenantContext = createContext<TenantContextType | null>(null);

// 3. Crea el componente Provider
// Este componente recibirá los datos desde el servidor y los pasará al contexto.
interface TenantProviderProps {
  children: ReactNode;
  value: TenantContextType;
}

export function TenantProvider({ children, value }: TenantProviderProps) {
  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
}

// 4. Crea el Hook personalizado `useTenant`
// Este es el hook que usarás en tus componentes.
export function useTenant() {
  const context = useContext(TenantContext);

  // Si el contexto es null, significa que un componente está intentando
  // usar el hook fuera de donde está el Provider. Lanzamos un error.
  if (context === null) {
    throw new Error('useTenant debe ser usado dentro de un TenantProvider');
  }

  return context;
}