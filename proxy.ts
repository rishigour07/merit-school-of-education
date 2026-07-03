import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const adminEnabled = process.env.ADMIN_CMS_ENABLED === "true";

  if (pathname === "/admin/login" || pathname === "/admin") {
    return NextResponse.next();
  }

  if (process.env.NODE_ENV === "production" && (!isSupabaseConfigured() || !adminEnabled)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("setup", "required");
    return NextResponse.redirect(loginUrl);
  }

  if (!pathname.startsWith("/admin") || !isSupabaseConfigured()) return NextResponse.next();

  const hasSupabaseAuthCookie = request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith("sb-") && cookie.name.includes("auth-token"));

  if (!hasSupabaseAuthCookie) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
