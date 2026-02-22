import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, blogPosts } from "@/lib/blog-posts";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Fix Septic Now`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-14">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-4">
            <Link
              href="/blog"
              className="text-green-200 hover:text-white text-sm font-medium transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
          <div className="flex items-center gap-2 text-green-300 text-sm mb-4">
            <span className="bg-green-700 text-green-100 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide">
              {post.category}
            </span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-green-100 text-lg leading-relaxed mb-6">
            {post.description}
          </p>
          <div className="flex items-center gap-3 text-green-300 text-sm">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <article
            className="prose prose-lg prose-green max-w-none
              prose-headings:font-black prose-headings:text-slate-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-slate-700 prose-p:leading-relaxed
              prose-ul:text-slate-700 prose-ol:text-slate-700
              prose-li:mb-1
              prose-strong:text-slate-900
              prose-a:text-green-700 hover:prose-a:text-green-900
              prose-table:text-sm
              prose-th:bg-green-50 prose-th:text-green-900 prose-th:font-semibold
              prose-td:text-slate-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-slate-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-green-50 border-t border-green-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-3">
            Need Septic Service in Texas?
          </h2>
          <p className="text-slate-600 mb-6">
            Licensed, local septic professionals ready to help — from routine
            pump-outs to emergency service. Fast response, fair pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+19362922926"
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
            >
              Call (936) 292-2926
            </a>
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
