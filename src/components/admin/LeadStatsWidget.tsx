"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, TrendingUp, Clock, CheckCircle, ArrowRight } from "lucide-react";

interface Stats { total: number; partial: number; completed: number; newToday: number; }

function MiniStat({ label, value, icon: Icon, gold }: { label: string; value: number | string; icon: React.ElementType; gold?: boolean }) {
  return (
    <div
      className="relative rounded-3xl bg-white overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5"
      style={{ border: "1px solid rgba(13,27,75,0.10)", boxShadow: "0 1px 4px rgba(13,27,75,0.07)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
        style={{ background: gold ? "linear-gradient(90deg,#F5A623,#fcd34d)" : "linear-gradient(90deg,#0d1b4b,#1a2b6b)" }} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400" style={{ fontFamily: "var(--font-outfit)" }}>{label}</p>
          <p className="mt-2 text-3xl font-bold leading-none" style={{ fontFamily: "var(--font-syne)", color: "#0d1b4b" }}>{value}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
          style={gold
            ? { background: "rgba(245,166,35,0.10)", border: "1px solid rgba(245,166,35,0.20)" }
            : { background: "rgba(13,27,75,0.07)",   border: "1px solid rgba(13,27,75,0.12)"   }
          }>
          <Icon size={18} style={{ color: gold ? "#E8971A" : "#0d1b4b" }} />
        </div>
      </div>
    </div>
  );
}

export function LeadStatsWidget() {
  const [stats,   setStats]   = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/leads/stats")
      .then((r) => r.json())
      .then((json) => { if (json.success) setStats(json.stats); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="section-eyebrow">
            <Briefcase size={10} /> Lead Capture
          </div>
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
            style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.25)", color: "#065f46", fontFamily: "var(--font-outfit)" }}>
            ● Live
          </span>
        </div>
        <Link href="/admin/leads"
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all hover:-translate-y-0.5"
          style={{ background: "rgba(13,27,75,0.06)", border: "1px solid rgba(13,27,75,0.14)", color: "#0d1b4b", fontFamily: "var(--font-outfit)" }}>
          View All <ArrowRight size={11} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MiniStat label="Total Leads"  value={loading ? "—" : (stats?.total     ?? 0)} icon={Briefcase}   />
        <MiniStat label="New Today"    value={loading ? "—" : (stats?.newToday  ?? 0)} icon={TrendingUp}  gold />
        <MiniStat label="Partial"      value={loading ? "—" : (stats?.partial   ?? 0)} icon={Clock}       />
        <MiniStat label="Completed"    value={loading ? "—" : (stats?.completed ?? 0)} icon={CheckCircle} gold />
      </div>
    </div>
  );
}
