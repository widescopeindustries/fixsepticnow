"use client";

import { LeadForm } from "@/components/LeadForm";

export default function LeadFormBand() {
  return (
    <section
      id="lead-form"
      className="relative bg-white border-t border-gray-200"
      style={{ zIndex: 2 }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex-shrink-0">
            <p className="text-base font-medium text-gray-900">
              Get Help Now — A technician will call you back within 15 minutes
            </p>
          </div>
          <div className="flex-1 w-full">
            <LeadForm sourcePage="/" />
          </div>
        </div>
      </div>
    </section>
  );
}
