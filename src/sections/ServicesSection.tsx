"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Droplets,
  Sparkles,
  Wrench,
  Zap,
  ClipboardCheck,
  HardHat,
  ArrowRight,
  Phone,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: Droplets,
    title: "Septic Tank Pumping",
    description: "Professional septic tank pumping to remove accumulated sludge and prevent backups.",
    price: "$300 - $600",
    slug: "septic-pumping",
  },
  {
    icon: Sparkles,
    title: "Septic Tank Cleaning",
    description: "Thorough septic tank cleaning including pumping, inspection, and bacteria treatment.",
    price: "$350 - $700",
    slug: "septic-cleaning",
  },
  {
    icon: Wrench,
    title: "Septic Tank Repair",
    description: "Expert diagnosis and repair of septic system issues including leaks, clogs, and damaged components.",
    price: "$500 - $3,000+",
    slug: "septic-repair",
  },
  {
    icon: Zap,
    title: "Emergency Septic Pumping",
    description: "24/7 emergency septic pumping for backups, overflows, and sewage emergencies. Same-day response.",
    price: "$500 - $1,500+",
    slug: "emergency-septic-pumping",
    badge: "24/7",
  },
  {
    icon: ClipboardCheck,
    title: "Septic Tank Inspection",
    description: "Comprehensive septic system inspections for home buyers, sellers, and routine maintenance.",
    price: "$200 - $500",
    slug: "septic-inspection",
  },
  {
    icon: HardHat,
    title: "Septic Tank Installation",
    description: "New septic system design and installation for residential and commercial properties.",
    price: "$5,000 - $15,000+",
    slug: "septic-installation",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-green-50 py-20"
      style={{ zIndex: 2 }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-[60%]">
            <span className="text-xs uppercase tracking-widest text-green-600" style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" }}>
              OUR SERVICES
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              From Routine Pumping to Emergency Repairs
            </h2>
            <p className="mt-4 max-w-[480px] text-lg text-gray-500">
              Our licensed technicians handle it all across 40+ Texas cities. Upfront pricing. No hidden fees.
            </p>

            <div className="mt-12 flex flex-col gap-4">
              {SERVICES.map((service, idx) => (
                <div
                  key={service.title}
                  ref={(el) => {
                    if (el) cardsRef.current[idx] = el;
                  }}
                  className="service-card flex gap-4 p-6 rounded-xl border border-gray-200 bg-white transition-all duration-200 cursor-default hover:border-green-500 hover:shadow-[0_4px_20px_rgba(22,163,74,0.08)] hover:-translate-y-0.5"
                >
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <service.icon size={22} className="text-green-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {service.title}
                      </h3>
                      {service.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-medium" style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" }}>
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-sm font-medium text-green-600" style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" }}>
                        {service.price}
                      </span>
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex items-center gap-1 text-sm text-green-600 hover:underline"
                      >
                        Learn more <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-[40%]">
            <div className="lg:sticky lg:top-[100px]">
              <div className="p-8 rounded-2xl border border-gray-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                <h3 className="text-xl font-semibold text-gray-900">
                  Need Immediate Help?
                </h3>
                <a
                  href="tel:4699867883"
                  className="block mt-2 text-[28px] font-bold text-green-600 hover:text-green-700"
                >
                  (469) 986-7883
                </a>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-600 pulse-dot" />
                  <span className="text-sm font-medium text-green-600">
                    A technician is available NOW
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Next available: Today at 8:00 PM — 1 slot remaining
                </p>
                <hr className="my-5 border-gray-200" />
                <p className="text-xs text-gray-400 leading-relaxed">
                  All prices are estimates. Final quote provided after on-site inspection.
                </p>
                <a
                  href="tel:4699867883"
                  className="mt-5 flex items-center justify-center gap-2 w-full py-4 rounded-lg bg-green-600 text-white font-semibold transition-colors duration-200 hover:bg-green-700"
                >
                  <Phone size={18} />
                  CALL NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
