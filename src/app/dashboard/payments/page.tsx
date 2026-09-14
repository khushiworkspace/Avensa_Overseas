import type { Metadata } from "next";
import { CreditCard, Download, CheckCircle, Clock, XCircle } from "lucide-react";
import { MOCK_PAYMENTS } from "@/lib/mock-data";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Payments" };

const statusColor: Record<string, "green" | "yellow" | "red" | "blue" | "slate"> = {
  succeeded: "green", pending: "yellow", failed: "red",
  processing: "blue", refunded: "slate", partially_refunded: "yellow",
};

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "succeeded") return <CheckCircle size={15} className="text-green-500" />;
  if (status === "failed") return <XCircle size={15} className="text-red-500" />;
  return <Clock size={15} className="text-amber-500" />;
};

export default function PaymentsPage() {
  const payments = MOCK_PAYMENTS.filter((p) => p.applicantId === "u1");
  const totalPaid = payments.filter((p) => p.status === "succeeded").reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 font-heading">Payments</h1>
        <p className="text-slate-500 text-sm mt-0.5">{payments.length} transactions</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        {[
          { label: "Total Paid", value: formatCurrency(totalPaid, "EUR"), icon: CheckCircle, color: "text-green-600 bg-green-50" },
          { label: "Transactions", value: payments.length, icon: CreditCard, color: "text-brand-600 bg-brand-50" },
          { label: "Pending", value: payments.filter(p => p.status === "pending").length, icon: Clock, color: "text-amber-600 bg-amber-50" },
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

      {payments.length === 0 ? (
        <EmptyState icon={CreditCard} title="No payments yet" description="Payment records will appear here once you make a transaction." />
      ) : (
        <Card>
          <CardHeader><h2 className="font-semibold text-slate-900">Transaction History</h2></CardHeader>
          <CardBody className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td className="font-mono text-xs">{p.invoiceNumber}</td>
                    <td className="max-w-[200px]">
                      <p className="truncate font-medium text-slate-700">{p.description}</p>
                      {p.transactionId && (
                        <p className="text-xs text-slate-400 font-mono">{p.transactionId}</p>
                      )}
                    </td>
                    <td>
                      <Badge variant={p.type === "government_fee" ? "blue" : "purple"}>
                        {p.type === "government_fee" ? "Gov. Fee" : "Service Fee"}
                      </Badge>
                    </td>
                    <td className="text-xs text-slate-500">{formatDate(p.createdAt)}</td>
                    <td className="font-semibold text-slate-900">{formatCurrency(p.amount, p.currency)}</td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <StatusIcon status={p.status} />
                        <Badge variant={statusColor[p.status] ?? "slate"}>{p.status}</Badge>
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
      )}

      <p className="mt-4 text-xs text-slate-400">
        Government fees are paid directly to the relevant national authority. Avensa Overseas service fees cover platform and processing support. All payments are processed securely via Stripe with idempotency protection.
      </p>
    </div>
  );
}
