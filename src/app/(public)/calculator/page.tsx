"use client";

import { useState } from "react";
import { Plus, Trash2, Calculator, AlertTriangle, Info } from "lucide-react";
import { COUNTRIES } from "@/lib/constants";
import { calculateSchengenDays, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Disclaimer } from "@/components/ui/Disclaimer";
import type { StayPeriod } from "@/types";

let idCounter = 0;

const schengenCountries = COUNTRIES.filter((c) => c.schengen).map((c) => ({ value: c.id, label: c.name }));

export default function CalculatorPage() {
  const [stays, setStays] = useState<StayPeriod[]>([]);
  const [newEntry, setNewEntry] = useState({ country: "", entryDate: "", exitDate: "" });
  const [result, setResult] = useState<null | { daysUsed: number; daysRemaining: number }>(null);
  const [entryError, setEntryError] = useState("");

  function addStay() {
    if (!newEntry.country || !newEntry.entryDate || !newEntry.exitDate) {
      setEntryError("Please fill in all fields.");
      return;
    }
    if (new Date(newEntry.exitDate) < new Date(newEntry.entryDate)) {
      setEntryError("Exit date must be after entry date.");
      return;
    }
    setEntryError("");
    setStays((prev) => [
      ...prev,
      { id: String(++idCounter), ...newEntry },
    ]);
    setNewEntry({ country: "", entryDate: "", exitDate: "" });
    setResult(null);
  }

  function removeStay(id: string) {
    setStays((prev) => prev.filter((s) => s.id !== id));
    setResult(null);
  }

  function calculate() {
    const r = calculateSchengenDays(stays);
    setResult(r);
  }

  const pct = result ? Math.min(100, (result.daysUsed / 90) * 100) : 0;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="gradient-hero py-14">
        <div className="page-container">
          <Breadcrumb items={[{ label: "Short-Stay Calculator" }]} className="text-blue-200 mb-4" />
          <h1 className="text-4xl font-extrabold text-white font-heading">Schengen 90/180 Calculator</h1>
          <p className="mt-3 text-blue-200 max-w-xl">
            Track your Schengen Area short-stay days. Enter your previous stays to see how many days you have remaining.
          </p>
        </div>
      </div>

      <div className="page-container py-10 max-w-3xl">
        <Disclaimer className="mb-6" />

        {/* How it works */}
        <Card className="mb-6 p-5 border-l-4 border-l-brand-500">
          <div className="flex gap-3">
            <Info size={18} className="text-brand-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-800 mb-1">How the 90/180 Rule Works</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                You may stay in the Schengen Area for a maximum of <strong>90 days within any rolling 180-day window</strong>.
                This window moves daily — for any date, look back 180 days and count how many of those days you spent in the Schengen Area.
                All Schengen countries count together, not per country.
              </p>
            </div>
          </div>
        </Card>

        {/* Add stay */}
        <Card className="mb-6">
          <CardHeader><h2 className="font-semibold text-slate-900">Add a Previous Stay</h2></CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Select
                label="Country"
                options={schengenCountries}
                placeholder="Select country"
                value={newEntry.country}
                onChange={(e) => setNewEntry((p) => ({ ...p, country: e.target.value }))}
              />
              <Input
                label="Entry Date"
                type="date"
                value={newEntry.entryDate}
                onChange={(e) => setNewEntry((p) => ({ ...p, entryDate: e.target.value }))}
              />
              <Input
                label="Exit Date"
                type="date"
                value={newEntry.exitDate}
                onChange={(e) => setNewEntry((p) => ({ ...p, exitDate: e.target.value }))}
              />
            </div>
            {entryError && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <AlertTriangle size={13} /> {entryError}
              </p>
            )}
            <Button className="mt-4" onClick={addStay} variant="secondary" size="sm">
              <Plus size={15} /> Add Stay
            </Button>
          </CardBody>
        </Card>

        {/* Stays list */}
        {stays.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-900">Your Stays ({stays.length})</h2>
                <Button variant="danger" size="sm" onClick={() => { setStays([]); setResult(null); }}>
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 bg-slate-50">Country</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 bg-slate-50">Entry</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 bg-slate-50">Exit</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 bg-slate-50">Days</th>
                    <th className="bg-slate-50" />
                  </tr>
                </thead>
                <tbody>
                  {stays.map((stay) => {
                    const country = COUNTRIES.find((c) => c.id === stay.country);
                    const days = Math.max(0,
                      Math.floor((new Date(stay.exitDate).getTime() - new Date(stay.entryDate).getTime()) / 86400000) + 1
                    );
                    return (
                      <tr key={stay.id} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-5 py-3 text-slate-700 font-medium">{country?.name ?? stay.country}</td>
                        <td className="px-5 py-3 text-slate-600">{formatDate(stay.entryDate)}</td>
                        <td className="px-5 py-3 text-slate-600">{formatDate(stay.exitDate)}</td>
                        <td className="px-5 py-3 text-slate-800 font-semibold">{days}</td>
                        <td className="px-5 py-3">
                          <button onClick={() => removeStay(stay.id)} className="text-red-400 hover:text-red-600">
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </Card>
        )}

        {/* Calculate */}
        <Button className="w-full mb-6" size="lg" onClick={calculate} disabled={stays.length === 0}>
          <Calculator size={18} /> Calculate Days
        </Button>

        {/* Result */}
        {result && (
          <Card className="border-2 border-brand-200">
            <CardHeader>
              <h2 className="font-semibold text-slate-900">Calculation Result</h2>
              <p className="text-xs text-slate-400 mt-0.5">Based on a rolling 180-day window from today</p>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div className="rounded-xl bg-slate-50 p-4 text-center">
                  <p className="text-3xl font-extrabold text-slate-900">{result.daysUsed}</p>
                  <p className="text-sm text-slate-500 mt-1">Days Used</p>
                </div>
                <div className={`rounded-xl p-4 text-center ${result.daysRemaining > 20 ? "bg-green-50" : result.daysRemaining > 0 ? "bg-amber-50" : "bg-red-50"}`}>
                  <p className={`text-3xl font-extrabold ${result.daysRemaining > 20 ? "text-green-700" : result.daysRemaining > 0 ? "text-amber-700" : "text-red-700"}`}>
                    {result.daysRemaining}
                  </p>
                  <p className={`text-sm mt-1 ${result.daysRemaining > 20 ? "text-green-600" : result.daysRemaining > 0 ? "text-amber-600" : "text-red-600"}`}>
                    Days Remaining
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                  <span>0 days</span>
                  <span className="font-medium">90 day limit</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${pct >= 100 ? "bg-red-500" : pct > 75 ? "bg-amber-500" : "bg-green-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1 text-right">{result.daysUsed}/90 days used</p>
              </div>

              {result.daysRemaining === 0 && (
                <div className="flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                  You have used your full 90-day allowance for the current 180-day window.
                </div>
              )}

              <Disclaimer className="mt-4" text="This calculator is for informational purposes only. Actual admissibility is determined by border and immigration authorities. The count assumes day of entry and day of exit each count as one day." />
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
