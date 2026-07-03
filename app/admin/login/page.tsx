import LoginForm from "@/components/admin/LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin Login"
};

export default function AdminLoginPage() {
  return <LoginForm supabaseReady={isSupabaseConfigured()} />;
}
