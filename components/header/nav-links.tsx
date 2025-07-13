import Link from "next/link"
import { navigationLinks } from "@/constants/navigation"

export default function NavLinks({ vertical = false }) {
  return (
    <nav className={`${vertical ? "flex flex-col space-y-4" : "hidden md:flex space-x-6"}`}>
      {navigationLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:text-pink-500 fontbold transition-colors font-bold"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
