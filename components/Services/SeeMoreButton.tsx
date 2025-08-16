"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavigationLink } from "@/constants/navigation";
import { useTenant } from "@/context/TenantProvider";
import { LucideArrowRight } from "lucide-react";

interface SeeMoreButtonProps {
  tenantId?: string;
}

export default function SeeMoreButton({ tenantId }: SeeMoreButtonProps) {
  const navLinks: NavigationLink[] = [
    { href: "/services", label: "Servicios" },
  ];

  const { isCustomDomain } = useTenant();
  const basePath = isCustomDomain ? "" : `/${tenantId}`;

  const servicesUrl = `${basePath}/services`;

  return (
    <div className="flex items-center justify-center  lg:pr-10">
      <Button
        asChild
        size="lg"
        className="text-primary  text-lg lg:text-xl "
      >
        <Link href={servicesUrl}>Ver todos</Link>
      </Button>
      <LucideArrowRight className="text-primary "/>
    </div>
  );
}
