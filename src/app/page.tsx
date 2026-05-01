import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { PhoneCTA } from "@/components/PhoneCTA";
import { TrustSignals } from "@/components/TrustSignals";
import { LiveAvailability } from "@/components/LiveAvailability";
import { UrgencyBar } from "@/components/UrgencyBar";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ServiceCard } from "@/components/ServiceCard";
import { CityCard } from "@/components/CityCard";
import { FAQSection } from "@/components/FAQSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { services } from "@/lib/services";
import { cities } from "@/lib/cities";
import { getRecentBlogPosts } from "@/lib/blog-posts";
import { testimonials } from "@/lib/testimonials";
import { organizationSchema, localBusinessSchema, faqSchema, websiteSchema } from "@/lib/schema";
import { homeMetadata } from "@/lib/metadata";

export const metadata = homeMetadata();

const homeFaqs = [
  { question: "How much does septic tank pumping cost in Texas?", answer: "Septic tank pumping in Texas typically costs $300-$600 depending on tank size, accessibility, and location. Emergency or after-hours service may cost more. We provide free estimates before any work begins." },
  { question: "How often should a septic tank be pumped?", answer: "Most septic tanks should be pumped every 3-5 years. However, this depends on household size, tank size, and water usage. Homes with garbage disposals or more occupants may need pumping more frequently." },
  { question: "What are signs my septic tank needs pumping?", answer: "Common signs include slow drains, gurgling toilets, sewage odors near the tank or drain field, standing water over the drain field, and sewage backup in your home. If you notice any of these, call us immediately." },
  { question: "Do you offer 24/7 emergency septic service?", answer: "Yes. We provide 24/7 emergency septic service across Texas. Our licensed technicians are available days, nights, weekends, and holidays. Call (469) 506-6606 anytime." },
  { question: "What areas do you serve in Texas?", answer: "We serve over 40 cities across Texas including Conroe, Katy, Spring, The Woodlands, New Braunfels, Boerne, Georgetown, Dripping Springs, Weatherford, and many more suburban and rural communities." },
  { question: "Can you pump my septic tank on weekends?", answer: "Yes. Weekend and after-hours septic pumping is available across our Texas service areas. Pricing depends on travel time and whether the job is emergency service." },
];

const recentPosts = getRecentBlogPosts(3);

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schemas={[websiteSchema(), organizationSchema(), localBusinessSchema(), faqSchema(homeFaqs)]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-950/40 border border-green-700/50 rounded-full px-3 py-1 mb-4 text-xs font-semibold text-green-100 uppercase tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                Service-Disabled Veteran-Owned Small Business
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                24/7 Emergency Septic Service Across Texas — Same-Day Response
              </h1>
              <p className="text-lg text-green-100 mb-6">
                Licensed Texas septic contractors. Real trucks. Real technicians. Average response under 2 hours for emergencies. No hidden fees.
              </p>
              <div className="grid gap-3 sm:grid-cols-3 mb-6 text-sm">
                <div className="rounded-lg border border-green-700/60 bg-green-950/30 px-4 py-3 text-green-50">
                  <p className="font-semibold">Licensed & Insured</p>
                  <p className="mt-1 text-green-100">Texas TCEQ certified. General liability & workers comp.</p>
                </div>
                <div className="rounded-lg border border-green-700/60 bg-green-950/30 px-4 py-3 text-green-50">
                  <p className="font-semibold">Under 2 Hour Response</p>
                  <p className="mt-1 text-green-100">Emergency dispatch 24/7. Nights, weekends & holidays.</p>
                </div>
                <div className="rounded-lg border border-green-700/60 bg-green-950/30 px-4 py-3 text-green-50">
                  <p className="font-semibold">Satisfaction Guaranteed</p>
                  <p className="mt-1 text-green-100">If we can&apos;t fix it, you don&apos;t pay. Upfront pricing always.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <PhoneCTA size="lg" />
              </div>
              <LiveAvailability />
            </div>
            <div id="lead-form">
              <LeadForm sourcePage="/" />
            </div>
          </div>
        </div>
      </section>

      <UrgencyBar />

      <TrustSignals />

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Our Septic Services</h2>
          <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto">
            From routine pumping to emergency repairs, our licensed technicians handle it all across 40+ Texas cities.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps />

      {/* Blog Teaser */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Septic Tips & Guides</h2>
                <p className="text-slate-600 mt-1">Expert advice for Texas homeowners</p>
              </div>
              <Link href="/blog" className="text-green-700 hover:text-green-900 font-semibold text-sm hidden sm:block">
                View all posts →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-green-200 transition-all group"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-slate-900 mt-3 mb-2 leading-snug group-hover:text-green-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2">{post.description}</p>
                  <span className="text-green-700 text-sm font-semibold mt-3 inline-block">Read more →</span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6 sm:hidden">
              <Link href="/blog" className="text-green-700 font-semibold text-sm">View all posts →</Link>
            </div>
          </div>
        </section>
      )}

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

      <TestimonialsSection testimonials={testimonials} />

      <FAQSection faqs={homeFaqs} />

      {/* Final CTA */}
      <section className="bg-green-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Septic Help Now?</h2>
          <p className="text-green-100 mb-8">Call now for immediate dispatch. Emergency service available 24/7 across Texas.</p>
          <PhoneCTA size="lg" />
        </div>
      </section>
    </>
  );
}
