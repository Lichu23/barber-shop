import Footer from "@/components/footer/footer";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/toaster";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <Header />
        {children}
        <Toaster />
        <Footer />
      </main>
    </>
  );
}
