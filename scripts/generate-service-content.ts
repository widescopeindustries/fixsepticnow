import OpenAI from "openai";
import { writeFileSync, mkdirSync } from "fs";
import { services } from "../src/lib/services";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const OUTPUT_DIR = "src/data/content/services";

async function generateServiceContent(service: typeof services[0]) {
  console.log(`Generating content for service: ${service.name}...`);

  const prompt = `You are an expert SEO copywriter for a Texas septic service company called "Fix Septic Now" (fixsepticnow.com). Write unique, authoritative content for the "${service.name}" service page.

Target keywords: ${service.keywords.join(", ")}
Price range: ${service.priceRange}
Is emergency service: ${service.isEmergency}

Generate the following JSON structure (no markdown, just valid JSON):
{
  "heroDescription": "A compelling 150-200 word introduction for the hero section. Focus on the customer's pain point and how Fix Septic Now solves it. Mention Texas, 24/7 availability, licensed professionals. Include a natural mention of the price range.",
  "whatIsSection": "A 300-400 word educational section titled 'What is ${service.name}?' explaining the service in plain language. Cover what it involves, why it's needed, and what homeowners should expect. Write for Texas homeowners who may not know much about septic systems.",
  "signsSection": "A 200-300 word section about warning signs that indicate you need this service. Be specific and practical. Format as a narrative with embedded list items.",
  "processSection": "A 150-200 word description of how Fix Septic Now handles this service from start to finish. Make it sound professional but approachable.",
  "pricingSection": "A 100-150 word section about pricing. Be transparent about the range (${service.priceRange}), what affects cost, and emphasize free estimates with no hidden fees.",
  "faqs": [
    {"question": "FAQ 1 relevant to ${service.name}", "answer": "Detailed 50-80 word answer"},
    {"question": "FAQ 2", "answer": "Detailed answer"},
    {"question": "FAQ 3", "answer": "Detailed answer"},
    {"question": "FAQ 4", "answer": "Detailed answer"},
    {"question": "FAQ 5", "answer": "Detailed answer"},
    {"question": "FAQ 6", "answer": "Detailed answer"}
  ],
  "metaDescription": "A compelling 150-155 character meta description for SEO. Include primary keyword and call to action."
}

Write naturally, avoid keyword stuffing. Sound like a real Texas service company - professional but friendly. Every FAQ answer should be genuinely helpful.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    response_format: { type: "json_object" },
  });

  const content = JSON.parse(completion.choices[0].message.content || "{}");
  return content;
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const service of services) {
    try {
      const content = await generateServiceContent(service);
      writeFileSync(`${OUTPUT_DIR}/${service.slug}.json`, JSON.stringify(content, null, 2));
      console.log(`  ✓ Saved ${service.slug}.json`);
    } catch (err) {
      console.error(`  ✗ Failed for ${service.slug}:`, err);
    }
    // Rate limit pause
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log("\nDone! Generated content for all services.");
}

main();
