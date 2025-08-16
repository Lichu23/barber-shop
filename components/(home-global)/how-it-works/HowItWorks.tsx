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
    <div className="flex flex-col justify-center items-center h-full  text-sm w-full py-8  bg-gradient-to-b from-sky-100 via-sky-200 to-sky-300">
      <div className="lg:max-w-6xl">
        <h2 className="text-4xl text-blue-900 font-bold text-center lg:mt-20 mb-8">
          Funcionamiento
        </h2>
        <Tabs defaultValue="tenant-flow">
          <TabsList className="flex flex-1 mb-8 bg-inherit blue-900 rounded-none w-full overflow-y-hidden">
            <TabsTrigger value="tenant-flow">Dueños</TabsTrigger>
            <TabsTrigger value="client-flow">Clientes</TabsTrigger>
            <TabsTrigger value="creation-page-flow">Creacion</TabsTrigger>
          </TabsList>

          <TabsContent
            className="px-4 lg:px-0 flex flex-col lg:flex-row  gap-3 "
            value="tenant-flow"
          >
            {tenantStepsHome.map((step) => (
              <Card
                key={step.id}
                className="flex flex-col w-full border h-82  overflow-y-hidden border-gray-300 shadow-xl "
              >
                <CardContent className="flex flex-col justify-center items-center p-4 lg:p-5">
                    <p className="font-bold flex gap-2 items-center  text-blue-900 text-lg mb-2">
                    <step.icon className="w-6 h-6 blue-900" />
                    {step.step}
                  </p>
                  <ol className="list-decimal pl-2 flex flex-col  text-blue-900">
                    {step.list.map((stepList) => (
                      <li key={stepList.id} className="mb-2 lg:mb-4">
                        {stepList.text}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent
            className="px-4 flex flex-col lg:flex-row gap-3"
            value="client-flow"
          >
            {clientStepsHome.map((step) => (
              <Card key={step.id} className="flex flex-col w-full">
                <CardContent className="flex flex-col p-4 lg:p-5">
                    <p className="font-bold flex gap-2 text-blue-900 text-lg mb-2">
                    <step.icon className="w-6 h-6 blue-900" />
                    {step.step}
                  </p>
                  <ol className="list-decimal pl-2 flex flex-col  text-blue-900">
                    {step.list.map((stepList) => (
                      <li key={stepList.id} className="mb-2 lg:mb-4">
                        {stepList.text}
                      </li>
                    ))}
                  </ol>
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
                    <p className="font-bold flex gap-2 text-blue-900 text-lg mb-2">
                      <step.icon className="w-6 h-6 blue-900" />
                      {step.step}
                    </p>
                    <p className="text-blue-900 lg:text-base">{step.week}</p>
                  </div>
                  <ol className="list-decimal pl-2 flex flex-col  text-blue-900">
                    {step.list.map((stepList) => (
                      <li key={stepList.id} className="mb-2 lg:mb-4">
                        {stepList.text}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
