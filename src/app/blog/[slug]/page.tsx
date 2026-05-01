import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, blogPosts } from "@/lib/blog-posts";
import { getServiceBySlug } from "@/lib/services";
import { getCityBySlug } from "@/lib/cities";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { FAQSection } from "@/components/FAQSection";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Fix Septic Now`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Topic-specific FAQs derived from each blog post
const blogFaqMap: Record<string, { question: string; answer: string }[]> = {
  "how-often-pump-septic-tank-texas": [
    { question: "How often should you pump a septic tank in Texas?", answer: "Most Texas homeowners should pump their septic tank every 3–5 years. Homes with 4+ occupants, garbage disposals, or heavy clay soil should pump every 2–3 years. The EPA recommends inspections at least every 3 years." },
    { question: "What happens if you don't pump your septic tank?", answer: "Skipping pump service causes solids to enter and clog the drain field, which costs $5,000–$15,000 to replace. A routine pump-out costs just $300–$600. Neglected tanks can also cause sewage backup into your home." },
    { question: "How much does septic tank pumping cost in Texas?", answer: "Septic tank pumping in Texas costs $300–$600 for most residential tanks (750–1,500 gallons). Pricing varies by tank size, accessibility, and location. Emergency or after-hours service typically costs 1.5x–2x more." },
    { question: "Does Texas clay soil affect how often I need to pump?", answer: "Yes. Heavy clay soil common in the Houston area, DFW, and Central Texas drains slowly, causing tanks to fill faster. Homeowners on clay soil should pump every 2–3 years instead of the standard 3–5." },
    { question: "What are signs my septic tank needs pumping?", answer: "Warning signs include slow drains throughout the house, gurgling sounds from toilets, sewage odors inside or outside, soggy ground over the drain field, and unusually lush grass over the septic area." },
  ],
  "warning-signs-septic-tank-full": [
    { question: "What are the warning signs of a full septic tank?", answer: "The 7 key signs are: slow drains throughout the house, gurgling pipes, sewage odor inside, sewage odor outside, unusually green grass over the drain field, soggy ground over the drain field, and sewage backing up into the lowest drains." },
    { question: "What should I do if my septic tank is full?", answer: "Stop using all water immediately — every gallon makes it worse. Don't add chemicals or drain cleaners. Call a licensed septic professional for emergency pump-out. Keep people and pets away from affected areas." },
    { question: "Can a full septic tank cause sewage backup in my house?", answer: "Yes. When a tank is completely full and the system has nowhere to drain, raw sewage backs up through the lowest plumbing points — floor drains, bathtubs, and showers. This is a biohazard requiring immediate professional service." },
    { question: "How much does it cost to fix a full septic tank?", answer: "A standard pump-out costs $300–$600. However, if the drain field has failed due to neglect, replacement costs $5,000–$15,000+. Emergency after-hours service runs $700–$1,500. Early detection saves thousands." },
    { question: "Is sewage backup from a full septic tank dangerous?", answer: "Yes. Raw sewage contains dangerous pathogens including E. coli, salmonella, and hepatitis A. Sewage backup is a biohazard — keep people and pets away, ventilate the area, and call for professional cleanup immediately." },
  ],
  "septic-tank-pumping-cost-texas": [
    { question: "How much does septic tank pumping cost in Texas in 2026?", answer: "A standard residential septic pump-out in Texas costs $300–$600 depending on tank size. A 750–1,000 gallon tank runs $300–$400, while 1,500+ gallon tanks cost $450–$600. Emergency service costs 1.5x–2x more." },
    { question: "What factors affect septic pumping cost in Texas?", answer: "Key factors include tank size, accessibility (buried lids cost $75–$150 extra to dig up), your location in Texas (metro areas cost more), time of service (after-hours is 1.5x–2x), and tank condition (severely overfilled tanks take longer)." },
    { question: "Is a cheap septic pumping service worth it?", answer: "Not always. A $250 quote that skips proper disposal at a licensed facility can cost you legally. Always verify the company is TCEQ-licensed, get a written quote upfront, and ask exactly what's included before the truck arrives." },
    { question: "How much does emergency septic pumping cost in Texas?", answer: "Emergency or after-hours septic pumping typically costs $700–$1,500 in Texas — about 1.5x to 2x the standard rate. A pump-out during business hours that would cost $400 might run $800 on a weekend night." },
    { question: "What is not included in a standard septic pump-out?", answer: "A standard pump-out usually does not include camera inspection, baffle repair, filter cleaning, distribution box inspection, or a written report. Full inspections for real estate transactions cost $200–$500 additional." },
  ],
  "texas-soil-types-septic-system": [
    { question: "How does Texas soil type affect my septic system?", answer: "Soil is the engine that treats wastewater in your drain field. Clay soil drains too slowly (causing saturation), sandy soil drains too fast (insufficient treatment), and limestone karst terrain may require aerobic treatment systems. Your soil type determines system design and maintenance frequency." },
    { question: "What is the best soil type for a septic system in Texas?", answer: "Sandy loam is ideal — it drains at the right rate and supports bacterial activity. Common in East Texas (Conroe, Magnolia, Huntsville, Bastrop). Standard tank sizing and 3–5 year pump schedules work well with sandy loam." },
    { question: "Do I need a special septic system in the Texas Hill Country?", answer: "Often yes. Hill Country limestone karst terrain has thin soil over fractured rock. Many properties require aerobic treatment units (ATUs) instead of conventional septic, especially in Edwards Aquifer Protection Zone areas. ATUs require quarterly maintenance contracts by Texas law." },
    { question: "How often should I pump my septic tank in clay soil?", answer: "Homeowners on heavy clay soil (common in DFW, Waco, Austin corridor, Houston East) should pump every 2–3 years for a family of 4. Clay drains slowly, causing drain field saturation and faster tank fill rates compared to sandy loam." },
    { question: "How can I find out my soil type in Texas?", answer: "Check the free USDA Web Soil Survey (websoilsurvey.sc.egov.usda.gov), contact your county health department for perc test records, review your septic system permit, or ask a licensed septic professional who knows local soil profiles." },
  ],
  "emergency-septic-problems-what-to-do": [
    { question: "What should I do during a septic emergency?", answer: "Stop using all water immediately, keep people and pets away from affected areas, call a licensed emergency septic service, don't add chemicals or open the tank yourself, and document damage with photos for insurance claims." },
    { question: "How do I know if I have a septic emergency?", answer: "Septic emergencies include: sewage backing up into toilets, showers, or floor drains; raw sewage visible on your yard surface; strong persistent sewage odor inside the home; toilets that won't flush at all; and multiple drains backing up simultaneously." },
    { question: "How much does emergency septic service cost in Texas?", answer: "Emergency septic service in Texas costs $500–$1,500+ depending on the severity and time of day. After-hours rates are typically 1.5x–2x standard pricing. The cost of emergency service is far less than the $10,000+ cost of drain field replacement from neglect." },
    { question: "Can I fix a septic emergency myself?", answer: "No. Septic emergencies require a professional pump truck and specialized equipment. Never open the septic tank lid yourself — tanks contain hydrogen sulfide gas, which can be lethal. Don't try shop vacs or sump pumps. Call a licensed professional." },
    { question: "Does homeowners insurance cover septic emergencies?", answer: "Some homeowners insurance policies cover damage caused by sudden septic failures, including interior sewage backup damage. It typically does not cover the septic repair itself. Document all damage with photos and contact your insurer after the emergency is resolved." },
  ],
  "new-septic-installation-texas-guide": [
    { question: "How much does a new septic system cost in Texas?", answer: "Total costs range from $6,000–$15,000 for most residential installs. Conventional gravity systems cost $5,000–$10,000, aerobic treatment units $10,000–$20,000, and advanced drip irrigation systems $15,000–$25,000+. Add $500–$1,400 for soil evaluation and permits." },
    { question: "Do I need a permit for a new septic system in Texas?", answer: "Yes. All new septic installations in Texas must be permitted through your county (not the state). Each county has its own authorized agent. Permit approval takes 2–6 weeks and costs $200–$600 depending on your county." },
    { question: "How long does septic system installation take in Texas?", answer: "Once permitted, installation typically takes 1–3 days: excavation and tank placement on day 1, drain field installation on days 1–2, and backfill and connections on days 2–3. A county inspection is required before final backfill." },
    { question: "What type of septic system do I need in Texas?", answer: "This depends on your soil type and county requirements. Sandy loam supports conventional gravity systems. Clay soils may need low-pressure dosing. Hill Country limestone often requires aerobic treatment units. A licensed OSSF designer determines the right system after soil testing." },
    { question: "What questions should I ask my septic installer?", answer: "Ask: Are you TCEQ-licensed? Will you handle the permit? What's included in the price (tank, drain field, risers)? What's the warranty? Will you be present for the county inspection? What maintenance does this system require?" },
  ],
  "same-day-septic-pumping-texas": [
    { question: "Is same-day septic pumping really available in Texas?", answer: "Yes, same-day septic pumping is available in most major Texas metros including Houston, Austin, San Antonio, and DFW. However, not every company offers it. Same-day requires dedicated emergency dispatch crews and standby trucks. Call before noon for the best chance." },
    { question: "How much does same-day septic pumping cost?", answer: "Same-day septic pumping typically costs $600–$1,000 versus $300–$500 for standard scheduling. The premium reflects the disruption to the company's route and the urgency of the call. Emergency after-hours rates can run higher." },
    { question: "What is the best time to call for same-day septic service?", answer: "Call as early as possible — ideally before 8 AM. Most same-day slots fill by noon. Being clear that your situation is urgent (backup, overflow, strong odor) helps prioritize your call." },
    { question: "How fast can a septic truck arrive for same-day service?", answer: "In Houston metro areas, trucks often arrive within 2–4 hours of the call. Austin and San Antonio average 3–5 hours. DFW suburbs vary by location. Rural East Texas may be next-day even for emergencies." },
    { question: "Do I need same-day service or can it wait?", answer: "Same-day is necessary for sewage backup inside the home, overflowing tanks, surfacing effluent, or strong persistent odors. Routine maintenance with working drains can safely wait 1–2 weeks for a standard appointment." },
  ],
  "septic-repair-vs-replace-texas": [
    { question: "Should I repair or replace my septic system?", answer: "Repair makes sense if your system is under 20 years old and the problem is mechanical (baffles, filters, distribution box) or partial drain field damage. Replace if the system is 25+ years old, the drain field has completely failed, or repairs would cost 50%+ of replacement." },
    { question: "How much does septic repair cost in Texas?", answer: "Common repairs range from $150–$3,000: baffle replacement ($300–$600), distribution box replacement ($500–$1,500), partial drain field replacement ($2,500–$6,000), and tank crack sealing ($500–$2,000). Full replacement costs $5,000–$20,000+." },
    { question: "What is the 50% rule for septic systems?", answer: "If repair estimates exceed 50% of replacement cost and your system is over 20 years old, replacement is usually the smarter investment. Under 50% and under 20 years, repair is typically the better financial choice." },
    { question: "How long does a repaired septic system last?", answer: "Proper repairs can extend a system's life 5–20 years depending on the fix. Baffle replacements add 5–10 years. Partial drain field replacements add 10–20 years. However, a system that's already 25+ years old may develop new problems even after repairs." },
    { question: "Do I need a permit to replace my septic system in Texas?", answer: "Yes. All septic system replacements in Texas require a county permit. The process includes soil evaluation, system design approval, and a final inspection. Permits cost $200–$600 and take 2–6 weeks depending on your county." },
  ],
  "why-does-my-septic-tank-smell": [
    { question: "Why does my septic tank smell?", answer: "The 5 most common causes are: 1) The tank needs pumping, 2) Dry traps in unused drains, 3) Damaged or missing vent pipes, 4) Drain field failure, and 5) Broken tank seals or riser gaskets. Each has a distinct smell pattern and location." },
    { question: "Is a smelly septic tank dangerous?", answer: "Yes. Sewage odors contain hydrogen sulfide and other gases that can be harmful at high concentrations. Persistent odors also indicate your system isn't functioning properly, which can lead to sewage backup and groundwater contamination." },
    { question: "How do I get rid of septic tank smell?", answer: "First, pump the tank if it's overdue. Second, run water in all drains to refill dry traps. Third, inspect visible tank lids and risers for gaps. If the smell persists, call a professional — you may have a drain field failure or vent pipe damage." },
    { question: "Can I use bleach or chemicals to stop septic odor?", answer: "No. Bleach and antibacterial chemicals kill the beneficial bacteria your tank needs to function. This can make odors worse and accelerate system failure. Address the root cause instead of masking the smell." },
    { question: "When should I call a professional for septic odor?", answer: "Call a licensed septic professional if odors persist after pumping the tank and refilling drain traps. Persistent odors often indicate drain field failure, cracked tanks, or damaged plumbing vents — all issues requiring professional diagnosis and repair." },
  ],
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedServices = post.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter(Boolean);

  const relatedCities = post.relatedCitySlugs
    .map((c) => getCityBySlug(c))
    .filter(Boolean);

  const blogFaqs = blogFaqMap[slug] || [];
  const schemas = [
    ...(blogFaqs.length > 0 ? [faqSchema(blogFaqs)] : []),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Blog", url: `${SITE_URL}/blog` },
      { name: post.title, url: `${SITE_URL}/blog/${slug}` },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-14">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-4">
            <Link
              href="/blog"
              className="text-green-200 hover:text-white text-sm font-medium transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
          <div className="flex items-center gap-2 text-green-300 text-sm mb-4">
            <span className="bg-green-700 text-green-100 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide">
              {post.category}
            </span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-green-100 text-lg leading-relaxed mb-6">
            {post.description}
          </p>
          <div className="flex items-center gap-3 text-green-300 text-sm">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <article
            className="prose prose-lg prose-green max-w-none
              prose-headings:font-black prose-headings:text-slate-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-slate-700 prose-p:leading-relaxed
              prose-ul:text-slate-700 prose-ol:text-slate-700
              prose-li:mb-1
              prose-strong:text-slate-900
              prose-a:text-green-700 hover:prose-a:text-green-900
              prose-table:text-sm
              prose-th:bg-green-50 prose-th:text-green-900 prose-th:font-semibold
              prose-td:text-slate-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-slate-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {blogFaqs.length > 0 && <FAQSection faqs={blogFaqs} />}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-10 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-lg font-black text-slate-900 mb-4">Related Services</h2>
            <div className="flex flex-wrap gap-3">
              {relatedServices.map((service) => (
                <Link
                  key={service!.slug}
                  href={`/services/${service!.slug}`}
                  className="inline-flex items-center gap-2 bg-white border border-green-200 text-green-800 hover:bg-green-700 hover:text-white hover:border-green-700 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  {service!.name} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Serving These Areas */}
      {relatedCities.length > 0 && (
        <section className="py-10 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-lg font-black text-slate-900 mb-1">
              Serving Texas Communities
            </h2>
            <p className="text-slate-500 text-sm mb-4">
              We provide professional septic service in these areas and throughout Texas.
            </p>
            <div className="flex flex-wrap gap-2">
              {relatedCities.map((city) => (
                <Link
                  key={city!.slug}
                  href={`/septic-services/${city!.slug}-tx`}
                  className="bg-slate-100 hover:bg-green-100 text-slate-700 hover:text-green-800 text-sm px-3 py-1.5 rounded-full transition-colors"
                >
                  {city!.name}, TX
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 bg-green-50 border-t border-green-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-3">
            Need Septic Service in Texas?
          </h2>
          <p className="text-slate-600 mb-6">
            Licensed, local septic professionals ready to help — from routine
            pump-outs to emergency service. Fast response, fair pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+14695066606"
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
            >
              Call (469) 506-6606
            </a>
            <Link
              href="/contact"
              className="border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
