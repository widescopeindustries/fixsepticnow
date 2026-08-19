"use client";

import { Phone, Flag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const SERVICE_LINKS = [
  { label: "Septic Pumping", href: "/services/septic-pumping" },
  { label: "Septic Cleaning", href: "/services/septic-cleaning" },
  { label: "Septic Repair", href: "/services/septic-repair" },
  { label: "Emergency Pumping", href: "/services/emergency-septic-pumping" },
  { label: "Septic Inspection", href: "/services/septic-inspection" },
  { label: "Septic Installation", href: "/services/septic-installation" },
  { label: "Septic Maintenance", href: "/services/septic-maintenance" },
];

const AREA_LINKS = [
  { label: "Conroe", href: "/septic-services/conroe-tx" },
  { label: "The Woodlands", href: "/septic-services/the-woodlands-tx" },
  { label: "Katy", href: "/septic-services/katy-tx" },
  { label: "Ennis", href: "/septic-services/ennis-tx" },
  { label: "Midlothian", href: "/septic-services/midlothian-tx" },
  { label: "Waxahachie", href: "/septic-services/waxahachie-tx" },
  { label: "View All", href: "/service-areas" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export default function NewFooter() {
  return (
    <footer
      className="relative"
      style={{
        background: "#022c22",
        padding: "64px 0 32px",
        zIndex: 2,
      }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-600" />
              <span
                className="text-sm font-bold text-green-50 uppercase tracking-widest"
                style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" }}
              >
                FIX SEPTIC <span className="text-lime-400">NOW</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-green-50/60 leading-relaxed">
              24/7 emergency septic pumping, cleaning, repair & installation across Texas.
            </p>
            <a
              href="tel:4699867883"
              className="mt-4 inline-flex items-center gap-2 text-base font-semibold text-lime-400 hover:text-lime-300"
            >
              <Phone size={14} />
              (469) 986-7883
            </a>
            <div className="mt-4">
              <Image
                src="https://www.veteranownedbusiness.com/images/banner_links/SDVOSB-Member-Badge-Horizontal.jpg"
                alt="SDVOSB Certified"
                width={120}
                height={36}
                className="h-auto rounded"
                unoptimized
              />
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-green-50">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-green-50/60 hover:text-lime-400 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-green-50">Service Areas</h4>
            <ul className="flex flex-col gap-2.5">
              {AREA_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-green-50/60 hover:text-lime-400 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-areas"
                  className="text-sm font-medium text-green-600 hover:text-green-500 transition-colors duration-150"
                >
                  View All
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-green-50">Company</h4>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-green-50/60 hover:text-lime-400 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-12 border-lime-400/15" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-green-50/40">
            &copy; 2026 Fix Septic Now. All rights reserved. Licensed & Insured in Texas.
          </p>
          <div className="flex items-center gap-2">
            <Flag size={14} className="text-green-50/40" />
            <span className="text-[13px] text-green-50/40">Veteran-Owned Business</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
