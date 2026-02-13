import { readFileSync, existsSync } from "fs";
import { join } from "path";

const CONTENT_DIR = join(process.cwd(), "src/data/content");

export interface ServiceContent {
  heroDescription: string;
  whatIsSection: string;
  signsSection: string;
  processSection: string;
  pricingSection: string;
  faqs: { question: string; answer: string }[];
  metaDescription: string;
}

export interface CityContent {
  heroDescription: string;
  aboutSection: string;
  whyChooseSection: string;
  faqs: { question: string; answer: string }[];
  metaDescription: string;
}

export interface ComboContent {
  heroDescription: string;
  localRelevance: string;
  faqs: { question: string; answer: string }[];
  metaDescription: string;
}

function loadJson<T>(filePath: string): T | null {
  if (!existsSync(filePath)) return null;
  try {
    return JSON.parse(readFileSync(filePath, "utf-8")) as T;
  } catch {
    return null;
  }
}

export function getServiceContent(serviceSlug: string): ServiceContent | null {
  return loadJson<ServiceContent>(join(CONTENT_DIR, "services", `${serviceSlug}.json`));
}

export function getCityContent(citySlug: string): CityContent | null {
  return loadJson<CityContent>(join(CONTENT_DIR, "cities", `${citySlug}.json`));
}

export function getComboContent(citySlug: string, serviceSlug: string): ComboContent | null {
  return loadJson<ComboContent>(join(CONTENT_DIR, "combos", `${citySlug}-${serviceSlug}.json`));
}
