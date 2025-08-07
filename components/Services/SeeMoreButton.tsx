"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavigationLink } from "@/constants/navigation";
import { useTenant } from "@/context/TenantProvider";

interface SeeMoreButtonProps {
  tenantId: string;
}

export default function SeeMoreButton({ tenantId }: SeeMoreButtonProps) {
  const navLinks: NavigationLink[] = [
    { href: "/services", label: "Servicios" },
  ];

  const { isCustomDomain } = useTenant();
  const basePath = isCustomDomain ? "" : `/${tenantId}`;

  const servicesUrl = `${basePath}/services`;

  return (
    <div className="flex justify-center mt-8">
      <Button
        asChild
        size="lg"
        className="bg-primary hover:bg-primary/85 text-white text-lg"
      >
        <Link href={servicesUrl}>Ver todos los Servicios</Link>
      </Button>
    </div>
  );
}
