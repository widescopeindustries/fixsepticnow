import Link from "next/link";
import { cities } from "@/lib/cities";
import { services } from "@/lib/services";

interface CityServiceGridProps {
  mode: "cities-for-service" | "services-for-city" | "nearby-cities";
  serviceSlug?: string;
  citySlug?: string;
  neighborSlugs?: string[];
}

export function CityServiceGrid({ mode, serviceSlug, citySlug, neighborSlugs }: CityServiceGridProps) {
  if (mode === "cities-for-service" && serviceSlug) {
    const service = services.find((s) => s.slug === serviceSlug);
    return (
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {service?.name || "This Service"} Available In:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}-${serviceSlug}`}
                className="text-sm text-green-700 hover:text-green-900 hover:underline py-1"
              >
                {city.name}, TX
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (mode === "services-for-city" && citySlug) {
    const city = cities.find((c) => c.slug === citySlug);
    return (
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            All Septic Services in {city?.name || "This Area"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${citySlug}-${service.slug}`}
                className="text-sm text-green-700 hover:text-green-900 hover:underline py-1"
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (mode === "nearby-cities" && neighborSlugs) {
    const neighbors = neighborSlugs
      .map((slug) => cities.find((c) => c.slug === slug))
      .filter(Boolean);
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Nearby Service Areas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {neighbors.map((city) => (
              <Link
                key={city!.slug}
                href={`/${city!.slug}-septic-services`}
                className="text-sm text-green-700 hover:text-green-900 hover:underline py-1"
              >
                {city!.name}, TX
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return null;
}
