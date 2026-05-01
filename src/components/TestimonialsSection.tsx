import { Star } from "lucide-react";
import { Testimonial } from "@/lib/testimonials";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  cityName?: string;
}

export function TestimonialsSection({ testimonials, cityName }: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
          {cityName ? `What ${cityName} Homeowners Say` : "What Texas Homeowners Say"}
        </h2>
        <p className="text-center text-slate-500 mb-10 max-w-2xl mx-auto">
          Real reviews from real customers across Texas.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, starIdx) => (
                  <Star
                    key={starIdx}
                    className={`h-4 w-4 ${starIdx < t.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
                  />
                ))}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="text-sm">
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="text-slate-500">{t.city}, TX {t.service ? `• ${t.service}` : ""}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
