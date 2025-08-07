// components/header/HamburgerMenu.jsx
"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavLinks from "./nav-links";
import { NavigationLink } from "@/constants/navigation";

interface HamburgerMenuProps {
  tenantId:string
  navLinks: { href: string; label: string }[];
}

export default function HamburgerMenu({ navLinks, tenantId }: HamburgerMenuProps) {
  const updatedLinks = navLinks.map((link) => ({
    ...link,
    href: link.href.startsWith(`/${tenantId}`)
      ? link.href.substring(tenantId.length + 1)
      : link.href,
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
            <NavLinks vertical updatedLinks={updatedLinks} />
          </div>
        </SheetTitle>
      </SheetContent>
    </Sheet>
  );
}
