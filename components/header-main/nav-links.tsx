import { NavigationLink } from "@/constants/navigation";
import Link from "next/link";

interface NavLinksProps {
  vertical?: boolean; 
  navLinks: NavigationLink[]; 
}

export default function NavLinks({ vertical = false, navLinks }: NavLinksProps) {
    return (
    <nav className={`${vertical ? "flex flex-col space-y-4" : "hidden md:flex space-x-6"}`}>
      {navLinks.map((link) => ( 
        <Link
          key={link.href}
          href={link.href}
          className="hover:text-primary fontbold transition-colors font-bold"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

}
