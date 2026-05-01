import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { services } from "@/lib/services";
import { TrackedPhoneButton } from "@/components/TrackedPhoneButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Septic Tank Tips & Guides | Fix Septic Now Blog",
  description:
    "Expert septic tank maintenance tips, guides, and advice for Texas homeowners. Learn how to care for your septic system, recognize warning signs, and save money.",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const categoryColors: Record<string, string> = {
  Maintenance: "bg-blue-100 text-blue-800",
  Troubleshooting: "bg-orange-100 text-orange-800",
  Pricing: "bg-purple-100 text-purple-800",
  Education: "bg-teal-100 text-teal-800",
  Emergency: "bg-red-100 text-red-800",
  Installation: "bg-green-100 text-green-800",
};

const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black mb-4">Septic Tank Tips & Guides</h1>
          <p className="text-lg text-green-100">
            Expert advice for Texas homeowners on septic system maintenance,
            troubleshooting, costs, and care.
          </p>
        </div>
      </section>

      {/* Post Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid gap-8">
            {sortedPosts.map((post) => (
              <article
                key={post.slug}
                className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/blog/${post.slug}`} className="block p-6 group">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${
                        categoryColors[post.category] ??
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="text-slate-400 text-sm">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900 group-hover:text-green-700 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <time
                      dateTime={post.date}
                      className="text-slate-400 text-sm"
                    >
                      {formatDate(post.date)}
                    </time>
                    <span className="text-green-700 font-semibold text-sm group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Service */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Browse by Service</h2>
          <p className="text-slate-500 text-sm mb-5">Find information about your specific septic need.</p>
          <div className="flex flex-wrap gap-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="bg-white border border-slate-200 hover:border-green-300 hover:bg-green-50 text-slate-700 hover:text-green-800 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-green-50 border-t border-green-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-3">
            Have a Septic Problem Right Now?
          </h2>
          <p className="text-slate-600 mb-6">
            Reading is great. But if your system needs attention, let&apos;s talk.
            Fast, licensed septic service across Texas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedPhoneButton label="Blog CTA Phone Click" />
            <Link
              href="/contact"
              className="border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
