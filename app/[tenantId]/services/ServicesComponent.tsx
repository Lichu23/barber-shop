import Services from "@/components/services-components/Services";
import { ServiceOption } from "@/constants/services";
import { TenantProfile } from "@/lib/services/tenantServices";

interface Props {
  allServices: ServiceOption[];
  tenantProfile: TenantProfile;
}

const ServicesComponent = ({ allServices, tenantProfile }: Props) => {
  
  return (
    <div className="py-16 opacity-0 translate-y-4 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 lg:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Nuestros Servicios
          </h1>
          {tenantProfile.hero_description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {tenantProfile.hero_description}
            </p>
          )}
        </div>
        <Services showSeeMoreButton={false} services={allServices} />
      </div>
    </div>
  );
};

export default ServicesComponent;
