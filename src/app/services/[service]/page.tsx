import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/lib/services";
import { cities } from "@/lib/cities";
import { serviceMetadata } from "@/lib/metadata";
import { serviceSchema, faqSchema, breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { LeadForm } from "@/components/LeadForm";
import { PhoneCTA } from "@/components/PhoneCTA";
import { TrustSignals } from "@/components/TrustSignals";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CityServiceGrid } from "@/components/CityServiceGrid";
import { FAQSection } from "@/components/FAQSection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SITE_URL } from "@/lib/constants";

// Default FAQs per service (will be replaced by AI-generated content later)
const defaultFaqs: Record<string, { question: string; answer: string }[]> = {
  "septic-pumping": [
    { question: "How often should I pump my septic tank?", answer: "Every 3-5 years for a typical household. Larger families or homes with garbage disposals may need pumping every 2-3 years." },
    { question: "How long does septic pumping take?", answer: "Most residential septic pumping jobs take 30-60 minutes once the technician arrives on site." },
    { question: "What size septic tank do I have?", answer: "Most Texas homes have 1,000-1,500 gallon tanks. Our technicians can determine your tank size during service." },
    { question: "Can I be home during septic pumping?", answer: "You don't need to be home, but someone should be available to show the technician where the tank access is located." },
    { question: "What happens if I don't pump my septic tank?", answer: "Neglecting pumping leads to sludge buildup, drain field failure, sewage backups, and costly repairs that can exceed $10,000." },
  ],
  "septic-cleaning": [
    { question: "What's the difference between pumping and cleaning?", answer: "Pumping removes liquid and sludge. Cleaning is more thorough — it includes pumping plus high-pressure washing of the tank interior and inspection of baffles and components." },
    { question: "How much does septic cleaning cost?", answer: "Septic cleaning in Texas typically costs $350-$700 depending on tank size and condition." },
    { question: "Do I need cleaning or just pumping?", answer: "If it's been more than 5 years or you're experiencing issues, cleaning is recommended. For routine maintenance, pumping is usually sufficient." },
  ],
  "septic-repair": [
    { question: "What are common septic repairs?", answer: "Common repairs include replacing damaged baffles, fixing cracked tanks, repairing or replacing pumps, and drain field restoration." },
    { question: "How much do septic repairs cost?", answer: "Minor repairs start around $500. Major repairs like drain field replacement can cost $5,000-$15,000+." },
    { question: "How do I know if my septic system needs repair?", answer: "Warning signs include persistent slow drains, sewage odors, wet spots over the drain field, and sewage backup." },
  ],
  "emergency-septic-service": [
    { question: "What qualifies as a septic emergency?", answer: "Sewage backing up into your home, sewage surfacing in your yard, strong sewage odors, or a completely non-functional system are all emergencies." },
    { question: "How fast can you respond to an emergency?", answer: "We dispatch technicians 24/7 and aim for response times under 60 minutes in our primary service areas." },
    { question: "Does emergency service cost more?", answer: "Emergency and after-hours service may have a premium, but we provide transparent pricing before any work begins." },
  ],
  "septic-inspection": [
    { question: "When do I need a septic inspection?", answer: "Before buying or selling a home, when applying for permits, or every 3 years as part of routine maintenance." },
    { question: "What does a septic inspection include?", answer: "Tank level check, structural inspection, baffle condition, drain field evaluation, and a written report." },
    { question: "How long does a septic inspection take?", answer: "A thorough inspection takes 1-2 hours depending on system complexity and accessibility." },
  ],
  "septic-installation": [
    { question: "How much does a new septic system cost?", answer: "New septic systems in Texas range from $5,000-$15,000+ depending on soil conditions, system type, and property requirements." },
    { question: "How long does septic installation take?", answer: "Most residential installations are completed in 2-5 days, depending on permitting and soil conditions." },
    { question: "Do I need a permit for septic installation?", answer: "Yes. Texas requires permits for all new septic installations. We handle the permitting process for you." },
  ],
  "septic-maintenance": [
    { question: "What does a septic maintenance plan include?", answer: "Regular pumping schedule, annual inspections, bacteria treatments, and priority emergency service." },
    { question: "How much does septic maintenance cost?", answer: "Our maintenance plans start at $200-$400/year and save you money compared to individual service calls." },
    { question: "Is septic maintenance really necessary?", answer: "Absolutely. Regular maintenance prevents costly emergencies and extends your system's lifespan by 10-20 years." },
  ],
};

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) return {};
  return serviceMetadata(service.name, service.slug);
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const faqs = defaultFaqs[service.slug] || defaultFaqs["septic-pumping"];

  const schemas = [
    serviceSchema(service.name, service.description, service.priceRange),
    localBusinessSchema(),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: service.name, url: `${SITE_URL}/services/${service.slug}` },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* Hero */}
      <section className={`py-16 md:py-24 ${service.isEmergency ? "bg-gradient-to-br from-red-900 via-red-800 to-red-900" : "bg-gradient-to-br from-green-900 via-green-800 to-green-900"} text-white`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <nav className="text-sm text-green-200 mb-4">
                <a href="/" className="hover:underline">Home</a> → <span>{service.name}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                {service.name} in Texas
              </h1>
              <p className="text-lg text-green-100 mb-4">{service.description}</p>
              <p className="text-green-200 mb-6">Starting at {service.priceRange}</p>
              <PhoneCTA size="lg" />
            </div>
            <div id="lead-form">
              <LeadForm sourcePage={`/services/${service.slug}`} preselectedService={service.shortName} />
            </div>
          </div>
        </div>
      </section>

      <TrustSignals />
      <ProcessSteps />

      <CityServiceGrid mode="cities-for-service" serviceSlug={service.slug} />

      <FAQSection faqs={faqs} />

      {/* Final CTA */}
      <section className="bg-green-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need {service.name}?</h2>
          <p className="text-green-100 mb-8">Call now for a free estimate. We respond in minutes.</p>
          <PhoneCTA size="lg" />
        </div>
      </section>
    </>
  );
}
