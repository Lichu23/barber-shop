import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  rating: string;
}

export default function ClientCard({
  title,
  description,
  imageUrl,
  rating,
}: Props) {
  return (
    <div className="bg-blue-300 w-full rounded-xl lg:w-[350px]  text-white">
      <img
        alt="hairsalon image"
        className="rounded-t-xl w-[340px] h-[200px] lg:w-full"
        src={imageUrl}
      />
      <div className="py-3 px-4">
        <div className="flex justify-between mb-2">
          <p className="font-bold text-lg">{title}</p>
          <p className="font-bold text-lg flex items-center gap-2"><span><Star size={20}/></span>{rating}</p>
        </div>
        <p className="text-base ">{description}</p>
      </div>
    </div>
  );
}
