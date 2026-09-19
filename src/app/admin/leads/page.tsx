"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search, RefreshCw, ChevronLeft, ChevronRight,
  Users, TrendingUp, Clock, CheckCircle, Briefcase,
  Mail, Phone, Calendar, Eye, Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─────────────────────────────────────────────────────── */
interface Lead {
  _id:               string;
  leadType:          string;
  status:            string;
  name?:             string;
  email?:            string;
  phone?:            string;
  completionPercent: number;
  createdAt:         string;
  updatedAt:         string;
}
interface Stats {
  total: number; partial: number; completed: number; newToday: number;
}

/* ─── Status pill ────────────────────────────────────────────────── */
const STATUS_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  PARTIAL:   { bg: "rgba(245,166,35,0.10)",  color: "#b06000",  border: "rgba(245,166,35,0.30)" },
  COMPLETED: { bg: "rgba(13,27,75,0.08)",    color: "#0d1b4b",  border: "rgba(13,27,75,0.20)"   },
  CONTACTED: { bg: "rgba(26,43,107,0.10)",   color: "#1a2b6b",  border: "rgba(26,43,107,0.25)"  },
  FOLLOW_UP: { bg: "rgba(245,166,35,0.15)",  color: "#8a5000",  border: "rgba(245,166,35,0.40)" },
  CONVERTED: { bg: "rgba(16,185,129,0.10)",  color: "#065f46",  border: "rgba(16,185,129,0.30)" },
  CLOSED:    { bg: "rgba(100,116,139,0.10)", color: "#475569",  border: "rgba(100,116,139,0.25)"},
};

function StatusPill({ status }: { status: string }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.CLOSED;
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontFamily: "var(--font-outfit)" }}
    >
      {status.replace("_", " ")}
    </span>
  );
}

const TYPE_LABEL: Record<string, string> = {
  eligibility: "Eligibility", contact: "Contact", "short-stay": "Short Stay",
};

/* ─── Mini StatCard ──────────────────────────────────────────────── */
function MiniStat({ label, value, icon: Icon, gold }: { label: string; value: number | string; icon: React.ElementType; gold?: boolean }) {
  return (
    <div
      className="relative rounded-3xl bg-white overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5"
      style={{ border: "1px solid rgba(13,27,75,0.10)", boxShadow: "0 1px 4px rgba(13,27,75,0.07)" }}
    >
      {/* top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
        style={{ background: gold ? "linear-gradient(90deg, #F5A623, #fcd34d)" : "linear-gradient(90deg, #0d1b4b, #1a2b6b)" }}
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400" style={{ fontFamily: "var(--font-outfit)" }}>
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold leading-none" style={{ fontFamily: "var(--font-syne)", color: "#0d1b4b" }}>
            {value}
          </p>
        </div>
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
          style={gold
            ? { background: "rgba(245,166,35,0.10)", border: "1px solid rgba(245,166,35,0.20)" }
            : { background: "rgba(13,27,75,0.07)",   border: "1px solid rgba(13,27,75,0.12)"   }
          }
        >
          <Icon size={18} style={{ color: gold ? "#E8971A" : "#0d1b4b" }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function AdminLeadsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search,      setSearch]      = useState("");
  const [status,      setStatus]      = useState("all");
  const [leadType,    setLeadType]    = useState("all");
  const [page,        setPage]        = useState(1);
  const pageSize = 20;

  const [leads,        setLeads]        = useState<Lead[]>([]);
  const [total,        setTotal]        = useState(0);
  const [totalPages,   setTotalPages]   = useState(1);
  const [stats,        setStats]        = useState<Stats | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error,        setError]        = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await fetch("/api/admin/leads/stats");
      const json = await res.json();
      if (json.success) setStats(json.stats);
    } catch { /* ignore */ }
    finally { setStatsLoading(false); }
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const p = new URLSearchParams({ page: String(page), pageSize: String(pageSize), status, leadType });
      if (search.trim()) p.set("search", search.trim());
      const res  = await fetch(`/api/admin/leads?${p}`);
      const json = await res.json();
      if (json.success) { setLeads(json.data); setTotal(json.total); setTotalPages(json.totalPages); }
      else setError(json.message ?? "Failed to load leads");
    } catch { setError("Network error"); }
    finally { setLoading(false); }
  }, [page, status, leadType, search]);

  useEffect(() => { fetchStats(); }, [fetchStats]);
  useEffect(() => { setPage(1); }, [status, leadType, search]);
  useEffect(() => { fetchLeads(); }, [fetchLeads]);
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to   = Math.min(page * pageSize, total);

  return (
    <div className="space-y-6">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <div>
          <div className="section-eyebrow mb-3 w-fit">
            <Briefcase size={10} /> Leads
          </div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-syne)", color: "#0d1b4b" }}>
            Lead Management
          </h1>
          <p className="text-sm text-slate-500 mt-0.5" style={{ fontFamily: "var(--font-outfit)" }}>
            All website enquiries — eligibility, contact and short-stay forms
          </p>
        </div>
        <button
          onClick={() => { fetchLeads(); fetchStats(); }}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
          style={{
            background: "rgba(13,27,75,0.06)",
            border: "1px solid rgba(13,27,75,0.14)",
            color: "#0d1b4b",
            fontFamily: "var(--font-outfit)",
            boxShadow: "0 1px 4px rgba(13,27,75,0.07)",
          }}
        >
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MiniStat label="Total Leads"  value={statsLoading ? "—" : (stats?.total    ?? 0)} icon={Briefcase}   />
        <MiniStat label="New Today"    value={statsLoading ? "—" : (stats?.newToday ?? 0)} icon={TrendingUp}  gold />
        <MiniStat label="Partial"      value={statsLoading ? "—" : (stats?.partial  ?? 0)} icon={Clock}       />
        <MiniStat label="Completed"    value={statsLoading ? "—" : (stats?.completed?? 0)} icon={CheckCircle} gold />
      </div>

      {/* ── Filters ── */}
      <div
        className="flex flex-wrap items-center gap-3 rounded-2xl bg-white px-4 py-3"
        style={{ border: "1px solid rgba(13,27,75,0.10)", boxShadow: "0 1px 4px rgba(13,27,75,0.06)" }}
      >
        <Filter size={13} style={{ color: "#0d1b4b", opacity: 0.4 }} />

        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#94a3b8" }} />
          <input
            type="text"
            placeholder="Search name, email or phone…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full rounded-xl py-2 pl-8 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none transition-all"
            style={{
              background: "rgba(13,27,75,0.03)",
              border: "1px solid rgba(13,27,75,0.12)",
              fontFamily: "var(--font-outfit)",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#F5A623"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(245,166,35,0.15)"; }}
            onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(13,27,75,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
          />
        </div>

        {/* Status */}
        <select
          value={status} onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none transition-all appearance-none pr-8"
          style={{
            background: "rgba(13,27,75,0.03)",
            border: "1px solid rgba(13,27,75,0.12)",
            fontFamily: "var(--font-outfit)",
            cursor: "pointer",
          }}
        >
          <option value="all">All Statuses</option>
          <option value="PARTIAL">Partial</option>
          <option value="COMPLETED">Completed</option>
          <option value="CONTACTED">Contacted</option>
          <option value="FOLLOW_UP">Follow Up</option>
          <option value="CONVERTED">Converted</option>
          <option value="CLOSED">Closed</option>
        </select>

        {/* Type */}
        <select
          value={leadType} onChange={(e) => setLeadType(e.target.value)}
          className="rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none transition-all appearance-none pr-8"
          style={{
            background: "rgba(13,27,75,0.03)",
            border: "1px solid rgba(13,27,75,0.12)",
            fontFamily: "var(--font-outfit)",
            cursor: "pointer",
          }}
        >
          <option value="all">All Types</option>
          <option value="eligibility">Eligibility</option>
          <option value="contact">Contact</option>
          <option value="short-stay">Short Stay</option>
        </select>
      </div>

      {/* ── Table ── */}
      <div
        className="rounded-3xl bg-white overflow-hidden"
        style={{ border: "1px solid rgba(13,27,75,0.10)", boxShadow: "0 1px 4px rgba(13,27,75,0.07)" }}
      >
        {/* Table header strip */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{
            background: "linear-gradient(135deg, rgba(13,27,75,0.03) 0%, rgba(245,166,35,0.03) 100%)",
            borderBottom: "1px solid rgba(13,27,75,0.08)",
          }}
        >
          <p className="text-xs font-semibold text-slate-500" style={{ fontFamily: "var(--font-outfit)" }}>
            {loading ? "Loading…" : `${total} lead${total !== 1 ? "s" : ""} found`}
          </p>
          {total > 0 && !loading && (
            <p className="text-xs text-slate-400" style={{ fontFamily: "var(--font-outfit)" }}>
              Showing {from}–{to}
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div
            className="px-5 py-3 text-sm"
            style={{ background: "rgba(239,68,68,0.05)", borderBottom: "1px solid rgba(239,68,68,0.15)", color: "#dc2626", fontFamily: "var(--font-outfit)" }}
          >
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {["Name / Email", "Phone", "Type", "Status", "Completion", "Created", ""].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: "#94a3b8", fontFamily: "var(--font-outfit)", borderBottom: "1px solid rgba(13,27,75,0.08)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 rounded-lg bg-slate-100 animate-pulse" style={{ width: j === 0 ? "140px" : "80px" }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <div
                      className="inline-flex h-16 w-16 items-center justify-center rounded-2xl mb-4"
                      style={{ background: "rgba(13,27,75,0.05)", border: "1px solid rgba(13,27,75,0.10)" }}
                    >
                      <Users size={28} style={{ color: "rgba(13,27,75,0.25)" }} />
                    </div>
                    <p className="font-bold text-slate-500" style={{ fontFamily: "var(--font-syne)" }}>No leads found</p>
                    <p className="text-xs text-slate-400 mt-1" style={{ fontFamily: "var(--font-outfit)" }}>
                      Try adjusting your filters or wait for new submissions.
                    </p>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="transition-colors"
                    style={{ borderBottom: "1px solid rgba(13,27,75,0.05)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(13,27,75,0.025)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {/* Name + email */}
                    <td className="px-5 py-3.5">
                      <p className="font-semibold" style={{ fontFamily: "var(--font-syne)", color: "#0d1b4b" }}>
                        {lead.name ?? <span className="text-slate-300 font-normal italic text-xs">Anonymous</span>}
                      </p>
                      {lead.email && (
                        <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: "#94a3b8", fontFamily: "var(--font-outfit)" }}>
                          <Mail size={9} /> {lead.email}
                        </p>
                      )}
                    </td>
                    {/* Phone */}
                    <td className="px-5 py-3.5">
                      {lead.phone
                        ? <span className="text-xs flex items-center gap-1" style={{ color: "#64748b", fontFamily: "var(--font-outfit)" }}><Phone size={9} />{lead.phone}</span>
                        : <span style={{ color: "#e2e8f0" }}>—</span>}
                    </td>
                    {/* Type */}
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center rounded-xl px-2.5 py-0.5 text-xs font-medium"
                        style={{ background: "rgba(13,27,75,0.06)", color: "#0d1b4b", border: "1px solid rgba(13,27,75,0.12)", fontFamily: "var(--font-outfit)" }}
                      >
                        {TYPE_LABEL[lead.leadType] ?? lead.leadType}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-5 py-3.5"><StatusPill status={lead.status} /></td>
                    {/* Completion */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full w-16" style={{ background: "rgba(13,27,75,0.08)" }}>
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${lead.completionPercent}%`,
                              background: lead.completionPercent === 100
                                ? "#10b981"
                                : "linear-gradient(90deg, #0d1b4b, #F5A623)",
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold w-8" style={{ color: "#64748b", fontFamily: "var(--font-outfit)" }}>
                          {lead.completionPercent}%
                        </span>
                      </div>
                    </td>
                    {/* Created */}
                    <td className="px-5 py-3.5">
                      <span className="text-xs flex items-center gap-1" style={{ color: "#94a3b8", fontFamily: "var(--font-outfit)" }}>
                        <Calendar size={9} />
                        {new Date(lead.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </span>
                    </td>
                    {/* Action */}
                    <td className="px-5 py-3.5 text-right">
                      <Link href={`/admin/leads/${lead._id}`}>
                        <button
                          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all hover:-translate-y-0.5"
                          style={{
                            background: "rgba(13,27,75,0.06)",
                            border: "1px solid rgba(13,27,75,0.14)",
                            color: "#0d1b4b",
                            fontFamily: "var(--font-outfit)",
                          }}
                        >
                          <Eye size={11} /> View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && total > pageSize && (
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderTop: "1px solid rgba(13,27,75,0.08)" }}
          >
            <p className="text-xs text-slate-400" style={{ fontFamily: "var(--font-outfit)" }}>
              Showing {from}–{to} of {total}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-7 w-7 items-center justify-center rounded-xl transition-colors disabled:opacity-30"
                style={{ border: "1px solid rgba(13,27,75,0.14)", color: "#0d1b4b" }}
              >
                <ChevronLeft size={13} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className="flex h-7 w-7 items-center justify-center rounded-xl text-xs font-semibold transition-all"
                    style={p === page
                      ? { background: "linear-gradient(135deg,#0d1b4b,#1a2b6b)", color: "#F5A623", boxShadow: "0 2px 8px rgba(13,27,75,0.30)" }
                      : { border: "1px solid rgba(13,27,75,0.14)", color: "#64748b" }
                    }
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex h-7 w-7 items-center justify-center rounded-xl transition-colors disabled:opacity-30"
                style={{ border: "1px solid rgba(13,27,75,0.14)", color: "#0d1b4b" }}
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
