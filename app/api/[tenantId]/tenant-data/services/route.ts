import { getTenantServices } from '@/lib/services/tenantServices';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { tenantId: string } }): Promise<NextResponse> {
  const { tenantId } = params;

  if (!tenantId) {
    return NextResponse.json({ error: 'Tenant ID no proporcionado.' }, { status: 400 });
  }

  try {
    const { data: services, error } = await getTenantServices(tenantId);

    if (error) {
      console.error(`Error al obtener servicios para tenant ${tenantId} en API:`, error);
      return NextResponse.json({ error: 'Error al cargar los servicios.' }, { status: 500 });
    }

    return NextResponse.json({ services }, { status: 200 });
  } catch (err: any) {
    console.error(`Excepción en API de servicios para tenant ${tenantId}:`, err.message);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}