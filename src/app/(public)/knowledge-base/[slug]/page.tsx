import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag, ArrowUpRight } from "lucide-react";
import { MOCK_ARTICLES } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Button } from "@/components/ui/Button";

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return MOCK_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = MOCK_ARTICLES.find((a) => a.slug === params.slug);
  return { title: article?.title ?? "Article Not Found" };
}

const accentBars = ["#6366f1","#7c3aed","#f59e0b","#10b981"];

export default function ArticlePage({ params }: Props) {
  const article = MOCK_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const related = MOCK_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>

      {/* ── Hero ── */}
      <div className="gradient-hero py-20">
        <div className="relative z-10 page-container max-w-3xl">
          <Breadcrumb
            items={[{ label: "Knowledge Base", href: "/knowledge-base" }, { label: article.title }]}
            className="text-white/50 mb-6"
          />
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}>
            {article.category}
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-syne)" }}>
            {article.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-5 text-sm text-white/50">
            <span className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-outfit)" }}>
              <User size={13} className="text-indigo-400" />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-outfit)" }}>
              <Calendar size={13} className="text-indigo-400" />
              {formatDate(article.publishedAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="page-container py-12 max-w-3xl space-y-8">
        <Disclaimer />

        {/* Article body */}
        <div className="rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden">
          <div className="h-[4px]" style={{ background: "linear-gradient(90deg, #6366f1, #7c3aed, #f59e0b)" }} />
          <div className="px-8 py-8">
            <article>
              {article.content.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="mb-5 text-slate-600 leading-relaxed text-base"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {para}
                </p>
              ))}
            </article>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div>
            <h3 className="font-bold text-ink mb-5" style={{ fontFamily: "var(--font-syne)" }}>Related Articles</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((rel, i) => (
                <Link key={rel.id} href={`/knowledge-base/${rel.slug}`} className="group block">
                  <div className="relative flex flex-col h-full rounded-2xl bg-white border border-slate-200/70 shadow-card overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-card-hover group-hover:border-indigo-300/50">
                    <div className="h-[3px]" style={{ background: accentBars[i % accentBars.length] }} />
                    <div className="p-4 flex-1">
                      <span className="text-[11px] font-semibold text-indigo-600" style={{ fontFamily: "var(--font-outfit)" }}>
                        {rel.category}
                      </span>
                      <p className="mt-1.5 text-sm font-bold text-ink group-hover:text-indigo-700 transition-colors line-clamp-2"
                        style={{ fontFamily: "var(--font-syne)" }}>
                        {rel.title}
                      </p>
                    </div>
                    <div className="px-4 pb-4 flex justify-end">
                      <ArrowUpRight size={13} className="text-indigo-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div>
          <Link href="/knowledge-base">
            <Button variant="secondary" size="sm">
              <ArrowLeft size={14} /> Back to Knowledge Base
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
