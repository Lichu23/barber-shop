import { Scissors } from "lucide-react";
import Link from "next/link";
import HamburgerMenu from "./HamburguerMenu";
import NavLinks from "./nav-links";

interface NavbarProps {
  salonName: string;
  tenantId: string; 
  navLinks: { href: string; label: string }[];
  // Aquí puedes añadir props para logoUrl si tu logo es dinámico
  // logoUrl?: string;
}


export default function Navbar({navLinks, salonName, tenantId}: NavbarProps) {
  return (
    <header className="bg-white text-black sticky top-0 z-50 shadow-md border-b border-gray-200 h-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex md:mt-1.5 items-center justify-between">
          <Link href={`/${tenantId}`} className="flex items-center space-x-2"> {/* <-- Enlace Dinámico */}
            <Scissors className="h-8 w-8 text-primary" /> {/* Icono estático de tijeras */}
            <div>
              <h1 className="text-2xl font-bold text-black">
                {salonName} 
              </h1>
            </div>
          </Link>
          <div className="hidden md:block">
            <NavLinks navLinks={navLinks} /> 
          </div>
          
          <div className="md:hidden">
            <HamburgerMenu navLinks={navLinks} /> 
          </div>
        </div>
      </div>
    </header>
  );
}
