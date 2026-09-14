import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit, ExternalLink } from "lucide-react";
import { COUNTRIES, CATEGORY_LABELS } from "@/lib/constants";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Country Management" };

export default function AdminCountriesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Countries</h1>
          <p className="text-slate-500 text-sm mt-0.5">{COUNTRIES.length} configured countries</p>
        </div>
        <Button size="sm"><Plus size={15} /> Add Country</Button>
      </div>

      <Card>
        <CardBody className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Country</th>
                <th>Code</th>
                <th>Routes</th>
                <th>Schengen</th>
                <th>EU</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {COUNTRIES.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Image src={c.flagUrl} alt={c.name} width={28} height={20} className="rounded shadow-sm object-cover" />
                      <div>
                        <p className="font-semibold text-slate-800">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.capital}</p>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-xs font-bold text-slate-700">{c.code}</td>
                  <td>
                    <div className="flex flex-wrap gap-1 max-w-[160px]">
                      {c.supportedRoutes.map((r) => (
                        <span key={r} className="text-xs bg-slate-100 text-slate-600 rounded px-1.5 py-0.5">
                          {CATEGORY_LABELS[r]}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <Badge variant={c.schengen ? "green" : "slate"}>{c.schengen ? "Yes" : "No"}</Badge>
                  </td>
                  <td>
                    <Badge variant={c.eu ? "blue" : "slate"}>{c.eu ? "Yes" : "No"}</Badge>
                  </td>
                  <td>
                    <Badge variant={c.status === "active" ? "green" : "yellow"}>{c.status}</Badge>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm"><Edit size={13} /></Button>
                      <a href={c.officialImmigrationUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm"><ExternalLink size={13} /></Button>
                      </a>
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
