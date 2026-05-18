import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, signSession, verifyAdminPassword } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const password = (body.password ?? "").toString();
  if (!password) {
    return NextResponse.json({ error: "Mot de passe requis" }, { status: 400 });
  }

  const ok = await verifyAdminPassword(password);
  if (!ok) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  const token = await signSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return res;
}
