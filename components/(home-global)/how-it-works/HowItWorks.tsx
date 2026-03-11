import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  clientStepsHome,
  creationPageStepsHome,
  tenantStepsHome,
} from "./constants-how-it-work";

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            Funcionamiento
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mt-3">
            ¿Cómo funciona?
          </h2>
          <p className="text-zinc-400 mt-4 text-lg max-w-xl mx-auto">
            Un proceso simple para ti y para tus clientes.
          </p>
        </div>

        <Tabs defaultValue="tenant-flow">
          <TabsList className="flex w-full bg-zinc-900 border border-zinc-800 rounded-xl p-1 mb-10 gap-1">
            <TabsTrigger
              value="tenant-flow"
              className="flex-1 rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-zinc-950 data-[state=active]:font-bold text-zinc-400 transition-all"
            >
              Dueños
            </TabsTrigger>
            <TabsTrigger
              value="client-flow"
              className="flex-1 rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-zinc-950 data-[state=active]:font-bold text-zinc-400 transition-all"
            >
              Clientes
            </TabsTrigger>
            <TabsTrigger
              value="creation-page-flow"
              className="flex-1 rounded-lg data-[state=active]:bg-amber-500 data-[state=active]:text-zinc-950 data-[state=active]:font-bold text-zinc-400 transition-all"
            >
              Creación
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tenant-flow" className="flex flex-col lg:flex-row gap-4">
            {tenantStepsHome.map((step, index) => (
              <div
                key={step.id}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-sm shrink-0">
                    {index + 1}
                  </div>
                  <step.icon className="w-5 h-5 text-amber-400 shrink-0" />
                  <p className="font-bold text-white text-base">{step.step}</p>
                </div>
                <ol className="space-y-3 pl-1">
                  {step.list.map((item) => (
                    <li key={item.id} className="text-zinc-400 text-sm flex gap-2">
                      <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                      {item.text}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="client-flow" className="flex flex-col lg:flex-row gap-4">
            {clientStepsHome.map((step, index) => (
              <div
                key={step.id}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-sm shrink-0">
                    {index + 1}
                  </div>
                  <step.icon className="w-5 h-5 text-amber-400 shrink-0" />
                  <p className="font-bold text-white text-base">{step.step}</p>
                </div>
                <ol className="space-y-3 pl-1">
                  {step.list.map((item) => (
                    <li key={item.id} className="text-zinc-400 text-sm flex gap-2">
                      <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                      {item.text}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="creation-page-flow" className="flex flex-col lg:flex-row gap-4">
            {creationPageStepsHome.map((step, index) => (
              <div
                key={step.id}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-sm shrink-0">
                    {index + 1}
                  </div>
                  <step.icon className="w-5 h-5 text-amber-400 shrink-0" />
                  <p className="font-bold text-white text-base">{step.step}</p>
                  {step.week && (
                    <span className="ml-auto text-xs text-zinc-500 shrink-0">{step.week}</span>
                  )}
                </div>
                <ol className="space-y-3 pl-1">
                  {step.list.map((item) => (
                    <li key={item.id} className="text-zinc-400 text-sm flex gap-2">
                      <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                      {item.text}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
