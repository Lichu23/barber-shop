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
import { useState } from "react";

interface HamburgerMenuProps {
  tenantId:string
  navLinks: { href: string; label: string }[];
}

export default function HamburgerMenu({ navLinks, tenantId }: HamburgerMenuProps) {
  const { isCustomDomain } = useTenant();
  const [open, setOpen] = useState(false); // Estado para controlar el Sheet

  const basePath = isCustomDomain ? "" : `/${tenantId}`;

  const finalLinks = navLinks.map((link) => ({
    ...link,
    href: `${basePath}${link.href}`,
  }));



  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden p-2">
          <Menu className="text-primary" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetTitle>
          <div className="p-6">
            <NavLinks
              vertical
              updatedLinks={finalLinks}
              onLinkClick={() => setOpen(false)} // Cerrar el menú al hacer clic
            />
          </div>
        </SheetTitle>
      </SheetContent>
    </Sheet>
  );
}
