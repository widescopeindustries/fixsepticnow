"use client";

import { PHONE_NUMBER, PHONE_TEL } from "@/lib/constants";

interface TrackedPhoneButtonProps {
  label: string;
  className?: string;
}

export function TrackedPhoneButton({ label, className = "bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg" }: TrackedPhoneButtonProps) {
  return (
    <a
      href={PHONE_TEL}
      onClick={() => {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "phone_click", { event_category: "conversion", event_label: label });
        }
      }}
      className={className}
    >
      Call {PHONE_NUMBER}
    </a>
  );
}
