"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft, Mail, Phone, Calendar, User,
  MessageSquare, Send, CheckCircle, Clock,
  RefreshCw, Briefcase, Edit2, Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─────────────────────────────────────────────────────── */
interface Lead {
  _id: string; leadType: string; status: string;
  name?: string; email?: string; phone?: string;
  formData: Record<string, unknown>;
  completionPercent: number; lastStep: number; totalSteps: number;
  source: string; assignedTo?: string; ipAddress?: string;
  createdAt: string; updatedAt: string;
}
interface LeadNote { _id: string; adminName: string; content: string; createdAt: string; }

const STATUSES = ["PARTIAL","COMPLETED","CONTACTED","FOLLOW_UP","CONVERTED","CLOSED"] as const;
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
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontFamily: "var(--font-outfit)" }}>
      {status.replace("_", " ")}
    </span>
  );
}

/* ─── Reusable panel ─────────────────────────────────────────────── */
function Panel({ title, icon: Icon, accent, children }: { title: string; icon: React.ElementType; accent?: boolean; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white overflow-hidden"
      style={{ border: "1px solid rgba(13,27,75,0.10)", boxShadow: "0 1px 4px rgba(13,27,75,0.07)" }}>
      <div className="px-5 py-4 flex items-center gap-2.5"
        style={accent
          ? { background: "linear-gradient(135deg, #0d1b4b 0%, #1a2b6b 100%)", borderBottom: "1px solid rgba(245,166,35,0.20)" }
          : { borderBottom: "1px solid rgba(13,27,75,0.08)", background: "rgba(13,27,75,0.02)" }
        }>
        <div className="flex h-7 w-7 items-center justify-center rounded-xl"
          style={accent
            ? { background: "rgba(245,166,35,0.15)", border: "1px solid rgba(245,166,35,0.30)" }
            : { background: "rgba(13,27,75,0.08)", border: "1px solid rgba(13,27,75,0.12)" }
          }>
          <Icon size={13} style={{ color: accent ? "#F5A623" : "#0d1b4b" }} />
        </div>
        <h2 className={cn("text-sm font-bold", accent ? "text-white" : "text-slate-800")}
          style={{ fontFamily: "var(--font-syne)" }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function AdminLeadDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [lead,          setLead]          = useState<Lead | null>(null);
  const [notes,         setNotes]         = useState<LeadNote[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState<string | null>(null);
  const [updatingStatus,setUpdatingStatus]= useState(false);
  const [statusSuccess, setStatusSuccess] = useState(false);
  const [noteContent,   setNoteContent]   = useState("");
  const [submittingNote,setSubmittingNote]= useState(false);
  const [noteError,     setNoteError]     = useState<string | null>(null);

  async function fetchData() {
    setLoading(true); setError(null);
    try {
      const res  = await fetch(`/api/admin/leads/${id}`);
      const json = await res.json();
      if (json.success) { setLead(json.lead); setNotes(json.notes ?? []); }
      else setError(json.message ?? "Failed to load lead");
    } catch { setError("Network error"); }
    finally { setLoading(false); }
  }
  useEffect(() => { fetchData(); }, [id]);

  async function updateStatus(s: string) {
    if (!lead) return;
    setUpdatingStatus(true);
    try {
      const res  = await fetch(`/api/admin/leads/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: s }) });
      const json = await res.json();
      if (json.success) { setLead(json.lead); setStatusSuccess(true); setTimeout(() => setStatusSuccess(false), 2000); }
    } catch { /* ignore */ }
    finally { setUpdatingStatus(false); }
  }

  async function submitNote(e: React.FormEvent) {
    e.preventDefault();
    if (!noteContent.trim()) return;
    setSubmittingNote(true); setNoteError(null);
    try {
      const res  = await fetch(`/api/admin/leads/${id}/notes`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: noteContent.trim() }) });
      const json = await res.json();
      if (json.success) { setNotes((prev) => [json.note, ...prev]); setNoteContent(""); }
      else setNoteError(json.message ?? "Failed to add note");
    } catch { setNoteError("Network error"); }
    finally { setSubmittingNote(false); }
  }

  /* Loading skeleton */
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 rounded-2xl bg-slate-100" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-48 rounded-3xl bg-slate-100" />
            <div className="h-64 rounded-3xl bg-slate-100" />
          </div>
          <div className="space-y-4">
            <div className="h-40 rounded-3xl bg-slate-100" />
            <div className="h-56 rounded-3xl bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="space-y-4">
        <Link href="/admin/leads">
          <button className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors" style={{ color: "#94a3b8", fontFamily: "var(--font-outfit)" }}>
            <ArrowLeft size={12} /> Back to Leads
          </button>
        </Link>
        <div className="rounded-3xl p-6 text-sm" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.20)", color: "#dc2626", fontFamily: "var(--font-outfit)" }}>
          {error ?? "Lead not found."}
        </div>
      </div>
    );
  }

  const formFields = Object.entries(lead.formData ?? {}).filter(([k]) => !["name","email","phone"].includes(k));

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/admin/leads">
            <button className="inline-flex items-center gap-1.5 text-xs font-semibold mb-2 transition-colors"
              style={{ color: "#94a3b8", fontFamily: "var(--font-outfit)" }}>
              <ArrowLeft size={11} /> All Leads
            </button>
          </Link>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-syne)", color: "#0d1b4b" }}>
            {lead.name ?? "Anonymous Lead"}
          </h1>
          <div className="flex items-center gap-2 flex-wrap mt-2">
            <StatusPill status={lead.status} />
            <span className="inline-flex items-center gap-1 rounded-xl px-2.5 py-0.5 text-xs font-medium"
              style={{ background: "rgba(13,27,75,0.06)", color: "#0d1b4b", border: "1px solid rgba(13,27,75,0.12)", fontFamily: "var(--font-outfit)" }}>
              <Briefcase size={9} /> {lead.leadType}
            </span>
            <span className="text-xs" style={{ color: "#94a3b8", fontFamily: "var(--font-outfit)" }}>ID: {lead._id.slice(-8)}…</span>
          </div>
        </div>
        <button onClick={fetchData}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shrink-0 transition-all hover:-translate-y-0.5"
          style={{ background: "rgba(13,27,75,0.06)", border: "1px solid rgba(13,27,75,0.14)", color: "#0d1b4b", fontFamily: "var(--font-outfit)" }}>
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ── Left column ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Contact info */}
          <Panel title="Contact Information" icon={User} accent>
            <div className="p-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["Full Name",  lead.name],
                ["Email",      lead.email],
                ["Phone",      lead.phone],
                ["Source",     lead.source],
                ["IP Address", lead.ipAddress],
                ["Last Step",  `${lead.lastStep} / ${lead.totalSteps}`],
              ].filter(([, v]) => v).map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#94a3b8", fontFamily: "var(--font-outfit)" }}>{label}</span>
                  <span className="text-sm font-medium break-all" style={{ color: "#0d1b4b", fontFamily: "var(--font-outfit)" }}>{value}</span>
                </div>
              ))}
            </div>
            {/* Completion bar */}
            <div className="px-5 pb-5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold" style={{ color: "#64748b", fontFamily: "var(--font-outfit)" }}>Form Completion</span>
                <span className="text-xs font-bold" style={{ color: lead.completionPercent === 100 ? "#10b981" : "#0d1b4b", fontFamily: "var(--font-outfit)" }}>
                  {lead.completionPercent}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full" style={{ background: "rgba(13,27,75,0.08)" }}>
                <div className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${lead.completionPercent}%`,
                    background: lead.completionPercent === 100 ? "#10b981" : "linear-gradient(90deg, #0d1b4b, #F5A623)",
                  }} />
              </div>
            </div>
          </Panel>

          {/* Form data */}
          {formFields.length > 0 && (
            <Panel title="Form Responses" icon={Edit2}>
              <div className="p-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {formFields.map(([key, val]) => (
                  <div key={key} className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#94a3b8", fontFamily: "var(--font-outfit)" }}>
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-sm font-medium break-words" style={{ color: "#334155", fontFamily: "var(--font-outfit)" }}>
                      {String(val ?? "—")}
                    </span>
                  </div>
                ))}
              </div>
            </Panel>
          )}

          {/* Notes */}
          <Panel title={`Admin Notes (${notes.length})`} icon={MessageSquare}>
            {/* Composer */}
            <form onSubmit={submitNote} className="p-5" style={{ borderBottom: "1px solid rgba(13,27,75,0.08)" }}>
              {noteError && (
                <p className="mb-3 text-xs" style={{ color: "#dc2626", fontFamily: "var(--font-outfit)" }}>{noteError}</p>
              )}
              <textarea
                rows={3}
                placeholder="Add a note about this lead…"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full rounded-2xl px-4 py-3 text-sm resize-none focus:outline-none transition-all"
                style={{
                  border: "1px solid rgba(13,27,75,0.15)",
                  background: "rgba(13,27,75,0.02)",
                  color: "#0f172a",
                  fontFamily: "var(--font-outfit)",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#F5A623"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(245,166,35,0.15)"; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(13,27,75,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
              />
              <div className="mt-2.5 flex justify-end">
                <button type="submit" disabled={submittingNote || !noteContent.trim()}
                  className="btn-shine inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #0d1b4b 0%, #1a2b6b 100%)", border: "1px solid rgba(245,166,35,0.25)", fontFamily: "var(--font-outfit)" }}>
                  <Send size={11} style={{ color: "#F5A623" }} />
                  {submittingNote ? "Saving…" : "Add Note"}
                </button>
              </div>
            </form>
            {notes.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="text-sm" style={{ color: "#94a3b8", fontFamily: "var(--font-outfit)" }}>No notes yet — add one above.</p>
              </div>
            ) : (
              <div>
                {notes.map((note) => (
                  <div key={note._id} className="px-5 py-4" style={{ borderBottom: "1px solid rgba(13,27,75,0.05)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-bold"
                          style={{ background: "linear-gradient(135deg,#0d1b4b,#1a2b6b)", color: "#F5A623" }}>
                          {note.adminName.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs font-semibold" style={{ color: "#0d1b4b", fontFamily: "var(--font-outfit)" }}>{note.adminName}</span>
                      </div>
                      <span className="text-[11px]" style={{ color: "#94a3b8", fontFamily: "var(--font-outfit)" }}>
                        {new Date(note.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#334155", fontFamily: "var(--font-outfit)" }}>{note.content}</p>
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </div>

        {/* ── Right column ── */}
        <div className="space-y-5">

          {/* Status manager */}
          <Panel title="Update Status" icon={Edit2}>
            <div className="p-4 space-y-2">
              {statusSuccess && (
                <div className="flex items-center gap-2 rounded-xl px-3 py-2 mb-2 text-xs font-semibold"
                  style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.20)", color: "#065f46", fontFamily: "var(--font-outfit)" }}>
                  <CheckCircle size={11} /> Status updated
                </div>
              )}
              {STATUSES.map((s) => {
                const style = STATUS_STYLE[s];
                const isActive = lead.status === s;
                return (
                  <button key={s} onClick={() => updateStatus(s)} disabled={updatingStatus || isActive}
                    className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all"
                    style={isActive
                      ? { background: style.bg, color: style.color, border: `1px solid ${style.border}`, cursor: "default", fontFamily: "var(--font-outfit)" }
                      : { background: "transparent", border: "1px solid rgba(13,27,75,0.10)", color: "#64748b", fontFamily: "var(--font-outfit)" }
                    }
                    onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = style.bg; e.currentTarget.style.color = style.color; e.currentTarget.style.borderColor = style.border; } }}
                    onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; e.currentTarget.style.borderColor = "rgba(13,27,75,0.10)"; } }}
                  >
                    <span>{s.replace("_", " ")}</span>
                    {isActive && <CheckCircle size={11} />}
                  </button>
                );
              })}
            </div>
          </Panel>

          {/* Timeline */}
          <Panel title="Timeline" icon={Clock}>
            <div className="p-5 space-y-4">
              {[["Lead Created", lead.createdAt], ["Last Updated", lead.updatedAt]].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#94a3b8", fontFamily: "var(--font-outfit)" }}>{label}</span>
                  <span className="text-xs font-medium" style={{ color: "#0d1b4b", fontFamily: "var(--font-outfit)" }}>
                    {new Date(value as string).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
              {lead.assignedTo && (
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#94a3b8", fontFamily: "var(--font-outfit)" }}>Assigned To</span>
                  <span className="text-xs font-medium" style={{ color: "#0d1b4b", fontFamily: "var(--font-outfit)" }}>{lead.assignedTo}</span>
                </div>
              )}
            </div>
          </Panel>

          {/* Quick contact */}
          {(lead.email || lead.phone) && (
            <Panel title="Quick Contact" icon={Globe}>
              <div className="p-4 space-y-2">
                {lead.email && (
                  <a href={`mailto:${lead.email}`}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all hover:-translate-y-0.5"
                    style={{ border: "1px solid rgba(13,27,75,0.12)", color: "#0d1b4b", background: "rgba(13,27,75,0.03)", fontFamily: "var(--font-outfit)" }}>
                    <Mail size={11} style={{ color: "#F5A623" }} /> {lead.email}
                  </a>
                )}
                {lead.phone && (
                  <a href={`tel:${lead.phone}`}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all hover:-translate-y-0.5"
                    style={{ border: "1px solid rgba(13,27,75,0.12)", color: "#0d1b4b", background: "rgba(13,27,75,0.03)", fontFamily: "var(--font-outfit)" }}>
                    <Phone size={11} style={{ color: "#F5A623" }} /> {lead.phone}
                  </a>
                )}
              </div>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
