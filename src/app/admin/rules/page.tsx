import type { Metadata } from "next";
import { Plus, AlertTriangle, CheckCircle, Edit, Eye } from "lucide-react";
import { IMMIGRATION_ROUTES, COUNTRIES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Disclaimer } from "@/components/ui/Disclaimer";

export const metadata: Metadata = { title: "Rules Engine" };

// Sample rule definitions for display
const SAMPLE_RULES = [
  {
    id: "rule-001", routeId: "de-skilled-worker", criterionName: "Recognised Qualification",
    condition: "required", value: "bachelor|master|phd|vocational",
    required: true, effectiveFrom: "2024-01-01", version: "2024.1",
    sourceUrl: "https://www.make-it-in-germany.com", status: "active",
  },
  {
    id: "rule-002", routeId: "de-skilled-worker", criterionName: "Job Offer",
    condition: "equals", value: "yes",
    required: true, effectiveFrom: "2024-01-01", version: "2024.1",
    sourceUrl: "https://www.make-it-in-germany.com", status: "active",
  },
  {
    id: "rule-003", routeId: "de-eu-blue-card", criterionName: "University Degree",
    condition: "required", value: "bachelor|master|phd",
    required: true, effectiveFrom: "2024-01-01", version: "2024.1",
    sourceUrl: "https://www.bamf.de", status: "active",
  },
  {
    id: "rule-004", routeId: "de-eu-blue-card", criterionName: "Annual Salary ≥ €41,041",
    condition: "gte", value: "41041",
    required: true, effectiveFrom: "2024-01-01", version: "2024.1",
    sourceUrl: "https://www.bamf.de", status: "active",
  },
  {
    id: "rule-005", routeId: "nl-highly-skilled", criterionName: "Recognised Sponsor",
    condition: "required", value: "yes",
    required: true, effectiveFrom: "2024-01-01", version: "2024.1",
    sourceUrl: "https://ind.nl", status: "active",
  },
  {
    id: "rule-006", routeId: "es-digital-nomad", criterionName: "Monthly Income ≥ €2,646",
    condition: "gte", value: "2646",
    required: true, effectiveFrom: "2023-01-01", version: "2024.1",
    sourceUrl: "https://extranjeros.inclusion.gob.es", status: "active",
  },
];

export default function RulesPage() {
  const routes = IMMIGRATION_ROUTES;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Rules Engine</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Configure eligibility rules per immigration route. All changes require approval and are versioned.
          </p>
        </div>
        <Button size="sm"><Plus size={15} /> Add Rule</Button>
      </div>

      <Disclaimer
        text="Rules changes affect eligibility assessments shown to applicants. All published rules must have a source URL, effective date, and version. Changes require approval. Historical rule snapshots are preserved with each application."
        className="mb-6"
      />

      {/* Rule stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Active Rules", value: SAMPLE_RULES.filter((r) => r.status === "active").length, color: "text-green-600" },
          { label: "Routes Covered", value: routes.length, color: "text-brand-600" },
          { label: "Pending Review", value: 0, color: "text-amber-600" },
        ].map(({ label, value, color }) => (
          <Card key={label} className="p-4 text-center">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </Card>
        ))}
      </div>

      {/* Rules by route */}
      {routes.map((route) => {
        const routeRules = SAMPLE_RULES.filter((r) => r.routeId === route.id);
        if (routeRules.length === 0) return null;
        const country = COUNTRIES.find((c) => c.id === route.countryId);
        return (
          <Card key={route.id} className="mb-5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{route.name}</p>
                  <p className="text-xs text-slate-400">{country?.name} · Version {route.version} · Effective {formatDate(route.effectiveFrom)}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="blue">v{route.version}</Badge>
                  <Button variant="secondary" size="sm"><Plus size={13} /> Add Rule</Button>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th>Criterion</th>
                    <th>Condition</th>
                    <th>Value</th>
                    <th>Required</th>
                    <th>Source</th>
                    <th>Eff. From</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {routeRules.map((rule) => (
                    <tr key={rule.id}>
                      <td className="font-medium text-slate-800">{rule.criterionName}</td>
                      <td>
                        <Badge variant="slate">{rule.condition}</Badge>
                      </td>
                      <td className="font-mono text-xs text-slate-600 max-w-[120px] truncate">{String(rule.value)}</td>
                      <td>
                        {rule.required
                          ? <CheckCircle size={14} className="text-green-500" />
                          : <span className="text-xs text-slate-400">Optional</span>}
                      </td>
                      <td>
                        <a href={rule.sourceUrl} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-brand-600 hover:underline truncate max-w-[100px] block">
                          Official Source
                        </a>
                      </td>
                      <td className="text-xs text-slate-500">{formatDate(rule.effectiveFrom)}</td>
                      <td>
                        <Badge variant={rule.status === "active" ? "green" : "yellow"}>{rule.status}</Badge>
                      </td>
                      <td>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm"><Edit size={13} /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
