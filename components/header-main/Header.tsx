"use client"
import { Scissors } from "lucide-react";
import Link from "next/link";
import HamburgerMenu from "./HamburguerMenu";
import NavLinks from "./nav-links";
import { useTenant } from "@/context/TenantProvider";

interface NavbarProps {
  salonName: string;
  tenantId: string;
  navLinks: { href: string; label: string }[];

}

export default function Navbar({ navLinks, salonName, tenantId }: NavbarProps) {
  const { isCustomDomain } = useTenant();

  const basePath = isCustomDomain ? "" : `/${tenantId}`;

  const finalLinks = navLinks.map((link) => ({
    ...link,
    href: `${basePath}${link.href}`,
  }));

  const homeLink = isCustomDomain ? "/" : `/${tenantId}`;

  return (
    <header className="bg-white text-black sticky top-0 z-50 shadow-md border-b border-gray-200 h-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex md:mt-1.5 items-center justify-between">
          <Link href={homeLink} className="flex items-center space-x-2">
            {" "}
            <Scissors className="h-8 w-8 text-primary" />{" "}
            <div>
              <h1 className="text-2xl font-bold text-black">{salonName}</h1>
            </div>
          </Link>
          <div className="hidden md:block">
            <NavLinks updatedLinks={finalLinks} />
          </div>

          <div className="md:hidden">
            <HamburgerMenu navLinks={finalLinks} tenantId={tenantId} />
          </div>
        </div>
      </div>
    </header>
  );
}
