/**
 * Next.js Middleware - FRAMEWORK (generic, reusable)
 * Protects /admin/* routes (except /admin/login) with session cookie check.
 */
import { NextRequest, NextResponse } from "next/server";
function makeSessionToken(secret: string): string {
  return btoa(`admin-session:${secret}`);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect admin routes (excluding login page and auth API)
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    !pathname.startsWith("/api/admin/auth")
  ) {
    const sessionSecret =
      process.env.ADMIN_SESSION_SECRET || "default-secret";
    const expected = makeSessionToken(sessionSecret);
    const token = request.cookies.get("admin_session")?.value;

    if (token !== expected) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
