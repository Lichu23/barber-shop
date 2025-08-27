"use client";
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
    <header className="bg-white text-black sticky top-0 z-50 shadow-md border-b border-gray-200 mx-auto">
      <div className="flex items-center justify-between lg:px-4 pl-4 pr-1 py-2 lg:py-4">
        <Link href={homeLink} className="flex items-center gap-2">
          <Scissors className="text-primary" />
          <h1 className="text-xl lg:text-2xl font-bold text-black">
            {salonName}
          </h1>
        </Link>
        <div>
          <NavLinks updatedLinks={finalLinks} />

          <div className="md:hidden">
            <HamburgerMenu navLinks={navLinks} tenantId={tenantId} />
          </div>
        </div>
      </div>
    </header>
  );
}
