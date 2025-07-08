import { Button } from "@/components/ui/button";
import type { AdditionalService } from "@/constants/services";
import Link from "next/link";

interface AdditionalServiceCardProps {
  service: AdditionalService;
}

export default function AdditionalServiceCard({
  service,
}: AdditionalServiceCardProps) {
  const url = "/reservation";

  return (
    <Button
      asChild
      className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border hover:bg-slate-200 border-pink-100"
    >
      <Link href={url}>
        <span className="font-medium text-gray-700">{service.name}</span>
        <span className="font-bold text-pink-600">{service.price}</span>
      </Link>
    </Button>
  );
}
