import Link from "next/link"
import { navigationLinks } from "@/constants/navigation"

export default function NavLinks() {
  return (
    <nav className="hidden md:flex space-x-6">
      {navigationLinks.map((link) => (
        <Link key={link.href} href={link.href} className="hover:text-pink-500 transition-colors font-medium">
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
