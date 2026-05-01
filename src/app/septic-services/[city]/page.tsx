import { notFound } from "next/navigation";
import { cities, getCityBySlug, getNeighborCities, getResponseTime } from "@/lib/cities";
import { services } from "@/lib/services";
import { localBusinessSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { getCityContent } from "@/lib/content";
import { LeadForm } from "@/components/LeadForm";
import { PhoneCTA } from "@/components/PhoneCTA";
import { TrustSignals } from "@/components/TrustSignals";
import { LiveAvailability } from "@/components/LiveAvailability";
import { UrgencyBar } from "@/components/UrgencyBar";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ServiceCard } from "@/components/ServiceCard";
import { FAQSection } from "@/components/FAQSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { MapEmbed } from "@/components/MapEmbed";
import { QuickAnswer } from "@/components/QuickAnswer";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SITE_URL } from "@/lib/constants";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { getCityTestimonials } from "@/lib/testimonials";
import type { Metadata } from "next";

const SITE_NAME = "Fix Septic Now";
const PHONE = "(469) 506-6606";

// Parse city slug from URL param (e.g., "conroe-tx" -> "conroe")
function parseCityParam(param: string): string | null {
  if (param.endsWith("-tx")) {
    return param.slice(0, -3);
  }
  return null;
}

export function generateStaticParams() {
  return cities.map((city) => ({
    city: `${city.slug}-tx`,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: cityParam } = await params;
  const citySlug = parseCityParam(cityParam);
  if (!citySlug) return {};

  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const title = `Emergency Septic Service ${city.name}, TX | ${PHONE} | 24/7`;
  const description = `24/7 emergency septic pumping & repair in ${city.name}, TX. Licensed pros, same-day response. Call ${PHONE} now for immediate dispatch.`;
  const url = `${SITE_URL}/septic-services/${cityParam}`;

  return {
    title,
    description,
    openGraph: { title, description, url, siteName: SITE_NAME, type: "website" },
    alternates: { canonical: url },
  };
}

export default async function CityHubPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: cityParam } = await params;
  const citySlug = parseCityParam(cityParam);
  if (!citySlug) notFound();

  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const neighbors = getNeighborCities(city.slug);
  const content = getCityContent(city.slug);
  const responseTime = getResponseTime(city);
  const cityTestimonials = getCityTestimonials(city.name);

  const cityFaqs = content?.faqs || [
    { question: `How much does septic pumping cost in ${city.name}?`, answer: `Septic pumping in ${city.name} typically costs $300-$600. Prices vary based on tank size and accessibility. We provide free estimates.` },
    { question: `Do you offer emergency septic service in ${city.name}?`, answer: `Yes! We provide 24/7 emergency septic service in ${city.name} and throughout ${city.county} County. Call (469) 506-6606 anytime.` },
    { question: `What type of soil does ${city.name} have?`, answer: `${city.name} has predominantly ${city.soilType} soil. This soil type affects drain field performance and may require specific septic system designs.` },
    { question: `How often should I pump my septic tank in ${city.name}?`, answer: `With ${city.soilType} soil common in ${city.name}, we recommend pumping every 3-5 years. Homes with more occupants should pump more frequently.` },
    { question: `How do I find a licensed septic company near ${city.name}?`, answer: `Look for companies licensed by the Texas Commission on Environmental Quality (TCEQ) with insurance and local experience. Fix Septic Now is fully licensed, insured, and serves ${city.name} and all of ${city.county} County. Call (469) 506-6606 for a free estimate.` },
  ];

  const schemas = [
    localBusinessSchema(city.name, city.county, city.lat, city.lng),
    faqSchema(cityFaqs),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Septic Services", url: `${SITE_URL}/septic-services` },
      { name: `${city.name}, TX`, url: `${SITE_URL}/septic-services/${city.slug}-tx` },
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
                <Link href="/" className="hover:underline">Home</Link>
                {" → "}
                <span>{city.name} Septic Services</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                Emergency Septic Service in {city.name}, TX — 24/7 Available
              </h1>
              <p className="text-lg text-green-100 mb-2">
                {content?.heroDescription || `Licensed septic professionals serving ${city.name} and ${city.county} County. 24/7 emergency service, fast response, fair pricing.`}
              </p>
              <p className="text-green-200 mb-4 font-semibold">Average response time to {city.name}: {responseTime}</p>
              <PhoneCTA size="lg" />
              <LiveAvailability cityName={city.name} />
            </div>
            <div id="lead-form">
              <LeadForm sourcePage={`/septic-services/${city.slug}-tx`} preselectedCity={city.name} />
            </div>
          </div>
        </div>
      </section>

      <UrgencyBar cityName={city.name} />

      <TrustSignals cityName={city.name} countyName={city.county} responseTime={responseTime} />

      {/* Quick Answer Box + Stats */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <QuickAnswer
            question={`How much do septic services cost in ${city.name}, Texas?`}
            answer={`Septic services in ${city.name} range from $200 for inspections to $600+ for pumping and cleaning. Emergency service is available 24/7. Pricing depends on tank size and the ${city.soilType} soil conditions in ${city.county} County. Call (469) 506-6606 for a free estimate.`}
          />
          <div className="text-slate-600 text-sm leading-relaxed space-y-2">
            <p>Texas has over <strong>3 million septic systems</strong> statewide, more than nearly every other state (Texas Commission on Environmental Quality).</p>
            <p>The average septic system lasts <strong>25–30 years</strong> with proper maintenance (NSF International).</p>
          </div>
        </div>
      </section>

      {/* Services for this city - Hub Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
            Septic Services in {city.name}
          </h2>
          <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
            Choose a service below to learn more about pricing, process, and availability in {city.name}, TX.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} citySlug={city.slug} variant="hub" />
            ))}
          </div>
        </div>
      </section>

      {/* Local info - AI content or fallback */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">About Septic Systems in {city.name}</h2>
          {content?.aboutSection ? (
            content.aboutSection.split("\n\n").map((p, i) => (
              <p key={i} className="text-slate-600 mb-4 leading-relaxed">{p}</p>
            ))
          ) : (
            <>
              <p className="text-slate-600 mb-4">
                {city.name} is located in {city.county} County, Texas, where many residential properties rely on septic systems rather than municipal sewer connections. The area&apos;s {city.soilType} soil conditions play a significant role in septic system performance and drain field effectiveness.
              </p>
              <p className="text-slate-600">
                Regular septic maintenance is especially important in {city.name} due to local soil conditions. Our licensed technicians understand the specific challenges of {city.county} County properties and provide tailored solutions for your septic system needs.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Us - AI content */}
      {content?.whyChooseSection && (
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Choose Fix Septic Now in {city.name}</h2>
            {content.whyChooseSection.split("\n\n").map((p, i) => (
              <p key={i} className="text-slate-600 mb-4 leading-relaxed">{p}</p>
            ))}
          </div>
        </section>
      )}

      <ProcessSteps />

      {/* Nearby cities */}
      {neighbors.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Septic Services Near {city.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {neighbors.map((n) => (
                <Link key={n.slug} href={`/septic-services/${n.slug}-tx`} className="text-green-700 hover:text-green-900 hover:underline text-sm py-1">
                  {n.name}, TX
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <TestimonialsSection testimonials={cityTestimonials} cityName={city.name} />

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Service Area in {city.name}</h2>
          <MapEmbed cityName={city.name} />
        </div>
      </section>

      <FAQSection faqs={cityFaqs} />

      {/* Helpful Guides */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Helpful Septic Guides for Texas Homeowners</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {blogPosts.slice(0, 3).map((post) => (
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

      <section className="bg-green-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Septic Help in {city.name}?</h2>
          <p className="text-green-100 mb-8">Call now for fast, professional septic service in {city.county} County. Emergency dispatch available 24/7.</p>
          <PhoneCTA size="lg" />
        </div>
      </section>
    </>
  );
}
