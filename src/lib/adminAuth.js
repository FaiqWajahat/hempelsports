import { cookies } from "next/headers";

/**
 * Call this in any Server Component or Route Handler to verify admin auth.
 * Returns true if the admin_auth cookie matches the ADMIN_PIN env var.
 */
export async function isAdminAuthenticated() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_auth")?.value;
    return token === process.env.ADMIN_PIN;
  } catch {
    return false;
  }
}
