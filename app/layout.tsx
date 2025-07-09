import "./globals.css";
import type { Metadata } from "next"; // O lo que tengas aquí
import { ReservationProvider } from "../context/ReservationProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Chiky Peluqueria",
  description: "Sistema de reservas para Chiky Peluqueria",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <ReservationProvider>
        <body>
          <>
            {children}
            <Toaster />
          </>
        </body>
      </ReservationProvider>
    </html>
  );
}
