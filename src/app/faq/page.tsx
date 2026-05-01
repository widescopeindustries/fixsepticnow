import { PhoneCTA } from "@/components/PhoneCTA";
import { FAQSection } from "@/components/FAQSection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { faqSchema } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Septic FAQ | Fix Septic Now",
  description: "Get answers to the most common septic questions from Texas homeowners. Pumping, repair, costs, emergencies, and more. Call (469) 506-6606.",
  alternates: { canonical: "https://fixsepticnow.com/faq" },
};

const allFaqs = [
  { question: "How much does septic tank pumping cost in Texas?", answer: "Septic tank pumping in Texas typically costs $300-$600 depending on tank size, accessibility, and location. Emergency or after-hours service may cost more. We provide free estimates before any work begins." },
  { question: "How often should a septic tank be pumped?", answer: "Most septic tanks should be pumped every 3-5 years. However, this depends on household size, tank size, and water usage. Homes with garbage disposals or more occupants may need pumping more frequently." },
  { question: "What are signs my septic tank needs pumping?", answer: "Common signs include slow drains, gurgling toilets, sewage odors near the tank or drain field, standing water over the drain field, and sewage backup in your home. If you notice any of these, call us immediately." },
  { question: "Do you offer 24/7 emergency septic service?", answer: "Yes. We provide 24/7 emergency septic service across Texas. Our licensed technicians are available days, nights, weekends, and holidays. Call (469) 506-6606 anytime." },
  { question: "What areas do you serve in Texas?", answer: "We serve over 40 cities across Texas including Conroe, Katy, Spring, The Woodlands, New Braunfels, Boerne, Georgetown, Dripping Springs, Weatherford, and many more suburban and rural communities." },
  { question: "Can you pump my septic tank on weekends?", answer: "Yes. Weekend and after-hours septic pumping is available across our Texas service areas. Pricing depends on travel time and whether the job is emergency service." },
  { question: "How long does septic pumping take?", answer: "A typical septic pumping appointment takes 1–3 hours depending on tank size and accessibility. Complex jobs like installations or major repairs may take 1–3 days." },
  { question: "Is same-day septic pumping available?", answer: "Yes. Same-day septic pumping is available in most major Texas metros if you call before noon. Emergency service is available 24/7 for backups and overflows." },
  { question: "What happens if I don't pump my septic tank?", answer: "Skipping pump service causes solids to enter and clog the drain field, which costs $5,000–$15,000 to replace. A routine pump-out costs just $300–$600. Neglected tanks can also cause sewage backup into your home." },
  { question: "Does homeowners insurance cover septic problems?", answer: "Standard homeowners insurance typically does not cover routine septic pumping. However, some policies cover damage caused by sudden septic failures. Check with your insurer and document any damage with photos." },
  { question: "What type of septic system do I need in Texas?", answer: "This depends on your soil type and county requirements. Sandy loam supports conventional gravity systems. Clay soils may need low-pressure dosing. Hill Country limestone often requires aerobic treatment units. A licensed OSSF designer determines the right system after soil testing." },
  { question: "How much does a new septic system cost in Texas?", answer: "Total costs range from $6,000–$15,000 for most residential installs. Conventional gravity systems cost $5,000–$10,000, aerobic treatment units $10,000–$20,000, and advanced drip irrigation systems $15,000–$25,000+." },
];

export default function FAQPage() {
  return (
    <>
      <SchemaMarkup schemas={[faqSchema(allFaqs)]} />

      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black mb-4">Septic FAQ</h1>
          <p className="text-lg text-green-100">
            Answers to the most common questions Texas homeowners ask about septic systems.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <FAQSection faqs={allFaqs} />
        </div>
      </section>

      <section className="bg-green-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-green-100 mb-8">Call now and talk to a licensed septic professional. No obligation, no pressure.</p>
          <PhoneCTA size="lg" />
        </div>
      </section>
    </>
  );
}
