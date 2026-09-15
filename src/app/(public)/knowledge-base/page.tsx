import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ChevronRight, Search, ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import { MOCK_ARTICLES, MOCK_FAQS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = { title: "Knowledge Base – Immigration Guides & FAQs" };

const faqCategories = [...new Set(MOCK_FAQS.map((f) => f.category))];

const accentColors = [
  { bar: "#6366f1", tag: "bg-indigo-50 border-indigo-100 text-indigo-600" },
  { bar: "#7c3aed", tag: "bg-violet-50 border-violet-100 text-violet-600" },
  { bar: "#f59e0b", tag: "bg-amber-50 border-amber-100 text-amber-600"   },
  { bar: "#10b981", tag: "bg-emerald-50 border-emerald-100 text-emerald-600" },
];

export default function KnowledgeBasePage() {
  const articles = MOCK_ARTICLES.filter((a) => a.status === "published");
  const faqs     = MOCK_FAQS.filter((f) => f.status === "active");

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>

      {/* ── Hero ── */}
      <div className="gradient-hero py-20">
        <div className="relative z-10 page-container">
          <Breadcrumb items={[{ label: "Knowledge Base" }]} className="text-white/50 mb-6" />
          <div className="section-eyebrow mb-5">
            <BookOpen size={11} />
            Resources
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-syne)" }}>
            Immigration Guides{" "}
            <span className="text-gradient-hero">&amp; FAQs</span>
          </h1>
          <p className="mt-5 text-base text-white/50 max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-outfit)" }}>
            Deep-dive guides, news updates, and plain-English answers to common immigration questions.
          </p>
        </div>
      </div>

      <div className="page-container py-14">

        {/* ── Articles ── */}
        <section className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="section-eyebrow mb-3">
                <BookOpen size={11} />
                Guides
              </div>
              <h2 className="text-2xl font-bold text-ink" style={{ fontFamily: "var(--font-syne)" }}>
                Immigration Guides &amp; News
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => {
              const acc = accentColors[i % accentColors.length];
              return (
                <Link
                  key={article.id}
                  href={`/knowledge-base/${article.slug}`}
                  className="group block animate-fade-up"
                  style={{ animationDelay: `${i * 0.06}s`, animationFillMode: "both" }}
                >
                  <div className="relative flex flex-col h-full rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden transition-all duration-500 group-hover:-translate-y-2.5 group-hover:shadow-card-hover group-hover:border-indigo-300/50">
                    <div className="h-[3px] w-full" style={{ background: acc.bar }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(ellipse at 50% -20%,rgba(79,70,229,0.04),transparent 60%)" }} />

                    <div className="relative p-6 flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${acc.tag}`}
                          style={{ fontFamily: "var(--font-outfit)" }}>
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] text-slate-400"
                          style={{ fontFamily: "var(--font-outfit)" }}>
                          <Calendar size={11} />
                          {formatDate(article.publishedAt)}
                        </span>
                      </div>
                      <h3 className="font-bold text-ink leading-snug group-hover:text-indigo-700 transition-colors"
                        style={{ fontFamily: "var(--font-syne)" }}>
                        {article.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3"
                        style={{ fontFamily: "var(--font-outfit)" }}>
                        {article.excerpt}
                      </p>
                      {article.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500"
                              style={{ fontFamily: "var(--font-outfit)" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="relative px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 group-hover:gap-2.5 transition-all"
                        style={{ fontFamily: "var(--font-outfit)" }}>
                        <BookOpen size={12} /> Read article
                      </span>
                      <ArrowUpRight size={12} className="text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── FAQs ── */}
        <section id="faq">
          <div className="mb-10">
            <div className="section-eyebrow mb-3">
              <Search size={11} />
              FAQ
            </div>
            <h2 className="text-2xl font-bold text-ink" style={{ fontFamily: "var(--font-syne)" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {faqCategories.map((cat) => {
              const catFaqs = faqs.filter((f) => f.category === cat);
              return (
                <div key={cat}>
                  <h3 className="font-bold text-indigo-600 text-xs uppercase tracking-[0.14em] mb-4"
                    style={{ fontFamily: "var(--font-outfit)" }}>
                    {cat}
                  </h3>
                  <div className="space-y-2.5">
                    {catFaqs.map((faq) => (
                      <details
                        key={faq.id}
                        className="group rounded-2xl border border-slate-200/80 bg-white shadow-card overflow-hidden transition-all duration-300 hover:border-indigo-300/50 open:border-indigo-300/60 open:shadow-card-glow"
                      >
                        <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-ink hover:text-indigo-700 transition-colors list-none select-none"
                          style={{ fontFamily: "var(--font-outfit)" }}>
                          {faq.question}
                          <ChevronRight size={13} className="text-slate-300 transition-transform duration-300 group-open:rotate-90 group-open:text-indigo-400 shrink-0 ml-2" />
                        </summary>
                        <div className="border-t border-slate-100 bg-indigo-50/40 px-5 py-4 text-sm text-slate-500 leading-relaxed"
                          style={{ fontFamily: "var(--font-outfit)" }}>
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
