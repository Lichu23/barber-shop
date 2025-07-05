import { Card, CardContent } from "@/components/ui/card"
import type { MainService } from "@/constants/services"

interface ServiceCardProps {
  service: MainService
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = service.icon

  return (
    <Card className="hover:shadow-lg transition-shadow border-pink-100">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconComponent className="h-8 w-8 text-pink-500" />
            <span className="font-semibold text-lg text-gray-800">{service.title}</span>
          </div>
          <span className="text-xl font-bold text-pink-600">{service.price}</span>
        </div>
      </CardContent>
    </Card>
  )
}
