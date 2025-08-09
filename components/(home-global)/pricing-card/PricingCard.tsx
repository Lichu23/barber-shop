import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { pricingMonthly, pricingAnnual } from "./pricingConstants";
import { Button } from "@/components/ui/button";

export default function PricingCard() {
  return (
    <div className="flex flex-col justify-center items-center lg:h-dvh   text-sm w-full py-8  bg-gradient-to-b from-white to-sky-200">
      <div className="lg:max-w-6xl px-8 flex flex-col gap-10">
        <h2 className="text-4xl text-blue-900 font-bold text-center mt-5 lg:mb-8">
          Planes
        </h2>
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
           {pricingMonthly.map((plan) => (
            <Card key={plan.id} className="flex flex-col lg:flex-row w-full">
              <CardContent className="flex flex-col p-4 lg:p-5 gap-4">
                <div className="flex justify-between items-center ">
                  <h2 className="font-bold text-blue-900 text-lg">
                    {plan.title}
                  </h2>
                  <p className="text-blue-900 font-bold lg:text-base">
                    {plan.price}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="rounded-xl  bg-gradient-to-r from-gray-600  to-black hover:bg-gradient-to-r hover:from-gray-200  hover:to-gray-400 hover:text-black"
                >
                  {plan.buttonText}
                </Button>
                <ul>
                  {plan.description.map((description) => (
                    <li key={description.id} className="mb-2 lg:mb-4">
                      <span className="text-blue-900 ">{description.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
          
          {pricingAnnual.map((plan) => (
            <Card
              key={plan.id}
              className="flex flex-col lg:flex-row w-full shadow-purple-900 shadow-2xl"
            >
              <CardContent className="flex flex-col p-4 lg:p-5 gap-4">
                <div className="flex justify-between items-center ">
                  <h2 className="font-bold text-blue-900 text-lg ">
                    {plan.title}
                  </h2>
                  <p className="text-blue-900 font-bold lg:text-base">
                    {plan.price}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="rounded-xl  bg-gradient-to-r from-purple-900  to-blue-700 hover:bg-gradient-to-r hover:from-blue-200  hover:to-purple-200 hover:text-black"
                >
                  {plan.buttonText}
                </Button>

                <ul className=" flex flex-col  text-blue-900">
                  {plan.description.map((description) => (
                    <li key={description.id} className="mb-2 lg:mb-4">
                      {description.text}
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
