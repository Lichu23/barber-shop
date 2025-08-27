import { NavigationLink } from "@/constants/navigation";
import Link from "next/link";

interface NavLinksProps {
  vertical?: boolean;
  updatedLinks: { href: string; label: string }[];
  onLinkClick?: () => void;
}

export default function NavLinks({
  vertical = false,
  updatedLinks,
  onLinkClick,
}: NavLinksProps) {
  return (
    <nav
      className={`${vertical ? "flex flex-col space-y-4" : "hidden md:flex space-x-6"}`}
    >
      {updatedLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-gray-600 hover:text-primary font-medium"
          onClick={onLinkClick}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
