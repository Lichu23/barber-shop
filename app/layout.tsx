import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export const metadata: Metadata = {
  title: "Chiky Peluqueria",
  description: "Peluqueria para mujeres ",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-white to-pink-50">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
