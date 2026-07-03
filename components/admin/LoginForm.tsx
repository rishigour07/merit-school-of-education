"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function LoginForm({ supabaseReady }: { supabaseReady: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get("redirectedFrom") || "/admin/dashboard";
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

    if (!supabaseReady || !isBrowserSupabaseConfigured()) {
      setError(
        "Supabase is not configured yet. Add env vars and create an admin user first."
      );
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword(values);
      if (signInError) {
        setError(signInError.message);
        return;
      }
      router.push(redirectedFrom);
      router.refresh();
    } catch {
      setError("Login failed. Check Supabase configuration.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#EEF6FF_0%,#FFFFFF_52%,#FFF8DA_100%)] px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden lg:block">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-royal-600">
            Merit School CMS
          </p>
          <h1 className="mt-4 text-5xl font-black leading-tight text-ink">
            Manage a premium school website without touching code.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Update admissions, notices, gallery, teachers, events, SEO settings
            and parent enquiries from one secure dashboard.
          </p>
          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            {["Supabase Auth", "Protected Dashboard", "Image Storage", "SEO CMS"].map((item) => (
              <div key={item} className="rounded-lg border border-royal-100 bg-white p-4 text-sm font-black text-royal-800 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-md rounded-lg border border-royal-100 bg-white p-6 shadow-premium sm:p-8">
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
              <p className="text-sm font-black uppercase tracking-[0.14em] text-royal-600">
                Admin Login
              </p>
              <h2 className="text-2xl font-black text-ink">Merit School</h2>
            </div>
          </div>

          {!supabaseReady ? (
            <div className="mt-6 rounded-lg border border-gold-200 bg-gold-50 p-4 text-sm font-bold leading-6 text-royal-900">
              Setup required: add{" "}
              <code className="break-all rounded bg-white/70 px-1 py-0.5 text-[0.82em]">
                NEXT_PUBLIC_SUPABASE_URL
              </code>{" "}
              and{" "}
              <code className="break-all rounded bg-white/70 px-1 py-0.5 text-[0.82em]">
                NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
              </code>{" "}
              to{" "}
              <code className="break-all rounded bg-white/70 px-1 py-0.5 text-[0.82em]">
                .env.local
              </code>
              , run the SQL schema, then create an admin user in Supabase Auth.
            </div>
          ) : null}

          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-black text-slate-700">Admin Email</span>
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
              <span className="text-sm font-black text-slate-700">Password</span>
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
              className="focus-ring mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-royal-700 px-6 py-4 text-base font-black text-white shadow-soft transition hover:bg-royal-800 disabled:opacity-60"
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
