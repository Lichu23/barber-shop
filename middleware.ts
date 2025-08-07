import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

const PLATFORM_DOMAINS = new Set(['lichu.org', 'www.lichu.org', 'localhost']);

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  let host = req.headers.get('host');

  if (!host) {
    return NextResponse.next();
  }

  const normalizedHost = host.split(':')[0].replace(/^www\./, '');

  if (PLATFORM_DOMAINS.has(normalizedHost)) {
    return NextResponse.next();
  }

    if (url.pathname === '/favicon.ico' || url.pathname === '/favicon.png') {
    return NextResponse.next();
  }

  try {
    const { data: tenantProfile, error } = await supabase
      .from("tenants")
      .select("tenant_id")
      .eq("custom_domain", normalizedHost)
      .single();

    if (error || !tenantProfile) {
      return NextResponse.redirect(new URL('https://lichu.org/domain-not-found'));
    }
    
    const urlToRewrite = req.nextUrl.clone();
    
    urlToRewrite.pathname = `/${tenantProfile.tenant_id}${urlToRewrite.pathname}`;

    console.log(`[MIDDLEWARE] URL REESCRITA a: ${urlToRewrite.href}`);
    
    return NextResponse.rewrite(urlToRewrite);

  } catch (e) {
    console.error("Error catastrófico en el middleware:", e);
    return NextResponse.redirect(new URL('https://lichu.org/error'));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.webp$|.*\\.svg$|.*\\.mp4$|.*\\.webm$|.*\\.ogg$|.*\\.mp3$|.*\\.wav$|.*\\.flac$|.*\\.aac$|.*\\.pdf$).*)',
  ],
};