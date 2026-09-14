import type { Metadata } from "next";
import { Download, DollarSign, CheckCircle, XCircle, Clock } from "lucide-react";
import { MOCK_PAYMENTS } from "@/lib/mock-data";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Payments & Reconciliation" };

export default function AdminPaymentsPage() {
  const total = MOCK_PAYMENTS.filter((p) => p.status === "succeeded").reduce((s, p) => s + p.amount, 0);
  const govTotal = MOCK_PAYMENTS.filter((p) => p.type === "government_fee" && p.status === "succeeded").reduce((s, p) => s + p.amount, 0);
  const svcTotal = MOCK_PAYMENTS.filter((p) => p.type === "service_fee" && p.status === "succeeded").reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Payments &amp; Reconciliation</h1>
          <p className="text-slate-500 text-sm mt-0.5">{MOCK_PAYMENTS.length} transactions on record.</p>
        </div>
        <Button variant="secondary" size="sm"><Download size={14} /> Export</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        {[
          { label: "Total Collected", value: formatCurrency(total, "EUR"), icon: DollarSign, color: "bg-green-50 text-green-600" },
          { label: "Gov. Fees Facilitated", value: formatCurrency(govTotal, "EUR"), icon: CheckCircle, color: "bg-brand-50 text-brand-600" },
          { label: "Avensa Service Revenue", value: formatCurrency(svcTotal, "EUR"), icon: DollarSign, color: "bg-purple-50 text-purple-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="p-5 flex items-center gap-4">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${color}`}>
              <Icon size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">{label}</p>
              <p className="text-xl font-bold text-slate-900">{value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">All Transactions</h2>
            <p className="text-xs text-slate-400">Payments are processed via Stripe with idempotency keys</p>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Applicant</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Provider</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PAYMENTS.map((p) => (
                <tr key={p.id}>
                  <td className="font-mono text-xs">{p.invoiceNumber}</td>
                  <td className="text-xs text-slate-600">{p.applicantId}</td>
                  <td className="text-xs text-slate-600 max-w-[160px] truncate">{p.description}</td>
                  <td>
                    <Badge variant={p.type === "government_fee" ? "blue" : "purple"}>
                      {p.type === "government_fee" ? "Gov" : "Service"}
                    </Badge>
                  </td>
                  <td className="font-semibold text-slate-900">{formatCurrency(p.amount, p.currency)}</td>
                  <td className="text-xs text-slate-500">{p.provider}</td>
                  <td className="text-xs text-slate-500">{formatDate(p.createdAt)}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      {p.status === "succeeded"
                        ? <CheckCircle size={13} className="text-green-500" />
                        : p.status === "failed"
                        ? <XCircle size={13} className="text-red-500" />
                        : <Clock size={13} className="text-amber-500" />}
                      <Badge variant={p.status === "succeeded" ? "green" : p.status === "failed" ? "red" : "yellow"}>
                        {p.status}
                      </Badge>
                    </div>
                  </td>
                  <td>
                    <Button variant="ghost" size="sm"><Download size={13} /></Button>
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
