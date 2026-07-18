"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const ALL_CITIES = [
  { name: "Conroe", slug: "conroe" },
  { name: "Katy", slug: "katy" },
  { name: "Spring", slug: "spring" },
  { name: "Tomball", slug: "tomball" },
  { name: "Magnolia", slug: "magnolia" },
  { name: "Cypress", slug: "cypress" },
  { name: "The Woodlands", slug: "the-woodlands" },
  { name: "Humble", slug: "humble" },
  { name: "Willis", slug: "willis" },
  { name: "Waller", slug: "waller" },
  { name: "Richmond", slug: "richmond" },
  { name: "Fulshear", slug: "fulshear" },
  { name: "Georgetown", slug: "georgetown" },
  { name: "Bastrop", slug: "bastrop" },
  { name: "New Braunfels", slug: "new-braunfels" },
  { name: "Boerne", slug: "boerne" },
  { name: "Seguin", slug: "seguin" },
  { name: "Waxahachie", slug: "waxahachie" },
  { name: "Ennis", slug: "ennis" },
  { name: "Weatherford", slug: "weatherford" },
  { name: "Granbury", slug: "granbury" },
  { name: "Cleburne", slug: "cleburne" },
  { name: "Huntsville", slug: "huntsville" },
  { name: "Livingston", slug: "livingston" },
  { name: "Nacogdoches", slug: "nacogdoches" },
];

const EXPANDED_CITIES = [
  { name: "Palestine", slug: "palestine" },
  { name: "Athens", slug: "athens" },
  { name: "Navasota", slug: "navasota" },
  { name: "Brenham", slug: "brenham" },
  { name: "La Grange", slug: "la-grange" },
  { name: "Hempstead", slug: "hempstead" },
  { name: "Dripping Springs", slug: "dripping-springs" },
  { name: "Liberty Hill", slug: "liberty-hill" },
  { name: "Wimberley", slug: "wimberley" },
  { name: "Buda", slug: "buda" },
  { name: "Kyle", slug: "kyle" },
  { name: "Leander", slug: "leander" },
  { name: "Hutto", slug: "hutto" },
  { name: "Taylor", slug: "taylor" },
  { name: "Elgin", slug: "elgin" },
  { name: "Smithville", slug: "smithville" },
  { name: "Azle", slug: "azle" },
  { name: "Corsicana", slug: "corsicana" },
  { name: "Terrell", slug: "terrell" },
  { name: "Canton", slug: "canton" },
  { name: "Kaufman", slug: "kaufman" },
  { name: "Forney", slug: "forney" },
  { name: "Lufkin", slug: "lufkin" },
];

export default function ServiceAreasSection() {
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current.filter(Boolean), {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [expanded]);

  const displayedCities = expanded ? [...ALL_CITIES, ...EXPANDED_CITIES] : ALL_CITIES;

  return (
    <section
      id="service-areas"
      ref={sectionRef}
      className="relative bg-green-50 py-20"
      style={{ zIndex: 2 }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <span className="text-xs uppercase tracking-widest text-green-600" style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" }}>
          SERVICE AREAS
        </span>
        <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          We Serve Communities Across Texas
        </h2>
        <p className="mt-4 max-w-[500px] text-lg text-gray-500">
          Suburban and rural communities where septic systems are most common.
        </p>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedCities.map((city, idx) => (
            <div
              key={city.name}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
            >
              <Link
                href={`/septic-services/${city.slug}-tx`}
                className="city-card flex items-center gap-3 p-5 rounded-xl border border-gray-200 bg-white transition-all duration-150 hover:border-green-500 hover:shadow-[0_2px_12px_rgba(22,163,74,0.08)]"
              >
                <MapPin size={16} className="text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-[15px] font-medium text-gray-900">{city.name}</p>
                  <p className="text-xs text-gray-400">Texas</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {!expanded && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors duration-200"
            >
              View All 40+ Service Areas <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
