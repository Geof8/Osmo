import { NextRequest, NextResponse } from "next/server";

const PREVIEW_COOKIE = "preview_access";
const PREVIEW_COOKIE_MAX_AGE = 60 * 60 * 24; // 24h

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Preview password handshake — set cookie and strip query param
  const previewParam = searchParams.get("preview");
  const previewPassword = process.env.PREVIEW_PASSWORD;
  if (previewParam && previewPassword && previewParam === previewPassword) {
    const cleanUrl = req.nextUrl.clone();
    cleanUrl.searchParams.delete("preview");
    const res = NextResponse.redirect(cleanUrl);
    res.cookies.set(PREVIEW_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: PREVIEW_COOKIE_MAX_AGE,
    });
    return res;
  }

  const maintenance = process.env.MAINTENANCE_MODE === "true";
  if (!maintenance) return NextResponse.next();

  // Always allow:
  // - the maintenance page itself
  // - admin routes
  // - API routes
  // - Next.js internals and static assets (handled by matcher, but double-safe)
  if (
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Preview cookie → full access
  if (req.cookies.get(PREVIEW_COOKIE)?.value === "1") {
    return NextResponse.next();
  }

  // Otherwise: redirect to maintenance
  const url = req.nextUrl.clone();
  url.pathname = "/maintenance";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Run on every route except Next internals and common static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|mp4|webm|woff|woff2|ttf|otf)$).*)",
  ],
};
