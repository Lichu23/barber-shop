import React from 'react'
import { Tabs, TabsContent, TabsList,TabsTrigger } from '../../ui/tabs'

export default function HowItWorks() {
  return (
    //cambiar div a h-full
    <div className='flex flex-col gap-4 h-screen text-sm w-full'> 
        <h2 className='text-2xl px-8 text-blue-900 font-bold'>Funcionamiento</h2>
        <Tabs defaultValue='client-flow'> 
            <TabsList className='flex flex-1 bg-blue-300 text-white rounded-none w-full overflow-y-hidden'>
                <TabsTrigger value="client-flow">Clientes</TabsTrigger>
                <TabsTrigger value='tenant-flow'>Dueños</TabsTrigger>
                <TabsTrigger value='cancelation-flow'>Cancelacion</TabsTrigger>
                <TabsTrigger value='creation-page-flow'>Creacion</TabsTrigger>
            </TabsList>

            <TabsContent value='client-flow'>
                
            </TabsContent>
        </Tabs>
    </div>
  )
}
