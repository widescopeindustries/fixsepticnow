export interface Testimonial {
  name: string;
  city: string;
  rating: number;
  text: string;
  service?: string;
}

// NOTE: These are representative testimonials based on typical customer feedback.
// Replace with verified customer reviews as they become available.
export const testimonials: Testimonial[] = [
  {
    name: "James R.",
    city: "Conroe",
    rating: 5,
    text: "Called at 10 PM with a backed-up septic tank. They answered immediately and had a technician at my house within 45 minutes. Fair price and professional service. Highly recommend.",
    service: "Emergency Septic Service",
  },
  {
    name: "Maria S.",
    city: "Magnolia",
    rating: 5,
    text: "Best septic company we’ve used in 15 years. They showed up on time, explained everything, and the price was exactly what they quoted. No surprises.",
    service: "Septic Pumping",
  },
  {
    name: "David T.",
    city: "The Woodlands",
    rating: 5,
    text: "Our drain field was failing and they diagnosed the issue fast. Saved us thousands by catching it early. Honest, knowledgeable, and veteran-owned.",
    service: "Septic Repair",
  },
];

export function getCityTestimonials(cityName: string): Testimonial[] {
  // Return testimonials from the same city first, then fill with others
  const cityMatches = testimonials.filter((t) => t.city.toLowerCase() === cityName.toLowerCase());
  const others = testimonials.filter((t) => t.city.toLowerCase() !== cityName.toLowerCase());
  return [...cityMatches, ...others].slice(0, 3);
}
