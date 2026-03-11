import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import Link from "next/link";
import { pricingAnnual, pricingMonthly } from "./pricingConstants";

export default function PricingCard() {
  return (
    <section className="py-24 px-4 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            Planes
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mt-3">
            Elige tu plan
          </h2>
          <p className="text-zinc-400 mt-4 text-lg">
            Empieza gratis el primer mes. Sin compromisos.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Monthly plan */}
          {pricingMonthly.map((plan) => (
            <div
              key={plan.id}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{plan.title}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl py-5 font-semibold"
              >
                <Link
                  href="https://wa.me/34623735521?text=Hola,%20estoy%20interesado%20en%20el%20plan%20básico."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.buttonText}
                </Link>
              </Button>

              <ul className="space-y-3">
                {plan.description.map((feature) => (
                  <li key={feature.id} className="flex items-center gap-3 text-zinc-400 text-sm">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Annual plan - highlighted */}
          {pricingAnnual.map((plan) => (
            <div
              key={plan.id}
              className="flex-1 relative bg-zinc-900 border-2 border-amber-500/60 rounded-2xl p-8 flex flex-col gap-6 shadow-xl shadow-amber-500/10"
            >
              {/* Popular badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1.5 bg-amber-500 text-zinc-950 font-bold text-xs px-4 py-1.5 rounded-full">
                  <Zap className="w-3.5 h-3.5" />
                  Más Popular
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-1">{plan.title}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                </div>
                <p className="text-amber-400 text-sm font-semibold mt-1">Ahorra €360 al año</p>
              </div>

              <Button
                asChild
                className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl py-5 shadow-lg shadow-amber-500/20 transition-all"
              >
                <Link
                  href="https://wa.me/34623735521?text=Hola,%20estoy%20interesado%20en%20el%20plan%20anual."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.buttonText}
                </Link>
              </Button>

              <ul className="space-y-3">
                {plan.description.map((feature) => (
                  <li key={feature.id} className="flex items-center gap-3 text-zinc-300 text-sm">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-zinc-500 text-sm mt-10">
          Primer mes gratis · Sin tarjeta de crédito · Cancela cuando quieras
        </p>
      </div>
    </section>
  );
}
