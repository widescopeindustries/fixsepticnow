import Link from "next/link";
import { cities } from "@/lib/cities";
import { services } from "@/lib/services";
import { PHONE_NUMBER, PHONE_TEL, SITE_NAME } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <p className="text-xl font-black text-white mb-2">{SITE_NAME}</p>
            <p className="text-sm mb-4">24/7 emergency septic pumping, cleaning, repair & installation across Texas.</p>
            <a href={PHONE_TEL} className="text-amber-400 font-bold hover:text-amber-300">{PHONE_NUMBER}</a>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-3">Services</h4>
            <ul className="space-y-1">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm hover:text-green-400">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas - Column 1 */}
          <div>
            <h4 className="text-white font-semibold mb-3">Service Areas</h4>
            <ul className="space-y-1">
              {cities.slice(0, 20).map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}-septic-services`} className="text-sm hover:text-green-400">{c.name}, TX</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas - Column 2 */}
          <div>
            <h4 className="text-white font-semibold mb-3">More Areas</h4>
            <ul className="space-y-1">
              {cities.slice(20).map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}-septic-services`} className="text-sm hover:text-green-400">{c.name}, TX</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">Company</h4>
              <ul className="space-y-1">
                <li><Link href="/about" className="text-sm hover:text-green-400">About Us</Link></li>
                <li><Link href="/contact" className="text-sm hover:text-green-400">Contact</Link></li>
                <li><Link href="/blog" className="text-sm hover:text-green-400">Blog</Link></li>
                <li><Link href="/privacy-policy" className="text-sm hover:text-green-400">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-sm hover:text-green-400">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6 text-center text-xs text-slate-500">
          <p>&copy; {year} {SITE_NAME}. All rights reserved. Licensed & Insured in Texas.</p>
        </div>
      </div>
    </footer>
  );
}
