import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard"
};

export default async function AdminDashboardPage() {
  const supabaseReady = isSupabaseConfigured();
  const adminEnabled = process.env.ADMIN_CMS_ENABLED === "true";
  let adminEmail = "";

  if (process.env.NODE_ENV === "production" && (!supabaseReady || !adminEnabled)) {
    redirect("/admin/login?setup=required");
  }

  if (supabaseReady) {
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/admin/login");
    }

    adminEmail = user.email || "";
  }

  return <AdminDashboard adminEmail={adminEmail} supabaseReady={supabaseReady} />;
}
