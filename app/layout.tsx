import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';

import "./global.css"
import { Toaster } from 'sonner';


const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: 'Lichu.org',
  description: 'Servicio de paginas web personalizadas con reservas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={lato.className}>
      <body>
        <Toaster richColors/>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}