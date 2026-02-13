import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import type { City } from "@/lib/cities";

interface CityCardProps {
  city: City;
  serviceSlug?: string;
}

export function CityCard({ city, serviceSlug }: CityCardProps) {
  const href = serviceSlug
    ? `/${city.slug}-${serviceSlug}`
    : `/${city.slug}-septic-services`;

  return (
    <Link href={href}>
      <Card className="h-full hover:shadow-lg transition-shadow border-slate-200 hover:border-green-300">
        <CardContent className="p-4 flex items-center gap-3">
          <MapPin className="h-5 w-5 text-green-700 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-slate-900">{city.name}, TX</h3>
            <p className="text-xs text-slate-500">{city.county} County</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
