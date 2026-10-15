"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, ClipboardCheck, FastForward, CalendarClock, Inbox, Package } from "lucide-react";
import { STATUSES, buildSeed, priorityStyle, statusStyle, type Ticket } from "./portalData";
import { RequestPhone, type NewRequest } from "./RequestPhone";

// Compact version: dashboard + mobile request flow. The full role-based simulation lives on /portal-preview.
export function PortalDemo({ showDeeperLink = true }: { showDeeperLink?: boolean }) {
  const [tickets, setTickets] = useState<Ticket[]>(buildSeed);
  const [selectedId, setSelectedId] = useState("T-1042");
  const [filter, setFilter] = useState<string>("All");
  const [createdId, setCreatedId] = useState<string | null>(null);

  const counts = useMemo(() => ({
    open: tickets.filter((t) => t.status !== "Completed").length,
    scheduled: tickets.filter((t) => t.status === "Scheduled").length,
    materials: tickets.filter((t) => t.status === "Materials Ordered").length,
    done: tickets.filter((t) => t.status === "Completed").length,
  }), [tickets]);

  const visible = filter === "All" ? tickets : tickets.filter((t) => t.status === filter);
  const selected = tickets.find((t) => t.id === selectedId) ?? tickets[0];
  const statusIdx = STATUSES.indexOf(selected.status);

  function create(r: NewRequest) {
    const mineCount = tickets.filter((t) => t.mine).length;
    const id = `T-${1045 + mineCount}`;
    const t: Ticket = {
      id, property: r.property, priority: r.priority, status: "New Request", description: r.description,
      title: r.description.slice(0, 48) + (r.description.length > 48 ? "…" : ""), photo: r.photo, materials: [], mine: true, log: [],
    };
    setTickets((all) => [t, ...all]);
    setSelectedId(id);
    setCreatedId(id);
  }

  function advance() {
    setTickets((all) => all.map((t) => t.id === selected.id && t.status !== "Completed" ? { ...t, status: STATUSES[STATUSES.indexOf(t.status) + 1] } : t));
  }

  const stats = [
    { label: "Open requests", value: counts.open, icon: Inbox },
    { label: "Scheduled visits", value: counts.scheduled, icon: CalendarClock },
    { label: "Waiting for materials", value: counts.materials, icon: Package },
    { label: "Completed", value: counts.done, icon: ClipboardCheck },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:items-start">
      <div className="overflow-hidden rounded-md border border-navy-900/10 bg-white shadow-[0_30px_80px_-30px_rgba(10,18,36,0.35)]">
        <div className="flex items-center justify-between border-b border-line bg-mist px-4 py-3">
          <p className="eyebrow text-slate-ink">Property Manager View · Concept</p>
          <span className="eyebrow rounded bg-navy-950 px-2 py-0.5 text-signal">Sample data</span>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-md border border-line p-4">
                <Icon className="size-4 text-brand" aria-hidden="true" />
                <p className="mt-3 font-display text-3xl font-semibold text-navy-900">{value}</p>
                <p className="text-xs text-slate-ink">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter requests by status">
            {["All", ...STATUSES].map((f) => (
              <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${filter === f ? "bg-navy-900 text-white" : "bg-mist text-slate-ink hover:bg-line"}`}>{f}</button>
            ))}
          </div>

          <ul className="mt-4 divide-y divide-line" aria-label="Service requests (sample)">
            {visible.length === 0 && <li className="py-8 text-center text-sm text-slate-ink">No sample requests with this status.</li>}
            {visible.map((t) => (
              <li key={t.id}>
                <button onClick={() => setSelectedId(t.id)} aria-current={t.id === selected.id}
                  className={`flex w-full flex-col gap-2 rounded-md px-3 py-3 text-left transition-colors sm:flex-row sm:items-center sm:justify-between ${t.id === selected.id ? "bg-brand/5" : "hover:bg-mist"}`}>
                  <span>
                    <span className="eyebrow block text-slate-ink">{t.id} · {t.property}</span>
                    <span className="block text-sm font-semibold text-navy-900">{t.title}</span>
                  </span>
                  <span className="flex gap-2">
                    <span className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${priorityStyle[t.priority]}`}>{t.priority}</span>
                    <span className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${statusStyle(t.status)}`}>{t.status}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-md bg-navy-950 p-5 text-white">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="eyebrow text-signal">Ticket progress · {selected.id}</p>
                <p className="mt-1 font-display text-lg">{selected.title}</p>
                <p className="text-xs text-white/55">{selected.property}</p>
              </div>
              <button onClick={advance} disabled={selected.status === "Completed"}
                className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2 text-xs font-semibold text-navy-950 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40">
                <FastForward className="size-3.5" aria-hidden="true" /> Simulate next status
              </button>
            </div>
            <ol className="mt-6 grid gap-4 sm:grid-cols-6 sm:gap-2">
              {STATUSES.map((s, i) => {
                const done = i < statusIdx; const current = i === statusIdx;
                return (
                  <li key={s} className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2" aria-current={current ? "step" : undefined}>
                    <span className={`grid size-7 shrink-0 place-items-center rounded-full border text-[11px] font-bold ${done ? "border-signal bg-signal text-navy-950" : current ? "border-signal text-signal ring-4 ring-signal/20" : "border-white/20 text-white/35"}`}>
                      {done ? <Check className="size-3.5" aria-hidden="true" /> : i + 1}
                    </span>
                    <span className={`text-xs leading-tight ${current ? "font-semibold text-white" : done ? "text-white/80" : "text-white/40"}`}>{s}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          {showDeeperLink && (
            <Link href="/portal-preview#simulation" className="mt-6 flex items-center justify-between gap-4 rounded-md border border-signal bg-signal/10 px-5 py-4 text-sm font-semibold text-navy-900 transition-colors hover:bg-signal">
              <span>Go deeper: run the full three-role simulation (Manager, Dispatch, Technician)</span><span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>

      <div id="request" className="scroll-mt-28">
        <RequestPhone createdId={createdId} onSubmit={create} />
      </div>
    </div>
  );
}
