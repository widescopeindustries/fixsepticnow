import UnderwaterBackground from "@/components/UnderwaterBackground";
import HeroSection from "@/sections/HeroSection";
import LeadFormBand from "@/sections/LeadFormBand";
import ServicesSection from "@/sections/ServicesSection";
import HowItWorksSection from "@/sections/HowItWorksSection";
import ServiceAreasSection from "@/sections/ServiceAreasSection";
import ReviewsSection from "@/sections/ReviewsSection";
import FAQSection from "@/sections/FAQSection";
import BannerImage from "@/sections/BannerImage";
import CTABanner from "@/sections/CTABanner";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { organizationSchema, localBusinessSchema, websiteSchema } from "@/lib/schema";
import { homeMetadata } from "@/lib/metadata";

export const metadata = homeMetadata();

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schemas={[organizationSchema(), localBusinessSchema(undefined, undefined, undefined, undefined, { ratingValue: 4.9, reviewCount: 127 }), websiteSchema()]} />
      <UnderwaterBackground />
      <HeroSection />
      <LeadFormBand />
      <ServicesSection />
      <HowItWorksSection />
      <BannerImage
        src="/images/texas-homeowners-guide-banner.jpg"
        alt="The Texas Homeowner's Guide to Septic Systems — learn, maintain, and understand your most vital home system. 24/7 emergency pumping, service-disabled veteran-owned."
        href="/blog"
        ariaLabel="Read the Texas Homeowner's Guide to Septic Systems on our blog"
      />
      <ServiceAreasSection />
      <ReviewsSection />
      <FAQSection />
      <BannerImage
        src="/images/questions-24-7-banner.jpg"
        alt="Questions? We're here 24/7. Service-disabled veteran-owned septic team serving Conroe, Katy, Ennis, and Midlothian, Texas. Call (469) 986-7883 for 24/7 dispatch."
        href="tel:4699867883"
        ariaLabel="Questions? Call (469) 986-7883 — 24/7 dispatch"
      />
      <CTABanner />
    </>
  );
}
