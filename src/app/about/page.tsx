import Image from "next/image";
import { PhoneCTA } from "@/components/PhoneCTA";
import { TrustSignals } from "@/components/TrustSignals";
import { PHONE_NUMBER, EMAIL } from "@/lib/constants";

export const metadata = {
  title: "About Fix Septic Now | Veteran-Owned Texas Septic Service",
  description: "Fix Septic Now is operated by Widescope Industries LLC, a Service-Disabled Veteran-Owned Small Business providing 24/7 septic services across Texas.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black mb-4">About Fix Septic Now</h1>
          <p className="text-lg text-green-100">
            Veteran-owned. Texas-based. Available 24/7.
          </p>
        </div>
      </section>

      <TrustSignals />

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 space-y-6 text-slate-700">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 pb-4">
            <div className="flex-shrink-0">
              <Image
                src="/images/owner-portrait.jpg"
                alt="Owner of Fix Septic Now - Veteran-owned septic service"
                width={200}
                height={200}
                className="rounded-lg shadow-md"
                priority
              />
              <div className="mt-3 flex justify-center">
                <Image
                  src="/images/sba-sdvosb-logo.png"
                  alt="SBA Service-Disabled Veteran-Owned Small Business certification"
                  width={150}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Who We Are</h2>
              <p className="text-slate-700">
                Fix Septic Now is owned and operated by <strong>Widescope Industries LLC</strong>, a Texas-based company headquartered in Streetman, Texas. We are a certified <strong>Service-Disabled Veteran-Owned Small Business (SDVOSB)</strong> by the U.S. Small Business Administration, and we bring the same discipline, integrity, and commitment to service that defined our military careers to every septic job we take on.
              </p>
            </div>
          </div>
          <p>
            Our mission is straightforward: provide Texas homeowners with fast, honest, professional septic service — any time of day, any day of the year. Whether it&apos;s a routine pump-out or a 2 AM sewage emergency, we dispatch licensed technicians to your door.
          </p>
          <p>
            We serve over 40 cities across the Houston metro, Austin-San Antonio corridor, DFW suburbs, and East Texas. Our technicians understand the unique soil conditions, regulations, and challenges of each region — from the heavy Beaumont clay in Katy to the limestone karst terrain in the Hill Country.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 pt-4">Our Values</h2>
          <p>
            As a veteran-owned business, our operations are built on three principles:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Integrity:</strong> Transparent pricing, honest assessments. We tell you what your system actually needs — not what makes us the most money.</li>
            <li><strong>Service:</strong> 24/7 availability, fast response times, and the kind of reliability you can count on when it matters most.</li>
            <li><strong>Unwavering Support:</strong> From the first phone call to the final inspection, we stand behind our work with a satisfaction guarantee.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 pt-4">Why Choose Us</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Veteran-Owned & Operated:</strong> SDVOSB certified by the U.S. Small Business Administration.</li>
            <li><strong>24/7 Availability:</strong> Septic emergencies don&apos;t wait, and neither do we. Call anytime, day or night.</li>
            <li><strong>Licensed & Insured:</strong> Every technician is Texas state licensed and fully insured.</li>
            <li><strong>Fast Response:</strong> We target under 60-minute response times in our primary service areas.</li>
            <li><strong>Transparent Pricing:</strong> Free estimates. No hidden fees. You approve the price before we start.</li>
            <li><strong>AI-Powered Support:</strong> Our AI assistant answers your call 24/7, so you never hit voicemail.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 pt-4">Company Information</h2>
          <p>
            <strong>Widescope Industries LLC</strong><br />
            316 Brandywine Ave<br />
            Streetman, TX 75859
          </p>
          <p>
            Phone: <a href="tel:+19362922926" className="text-green-700 font-semibold">{PHONE_NUMBER}</a><br />
            Email: <a href={`mailto:${EMAIL}`} className="text-green-700">{EMAIL}</a>
          </p>
        </div>
      </section>

      <section className="bg-green-800 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-green-100 mb-8">Call now for a free estimate.</p>
          <PhoneCTA size="lg" />
        </div>
      </section>
    </>
  );
}
