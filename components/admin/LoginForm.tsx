"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  createClient,
  isBrowserSupabaseConfigured
} from "@/lib/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Enter a valid admin email."),
  password: z.string().min(6, "Password must be at least 6 characters.")
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm({ supabaseReady, adminEnabled }: { supabaseReady: boolean; adminEnabled: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: LoginFormValues) {
    setError("");

    if (!supabaseReady || !adminEnabled || !isBrowserSupabaseConfigured()) {
      setError(
        "Supabase is not configured yet. Add env vars and create an admin user first."
      );
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (!data.user) {
        setError("Login failed: Supabase did not return a user.");
        return;
      }

      const { data: adminProfile, error: profileError } = await supabase
        .from("admin_profiles")
        .select("id, user_id, name, role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (profileError) {
        setError(profileError.message);
        await supabase.auth.signOut();
        return;
      }

      if (!adminProfile) {
        setError("Login successful but admin profile not found.");
        await supabase.auth.signOut();
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "An unexpected login error occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] px-4 py-6 sm:py-8 lg:py-10">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-5xl items-center gap-8 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="hidden lg:block">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-royal-600">
            Merit School CMS
          </p>
          <h1 className="mt-4 max-w-[14ch] text-[2.65rem] font-bold leading-[1.14] text-ink xl:text-5xl">
            Manage school content with clarity and confidence.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 xl:text-lg xl:leading-8">
            Keep admissions, notices, gallery, faculty, events and parent communication organized in one secure dashboard.
          </p>
          <div className="mt-7 grid max-w-lg gap-3 sm:grid-cols-2">
            {["Supabase Auth", "Protected Dashboard", "Image Storage", "SEO CMS"].map((item) => (
              <div key={item} className="rounded-lg border border-royal-100 bg-white p-4 text-sm font-bold text-royal-800 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-lg rounded-lg border border-royal-100 bg-white p-5 shadow-premium sm:p-7 lg:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-royal-100 bg-white p-1 shadow-soft">
              <Image
                src="/assets/logo.png"
                alt="Merit School of Education Rampura Logo"
                width={80}
                height={80}
                className="h-14 w-14 object-contain"
                priority
              />
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-royal-600">
                Admin Login
              </p>
              <h2 className="text-2xl font-bold text-ink">Merit School</h2>
            </div>
          </div>

          {!supabaseReady || !adminEnabled ? (
            <div className="mt-5 rounded-lg border border-gold-200 bg-gold-50 p-4 text-sm leading-6 text-royal-900">
              <p className="font-bold">Configuration required</p>
              <p className="mt-1 text-royal-800">Add these values to <code className="font-bold">.env.local</code>, then run the SQL schema and create an admin user:</p>
              <div className="mt-3 grid gap-2 font-mono text-xs font-semibold">
                <code className="break-words rounded bg-white/80 px-3 py-2">NEXT_PUBLIC_SUPABASE_URL</code>
                <code className="break-words rounded bg-white/80 px-3 py-2">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>
                <code className="break-words rounded bg-white/80 px-3 py-2">ADMIN_CMS_ENABLED=true</code>
              </div>
            </div>
          ) : null}

          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-700">Admin Email</span>
              <span className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  {...form.register("email")}
                  type="email"
                  className="focus-ring w-full rounded-md border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-base font-semibold text-ink"
                  placeholder="admin@school.com"
                />
              </span>
              {form.formState.errors.email ? (
                <span className="text-sm font-bold text-rose-600">
                  {form.formState.errors.email.message}
                </span>
              ) : null}
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-700">Password</span>
              <span className="relative">
                <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  {...form.register("password")}
                  type="password"
                  className="focus-ring w-full rounded-md border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-base font-semibold text-ink"
                  placeholder="Enter password"
                />
              </span>
              {form.formState.errors.password ? (
                <span className="text-sm font-bold text-rose-600">
                  {form.formState.errors.password.message}
                </span>
              ) : null}
            </label>

            {error ? (
              <div className="rounded-md bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="focus-ring mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-royal-700 px-6 py-4 text-base font-bold text-white shadow-soft transition hover:bg-royal-800 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
