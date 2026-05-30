import { SITE_NAME, SITE_URL, PHONE } from "./metadata";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PHONE,
    areaServed: { "@type": "State", name: "Texas" },
    logo: `${SITE_URL}/images/FIXSEPTIC%20NOW%20IMAGE.png`,
  };
}

export function localBusinessSchema(city?: string, county?: string, lat?: number, lng?: number) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: city ? `${SITE_NAME} — ${city}, TX` : SITE_NAME,
    url: SITE_URL,
    telephone: PHONE,
    email: "info@fixsepticnow.com",
    priceRange: "$$",
    image: `${SITE_URL}/images/FIXSEPTIC%20NOW%20IMAGE.png`,
    address: city
      ? {
          "@type": "PostalAddress",
          addressLocality: city,
          addressRegion: "TX",
          addressCountry: "US",
        }
      : undefined,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: city
      ? {
          "@type": "City",
          name: city,
          containedInPlace: { "@type": "State", name: "Texas" },
        }
      : {
          "@type": "State",
          name: "Texas",
        },
    founder: {
      "@type": "Organization",
      name: "Widescope Industries LLC",
      description: "Service-Disabled Veteran-Owned Small Business (SDVOSB)",
    },
  };

  if (lat !== undefined && lng !== undefined) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: lat,
      longitude: lng,
    };
  }

  return schema;
}

export function serviceSchema(serviceName: string, description: string, priceRange: string, city?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: city ? `${serviceName} in ${city}, TX` : `${serviceName} in Texas`,
    description,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: SITE_NAME,
      telephone: PHONE,
      url: SITE_URL,
    },
    areaServed: city
      ? { "@type": "City", name: city }
      : { "@type": "State", name: "Texas" },
    offers: {
      "@type": "Offer",
      priceSpecification: { "@type": "PriceSpecification", priceCurrency: "USD" },
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function articleSchema(title: string, description: string, url: string, datePublished: string, dateModified?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/FIXSEPTIC%20NOW%20IMAGE.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function howToSchema(name: string, description: string, steps: { name: string; text: string; url?: string }[], totalTime?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
      url: step.url,
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
