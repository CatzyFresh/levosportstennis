import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, findAdmin, makeAuthToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = String(body?.email ?? "");
  const password = String(body?.password ?? "");
  const account = findAdmin(email, password);

  if (!account) {
    return NextResponse.json({ ok: false, message: "Invalid admin credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, makeAuthToken(account), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
  return res;
}
