import { ServiceOption } from "@/constants/services";

 

export function calculateTotalPrice(
  selectedServiceValues: string[],
   allServices: ServiceOption[]
): number {
  return selectedServiceValues.reduce((sum, serviceValue) => {
    const option = allServices.find(option => option.value === serviceValue);
    return sum + (option?.price ?? 0);
  }, 0);
}
