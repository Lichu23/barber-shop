import Footer from "@/components/footer/footer";
import Header from "@/components/header/Header";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main> {/* Aquí se renderizará el contenido de las páginas principales */}
      <Footer />
    </>
  );
}