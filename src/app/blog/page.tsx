import Link from "next/link";

export const metadata = {
  title: "Septic Tank Tips & Guides | Fix Septic Now Blog",
  description: "Expert septic tank maintenance tips, guides, and advice for Texas homeowners. Learn how to care for your septic system.",
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black mb-4">Septic Tank Tips & Guides</h1>
          <p className="text-lg text-green-100">
            Expert advice for Texas homeowners on septic system maintenance, troubleshooting, and care.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-slate-600">Blog posts coming soon. Check back for expert septic maintenance guides and tips.</p>
          <Link href="/" className="text-green-700 hover:underline mt-4 inline-block">
            &larr; Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
