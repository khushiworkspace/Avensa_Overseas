import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Tag, ChevronRight } from "lucide-react";
import { MOCK_ARTICLES } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = { title: "Immigration News & Updates" };

export default function NewsPage() {
  const articles = MOCK_ARTICLES.filter((a) => a.status === "published").sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="gradient-hero py-14">
        <div className="page-container">
          <Breadcrumb items={[{ label: "News & Updates" }]} className="text-blue-200 mb-4" />
          <h1 className="text-4xl font-extrabold text-white font-heading">Immigration News</h1>
          <p className="mt-3 text-blue-200 max-w-xl">
            Stay up to date with the latest EU immigration rule changes, policy updates and guidance.
          </p>
        </div>
      </div>

      <div className="page-container py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.id} href={`/knowledge-base/${article.slug}`}>
              <Card hover className="h-full flex flex-col p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Calendar size={11} /> {formatDate(article.publishedAt)}
                  </span>
                </div>
                <h2 className="font-semibold text-slate-900 leading-snug flex-1">{article.title}</h2>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-3">{article.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                      <Tag size={9} /> {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand-600">
                  Read more <ChevronRight size={12} />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg font-medium">No articles published yet.</p>
            <p className="text-sm mt-1">Check back soon for immigration updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}
