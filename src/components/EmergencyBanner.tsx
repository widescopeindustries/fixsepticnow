"use client";

import { AlertTriangle, Phone } from "lucide-react";
import { PHONE_NUMBER, PHONE_TEL } from "@/lib/constants";

export function EmergencyBanner() {
  return (
    <div className="bg-red-600 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm font-semibold">
        <AlertTriangle className="h-4 w-4 flex-shrink-0" />
        <span>Septic Emergency?</span>
        <a href={PHONE_TEL} className="underline hover:no-underline flex items-center gap-1">
          <Phone className="h-3 w-3" />
          Call {PHONE_NUMBER} — 24/7 Response
        </a>
      </div>
    </div>
  );
}
