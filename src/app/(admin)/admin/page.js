import { cookies } from "next/headers";
import PinGate from "@/components/admin/PinGate";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminLogout from "@/components/admin/AdminLogout";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Console — Venpa Sports",
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_auth")?.value;
  const isAuth = Boolean(token && token === process.env.ADMIN_PIN);

  if (!isAuth) {
    // PinGate is a client component; it calls /api/admin/verify on submit
    // and does window.location.reload() on success so the server re-checks the cookie.
    return <PinGate />;
  }

  return (
    <>
      <AdminLogout />
      <AdminDashboard />
    </>
  );
}
