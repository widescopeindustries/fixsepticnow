import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data, error } = await supabase.from("leads").insert({
      name: body.name,
      phone: body.phone,
      service: body.service,
      city: body.cityZip,
      message: body.message || null,
      source_type: body.sourceType || "form",
      source_url: body.sourceUrl || "/",
      tcpa_consent: body.tcpaConsent || false,
      tcpa_timestamp: body.tcpaConsent ? new Date().toISOString() : null,
      utm_source: body.utmSource || null,
      utm_medium: body.utmMedium || null,
      utm_campaign: body.utmCampaign || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }

    // TODO: Send email notification
    // TODO: Forward to CallRail/CRM

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
