import { Scissors } from "lucide-react";
import NavLinks from "@/components/header/nav-links";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white text-black sticky top-0 z-50 shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Scissors className="h-8 w-8 text-pink-500" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-black">
                Chiky Peluquería
              </h1>
              <p className="text-xs text-pink-500">Belleza Femenina</p>
            </div>
          </div>
          <NavLinks />
        </div>
      </div>
    </header>
  );
}
