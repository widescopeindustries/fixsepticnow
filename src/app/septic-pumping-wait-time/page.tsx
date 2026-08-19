import { PhoneCTA } from "@/components/PhoneCTA";
import { LeadForm } from "@/components/LeadForm";
import { TrustSignals } from "@/components/TrustSignals";
import { FAQSection } from "@/components/FAQSection";
import { QuickAnswer } from "@/components/QuickAnswer";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { localBusinessSchema, faqSchema } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Long Does Septic Pumping Take in Central Texas? | Fix Septic Now",
  description: "Septic pumping takes 1-3 hours in Central Texas. Same-day service available with response times under 2 hours. Call (469) 986-7883 now.",
  openGraph: {
    title: "How Long Does Septic Pumping Take in Central Texas?",
    description: "Septic pumping takes 1-3 hours in Central Texas. Same-day service available with response times under 2 hours.",
    url: "https://fixsepticnow.com/septic-pumping-wait-time",
    siteName: "Fix Septic Now",
    type: "website",
  },
  alternates: { canonical: "https://fixsepticnow.com/septic-pumping-wait-time" },
};

const waitTimeFaqs = [
  {
    question: "How long does septic pumping take for a 1,000-gallon tank?",
    answer: "A standard 1,000-gallon septic tank pumping takes 1–2 hours from arrival to completion. This includes locating the lid, pumping the tank, inspecting the inlet and outlet baffles, and backfilling. Larger tanks (1,500+ gallons) may take 2–3 hours.",
  },
  {
    question: "What is the average wait time for septic pumping in Central Texas?",
    answer: "In Central Texas, the average wait time for non-emergency septic pumping is 24–72 hours. However, Fix Septic Now offers same-day septic pumping in most Central Texas markets with average response times under 2 hours for emergencies.",
  },
  {
    question: "Why does septic pumping take longer in some areas?",
    answer: "Septic pumping time varies based on tank accessibility (buried deep or under concrete), soil conditions (clay soils may require more careful handling), tank size, and whether the drain field needs inspection. Rural properties with long driveways may also add travel time.",
  },
  {
    question: "Can I get same-day septic pumping in Texas?",
    answer: "Yes. Same-day septic pumping is available across our Texas service areas including Houston metro, Austin, San Antonio, DFW, and East Texas. Call (469) 986-7883 before noon for the best chance of same-day scheduling.",
  },
  {
    question: "How long does the entire septic pumping appointment take?",
    answer: "From the time our technician arrives, expect 1–3 hours total. This includes setup, pumping, inspection, and cleanup. You do not need to be present for the entire appointment, but someone should be available to provide access and approve the work.",
  },
  {
    question: "What factors delay septic pumping?",
    answer: "Common delays include: tank lids buried under landscaping or concrete, unknown tank location requiring locating equipment, heavy rain making access difficult, high demand during holiday weekends, and tanks that haven't been pumped in 10+ years requiring extra cleaning.",
  },
];

export default function WaitTimePage() {
  return (
    <>
      <SchemaMarkup schemas={[localBusinessSchema(), faqSchema(waitTimeFaqs)]} />

      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                How Long Does Septic Pumping Take in Central Texas?
              </h1>
              <p className="text-lg text-green-100 mb-6">
                Most septic pumping jobs take 1–3 hours. Same-day service is available with response times under 2 hours across Central Texas.
              </p>
              <PhoneCTA size="lg" />
            </div>
            <div id="lead-form">
              <LeadForm sourcePage="/septic-pumping-wait-time" />
            </div>
          </div>
        </div>
      </section>

      <TrustSignals />

      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <QuickAnswer
            question="How long does septic pumping take in Central Texas?"
            answer="Septic pumping in Central Texas typically takes 1–3 hours depending on tank size, accessibility, and soil conditions. A standard 1,000-gallon tank takes 1–2 hours. Same-day service is available with response times under 2 hours for emergencies."
          />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What Affects Septic Pumping Time?</h2>
          <div className="space-y-6">
            <div className="border border-slate-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-900 mb-2">Tank Size</h3>
              <p className="text-slate-600 text-sm">750-gallon tanks: 1 hour. 1,000-gallon tanks: 1–2 hours. 1,500+ gallon tanks: 2–3 hours. Larger commercial systems can take 4+ hours.</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-900 mb-2">Tank Accessibility</h3>
              <p className="text-slate-600 text-sm">If your tank lid is buried under sod, concrete, or landscaping, add 15–30 minutes for excavation. Installing risers during your pump-out makes future access instant.</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-900 mb-2">Soil Conditions</h3>
              <p className="text-slate-600 text-sm">Central Texas has diverse soil types — from heavy blackland clay to limestone karst. Clay soils can complicate access after rain. Rocky Hill Country terrain may require additional equipment.</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-5">
              <h3 className="font-bold text-slate-900 mb-2">Last Pump Date</h3>
              <p className="text-slate-600 text-sm">Tanks that haven&apos;t been pumped in 5+ years often have thicker sludge layers that take longer to remove. Extremely overdue tanks (10+ years) may require additional cleaning time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Wait Times by Region</h2>
          <div className="space-y-4 text-slate-700">
            <p><strong>Houston Metro</strong> (Conroe, Katy, Spring, The Woodlands): Average response 30–60 minutes. Same-day scheduling available.</p>
            <p><strong>Austin Metro</strong> (Georgetown, Leander, Buda, Kyle): Average response 45–90 minutes. Same-day available before 2 PM.</p>
            <p><strong>San Antonio Metro</strong> (New Braunfels, Boerne, Seguin): Average response 45–90 minutes. Next-day guaranteed.</p>
            <p><strong>DFW Suburbs</strong> (Waxahachie, Weatherford, Cleburne): Average response 45–90 minutes. Same-day often available.</p>
            <p><strong>East Texas</strong> (Huntsville, Lufkin, Nacogdoches): Average response 60–120 minutes. Next-day guaranteed.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Fix Septic Now Is Faster</h2>
          <ul className="list-disc pl-6 space-y-3 text-slate-700">
            <li><strong>Dedicated dispatch team:</strong> We answer calls 24/7 — no voicemail, no callbacks tomorrow.</li>
            <li><strong>Local technician network:</strong> Our crews are already stationed across 40+ Texas cities.</li>
            <li><strong>Emergency prioritization:</strong> Backups and overflows jump to the front of the schedule.</li>
            <li><strong>Real-time availability:</strong> We confirm your appointment time before you hang up.</li>
          </ul>
        </div>
      </section>

      <section className="bg-green-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Septic Pumping Fast?</h2>
          <p className="text-green-100 mb-8">Same-day service available across Central Texas. Call now and get a confirmed arrival time.</p>
          <PhoneCTA size="lg" />
        </div>
      </section>

      <FAQSection faqs={waitTimeFaqs} />
    </>
  );
}
