"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const heading = contentRef.current?.querySelector("h2");
      const subheading = contentRef.current?.querySelector("p");
      const button = contentRef.current?.querySelector("a");

      if (heading && subheading) {
        gsap.from([heading, subheading], {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      if (button) {
        gsap.from(button, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20"
      style={{ zIndex: 2 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(2,44,34,0.92), rgba(2,44,34,0.85))",
          zIndex: -1,
        }}
      />

      <div className="mx-auto max-w-[700px] px-4 sm:px-6 text-center" ref={contentRef}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-50 tracking-tight leading-tight">
          Need Septic Help Now?
        </h2>
        <p className="mt-4 text-lg text-green-50/80">
          Call now for immediate dispatch. Emergency service available 24/7 across Texas.
        </p>
        <a
          href="tel:4695066606"
          className="mt-8 inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-green-600 text-white text-lg font-semibold transition-all duration-200 hover:bg-green-700 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(22,163,74,0.3)]"
        >
          <Phone size={20} />
          CALL (469) 506-6606
        </a>
      </div>
    </section>
  );
}
