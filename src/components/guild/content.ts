// Deterministic content for the /ai-guild presentation. No external calls; all data is fictional.

export const BRAND = "MoeTech";
export const DEMO_PATH = "/portal-preview#simulation";
export const DEMO_FLAG = "ai-guild:from-deck";
export const DISCLAIMER =
  "Independent personal project. Not affiliated with or endorsed by Sun Life. Fictional data only; no confidential information.";

export type Slide = { id: string; title: string; seconds: number; notes: string[] };

export const SLIDES: Slide[] = [
  {
    id: "intro", title: "From Product Owner to Product Builder", seconds: 45,
    notes: [
      "Open with the thesis: I did not become a developer overnight. I used product ownership skills to direct AI and build a working prototype.",
      "Point out the animated preview: a ticket moving through its lifecycle. This is the real app, shown in miniature.",
      "Say plainly: personal project, fictional data, nothing from Sun Life.",
      "Three ideas to listen for: PO foundation, AI-accelerated build, lessons I can bring back.",
    ],
  },
  {
    id: "problem", title: "The Business Problem", seconds: 60,
    notes: [
      "Fictional field service company. Property managers request work, dispatch assigns, technicians do it, billing follows.",
      "Click through the fragmented view: every handoff is a person re-typing or chasing information.",
      "Toggle to the connected view. Stress: the goal is an end-to-end process, not another website.",
      "Ask the room: where do you see this pattern in your own work?",
    ],
  },
  {
    id: "experience", title: "What My Experience at Sun Life Taught Me", seconds: 80,
    notes: [
      "Spend your time on three cards: Stakeholder discovery, Requirements, API thinking. Mention the others briefly.",
      "Each card ends in a concrete design decision in the app, not a slogan.",
      "Requirements example: the ticket lifecycle was defined first (six statuses, valid transitions) before any screen.",
      "API example: decide which system owns each record, then how updates flow.",
      "Reminder: no affiliation implied; these are skills, not Sun Life artifacts.",
    ],
  },
  {
    id: "journey", title: "From Idea to Application", seconds: 70,
    notes: [
      "Walk left to right. For each stage, click it and read one Human item and one AI item.",
      "Key line: AI-generated code is a draft. Every output was reviewed, run, and corrected.",
      "Give one honest example of AI getting something wrong and what review caught (use your own real example).",
    ],
  },
  {
    id: "architecture", title: "Architecture and APIs", seconds: 80,
    notes: [
      "Left side is the flow that exists today as an in-browser prototype. Right side is proposed and clearly labeled.",
      "Click Ticket and Workflow State: this is the source of truth. Everything else reads from or writes to it.",
      "Click two integrations (Monday.com, QuickBooks). Say: planned, not built. The value is deciding ownership before coding.",
      "Run through the seven concerns quickly; pick source of truth and audit history to dwell on.",
    ],
  },
  {
    id: "demo", title: "Live Demo", seconds: 150,
    notes: [
      "Press Launch Live Demo. It opens the real portal simulation with a Return to Presentation bar at the bottom.",
      "1. Manager: submit a request. 2. Dispatch: assign and schedule. 3. Technician: start and complete. 4. Manager: read the timeline and activity log.",
      "Use the built-in guided walkthrough (Take me there). Narrate who can do what: each role has its own actions.",
      "Fallback if anything misbehaves: press Reset simulation, or return and continue; the story works without the demo.",
      "Return with the bar at the bottom or browser back; the deck resumes on this slide.",
    ],
  },
  {
    id: "lessons", title: "What Building Taught Me", seconds: 55,
    notes: [
      "This is the centerpiece. Slow down.",
      "Left: what I brought. Right: what I only learned by building.",
      "Best line: clear requirements produce better AI output, and a running prototype exposes missing requirements faster than a document.",
      "Testing matters more with AI-generated code, not less.",
    ],
  },
  {
    id: "work", title: "What Could This Change About Product Delivery?", seconds: 35,
    notes: [
      "Practical possibilities, not promises. Pick two that fit this audience.",
      "Read the guardrail statement aloud: security review, governance, architecture standards, engineering validation still apply.",
    ],
  },
  {
    id: "closing", title: "Closing", seconds: 25,
    notes: [
      "Deliver the closing line slowly, then the supporting sentence.",
      "Offer the two actions: Explore MoeTech (live portal) or View Architecture (jump back).",
      "Invite questions. Stop on time.",
    ],
  },
];

export const TOTAL_SECONDS = SLIDES.reduce((n, s) => n + s.seconds, 0);

export const fmt = (s: number) => `${Math.floor(Math.abs(s) / 60)}:${String(Math.abs(s) % 60).padStart(2, "0")}`;

// ---- Section 2 -------------------------------------------------------------
export const FRAGMENTED = [
  { label: "Property manager", note: "Calls or emails a request" },
  { label: "Inbox & phone", note: "Details live in threads" },
  { label: "Spreadsheet", note: "Someone re-types it" },
  { label: "Dispatch board", note: "Assigned by hand" },
  { label: "Field notes", note: "Photos and notes in texts" },
  { label: "Billing", note: "Rebuilt from memory" },
];
export const CONNECTED = [
  { label: "Request", note: "One record, structured" },
  { label: "Assign & schedule", note: "Dispatch acts on the record" },
  { label: "Work & document", note: "Technician updates the same record" },
  { label: "Review & bill", note: "Timeline feeds billing" },
];

// ---- Section 3 -------------------------------------------------------------
export const SKILLS = [
  { id: "discovery", skill: "Stakeholder discovery", decision: "Three roles before any screen", detail: "I worked out what the property manager, the dispatcher, and the technician each need to see and do before designing a single screen. The result is three role views in one simulation, each with only its own actions.", where: "Role switcher in the portal simulation" },
  { id: "journey", skill: "User journey mapping", decision: "One request, followed end to end", detail: "I mapped a request from submission to completed work and review, and made the guided walkthrough follow exactly that path.", where: "Guided walkthrough: submit, assign, complete, review" },
  { id: "requirements", skill: "Requirements and acceptance criteria", decision: "Lifecycle and valid transitions first", detail: "Six statuses and the rules for moving between them were defined before the workflow was implemented. Acceptance criteria were phrased as observable behavior I could check in the running app.", where: "Status stepper and role-restricted actions" },
  { id: "api", skill: "API and system integration thinking", decision: "Which system owns each record", detail: "For every record, decide the system of record and how updates flow. Tickets are owned by the service app; invoices would be owned by accounting; a board in a work-management tool would be a view, not the truth.", where: "Architecture slide: source of truth and data ownership" },
  { id: "mvp", skill: "Prioritization and MVP definition", decision: "Simulate integrations, build the core flow", detail: "Integrations are labeled planned. The MVP is the request-to-completion loop with an activity log, because that is where the business value and the open questions are.", where: "Implemented / simulated / planned labels" },
  { id: "delivery", skill: "Cross-functional delivery and validation", decision: "Demonstrate, don't only document", detail: "A clickable prototype lets business and technical people react to the same thing, and surfaces disagreements about behavior early.", where: "This live demo" },
];

// ---- Section 4 -------------------------------------------------------------
export const JOURNEY = [
  { stage: "Business Problem", human: ["Identifies the problem", "Frames who is hurt and why"], ai: ["Helps pressure-test the framing with questions"] },
  { stage: "Discovery", human: ["Interviews roles in the workflow", "Maps current-state handoffs"], ai: ["Summarizes notes and drafts journey maps for review"] },
  { stage: "Requirements", human: ["Defines business requirements", "Makes product decisions on scope"], ai: ["Drafts user stories and acceptance criteria for review"] },
  { stage: "Architecture", human: ["Reviews technical tradeoffs", "Decides data ownership"], ai: ["Proposes options and tradeoffs to evaluate"] },
  { stage: "AI-Assisted Coding", human: ["Directs with clear requirements", "Reviews every change"], ai: ["Helps scaffold components", "Generates implementation code", "Accelerates UI iteration"] },
  { stage: "Testing", human: ["Validates expected behavior", "Decides what is good enough"], ai: ["Assists with debugging", "Suggests tests"] },
  { stage: "Working Prototype", human: ["Demonstrates to stakeholders", "Captures what the prototype exposed"], ai: ["Helps polish and document"] },
];

// ---- Section 5 -------------------------------------------------------------
export type Status3 = "Implemented" | "Simulated" | "Planned";
export type ArchNode = {
  id: string; name: string; status: Status3; group: "core" | "external";
  responsibility: string; owns: string; talksTo: string;
};
export const ARCH: ArchNode[] = [
  { id: "pm", name: "Property Manager Portal", status: "Implemented", group: "core", responsibility: "Where a property manager submits requests and follows progress.", owns: "Nothing. It displays and submits.", talksTo: "Service Management Application" },
  { id: "app", name: "Service Management Application", status: "Implemented", group: "core", responsibility: "Enforces roles and workflow rules. Decides who may do what, and when.", owns: "Business rules and permissions", talksTo: "Ticket and Workflow State" },
  { id: "state", name: "Ticket and Workflow State", status: "Simulated", group: "core", responsibility: "The source of truth for each ticket: status, assignment, schedule, materials, activity log. In the prototype this lives in browser memory; production would need a database.", owns: "Tickets, statuses, history", talksTo: "Dispatch, technician, and external systems" },
  { id: "dispatch", name: "Dispatch and Technician Interfaces", status: "Implemented", group: "core", responsibility: "Dispatch assigns, schedules, and orders materials. Technicians start and complete work. Each role sees only its own actions.", owns: "Nothing. They change ticket state through the rules.", talksTo: "Ticket and Workflow State" },
  { id: "monday", name: "Monday.com", status: "Planned", group: "external", responsibility: "Would give the office a board view of work. A view of the ticket, never the source of truth.", owns: "Board layout only", talksTo: "Status sync from ticket state" },
  { id: "qb", name: "QuickBooks", status: "Planned", group: "external", responsibility: "Would own invoices and payments. Completed tickets would hand off the billable facts.", owns: "Invoices, payments", talksTo: "Receives completed-work data" },
  { id: "notify", name: "Notifications", status: "Simulated", group: "external", responsibility: "Text or email updates to the manager. The prototype shows a simulated panel; nothing is delivered.", owns: "Delivery, not content", talksTo: "Triggered by status changes" },
  { id: "web", name: "Customer website", status: "Planned", group: "external", responsibility: "The public marketing site would link to the portal sign-in. The two stay separate products.", owns: "Public content", talksTo: "Links to the portal" },
];

export const CONCERNS = [
  { name: "Source of truth", text: "One system owns each record. Others copy or display it. Without this, two systems disagree and nobody knows which is right." },
  { name: "API contracts", text: "Agree on fields, formats, and meanings before building. A contract is what lets two teams work independently." },
  { name: "Data ownership", text: "Name an accountable owner per record type, including who may change it." },
  { name: "Authentication", text: "Know who is calling. Roles map to permissions, so a technician cannot do dispatch work. Not implemented in the prototype." },
  { name: "Status synchronization", text: "When the ticket status changes, downstream systems must follow, in order, and be correct after a failure." },
  { name: "Error handling", text: "Decide what happens when a call fails: retry, queue, alert, or show the user. Silent failure is the worst option." },
  { name: "Audit history", text: "Every change records who, what, and when. The prototype's activity log is a small version of this." },
];

// ---- Section 6 -------------------------------------------------------------
export const DEMO_STEPS = [
  { who: "Property Manager", what: "Submits a request for a faulty lobby camera" },
  { who: "Dispatch", what: "Reviews it, assigns a technician, schedules the visit" },
  { who: "Technician", what: "Starts the work and marks it complete" },
  { who: "Property Manager", what: "Reviews the timeline and activity log" },
];

// ---- Section 7 -------------------------------------------------------------
export const BROUGHT = ["Product discovery", "API literacy", "User stories", "Workflow modeling", "Prioritization", "Stakeholder alignment"];
export const LEARNED = [
  "How architectural decisions affect implementation",
  "Why clear requirements improve AI output",
  "How integration complexity appears in practice",
  "Why testing matters even more with AI-generated code",
  "How quickly interactive prototypes can expose missing requirements",
  "How to communicate technical tradeoffs more effectively",
];

// ---- Section 8 -------------------------------------------------------------
export const POSSIBILITIES = [
  "Prototype ideas before committing to full implementation.",
  "Validate user journeys earlier.",
  "Demonstrate requirements instead of only documenting them.",
  "Improve collaboration between business and technology.",
  "Identify missing acceptance criteria through interactive testing.",
  "Accelerate experimentation within approved enterprise guardrails.",
];
export const GUARDRAIL =
  "A prototype is not a product. Enterprise development still requires security reviews, governance, architecture standards, and engineering validation.";
