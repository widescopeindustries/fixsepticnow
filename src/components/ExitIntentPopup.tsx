"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Phone, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PHONE_TEL, PHONE_NUMBER } from "@/lib/constants";

const STORAGE_KEY = "exit_intent_shown";
const DELAY_MS = 3000; // Don't show before 3 seconds on page

interface ExitIntentPopupProps {
  sourcePage?: string;
}

export function ExitIntentPopup({ sourcePage }: ExitIntentPopupProps) {
  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const hasTriggered = useRef(false);
  const pageLoadTime = useRef(Date.now());
  const lastScrollY = useRef(0);
  const scrollVelocityBuffer = useRef<number[]>([]);

  const trigger = useCallback(() => {
    // Don't trigger if already shown this session
    if (hasTriggered.current) return;
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // sessionStorage blocked in some browsers — proceed anyway
    }

    // Don't trigger too soon after page load
    if (Date.now() - pageLoadTime.current < DELAY_MS) return;

    hasTriggered.current = true;
    setVisible(true);

    // Track in Google Analytics
    if (typeof window !== "undefined" && typeof (window as typeof window & { gtag?: Function }).gtag === "function") {
      (window as typeof window & { gtag: Function }).gtag("event", "exit_intent_shown", {
        event_category: "engagement",
        event_label: sourcePage || window.location.pathname,
      });
    }
  }, [sourcePage]);

  // Desktop: mouse exits viewport from the top
  useEffect(() => {
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) {
        trigger();
      }
    }
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [trigger]);

  // Mobile: rapid scroll-up (user going back to navigate away)
  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      const delta = lastScrollY.current - currentY; // positive = scrolling UP
      lastScrollY.current = currentY;

      if (delta > 0) {
        scrollVelocityBuffer.current.push(delta);
        // Keep only last 5 scroll events
        if (scrollVelocityBuffer.current.length > 5) {
          scrollVelocityBuffer.current.shift();
        }
        // If average upward velocity is high and user is near top, trigger
        const avg =
          scrollVelocityBuffer.current.reduce((a, b) => a + b, 0) /
          scrollVelocityBuffer.current.length;
        if (avg > 40 && currentY < 300) {
          trigger();
        }
      } else {
        scrollVelocityBuffer.current = [];
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trigger]);

  // Tab visibility: user switches away (on mobile)
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        trigger();
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [trigger]);

  function dismiss() {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch { /* blocked */ }

    if (typeof (window as typeof window & { gtag?: Function }).gtag === "function") {
      (window as typeof window & { gtag: Function }).gtag("event", "exit_intent_dismissed", {
        event_category: "engagement",
        event_label: sourcePage || window.location.pathname,
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const phoneClean = phone.replace(/\D/g, "");
    if (phoneClean.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          service: "Emergency Service",
          cityZip: "Unknown",
          message: "Exit intent popup capture",
          sourceType: "exit_intent",
          sourceUrl: sourcePage || (typeof window !== "undefined" ? window.location.pathname : "/"),
          tcpaConsent: true,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch { /* blocked */ }

        if (typeof (window as typeof window & { gtag?: Function }).gtag === "function") {
          (window as typeof window & { gtag: Function }).gtag("event", "exit_intent_converted", {
            event_category: "conversion",
            event_label: sourcePage || window.location.pathname,
            value: 1,
          });
        }
      } else {
        setError("Something went wrong. Please try calling us directly.");
      }
    } catch {
      setError("Network error. Please call us at " + PHONE_NUMBER);
    } finally {
      setSubmitting(false);
    }
  }

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Red urgency banner */}
          <div className="bg-red-600 text-white px-6 py-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="font-bold text-sm uppercase tracking-wide">
              Wait — Don&apos;t leave without help!
            </span>
          </div>

          <div className="px-6 pt-5 pb-6">
            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 text-white hover:text-red-100 mt-1"
              aria-label="Close popup"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {!submitted ? (
              <>
                <h2
                  id="exit-intent-title"
                  className="text-2xl font-black text-slate-900 mb-1"
                >
                  Get a Callback in 5 Minutes — Free
                </h2>
                <p className="text-slate-600 text-sm mb-4">
                  Our licensed septic techs are standing by 24/7. Drop your number and we'll call you within 5 minutes with a free estimate — no obligation.
                </p>

                {/* Trust micro-signals */}
                <div className="flex gap-4 mb-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" aria-hidden="true" />
                    Licensed &amp; Insured
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" aria-hidden="true" />
                    No Obligation
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" aria-hidden="true" />
                    Free Estimate
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  <div>
                    <label htmlFor="ei-name" className="sr-only">Your Name</label>
                    <Input
                      id="ei-name"
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      aria-label="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="ei-phone" className="sr-only">Your Phone Number</label>
                    <Input
                      id="ei-phone"
                      type="tel"
                      placeholder="Your Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      aria-label="Your Phone Number"
                      inputMode="tel"
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-600" role="alert">{error}</p>
                  )}

                  {/* Hidden TCPA consent — disclosed in label below */}
                  <input type="hidden" name="tcpaConsent" value="true" />

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 text-base"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                    ) : (
                      "Call Me in 5 Minutes →"
                    )}
                  </Button>

                  <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                    By submitting, I consent to receive a call/text from Fix Septic Now at the number provided. Message & data rates may apply. Consent is not required for service.
                  </p>
                </form>

                <div className="mt-3 text-center">
                  <a
                    href={PHONE_TEL}
                    className="text-sm font-semibold text-green-700 hover:underline"
                    onClick={dismiss}
                  >
                    Or call now: {PHONE_NUMBER}
                  </a>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="h-14 w-14 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-black text-slate-900 mb-2">
                  We&apos;ll Call You Shortly!
                </h2>
                <p className="text-slate-600 mb-4">
                  A Fix Septic Now technician will call you within 5 minutes. If it&apos;s urgent, call us now:
                </p>
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center gap-2 bg-green-700 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-800"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {PHONE_NUMBER}
                </a>
                <button
                  onClick={dismiss}
                  className="block mt-3 mx-auto text-xs text-slate-400 hover:underline"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
