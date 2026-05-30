"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FAQ_ITEMS = [
  {
    question: "How much does septic tank pumping cost in Texas?",
    answer: "Septic tank pumping in Texas typically costs between $300 and $600 for a standard residential tank. Factors like tank size, accessibility, and the amount of sludge can affect the final price. We provide upfront quotes before any work begins.",
  },
  {
    question: "How often should a septic tank be pumped?",
    answer: "Most residential septic tanks should be pumped every 3 to 5 years. However, households with more occupants, smaller tanks, or garbage disposals may need pumping every 1 to 2 years. Regular inspections help determine the right schedule for your system.",
  },
  {
    question: "What are signs my septic tank needs pumping?",
    answer: "Watch for slow drains, gurgling sounds in plumbing, sewage odors inside or outside your home, wet spots in the yard, lush green patches over the drain field, or sewage backing up into toilets and sinks. If you notice any of these signs, call us immediately.",
  },
  {
    question: "Do you offer 24/7 emergency septic service?",
    answer: "Yes. We offer true 24/7 emergency septic service across Texas, including nights, weekends, and holidays. Our average emergency response time is under 2 hours. Call (469) 506-6606 anytime for immediate dispatch.",
  },
  {
    question: "What areas do you serve in Texas?",
    answer: "We serve 40+ cities across Texas including Conroe, Katy, Spring, The Woodlands, Magnolia, Cypress, Tomball, Humble, Willis, Richmond, Georgetown, Bastrop, New Braunfels, Boerne, and many more. Check our full service areas list above.",
  },
  {
    question: "Can you pump my septic tank on weekends?",
    answer: "Absolutely. We provide septic pumping and emergency services 7 days a week, including Saturdays and Sundays. Weekend appointments are available for both routine pumping and urgent situations.",
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="faq-item rounded-xl border border-gray-200 overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-150 hover:bg-gray-50 cursor-pointer bg-transparent border-none"
      >
        <span className="text-base font-medium text-gray-900 pr-4">{item.question}</span>
        <ChevronDown
          size={20}
          className="flex-shrink-0 transition-transform duration-300 text-gray-400"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "300px" : "0px" }}
      >
        <p className="px-6 pb-5 text-[15px] text-gray-500 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current.filter(Boolean), {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
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
      id="faq"
      ref={sectionRef}
      className="relative bg-green-50 py-20"
      style={{ zIndex: 2 }}
    >
      <div className="mx-auto max-w-[800px] px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-green-600" style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" }}>
            FAQ
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 mx-auto max-w-[450px] text-lg text-gray-500">
            Everything you need to know about septic service in Texas.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) itemsRef.current[idx] = el;
              }}
            >
              <AccordionItem
                item={item}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
