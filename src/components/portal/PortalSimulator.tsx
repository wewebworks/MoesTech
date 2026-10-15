"use client";
import { useMemo, useRef, useState } from "react";
import { Bell, Building2, Check, ClipboardList, Headset, HardHat, MessageSquare, RotateCcw, Send, UserRound, Wrench } from "lucide-react";
import {
  EQUIPMENT, MATERIALS, PROPERTIES, SLOTS, STATUSES, TECHS, buildSeed, fmtClock, priorityStyle, statusStyle,
  type LogEntry, type LogKind, type Ticket,
} from "./portalData";
import { RequestPhone, type NewRequest } from "./RequestPhone";

type Role = "manager" | "dispatch" | "tech";
type ManagerTab = "requests" | "new" | "properties";

const roles: { id: Role; label: string; sub: string; icon: typeof UserRound }[] = [
  { id: "manager", label: "Property Manager", sub: "Submits & follows requests", icon: Building2 },
  { id: "dispatch", label: "RNA Tek Dispatch", sub: "Assigns, schedules, orders", icon: Headset },
  { id: "tech", label: "Technician", sub: "Works the visit on site", icon: HardHat },
];

export function PortalSimulator() {
  const [tickets, setTickets] = useState<Ticket[]>(buildSeed);
  const [clock, setClock] = useState(0);
  const [role, setRole] = useState<Role>("manager");
  const [tab, setTab] = useState<ManagerTab>("requests");
  const [selectedId, setSelectedId] = useState("T-1042");
  const [me, setMe] = useState(TECHS[0]);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [phoneKey, setPhoneKey] = useState(0);
  const logId = useRef(1000);

  // action-panel form state
  const [pickTech, setPickTech] = useState(TECHS[0]);
  const [pickSlot, setPickSlot] = useState(SLOTS[0]);
  const [pickMaterials, setPickMaterials] = useState<string[]>([]);
  const [text, setText] = useState("");

  const stamp = () => fmtClock(clock);
  const bump = (m = 19) => setClock((c) => c + m);

  function act(id: string, patch: Partial<Ticket>, actor: LogEntry["actor"], kind: LogKind, msg: string) {
    const entry: LogEntry = { id: logId.current++, at: stamp(), actor, kind, text: msg };
    setTickets((all) => all.map((t) => (t.id === id ? { ...t, ...patch, log: [...t.log, entry] } : t)));
    bump();
    setText("");
    setPickMaterials([]);
  }

  function create(r: NewRequest) {
    const mineCount = tickets.filter((t) => t.mine).length;
    const id = `T-${1045 + mineCount}`;
    const t: Ticket = {
      id, property: r.property, priority: r.priority, status: "New Request", description: r.description,
      title: r.description.slice(0, 48) + (r.description.length > 48 ? "…" : ""), photo: r.photo, materials: [], mine: true,
      log: [{ id: logId.current++, at: stamp(), actor: "Property Manager", kind: "created", text: "Request submitted." + (r.photo ? " Photo attached." : "") }],
    };
    setTickets((all) => [t, ...all]);
    setSelectedId(id);
    setCreatedId(id);
    bump(6);
  }

  function reset() {
    setTickets(buildSeed());
    setClock(0); setRole("manager"); setTab("requests"); setSelectedId("T-1042"); setCreatedId(null);
    setPhoneKey((k) => k + 1); setText(""); setPickMaterials([]);
    logId.current = 1000;
  }

  const visible = useMemo(() => {
    if (role === "tech") return tickets.filter((t) => t.tech === me);
    if (role === "dispatch") return [...tickets].sort((a, b) => STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status));
    return tickets;
  }, [tickets, role, me]);
  const selected = visible.find((t) => t.id === selectedId) ?? visible[0];

  // guided walkthrough
  const mine = tickets.filter((t) => t.mine);
  const has = (k: LogKind) => mine.some((t) => t.log.some((l) => l.kind === k));
  const steps = [
    { done: mine.length > 0, label: "As the Property Manager, submit a request", go: () => { setRole("manager"); setTab("new"); } },
    { done: has("assigned") && has("scheduled"), label: "As Dispatch, assign a technician and schedule the visit", go: () => { setRole("dispatch"); } },
    { done: has("completed"), label: "As the Technician, start the work and mark it complete", go: () => { const t = mine.find((x) => x.tech); if (t?.tech) setMe(t.tech); setRole("tech"); } },
    { done: has("completed") && role === "manager" && tab === "requests", label: "Back as the Manager, read the full timeline and activity log", go: () => { setRole("manager"); setTab("requests"); } },
  ];
  const next = steps.find((s) => !s.done);

  const notices = tickets
    .flatMap((t) => t.log.filter((l) => l.actor !== "Property Manager" && l.kind !== "message" && l.kind !== "note" && l.id >= 1000).map((l) => ({ ...l, ticket: t.id })))
    .sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <div className="overflow-hidden rounded-md border border-navy-900/10 bg-white shadow-[0_30px_80px_-30px_rgba(10,18,36,0.35)]">
      {/* Chrome */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-navy-950 px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <span className="eyebrow rounded bg-signal px-2 py-0.5 text-navy-950">Sample data</span>
          <span className="eyebrow text-white/60">Concept simulation · {stamp()}</span>
        </div>
        <button onClick={reset} className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold hover:bg-white/10"><RotateCcw className="size-3.5" aria-hidden="true" /> Reset simulation</button>
      </div>

      {/* Role switcher */}
      <div role="tablist" aria-label="Simulation role" className="grid border-b border-line sm:grid-cols-3">
        {roles.map(({ id, label, sub, icon: Icon }) => (
          <button
            key={id} role="tab" aria-selected={role === id} onClick={() => setRole(id)}
            className={`flex items-center gap-3 border-b-2 px-5 py-4 text-left transition-colors sm:border-b-0 sm:border-t-2 ${role === id ? "border-signal bg-mist" : "border-transparent hover:bg-mist/60"}`}
          >
            <span className={`grid size-9 shrink-0 place-items-center rounded-md ${role === id ? "bg-navy-950 text-signal" : "bg-mist text-slate-ink"}`}><Icon className="size-4" aria-hidden="true" /></span>
            <span><span className="block text-sm font-semibold text-navy-900">{label}</span><span className="block text-xs text-slate-ink">{sub}</span></span>
          </button>
        ))}
      </div>

      {/* Guided walkthrough */}
      <div className="border-b border-line bg-mist px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow text-brand">Guided walkthrough</p>
          {next ? (
            <button onClick={next.go} className="rounded-md bg-navy-900 px-4 py-2 text-xs font-semibold text-white hover:bg-brand">Take me there →</button>
          ) : <p className="text-xs font-semibold text-emerald-700">You&rsquo;ve completed the full request lifecycle.</p>}
        </div>
        <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.label} className={`flex gap-3 rounded-md border p-3 text-xs leading-snug ${s.done ? "border-emerald-200 bg-emerald-50 text-emerald-800" : s === next ? "border-signal bg-white text-navy-900" : "border-line bg-white text-slate-ink"}`}>
              <span className={`grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${s.done ? "bg-emerald-600 text-white" : "bg-navy-900/10"}`}>{s.done ? <Check className="size-3" aria-hidden="true" /> : i + 1}</span>
              {s.label}
            </li>
          ))}
        </ol>
      </div>

      {/* Manager sub-tabs */}
      {role === "manager" && (
        <div role="tablist" aria-label="Manager sections" className="flex gap-1 border-b border-line px-4 pt-3">
          {([["requests", "Requests", ClipboardList], ["new", "New request", Send], ["properties", "Properties & records", Building2]] as const).map(([id, label, Icon]) => (
            <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`inline-flex items-center gap-2 rounded-t-md px-4 py-2.5 text-sm font-semibold ${tab === id ? "bg-navy-950 text-white" : "text-slate-ink hover:text-navy-900"}`}>
              <Icon className="size-4" aria-hidden="true" />{label}
            </button>
          ))}
        </div>
      )}

      <div className="p-4 sm:p-6">
        {role === "manager" && tab === "new" && (
          <RequestPhone key={phoneKey} createdId={createdId} onSubmit={(r) => { create(r); }} />
        )}

        {role === "manager" && tab === "properties" && <Properties tickets={tickets} />}

        {!(role === "manager" && tab !== "requests") && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
            {/* list */}
            <div>
              {role === "tech" && (
                <label className="mb-3 block text-xs font-semibold text-slate-ink">Signed in as
                  <select value={me} onChange={(e) => setMe(e.target.value)} className="mt-1 block w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-navy-900">
                    {TECHS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
              )}
              {role === "dispatch" && <p className="mb-3 text-xs text-slate-ink">Queue sorted by stage. Oldest stages first.</p>}
              <ul className="divide-y divide-line rounded-md border border-line" aria-label="Service requests (sample)">
                {visible.length === 0 && <li className="p-6 text-center text-sm text-slate-ink">No visits assigned to this technician yet. Switch to Dispatch and assign a request.</li>}
                {visible.map((t) => (
                  <li key={t.id}>
                    <button onClick={() => setSelectedId(t.id)} aria-current={t.id === selected?.id} className={`block w-full px-4 py-3 text-left transition-colors ${t.id === selected?.id ? "bg-brand/5" : "hover:bg-mist"}`}>
                      <span className="eyebrow block text-slate-ink">{t.id} · {t.property}{t.mine ? " · NEW" : ""}</span>
                      <span className="mt-0.5 block text-sm font-semibold text-navy-900">{t.title}</span>
                      <span className="mt-2 flex flex-wrap gap-2">
                        <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${priorityStyle[t.priority]}`}>{t.priority}</span>
                        <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${statusStyle(t.status)}`}>{t.status}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {role === "manager" && (
                <div className="mt-5 rounded-md bg-navy-950 p-4 text-white">
                  <p className="eyebrow flex items-center gap-2 text-signal"><Bell className="size-3.5" aria-hidden="true" /> Notifications · concept</p>
                  {notices.length === 0 ? (
                    <p className="mt-3 text-xs text-white/60">Updates you trigger as Dispatch or Technician will appear here, as the text or email a manager might receive.</p>
                  ) : (
                    <ul className="mt-3 space-y-3">
                      {notices.map((n) => <li key={n.id} className="text-xs leading-snug text-white/80"><span className="text-white/45">{n.at} · {n.ticket}</span><br />{n.text}</li>)}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* detail */}
            {selected ? (
              <Detail t={selected}>
                {role === "manager" && (
                  <form onSubmit={(e) => { e.preventDefault(); if (text.trim()) act(selected.id, {}, "Property Manager", "message", text.trim()); }} className="flex gap-2">
                    <label htmlFor="sim-msg" className="sr-only">Message to RNA Tek</label>
                    <input id="msg" value={text} onChange={(e) => setText(e.target.value)} placeholder="Message RNA Tek about this request…" className="min-w-0 flex-1 rounded-md border border-line px-3 py-2.5 text-sm focus:border-brand focus:outline-none" />
                    <button className="inline-flex items-center gap-2 rounded-md bg-navy-900 px-4 text-sm font-semibold text-white hover:bg-brand"><MessageSquare className="size-4" aria-hidden="true" /> Send</button>
                  </form>
                )}

                {role === "dispatch" && (
                  <DispatchActions
                    t={selected} pickTech={pickTech} setPickTech={setPickTech} pickSlot={pickSlot} setPickSlot={setPickSlot}
                    pickMaterials={pickMaterials} setPickMaterials={setPickMaterials}
                    onAssign={() => act(selected.id, { tech: pickTech, status: "Assigned" }, "Dispatch", "assigned", `Assigned to ${pickTech}.`)}
                    onSchedule={() => act(selected.id, { visit: pickSlot, status: "Scheduled" }, "Dispatch", "scheduled", `Visit scheduled: ${pickSlot}.`)}
                    onOrder={() => act(selected.id, { materials: pickMaterials, status: "Materials Ordered" }, "Dispatch", "materials", `Materials ordered: ${pickMaterials.join(", ")}.`)}
                    onReceived={() => act(selected.id, { status: "In Progress" }, "Dispatch", "received", "Materials received. Technician returning to site.")}
                  />
                )}

                {role === "tech" && (
                  <TechActions
                    t={selected} text={text} setText={setText} pickMaterials={pickMaterials} setPickMaterials={setPickMaterials}
                    onStart={() => act(selected.id, { status: "In Progress" }, "Technician", "started", "Arrived and started work on site.")}
                    onParts={() => act(selected.id, { materials: pickMaterials, status: "Materials Ordered" }, "Technician", "materials", `Parts needed: ${pickMaterials.join(", ")}. Dispatch notified.`)}
                    onNote={() => text.trim() && act(selected.id, {}, "Technician", "note", text.trim())}
                    onComplete={() => act(selected.id, { status: "Completed" }, "Technician", "completed", text.trim() ? `Work complete. ${text.trim()}` : "Work complete. Tested and verified.")}
                  />
                )}
              </Detail>
            ) : null}
          </div>
        )}
      </div>
      <p className="border-t border-line bg-mist px-5 py-3 text-xs text-slate-ink">Concept simulation with fictional properties, people, and times. No data is saved or sent, and no real notifications are delivered.</p>
    </div>
  );
}

function Detail({ t, children }: { t: Ticket; children: React.ReactNode }) {
  const idx = STATUSES.indexOf(t.status);
  return (
    <div className="min-w-0 rounded-md border border-line">
      <div className="border-b border-line p-5">
        <p className="eyebrow text-slate-ink">{t.id} · {t.property}</p>
        <h3 className="mt-1 text-xl font-semibold text-navy-900">{t.title}</h3>
        <p className="mt-2 text-sm text-slate-ink">{t.description}</p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <div><dt className="eyebrow text-slate-ink">Technician</dt><dd className="font-medium text-navy-900">{t.tech ?? "Not assigned yet"}</dd></div>
          <div><dt className="eyebrow text-slate-ink">Visit</dt><dd className="font-medium text-navy-900">{t.visit ?? "Not scheduled yet"}</dd></div>
          <div><dt className="eyebrow text-slate-ink">Materials</dt><dd className="font-medium text-navy-900">{t.materials.length ? t.materials.join(", ") : "None"}</dd></div>
        </dl>
        {t.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.photo} alt="Photo attached to the request" className="mt-4 h-32 w-auto rounded-md border border-line object-cover" />
        )}
      </div>

      <div className="bg-navy-950 p-5 text-white">
        <ol className="grid gap-3 sm:grid-cols-6 sm:gap-2">
          {STATUSES.map((s, i) => {
            const done = i < idx; const current = i === idx;
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

      <div className="border-b border-line p-5">{children}</div>

      <div className="p-5">
        <p className="eyebrow mb-4 text-brand">Activity log</p>
        <ol className="space-y-4 border-l-2 border-line pl-5">
          {[...t.log].reverse().map((l) => (
            <li key={l.id} className="relative">
              <span className={`absolute -left-[1.62rem] top-1.5 size-2.5 rounded-full ${l.actor === "Property Manager" ? "bg-brand" : l.actor === "Technician" ? "bg-signal" : "bg-navy-900"}`} aria-hidden="true" />
              <p className="text-xs text-slate-ink"><span className="font-semibold text-navy-900">{l.actor}</span> · {l.at}{l.kind === "message" ? " · message" : l.kind === "note" ? " · note" : ""}</p>
              <p className="text-sm text-navy-900">{l.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="rounded-md bg-mist p-3 text-sm text-slate-ink">{children}</p>;
}

function Choice({ options, value, onChange, name }: { options: string[]; value: string; onChange: (v: string) => void; name: string }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label={name}>
      {options.map((o) => (
        <label key={o} className={`cursor-pointer rounded-md border p-3 text-center text-xs font-semibold transition-colors ${value === o ? "border-brand bg-brand/5 text-brand" : "border-line text-navy-900 hover:border-brand/40"}`}>
          <input type="radio" name={name} checked={value === o} onChange={() => onChange(o)} className="sr-only" />{o}
        </label>
      ))}
    </div>
  );
}

function Materials({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-navy-900">Select materials</legend>
      <div className="flex flex-wrap gap-2">
        {MATERIALS.map((m) => {
          const on = value.includes(m);
          return (
            <label key={m} className={`cursor-pointer rounded-md border px-3 py-2 text-xs font-semibold transition-colors ${on ? "border-brand bg-brand/5 text-brand" : "border-line text-navy-900 hover:border-brand/40"}`}>
              <input type="checkbox" checked={on} onChange={() => onChange(on ? value.filter((v) => v !== m) : [...value, m])} className="sr-only" />{m}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

const primary = "rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-40";

function DispatchActions(p: {
  t: Ticket; pickTech: string; setPickTech: (v: string) => void; pickSlot: string; setPickSlot: (v: string) => void;
  pickMaterials: string[]; setPickMaterials: (v: string[]) => void;
  onAssign: () => void; onSchedule: () => void; onOrder: () => void; onReceived: () => void;
}) {
  const { t } = p;
  return (
    <div className="space-y-4">
      <p className="eyebrow flex items-center gap-2 text-brand"><Headset className="size-3.5" aria-hidden="true" /> Dispatch actions</p>
      {t.status === "New Request" && (<><Choice name="Technician" options={TECHS} value={p.pickTech} onChange={p.setPickTech} /><button className={primary} onClick={p.onAssign}>Assign technician</button></>)}
      {t.status === "Assigned" && (<><Choice name="Visit window" options={SLOTS} value={p.pickSlot} onChange={p.setPickSlot} /><button className={primary} onClick={p.onSchedule}>Schedule visit</button></>)}
      {t.status === "Scheduled" && (<><Hint>Visit is scheduled. If parts are already known, order them now. Otherwise the technician will start work or flag parts on site.</Hint><Materials value={p.pickMaterials} onChange={p.setPickMaterials} /><button className={primary} disabled={p.pickMaterials.length === 0} onClick={p.onOrder}>Order materials</button></>)}
      {t.status === "Materials Ordered" && (<><Hint>Waiting on: {t.materials.join(", ") || "materials"}.</Hint><button className={primary} onClick={p.onReceived}>Mark materials received</button></>)}
      {t.status === "In Progress" && <Hint>The technician is on site. Switch to the Technician role to continue.</Hint>}
      {t.status === "Completed" && <Hint>This request is complete. The manager can see the full history.</Hint>}
    </div>
  );
}

function TechActions(p: {
  t: Ticket; text: string; setText: (v: string) => void; pickMaterials: string[]; setPickMaterials: (v: string[]) => void;
  onStart: () => void; onParts: () => void; onNote: () => void; onComplete: () => void;
}) {
  const { t } = p;
  return (
    <div className="space-y-4">
      <p className="eyebrow flex items-center gap-2 text-brand"><Wrench className="size-3.5" aria-hidden="true" /> Technician actions</p>
      {t.status === "Scheduled" && (
        <>
          <button className={primary} onClick={p.onStart}>Start work on site</button>
          <div className="border-t border-line pt-4">
            <Materials value={p.pickMaterials} onChange={p.setPickMaterials} />
            <button className={`${primary} mt-3`} disabled={p.pickMaterials.length === 0} onClick={p.onParts}>Flag parts needed</button>
          </div>
        </>
      )}
      {t.status === "In Progress" && (
        <>
          <label htmlFor="work" className="block text-sm font-semibold text-navy-900">Work notes</label>
          <textarea id="work" value={p.text} onChange={(e) => p.setText(e.target.value)} rows={3} placeholder="e.g. Replaced the failed power supply and verified the camera feed." className="w-full resize-none rounded-md border border-line p-3 text-sm focus:border-brand focus:outline-none" />
          <div className="flex flex-wrap gap-2">
            <button className="rounded-md border border-navy-900/20 px-5 py-3 text-sm font-semibold text-navy-900 hover:border-brand hover:text-brand disabled:opacity-40" disabled={!p.text.trim()} onClick={p.onNote}>Add note to log</button>
            <button className={primary} onClick={p.onComplete}>Mark complete</button>
          </div>
        </>
      )}
      {t.status === "Materials Ordered" && <Hint>Waiting on materials. Dispatch will mark them received.</Hint>}
      {(t.status === "New Request" || t.status === "Assigned") && <Hint>Waiting on Dispatch to schedule the visit.</Hint>}
      {t.status === "Completed" && <Hint>Completed. Nothing further to do on this visit.</Hint>}
    </div>
  );
}

function Properties({ tickets }: { tickets: Ticket[] }) {
  return (
    <div>
      <p className="mb-5 max-w-2xl text-sm text-slate-ink">Concept: every property keeps a living record of its equipment and service history, so documentation stays with the building. Equipment lists below are fictional samples.</p>
      <ul className="grid gap-5 md:grid-cols-2">
        {PROPERTIES.map((p) => {
          const mine = tickets.filter((t) => t.property === p);
          const open = mine.filter((t) => t.status !== "Completed").length;
          const done = mine.filter((t) => t.status === "Completed");
          return (
            <li key={p} className="rounded-md border border-line p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-navy-900">{p}</h3>
                <span className="eyebrow rounded bg-mist px-2 py-1 text-slate-ink">{open} open · {done.length} done</span>
              </div>
              <p className="eyebrow mt-4 text-brand">Equipment on record</p>
              <ul className="mt-2 flex flex-wrap gap-2">{EQUIPMENT[p].map((e) => <li key={e} className="rounded-md bg-mist px-3 py-1 text-xs font-semibold text-slate-ink">{e}</li>)}</ul>
              <p className="eyebrow mt-4 text-brand">Service history</p>
              {done.length === 0 ? <p className="mt-2 text-sm text-slate-ink">No completed work yet.</p> : (
                <ul className="mt-2 space-y-1 text-sm text-navy-900">{done.map((t) => <li key={t.id}>{t.id} · {t.title}</li>)}</ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
