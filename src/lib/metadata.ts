import type { Metadata } from "next";

const SITE_NAME = "Fix Septic Now";
const SITE_URL = "https://fixsepticnow.com";
const PHONE = "(936) 292-2926";

export function homeMetadata(): Metadata {
  return {
    title: `Emergency Septic Pumping & Repair in Texas | ${SITE_NAME}`,
    description: `24/7 emergency septic tank pumping, cleaning & repair across Texas. Licensed pros, fast response. Call ${PHONE} for immediate service.`,
    openGraph: {
      title: `Emergency Septic Pumping & Repair in Texas | ${SITE_NAME}`,
      description: `24/7 emergency septic tank pumping, cleaning & repair across Texas. Licensed pros, fast response.`,
      url: SITE_URL,
      siteName: SITE_NAME,
      type: "website",
    },
    alternates: { canonical: SITE_URL },
  };
}

export function serviceMetadata(serviceName: string, serviceSlug: string): Metadata {
  const title = `${serviceName} in Texas | Licensed Pros | ${SITE_NAME}`;
  const description = `Professional ${serviceName.toLowerCase()} across Texas. 24/7 availability, licensed & insured. Call ${PHONE} for a free estimate.`;
  const url = `${SITE_URL}/services/${serviceSlug}`;

  return {
    title,
    description,
    openGraph: { title, description, url, siteName: SITE_NAME, type: "website" },
    alternates: { canonical: url },
  };
}

export function cityMetadata(cityName: string, citySlug: string): Metadata {
  const title = `Septic Services in ${cityName}, TX | Pumping, Repair & More | ${SITE_NAME}`;
  const description = `${cityName}'s trusted septic service provider. Pumping, cleaning, repair & emergency service. 24/7 availability. Call ${PHONE}.`;
  const url = `${SITE_URL}/${citySlug}-septic-services`;

  return {
    title,
    description,
    openGraph: { title, description, url, siteName: SITE_NAME, type: "website" },
    alternates: { canonical: url },
  };
}

export function comboMetadata(cityName: string, serviceName: string, comboSlug: string): Metadata {
  const title = `${serviceName} in ${cityName}, TX | 24/7 Service | ${SITE_NAME}`;
  const description = `Need ${serviceName.toLowerCase()} in ${cityName}? Fast, licensed service with 24/7 availability. Call ${PHONE} for immediate response.`;
  const url = `${SITE_URL}/${comboSlug}`;

  return {
    title,
    description,
    openGraph: { title, description, url, siteName: SITE_NAME, type: "website" },
    alternates: { canonical: url },
  };
}

export { SITE_NAME, SITE_URL, PHONE };
