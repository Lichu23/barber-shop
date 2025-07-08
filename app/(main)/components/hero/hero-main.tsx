import { Button } from "@/components/ui/button"
import Image from "next/image"
import { heroContent } from "@/constants/hero"

export default function HeroMain() {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <Image
        src={heroContent.backgroundImage || "/placeholder.svg"}
        alt={heroContent.backgroundAlt}
        fill
        className="object-cover"
        priority
        quality={60}
      />
      <div className="relative z-20 text-center text-white px-4 w-full max-w-4xl mx-auto">
        <h2
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        >
          {heroContent.title} <span className="text-pink-300">{heroContent.titleHighlight}</span>
        </h2>
        <p
          className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
        >
          {heroContent.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button size="lg" className="bg-pink-500 text-white text-lg sm:text-xl hover:bg-pink-600 w-full sm:w-auto">
            {heroContent.primaryButton}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-black text-lg sm:text-xl bg-white border-white hover:bg-gray-100 hover:text-black w-full sm:w-auto"
          >
            {heroContent.secondaryButton}
          </Button>
        </div>
      </div>
    </div>
  )
}
