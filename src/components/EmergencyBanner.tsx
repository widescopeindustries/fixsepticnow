"use client";

import { AlertTriangle, Phone } from "lucide-react";
import { PHONE_NUMBER, PHONE_TEL } from "@/lib/constants";

export function EmergencyBanner() {
  return (
    <div className="bg-red-700 text-white py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm font-bold tracking-wide">
        <AlertTriangle className="h-4 w-4 flex-shrink-0 animate-pulse" />
        <span className="uppercase">Septic Emergency?</span>
        <a href={PHONE_TEL} className="underline hover:no-underline flex items-center gap-1 text-white">
          <Phone className="h-3 w-3" />
          Call {PHONE_NUMBER} NOW — 24/7 Dispatch
        </a>
      </div>
    </div>
  );
}
