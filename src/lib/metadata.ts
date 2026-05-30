import type { Metadata } from "next";

const SITE_NAME = "Fix Septic Now";
const SITE_URL = "https://fixsepticnow.com";
const PHONE = "(469) 506-6606";

export function homeMetadata(): Metadata {
  return {
    title: `Emergency Septic Service Texas | 24/7 Same-Day — ${PHONE}`,
    description: `Emergency septic pumping, repair & installation across Texas. Licensed TCEQ pros, average response under 2 hours. Call ${PHONE} now — 24/7 dispatch.`,
    openGraph: {
      title: `Emergency Septic Pumping & Repair in Texas | ${SITE_NAME}`,
      description: `Emergency septic pumping, repair & installation across Texas. Licensed pros, average response under 2 hours. Call now — 24/7 dispatch.`,
      url: SITE_URL,
      siteName: SITE_NAME,
      type: "website",
    },
    alternates: { canonical: SITE_URL },
  };
}

export function serviceMetadata(serviceName: string, serviceSlug: string): Metadata {
  const isEmergency = serviceSlug === "emergency-septic-service";
  const title = isEmergency
    ? `Sewage Backup? ${serviceName} Texas — 24/7 Same-Day Response`
    : `${serviceName} in Texas — Free Estimates, Same-Day Service`;
  const description = isEmergency
    ? `Sewage backup? Septic overflow? We provide ${serviceName.toLowerCase()} across Texas — same-day response, 24/7. Call ${PHONE} now.`
    : `Professional ${serviceName.toLowerCase()} across Texas. 24/7 availability, licensed & insured. Call ${PHONE} for a free estimate.`;
  const url = `${SITE_URL}/services/${serviceSlug}`;

  return {
    title,
    description,
    openGraph: { title, description, url, siteName: SITE_NAME, type: "website" },
    alternates: { canonical: url },
  };
}

export function cityMetadata(cityName: string, citySlug: string): Metadata {
  const title = `Septic Pumping & Repair ${cityName}, TX | 24/7 Emergency Service — ${PHONE}`;
  const description = `Emergency septic pumping & repair in ${cityName}, TX. Licensed TCEQ contractors, same-day response. Call ${PHONE} now for immediate dispatch.`;
  const url = `${SITE_URL}/septic-services/${citySlug}-tx`;

  return {
    title,
    description,
    openGraph: { title, description, url, siteName: SITE_NAME, type: "website" },
    alternates: { canonical: url },
  };
}

export function comboMetadata(cityName: string, serviceName: string, comboSlug: string): Metadata {
  const isEmergency = comboSlug.includes("emergency");
  const title = isEmergency
    ? `${serviceName} ${cityName}, TX | 24/7 Same-Day — ${PHONE}`
    : `${serviceName} ${cityName}, TX | Free Estimate — ${PHONE}`;
  const description = isEmergency
    ? `Sewage backup in ${cityName}? ${serviceName} with same-day response, 24/7. Licensed Texas pros. Call ${PHONE} now.`
    : `Need ${serviceName.toLowerCase()} in ${cityName}? Fast, licensed service with 24/7 availability. Call ${PHONE} for immediate response.`;
  const url = `${SITE_URL}/septic-services/${comboSlug}`;

  return {
    title,
    description,
    openGraph: { title, description, url, siteName: SITE_NAME, type: "website" },
    alternates: { canonical: url },
  };
}

export { SITE_NAME, SITE_URL, PHONE };
