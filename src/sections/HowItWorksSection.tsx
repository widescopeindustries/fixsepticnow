"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, ClipboardCheck, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    icon: Phone,
    number: "1",
    title: "Call or Request Help",
    description: "Call (469) 506-6606 or submit the form with your city and problem. It takes 30 seconds.",
  },
  {
    icon: ClipboardCheck,
    number: "2",
    title: "Get Price + ETA",
    description: "We confirm a real quote and arrival window before any work begins. No surprises, no hidden fees.",
  },
  {
    icon: CheckCircle,
    number: "3",
    title: "We Fix It",
    description: "A licensed technician arrives on time and completes the job. Satisfaction guaranteed — if we can't fix it, you don't pay.",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const circlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
      gsap.from(circlesRef.current, {
        scale: 0.8,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative bg-white py-20"
      style={{ zIndex: 2 }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-green-600" style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" }}>
            HOW IT WORKS
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Get Your Septic Fixed in 3 Easy Steps
          </h2>
          <p className="mt-4 mx-auto max-w-[500px] text-lg text-gray-500">
            From first call to finished job, we keep it simple and transparent.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute top-7 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-gray-300" />

          {STEPS.map((step, idx) => (
            <div
              key={step.number}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              className="step-card flex flex-col items-center text-center px-6 py-10"
            >
              <div
                ref={(el) => {
                  if (el) circlesRef.current[idx] = el;
                }}
                className="flex items-center justify-center h-14 w-14 rounded-full border-2 border-green-500/20 bg-green-100"
              >
                <span className="text-2xl font-bold text-green-600">{step.number}</span>
              </div>

              <step.icon size={48} className="mt-6 text-green-600" />

              <h3 className="mt-4 text-xl font-semibold text-gray-900">{step.title}</h3>

              <p className="mt-2 max-w-[280px] text-[15px] text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
