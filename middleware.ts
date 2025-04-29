import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// Define las rutas públicas (ajusta según tus necesidades)
const publicRoutes = [
  "/",
  "/login",
  "/registro",
  "/forgot-password",
  "/contacto",
  "/torneos",
  "/eventos",
  "/casinos",
  "/circuitos",
  // Añade rutas dinámicas si es necesario (requiere lógica más compleja, ej: startsWith)
  // Ejemplo simple para páginas de detalle (puede necesitar ajuste):
  // Si quieres que /torneos/slug sea público, etc.
];

// Helper para chequear rutas públicas (podría mejorarse para patrones)
function isPublicRoute(pathname: string, routes: string[]): boolean {
  return routes.some((route) => {
    if (route.includes("[")) {
      // Muy básico para rutas dinámicas
      const baseRoute = route.split("[")[0];
      return pathname.startsWith(baseRoute);
    }
    return pathname === route;
  });
}

export async function middleware(req: NextRequest) {
  const reqUrl = new URL(req.url);
  const pathname = reqUrl.pathname;
  const res = NextResponse.next();

  // Permitir acceso directo a rutas públicas definidas
  // Y también a rutas internas de Next.js que podrían no estar en el matcher
  if (isPublicRoute(pathname, publicRoutes) || pathname.startsWith("/_next")) {
    // Si es pública y el usuario YA está logueado y va a login/registro, redirigir
    // Necesitamos el cliente aquí para saber si está logueado
    if (["/login", "/registro"].includes(pathname)) {
      const supabase = createMiddlewareClient({ req, res });
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        // Redirige a la home si está logueado e intenta acceder a login/registro
        // O puedes redirigir a /dashboard o /perfil si lo prefieres
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    // Para el resto de rutas públicas, simplemente continuar
    return res;
  }

  // --- Rutas Protegidas ---
  // Si la ruta NO es pública, verificar sesión
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Si NO hay sesión y la ruta es protegida, redirigir a login
  if (!session) {
    // Guardar la URL a la que intentaba acceder para redirigir después del login
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set(`redirectedFrom`, pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Si hay sesión y la ruta es protegida (o login/registro, aunque ya lo manejamos arriba),
  // simplemente continuar.
  return res;
}

export const config = {
  // Ajustar matcher si es necesario, pero el actual parece razonable
  matcher: ["/((?!api|images|icons|_next/static|_next/image|favicon.ico).*)"],
};
