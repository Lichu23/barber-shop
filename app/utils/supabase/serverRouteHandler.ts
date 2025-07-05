import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          if (typeof cookieStore.getAll === 'function') {
            return cookieStore.getAll().map(({ name, value }) => ({ name, value }))
          }
          // cookieStore es iterable: [name, cookieObj]
          return Array.from(cookieStore).map(([name, cookieObj]) => ({ name, value: cookieObj.value }))
        },
        setAll() {
          // No-op: Next.js Route Handlers no permiten setear cookies directamente aquí
        },
      },
    }
  )
}