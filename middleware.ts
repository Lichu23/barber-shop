import { NextResponse, NextRequest } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const PLATFORM_DOMAINS = new Set(["lichu.org", "www.lichu.org", "localhost"]);

async function multitenantMiddleware(request: NextRequest) {
  const host = request.headers.get("host");
  if (!host) return NextResponse.next();

  const normalizedHost = host.split(":")[0].replace(/^www\./, "");
  if (PLATFORM_DOMAINS.has(normalizedHost)) return NextResponse.next();

  if (
    request.nextUrl.pathname.startsWith("/_next/") ||
    request.nextUrl.pathname.startsWith("/favicon.ico") ||
    request.nextUrl.pathname.startsWith("/api/") // opcional, si tienes api que no quieres reescribir
  ) {
    return NextResponse.next();
  }

  try {
    const { data: tenantProfile, error } = await supabase
      .from("tenants")
      .select("tenant_id")
      .eq("custom_domain", normalizedHost)
      .single();

    if (error || !tenantProfile) {
      return NextResponse.redirect(
        new URL("https://lichu.org/domain-not-found")
      );
    }

    const urlToRewrite = request.nextUrl.clone();
    urlToRewrite.pathname = `/${tenantProfile.tenant_id}${urlToRewrite.pathname}`;

    return NextResponse.rewrite(urlToRewrite);
  } catch {
    return NextResponse.redirect(new URL("https://lichu.org/error"));
  }
}

// Clerk maneja la autenticación
export default clerkMiddleware(async (auth, request) => {
  // 1️⃣ Ejecutar Multitenant primero
  const multiRes = await multitenantMiddleware(request);
  if (multiRes && multiRes !== NextResponse.next()) {
    return multiRes; // Si devuelve redirección o rewrite, cortar flujo aquí
  }

  // 2️⃣ Proteger dashboard y subrutas
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    await auth.protect(); // Redirige a /sign-in si no está logueado
  }
  if (request.nextUrl.pathname.startsWith("/onboarding")) {
    await auth.protect(); // Redirige a /sign-in si no está logueado
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/onboarding",
    "/((?!sign-in|sign-up).*)", // excluye sign-in y sign-up
  ],
};
