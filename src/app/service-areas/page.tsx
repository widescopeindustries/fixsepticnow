import Link from "next/link";
import { cities, getCitiesByRegion } from "@/lib/cities";
import { PhoneCTA } from "@/components/PhoneCTA";
import { LeadForm } from "@/components/LeadForm";
import { TrustSignals } from "@/components/TrustSignals";
import { MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Septic Service Areas Across Texas | Fix Septic Now",
  description: "Fix Septic Now serves 40+ cities across Texas. Find your city and schedule septic pumping, repair, or emergency service. Call (936) 297-7856.",
  openGraph: {
    title: "Septic Service Areas Across Texas",
    description: "Find septic service in your Texas city. 40+ cities served across Houston, Austin, San Antonio, DFW, and East Texas.",
    url: "https://fixsepticnow.com/service-areas",
    siteName: "Fix Septic Now",
    type: "website",
  },
  alternates: { canonical: "https://fixsepticnow.com/service-areas" },
};

const regions = [
  { key: "houston-metro", label: "Houston Metro" },
  { key: "austin-metro", label: "Austin & Central Texas" },
  { key: "san-antonio-metro", label: "San Antonio Metro" },
  { key: "dfw-metro", label: "DFW Suburbs" },
  { key: "east-texas", label: "East Texas" },
];

export default function ServiceAreasPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                Septic Service Across 40+ Texas Cities
              </h1>
              <p className="text-lg text-green-100 mb-6">
                From Houston to the Hill Country, we provide 24/7 emergency septic pumping, repair, and installation. Find your city below or call now for immediate dispatch.
              </p>
              <PhoneCTA size="lg" />
            </div>
            <div id="lead-form">
              <LeadForm sourcePage="/service-areas" />
            </div>
          </div>
        </div>
      </section>

      <TrustSignals />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Find Your City</h2>
          <div className="space-y-12">
            {regions.map((region) => {
              const regionCities = getCitiesByRegion(region.key);
              if (regionCities.length === 0) return null;
              return (
                <div key={region.key}>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">
                    {region.label}
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {regionCities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/septic-services/${city.slug}-tx`}
                        className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 hover:border-green-300 hover:bg-green-50 transition-colors"
                      >
                        <MapPin className="h-4 w-4 text-green-700 flex-shrink-0" />
                        <span className="text-slate-700 font-medium text-sm">{city.name}, TX</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Don't See Your City?</h2>
          <p className="text-slate-600 mb-8">
            We serve many smaller communities and unincorporated areas across Texas. Call us — if you're within our service radius, we'll get a truck to you.
          </p>
          <PhoneCTA size="lg" />
        </div>
      </section>
    </>
  );
}
