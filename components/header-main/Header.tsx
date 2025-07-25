import { Scissors } from "lucide-react";
import Link from "next/link";
import HamburgerMenu from "./HamburguerMenu";
import NavLinks from "./nav-links";

export default function Header() {
  return (
    <header className="bg-white text-black sticky top-0 z-50 shadow-md border-b border-gray-200 h-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Scissors className="h-8 w-8 text-pink-500" />
            <div>
              <h1 className="text-2xl font-bold text-black">
                Chiky Peluquería
              </h1>
              <p className="text-xs text-pink-500">Belleza Femenina</p>
            </div>
          </Link>
          <div className="hidden md:block">
            <NavLinks />
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
