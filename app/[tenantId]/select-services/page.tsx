import SelectServicesWrapp from "./SelectServicesWrapp";


export interface SelectServicesPageProps {
  params: {
    tenantId: string
  };
}

export default async function SelectServicesPage({
  params,
}: SelectServicesPageProps) {
  const { tenantId } = await params;

  return (
    <SelectServicesWrapp tenantId={tenantId}/>
  )
}
