import { allServiceOptions } from "@/constants/services";

export interface ServiceOption {
  value: string;
  label: string;
  price: number;
}

export function calculateTotalPrice(
  selectedServiceValues: string[],
   
): number {
  return selectedServiceValues.reduce((sum, serviceValue) => {
    const option = allServiceOptions.find(o => o.value === serviceValue);
    return sum + (option?.price ?? 0);
  }, 0);
}
