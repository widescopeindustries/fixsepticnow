/**
 * Generate combo content JSON files for new cities.
 * Run: node scripts/generate-city-combos.mjs
 */

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUT_DIR = join(process.cwd(), "src/data/content/combos");

const services = [
  { slug: "septic-pumping", name: "Septic Tank Pumping", short: "septic pumping", price: "$300 to $600", emergency: false },
  { slug: "septic-cleaning", name: "Septic Tank Cleaning", short: "septic cleaning", price: "$350 to $700", emergency: false },
  { slug: "septic-repair", name: "Septic Tank Repair", short: "septic repair", price: "$500 to $3,000+", emergency: false },
  { slug: "septic-inspection", name: "Septic Tank Inspection", short: "septic inspection", price: "$200 to $500", emergency: false },
  { slug: "septic-installation", name: "Septic Tank Installation", short: "septic installation", price: "$5,000 to $15,000+", emergency: false },
  { slug: "septic-maintenance", name: "Septic Tank Maintenance", short: "septic maintenance", price: "$200 to $400/year", emergency: false },
  { slug: "emergency-septic-service", name: "Emergency Septic Pumping", short: "emergency septic service", price: "$500 to $1,500+", emergency: true },
];

const cities = [
  {
    slug: "midlothian",
    name: "Midlothian",
    county: "Ellis",
    region: "dfw-metro",
    soil: "blackland clay",
    detail: "rapidly growing Ellis County city with newer developments and rural acreage near Joe Pool Lake",
    nearby: "Waxahachie, Ennis, Red Oak, Cedar Hill",
  },
  {
    slug: "red-oak",
    name: "Red Oak",
    county: "Ellis",
    region: "dfw-metro",
    soil: "blackland clay",
    detail: "growing suburban community just south of Dallas County",
    nearby: "Midlothian, Ennis, Waxahachie, Lancaster",
  },
  {
    slug: "gainesville",
    name: "Gainesville",
    county: "Cooke",
    region: "dfw-metro",
    soil: "sandy loam and clay",
    detail: "county seat of Cooke County at the northern edge of DFW, with many rural and Lake Texoma properties",
    nearby: "Weatherford, Bowie, Whitesboro, Sanger",
  },
  {
    slug: "stephenville",
    name: "Stephenville",
    county: "Erath",
    region: "dfw-metro",
    soil: "sandy loam and clay",
    detail: "home to Tarleton State University and surrounded by ranch and acreage properties",
    nearby: "Granbury, Weatherford, Dublin, Hico",
  },
  {
    slug: "paris",
    name: "Paris",
    county: "Lamar",
    region: "east-texas",
    soil: "sandy loam",
    detail: "historic northeast Texas city with rural acreage and lake properties",
    nearby: "Athens, Reno, Blossom, Powderly",
  },
  {
    slug: "jacksonville",
    name: "Jacksonville",
    county: "Cherokee",
    region: "east-texas",
    soil: "sandy loam",
    detail: "East Texas city in the Piney Woods with rural properties and lake homes",
    nearby: "Rusk, Palestine, Athens, Canton",
  },
];

function generateHero(city, service) {
  if (service.emergency) {
    return `Sewage backup in ${city.name}? Fix Septic Now provides 24/7 emergency septic service throughout ${city.name} and ${city.county} County. ${city.detail}. Our licensed technicians respond day or night, including weekends and holidays, to contain the backup, pump the tank, and stabilize your system. Call (469) 986-7883 now.`;
  }
  return `Fix Septic Now provides professional ${service.short} in ${city.name} and ${city.county} County. ${city.detail}. Our licensed technicians understand the ${city.soil} soil conditions and how they affect septic system performance. ${service.price ? `${service.name} in ${city.name} typically costs ${service.price}.` : ""} Call (469) 986-7883 for a free estimate${service.emergency ? " — available 24/7" : ""}.`;
}

function generateLocalRelevance(city, service) {
  const base = `${city.name} is located in ${city.county} County, Texas, where ${service.short} must account for local ${city.soil} soil conditions. `;

  if (service.slug === "septic-pumping") {
    return base + `Regular pumping is essential here because overfull tanks allow solids to reach the drain field. In ${city.soil} soils, this can lead to permanent damage and expensive repairs. Our technicians serve all ${city.name} neighborhoods and surrounding rural properties with reliable pump-outs and basic inspections.`;
  }
  if (service.slug === "septic-cleaning") {
    return base + `Full cleaning removes built-up sludge and residue that basic pumping can leave behind. In ${city.name}, this extra step helps protect drain fields and extends system life, especially for older tanks or systems that haven't been serviced on schedule.`;
  }
  if (service.slug === "septic-repair") {
    return base + `Common repairs in ${city.name} include cracked tanks, broken baffles, damaged pipes, and drain field issues. Our technicians diagnose the full system, not just the obvious symptom, and provide honest recommendations based on local soil and system age.`;
  }
  if (service.slug === "septic-inspection") {
    return base + `Our inspections evaluate the tank, distribution components, and drain field with local conditions in mind. For home buyers and sellers in ${city.name}, a thorough septic inspection can prevent expensive surprises at closing.`;
  }
  if (service.slug === "septic-installation") {
    return base + `New septic systems in ${city.name} must be designed for local soil, household size, and available space. We handle site evaluation, design, permitting, and installation, ensuring your system meets TCEQ and ${city.county} County requirements.`;
  }
  if (service.slug === "septic-maintenance") {
    return base + `Our maintenance plans include scheduled inspections, pumping reminders, and priority service. For ${city.name} homeowners, staying ahead of maintenance is the best way to avoid emergencies and extend system life.`;
  }
  return base + `Emergency situations in ${city.name} often involve overfull tanks, failed drain fields, or structural damage from soil movement. We prioritize containment and stabilization, then recommend the right repair to prevent recurrence.`;
}

function generateFaqs(city, service) {
  const faqs = [];

  if (service.emergency) {
    faqs.push(
      {
        question: `What counts as a septic emergency in ${city.name}?`,
        answer: `Sewage backing up into your home, raw sewage pooling in the yard, a septic alarm that won't stop, multiple drains backing up at once, or strong sewage odors making rooms unusable are all emergencies. Stop using water and call (469) 986-7883 immediately.`,
      },
      {
        question: `How fast can you get to ${city.name} for an emergency?`,
        answer: `We typically dispatch an emergency technician to ${city.name} within 60 to 120 minutes, depending on your exact location and current call volume. True 24/7 service means nights, weekends, and holidays.`,
      },
      {
        question: `How much does emergency septic service cost in ${city.name}?`,
        answer: `Emergency septic service in ${city.name} typically ranges from $500 to $1,500 or more, depending on severity, time of day, and any repairs needed. We provide transparent pricing even in urgent situations.`,
      }
    );
  } else {
    faqs.push(
      {
        question: `How much does ${service.short} cost in ${city.name}?`,
        answer: `${service.name} in ${city.name} typically costs ${service.price}. Final pricing depends on tank size, accessibility, system condition, and local ${city.soil} soil factors. We provide a free, upfront quote before starting.`,
      },
      {
        question: service.slug === "septic-pumping" ? `How often should I pump my septic tank in ${city.name}?` : `Who provides ${service.short} in ${city.name}?`,
        answer: service.slug === "septic-pumping"
          ? `Most ${city.name} homes should pump every 3 to 5 years. Larger households, homes with garbage disposals, or systems on ${city.soil} often benefit from more frequent service.`
          : `Fix Septic Now provides licensed, insured ${service.short} in ${city.name} and all of ${city.county} County. Our technicians are experienced with local ${city.soil} conditions. Call (469) 986-7883.`,
      },
      {
        question: `Do you offer ${service.short} on weekends in ${city.name}?`,
        answer: `Yes. We offer ${service.short} in ${city.name} seven days a week, including weekends and holidays. Emergency service is available 24/7. Call (469) 986-7883 to schedule.`,
      }
    );
  }

  return faqs;
}

function generateMeta(city, service) {
  if (service.emergency) {
    return `24/7 emergency septic service in ${city.name}, TX. Fast response for backups, overflows & alarms. Licensed ${city.county} County technicians. Call (469) 986-7883 now.`;
  }
  return `${service.name} in ${city.name}, TX. Licensed ${city.county} County service, upfront pricing. Call (469) 986-7883 for a free estimate.`;
}

function generateCombo(city, service) {
  return {
    heroDescription: generateHero(city, service),
    localRelevance: generateLocalRelevance(city, service),
    faqs: generateFaqs(city, service),
    metaDescription: generateMeta(city, service),
  };
}

mkdirSync(OUT_DIR, { recursive: true });

let count = 0;
for (const city of cities) {
  for (const service of services) {
    const filePath = join(OUT_DIR, `${city.slug}-${service.slug}.json`);
    const content = generateCombo(city, service);
    writeFileSync(filePath, JSON.stringify(content, null, 2) + "\n");
    count++;
  }
}

console.log(`Generated ${count} combo files in ${OUT_DIR}`);
