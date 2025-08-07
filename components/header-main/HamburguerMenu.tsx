// components/header/HamburgerMenu.jsx
"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTenant } from "@/context/TenantProvider";
import { Menu } from "lucide-react";
import NavLinks from "./nav-links";

interface HamburgerMenuProps {
  tenantId:string
  navLinks: { href: string; label: string }[];
}

export default function HamburgerMenu({ navLinks, tenantId }: HamburgerMenuProps) {
  const { isCustomDomain } = useTenant();

  const basePath = isCustomDomain ? "" : `/${tenantId}`;

  const finalLinks = navLinks.map((link) => ({
    ...link,
    href: `${basePath}${link.href}`,
  }));



  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="md:hidden p-2">
          <Menu className="h-7 w-7 text-primary" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetTitle>
          <div className="p-6">
            <NavLinks vertical updatedLinks={finalLinks} />
          </div>
        </SheetTitle>
      </SheetContent>
    </Sheet>
  );
}
