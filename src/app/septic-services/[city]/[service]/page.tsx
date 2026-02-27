import { notFound } from "next/navigation";
import { cities, getCityBySlug, getNeighborCities } from "@/lib/cities";
import { services, getServiceBySlug } from "@/lib/services";
import { localBusinessSchema, serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { getComboContent } from "@/lib/content";
import { LeadForm } from "@/components/LeadForm";
import { PhoneCTA } from "@/components/PhoneCTA";
import { TrustSignals } from "@/components/TrustSignals";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CityServiceGrid } from "@/components/CityServiceGrid";
import { FAQSection } from "@/components/FAQSection";
import { QuickAnswer } from "@/components/QuickAnswer";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SITE_URL } from "@/lib/constants";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import type { Metadata } from "next";

const SITE_NAME = "Fix Septic Now";
const PHONE = "(936) 292-2926";

// Parse city slug from URL param (e.g., "conroe-tx" -> "conroe")
function parseCityParam(param: string): string | null {
  if (param.endsWith("-tx")) {
    return param.slice(0, -3);
  }
  return null;
}

export function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  for (const city of cities) {
    for (const service of services) {
      params.push({
        city: `${city.slug}-tx`,
        service: service.slug,
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; service: string }> }): Promise<Metadata> {
  const { city: cityParam, service: serviceSlug } = await params;
  const citySlug = parseCityParam(cityParam);
  if (!citySlug) return {};

  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) return {};

  const isEmergency = serviceSlug === "emergency-septic-service";
  const title = isEmergency
    ? `${service.name} in ${city.name}, TX | Same-Day Response | ${SITE_NAME}`
    : `${service.name} in ${city.name}, TX | 24/7 Service | ${SITE_NAME}`;
  const description = isEmergency
    ? `Sewage backup in ${city.name}? We provide ${service.name.toLowerCase()} with same-day response, 24/7. Licensed Texas pros. Call ${PHONE} now.`
    : `Need ${service.name.toLowerCase()} in ${city.name}? Fast, licensed service with 24/7 availability. Call ${PHONE} for immediate response.`;
  const url = `${SITE_URL}/septic-services/${cityParam}/${serviceSlug}`;

  return {
    title,
    description,
    openGraph: { title, description, url, siteName: SITE_NAME, type: "website" },
    alternates: { canonical: url },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ city: string; service: string }> }) {
  const { city: cityParam, service: serviceSlug } = await params;
  const citySlug = parseCityParam(cityParam);
  if (!citySlug) notFound();

  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) notFound();

  const neighbors = getNeighborCities(city.slug);
  const comboContent = getComboContent(city.slug, service.slug);

  const comboFaqs = comboContent?.faqs || [
    { question: `How much does ${service.shortName.toLowerCase()} cost in ${city.name}, Texas?`, answer: `${service.name} in ${city.name} typically costs ${service.priceRange}. Final pricing depends on tank size, accessibility, and ${city.soilType} soil conditions common in ${city.county} County. We provide free estimates.` },
    { question: `How quickly can I get ${service.shortName.toLowerCase()} in ${city.name}, TX?`, answer: `We dispatch licensed technicians to ${city.name} and throughout ${city.county} County 24/7. Emergency response times are typically under 60 minutes. Scheduled service available within 24–48 hours.` },
    { question: `Who provides ${service.shortName.toLowerCase()} in ${city.name}?`, answer: `Fix Septic Now provides licensed, insured ${service.shortName.toLowerCase()} in ${city.name} and all of ${city.county} County. Our technicians are experienced with the ${city.soilType} soil conditions in your area. Call (936) 292-2926.` },
    { question: `What happens if I ignore septic problems in ${city.name}?`, answer: `Ignoring septic issues in ${city.name} can lead to sewage backup, drain field failure ($5,000–$15,000 to replace), property damage, and potential TCEQ violations. ${city.soilType} soil in ${city.county} County can accelerate drain field problems. Early service saves thousands.` },
    { question: `Is ${service.shortName.toLowerCase()} available on weekends in ${city.name}?`, answer: `Yes. We offer ${service.shortName.toLowerCase()} in ${city.name} seven days a week, including weekends and holidays. Emergency service is available 24/7. Call (936) 292-2926 to schedule.` },
  ];

  const schemas = [
    serviceSchema(service.name, service.description, service.priceRange, city.name),
    localBusinessSchema(city.name, city.county),
    faqSchema(comboFaqs),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Septic Services", url: `${SITE_URL}/septic-services` },
      { name: `${city.name}, TX`, url: `${SITE_URL}/septic-services/${city.slug}-tx` },
      { name: service.name, url: `${SITE_URL}/septic-services/${city.slug}-tx/${service.slug}` },
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
                <Link href="/" className="hover:underline">Home</Link>
                {" → "}
                <Link href={`/septic-services/${city.slug}-tx`} className="hover:underline">{city.name}</Link>
                {" → "}
                <span>{service.shortName}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                {service.name} in {city.name}, Texas
              </h1>
              <p className="text-lg text-green-100 mb-4">
                {comboContent?.heroDescription || service.description}
              </p>
              <p className="text-green-200 mb-6">Starting at {service.priceRange} in {city.name}</p>
              <PhoneCTA size="lg" />
            </div>
            <div id="lead-form">
              <LeadForm
                sourcePage={`/septic-services/${city.slug}-tx/${service.slug}`}
                preselectedService={service.shortName}
                preselectedCity={city.name}
              />
            </div>
          </div>
        </div>
      </section>

      <TrustSignals cityName={city.name} countyName={city.county} />

      {/* Quick Answer Box + Stats */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <QuickAnswer
            question={`How much does ${service.shortName.toLowerCase()} cost in ${city.name}, Texas?`}
            answer={`${service.name} in ${city.name} typically costs ${service.priceRange}. Pricing depends on tank size, accessibility, and the ${city.soilType} soil conditions in ${city.county} County. Call (936) 292-2926 for a free estimate — emergency service available 24/7.`}
          />
          <div className="text-slate-600 text-sm leading-relaxed space-y-2">
            <p>According to the EPA, <strong>1 in 5 U.S. homes</strong> relies on a septic system for wastewater treatment.</p>
            <p>The average septic system lasts <strong>25–30 years</strong> with proper maintenance (NSF International). Regular service in {city.name} helps protect your investment and your property.</p>
          </div>
        </div>
      </section>

      {/* Why this city needs this service - AI content or fallback */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Why {city.name} Homes Need {service.name}
          </h2>
          {comboContent?.localRelevance ? (
            comboContent.localRelevance.split("\n\n").map((p, i) => (
              <p key={i} className="text-slate-600 mb-4 leading-relaxed">{p}</p>
            ))
          ) : (
            <>
              <p className="text-slate-600 mb-4">
                Properties in {city.name}, {city.county} County rely on septic systems due to limited municipal sewer infrastructure. The area&apos;s {city.soilType} soil directly impacts septic system performance, making professional {service.shortName.toLowerCase()} essential for system longevity.
              </p>
              <p className="text-slate-600">
                Our technicians are experienced with {city.name}&apos;s specific soil and groundwater conditions, ensuring your {service.shortName.toLowerCase()} is done correctly the first time.
              </p>
            </>
          )}
        </div>
      </section>

      <ProcessSteps />

      {/* Other services in this city */}
      <CityServiceGrid mode="services-for-city" citySlug={city.slug} urlStyle="nested" />

      {/* Same service in nearby cities */}
      {neighbors.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">{service.name} in Nearby Cities</h2>
              <Link href={`/services/${service.slug}`} className="text-green-700 hover:underline text-sm font-medium hidden sm:block">
                View all Texas locations →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {neighbors.map((n) => (
                <Link key={n.slug} href={`/septic-services/${n.slug}-tx/${service.slug}`} className="text-green-700 hover:text-green-900 hover:underline text-sm py-1">
                  {n.name}, TX
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQSection faqs={comboFaqs} />

      {/* Related Reading - Blog Posts for this service */}
      {(() => {
        const posts = blogPosts.filter((p) => p.relatedServiceSlugs.includes(service.slug)).slice(0, 3);
        if (!posts.length) return null;
        return (
          <section className="py-10 bg-white border-t border-slate-100">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Helpful Guides</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="border border-slate-200 rounded-lg p-4 hover:shadow-sm hover:border-green-200 transition-all group"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-green-700">{post.category}</span>
                    <h3 className="font-semibold text-slate-900 mt-2 text-sm leading-snug group-hover:text-green-700 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

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
