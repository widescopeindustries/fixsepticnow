import Link from "next/link";
import { PhoneCTA } from "@/components/PhoneCTA";

export default function NotFound() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-black mb-4">404</h1>
          <p className="text-2xl font-bold mb-4">Page Not Found</p>
          <p className="text-lg text-green-100 mb-8">
            Sorry, we couldn't find the page you're looking for. But we can definitely find your septic problem — and fix it fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <PhoneCTA size="lg" />
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-white text-green-800 font-bold py-3 px-8 rounded-lg hover:bg-green-50 transition-colors text-lg"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Looking for something specific?</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <Link href="/services/septic-pumping" className="block border border-slate-200 rounded-lg p-4 hover:border-green-300 hover:shadow-sm transition-all">
              <p className="font-semibold text-slate-900">Septic Pumping</p>
              <p className="text-sm text-slate-500">Routine and emergency pumping across Texas</p>
            </Link>
            <Link href="/services/emergency-septic-service" className="block border border-slate-200 rounded-lg p-4 hover:border-green-300 hover:shadow-sm transition-all">
              <p className="font-semibold text-slate-900">Emergency Service</p>
              <p className="text-sm text-slate-500">24/7 response for backups and overflows</p>
            </Link>
            <Link href="/services/septic-repair" className="block border border-slate-200 rounded-lg p-4 hover:border-green-300 hover:shadow-sm transition-all">
              <p className="font-semibold text-slate-900">Septic Repair</p>
              <p className="text-sm text-slate-500">Fix leaks, clogs, and drain field issues</p>
            </Link>
            <Link href="/blog" className="block border border-slate-200 rounded-lg p-4 hover:border-green-300 hover:shadow-sm transition-all">
              <p className="font-semibold text-slate-900">Septic Tips & Guides</p>
              <p className="text-sm text-slate-500">Expert advice for Texas homeowners</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
