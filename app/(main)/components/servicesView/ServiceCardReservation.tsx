import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { MainService } from "@/constants/services";
import Link from "next/link";
type Props = { service: MainService };

export default function ServiceCardReservation({ service }: Props) {
  const Icon = service.icon;
  const url = "/reservation";


  return (
    <Link href={url} passHref>
      <Card className="hover:shadow-lg transition-shadow border-pink-100 cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              {Icon ? (
                <Icon className="h-8 w-8 text-pink-500" />
              ) : (
                <div className="h-8 w-8 text-pink-500 flex items-center justify-center"></div>
              )}
              <span className="font-semibold text-lg text-gray-800">
                {service.title}
              </span>
            </div>
            <span className="text-xl font-bold text-pink-600">
              {service.price}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
