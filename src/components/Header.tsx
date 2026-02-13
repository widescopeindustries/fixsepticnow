"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE_NUMBER, PHONE_TEL } from "@/lib/constants";

const navLinks = [
  { label: "Services", href: "/services/septic-pumping" },
  { label: "Emergency", href: "/services/emergency-septic-service" },
  { label: "Service Areas", href: "/#cities" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-black text-green-800">Fix</span>
          <span className="text-xl font-black text-slate-900">Septic</span>
          <span className="text-xl font-black text-amber-500">Now</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 hover:text-green-700">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <a href={PHONE_TEL} className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {PHONE_NUMBER}
            </a>
          </Button>
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="flex flex-col p-4 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-700 py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="bg-green-700 hover:bg-green-800 mt-2">
              <a href={PHONE_TEL} className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Call {PHONE_NUMBER}
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
