import { ServiceOption } from "@/constants/services";
import ServiceCard from "./ServiceCard";
interface ServicesProps {
  services: ServiceOption[];
}

type GroupedServices = { [category: string]: ServiceOption[] };

const groupServicesByCategory = (
  services: ServiceOption[]
): GroupedServices => {
  return services.reduce((acc, service) => {
    const categoryName = service.category || "Otros Servicios"; // Usa "Otros Servicios" si no hay categoría
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(service);
    return acc;
  }, {} as GroupedServices);
};

export default function Services({ services}: ServicesProps) {
  if (!services || services.length === 0) {
    return (
      <section id="servicios" className="py-16 text-center text-gray-600">
        <p>No hay servicios destacados para mostrar en este momento.</p>
      </section>
    );
  }

  const groupedServices = groupServicesByCategory(services);
  const categoryNames = Object.keys(groupedServices);

  return (
    <section id="servicios">
      <div className="container mx-auto px-4">
        
        {categoryNames.map((categoryName) => (
          <div key={categoryName} className="mb-16 last:mb-0">
            {" "}
            <h3 className="text-3xl font-bold mb-8 text-primary/70 text-center">
              {categoryName}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedServices[categoryName].map((service, index) => (
                <ServiceCard key={service.id || index} service={service} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
