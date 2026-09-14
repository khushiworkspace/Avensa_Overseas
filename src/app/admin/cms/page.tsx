import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Edit, Eye, Archive } from "lucide-react";
import { MOCK_ARTICLES, MOCK_FAQS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "CMS / Content Management" };

export default function CMSPage() {
  const published = MOCK_ARTICLES.filter((a) => a.status === "published");
  const drafts = MOCK_ARTICLES.filter((a) => a.status === "draft");
  const activeFaqs = MOCK_FAQS.filter((f) => f.status === "active");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 font-heading">CMS / Content</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Manage articles, FAQs, pages and immigration content without a deployment.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Published Articles", value: published.length, color: "text-green-600" },
          { label: "Draft Articles", value: drafts.length, color: "text-amber-600" },
          { label: "Active FAQs", value: activeFaqs.length, color: "text-brand-600" },
        ].map(({ label, value, color }) => (
          <Card key={label} className="p-4 text-center">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </Card>
        ))}
      </div>

      {/* Articles */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Articles &amp; News</h2>
            <Button size="sm"><Plus size={14} /> New Article</Button>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Published</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ARTICLES.map((article) => (
                <tr key={article.id}>
                  <td>
                    <p className="font-medium text-slate-800 max-w-[250px] truncate">{article.title}</p>
                    <p className="text-xs text-slate-400 font-mono">{article.slug}</p>
                  </td>
                  <td>
                    <Badge variant="blue">{article.category}</Badge>
                  </td>
                  <td className="text-xs text-slate-600">{article.author}</td>
                  <td className="text-xs text-slate-500">{formatDate(article.publishedAt)}</td>
                  <td>
                    <Badge variant={article.status === "published" ? "green" : article.status === "draft" ? "yellow" : "slate"}>
                      {article.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <Link href={`/knowledge-base/${article.slug}`} target="_blank">
                        <Button variant="ghost" size="sm"><Eye size={13} /></Button>
                      </Link>
                      <Button variant="ghost" size="sm"><Edit size={13} /></Button>
                      <Button variant="ghost" size="sm" className="text-slate-400">
                        <Archive size={13} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">FAQs</h2>
            <Button size="sm"><Plus size={14} /> New FAQ</Button>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Question</th>
                <th>Category</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_FAQS.map((faq) => (
                <tr key={faq.id}>
                  <td className="max-w-[300px]">
                    <p className="font-medium text-slate-800 truncate">{faq.question}</p>
                  </td>
                  <td><Badge variant="slate">{faq.category}</Badge></td>
                  <td className="text-slate-600 text-center">{faq.order}</td>
                  <td>
                    <Badge variant={faq.status === "active" ? "green" : "slate"}>{faq.status}</Badge>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm"><Edit size={13} /></Button>
                      <Button variant="ghost" size="sm" className="text-slate-400">
                        <Archive size={13} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
