import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useReservation } from "@/context/ReservationContext";
import { formatPriceToEuro } from "@/utils/formatPrice";
import { ChevronDown, ChevronUp, DollarSign, Scissors } from "lucide-react";

interface ServiceDetailsProps {

  isServicesOpen: boolean;
  setIsServicesOpen: (isOpen: boolean) => void;
}

export default function ServiceDetails({

  isServicesOpen,
  setIsServicesOpen,
}: ServiceDetailsProps) {
  const {bookingData } = useReservation()
  const detailedServices = bookingData?.detailedServices
  return (
    <div className="bg-gradient-to-r from-pink-50/50 to-rose-50/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-pink-100">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="p-2 sm:p-3 bg-pink-100 rounded-full">
          <Scissors className="h-4 w-4 sm:h-6 sm:w-6 text-pink-600" />
        </div>
        <h3 className="text-lg sm:text-2xl font-bold text-gray-800">
          Servicios
        </h3>
      </div>
      {detailedServices?.length === 1 ? (
        <div className="bg-white/70 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-pink-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="text-base sm:text-lg font-bold text-gray-800">
                {detailedServices[0]?.label}
              </h4>
            </div>
            <div className="text-right flex items-center gap-2">
              <span className="text-sm sm:text-base font-semibold text-gray-700">
                ${detailedServices[0]?.price.toFixed(2)}
              </span>
              <Scissors className="h-5 w-5 text-pink-500" />
            </div>
          </div>
        </div>
      ) : (
        <Collapsible open={isServicesOpen} onOpenChange={setIsServicesOpen}>
          <CollapsibleTrigger className="w-full bg-white/70 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-pink-200 hover:bg-white/90 transition-colors">
            <div className="flex items-center justify-between">
              <div className="text-left flex-1">
                <h4 className="text-base sm:text-lg font-bold text-gray-800">
                  {detailedServices?.length} Servicios Seleccionados
                </h4>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {isServicesOpen ? (
                  <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                )}
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 sm:mt-3 space-y-2">
            {detailedServices?.map((service, index) => (
              <div
                key={index}
                className="bg-white/70 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-pink-200 ml-2 sm:ml-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h5 className="text-sm sm:font-semibold font-medium text-gray-800">
                      {service.label}
                    </h5>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="text-sm sm:text-base font-semibold text-gray-700">
                      {formatPriceToEuro(service.price)}
                    </span>
                    <Scissors className="h-4 w-4 text-pink-500 flex-shrink-0" />
                  </div>
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
      <hr className="my-4 border-pink-100" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-3 bg-green-100 rounded-full">
            <DollarSign className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-gray-800">Total</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl sm:text-4xl font-bold text-green-600">
            {formatPriceToEuro(bookingData?.totalPrice)}
          </p>
          <p className="text-xs sm:text-sm text-green-800">Precio final</p>
        </div>
      </div>
    </div>
  );
}