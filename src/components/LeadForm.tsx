"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Loader2 } from "lucide-react";
import { PHONE_NUMBER } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  cityZip: z.string().min(2, "City or zip code required"),
  problem: z.string().min(1, "Please select a problem"),
});

type FormData = z.infer<typeof schema>;

const problemOptions = [
  { value: "", label: "What's the problem?" },
  { value: "backing-up", label: "Tank is backing up" },
  { value: "routine-pumping", label: "Need routine pumping" },
  { value: "smell-in-yard", label: "Smell in yard" },
  { value: "other", label: "Other" },
];

interface LeadFormProps {
  sourcePage?: string;
  preselectedService?: string;
  preselectedCity?: string;
}

export function LeadForm({ sourcePage, preselectedCity }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      cityZip: preselectedCity || "",
      problem: "",
    },
  });

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          cityZip: data.cityZip,
          service: problemOptions.find(o => o.value === data.problem)?.label || data.problem,
          message: `Problem: ${problemOptions.find(o => o.value === data.problem)?.label || data.problem}`,
          sourceType: "form",
          sourceUrl: sourcePage || window.location.pathname,
          tcpaConsent: true,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "form_submit", { event_category: "conversion", event_label: data.problem, value: 1 });
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
        <p className="text-green-700">A technician will call you back within 15 minutes. If this is an emergency, call us now.</p>
        <div className="mt-4">
          <a
            href="tel:+14695066606"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-lg"
          >
            Call {PHONE_NUMBER}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-1">Get Help Now</h3>
      <p className="text-sm text-slate-500 mb-4">Fill out the form and a technician will call you back within 15 minutes.</p>
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
          <label htmlFor="lead-city" className="sr-only">City or Zip Code</label>
          <Input placeholder="City or Zip Code" id="lead-city" aria-label="City or Zip Code" {...register("cityZip")} />
          {errors.cityZip && <p className="text-xs text-red-500 mt-1">{errors.cityZip.message}</p>}
        </div>
        <div>
          <label htmlFor="lead-problem" className="sr-only">What's the problem?</label>
          <select
            {...register("problem")}
            id="lead-problem"
            aria-label="What's the problem?"
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
          >
            {problemOptions.map((option) => (
              <option key={option.value || "blank"} value={option.value}>{option.label}</option>
            ))}
          </select>
          {errors.problem && <p className="text-xs text-red-500 mt-1">{errors.problem.message}</p>}
        </div>
        <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3" disabled={submitting}>
          {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : "Get Help Now"}
        </Button>
        <p className="text-[10px] text-slate-400 text-center leading-relaxed">
          By submitting, you agree to be contacted by Fix Septic Now at the number provided. Message & data rates may apply.
        </p>
      </form>
      <div className="mt-4 text-center border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-400 mb-2">Rather talk to a human?</p>
        <a
          href="tel:+14695066606"
          className="inline-flex items-center gap-2 text-green-700 font-bold text-sm hover:underline"
        >
          {PHONE_NUMBER} — We&apos;re answering calls now
        </a>
      </div>
    </div>
  );
}
