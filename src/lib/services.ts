export interface Service {
  name: string;
  slug: string;
  shortName: string;
  description: string;
  icon: string; // lucide icon name
  keywords: string[];
  priceRange: string;
  isEmergency: boolean;
}

export const services: Service[] = [
  {
    name: "Septic Tank Pumping",
    slug: "septic-pumping",
    shortName: "Pumping",
    description: "Professional septic tank pumping to remove accumulated sludge and prevent backups.",
    icon: "Truck",
    keywords: ["septic tank pumping", "septic pump out", "septic tank emptying", "pump septic tank"],
    priceRange: "$300 - $600",
    isEmergency: false,
  },
  {
    name: "Septic Tank Cleaning",
    slug: "septic-cleaning",
    shortName: "Cleaning",
    description: "Thorough septic tank cleaning including pumping, inspection, and bacteria treatment.",
    icon: "Sparkles",
    keywords: ["septic tank cleaning", "septic cleaners", "septic tank cleanout", "clean septic tank"],
    priceRange: "$350 - $700",
    isEmergency: false,
  },
  {
    name: "Septic Tank Repair",
    slug: "septic-repair",
    shortName: "Repair",
    description: "Expert diagnosis and repair of septic system issues including leaks, clogs, and damaged components.",
    icon: "Wrench",
    keywords: ["septic tank repair", "septic system repair", "septic repair service", "fix septic tank"],
    priceRange: "$500 - $3,000+",
    isEmergency: false,
  },
  {
    name: "Emergency Septic Service",
    slug: "emergency-septic-service",
    shortName: "Emergency",
    description: "24/7 emergency septic service for backups, overflows, and sewage emergencies. Fast response guaranteed.",
    icon: "Siren",
    keywords: ["emergency septic", "emergency septic pumping", "emergency septic service", "24/7 septic service", "septic emergency"],
    priceRange: "$500 - $1,500+",
    isEmergency: true,
  },
  {
    name: "Septic Tank Inspection",
    slug: "septic-inspection",
    shortName: "Inspection",
    description: "Comprehensive septic system inspections for home buyers, sellers, and routine maintenance.",
    icon: "Search",
    keywords: ["septic inspection", "septic tank inspection", "septic system inspection", "home septic inspection"],
    priceRange: "$200 - $500",
    isEmergency: false,
  },
  {
    name: "Septic Tank Installation",
    slug: "septic-installation",
    shortName: "Installation",
    description: "New septic system design and installation for residential and commercial properties.",
    icon: "HardHat",
    keywords: ["septic installation", "septic tank installation", "new septic system", "septic system installation"],
    priceRange: "$5,000 - $15,000+",
    isEmergency: false,
  },
  {
    name: "Septic Tank Maintenance",
    slug: "septic-maintenance",
    shortName: "Maintenance",
    description: "Scheduled septic maintenance plans to extend system life and prevent costly emergencies.",
    icon: "CalendarCheck",
    keywords: ["septic maintenance", "septic tank maintenance", "septic service plan", "septic care"],
    priceRange: "$200 - $400/year",
    isEmergency: false,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
