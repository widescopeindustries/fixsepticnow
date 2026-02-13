import { SITE_NAME, SITE_URL, PHONE } from "./metadata";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PHONE,
    areaServed: { "@type": "State", name: "Texas" },
    logo: `${SITE_URL}/images/logo.png`,
  };
}

export function localBusinessSchema(city?: string, county?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: city ? `${SITE_NAME} - ${city}` : SITE_NAME,
    url: SITE_URL,
    telephone: PHONE,
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: city
      ? { "@type": "City", name: city, containedInPlace: { "@type": "State", name: "Texas" } }
      : { "@type": "State", name: "Texas" },
    ...(county && { address: { "@type": "PostalAddress", addressRegion: "TX", addressLocality: city } }),
  };
}

export function serviceSchema(serviceName: string, description: string, priceRange: string, city?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: city ? `${serviceName} in ${city}, TX` : `${serviceName} in Texas`,
    description,
    provider: {
      "@type": "Plumber",
      name: SITE_NAME,
      telephone: PHONE,
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
