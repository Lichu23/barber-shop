import Header from "@/components/header"
import Hero from "@/components/hero"
import Gallery from "@/components/gallery"
import Services from "@/components/services"
import Footer from "@/components/footer"
import GDPRBanner from "@/components/gdpr/gdpr-banner"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Gallery />
      <Services />
      <Footer />
      <GDPRBanner />
    </main>
  )
}
