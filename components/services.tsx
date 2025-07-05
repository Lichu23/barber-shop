import { mainServices, additionalServices, specialPackages } from "@/constants/services"
import ServiceCard from "@/components/services/service-card"
import AdditionalServiceCard from "@/components/services/additional-service-card"
import PackageCard from "@/components/services/package-card"

export default function Services() {
  return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Nuestros Servicios</h2>
        </div>

        {/* Servicios principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mainServices.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        {/* Servicios adicionales */}
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-8 border border-pink-100">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Servicios Adicionales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalServices.map((service, index) => (
              <AdditionalServiceCard key={index} service={service} />
            ))}
          </div>
        </div>

        {/* Paquetes especiales */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Paquetes Especiales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialPackages.map((pkg, index) => (
              <PackageCard key={index} package={pkg} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
