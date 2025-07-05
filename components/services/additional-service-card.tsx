import type { AdditionalService } from "@/constants/services"

interface AdditionalServiceCardProps {
  service: AdditionalService
}

export default function AdditionalServiceCard({ service }: AdditionalServiceCardProps) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-pink-100">
      <span className="font-medium text-gray-700">{service.name}</span>
      <span className="font-bold text-pink-600">{service.price}</span>
    </div>
  )
}
