import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="gradient-hero py-14">
        <div className="page-container">
          <Breadcrumb items={[{ label: "Contact" }]} className="text-blue-200 mb-4" />
          <h1 className="text-4xl font-extrabold text-white font-heading">Contact & Support</h1>
          <p className="mt-3 text-blue-200 max-w-xl">
            Questions about our platform or your application? Our support team is here to help.
          </p>
        </div>
      </div>

      <div className="page-container py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Contact info */}
          <div className="space-y-5">
            {[
              { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
              { icon: Phone, label: "Phone", value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
              { icon: MapPin, label: "Address", value: COMPANY.address },
              { icon: Clock, label: "Support Hours", value: "Mon–Fri, 09:00–18:00 GMT" },
            ].map(({ icon: Icon, label, value, href }) => (
              <Card key={label} className="p-5">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-brand-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-semibold text-brand-600 hover:text-brand-800">{value}</a>
                    ) : (
                      <p className="text-sm font-semibold text-slate-800">{value}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-5 bg-amber-50 border-amber-200">
              <p className="text-xs font-semibold text-amber-700 mb-1">Important Note</p>
              <p className="text-xs text-amber-600 leading-relaxed">
                Avensa Overseas provides platform support and informational guidance. We do not provide legal immigration advice. For legal advice, please consult a qualified immigration lawyer.
              </p>
            </Card>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-5">Send Us a Message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input label="First Name" placeholder="Your first name" required />
                  <Input label="Last Name" placeholder="Your last name" required />
                </div>
                <Input label="Email Address" type="email" placeholder="your@email.com" required />
                <div>
                  <label className="form-label">Subject</label>
                  <select className="form-input">
                    <option value="">Select a subject</option>
                    <option>Account & Registration</option>
                    <option>Application Support</option>
                    <option>Document Upload Issue</option>
                    <option>Eligibility Checker</option>
                    <option>Payment Query</option>
                    <option>Technical Issue</option>
                    <option>General Enquiry</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    className="form-input resize-none"
                    placeholder="Describe your query or issue in detail..."
                  />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
