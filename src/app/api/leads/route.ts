import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase not configured");
  return createClient(url, key);
}

async function sendLeadNotification(lead: {
  name: string;
  phone: string;
  service: string;
  city: string;
  message?: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn("RESEND_API_KEY not configured - skipping email notification");
    return;
  }

  const resend = new Resend(resendKey);

  try {
    await resend.emails.send({
      from: "Fix Septic Now <leads@fixsepticnow.com>",
      to: ["morelyndon@pm.me"],
      subject: `🚨 NEW LEAD: ${lead.name} - ${lead.city}`,
      html: `
        <h2>🚨 New Septic Lead!</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
            <td style="padding: 8px; border: 1px solid #ddd;"><a href="tel:${lead.phone}">${lead.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Service</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.service}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Location</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.city}</td>
          </tr>
          ${lead.message ? `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.message}</td>
          </tr>
          ` : ""}
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 500px;">
          <p style="margin: 0 0 10px; font-weight: bold; color: #0f172a;">Dispatch Checklist</p>
          <ol style="margin: 0; padding-left: 18px; color: #334155;">
            <li>Call the lead immediately and confirm the exact job type.</li>
            <li>Find the nearest local septic partner who can actually take the job.</li>
            <li>Confirm price, ETA, and any Sunday or emergency add-on.</li>
            <li>Do not dispatch until the customer approves the quote.</li>
            <li>Text or call back with contractor name, ETA, and final price.</li>
          </ol>
        </div>
        <p style="margin-top: 16px; color: #666;">
          <strong>Speed to lead matters.</strong> The goal is to get a confirmed local partner, price, and ETA in front of the customer fast.
        </p>
      `,
    });
    console.log("Lead notification email sent successfully");
  } catch (emailError) {
    console.error("Failed to send lead notification email:", emailError);
    // Don't fail the request if email fails - lead is already saved
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const supabase = getSupabase();
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

    // Send email notification (non-blocking)
    sendLeadNotification({
      name: body.name,
      phone: body.phone,
      service: body.service,
      city: body.cityZip,
      message: body.message,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
