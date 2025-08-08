import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  clientStepsHome,
  creationPageStepsHome,
  tenantStepsHome,
} from "./constants-how-it-work";

export default function HowItWorks() {
  return (
    //cambiar div a h-full
    <div className="flex flex-col h-full  lg:h-dvh text-sm w-full py-8 lg:py-14 lg:w-full bg-blue-200">
      <h2 className="text-4xl px-8 text-blue-900 font-bold text-center lg:mt-20 mb-8">Funcionamiento</h2>
      <Tabs defaultValue="client-flow">
        <TabsList className="flex flex-1 mb-8 bg-blue-200 text-white rounded-none w-full overflow-y-hidden">
          <TabsTrigger value="tenant-flow">Dueños</TabsTrigger>
          <TabsTrigger value="client-flow">Clientes</TabsTrigger>
          <TabsTrigger value="creation-page-flow">Creacion</TabsTrigger>
        </TabsList>

        <TabsContent className="px-4 flex flex-col lg:flex-row  gap-3" value="tenant-flow">
          {tenantStepsHome.map((step) => (
            <Card key={step.id} className="flex flex-col w-full">
              <CardContent className="flex flex-col p-4 lg:p-5">
                <p className="font-bold text-blue-900 text-lg lg:mb-4">
                  {step.step}
                </p>
                {step.list.map((stepList) => (
                  <ul key={stepList.id}>
                    <li className="mb-2 lg:mb-4">
                      <span className="text-blue-900 font-bold">
                        {stepList.step}
                      </span>
                      {stepList.text}
                    </li>
                  </ul>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent className="px-4 flex flex-col lg:flex-row gap-3" value="client-flow">
          {clientStepsHome.map((step) => (
            <Card key={step.id} className="flex flex-col w-full">
              <CardContent className="flex flex-col p-4 lg:p-5">
                <p className="font-bold text-blue-900 text-lg lg:mb-4">
                  {step.step}
                </p>
                {step.list.map((stepList) => (
                  <ul key={stepList.id}>
                    <li className="mb-2 lg:mb-4">
                      <span className="text-blue-900 font-bold">
                        {stepList.step}
                      </span>
                      {stepList.text}
                    </li>
                  </ul>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent
          className="px-4 flex flex-col lg:flex-row gap-3"
          value="creation-page-flow"
        >
          {creationPageStepsHome.map((step) => (
            <Card key={step.id} className="flex flex-col lg:flex-row w-full">
              <CardContent className="flex flex-col p-4 lg:p-5">
                <div className="flex justify-between items-center lg:mb-4">
                  <p className="font-bold text-blue-900 text-lg">
                  {step.step}
                </p>
                <p className="text-blue-900 lg:text-base">{step.week}</p>
                </div>
                {step.list.map((stepList) => (
                  <ul key={stepList.id}>
                    <li className="mb-2 lg:mb-4">
                      <span className="text-blue-900 font-bold">
                        {stepList.step}
                      </span>
                      {stepList.text}
                    </li>
                  </ul>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
