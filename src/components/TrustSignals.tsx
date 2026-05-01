import { Shield, BadgeCheck, Star, Clock, CheckCircle, Phone } from "lucide-react";

interface TrustSignalsProps {
  cityName?: string;
  countyName?: string;
  responseTime?: string;
}

const signals = [
  { icon: Shield, label: "Licensed Septic Contractor", sublabel: "Texas TCEQ Certified" },
  { icon: BadgeCheck, label: "Fully Insured", sublabel: "General Liability & Workers Comp" },
  { icon: Star, label: "Veteran-Owned Business", sublabel: "SDVOSB Certified" },
  { icon: Clock, label: "Under 2 Hour Response", sublabel: "For emergency calls" },
  { icon: CheckCircle, label: "Satisfaction Guaranteed", sublabel: "If we can't fix it, you don't pay" },
  { icon: Phone, label: "24/7 Dispatch", sublabel: "Nights, weekends & holidays" },
];

export function TrustSignals({ cityName, countyName, responseTime }: TrustSignalsProps) {
  return (
    <section className="py-8 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        {cityName && (
          <p className="text-center text-sm text-slate-500 mb-4">
            Proudly serving {cityName}{countyName ? ` & ${countyName} County` : ""}, Texas
            {responseTime ? ` — Typical response: ${responseTime}` : ""}
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {signals.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center gap-2">
              <s.icon className="h-8 w-8 text-green-700" />
              <div>
                <p className="font-semibold text-slate-900 text-sm">{s.label}</p>
                <p className="text-xs text-slate-500">{s.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
