// app/providers/TenantProvider.tsx
"use client"; // Este archivo contendrá el hook, que se usa en el cliente.

import { createContext, useContext, ReactNode } from 'react';

// 1. Define la "forma" de los datos que compartiremos
interface TenantContextType {
  tenantId: string;
  isCustomDomain: boolean;
}

const TenantContext = createContext<TenantContextType | null>(null);

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

export function useTenant() {
  const context = useContext(TenantContext);

  if (context === null) {
    throw new Error('useTenant debe ser usado dentro de un TenantProvider');
  }

  return context;
}