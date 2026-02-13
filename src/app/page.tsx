import { LeadForm } from "@/components/LeadForm";
import { PhoneCTA } from "@/components/PhoneCTA";
import { TrustSignals } from "@/components/TrustSignals";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ServiceCard } from "@/components/ServiceCard";
import { CityCard } from "@/components/CityCard";
import { FAQSection } from "@/components/FAQSection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { services } from "@/lib/services";
import { cities } from "@/lib/cities";
import { organizationSchema, localBusinessSchema, faqSchema } from "@/lib/schema";
import { homeMetadata } from "@/lib/metadata";

export const metadata = homeMetadata();

const homeFaqs = [
  { question: "How much does septic tank pumping cost in Texas?", answer: "Septic tank pumping in Texas typically costs $300-$600 depending on tank size, accessibility, and location. Emergency or after-hours service may cost more. We provide free estimates before any work begins." },
  { question: "How often should a septic tank be pumped?", answer: "Most septic tanks should be pumped every 3-5 years. However, this depends on household size, tank size, and water usage. Homes with garbage disposals or more occupants may need pumping more frequently." },
  { question: "What are signs my septic tank needs pumping?", answer: "Common signs include slow drains, gurgling toilets, sewage odors near the tank or drain field, standing water over the drain field, and sewage backup in your home. If you notice any of these, call us immediately." },
  { question: "Do you offer 24/7 emergency septic service?", answer: "Yes! We provide 24/7 emergency septic service across Texas. Whether it's 2 AM or a holiday, call (936) 292-2926 and our AI assistant will dispatch a technician immediately." },
  { question: "What areas do you serve in Texas?", answer: "We serve over 40 cities across Texas including Conroe, Katy, Spring, The Woodlands, New Braunfels, Boerne, Georgetown, Dripping Springs, Weatherford, and many more suburban and rural communities." },
  { question: "Can you pump my septic tank on weekends?", answer: "Absolutely. We offer weekend septic tank pumping at no extra charge for scheduled service. Emergency weekend service is also available 24/7." },
];

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schemas={[organizationSchema(), localBusinessSchema(), faqSchema(homeFaqs)]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                Texas Emergency Septic Pumping & Repair
              </h1>
              <p className="text-lg text-green-100 mb-6">
                24/7 licensed septic professionals serving 40+ Texas cities. Fast response, fair prices, guaranteed satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <PhoneCTA size="lg" />
              </div>
            </div>
            <div id="lead-form">
              <LeadForm sourcePage="/" />
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
            From routine pumping to emergency repairs, our licensed technicians handle every septic need.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps />

      {/* Cities Grid */}
      <section id="cities" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Service Areas Across Texas</h2>
          <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto">
            We serve suburban and rural communities where septic systems are most common.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {cities.map((c) => (
              <CityCard key={c.slug} city={c} />
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={homeFaqs} />

      {/* Final CTA */}
      <section className="bg-green-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Fix Your Septic Problem?</h2>
          <p className="text-green-100 mb-8">Call now for a free estimate or fill out the form above. We respond in minutes, not hours.</p>
          <PhoneCTA size="lg" />
        </div>
      </section>
    </>
  );
}
