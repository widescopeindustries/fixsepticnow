"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE_NUMBER, PHONE_TEL } from "@/lib/constants";

interface PhoneCTAProps {
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline";
  className?: string;
}

export function PhoneCTA({ size = "default", variant = "default", className = "" }: PhoneCTAProps) {
  return (
    <Button asChild size={size} variant={variant} className={`bg-amber-500 hover:bg-amber-600 text-white font-bold ${className}`}>
      <a href={PHONE_TEL} onClick={() => {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "phone_click", { event_category: "conversion", event_label: "Phone CTA Click" });
        }
      }}>
        <Phone className="mr-2 h-4 w-4" />
        {PHONE_NUMBER}
      </a>
    </Button>
  );
}
