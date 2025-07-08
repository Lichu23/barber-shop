import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SpecialPackage } from "@/constants/services";
import Link from "next/link";

type Props = { package: SpecialPackage };

export default function PackageCard({ package: pkg }: Props) {
  const Icon = pkg.icon;
  const url = "/reservation"
  return (
    <Button asChild
      className="bg-gradient-to-r h-full flex flex-col from-rose-100 to-pink-100 border  border-rose-200"
    >
      <Link href={url}>
       <CardHeader>
        <div className="flex items-center justify-center gap-2 md:flex-col md:gap-0 mb-4 md:mb-0">
          <Icon className="h-8 w-8 text-rose-500" />
          <CardTitle className="text-xl text-center text-gray-800">
            {pkg.title}
          </CardTitle> 
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-600 mb-4">{pkg.description}</p>
        <p className={`text-3xl font-bold text-rose-500 mb-2`}>{pkg.price}</p>
        <p className="text-sm font-bold text-slate-600">{pkg.savings}</p>
      </CardContent>
      </Link>
     
    </Button>
  );
}
