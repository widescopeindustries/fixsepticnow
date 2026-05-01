import { Phone, Truck, CheckCircle } from "lucide-react";

const steps = [
  { icon: Phone, title: "1. Call or Request Help", description: "Call (469) 506-6606 or submit the form with your city and problem. It takes 30 seconds." },
  { icon: Truck, title: "2. Get Price + ETA", description: "We confirm a real quote and arrival window before any work begins. No surprises, no hidden fees." },
  { icon: CheckCircle, title: "3. We Fix It", description: "A licensed technician arrives on time and completes the job. Satisfaction guaranteed — if we can't fix it, you don't pay." },
];

export function ProcessSteps() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <step.icon className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
