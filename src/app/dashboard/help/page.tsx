import type { Metadata } from "next";
import Link from "next/link";
import { Mail, BookOpen, Calculator, FileText, ChevronRight, MessageCircle } from "lucide-react";
import { MOCK_FAQS } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = { title: "Help & Support" };

const helpTopics = [
  { icon: FileText, title: "How to start an application", href: "/dashboard/applications/new", desc: "Step-by-step guide through the 10-step application wizard." },
  { icon: BookOpen, title: "Understanding eligibility results", href: "/eligibility", desc: "What the eligibility checker shows and what it means for you." },
  { icon: Calculator, title: "Schengen 90/180 day rule", href: "/calculator", desc: "Use our calculator to track your short-stay days accurately." },
  { icon: BookOpen, title: "Document requirements", href: "/knowledge-base", desc: "Find out which documents are required for your route." },
];

export default function HelpPage() {
  const faqs = MOCK_FAQS.filter((f) => f.status === "active").slice(0, 6);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 font-heading">Help &amp; Support</h1>
        <p className="text-slate-500 text-sm mt-0.5">Find answers or get in touch with our support team.</p>
      </div>

      {/* Quick help */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8">
        {helpTopics.map(({ icon: Icon, title, href, desc }) => (
          <Link key={title} href={href}>
            <Card hover className="p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-brand-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
              </div>
              <ChevronRight size={15} className="text-slate-400 ml-auto shrink-0 mt-0.5" />
            </Card>
          </Link>
        ))}
      </div>

      {/* FAQs */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.id} className="group rounded-xl border border-slate-200 bg-white">
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-slate-800 hover:text-brand-700 transition-colors">
                {faq.question}
                <ChevronRight size={15} className="text-slate-400 transition-transform group-open:rotate-90 shrink-0 ml-3" />
              </summary>
              <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
        <Link href="/knowledge-base#faq" className="mt-4 inline-block">
          <Button variant="secondary" size="sm">View All FAQs <ChevronRight size={13} /></Button>
        </Link>
      </div>

      {/* Contact */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="h-12 w-12 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
            <MessageCircle size={22} className="text-brand-600" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-900">Still need help?</p>
            <p className="text-sm text-slate-500 mt-0.5">
              Our support team is available Mon–Fri, 09:00–18:00 GMT. We typically respond within 1 business day.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href={`mailto:${COMPANY.email}`}>
              <Button variant="secondary" size="sm">
                <Mail size={14} /> Email Support
              </Button>
            </a>
            <Link href="/contact">
              <Button size="sm">Contact Form</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
