// Deterministic content for the /ai-guild presentation. No external calls; all data is fictional.
// Status vocabulary used everywhere:
//   Implemented = exists and works in this repository today
//   Simulated   = a stand-in that runs in the browser; no real system behind it
//   Planned     = proposed architecture; nothing built or connected

export const BRAND = "MoeTech";
export const DEMO_PATH = "/portal-preview#simulation";
export const DEMO_FLAG = "ai-guild:from-deck";
export const DISCLAIMER =
  "Independent personal project. Not affiliated with or endorsed by Sun Life. Fictional data only; no confidential information.";

export type Status3 = "Implemented" | "Simulated" | "Planned";
export type Slide = { id: string; title: string; seconds: number; notes: string[] };

export const SLIDES: Slide[] = [
  {
    id: "intro", title: "From Product Owner to Product Builder", seconds: 30,
    notes: [
      "Thesis: product ownership skills, enterprise API and integration experience, and AI-assisted development together let me architect and build a working prototype.",
      "Say plainly: personal project, fictional data, nothing from Sun Life.",
      "Three things to listen for: the architecture decisions, the API flow, and how Claude Code was used.",
    ],
  },
  {
    id: "problem", title: "The Business Problem", seconds: 40,
    notes: [
      "Fictional field service company. Requests, dispatch, field work, billing.",
      "Toggle fragmented, then connected. The goal is an end-to-end process, not another website.",
    ],
  },
  {
    id: "experience", title: "What Being a Lead Product Owner Taught Me About Building Software", seconds: 55,
    notes: [
      "Nine principles, each tied to a real decision in the app. Click three: Source-of-truth decisions, Acceptance criteria, Prioritization.",
      "Source of truth is the thread that runs through the rest of the talk.",
      "No Sun Life systems, APIs, or projects are described. These are skills, not artifacts.",
    ],
  },
  {
    id: "journey", title: "Building With Claude Code", seconds: 50,
    notes: [
      "Start on the example view: a business rule goes in, Claude Code produces components, I review and test it in the running app.",
      "Then the two-column split. Land the sentence: AI accelerates development; it does not replace engineering judgment.",
      "Be honest about the failure mode: generated code can look right and be wrong. Testing and review are mine.",
      "Optional: click the stage-by-stage tab if you have a spare ten seconds.",
    ],
  },
  {
    id: "stack", title: "The Actual Tech Stack", seconds: 50,
    notes: [
      "Everything here was read from package.json and the repository, not from the plan.",
      "Be direct: the front end is real and deployed. There is no backend, database, or authentication yet. The prototype keeps state in the browser.",
      "Click Backend, Database, Authentication to show the Planned cards. Click Next.js or Tailwind to show the evidence line.",
      "This honesty is the point: a prototype proves the workflow, and it tells us exactly what engineering must build.",
    ],
  },
  {
    id: "architecture", title: "System Architecture and Data Flow", seconds: 60,
    notes: [
      "Left: the three interfaces in the MoeTech web app, which exist today. Middle: the integration layer, which is planned. Right: Monday.com and QuickBooks, both planned.",
      "Point at the animated lines: requests flow out, webhooks flow back from Monday.com.",
      "Read the labels: Monday.com is the intended operational source of truth; QuickBooks is the financial system of record.",
      "Every integration on this diagram carries a Simulated or Planned label. None is a live connection.",
      "You can launch the working ticket lifecycle from this slide.",
    ],
  },
  {
    id: "ownership", title: "The Most Important Architecture Decision: Who Owns the Data?", seconds: 55,
    notes: [
      "Toggle between competing copies and one source of truth.",
      "Say it in one breath: interfaces present and request; Monday.com would own the operational record; QuickBooks owns accounting.",
      "Click two concerns, such as Idempotency and Reconciliation. Explain each in one sentence.",
      "Everything here is the intended design. Monday.com is not connected in the prototype.",
    ],
  },
  {
    id: "api", title: "API Walkthrough: Proposed Flow", seconds: 80,
    notes: [
      "Make clear before starting: this is a Proposed API Flow. The prototype does not call Monday.com or QuickBooks.",
      "Step through with Next step (or the period key). Ten steps; spend longer on steps 3, 4, 7 and 10.",
      "Show the JSON: validation at the boundary, an idempotency key on writes, a Monday item ID coming back, a webhook for changes made in Monday.",
      "QuickBooks only appears at the end, and only when billing applies.",
      "Fictional data throughout; the shapes are illustrative of the vendors' public API styles, not tested calls.",
    ],
  },
  {
    id: "demo", title: "Live Demo", seconds: 100,
    notes: [
      "Press Launch Live Demo. It opens the existing, working portal simulation, with a Return to Presentation bar.",
      "1. Manager submits. 2. Dispatch assigns and schedules. 3. Technician starts and completes. 4. Manager reads the timeline and activity log.",
      "Use the built-in guided walkthrough. Narrate which role can do what.",
      "Reminder: in the demo the ticket state is in browser memory. In the proposed design, that state would live in Monday.com.",
      "Fallback: press Reset simulation. The story works without the demo.",
    ],
  },
  {
    id: "lessons", title: "What Building Taught Me", seconds: 40,
    notes: [
      "Centerpiece. Slow down.",
      "Left: what I brought. Right: what only building taught me.",
      "Best line: a running prototype exposes missing requirements faster than a document.",
    ],
  },
  {
    id: "work", title: "What Could This Change About Product Delivery?", seconds: 20,
    notes: [
      "Pick two possibilities that fit this audience.",
      "Read the guardrail aloud: security review, governance, architecture standards, engineering validation still apply.",
    ],
  },
  {
    id: "closing", title: "Closing", seconds: 20,
    notes: [
      "Deliver the closing line slowly, then the supporting sentence.",
      "Two actions: Explore MoeTech (live portal) or View Architecture (jumps back).",
      "Invite questions. Stop on time.",
    ],
  },
];

export const TOTAL_SECONDS = SLIDES.reduce((n, s) => n + s.seconds, 0);
export const slideIndex = (id: string) => Math.max(0, SLIDES.findIndex((s) => s.id === id));
export const fmt = (s: number) => `${Math.floor(Math.abs(s) / 60)}:${String(Math.abs(s) % 60).padStart(2, "0")}`;

// ---- Problem ---------------------------------------------------------------
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

// ---- Product Owner principles ---------------------------------------------
export const SKILLS = [
  { id: "req", skill: "Requirements gathering", decision: "Three roles defined before any screen", detail: "I wrote down what a property manager, a dispatcher, and a technician each need to see and do before designing screens. That is why the app has three role views instead of one generic dashboard.", where: "Role switcher in the portal simulation" },
  { id: "story", skill: "User story development", decision: "Stories written per role", detail: "“As a technician, I only see tickets assigned to me.” “As dispatch, I can assign and schedule.” Stories like these became the permission rules in the role views.", where: "Technician view shows only that technician's tickets" },
  { id: "ac", skill: "Acceptance criteria", decision: "Observable behavior I can check", detail: "Given a ticket is Scheduled, when the technician starts work, then the status becomes In Progress and the activity log records who and when. Criteria this specific are also the best prompts for AI.", where: "Status stepper and activity log" },
  { id: "api", skill: "API and integration literacy", decision: "Contracts before vendors", detail: "Monday.com is a GraphQL API with webhooks; QuickBooks is a REST API with its own object model. I designed what each system receives and returns before deciding anything about code. None of it is connected yet.", where: "API walkthrough slide (proposed flow)" },
  { id: "e2e", skill: "End-to-end process mapping", decision: "One path from request to invoice", detail: "I mapped request, dispatch, field work, review, and billing as one path, and built the guided walkthrough to follow exactly that path.", where: "Guided walkthrough in the demo" },
  { id: "dep", skill: "System dependencies", decision: "One integration layer, no vendor calls from the UI", detail: "The interfaces depend on the integration layer, never on Monday.com or QuickBooks directly. Swapping a vendor then changes one layer, not three screens.", where: "Architecture slide" },
  { id: "sot", skill: "Source-of-truth decisions", decision: "Monday.com for operations, QuickBooks for money", detail: "One system owns each kind of record. Interfaces display and request; they do not keep competing copies of a ticket.", where: "Ownership slide" },
  { id: "prio", skill: "Prioritization", decision: "Build the loop, simulate the integrations", detail: "The request-to-completion loop came first because that is where the workflow questions are. Integrations are labeled Planned rather than faked as live.", where: "Implemented / Simulated / Planned labels" },
  { id: "val", skill: "Stakeholder validation", decision: "Demonstrate instead of describing", detail: "A clickable prototype lets business and technical people react to the same thing and surfaces disagreements about behavior early.", where: "This live demo" },
];

// ---- Claude Code / contribution split ---------------------------------------
export const JOURNEY = [
  { stage: "Business Problem", human: ["Identifies the problem", "Frames who is affected"], ai: ["Pressure-tests the framing with questions"] },
  { stage: "Discovery", human: ["Maps current-state handoffs", "Identifies the roles"], ai: ["Summarizes notes into draft journey maps for review"] },
  { stage: "Requirements", human: ["Defines business requirements", "Makes scope decisions"], ai: ["Drafts user stories and acceptance criteria for review"] },
  { stage: "Architecture", human: ["Decides data ownership", "Reviews technical tradeoffs"], ai: ["Proposes options and tradeoffs to evaluate"] },
  { stage: "AI-Assisted Coding", human: ["Directs with clear requirements", "Reviews every change"], ai: ["Scaffolds components", "Generates implementation code", "Accelerates UI iteration"] },
  { stage: "Testing", human: ["Validates expected behavior", "Decides what is good enough"], ai: ["Assists with debugging", "Suggests tests"] },
  { stage: "Working Prototype", human: ["Demonstrates to stakeholders", "Captures what it exposed"], ai: ["Helps polish and document"] },
];
export const MINE = ["Business understanding", "Requirements and acceptance criteria", "Architecture decisions", "Workflow design", "Prioritization", "Validation: does it behave as specified?"];
export const CLAUDE = ["Code generation", "Component development", "Debugging assistance", "Testing support", "Faster iteration on UI"];
export const REQ_EXAMPLE = {
  requirement: "A technician sees only the tickets assigned to them, and can start or complete only those.",
  produced: "Claude Code generated the role views and action panels in the simulator components.",
  review: "I reviewed the behavior in the running app against the acceptance criteria before keeping the change.",
};

// ---- Tech stack -------------------------------------------------------------
export type Tech = { id: string; name: string; status: Status3; role: string; evidence: string; detail: string; mark?: string };
export type StackGroup = { id: string; label: string; items: Tech[] };
export const STACK: StackGroup[] = [
  { id: "front", label: "Frontend", items: [
    { id: "next", name: "Next.js 16 (App Router)", mark: "next", status: "Implemented", role: "Application framework and routing", evidence: "package.json: next 16.4.0", detail: "Serves the marketing pages, the portal preview, and this presentation as separate routes. Static prerendering; no server runtime is used by the portal." },
    { id: "react", name: "React 19", mark: "react", status: "Implemented", role: "UI components and state", evidence: "package.json: react 19.3.0", detail: "All portal behavior (roles, tickets, the activity log) is React state in the browser." },
    { id: "ts", name: "TypeScript 5", mark: "ts", status: "Implemented", role: "Typed code", evidence: "package.json: typescript ^5", detail: "Ticket, status, and log types are defined once and shared across the portal components." },
  ]},
  { id: "ui", label: "UI and styling", items: [
    { id: "tw", name: "Tailwind CSS 4", mark: "tw", status: "Implemented", role: "Styling and design tokens", evidence: "package.json: tailwindcss ^4, @tailwindcss/turbopack", detail: "Custom design tokens in globals.css. There is no third-party component library; components are hand-built." },
    { id: "motion", name: "Motion + Lucide icons", status: "Implemented", role: "Animation and icons", evidence: "package.json: motion ^14.2.0, lucide-react ^1.57.0", detail: "Restrained transitions that respect reduced-motion settings; icons throughout." },
    { id: "fonts", name: "next/font (Google fonts)", status: "Implemented", role: "Typography", evidence: "src/app/layout.tsx: Manrope, Bricolage Grotesque, Geist Mono", detail: "Fonts are self-hosted at build time by Next.js." },
  ]},
  { id: "backend", label: "Backend, data, identity", items: [
    { id: "api", name: "Backend / API routes", status: "Planned", role: "Integration layer", evidence: "No route handlers or server actions exist in the repository", detail: "The proposed integration layer would validate requests and talk to Monday.com and QuickBooks. Not built." },
    { id: "db", name: "Database / persistence", status: "Planned", role: "Durable storage", evidence: "No database client or schema in the repository", detail: "Ticket state lives in browser memory and resets on reload. Under the proposed design the operational record would live in Monday.com." },
    { id: "auth", name: "Authentication", status: "Planned", role: "Identity and permissions", evidence: "No auth library or sessions; roles are a UI switcher", detail: "The role switcher simulates permissions. Real sign-in and authorization are not implemented." },
  ]},
  { id: "ops", label: "Hosting and delivery", items: [
    { id: "vercel", name: "Vercel", mark: "vercel", status: "Implemented", role: "Hosting and deployment", evidence: "vercel.json; live at moes-tech.vercel.app", detail: "Deployed from the GitHub repository. No environment variables are required." },
    { id: "gh", name: "GitHub", status: "Implemented", role: "Source control", evidence: "origin: github.com/wewebworks/MoesTech", detail: "Pushing to main triggers a deployment." },
    { id: "lint", name: "ESLint 9 + TypeScript checks", status: "Implemented", role: "Quality gates", evidence: "package.json: eslint ^9, eslint-config-next", detail: "Lint, type-check, and production build run clean. There is no automated test suite yet." },
  ]},
  { id: "int", label: "Integrations", items: [
    { id: "monday", name: "Monday.com", status: "Planned", role: "Intended operational source of truth", evidence: "No client code, keys, or API calls in the repository", detail: "Proposed. Mentioned only as future work on the portal page." },
    { id: "qb", name: "QuickBooks", status: "Planned", role: "Financial system of record", evidence: "No client code, keys, or API calls in the repository", detail: "Proposed. Would receive billable facts from completed tickets." },
    { id: "notify", name: "Notifications", status: "Simulated", role: "Text or email updates", evidence: "Portal shows a simulated notifications panel", detail: "The panel shows what a manager might receive. Nothing is sent." },
  ]},
  { id: "ai", label: "AI-assisted development", items: [
    { id: "claude", name: "Claude Code", status: "Implemented", role: "Requirements to implementation", evidence: "Used to build and iterate on this codebase (per the author)", detail: "No AI is called at runtime. There are no AI APIs in the application; AI was a development tool only." },
  ]},
];

// ---- Architecture diagram ---------------------------------------------------
export type ArchNode = { id: string; name: string; status: Status3; owns: string; responsibility: string; today: string };
export const ARCH: ArchNode[] = [
  { id: "pm", name: "Property Manager interface", status: "Implemented", owns: "Nothing. Displays and requests.", responsibility: "Submit a request, follow progress, read the timeline.", today: "Works in the browser with sample data." },
  { id: "dispatch", name: "Dispatch interface", status: "Implemented", owns: "Nothing. Acts through the rules.", responsibility: "Review, assign a technician, schedule visits, order materials.", today: "Works in the browser with sample data." },
  { id: "tech", name: "Technician interface", status: "Implemented", owns: "Nothing. Acts through the rules.", responsibility: "See assigned work, start it, document, complete.", today: "Works in the browser; sees only their own tickets." },
  { id: "layer", name: "Backend / API integration layer", status: "Planned", owns: "Validation, permissions, sync rules", responsibility: "Receives requests, validates payloads, enforces roles, writes to Monday.com, receives webhooks, hands billable facts to QuickBooks.", today: "Not built. Today the browser app plays this role against in-memory data." },
  { id: "monday", name: "Monday.com", status: "Planned", owns: "Tickets, assignment, schedule, status, technician notes", responsibility: "Operational source of truth: the one record of each work order.", today: "Not connected. Shown as a simulated integration." },
  { id: "qb", name: "QuickBooks", status: "Planned", owns: "Invoices and payments", responsibility: "Financial system of record. Receives billable facts when a ticket completes.", today: "Not connected. Shown as a simulated integration." },
];

// ---- Ownership --------------------------------------------------------------
export const OWNERSHIP_ROWS = [
  { record: "Ticket / work order", owner: "Monday.com", why: "One operational record" },
  { record: "Assignment and schedule", owner: "Monday.com", why: "Dispatch writes once" },
  { record: "Technician notes and completion", owner: "Monday.com", why: "Same record as the ticket" },
  { record: "Invoice and payment", owner: "QuickBooks", why: "Accounting stays accounting" },
  { record: "Validation and permissions", owner: "Integration layer", why: "Enforced in one place" },
  { record: "Screens and view state", owner: "MoeTech interfaces", why: "Specialized experiences" },
];
export const CONCERNS = [
  { name: "Data ownership", text: "Name one owner per record type, including who may change it. Everyone else reads or requests." },
  { name: "Consistency", text: "If two places keep a copy, they will drift. Keep one record and let interfaces read it, or accept eventual consistency deliberately." },
  { name: "API contracts", text: "Agree on fields, formats, and meanings before building. A contract lets teams work in parallel and makes changes reviewable." },
  { name: "Webhooks", text: "Changes made inside Monday.com must reach the app. A webhook pushes the event, so the app does not have to poll and guess." },
  { name: "Error handling", text: "Decide what happens when a call fails: retry with backoff, queue, alert, or show the user. Silent failure is the worst option." },
  { name: "Idempotency", text: "A retried request must not create a second work order. Writes carry a key; repeating the same key returns the first result." },
  { name: "Authentication and authorization", text: "Authentication says who is calling; authorization says what they may do. A technician must not do dispatch work. Not implemented in the prototype." },
  { name: "Audit trails", text: "Every change records who, what, and when. The prototype's activity log is a small version of this." },
  { name: "Reconciliation", text: "Periodically compare systems (tickets completed versus invoices issued) and surface mismatches before a person finds them." },
];

// ---- API walkthrough (Proposed API Flow) ------------------------------------
export type Lane = "ui" | "api" | "monday" | "qb";
export const LANES: { id: Lane; label: string; sub: string }[] = [
  { id: "ui", label: "MoeTech interfaces", sub: "Manager · Dispatch · Technician" },
  { id: "api", label: "Integration layer", sub: "Validates and syncs" },
  { id: "monday", label: "Monday.com", sub: "Operational truth" },
  { id: "qb", label: "QuickBooks", sub: "Financial record" },
];
export type ApiStep = { title: string; arrows: [Lane, Lane][]; label: string; request: string; response: string; note: string };
export const API_STEPS: ApiStep[] = [
  { title: "Property Manager creates a ticket", arrows: [["ui", "api"]], label: "POST /api/tickets",
    request: `POST /api/tickets
Idempotency-Key: 7f3c-sample-0001

{
  "property": "Maple Court Apartments",
  "priority": "High",
  "description": "Lobby camera shows no image."
}`,
    response: `// waiting for the integration layer...`,
    note: "The interface sends intent. It does not decide the ticket ID or status." },
  { title: "Backend receives the request", arrows: [["ui", "api"]], label: "authenticate + authorize",
    request: `// request context (sample)
{
  "requestId": "req_sample_8841",
  "caller": { "role": "property_manager", "propertyAccess": ["Maple Court Apartments"] }
}`,
    response: `{ "authenticated": true, "authorized": true }`,
    note: "Authentication and authorization happen before any business logic. Not implemented in the prototype." },
  { title: "Backend validates the payload", arrows: [["api", "api"]], label: "validate against contract",
    request: `// contract (sample)
{
  "property":    "one of the caller's properties",
  "priority":    "Low | Normal | High | Urgent",
  "description": "string, 1-500 chars"
}`,
    response: `{ "valid": true, "errors": [] }`,
    note: "Reject bad data at the boundary, with errors a person can act on." },
  { title: "Monday.com API creates the work order", arrows: [["api", "monday"]], label: "GraphQL: create_item",
    request: `mutation {
  create_item(
    board_id: 9000000001,
    item_name: "Lobby camera offline",
    column_values: "{\\"status\\":{\\"label\\":\\"New Request\\"}}"
  ) { id }
}`,
    response: `// waiting for Monday.com...`,
    note: "Proposed. Monday.com's API is GraphQL; the board and IDs here are fictional." },
  { title: "Monday.com returns an item ID", arrows: [["monday", "api"]], label: "item id",
    request: `// response from Monday.com (illustrative)`,
    response: `{
  "data": { "create_item": { "id": "5550001001" } }
}`,
    note: "The item ID becomes the permanent link between the ticket and its operational record." },
  { title: "MoeTech displays the ticket", arrows: [["api", "ui"]], label: "201 Created",
    request: `// response to the interface`,
    response: `HTTP 201
{
  "ticketId": "T-1045",
  "mondayItemId": "5550001001",
  "status": "New Request"
}`,
    note: "The interface shows what the source of truth says, not a private copy." },
  { title: "Dispatch assigns a technician", arrows: [["ui", "api"], ["api", "monday"]], label: "PATCH, then change_multiple_column_values",
    request: `PATCH /api/tickets/T-1045
Idempotency-Key: 7f3c-sample-0002

{
  "technicianId": "tech_sample_dana",
  "visit": "2026-03-12T09:00/11:00"
}`,
    response: `// layer forwards to Monday.com
{
  "status": "Scheduled",
  "assignee": "Dana (sample tech)",
  "mondayUpdated": true
}`,
    note: "The idempotency key means a retry cannot assign or schedule twice." },
  { title: "Technician completes the work", arrows: [["ui", "api"], ["api", "monday"]], label: "PATCH status: Completed",
    request: `PATCH /api/tickets/T-1045
Idempotency-Key: 7f3c-sample-0003

{
  "status": "Completed",
  "notes": "Replaced camera power supply."
}`,
    response: `{
  "status": "Completed",
  "auditEntry": "Technician \\u00b7 completed \\u00b7 2026-03-12T10:41Z"
}`,
    note: "The layer checks that this status change is a valid transition for this role." },
  { title: "Monday.com reflects the operational updates", arrows: [["monday", "api"], ["api", "ui"]], label: "webhook: update_column_value",
    request: `// webhook delivered to the integration layer (illustrative)
{
  "event": {
    "type": "update_column_value",
    "pulseId": 5550001001,
    "columnId": "status",
    "value": { "label": { "text": "Done" } }
  }
}`,
    response: `HTTP 200   // acknowledge quickly, process safely`,
    note: "Changes made directly in Monday.com flow back. This is why a webhook beats polling." },
  { title: "QuickBooks handles the financial transaction", arrows: [["api", "qb"]], label: "POST invoice (when billable)",
    request: `POST /v3/company/{realmId}/invoice

{
  "CustomerRef": { "value": "58" },
  "Line": [{
    "Amount": 180.00,
    "DetailType": "SalesItemLineDetail",
    "SalesItemLineDetail": { "ItemRef": { "value": "7" } }
  }],
  "PrivateNote": "Ticket T-1045 / Monday item 5550001001"
}`,
    response: `{ "Invoice": { "Id": "9001", "DocNumber": "1045", "TotalAmt": 180.00 } }`,
    note: "Only when billing applies. QuickBooks owns the invoice; the ticket carries a reference, not a copy." },
];

// ---- Demo / lessons / work ---------------------------------------------------
export const DEMO_STEPS = [
  { who: "Property Manager", what: "Submits a request for a faulty lobby camera" },
  { who: "Dispatch", what: "Reviews it, assigns a technician, schedules the visit" },
  { who: "Technician", what: "Starts the work and marks it complete" },
  { who: "Property Manager", what: "Reviews the timeline and activity log" },
];
export const BROUGHT = ["Product discovery", "API literacy", "User stories", "Workflow modeling", "Prioritization", "Stakeholder alignment"];
export const LEARNED = [
  "How architectural decisions affect implementation",
  "Why clear requirements improve AI output",
  "How integration complexity appears in practice",
  "Why testing matters even more with AI-generated code",
  "How quickly interactive prototypes can expose missing requirements",
  "How to communicate technical tradeoffs more effectively",
];
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
