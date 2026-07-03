import { NextResponse } from "next/server";
import { contactMessageSchema } from "@/lib/validation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactMessageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message || "Invalid contact details." },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      saved: false,
      message: "Supabase is not configured; the message was not persisted."
    });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: parsed.data.name,
    phone_number: parsed.data.phoneNumber,
    email: parsed.data.email || null,
    subject: parsed.data.subject,
    message: parsed.data.message,
    status: "New"
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please call the school office." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, saved: true });
}
