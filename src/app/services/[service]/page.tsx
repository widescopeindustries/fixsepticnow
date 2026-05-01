import { notFound } from "next/navigation";
import Link from "next/link";
import { services, getServiceBySlug } from "@/lib/services";
import { blogPosts } from "@/lib/blog-posts";
import { testimonials } from "@/lib/testimonials";
import { serviceMetadata } from "@/lib/metadata";
import { serviceSchema, faqSchema, breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { getServiceContent } from "@/lib/content";
import { LeadForm } from "@/components/LeadForm";
import { PhoneCTA } from "@/components/PhoneCTA";
import { TrustSignals } from "@/components/TrustSignals";
import { LiveAvailability } from "@/components/LiveAvailability";
import { UrgencyBar } from "@/components/UrgencyBar";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CityServiceGrid } from "@/components/CityServiceGrid";
import { FAQSection } from "@/components/FAQSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { QuickAnswer } from "@/components/QuickAnswer";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { SITE_URL } from "@/lib/constants";

// GEO-optimized FAQs per service (used when AI content not available)
function getServiceFaqs(serviceName: string, shortName: string, priceRange: string) {
  const sn = shortName.toLowerCase();
  return [
    { question: `How much does ${serviceName.toLowerCase()} cost in Texas?`, answer: `${serviceName} in Texas typically costs ${priceRange}. Final pricing depends on tank size, accessibility, and property conditions. Call (469) 506-6606 for a free estimate.` },
    { question: `How often do I need ${serviceName.toLowerCase()}?`, answer: `Most Texas homeowners need ${sn} every 3–5 years for standard systems. Homes with more occupants, garbage disposals, or heavy clay soil may need service every 2–3 years.` },
    { question: `How long does ${serviceName.toLowerCase()} take?`, answer: `A typical ${sn} appointment takes 1–3 hours depending on tank size and accessibility. Complex jobs like installations or major repairs may take 1–3 days.` },
    { question: `What are signs I need ${serviceName.toLowerCase()}?`, answer: `Common signs include slow drains throughout the house, sewage odors indoors or outdoors, gurgling pipes, soggy ground over the drain field, and unusually green grass over the septic area.` },
    { question: `Is emergency ${serviceName.toLowerCase()} available?`, answer: `Yes. We provide 24/7 emergency ${sn} across Texas with same-day dispatch. Call (469) 506-6606 anytime — nights, weekends, and holidays included.` },
    { question: `Does homeowners insurance cover ${serviceName.toLowerCase()}?`, answer: `Standard homeowners insurance typically does not cover routine ${sn}. However, some policies cover damage caused by sudden septic failures. Check with your insurer and document any damage with photos.` },
  ];
}

// Quick answer data per service slug
const serviceQuickAnswers: Record<string, { question: string; answer: string }> = {
  "septic-pumping": { question: "How much does septic tank pumping cost in Texas?", answer: "Septic tank pumping in Texas costs $300–$600 for a standard 1,000-gallon tank. Emergency service is available 24/7 with same-day dispatch. Prices vary by tank size and accessibility." },
  "septic-cleaning": { question: "How much does septic tank cleaning cost in Texas?", answer: "Septic tank cleaning in Texas costs $350–$700, which includes pumping, inspection, and bacteria treatment. A full cleaning extends your system's lifespan and prevents costly drain field failures." },
  "septic-repair": { question: "How much does septic tank repair cost in Texas?", answer: "Septic tank repair in Texas ranges from $500 for minor fixes to $3,000+ for major component replacement. Early diagnosis saves money — most repairs cost far less than a full system replacement ($10,000+)." },
  "emergency-septic-service": { question: "How quickly can I get emergency septic service in Texas?", answer: "We dispatch emergency septic technicians 24/7 across Texas with response times typically under 60 minutes. Stop using all water immediately and call (469) 506-6606 — every minute matters during a sewage backup." },
  "septic-inspection": { question: "How much does a septic inspection cost in Texas?", answer: "A comprehensive septic inspection in Texas costs $200–$500. Inspections are essential for home buyers and sellers, and recommended every 1–2 years for routine maintenance. We provide written reports for real estate transactions." },
  "septic-installation": { question: "How much does a new septic system cost in Texas?", answer: "New septic system installation in Texas costs $5,000–$15,000+ depending on system type and soil conditions. Conventional gravity systems start around $5,000; aerobic treatment units required in some counties run $10,000–$20,000." },
  "septic-maintenance": { question: "How much does a septic maintenance plan cost in Texas?", answer: "Annual septic maintenance plans in Texas cost $200–$400/year and include scheduled inspections, pumping reminders, and priority emergency service. Regular maintenance extends your system's life by 10–15 years." },
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

  const content = getServiceContent(service.slug);
  const faqs = content?.faqs || getServiceFaqs(service.name, service.shortName, service.priceRange);
  const quickAnswer = serviceQuickAnswers[service.slug];
  const relatedPosts = blogPosts
    .filter((p) => p.relatedServiceSlugs.includes(service.slug))
    .slice(0, 3);

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
              <nav className="text-sm text-green-200 mb-4">
                <a href="/" className="hover:underline">Home</a> → <span>{service.name}</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                {service.isEmergency ? `Septic Emergency? 24/7 Response in Texas — Call Now` : `${service.name} in Texas — 24/7 Same-Day Service`}
              </h1>
              <p className="text-lg text-green-100 mb-4">
                {content?.heroDescription || service.description}
              </p>
              <p className="text-green-200 mb-6">Starting at {service.priceRange}</p>
              <PhoneCTA size="lg" />
              <LiveAvailability />
            </div>
            <div id="lead-form">
              <LeadForm sourcePage={`/services/${service.slug}`} preselectedService={service.shortName} />
            </div>
          </div>
        </div>
      </section>

      <UrgencyBar />

      <TrustSignals />

      {/* Quick Answer Box + Stats */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          {quickAnswer && (
            <QuickAnswer question={quickAnswer.question} answer={quickAnswer.answer} />
          )}
          <div className="text-slate-600 text-sm leading-relaxed space-y-2">
            <p>According to the EPA, <strong>1 in 5 U.S. homes</strong> relies on a septic system for wastewater treatment.</p>
            <p>Texas has over <strong>3 million septic systems</strong> statewide, more than nearly every other state (Texas Commission on Environmental Quality).</p>
          </div>
        </div>
      </section>

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

      <TestimonialsSection testimonials={testimonials} />

      <FAQSection faqs={faqs} />

      {/* Related Blog Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Reading</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="border border-slate-200 rounded-lg p-4 hover:shadow-sm hover:border-green-200 transition-all group"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-green-700">{post.category}</span>
                  <h3 className="font-semibold text-slate-900 mt-2 mb-1 text-sm leading-snug group-hover:text-green-700 transition-colors">
                    {post.title}
                  </h3>
                  <span className="text-green-700 text-xs font-semibold">Read more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
