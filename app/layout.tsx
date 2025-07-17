import ClientLayoutWrapper from "@/components/(layout)/ClientLayoutWrapper";
import type { Metadata } from "next"; // O lo que tengas aquí
import { Lato } from "next/font/google";
import { ReservationProvider } from "../context/ReservationProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chiky Peluqueria",
  description: "Sistema de reservas para Chiky Peluqueria",
};

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});
const GDPR_STORAGE_KEY = "gdpr-consent";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isFemaleSalon = true; 

  return (
    <html lang="es" className={`${lato.className}`}>
      <ReservationProvider>
        <body>
          <ClientLayoutWrapper isFemaleSalon={isFemaleSalon}>
            {children}
          </ClientLayoutWrapper>
        </body>
      </ReservationProvider>
    </html>
  );

}
