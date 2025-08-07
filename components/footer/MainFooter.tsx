"use client"
import { useTenant } from "@/context/TenantProvider";
import {
  Clock,
  Facebook,
  Globe,
  Instagram,
  MapPin,
  Phone,
  X
} from "lucide-react";
import Link from "next/link";

interface FooterProps {
  salonName: string;
  tenantId: string;
  contactPhone?: string;
  contactAddress?: string;
  openingHoursSummary?: string;
  openingHoursDetail?: string;
  contactEmailForUsers?: string;
  socialInstagramUrl?: string;
  socialFacebookUrl?: string;
  socialTiktokUrl?: string;
  socialTwitterUrl?: string;
}

export default function Footer({
  salonName,
  tenantId,
  contactPhone,
  contactAddress,
  openingHoursSummary,
  openingHoursDetail,
  contactEmailForUsers,
  socialInstagramUrl,
  socialFacebookUrl,
  socialTiktokUrl,
  socialTwitterUrl,
}: FooterProps) {

  const {isCustomDomain} = useTenant()
      const basePath = isCustomDomain ? "" : `/${tenantId}`;
      const privacyPolicyLink = `${basePath}/privacy-policy`
      const termsOfServiceLink = `${basePath}/terms-of-service
`

  return (
    <footer className="bg-gray-900 text-white py-12 mt-36 lg:mt-5">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href={`/${tenantId}`} className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold">{salonName}</span>
          </Link>
          <p className="text-gray-400 text-sm">
            Tu espacio de belleza y estilo. Expertos en cuidar tu cabello.
          </p>
          <div className="flex space-x-4 mt-4">
            {socialInstagramUrl && (
              <a
                href={socialInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Instagram size={20} />
              </a>
            )}
            {socialFacebookUrl && (
              <a
                href={socialFacebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Facebook size={20} />
              </a>
            )}
            {socialTwitterUrl && (
              <a
                href={socialTwitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </a>
            )}
            {socialTiktokUrl && (
              <a
                href={socialTiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Globe size={20} />
              </a>
            )}{" "}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Contacto</h3>
          <ul className="space-y-2 text-gray-400">
            {contactPhone && (
              <li className="flex items-center gap-2">
                <Phone size={16} />{" "}
                <a href={`tel:${contactPhone}`}>{contactPhone}</a>
              </li>
            )}
            {contactAddress && (
              <li className="flex items-center gap-2">
                <MapPin size={16} /> {contactAddress}
              </li>
            )}
            {contactEmailForUsers && (
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5A2.25 2.25 0 0 0 2.25 6.75m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.903l-7.387 3.693a2.25 2.25 0 0 1-2.134 0l-7.387-3.693A2.25 2.25 0 0 1 2.25 6.993V6.75m19.5 0H2.25"
                  />
                </svg>
                <a href={`mailto:${contactEmailForUsers}`}>
                  {contactEmailForUsers}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Horarios</h3>
          <ul className="space-y-2 text-gray-400">
            {openingHoursSummary && (
              <li className="flex items-center gap-2">
                <Clock size={16} /> {openingHoursSummary}
              </li>
            )}
            {openingHoursDetail && (
              <li className="ml-6 text-sm">{openingHoursDetail}</li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link
                href={privacyPolicyLink}
                className="hover:text-white"
              >
                Política de Privacidad
              </Link>
            </li>
            <li>
              <Link
                href={termsOfServiceLink}
                className="hover:text-white"
              >
                Términos de Servicio
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} {salonName}. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
