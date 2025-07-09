// app/layout.tsx
import { Toaster } from "sonner";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <main>
          {children}
          <Toaster position="top-center" richColors />
        </main>
      </body>
    </html>
  );
}
