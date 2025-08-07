import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./global.css";
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
  return (
    <html lang="es" className={`${lato.className}`}>
        <body>{children}</body>
    </html>
  );
}