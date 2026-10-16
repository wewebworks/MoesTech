// Shared SAMPLE data for the portal concept. Everything here is fictional demo content.

export const STATUSES = ["New Request", "Assigned", "Scheduled", "Materials Ordered", "In Progress", "Completed"] as const;
export type Status = (typeof STATUSES)[number];
export type Priority = "Low" | "Normal" | "High" | "Urgent";

export type LogKind = "created" | "assigned" | "scheduled" | "materials" | "received" | "started" | "completed" | "message" | "note";
export type LogEntry = { id: number; at: string; actor: "Property Manager" | "Dispatch" | "Technician" | "System"; kind: LogKind; text: string };

export type Ticket = {
  id: string;
  title: string;
  property: string;
  priority: Priority;
  status: Status;
  description: string;
  photo?: string;
  tech?: string;
  visit?: string;
  materials: string[];
  log: LogEntry[];
  mine?: boolean; // created during this session
};

export const PROPERTIES = ["Maple Court Apartments", "Harbor View Plaza", "Riverside Commons", "Oak Street Office Park"];

export const EQUIPMENT: Record<string, string[]> = {
  "Maple Court Apartments": ["Lobby camera", "Side-door badge reader", "Intercom entry panel", "Network closet rack"],
  "Harbor View Plaza": ["Intercom entry panel", "Parking gate controller", "Garage cameras (6)", "Core switch"],
  "Riverside Commons": ["Gate keypad", "Pool-area cameras (4)", "Clubhouse access reader", "Wi-Fi access points (8)"],
  "Oak Street Office Park": ["Suite 204 access point", "Reception phone system", "Front-door reader", "Network cabinet"],
};

export const TECHS = ["Dana (sample tech)", "Marcus (sample tech)", "Priya (sample tech)"];
export const SLOTS = ["Thu 9:00 AM – 11:00 AM", "Thu 1:00 PM – 3:00 PM", "Fri 8:00 AM – 10:00 AM"];
export const MATERIALS = ["Replacement camera", "Network switch", "Keypad / card reader", "Cabling & connectors", "Power supply"];

export const priorityStyle: Record<Priority, string> = {
  Low: "bg-slate-100 text-slate-600",
  Normal: "bg-sky-100 text-sky-700",
  High: "bg-amber-100 text-amber-700",
  Urgent: "bg-rose-100 text-rose-700",
};

export const statusStyle = (s: Status) =>
  s === "Completed" ? "bg-emerald-100 text-emerald-700"
  : s === "In Progress" ? "bg-brand/10 text-brand"
  : s === "Materials Ordered" ? "bg-amber-100 text-amber-700"
  : s === "Scheduled" ? "bg-violet-100 text-violet-700"
  : "bg-slate-100 text-slate-600";

export const SAMPLE_PHOTO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 200'><rect width='320' height='200' fill='#14213d'/><rect x='110' y='50' width='100' height='100' rx='8' fill='#0a1224' stroke='#ffc72c'/><circle cx='160' cy='100' r='26' fill='none' stroke='#ffc72c' stroke-width='3'/><circle cx='160' cy='100' r='9' fill='#ffc72c'/><text x='160' y='180' font-family='monospace' font-size='11' fill='#ffc72c' text-anchor='middle'>SAMPLE PHOTO</text></svg>",
  );

// ---- simulated clock -------------------------------------------------------
export function fmtClock(minutes: number) {
  const base = 9 * 60 + 12 + minutes; // Wednesday, 9:12 AM
  const day = ["Wed", "Thu", "Fri"][Math.min(2, Math.floor(base / (24 * 60)))];
  const m = base % (24 * 60);
  const h = Math.floor(m / 60);
  const mm = String(m % 60).padStart(2, "0");
  return `${day} ${((h + 11) % 12) + 1}:${mm} ${h >= 12 ? "PM" : "AM"}`;
}

// ---- seed ------------------------------------------------------------------
type Seed = Omit<Ticket, "log" | "materials"> & { materials?: string[] };

const seeds: Seed[] = [
  { id: "T-1044", title: "Wi-Fi dead zone in suite 204", property: "Oak Street Office Park", priority: "Normal", status: "Assigned", description: "Tenant in suite 204 reports no Wi-Fi past the front desk.", tech: TECHS[2] },
  { id: "T-1042", title: "Lobby camera offline", property: "Maple Court Apartments", priority: "High", status: "In Progress", description: "Lobby camera shows no image since this morning.", tech: TECHS[0], visit: SLOTS[0] },
  { id: "T-1041", title: "Intercom panel not ringing units", property: "Harbor View Plaza", priority: "High", status: "Scheduled", description: "Visitors cannot reach residents from the entry panel.", tech: TECHS[1], visit: SLOTS[1] },
  { id: "T-1039", title: "Gate keypad replacement", property: "Riverside Commons", priority: "Normal", status: "Materials Ordered", description: "Keypad buttons are worn and unresponsive.", tech: TECHS[1], visit: SLOTS[2], materials: ["Keypad / card reader"] },
  { id: "T-1036", title: "Add badge reader at side door", property: "Maple Court Apartments", priority: "Low", status: "Completed", description: "Add a badge reader to the side door.", tech: TECHS[0], visit: SLOTS[0] },
];

export function buildSeed(): Ticket[] {
  let n = 0;
  return seeds.map((s) => {
    const idx = STATUSES.indexOf(s.status);
    const log: LogEntry[] = [];
    const push = (actor: LogEntry["actor"], kind: LogKind, text: string) =>
      log.push({ id: n++, at: `Mon ${9 + log.length}:${log.length % 2 ? "40" : "05"} AM`, actor, kind, text });
    push("Property Manager", "created", "Request submitted.");
    if (idx >= 1) push("Dispatch", "assigned", `Assigned to ${s.tech}.`);
    if (idx >= 2) push("Dispatch", "scheduled", `Visit scheduled: ${s.visit ?? SLOTS[0]}.`);
    if (idx >= 3 && s.materials?.length) push("Dispatch", "materials", `Materials ordered: ${s.materials.join(", ")}.`);
    if (idx >= 4) push("Technician", "started", "Work started on site.");
    if (idx >= 5) push("Technician", "completed", "Work complete. Tested and verified.");
    return { ...s, materials: s.materials ?? [], log };
  });
}
