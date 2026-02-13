import { notFound } from "next/navigation";
import { cities, getCityBySlug, getNeighborCities } from "@/lib/cities";
import { services, getServiceBySlug } from "@/lib/services";
import { cityMetadata, comboMetadata } from "@/lib/metadata";
import { localBusinessSchema, serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { LeadForm } from "@/components/LeadForm";
import { PhoneCTA } from "@/components/PhoneCTA";
import { TrustSignals } from "@/components/TrustSignals";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ServiceCard } from "@/components/ServiceCard";
import { CityServiceGrid } from "@/components/CityServiceGrid";
import { FAQSection } from "@/components/FAQSection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SITE_URL } from "@/lib/constants";
import Link from "next/link";

type PageType = "city" | "combo";

function parseCityServiceSlug(slug: string): { type: PageType; citySlug: string; serviceSlug?: string; city?: ReturnType<typeof getCityBySlug>; service?: ReturnType<typeof getServiceBySlug> } | null {
  // Try city page first: [city]-septic-services
  if (slug.endsWith("-septic-services")) {
    const citySlug = slug.replace("-septic-services", "");
    const city = getCityBySlug(citySlug);
    if (city) return { type: "city", citySlug, city };
  }

  // Try combo: [city]-[service-slug]
  for (const service of services) {
    if (slug.endsWith(`-${service.slug}`)) {
      const citySlug = slug.replace(`-${service.slug}`, "");
      const city = getCityBySlug(citySlug);
      if (city) return { type: "combo", citySlug, serviceSlug: service.slug, city, service };
    }
  }

  return null;
}

export function generateStaticParams() {
  const params: { cityService: string }[] = [];

  // City pages
  for (const city of cities) {
    params.push({ cityService: `${city.slug}-septic-services` });
  }

  // City+Service combo pages
  for (const city of cities) {
    for (const service of services) {
      params.push({ cityService: `${city.slug}-${service.slug}` });
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ cityService: string }> }) {
  const { cityService } = await params;
  const parsed = parseCityServiceSlug(cityService);
  if (!parsed || !parsed.city) return {};

  if (parsed.type === "city") {
    return cityMetadata(parsed.city.name, parsed.city.slug);
  }

  if (parsed.type === "combo" && parsed.service) {
    return comboMetadata(parsed.city.name, parsed.service.name, cityService);
  }

  return {};
}

export default async function CityServicePage({ params }: { params: Promise<{ cityService: string }> }) {
  const { cityService } = await params;
  const parsed = parseCityServiceSlug(cityService);
  if (!parsed || !parsed.city) notFound();

  const { city } = parsed;
  const neighbors = getNeighborCities(city.slug);

  // ========== CITY PAGE ==========
  if (parsed.type === "city") {
    const cityFaqs = [
      { question: `How much does septic pumping cost in ${city.name}?`, answer: `Septic pumping in ${city.name} typically costs $300-$600. Prices vary based on tank size and accessibility. We provide free estimates.` },
      { question: `Do you offer emergency septic service in ${city.name}?`, answer: `Yes! We provide 24/7 emergency septic service in ${city.name} and throughout ${city.county} County. Call (936) 292-2926 anytime.` },
      { question: `What type of soil does ${city.name} have?`, answer: `${city.name} has predominantly ${city.soilType} soil. This soil type affects drain field performance and may require specific septic system designs.` },
      { question: `How often should I pump my septic tank in ${city.name}?`, answer: `With ${city.soilType} soil common in ${city.name}, we recommend pumping every 3-5 years. Homes with more occupants should pump more frequently.` },
    ];

    const schemas = [
      localBusinessSchema(city.name, city.county),
      faqSchema(cityFaqs),
      breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: `${city.name} Septic Services`, url: `${SITE_URL}/${city.slug}-septic-services` },
      ]),
    ];

    return (
      <>
        <SchemaMarkup schemas={schemas} />

        <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <nav className="text-sm text-green-200 mb-4">
                  <a href="/" className="hover:underline">Home</a> → <span>{city.name} Septic Services</span>
                </nav>
                <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                  Septic Tank Services in {city.name}, Texas
                </h1>
                <p className="text-lg text-green-100 mb-6">
                  Licensed septic professionals serving {city.name} and {city.county} County. 24/7 emergency service, fast response, fair pricing.
                </p>
                <PhoneCTA size="lg" />
              </div>
              <div id="lead-form">
                <LeadForm sourcePage={`/${city.slug}-septic-services`} preselectedCity={city.name} />
              </div>
            </div>
          </div>
        </section>

        <TrustSignals cityName={city.name} countyName={city.county} />

        {/* Services for this city */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">
              Septic Services in {city.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((s) => (
                <ServiceCard key={s.slug} service={s} citySlug={city.slug} />
              ))}
            </div>
          </div>
        </section>

        {/* Local info */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">About Septic Systems in {city.name}</h2>
            <p className="text-slate-600 mb-4">
              {city.name} is located in {city.county} County, Texas, where many residential properties rely on septic systems rather than municipal sewer connections. The area&apos;s {city.soilType} soil conditions play a significant role in septic system performance and drain field effectiveness.
            </p>
            <p className="text-slate-600">
              Regular septic maintenance is especially important in {city.name} due to local soil conditions. Our licensed technicians understand the specific challenges of {city.county} County properties and provide tailored solutions for your septic system needs.
            </p>
          </div>
        </section>

        <ProcessSteps />

        {/* Nearby cities */}
        {neighbors.length > 0 && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Septic Services Near {city.name}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {neighbors.map((n) => (
                  <Link key={n.slug} href={`/${n.slug}-septic-services`} className="text-green-700 hover:text-green-900 hover:underline text-sm py-1">
                    {n.name}, TX
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <FAQSection faqs={cityFaqs} />

        <section className="bg-green-800 text-white py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Septic Help in {city.name}?</h2>
            <p className="text-green-100 mb-8">Call now for fast, professional septic service in {city.county} County.</p>
            <PhoneCTA size="lg" />
          </div>
        </section>
      </>
    );
  }

  // ========== COMBO PAGE (city + service) ==========
  const service = parsed.service!;
  const comboFaqs = [
    { question: `How much does ${service.shortName.toLowerCase()} cost in ${city.name}?`, answer: `${service.name} in ${city.name} typically costs ${service.priceRange}. Final pricing depends on your specific situation. We provide free estimates.` },
    { question: `How fast can you get to ${city.name}?`, answer: `We dispatch technicians to ${city.name} and ${city.county} County 24/7. Response times are typically under 60 minutes for emergencies.` },
    { question: `Are you licensed to work in ${city.name}?`, answer: `Yes. All our technicians are Texas state licensed, insured, and experienced with the ${city.soilType} soil conditions common in ${city.name}.` },
  ];

  const schemas = [
    serviceSchema(service.name, service.description, service.priceRange, city.name),
    localBusinessSchema(city.name, city.county),
    faqSchema(comboFaqs),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: `${city.name} Septic Services`, url: `${SITE_URL}/${city.slug}-septic-services` },
      { name: service.name, url: `${SITE_URL}/${cityService}` },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      <section className={`py-16 md:py-24 ${service.isEmergency ? "bg-gradient-to-br from-red-900 via-red-800 to-red-900" : "bg-gradient-to-br from-green-900 via-green-800 to-green-900"} text-white`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <nav className="text-sm text-green-200 mb-4">
                <a href="/" className="hover:underline">Home</a> → <a href={`/${city.slug}-septic-services`} className="hover:underline">{city.name}</a> → <span>{service.shortName}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                {service.name} in {city.name}, Texas
              </h1>
              <p className="text-lg text-green-100 mb-4">{service.description}</p>
              <p className="text-green-200 mb-6">Starting at {service.priceRange} in {city.name}</p>
              <PhoneCTA size="lg" />
            </div>
            <div id="lead-form">
              <LeadForm
                sourcePage={`/${cityService}`}
                preselectedService={service.shortName}
                preselectedCity={city.name}
              />
            </div>
          </div>
        </div>
      </section>

      <TrustSignals cityName={city.name} countyName={city.county} />

      {/* Why this city needs this service */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Why {city.name} Homes Need {service.name}
          </h2>
          <p className="text-slate-600 mb-4">
            Properties in {city.name}, {city.county} County rely on septic systems due to limited municipal sewer infrastructure. The area&apos;s {city.soilType} soil directly impacts septic system performance, making professional {service.shortName.toLowerCase()} essential for system longevity.
          </p>
          <p className="text-slate-600">
            Our technicians are experienced with {city.name}&apos;s specific soil and groundwater conditions, ensuring your {service.shortName.toLowerCase()} is done correctly the first time.
          </p>
        </div>
      </section>

      <ProcessSteps />

      {/* Other services in this city */}
      <CityServiceGrid mode="services-for-city" citySlug={city.slug} />

      {/* Same service in nearby cities */}
      {neighbors.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{service.name} in Nearby Cities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {neighbors.map((n) => (
                <Link key={n.slug} href={`/${n.slug}-${service.slug}`} className="text-green-700 hover:text-green-900 hover:underline text-sm py-1">
                  {n.name}, TX
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQSection faqs={comboFaqs} />

      <section className="bg-green-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need {service.name} in {city.name}?</h2>
          <p className="text-green-100 mb-8">Call now. Fast, licensed service in {city.county} County.</p>
          <PhoneCTA size="lg" />
        </div>
      </section>
    </>
  );
}
