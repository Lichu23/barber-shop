import {
  mainServices
} from "@/constants/services";
import SeeMoreButton from "./SeeMoreButton";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return ( 
    <section id="servicios">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Servicios Destacados
          </h2>
        </div>

        {/* Servicios principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 ">
          {mainServices.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
          <SeeMoreButton/>
        </div>
      </div>
    </section>
  );
}
