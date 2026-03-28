/**
 * Admin Auth helpers - FRAMEWORK (generic, reusable)
 * Server-side session validation for admin routes.
 */
import { cookies } from "next/headers";
import crypto from "crypto";

function makeSessionToken(secret: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update("admin-session")
    .digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const sessionSecret = process.env.ADMIN_SESSION_SECRET || "default-secret";
  const expected = makeSessionToken(sessionSecret);
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  return token === expected;
}
