import type { Metadata } from "next";
import Link from "next/link";
import { Search, BookOpen, ChevronRight } from "lucide-react";
import { MOCK_ARTICLES, MOCK_FAQS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = { title: "Knowledge Base – Immigration Guides & FAQs" };

const faqCategories = [...new Set(MOCK_FAQS.map((f) => f.category))];

export default function KnowledgeBasePage() {
  const articles = MOCK_ARTICLES.filter((a) => a.status === "published");
  const faqs = MOCK_FAQS.filter((f) => f.status === "active");

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="gradient-hero py-14">
        <div className="page-container">
          <Breadcrumb items={[{ label: "Knowledge Base" }]} className="text-blue-200 mb-4" />
          <h1 className="text-4xl font-extrabold text-white font-heading">Knowledge Base</h1>
          <p className="mt-3 text-blue-200 max-w-xl">Immigration guides, news updates and answers to common questions.</p>
        </div>
      </div>

      <div className="page-container py-10">
        {/* Articles */}
        <section className="mb-14">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Immigration Guides & News</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link key={article.id} href={`/knowledge-base/${article.slug}`}>
                <Card hover className="h-full flex flex-col p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400">{formatDate(article.publishedAt)}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 leading-snug flex-1">{article.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 line-clamp-3">{article.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand-600">
                    <BookOpen size={12} /> Read article
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section id="faq">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {faqCategories.map((cat) => {
              const catFaqs = faqs.filter((f) => f.category === cat);
              return (
                <div key={cat}>
                  <h3 className="font-semibold text-brand-700 text-sm uppercase tracking-wide mb-4">{cat}</h3>
                  <div className="space-y-3">
                    {catFaqs.map((faq) => (
                      <details key={faq.id} className="group rounded-xl border border-slate-200 bg-white">
                        <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-800 hover:text-brand-700">
                          {faq.question}
                          <ChevronRight size={14} className="text-slate-400 transition-transform group-open:rotate-90 shrink-0 ml-2" />
                        </summary>
                        <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-600 leading-relaxed">
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
