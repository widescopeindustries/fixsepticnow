import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/lib/services";
import { serviceMetadata } from "@/lib/metadata";
import { serviceSchema, faqSchema, breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { getServiceContent } from "@/lib/content";
import { LeadForm } from "@/components/LeadForm";
import { PhoneCTA } from "@/components/PhoneCTA";
import { TrustSignals } from "@/components/TrustSignals";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CityServiceGrid } from "@/components/CityServiceGrid";
import { FAQSection } from "@/components/FAQSection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SITE_URL } from "@/lib/constants";

// Fallback FAQs if AI content not available
const fallbackFaqs = [
  { question: "How much does this service cost?", answer: "Pricing varies based on your system and property. Call (936) 292-2926 for a free estimate." },
  { question: "Do you offer 24/7 service?", answer: "Yes! We provide round-the-clock emergency and scheduled service across Texas." },
  { question: "Are you licensed and insured?", answer: "Absolutely. All our technicians are Texas state licensed and fully insured." },
];

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

  const content = getServiceContent(service.slug);
  const faqs = content?.faqs || fallbackFaqs;

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
              <p className="text-lg text-green-100 mb-4">
                {content?.heroDescription || service.description}
              </p>
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

      {/* What Is Section */}
      {content?.whatIsSection && (
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">What is {service.name}?</h2>
            {content.whatIsSection.split("\n\n").map((p, i) => (
              <p key={i} className="text-slate-600 mb-4 leading-relaxed">{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* Signs Section */}
      {content?.signsSection && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Signs You Need {service.name}</h2>
            {content.signsSection.split("\n\n").map((p, i) => (
              <p key={i} className="text-slate-600 mb-4 leading-relaxed">{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* Process */}
      {content?.processSection ? (
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our {service.shortName} Process</h2>
            {content.processSection.split("\n\n").map((p, i) => (
              <p key={i} className="text-slate-600 mb-4 leading-relaxed">{p}</p>
            ))}
          </div>
        </section>
      ) : (
        <ProcessSteps />
      )}

      {/* Pricing */}
      {content?.pricingSection && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">{service.name} Pricing</h2>
            {content.pricingSection.split("\n\n").map((p, i) => (
              <p key={i} className="text-slate-600 mb-4 leading-relaxed">{p}</p>
            ))}
          </div>
        </section>
      )}

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
