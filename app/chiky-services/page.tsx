import { additionalServices, mainServices, specialPackages } from "@/constants/services";
import AdditionalServiceCard from "../(home)/components/servicesView/additional-service-card";
import PackageCard from "../(home)/components/servicesView/package-card";
import ServiceCard from "../(home)/components/servicesView/service-card";

export default function ServicesPage() {
    return (
    <main className="bg-gradient-to-b from-pink-50 to-white min-h-screen">
      <section id="servicios" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pink-600">Servicios para Ella</h1>
            <p className="text-lg md:text-xl text-gray-600">
              Descubre nuestra carta de servicios pensada para realzar tu belleza y cuidar tu cabello con los mejores productos y técnicas del mercado.
            </p>
          </div>

          {/* Servicios principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {mainServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>

          {/* Servicios adicionales */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-8 border border-pink-100">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Servicios Adicionales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {additionalServices.map((service, index) => (
                <AdditionalServiceCard key={index} service={service} />
              ))}
            </div>
          </div>

          {/* Paquetes especiales */}
          <div className="mt-16">
            <h2 className="lg:text-2xl text-xl font-bold text-center mb-8 text-gray-800">Paquetes Especiales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specialPackages.map((pkg, index) => (
                <PackageCard key={index} package={pkg} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}