import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Calendar, ArrowRight, ArrowUpRight, Newspaper } from "lucide-react";
import { MOCK_ARTICLES } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = { title: "Immigration News & Updates" };

const accentColors = [
  { bar: "#0d1b4b", tag: "bg-[rgba(13,27,75,0.07)] border-[rgba(13,27,75,0.18)] text-[#0d1b4b]" },
  { bar: "#F5A623", tag: "bg-amber-50 border-amber-100 text-amber-700"                          },
  { bar: "#fcd34d", tag: "bg-amber-50 border-amber-100 text-amber-700"                          },
  { bar: "#1a2b6b", tag: "bg-[rgba(26,43,107,0.07)] border-[rgba(26,43,107,0.18)] text-[#1a2b6b]" },
  { bar: "#0d1b4b", tag: "bg-[rgba(13,27,75,0.07)] border-[rgba(13,27,75,0.18)] text-[#0d1b4b]" },
  { bar: "#F5A623", tag: "bg-amber-50 border-amber-100 text-amber-700"                          },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>

      {/* ── Hero ── */}
      <div className="gradient-hero py-20">
        <div className="relative z-10 page-container">
          <Breadcrumb items={[{ label: "News" }]} className="text-white/50 mb-6" />
          <div className="section-eyebrow mb-5">
            <Newspaper size={11} />
            Updates
          </div>
          <h1
            className="text-4xl lg:text-6xl font-bold text-white leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Immigration News &{" "}
            <span className="text-gradient-hero">Updates</span>
          </h1>
          <p
            className="mt-5 text-base text-white/50 max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Stay informed about the latest changes to EU immigration rules, visa policies, and processing times.
          </p>
        </div>
      </div>

      {/* ── Article grid ── */}
      <div className="page-container py-14">
        {MOCK_ARTICLES.length === 0 ? (
          <div className="text-center py-20">
            <FileText size={40} className="mx-auto text-slate-300 mb-4" />
            <p className="text-lg font-semibold text-slate-500" style={{ fontFamily: "var(--font-syne)" }}>No articles yet</p>
            <p className="text-sm text-slate-400 mt-1" style={{ fontFamily: "var(--font-outfit)" }}>Check back soon for the latest immigration updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_ARTICLES.map((article, i) => {
              const acc = accentColors[i % accentColors.length];
              return (
                <Link
                  key={article.id}
                  href={`/knowledge-base/${article.slug}`}
                  className="group block animate-fade-up"
                  style={{ animationDelay: `${i * 0.06}s`, animationFillMode: "both" }}
                >
                  <div className="relative flex flex-col h-full rounded-3xl bg-white border border-slate-200/70 shadow-card overflow-hidden transition-all duration-500 group-hover:-translate-y-2.5 group-hover:shadow-card-hover group-hover:border-[rgba(245,166,35,0.35)]">

                    {/* Top colour bar */}
                    <div className="h-[3px] w-full transition-all duration-500 group-hover:h-[4px]"
                      style={{ background: acc.bar }} />

                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(ellipse at 50% -20%,rgba(13,27,75,0.04),transparent 60%)" }} />

                    <div className="relative p-6 flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${acc.tag}`}
                          style={{ fontFamily: "var(--font-outfit)" }}
                        >
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] text-slate-400"
                          style={{ fontFamily: "var(--font-outfit)" }}>
                          <Calendar size={11} />
                          {formatDate(article.publishedAt)}
                        </span>
                      </div>

                      <h3
                        className="font-bold text-ink leading-snug group-hover:text-[#0d1b4b] transition-colors"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {article.title}
                      </h3>

                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3"
                        style={{ fontFamily: "var(--font-outfit)" }}>
                        {article.excerpt}
                      </p>

                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500"
                              style={{ fontFamily: "var(--font-outfit)" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="relative px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all duration-300"
                        style={{ fontFamily: "var(--font-outfit)", color: "#0d1b4b" }}>
                        Read more <ArrowRight size={12} />
                      </span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#F5A623" }} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
