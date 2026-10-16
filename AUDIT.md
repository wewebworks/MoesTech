# MoeTech `/ai-guild` — Implementation Audit

Scope: what is in this repository, what is author-reported, and what the presentation claims. Verified against `package.json`, the source tree, and a browser run. Nothing here is a verified live connection to an external system.

**Evidence labels.** *Repository-verified* = read from this code. *Author-reported* = stated by the author about the beta product; not present in or checkable from this repository.

## 1. Project status (author-reported)

Live with test clients and about 90% complete. The deck says so on the Tech Stack slide. This repository is the front end plus a sample-data demo; it is not the full live system, so the deck labels live-system facts as author-reported.

## 2. Technologies actually used

| Area | Technology | Evidence |
| --- | --- | --- |
| Framework | Next.js 16.4.0 (App Router, Turbopack, Cache Components) | repository-verified: `package.json`, `next.config.ts` |
| UI | React 19.3.0, TypeScript 5 | repository-verified |
| Styling | Tailwind CSS 4, custom tokens in `globals.css` (blue and yellow palette; no logos or marks) | repository-verified |
| Animation / icons | Motion 14.2, lucide-react 1.57 | repository-verified |
| Fonts | Manrope, Bricolage Grotesque, Geist Mono via `next/font/google` | repository-verified |
| Quality gates | ESLint 9, `tsc --noEmit`, `next build` | repository-verified |
| Hosting | Vercel, live at `moes-tech.vercel.app` | repository-verified (`vercel.json`, HTTP 200) |
| Backend / API layer | Validates, enforces roles, syncs with Monday.com | **author-reported**; no route handlers in this repository |
| Source of truth | Monday.com | **author-reported** |
| Photo documentation | Native: photos attach to the ticket, replacing a separate photo app such as CompanyCam | repository-verified for photo attach on requests; technician-side capture **author-reported** |
| Billing | QuickBooks reads from and writes to Monday.com | **author-reported** |
| AI-assisted development | Claude Code | **author-reported** |

Not present in this repository: component library, route handlers or server actions, database or ORM, authentication library, SDKs or API calls for Monday.com or QuickBooks, environment variables, automated tests, any runtime AI call.

## 3. APIs actually connected from this repository

**None.** No `fetch` calls to external services, no keys, no SDKs. The live demo never calls Monday.com or QuickBooks.

## 4. Mocked / simulated in the demo

- Ticket state, roles, and the activity log: React state in the browser. Resets on reload; nothing persists.
- Roles: a UI switcher that limits visible actions. Not authentication or authorization.
- Monday.com and QuickBooks in the architecture diagram: labeled "Simulated Integration".
- Notifications: a simulated panel. Nothing is sent.
- The API walkthrough: "Proposed API Flow", illustrative, fictional data. Request/response shapes follow the general style of the vendors' public APIs and were **not** executed or validated against them. The final step shows QuickBooks reading from and writing back to Monday.com, so no custom billing call is made from MoeTech.

## 5. Not claimed

Authentication and a separate database are not claimed for the beta. Under the author-reported design, Monday.com is the data store, so there is no competing database.

## 6. Live demo steps

Run end to end in a browser against the production build (`/portal-preview#simulation`) with the built-in guided walkthrough:

| Step | Result |
| --- | --- |
| Manager submits a request | Works. Ticket T-1045 created. |
| Dispatch assigns a technician | Works. Activity log updated. |
| Dispatch schedules the visit | Works. |
| Technician starts work, marks complete | Works. |
| Manager reviews timeline and log | Works. Walkthrough reports the full lifecycle completed. |
| Launch from deck, Return to Presentation | Works. Returns to the launching slide. |

All steps are fully functional **as a client-side simulation** on sample data.

## 7. Presentation checks

- `npm run lint`, `npx tsc --noEmit`, `npm run build`: clean.
- 12 slides: arrow keys, `Home`/`End`, `1`–`9`, hash deep links. At 1280×720 each slide fits without scrolling. API walkthrough steps with `.` and `,`. Presenter view syncs with the deck over BroadcastChannel.
- Time budget: 600 seconds across 12 slides (`SLIDES` in `src/components/guild/content.ts`).
- Not tested: projector, Safari/Firefox, screen readers; there is no automated test suite.

## 8. Branding

All pages, metadata, and the logo are MoeTech. No other company names, real addresses, phone numbers, or social links remain; the contact email is a placeholder (`hello@moetech.example`). The color palette is blue and yellow; no logos, marks, or Sun Life assets are used, and the deck states it is not affiliated with or endorsed by Sun Life.

## 9. Known caveats

- Technology marks on the Tech Stack slide are simplified original glyphs, not official logos.
- Git history before the rebrand still contains earlier company text and logo images.
