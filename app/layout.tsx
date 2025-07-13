import "./globals.css";
import type { Metadata } from "next"; // O lo que tengas aquí
import { ReservationProvider } from "../context/ReservationProvider";
import { Toaster } from "sonner";
import { Lato } from "next/font/google";
import { Suspense } from "react";
import LoadingFemenino from "@/components/ui/LoadingFemenino";

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
          <>
            <Suspense
              fallback={
                isFemaleSalon ? <LoadingFemenino /> : <div>Cargando...</div> // Puedes poner LoadingMasculino aquí si aplica
              }
            >
              {children}
              <Toaster richColors />
            </Suspense>
          </>
        </body>
      </ReservationProvider>
    </html>
  );
}
