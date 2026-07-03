import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message || "Invalid enquiry details."
      },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      saved: false,
      message: "Supabase is not configured; enquiry was not persisted."
    });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("enquiries").insert({
    parent_name: parsed.data.parentName,
    student_name: parsed.data.studentName,
    class_interested: parsed.data.classInterested,
    phone_number: parsed.data.phoneNumber,
    message: parsed.data.message || "",
    status: "New"
  });

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Could not save enquiry. Please try again or contact the school."
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, saved: true });
}
