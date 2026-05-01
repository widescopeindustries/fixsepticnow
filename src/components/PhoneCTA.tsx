"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE_NUMBER, PHONE_TEL } from "@/lib/constants";

interface PhoneCTAProps {
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline";
  className?: string;
  showIcon?: boolean;
}

export function PhoneCTA({ size = "default", variant = "default", className = "", showIcon = true }: PhoneCTAProps) {
  const isOutline = variant === "outline";
  return (
    <Button
      asChild
      size={size}
      variant={variant}
      className={`${isOutline ? "border-amber-500 text-amber-600 hover:bg-amber-50" : "bg-amber-500 hover:bg-amber-600 text-white"} font-bold ${size === "lg" ? "text-lg px-8 py-6" : ""} ${className}`}
    >
      <a href={PHONE_TEL} onClick={() => {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "phone_click", { event_category: "conversion", event_label: "Phone CTA Click" });
        }
      }}>
        {showIcon && <Phone className={`mr-2 ${size === "lg" ? "h-5 w-5" : "h-4 w-4"}`} />}
        {PHONE_NUMBER}
      </a>
    </Button>
  );
}
