import { NextRequest, NextResponse } from "next/server";
import { buildClearCookieHeader } from "@/lib/auth";
import { getAuthFromCookies } from "@/lib/auth";
import { analytics } from "@/lib/analytics";

export async function POST(request: NextRequest) {
  const auth = await getAuthFromCookies();
  if (auth) {
    analytics.user.logout(auth.userId);
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/login";
  redirectUrl.search = "";
  // Ensure redirect URL uses the external host, not the proxy-internal one
  redirectUrl.host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? redirectUrl.host;
  redirectUrl.protocol = request.headers.get("x-forwarded-proto") ?? redirectUrl.protocol;
  const response = NextResponse.redirect(redirectUrl);
  response.headers.set("Set-Cookie", buildClearCookieHeader());
  return response;
}
