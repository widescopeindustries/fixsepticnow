"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Service Areas", href: "#service-areas" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export default function NewNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const dismissed = sessionStorage.getItem("emergency-banner-dismissed");
    if (dismissed) setBannerDismissed(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dismissBanner = () => {
    setBannerDismissed(true);
    sessionStorage.setItem("emergency-banner-dismissed", "true");
  };

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    if (isHome) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Emergency Banner */}
      {!bannerDismissed && (
        <div
          className="fixed left-0 right-0 z-[51] flex items-center justify-center px-4"
          style={{
            top: 0,
            height: 36,
            background: "#dc2626",
            transition: "transform 300ms ease",
          }}
        >
          <span
            className="text-center text-[11px] font-medium uppercase tracking-widest text-white"
            style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" }}
          >
            SEPTIC EMERGENCY? Call (936) 297-7856 NOW — 24/7 Dispatch
          </span>
          <button
            onClick={dismissBanner}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
            aria-label="Dismiss emergency banner"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav
        className="fixed left-0 right-0 z-50 flex items-center px-4 sm:px-6 lg:px-8"
        style={{
          top: bannerDismissed ? 0 : 36,
          height: 64,
          background: scrolled ? "rgba(2, 44, 34, 0.95)" : "rgba(2, 44, 34, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(163, 230, 53, 0.15)",
          transition: "top 300ms ease, background 300ms ease",
        }}
      >
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-green-600" />
            <span
              className="font-bold text-sm md:text-base text-green-50 tracking-tight"
              style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" }}
            >
              FIX SEPTIC <span className="text-lime-400">NOW</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              isHome ? (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-green-50/70 hover:text-lime-400 transition-colors duration-200 bg-transparent border-none cursor-pointer"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={`/${link.href}`}
                  className="text-sm font-medium text-green-50/70 hover:text-lime-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:9362977856"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 text-white text-sm font-semibold transition-colors duration-200 hover:bg-green-700"
            >
              <Phone size={14} />
              (936) 297-7856
            </a>
            {isHome ? (
              <button
                onClick={() => scrollToSection("#lead-form")}
                className="px-5 py-2.5 rounded-full bg-red-600 text-white text-sm font-semibold transition-colors duration-200 hover:bg-red-700 border-none cursor-pointer"
              >
                Get Help Now
              </button>
            ) : (
              <Link
                href="/#lead-form"
                className="px-5 py-2.5 rounded-full bg-red-600 text-white text-sm font-semibold transition-colors duration-200 hover:bg-red-700"
              >
                Get Help Now
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-green-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[49] flex flex-col items-center justify-center gap-8"
          style={{
            background: "#022c22",
            paddingTop: 100,
          }}
        >
          {NAV_LINKS.map((link) =>
            isHome ? (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-2xl font-medium text-green-50 bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={`/${link.href}`}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-medium text-green-50"
              >
                {link.label}
              </Link>
            )
          )}
          <div className="flex flex-col gap-3 mt-4">
            <a
              href="tel:9362977856"
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-green-600 text-white text-base font-semibold"
            >
              <Phone size={16} />
              (936) 297-7856
            </a>
            {isHome ? (
              <button
                onClick={() => scrollToSection("#lead-form")}
                className="px-8 py-3 rounded-full bg-red-600 text-white text-base font-semibold border-none cursor-pointer"
              >
                Get Help Now
              </button>
            ) : (
              <Link
                href="/#lead-form"
                onClick={() => setMobileOpen(false)}
                className="px-8 py-3 rounded-full bg-red-600 text-white text-base font-semibold text-center"
              >
                Get Help Now
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
