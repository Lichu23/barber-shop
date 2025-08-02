"use client"; 

import Link from "next/link";
import { Button } from "@/components/ui/button"; 

interface SeeMoreButtonProps {
  tenantId: string; 
}

export default function SeeMoreButton({ tenantId }: SeeMoreButtonProps) {
  return (
    <div className="flex justify-center mt-8">
      <Button asChild size="lg" className="bg-primary hover:bg-primary/85 text-white text-lg">
        <Link href={`/${tenantId}/services`}>Ver todos los Servicios</Link>
      </Button>
    </div>
  );
}