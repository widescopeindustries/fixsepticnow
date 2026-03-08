import { Shield, Clock, Star, BadgeCheck } from "lucide-react";

interface TrustSignalsProps {
  cityName?: string;
  countyName?: string;
}

const signals = [
  { icon: Shield, label: "Vetted Local Partners", sublabel: "Licensed septic contractors" },
  { icon: Clock, label: "24/7 Availability Checks", sublabel: "Weekend and after-hours help" },
  { icon: Star, label: "Price + ETA Up Front", sublabel: "No blind dispatch" },
  { icon: BadgeCheck, label: "Approval Before Dispatch", sublabel: "You confirm before work starts" },
];

export function TrustSignals({ cityName, countyName }: TrustSignalsProps) {
  return (
    <section className="py-8 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        {cityName && (
          <p className="text-center text-sm text-slate-500 mb-4">
            Proudly serving {cityName}{countyName ? ` & ${countyName} County` : ""}, Texas
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
