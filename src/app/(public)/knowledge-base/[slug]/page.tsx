import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag, ExternalLink } from "lucide-react";
import { MOCK_ARTICLES } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return MOCK_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = MOCK_ARTICLES.find((a) => a.slug === params.slug);
  return { title: article?.title ?? "Article Not Found" };
}

export default function ArticlePage({ params }: Props) {
  const article = MOCK_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const related = MOCK_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="gradient-hero py-12">
        <div className="page-container max-w-3xl">
          <Breadcrumb
            items={[{ label: "Knowledge Base", href: "/knowledge-base" }, { label: article.title }]}
            className="text-blue-200 mb-4"
          />
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-blue-100 mb-3">
            {article.category}
          </span>
          <h1 className="text-3xl font-extrabold text-white font-heading leading-snug">{article.title}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-blue-200">
            <span className="flex items-center gap-1.5"><User size={13} />{article.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} />{formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </div>

      <div className="page-container py-10 max-w-3xl">
        <Disclaimer className="mb-8" />

        <article className="prose prose-slate max-w-none">
          {article.content.split("\n\n").map((para, i) => (
            <p key={i} className="mb-4 text-slate-700 leading-relaxed text-sm">{para}</p>
          ))}
        </article>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <h3 className="font-semibold text-slate-900 mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((rel) => (
              <Link key={rel.id} href={`/knowledge-base/${rel.slug}`}>
                <Card hover className="p-4">
                  <span className="text-xs text-brand-600 font-medium">{rel.category}</span>
                  <p className="mt-1 text-sm font-semibold text-slate-800 line-clamp-2">{rel.title}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link href="/knowledge-base">
            <Button variant="secondary" size="sm"><ArrowLeft size={14} /> Back to Knowledge Base</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
