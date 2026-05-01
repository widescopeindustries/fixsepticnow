import Link from "next/link";
import { PhoneCTA } from "@/components/PhoneCTA";
import { LeadForm } from "@/components/LeadForm";
import { TrustSignals } from "@/components/TrustSignals";
import { QuickAnswer } from "@/components/QuickAnswer";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Septic Service Pricing in Texas | Fix Septic Now",
  description: "Transparent septic pricing for Texas homeowners. Pumping $300-600, inspections $200-500, repairs $500-3000+. Free estimates. Call (469) 506-6606.",
  openGraph: {
    title: "Septic Service Pricing in Texas",
    description: "Transparent septic pricing for Texas homeowners. Free estimates before any work begins.",
    url: "https://fixsepticnow.com/pricing",
    siteName: "Fix Septic Now",
    type: "website",
  },
  alternates: { canonical: "https://fixsepticnow.com/pricing" },
};

const services = [
  {
    name: "Septic Pumping",
    price: "$300 – $600",
    description: "Standard residential pump-out for tanks 750–1,500 gallons. Includes waste disposal and basic inspection.",
    emergency: "$600 – $1,000+",
  },
  {
    name: "Septic Cleaning",
    price: "$350 – $700",
    description: "Deep cleaning beyond pumping. Removes hardened sludge, grease layers, and mineral buildup from tank walls.",
    emergency: "$700 – $1,200+",
  },
  {
    name: "Septic Repair",
    price: "$500 – $3,000+",
    description: "Baffle replacement, filter cleaning, distribution box repair, and partial drain field restoration.",
    emergency: "$800 – $4,000+",
  },
  {
    name: "Septic Inspection",
    price: "$200 – $500",
    description: "Comprehensive inspection with written report. Required for real estate transactions and recommended every 1–2 years.",
    emergency: "$400 – $700",
  },
  {
    name: "Septic Installation",
    price: "$5,000 – $15,000+",
    description: "New system design, permitting, and installation. Cost varies by system type, soil conditions, and county requirements.",
    emergency: "N/A — Scheduled only",
  },
  {
    name: "Emergency Service",
    price: "$500 – $1,500+",
    description: "24/7 response for backups, overflows, and surfacing effluent. Rate depends on time of day and severity.",
    emergency: "This is emergency rate",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                Septic Service Pricing in Texas
              </h1>
              <p className="text-lg text-green-100 mb-6">
                No hidden fees. No surprises. We provide upfront pricing before any work begins. Here's what septic service actually costs in Texas.
              </p>
              <PhoneCTA size="lg" />
            </div>
            <div id="lead-form">
              <LeadForm sourcePage="/pricing" />
            </div>
          </div>
        </div>
      </section>

      <TrustSignals />

      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <QuickAnswer
            question="How much does septic pumping cost in Texas?"
            answer="Septic pumping in Texas costs $300–$600 for most residential tanks. Emergency or after-hours service runs $600–$1,000+. Tank size, accessibility, and location all affect the final price. We provide free written estimates before any work begins."
          />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Service Pricing</h2>
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.name} className="border border-slate-200 rounded-xl p-6 hover:border-green-300 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{service.name}</h3>
                  <div className="text-right">
                    <p className="text-2xl font-black text-green-700">{service.price}</p>
                    {service.emergency && service.emergency !== "This is emergency rate" && (
                      <p className="text-xs text-slate-500">Emergency: {service.emergency}</p>
                    )}
                  </div>
                </div>
                <p className="text-slate-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What Affects Your Price</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-900">Tank Size</p>
                <p className="text-slate-600 text-sm">Larger tanks take longer to pump and cost more to dispose of properly.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-900">Accessibility</p>
                <p className="text-slate-600 text-sm">Buried lids require excavation ($75–$150). Consider installing risers to save money long-term.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-900">Location</p>
                <p className="text-slate-600 text-sm">Metro areas like Houston and Austin have higher demand. Rural locations may include travel charges.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-900">Time of Service</p>
                <p className="text-slate-600 text-sm">After-hours and weekend service costs 1.5x–2x standard rates. Scheduled daytime service is most affordable.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-900">Tank Condition</p>
                <p className="text-slate-600 text-sm">Tanks that haven't been pumped in 10+ years often have hardened sludge that takes longer to remove.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Pricing Promise</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <p className="font-bold text-green-900 mb-1">Free Estimates</p>
              <p className="text-green-800 text-sm">We tell you the exact cost before any work begins. No surprises on the invoice.</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <p className="font-bold text-green-900 mb-1">No Hidden Fees</p>
              <p className="text-green-800 text-sm">The price we quote includes disposal, inspection, and cleanup. What you see is what you pay.</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <p className="font-bold text-green-900 mb-1">Satisfaction Guaranteed</p>
              <p className="text-green-800 text-sm">If we can't fix it, you don't pay. We stand behind every job we complete.</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <p className="font-bold text-green-900 mb-1">Licensed & Insured</p>
              <p className="text-green-800 text-sm">Every technician is TCEQ-certified and fully insured. Your property is protected.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Your Free Estimate</h2>
          <p className="text-green-100 mb-8">Call now for upfront pricing on your specific septic need. No obligation, no pressure.</p>
          <PhoneCTA size="lg" />
        </div>
      </section>
    </>
  );
}
