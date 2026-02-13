import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { ChatWidget } from "@/components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

const GA_MEASUREMENT_ID = "G-5T9GG24J5G";

export const metadata: Metadata = {
  title: "Emergency Septic Pumping & Repair in Texas | Fix Septic Now",
  description: "24/7 emergency septic tank pumping, cleaning & repair across Texas. Licensed pros, fast response. Call (936) 292-2926.",
  metadataBase: new URL("https://fixsepticnow.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className={`${inter.className} antialiased`}>
        <EmergencyBanner />
        <Header />
        <main className="min-h-screen pb-16 md:pb-0">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <ChatWidget />
      </body>
    </html>
  );
}
