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
  navLinks: NavigationLink[]
}

export default function HamburgerMenu({ navLinks }: HamburgerMenuProps) { // Acepta navLinks
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
            <NavLinks vertical navLinks={navLinks} />
          </div>
        </SheetTitle>
      </SheetContent>
    </Sheet>
  );
}
