import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
}

const SYSTEM_PROMPT = `You are a helpful septic service assistant for Fix Septic Now, a 24/7 septic service company in Texas.

Your goal is to:
1. Understand the customer's septic issue
2. Show empathy (especially for emergencies - sewage backups are stressful)
3. Collect their name, phone number, and city/location
4. Once you have their info, confirm you'll dispatch help

Keep responses SHORT - 2-3 sentences max. Be warm and professional.

When you've collected name + phone + city, respond with the info in this exact format at the end of your message:
[LEAD_CAPTURED: name="Their Name" phone="Their Phone" city="Their City" service="Service Type"]

Service types: Pumping, Cleaning, Repair, Emergency, Inspection, Installation, Maintenance

Do NOT show the [LEAD_CAPTURED] tag to the user - include it invisibly at the end. Your visible response should be a confirmation message like "Great, we'll have a technician call you at [phone] shortly!"`;

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId, sourcePage } = await req.json();

    if (!messages || messages.length > 20) {
      return NextResponse.json({ reply: "For faster help, please call us at (936) 292-2926." });
    }

    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "";

    // Check if lead was captured
    const leadMatch = reply.match(
      /\[LEAD_CAPTURED:\s*name="([^"]+)"\s*phone="([^"]+)"\s*city="([^"]+)"\s*service="([^"]+)"\]/
    );

    if (leadMatch) {
      // Save lead via internal API
      const leadData = {
        name: leadMatch[1],
        phone: leadMatch[2],
        cityZip: leadMatch[3],
        service: leadMatch[4],
        sourceType: "chat",
        sourceUrl: sourcePage || "/",
        message: `Chat session ${sessionId}`,
        tcpaConsent: true,
      };

      // Fire and forget - save lead
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      }).catch(() => {});
    }

    // Strip the lead capture tag from visible reply
    const cleanReply = reply.replace(/\[LEAD_CAPTURED:[^\]]+\]/, "").trim();

    return NextResponse.json({ reply: cleanReply });
  } catch {
    return NextResponse.json(
      { reply: "I'm having trouble right now. Please call (936) 292-2926 for immediate help." },
      { status: 500 }
    );
  }
}
