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

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-green-700 border-t border-green-800 shadow-lg">
      <div className="grid grid-cols-3 divide-x divide-green-800">
        <a href={PHONE_TEL} aria-label="Call now for septic service" className="flex flex-col items-center gap-1 py-3 text-white hover:bg-green-800">
          <Phone className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-semibold">Call Now</span>
        </a>
        <button onClick={openChat} aria-label="Open chat for septic help" className="flex flex-col items-center gap-1 py-3 text-white hover:bg-green-800">
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-semibold">Chat Now</span>
        </button>
        <button onClick={scrollToForm} aria-label="Scroll to quote form" className="flex flex-col items-center gap-1 py-3 text-white hover:bg-green-800">
          <FileText className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-semibold">Get Quote</span>
        </button>
      </div>
    </div>
  );
}
