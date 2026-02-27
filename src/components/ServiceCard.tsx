import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Sparkles, Wrench, Siren, Search, HardHat, CalendarCheck, ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Truck, Sparkles, Wrench, Siren, Search, HardHat, CalendarCheck,
};

interface ServiceCardProps {
  service: Service;
  citySlug?: string;
  /** "hub" uses nested URL structure (/septic-services/[city]-tx/[service]) */
  variant?: "default" | "hub";
}

export function ServiceCard({ service, citySlug, variant = "default" }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Truck;

  // Generate URL based on variant
  let href: string;
  if (citySlug) {
    href = variant === "hub"
      ? `/septic-services/${citySlug}-tx/${service.slug}`
      : `/septic-services/${citySlug}-tx/${service.slug}`;
  } else {
    href = `/services/${service.slug}`;
  }

  return (
    <Link href={href}>
      <Card className="h-full hover:shadow-lg transition-shadow border-slate-200 hover:border-green-300 group">
        <CardContent className="p-6 flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Icon className="h-6 w-6 text-green-700" />
          </div>
          <h3 className="font-semibold text-slate-900 group-hover:text-green-700 transition-colors flex items-center gap-1">
            {service.name}
            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2">{service.description}</p>
          <div className="flex gap-2 mt-auto">
            <Badge variant="secondary" className="text-xs">{service.priceRange}</Badge>
            {service.isEmergency && <Badge className="bg-red-600 text-xs">24/7</Badge>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
