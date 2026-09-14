import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Eye } from "lucide-react";
import { IMMIGRATION_ROUTES, COUNTRIES, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/constants";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Route Management" };

export default function AdminRoutesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Immigration Routes</h1>
          <p className="text-slate-500 text-sm mt-0.5">{IMMIGRATION_ROUTES.length} routes configured</p>
        </div>
        <Button size="sm"><Plus size={15} /> Add Route</Button>
      </div>

      <Card>
        <CardBody className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Route</th>
                <th>Country</th>
                <th>Category</th>
                <th>Processing</th>
                <th>Version</th>
                <th>Eff. From</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {IMMIGRATION_ROUTES.map((route) => {
                const country = COUNTRIES.find((c) => c.id === route.countryId);
                return (
                  <tr key={route.id}>
                    <td>
                      <p className="font-semibold text-slate-800">{route.name}</p>
                      <p className="text-xs text-slate-400 font-mono">{route.id}</p>
                    </td>
                    <td>
                      {country && (
                        <div className="flex items-center gap-2">
                          <Image src={country.flagUrl} alt={country.name} width={20} height={14} className="rounded shadow-sm object-cover" />
                          <span className="text-sm">{country.name}</span>
                        </div>
                      )}
                    </td>
                    <td>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[route.category]}`}>
                        {CATEGORY_LABELS[route.category]}
                      </span>
                    </td>
                    <td className="text-xs text-slate-600">{route.processingTime}</td>
                    <td><Badge variant="blue">{route.version}</Badge></td>
                    <td className="text-xs text-slate-500">{formatDate(route.effectiveFrom)}</td>
                    <td>
                      <Badge variant={route.status === "active" ? "green" : route.status === "draft" ? "yellow" : "slate"}>
                        {route.status}
                      </Badge>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <Link href={`/routes/${route.slug}`} target="_blank">
                          <Button variant="ghost" size="sm"><Eye size={13} /></Button>
                        </Link>
                        <Button variant="ghost" size="sm"><Edit size={13} /></Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
