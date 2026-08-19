"use client";

import { Phone, MessageCircle, FileText } from "lucide-react";
import { PHONE_TEL } from "@/lib/constants";

export function StickyMobileCTA() {
  function openChat() {
    // Dispatch custom event that ChatWidget listens to
    window.dispatchEvent(new CustomEvent("open-chat"));
  }

  function scrollToForm() {
    const form = document.getElementById("lead-form");
    if (form) form.scrollIntoView({ behavior: "smooth" });
  }

  const smsBody = encodeURIComponent("I need septic service. Please call me back.");
  const smsHref = `sms:+14699867883?body=${smsBody}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-green-700 border-t border-green-800 shadow-lg">
      <div className="grid grid-cols-3 divide-x divide-green-800">
        <a
          href={PHONE_TEL}
          aria-label="Call now for septic service"
          className="flex flex-col items-center gap-1 py-3 text-white hover:bg-green-800 active:scale-95 transition-transform"
          onClick={() => {
            if (typeof window !== "undefined" && typeof window.gtag === "function") {
              window.gtag("event", "phone_click", { event_category: "conversion", event_label: "Sticky Mobile Call" });
            }
          }}
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-semibold">Call Now</span>
        </a>
        <a
          href={smsHref}
          aria-label="Text us for septic help"
          className="flex flex-col items-center gap-1 py-3 text-white hover:bg-green-800 active:scale-95 transition-transform"
          onClick={() => {
            if (typeof window !== "undefined" && typeof window.gtag === "function") {
              window.gtag("event", "sms_click", { event_category: "conversion", event_label: "Sticky Mobile Text" });
            }
          }}
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-semibold">Text Us</span>
        </a>
        <button
          onClick={scrollToForm}
          aria-label="Scroll to quote form"
          className="flex flex-col items-center gap-1 py-3 text-white hover:bg-green-800 active:scale-95 transition-transform"
        >
          <FileText className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-semibold">Get Quote</span>
        </button>
      </div>
    </div>
  );
}
