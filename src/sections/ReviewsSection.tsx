"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    name: "James R.",
    location: "Conroe, TX",
    service: "Emergency Septic Service",
    text: "Called at 10 PM with a backed-up septic tank. They answered immediately and had a technician at my house within 45 minutes. Fair price and professional service. Highly recommend.",
  },
  {
    name: "Maria S.",
    location: "Magnolia, TX",
    service: "Septic Pumping",
    text: "Best septic company we've used in 15 years. They showed up on time, explained everything, and the price was exactly what they quoted. No surprises.",
  },
  {
    name: "David T.",
    location: "The Woodlands, TX",
    service: "Septic Repair",
    text: "Our drain field was failing and they diagnosed the issue fast. Saved us thousands by catching it early. Honest, knowledgeable, and veteran-owned.",
  },
];

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (cardsRef.current[0]) {
        gsap.from(cardsRef.current[0], {
          x: -40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
      if (cardsRef.current[1]) {
        gsap.from(cardsRef.current[1], {
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
      if (cardsRef.current[2]) {
        gsap.from(cardsRef.current[2], {
          x: 40,
          opacity: 0,
          duration: 0.7,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative bg-white py-20"
      style={{ zIndex: 2 }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-green-600" style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" }}>
            CUSTOMER REVIEWS
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            What Texas Homeowners Say
          </h2>
          <p className="mt-4 mx-auto max-w-[400px] text-lg text-gray-500">
            Real reviews from real customers across Texas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <div
              key={review.name}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              className="review-card relative p-8 rounded-2xl border border-gray-200 bg-gray-50"
            >
              <span
                className="absolute top-4 left-6 text-5xl leading-none"
                style={{ color: "rgba(22, 163, 74, 0.15)" }}
              >
                &ldquo;
              </span>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#fbbf24" className="text-amber-400" />
                ))}
              </div>

              <p className="relative z-10 text-base italic text-gray-700 leading-relaxed mb-5">
                {review.text}
              </p>

              <div>
                <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">
                  {review.location} &bull; {review.service}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
