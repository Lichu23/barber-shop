import { Star } from "lucide-react";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  rating: string;
}

export default function ClientCard({ title, description, imageUrl, rating }: Props) {
  return (
    <div className="group flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden w-full lg:w-[340px] hover:border-amber-500/40 transition-colors">
      <div className="overflow-hidden">
        <img
          alt={`${title} barbershop`}
          className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-500"
          src={imageUrl}
        />
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <p className="font-bold text-white text-lg">{title}</p>
          <div className="flex items-center gap-1.5 bg-zinc-800 border border-zinc-700 px-2.5 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-amber-400 font-bold text-sm">{rating}</span>
          </div>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
