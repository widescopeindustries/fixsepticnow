"use client";

import { PHONE_NUMBER, PHONE_TEL } from "@/lib/constants";

interface TrackedPhoneLinkProps {
  label: string;
  className?: string;
}

export function TrackedPhoneLink({ label, className = "text-green-700 font-semibold" }: TrackedPhoneLinkProps) {
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
      {PHONE_NUMBER}
    </a>
  );
}
