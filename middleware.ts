import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, parseAuthToken } from "@/lib/auth";

const PUBLIC_PATHS = ["/login", "/forgot-password", "/api/auth/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api/auth/logout") ||
    PUBLIC_PATHS.includes(pathname)
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const auth = parseAuthToken(token);

  if (!auth) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"]
};
