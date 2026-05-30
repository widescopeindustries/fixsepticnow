import UnderwaterBackground from "@/components/UnderwaterBackground";
import HeroSection from "@/sections/HeroSection";
import LeadFormBand from "@/sections/LeadFormBand";
import ServicesSection from "@/sections/ServicesSection";
import HowItWorksSection from "@/sections/HowItWorksSection";
import ServiceAreasSection from "@/sections/ServiceAreasSection";
import ReviewsSection from "@/sections/ReviewsSection";
import FAQSection from "@/sections/FAQSection";
import CTABanner from "@/sections/CTABanner";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { organizationSchema, localBusinessSchema, websiteSchema } from "@/lib/schema";
import { homeMetadata } from "@/lib/metadata";

export const metadata = homeMetadata();

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schemas={[websiteSchema(), organizationSchema(), localBusinessSchema()]} />
      <UnderwaterBackground />
      <HeroSection />
      <LeadFormBand />
      <ServicesSection />
      <HowItWorksSection />
      <ServiceAreasSection />
      <ReviewsSection />
      <FAQSection />
      <CTABanner />
    </>
  );
}
