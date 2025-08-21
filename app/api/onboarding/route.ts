import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/utils/supabase/createClient';
import { auth } from '@clerk/nextjs/server';
import { onboardingSchema } from '@/app/onboarding/schemaOnboarding';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const body = await req.json();
    const parse = onboardingSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: parse.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Verificar si ya existe el registro
    const { data: existingRecord, error: fetchError } = await supabase
      .from('tenants_onboarding')
      .select('id')
      .eq('clerk_user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Error al verificar registro existente:', fetchError.message);
      return NextResponse.json(
        { error: 'Error al verificar información existente' },
        { status: 500 }
      );
    }

    let saveError;
    if (existingRecord) {
      // Actualizar si ya existe
      const { error } = await supabase
        .from('tenants_onboarding')
        .update({
          onboarding_data: parse.data,
          subscription_status: 'Gratuita',
        })
        .eq('clerk_user_id', userId);
      saveError = error;
    } else {
      // Insertar si no existe
      const { error } = await supabase
        .from('tenants_onboarding')
        .insert({
          clerk_user_id: userId,
          onboarding_data: parse.data,
          subscription_status: 'Gratuita',
        });
      saveError = error;
    }

    if (saveError) {
      console.error('Error al guardar onboarding:', saveError.message);
      return NextResponse.json(
        { error: 'Error al guardar la información' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, message: 'Formulario enviado con éxito' });
  } catch (err: any) {
    console.error('Error en API /onboarding:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
