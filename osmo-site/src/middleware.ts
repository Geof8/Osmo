import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";

const PREVIEW_COOKIE = "preview_access";
const PREVIEW_COOKIE_MAX_AGE = 60 * 60 * 24; // 24h

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // -------------------------------------------------------------------------
  // Preview password handshake — set cookie and strip query param.
  // Runs first so a ?preview=… link works even under maintenance mode.
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // Admin gate — every /admin/* page is gated by the admin_session cookie.
  // Only /admin/login is public so the user can actually sign in.
  // Without this, /admin pages render for anyone (subscriber emails leak).
  // -------------------------------------------------------------------------
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    const ok = await verifySessionToken(token);
    if (ok) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // -------------------------------------------------------------------------
  // Maintenance mode — only kicks in when MAINTENANCE_MODE=true.
  // -------------------------------------------------------------------------
  const maintenance = process.env.MAINTENANCE_MODE === "true";
  if (!maintenance) return NextResponse.next();

  // Always allowed even in maintenance:
  // - the maintenance page itself
  // - API routes (so /api/admin/* still works for logged-in admins)
  // - Next internals (matcher excludes most, double-safe here)
  if (
    pathname.startsWith("/maintenance") ||
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
