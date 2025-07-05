import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SpecialPackage } from "@/constants/services"

interface PackageCardProps {
  package: SpecialPackage
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const IconComponent = pkg.icon

  return (
    <Card className={`bg-gradient-to-r ${pkg.gradient} ${pkg.border}`}>
      <CardHeader>
        <div className="flex items-center justify-center gap-2 md:flex-col md:gap-0 mb-4 md:mb-0">
          <IconComponent className={`h-8 w-8 ${pkg.iconColor}`} />
          <CardTitle className="text-xl text-center text-gray-800">{pkg.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-600 mb-4">{pkg.description}</p>
        <p className={`text-3xl font-bold ${pkg.priceColor} mb-2`}>{pkg.price}</p>
        <p className="text-sm text-gray-500">{pkg.savings}</p>
      </CardContent>
    </Card>
  )
}
