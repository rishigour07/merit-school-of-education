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

    const { data: adminProfile, error: profileError } = await supabase
      .from("admin_profiles")
      .select("id, user_id, name, role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (profileError || !adminProfile) {
      redirect("/admin/login?error=unauthorized");
    }

    adminEmail = user.email || "";
  }

  return <AdminDashboard adminEmail={adminEmail} supabaseReady={supabaseReady} />;
}
