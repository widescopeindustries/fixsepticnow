import OpenAI from "openai";
import { writeFileSync, mkdirSync } from "fs";
import { cities } from "../src/lib/cities";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const OUTPUT_DIR = "src/data/content/cities";

async function generateCityContent(city: typeof cities[0]) {
  console.log(`Generating content for city: ${city.name}...`);

  const neighborNames = city.neighbors.map((n) => {
    const found = cities.find((c) => c.slug === n);
    return found ? found.name : n;
  }).join(", ");

  const prompt = `You are an expert SEO copywriter for "Fix Septic Now" (fixsepticnow.com), a Texas septic service company. Write unique, locally-relevant content for the ${city.name}, Texas service area page.

City details:
- Name: ${city.name}, Texas
- County: ${city.county} County
- Region: ${city.region}
- Population: ~${city.population.toLocaleString()}
- Soil type: ${city.soilType}
- Nearby cities: ${neighborNames}

Generate the following JSON structure (no markdown, just valid JSON):
{
  "heroDescription": "A compelling 100-150 word introduction specific to ${city.name}. Mention the city by name, reference ${city.county} County, and highlight 24/7 availability. Make it feel local - like this company knows ${city.name}.",
  "aboutSection": "A 300-400 word section about septic systems in ${city.name}. Cover: (1) Why many ${city.name} properties use septic systems instead of city sewer, (2) How the local ${city.soilType} soil affects septic performance and drain fields, (3) Common septic issues specific to ${city.county} County, (4) Any relevant local regulations or considerations. Write authoritatively but accessibly.",
  "whyChooseSection": "A 150-200 word section on why ${city.name} homeowners should choose Fix Septic Now. Reference local knowledge, fast response times to the area, and understanding of ${city.county} County soil conditions.",
  "faqs": [
    {"question": "How much does septic pumping cost in ${city.name}?", "answer": "Detailed 60-80 word answer with realistic pricing for the ${city.name} area"},
    {"question": "How often should I pump my septic tank in ${city.name}?", "answer": "Answer that references ${city.soilType} soil impact on pumping frequency"},
    {"question": "Do you offer emergency septic service in ${city.name}?", "answer": "Yes-focused answer mentioning 24/7 availability and response time to ${city.name}"},
    {"question": "What septic services do you offer in ${city.name}?", "answer": "List all 7 services: pumping, cleaning, repair, emergency, inspection, installation, maintenance"},
    {"question": "What areas near ${city.name} do you serve?", "answer": "Mention neighboring cities: ${neighborNames}"}
  ],
  "metaDescription": "A 150-155 character meta description mentioning ${city.name} and septic services. Include call to action."
}

Write naturally. Sound like a company that genuinely serves ${city.name} — not generic copy with the city name swapped in. Reference real local details.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    response_format: { type: "json_object" },
  });

  return JSON.parse(completion.choices[0].message.content || "{}");
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const city of cities) {
    try {
      const content = await generateCityContent(city);
      writeFileSync(`${OUTPUT_DIR}/${city.slug}.json`, JSON.stringify(content, null, 2));
      console.log(`  ✓ Saved ${city.slug}.json`);
    } catch (err) {
      console.error(`  ✗ Failed for ${city.slug}:`, err);
    }
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\nDone! Generated content for ${cities.length} cities.`);
}

main();
