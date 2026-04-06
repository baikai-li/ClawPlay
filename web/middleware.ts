import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Locale detection — read from cookie, fallback to env default
// Note: we don't use next-intl's createMiddleware here because it interferes
// with routing when localePrefix is "never". Instead, locale is determined at
// build/runtime via NEXT_LOCALE env var and read in app/layout.tsx.
const PROTECTED_PATHS = ["/dashboard", "/submit"];

export function middleware(request: NextRequest): Response {
  const { pathname } = request.nextUrl;

  // Auth protection
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  if (isProtected) {
    const token = request.cookies.get("clawplay_token")?.value;
    if (!token) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
