import Footer from "@/components/footer/MainFooter";
import Header from "@/components/header-main/Header";
import { Toaster } from "sonner";

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
        <Toaster  />

        <Footer />
      </main>
    </>
  );
}
