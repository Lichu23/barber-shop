import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function SeeMoreButton() {
  return (
    <Button
      asChild
      className="hover:shadow-lg hover:bg-pink-100 cursor-pointer transition-shadow border-pink-100 bg-white h-full"
    >
      <CardContent className="p-4">
        <Link className="w-full" href="/chiky-services">
          <p className="flex font-bold text-black text-lg items-center">
            <span>
              <Plus className="text-pink-500"  />
            </span>
            Ver mas
          </p>
        </Link>
      </CardContent>
    </Button>
  );
}
