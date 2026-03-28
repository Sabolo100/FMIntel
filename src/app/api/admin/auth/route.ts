/**
 * Admin Auth API - FRAMEWORK (generic, reusable)
 * Simple password-based login with cookie session.
 * No complex auth system — just env ADMIN_PASSWORD.
 */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

function makeSessionToken(secret: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update("admin-session")
    .digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD;
    const sessionSecret = process.env.ADMIN_SESSION_SECRET || "default-secret";

    if (!adminPassword) {
      return NextResponse.json(
        { error: "Admin password not configured" },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: "Hibás jelszó" },
        { status: 401 }
      );
    }

    const token = makeSessionToken(sessionSecret);
    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true });
}
