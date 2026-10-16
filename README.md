# MoeTech

MoeTech is a fictional field-service company used to demonstrate one connected workflow, from service request to completed work, plus an interactive AI Guild presentation at `/ai-guild`. Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide.

## Run
    npm install
    npm run dev        # http://localhost:3000
    npm run lint && npx tsc --noEmit && npm run build

## Deploy
Push to the project's GitHub repository; Vercel imports it (framework: Next.js, no env vars). Optional: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ALLOW_INDEXING=true` (indexing is off by default).

## Content integrity
- MoeTech is fictional. All people, properties, tickets, and statuses are sample data.
- No real company names, addresses, phone numbers, or social links. The contact email is a placeholder on a reserved domain (`.example`).
- Portal preview (`/portal-preview`) is client-side only: no backend, and no Monday.com, QuickBooks, or Supabase connection.
- Contact form validates only and tells the user nothing was sent.
- Imagery is original SVG illustration.

## AI Guild presentation (`/ai-guild`)
A full-screen, 10-minute interactive talk, separate from the marketing site (no site header or footer).
- `/ai-guild` — the deck (9 sections). `/ai-guild/presenter` — presenter notes, per-slide timing, timer; stays in sync with the deck via BroadcastChannel (same browser).
- Keys: ← → / PageUp / PageDown navigate, `1`–`9` jump, `Home`/`End`, `F` full screen, `P` opens the presenter window, `Space` next.
- Slide position is the URL hash (`/ai-guild#6`), so refresh and return-from-demo land on the right slide.
- **Launch Live Demo** opens `/portal-preview#simulation` (the unchanged portal). A "Return to Presentation" bar appears only when arriving from the deck (sessionStorage flag).
- Content, notes, and timings live in `src/components/guild/content.ts`. Branding string: `BRAND` there ("MoeTech").
- Structure: existing pages moved into the `(site)` route group (URLs unchanged) so only they get the site header/footer; `/ai-guild` uses the bare root layout. `not-found.tsx` renders its own header/footer.
- Status labels used throughout: Implemented (works in the prototype), Simulated (in-browser stand-in), Planned (not built). Fictional data only; indexing is disabled.
- Talk time: 10:00 across 13 slides (per-slide targets in `content.ts`). The API walkthrough steps with the `.` and `,` keys. See `AUDIT.md` for the implementation audit (what is real, simulated, and planned).

### Verify
    npm run lint && npx tsc --noEmit && npm run build && npx next start -p 3100
Then open http://localhost:3100/ai-guild. Deploy exactly as above (push to GitHub, Vercel imports; no env vars).
