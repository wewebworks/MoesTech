# MoeTech `/ai-guild` — Implementation Audit

Scope: what is actually in this repository and what the presentation claims about it. Verified against `package.json`, the source tree, and a browser run of the app. Nothing here is a verified live connection to an external system.

## 1. Technologies actually used

| Area | Technology | Evidence |
| --- | --- | --- |
| Framework | Next.js 16.4.0 (App Router, Turbopack, Cache Components enabled) | `package.json`, `next.config.ts` |
| UI | React 19.3.0 | `package.json` |
| Language | TypeScript 5 | `package.json`, `tsconfig.json` |
| Styling | Tailwind CSS 4 via `@tailwindcss/turbopack`, custom tokens in `globals.css` | `package.json`, `src/app/globals.css` |
| Animation / icons | Motion 14.2, lucide-react 1.57 | `package.json` |
| Fonts | Manrope, Bricolage Grotesque, Geist Mono via `next/font/google` | `src/app/layout.tsx` |
| Quality gates | ESLint 9 + `eslint-config-next`, `tsc --noEmit`, `next build` | `package.json` |
| Hosting | Vercel (`vercel.json`), live at `moes-tech.vercel.app` | `vercel.json`, HTTP 200 on `/ai-guild` |
| Source control | GitHub `wewebworks/MoesTech` | git remote |
| AI-assisted development | Claude Code (stated by the author; not detectable from code) | author statement |

Not present: component library (components are hand-built), backend framework, API routes or server actions, database or ORM, authentication library, payment or email SDKs, environment variables, automated test suite, any runtime AI/LLM call.

## 2. APIs actually connected

**None.** The repository contains no `fetch` calls to external services, no API keys, no route handlers, and no SDKs for Monday.com or QuickBooks. The only network activity is the Next.js app itself and Google Fonts at build time.

## 3. Mocked / simulated interactions

- Ticket state, roles, and the activity log: React state in the browser (`src/components/portal/*`). Resets on reload. No persistence.
- Roles (Manager, Dispatch, Technician): a UI switcher. It limits which actions are shown; it is not authentication or authorization.
- Notifications: a simulated panel that shows what a manager might receive. Nothing is sent.
- Presentation labels: every Monday.com / QuickBooks element in the architecture diagram carries a "Simulated Integration" label; the API walkthrough is labeled "Proposed API Flow" and "Planned".
- The JSON in the walkthrough is illustrative and fictional. Monday.com request/webhook shapes and QuickBooks invoice shapes follow the general style of those public APIs but were **not executed or validated against the vendors**.

## 4. Planned (not built)

Backend / API integration layer, Monday.com integration (source of operational records), QuickBooks integration (invoices), database or durable storage, authentication and authorization, real notifications, customer-website sign-in link. The idempotency, webhook, reconciliation, and audit-trail discussion describes intended design only.

## 5. Live demo steps

Run end to end in a browser against the production build (`/portal-preview#simulation`), using the built-in guided walkthrough:

| Step | Result |
| --- | --- |
| Manager submits a request (property, sample photo, description, priority) | Works. Ticket T-1045 created. |
| Dispatch assigns a technician | Works. Log: "Assigned to Dana (sample tech)." |
| Dispatch schedules the visit | Works. Log: "Visit scheduled: Thu 9:00 AM – 11:00 AM." |
| Technician starts work, then marks complete | Works. |
| Manager reviews timeline and log | Works. Walkthrough reports "completed the full request lifecycle." |
| Launch from deck, Return to Presentation | Works. Returns to the slide that launched it (`/ai-guild#N`). |

All steps are fully functional **as a client-side simulation**. None involve a server or an external system.

## 6. Presentation checks performed

- `npm run lint`, `npx tsc --noEmit`, `npm run build`: clean.
- 12 slides reachable by arrow keys, `Home`/`End`, and `1`–`9`; hash deep links (`/ai-guild#6`) work.
- At 1280×720 every slide fits without scrolling (rem scales on short desktop screens); at 375×812 there is no horizontal overflow (checked on the earlier 9-slide version).
- API walkthrough: 10 steps advance with the button and the `.` / `,` keys.
- Presenter view (`/ai-guild/presenter`): notes, timer, and per-slide targets; slide sync with the deck over BroadcastChannel (verified in the previous revision; sync code unchanged).
- Talk time budget: 600 seconds across 12 slides (see `SLIDES` in `src/components/guild/content.ts`).

Not tested: real projector, Safari/Firefox, screen readers, any automated test suite (none exists).

## 7. Known caveats

- The portal pages themselves are still branded "RNA Tek" and the page `<title>` says so. The presentation uses "MoeTech". Check this before presenting to a Sun Life audience.
- Technology marks on the Tech Stack slide are simplified original glyphs, not official logos.
