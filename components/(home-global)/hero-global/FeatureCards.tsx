import { LucideIcon } from "lucide-react";
import React from "react";
interface HeroIcons {
  icon: LucideIcon;
  title: string;
}

export default function FeatureCards({ icon: Icon, title }: HeroIcons) {
  return (
    <div className="flex items-center bg-white text-blue-900 w-full p-2 rounded-xl py-4 pl-16 gap-2">
        <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-300" />
        <p>{title}</p>
     </div>
  );
}
