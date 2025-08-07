import Services from "@/components/Services/Services";
import { ServiceOption } from "@/constants/services";
import { TenantProfile } from "@/lib/services/tenantServices";

interface Props {
  allServices: ServiceOption[];
  tenantProfile: TenantProfile;
}

const ServicesComponent = ({ allServices, tenantProfile }: Props) => {
  return (
    <div className="py-16">
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
        <Services services={allServices} />
      </div>
    </div>
  );
};

export default ServicesComponent;
