import { getCitiesByRegion } from "@/lib/cities";
import { services } from "@/lib/services";
import { localBusinessSchema, breadcrumbSchema, websiteSchema } from "@/lib/schema";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { PhoneCTA } from "@/components/PhoneCTA";
import { LeadForm } from "@/components/LeadForm";
import { TrustSignals } from "@/components/TrustSignals";
import { FAQSection } from "@/components/FAQSection";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, PHONE_NUMBER } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Septic Services Across Texas | ${PHONE_NUMBER} | 24/7 Emergency & Pumping`,
  description: "Professional septic pumping, repair, inspection and emergency service across 40+ Texas cities. Licensed TCEQ contractors. Same-day response available. Call for a free estimate.",
  alternates: { canonical: `${SITE_URL}/septic-services` },
};

const regionLabels: Record<string, string> = {
  "houston-metro": "Houston Metro",
  "austin-metro": "Austin Metro",
  "san-antonio-metro": "San Antonio Metro",
  "dfw-metro": "Dallas–Fort Worth Metro",
  "east-texas": "East Texas",
};

const serviceFaqs = [
  { question: "What septic services do you offer in Texas?", answer: "We offer septic tank pumping, cleaning, repair, inspection, installation, maintenance, and 24/7 emergency service across Texas. All work is performed by TCEQ-licensed contractors." },
  { question: "How much does septic pumping cost in Texas?", answer: "Septic tank pumping in Texas typically costs $300–$600 depending on tank size and accessibility. Emergency after-hours service costs more. We provide free estimates before any work begins." },
  { question: "Do you offer same-day septic service?", answer: "Yes. Same-day and emergency septic service is available in most of our Texas service areas. Call (936) 297-7856 for immediate dispatch. Response times vary by location but emergency calls are prioritized." },
  { question: "What areas of Texas do you serve?", answer: "We serve 40+ cities across Texas including the Houston metro (Conroe, The Woodlands, Katy, Spring), Austin metro (Georgetown, Dripping Springs, Liberty Hill), San Antonio metro (New Braunfels, Boerne), DFW (Weatherford, Waxahachie), and East Texas (Huntsville, Athens, Nacogdoches)." },
];

export default function SepticServicesIndexPage() {
  const schemas = [
    websiteSchema(),
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Septic Services", url: `${SITE_URL}/septic-services` },
    ]),
  ];

  const regions = ["houston-metro", "austin-metro", "san-antonio-metro", "dfw-metro", "east-texas"];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                Septic Pumping, Repair & Emergency Service Across Texas
              </h1>
              <p className="text-lg text-green-100 mb-6">
                Licensed TCEQ septic contractors serving 40+ Texas cities. From routine pumping to 24/7 emergencies — real trucks, real technicians, real fast.
              </p>
              <PhoneCTA size="lg" />
            </div>
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-lg border border-green-700/30">
                <Image
                  src="/images/construction-worker-tools.jpg"
                  alt="Licensed septic technicians excavating for septic tank access"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <LeadForm sourcePage="/septic-services" />
            </div>
          </div>
        </div>
      </section>

      <TrustSignals />

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Our Septic Services</h2>
          <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto">
            Full-service septic solutions for Texas homeowners and properties.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={`border rounded-xl p-6 hover:shadow-md transition-all group ${
                  s.isEmergency ? "border-red-200 bg-red-50 hover:border-red-300" : "border-slate-200 bg-white hover:border-green-200"
                }`}
              >
                <h3 className={`font-bold text-lg mb-2 group-hover:underline ${s.isEmergency ? "text-red-800" : "text-slate-900"}`}>
                  {s.name}
                </h3>
                <p className="text-slate-600 text-sm mb-3">{s.description}</p>
                <p className={`text-sm font-semibold ${s.isEmergency ? "text-red-700" : "text-green-700"}`}>
                  Starting at {s.priceRange}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cities by Region */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Service Areas</h2>
          <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto">
            Click your city to see local service details, response times, and pricing.
          </p>
          <div className="space-y-10">
            {regions.map((region) => {
              const regionCities = getCitiesByRegion(region);
              if (regionCities.length === 0) return null;
              return (
                <div key={region}>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{regionLabels[region]}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {regionCities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/septic-services/${city.slug}-tx`}
                        className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:border-green-300 hover:text-green-700 hover:shadow-sm transition-all"
                      >
                        {city.name}, TX
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FAQSection faqs={serviceFaqs} />

      {/* Final CTA */}
      <section className="bg-green-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Septic Help in Texas?</h2>
          <p className="text-green-100 mb-8">Call now for immediate dispatch. Emergency service available 24/7.</p>
          <PhoneCTA size="lg" />
        </div>
      </section>
    </>
  );
}
