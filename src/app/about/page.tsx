import { PhoneCTA } from "@/components/PhoneCTA";
import { TrustSignals } from "@/components/TrustSignals";
import { PHONE_NUMBER, EMAIL } from "@/lib/constants";

export const metadata = {
  title: "About Fix Septic Now | Licensed Texas Septic Professionals",
  description: "Fix Septic Now provides 24/7 septic pumping, cleaning, repair and emergency service across Texas. Licensed, insured, and trusted.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black mb-4">About Fix Septic Now</h1>
          <p className="text-lg text-green-100">
            Texas&apos;s trusted 24/7 septic service provider. Fast, licensed, and always available.
          </p>
        </div>
      </section>

      <TrustSignals />

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 space-y-6 text-slate-700">
          <h2 className="text-2xl font-bold text-slate-900">Who We Are</h2>
          <p>
            Fix Septic Now connects Texas homeowners with licensed, insured septic professionals — fast. Whether it&apos;s a routine pump-out or a 2 AM sewage emergency, we dispatch help to your door.
          </p>
          <p>
            We serve over 40 cities across the Houston metro, Austin-San Antonio corridor, DFW suburbs, and East Texas. Our technicians understand the unique soil conditions, regulations, and challenges of each region.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 pt-4">Why Choose Us</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>24/7 Availability:</strong> Septic emergencies don&apos;t wait, and neither do we. Call anytime, day or night.</li>
            <li><strong>Licensed & Insured:</strong> Every technician is Texas state licensed and fully insured.</li>
            <li><strong>Fast Response:</strong> We target under 60-minute response times in our primary service areas.</li>
            <li><strong>Transparent Pricing:</strong> Free estimates. No hidden fees. You approve the price before we start.</li>
            <li><strong>AI-Powered Support:</strong> Our AI assistant answers your call 24/7, so you never hit voicemail.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 pt-4">Contact Us</h2>
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
