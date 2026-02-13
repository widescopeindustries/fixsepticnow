import { LeadForm } from "@/components/LeadForm";
import { PhoneCTA } from "@/components/PhoneCTA";
import { PHONE_NUMBER, EMAIL } from "@/lib/constants";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact Fix Septic Now | 24/7 Septic Service in Texas",
  description: "Contact Fix Septic Now for emergency septic service, free estimates, or questions. Call (936) 292-2926 or fill out our form.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black mb-4">Contact Us</h1>
          <p className="text-lg text-green-100">
            Available 24/7 for emergencies. Get a free estimate anytime.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-green-700 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900">Phone (24/7)</p>
                  <a href="tel:+19362922926" className="text-green-700 text-lg font-bold">{PHONE_NUMBER}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-green-700 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900">Email</p>
                  <a href={`mailto:${EMAIL}`} className="text-green-700">{EMAIL}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-green-700 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900">Service Area</p>
                  <p className="text-slate-600">40+ cities across Texas — Houston metro, Austin, San Antonio, DFW, and East Texas</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <PhoneCTA size="lg" />
            </div>
          </div>
          <div id="lead-form">
            <LeadForm sourcePage="/contact" />
          </div>
        </div>
      </section>
    </>
  );
}
