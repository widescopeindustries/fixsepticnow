"use client";

import { useEffect, useRef } from "react";
import { Shield, Clock, Star, Phone, ChevronDown } from "lucide-react";
import WaveText from "@/components/WaveText";

const TRUST_BADGES = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Clock, label: "Under 2 Hour Response" },
  { icon: Star, label: "Satisfaction Guaranteed" },
  { icon: Phone, label: "24/7 Dispatch" },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (heroRef.current) {
        heroRef.current.classList.add("fonts-loaded");
      }
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100dvh] items-center justify-center px-4 sm:px-6"
      style={{
        background: "transparent",
        zIndex: 1,
        paddingTop: 100,
      }}
    >
      <div className="mx-auto max-w-[800px] text-center">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-600" />
          <span className="text-xs font-semibold uppercase tracking-widest text-lime-400" style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" }}>
            Service-Disabled Veteran-Owned
          </span>
        </div>

        <h1
          className="hero-headline"
          style={{
            fontFamily: "var(--font-oswald), 'Oswald', sans-serif",
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 700,
            textTransform: "uppercase",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "#f0fdf4",
            textShadow: "0 4px 30px rgba(0,0,0,0.7)",
            perspective: "1000px",
          }}
        >
          <WaveText text="24/7 EMERGENCY" />
          <br className="hidden sm:block" />
          <WaveText text="SEPTIC SERVICE" />
          <br className="hidden sm:block" />
          <WaveText text="ACROSS TEXAS" />
        </h1>

        <p className="mx-auto mt-6 max-w-[560px] text-lg text-green-50/80 leading-relaxed">
          Licensed Texas septic contractors. Real trucks. Real technicians. Average response under 2 hours for emergencies. No hidden fees.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:9362977856"
            className="flex items-center gap-2 px-8 py-4 rounded-lg bg-green-600 text-white font-semibold transition-all duration-200 hover:scale-[1.02] hover:bg-green-700"
          >
            <Phone size={18} />
            CALL (936) 297-7856
          </a>
          <button
            onClick={() => {
              const el = document.querySelector("#lead-form");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-lg border-2 border-lime-400/50 text-green-50 font-semibold transition-all duration-200 hover:scale-[1.02] hover:border-lime-400 hover:bg-lime-400/10"
          >
            REQUEST HELP ONLINE
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2">
              <badge.icon size={20} className="text-lime-400" />
              <span className="text-[11px] uppercase tracking-wide text-green-50/80" style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" }}>
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest text-green-50/40" style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" }}>
          Scroll
        </span>
        <ChevronDown size={24} className="text-green-50/40" />
      </div>
    </section>
  );
}
