import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { pricingAnnual, pricingMonthly } from "./pricingConstants";

export default function PricingCard() {
  return (
    <div className="flex flex-col justify-center items-center lg:h-dvh   text-sm w-full py-8  bg-gradient-to-b from-sky-50 via-white to-sky-100">
      <div className="lg:max-w-7xl  px-8 flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-4xl text-blue-900 font-bold  mt-5 ">Planes</h2>
          <p className="text-xl text-blue-800">
            Elige el plan perfecto para hacer crecer tu negocio
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          {pricingMonthly.map((plan) => (
            <Card
              key={plan.id}
              className="flex flex-col relative lg:flex-row w-full shadow-2xl"
            >
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {plan.title}
                  </h3>
                  <div className="text-4xl font-bold text-black mb-4">
                    {plan.price}
                  </div>
                  <Button
                    asChild
                    className="w-full bg-gray-700 hover:bg-gray-500 text-white rounded-xl py-3"
                  >
                    <Link
                      href="https://wa.me/34623735521?text=Hola,%20estoy%20interesado%20en%20el%20plan%20básico."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {plan.buttonText}
                    </Link>
                  </Button>
                </div>

                <ul className="space-y-4">
                  {plan.description.map((feature) => (
                    <li
                      key={feature.id}
                      className="flex items-center text-gray-800"
                    >
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          {pricingAnnual.map((plan) => (
            <Card
              key={plan.id}
              className="flex flex-col  lg:flex-row w-full shadow-purple-900 shadow-2xl"
            >
              <CardContent className="p-8 relative">
                <div className="absolute top-4 right-1 lg:top-2 lg:left-48">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1 lg:mr-0"/>
                    <p>Popular</p>
                  </div>
                </div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-purple-900 mb-2">
                    {plan.title}
                  </h3>
                  <div className="text-4xl font-bold text-purple-900 mb-2">
                    {plan.price}
                  </div>
                  <div className="text-sm text-purple-500 font-bold mb-4">
                    Ahorra €360 al año
                  </div>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-3"
                  >
                    <Link
                      href="https://wa.me/34623735521?text=Hola,%20estoy%20interesado%20en%20el%20plan%20basico."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {plan.buttonText}
                    </Link>
                  </Button>
                </div>

                <ul className="space-y-4">
                  {plan.description.map((feature) => (
                    <li
                      key={feature.id}
                      className="flex items-center text-blue-900"
                    >
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
