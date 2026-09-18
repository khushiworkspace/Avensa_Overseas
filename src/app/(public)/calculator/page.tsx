"use client";

import { useState } from "react";
import { Plus, Trash2, Calculator, AlertTriangle, Info } from "lucide-react";
import { COUNTRIES } from "@/lib/constants";
import { calculateSchengenDays, formatDate } from "@/lib/utils";
import { Button }     from "@/components/ui/Button";
import { Input }      from "@/components/ui/Input";
import { Select }     from "@/components/ui/Select";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Disclaimer } from "@/components/ui/Disclaimer";
import type { StayPeriod } from "@/types";

let idCounter = 0;

const schengenCountries = COUNTRIES.filter((c) => c.schengen).map((c) => ({
  value: c.id, label: c.name,
}));

export default function CalculatorPage() {
  const [stays,      setStays]      = useState<StayPeriod[]>([]);
  const [newEntry,   setNewEntry]   = useState({ country: "", entryDate: "", exitDate: "" });
  const [result,     setResult]     = useState<null | { daysUsed: number; daysRemaining: number }>(null);
  const [entryError, setEntryError] = useState("");

  function addStay() {
    if (!newEntry.country || !newEntry.entryDate || !newEntry.exitDate) {
      setEntryError("Please fill in all fields."); return;
    }
    if (new Date(newEntry.exitDate) < new Date(newEntry.entryDate)) {
      setEntryError("Exit date must be after entry date."); return;
    }
    setEntryError("");
    setStays((p) => [...p, { id: String(++idCounter), ...newEntry }]);
    setNewEntry({ country: "", entryDate: "", exitDate: "" });
    setResult(null);
  }

  function removeStay(id: string) {
    setStays((p) => p.filter((s) => s.id !== id));
    setResult(null);
  }

  function calculate() { setResult(calculateSchengenDays(stays)); }

  const pct = result ? Math.min(100, (result.daysUsed / 90) * 100) : 0;
  const barBg =
    pct >= 100 ? "#ef4444" :
    pct > 75   ? "#F5A623" :
                 "#10b981";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>

      {/* ── Hero ── */}
      <div className="gradient-hero py-20">
        <div className="relative z-10 page-container">
          <Breadcrumb items={[{ label: "Short-Stay Calculator" }]} className="text-white/50 mb-6" />
          <div className="section-eyebrow mb-5">
            <Calculator size={11} />
            Calculator
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-syne)" }}>
            Schengen 90/180{" "}
            <span className="text-gradient-hero">Day Calculator</span>
          </h1>
          <p className="mt-5 text-base text-white/50 max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-outfit)" }}>
            Track your Schengen short-stay days. Enter previous stays to see how many days you have remaining in the rolling 180-day window.
          </p>
        </div>
      </div>

      <div className="page-container py-12 max-w-3xl space-y-6">
        <Disclaimer />

        {/* How it works */}
        <div className="flex gap-4 rounded-3xl p-5" style={{ border: "1px solid rgba(245,166,35,0.25)", background: "rgba(245,166,35,0.05)" }}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(245,166,35,0.15)" }}>
            <Info size={15} style={{ color: "#0d1b4b" }} />
          </div>
          <div>
            <p className="text-sm font-bold text-ink mb-1" style={{ fontFamily: "var(--font-syne)" }}>
              How the 90/180 Rule Works
            </p>
            <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
              You may stay in the Schengen Area for a maximum of{" "}
              <strong className="text-ink">90 days within any rolling 180-day window</strong>.
              This window moves daily — for any given date, look back 180 days and count how many of those days you spent
              in the Schengen Area. All Schengen countries count together, not per country.
            </p>
          </div>
        </div>

        {/* Add stay */}
        <div className="rounded-3xl bg-white overflow-hidden"
          style={{ border: "1px solid rgba(13,27,75,0.12)", boxShadow: "0 1px 4px rgba(13,27,75,0.07)" }}>
          {/* Card header — navy gradient */}
          <div className="px-6 py-4 flex items-center gap-3"
            style={{
              background: "linear-gradient(135deg, #0d1b4b 0%, #1a2b6b 100%)",
              borderBottom: "1px solid rgba(245,166,35,0.20)",
            }}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.30)" }}>
              <Plus size={14} style={{ color: "#F5A623" }} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
                Add a Previous Stay
              </h2>
              <p className="text-xs mt-0.5" style={{ fontFamily: "var(--font-outfit)", color: "rgba(255,255,255,0.50)" }}>
                Enter every Schengen visit in the last 180 days
              </p>
            </div>
          </div>
          <div className="px-6 py-5">
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
              <p className="mt-2.5 flex items-center gap-1.5 text-sm text-red-600"
                style={{ fontFamily: "var(--font-outfit)" }}>
                <AlertTriangle size={13} /> {entryError}
              </p>
            )}
            {/* Add Stay — navy outline style */}
            <button
              type="button"
              onClick={addStay}
              className="btn-shine mt-4 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
              style={{
                fontFamily: "var(--font-outfit)",
                background: "linear-gradient(135deg, #0d1b4b 0%, #1a2b6b 100%)",
                border: "1px solid rgba(245,166,35,0.30)",
                boxShadow: "0 4px 16px rgba(13,27,75,0.30)",
                color: "#fff",
              }}
            >
              <Plus size={14} /> Add Stay
            </button>
          </div>
        </div>

        {/* Stays list */}
        {stays.length > 0 && (
          <div className="rounded-3xl bg-white overflow-hidden"
            style={{ border: "1px solid rgba(13,27,75,0.12)", boxShadow: "0 1px 4px rgba(13,27,75,0.07)" }}>
            {/* Card header — navy gradient */}
            <div className="px-6 py-4 flex items-center justify-between"
              style={{
                background: "linear-gradient(135deg, #0d1b4b 0%, #1a2b6b 100%)",
                borderBottom: "1px solid rgba(245,166,35,0.20)",
              }}>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.30)" }}>
                  <Calculator size={14} style={{ color: "#F5A623" }} />
                </div>
                <h2 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
                  Your Stays ({stays.length})
                </h2>
              </div>
              <button
                onClick={() => { setStays([]); setResult(null); }}
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  fontFamily: "var(--font-outfit)",
                  background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.30)",
                  color: "#fca5a5",
                }}
              >
                <Trash2 size={12} /> Clear All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {["Country","Entry","Exit","Days",""].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-400 bg-slate-50 border-b border-slate-100"
                        style={{ fontFamily: "var(--font-outfit)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stays.map((stay) => {
                    const country = COUNTRIES.find((c) => c.id === stay.country);
                    const days = Math.max(0,
                      Math.floor((new Date(stay.exitDate).getTime() - new Date(stay.entryDate).getTime()) / 86400000) + 1
                    );
                    return (
                      <tr key={stay.id} className="border-t border-slate-100 transition-colors" style={{}}>
                        <td className="px-5 py-3 font-semibold text-ink" style={{ fontFamily: "var(--font-outfit)" }}>
                          {country?.name ?? stay.country}
                        </td>
                        <td className="px-5 py-3 text-slate-600" style={{ fontFamily: "var(--font-outfit)" }}>
                          {formatDate(stay.entryDate)}
                        </td>
                        <td className="px-5 py-3 text-slate-600" style={{ fontFamily: "var(--font-outfit)" }}>
                          {formatDate(stay.exitDate)}
                        </td>
                        <td className="px-5 py-3 font-bold text-ink" style={{ fontFamily: "var(--font-outfit)" }}>
                          {days}
                        </td>
                        <td className="px-5 py-3">
                          <button
                            onClick={() => removeStay(stay.id)}
                            className="text-slate-300 hover:text-red-500 transition-colors"
                            aria-label="Remove stay"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Calculate button — navy gradient + gold border */}
        <button
          type="button"
          onClick={calculate}
          disabled={stays.length === 0}
          className="btn-shine w-full inline-flex items-center justify-center gap-2.5 rounded-2xl px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          style={{
            fontFamily: "var(--font-outfit)",
            background: "linear-gradient(135deg, #0d1b4b 0%, #1a2b6b 100%)",
            border: "1px solid rgba(245,166,35,0.35)",
            boxShadow: "0 4px 20px rgba(13,27,75,0.40)",
          }}
        >
          <Calculator size={18} style={{ color: "#F5A623" }} /> Calculate Remaining Days
        </button>

        {/* Result */}
        {result && (
          <div className="rounded-3xl bg-white overflow-hidden animate-fade-up"
            style={{ border: "1px solid rgba(13,27,75,0.12)", boxShadow: "0 4px 20px rgba(13,27,75,0.10)" }}>
            {/* Card header — navy gradient */}
            <div className="px-6 py-4 flex items-center gap-3"
              style={{
                background: "linear-gradient(135deg, #0d1b4b 0%, #1a2b6b 100%)",
                borderBottom: "1px solid rgba(245,166,35,0.20)",
              }}>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.30)" }}>
                <Calculator size={14} style={{ color: "#F5A623" }} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
                  Calculation Result
                </h2>
                <p className="text-xs mt-0.5" style={{ fontFamily: "var(--font-outfit)", color: "rgba(255,255,255,0.50)" }}>
                  Based on a rolling 180-day window from today
                </p>
              </div>
            </div>
            <div className="px-6 py-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 text-center">
                  <p className="text-3xl font-bold text-ink" style={{ fontFamily: "var(--font-syne)" }}>
                    {result.daysUsed}
                  </p>
                  <p className="text-sm text-slate-500 mt-1" style={{ fontFamily: "var(--font-outfit)" }}>Days Used</p>
                </div>
                <div className={`rounded-2xl p-5 text-center ${
                  result.daysRemaining > 20 ? "bg-emerald-50 border border-emerald-100" :
                  result.daysRemaining > 0  ? "bg-amber-50  border border-amber-100"   :
                                               "bg-red-50    border border-red-100"
                }`}>
                  <p className={`text-3xl font-bold ${
                    result.daysRemaining > 20 ? "text-emerald-700" :
                    result.daysRemaining > 0  ? "text-amber-700"   :
                                                 "text-red-700"
                  }`} style={{ fontFamily: "var(--font-syne)" }}>
                    {result.daysRemaining}
                  </p>
                  <p className={`text-sm mt-1 ${
                    result.daysRemaining > 20 ? "text-emerald-600" :
                    result.daysRemaining > 0  ? "text-amber-600"   :
                                                 "text-red-600"
                  }`} style={{ fontFamily: "var(--font-outfit)" }}>
                    Days Remaining
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-400 mb-2"
                  style={{ fontFamily: "var(--font-outfit)" }}>
                  <span>0 days</span>
                  <span className="font-semibold">90 day limit</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: barBg }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1.5 text-right" style={{ fontFamily: "var(--font-outfit)" }}>
                  {result.daysUsed}/90 days used
                </p>
              </div>

              {result.daysRemaining <= 0 && (
                <div className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
                  <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-700 leading-relaxed" style={{ fontFamily: "var(--font-outfit)" }}>
                    You have used your full 90-day allowance in the current 180-day window. Entering the Schengen Area
                    now may result in overstay. Consult the official Schengen short-stay calculator or a legal adviser.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <Disclaimer />
      </div>
    </div>
  );
}
