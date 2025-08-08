import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { clientStepsHome, creationPageStepsHome, tenantStepsHome } from "./constants-how-it-work";

export default function HowItWorks() {
  return (
    //cambiar div a h-full
    <div className="flex flex-col gap-4 h-screen text-sm w-full">
      <h2 className="text-2xl px-8 text-blue-900 font-bold">Funcionamiento</h2>
      <Tabs defaultValue="client-flow">
        <TabsList className="flex flex-1 bg-blue-300 text-white rounded-none w-full overflow-y-hidden">
          <TabsTrigger value="client-flow">Clientes</TabsTrigger>
          <TabsTrigger value="tenant-flow">Dueños</TabsTrigger>
          <TabsTrigger value="creation-page-flow">Creacion</TabsTrigger>
        </TabsList>

        <TabsContent className="px-4 flex flex-col gap-3" value="client-flow">
          {clientStepsHome.map((step) => (
            <Card key={step.id} className="flex flex-col w-full">
              <CardContent className="flex flex-col justify-center">
                <p className="mt-4 font-bold text-blue-900 text-lg">
                  {step.step1}
                </p>
                {step.list.map((stepList) => (
                  <ul key={stepList.id}>
                    <li className="mt-2 mb-2"><span className="text-blue-900 font-bold">{stepList.step}</span>{stepList.text}</li>
                  </ul>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent className="px-4 flex flex-col gap-3" value="tenant-flow">
          {tenantStepsHome.map((step) => (
            <Card key={step.id} className="flex flex-col w-full">
              <CardContent className="flex flex-col justify-center">
                <p className="mt-2 mb-2 font-bold text-blue-900 text-lg">
                  {step.step1}
                </p>
                {step.list.map((stepList) => (
                  <ul key={stepList.id}>
                    <li className="mb-2"><span className="text-blue-900 font-bold">{stepList.step}</span>{stepList.text}</li>
                  </ul>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

         <TabsContent className="px-4 flex flex-col gap-3" value="creation-page-flow">
          {creationPageStepsHome.map((step) => (
            <Card key={step.id} className="flex flex-col w-full">
              <CardContent className="flex flex-col justify-center">
                <p className="mt-2 mb-2 font-bold text-blue-900 text-lg">
                  {step.step1}
                </p>
                {step.list.map((stepList) => (
                  <ul key={stepList.id}>
                    <li className="mb-2"><span className="text-blue-900 font-bold">{stepList.step}</span>{stepList.text}</li>
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
