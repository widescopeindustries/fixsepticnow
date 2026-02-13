"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";
import { PhoneCTA } from "./PhoneCTA";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  service: z.string().min(1, "Please select a service"),
  cityZip: z.string().min(2, "City or zip code required"),
  message: z.string().optional(),
  tcpaConsent: z.literal(true, { message: "Consent is required" }),
});

type FormData = z.infer<typeof schema>;

const serviceOptions = [
  "Septic Pumping",
  "Septic Cleaning",
  "Septic Repair",
  "Emergency Service",
  "Septic Inspection",
  "Septic Installation",
  "Septic Maintenance",
  "Other",
];

interface LeadFormProps {
  sourcePage?: string;
  preselectedService?: string;
  preselectedCity?: string;
}

export function LeadForm({ sourcePage, preselectedService, preselectedCity }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: preselectedService || "",
      cityZip: preselectedCity || "",
    },
  });

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          sourceType: "form",
          sourceUrl: sourcePage || window.location.pathname,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "form_submit", { event_category: "conversion", event_label: data.service, value: 1 });
        }
      }
    } catch {
      // fail silently for now
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-900 mb-2">We Got Your Request!</h3>
        <p className="text-green-700">A septic technician will contact you shortly. For immediate help:</p>
        <div className="mt-4">
          <PhoneCTA size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-1">Get Help Now</h3>
      <p className="text-sm text-slate-500 mb-4">Free estimate — response in minutes</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label htmlFor="lead-name" className="sr-only">Full Name</label>
          <Input placeholder="Full Name" id="lead-name" aria-label="Full Name" {...register("name")} />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="lead-phone" className="sr-only">Phone Number</label>
          <Input placeholder="Phone Number" type="tel" id="lead-phone" aria-label="Phone Number" {...register("phone")} />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="lead-service" className="sr-only">Service Needed</label>
          <select
            {...register("service")}
            id="lead-service"
            aria-label="Service Needed"
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="">Select a Service</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service.message}</p>}
        </div>
        <div>
          <label htmlFor="lead-city" className="sr-only">City or Zip Code</label>
          <Input placeholder="City or Zip Code" id="lead-city" aria-label="City or Zip Code" {...register("cityZip")} />
          {errors.cityZip && <p className="text-xs text-red-500 mt-1">{errors.cityZip.message}</p>}
        </div>
        <div>
          <label htmlFor="lead-message" className="sr-only">Describe your issue</label>
          <Textarea placeholder="Describe your issue (optional)" id="lead-message" aria-label="Describe your issue" rows={3} {...register("message")} />
        </div>
        <div className="flex items-start gap-2">
          <input type="checkbox" {...register("tcpaConsent")} className="mt-1" id="tcpa" />
          <label htmlFor="tcpa" className="text-xs text-slate-500">
            By submitting, I consent to receive calls/texts from Fix Septic Now at the number provided. Message & data rates may apply. Consent is not a condition of purchase.
          </label>
        </div>
        {errors.tcpaConsent && <p className="text-xs text-red-500">{errors.tcpaConsent.message}</p>}
        <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3" disabled={submitting}>
          {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Get Help Now"}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-400 mb-2">Or call now for immediate help:</p>
        <PhoneCTA variant="outline" size="sm" />
      </div>
    </div>
  );
}
