# RNA Tek — Design Demo (pre-sales)

Speculative redesign of rnatek.com. Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide.

## Run
    npm install
    npm run dev        # http://localhost:3000
    npm run lint && npx tsc --noEmit && npm run build

## Deploy a Vercel preview
1. Push this folder to https://github.com/wewebworks/rna-tek (remote `origin` is already configured).
2. In Vercel: Add New → Project → import the repo. Framework: Next.js (auto). No env vars needed.
3. Deploy. Every branch/PR gets its own preview URL.
Or from the CLI: `npx vercel` (preview) / `npx vercel --prod`.

Optional env vars: `NEXT_PUBLIC_SITE_URL` (canonical/sitemap host), `NEXT_PUBLIC_ALLOW_INDEXING=true` (demo is `noindex` by default; set only for real launch).

## Content integrity
- Verified from rnatek.com: address, phone, email, hours, services, founder background, social links, logo.
- Florida (Doral) street address is NOT public — only "Doral, FL" is shown. Confirm with client.
- "20+ years" is from rnatek.com's founder bio / the brief's portfolio reference; the portfolio PDF was not available.
- No partner logos, certifications, testimonials, metrics, or projects are invented. Project cards are labeled demonstration content.
- Managed-service additions (coordination, maintenance programs, monitoring, portal) are labeled "Proposed".
- Portal preview (`/portal-preview`, also on the home page) is a client-side concept with SAMPLE data. No backend, no Monday.com/Supabase/QuickBooks.
- Contact form validates only and tells the user nothing was sent; offers a mailto fallback.
- Imagery is original SVG illustration (no stock photos) until real project photography is supplied.

## AI Guild presentation (`/ai-guild`)
A full-screen, 10-minute interactive talk, separate from the marketing site (no site header or footer).
- `/ai-guild` — the deck (9 sections). `/ai-guild/presenter` — presenter notes, per-slide timing, timer; stays in sync with the deck via BroadcastChannel (same browser).
- Keys: ← → / PageUp / PageDown navigate, `1`–`9` jump, `Home`/`End`, `F` full screen, `P` opens the presenter window, `Space` next.
- Slide position is the URL hash (`/ai-guild#6`), so refresh and return-from-demo land on the right slide.
- **Launch Live Demo** opens `/portal-preview#simulation` (the unchanged portal). A "Return to Presentation" bar appears only when arriving from the deck (sessionStorage flag).
- Content, notes, and timings live in `src/components/guild/content.ts`. Branding string: `BRAND` there ("MoeTech"); the portal itself remains RNA Tek-branded and is untouched.
- Structure: existing pages moved into the `(site)` route group (URLs unchanged) so only they get the site header/footer; `/ai-guild` uses the bare root layout. `not-found.tsx` renders its own header/footer.
- Status labels used throughout: Implemented (works in the prototype), Simulated (in-browser stand-in), Planned (not built). Fictional data only; indexing is disabled.
- Talk time: 10:00 across 12 slides (per-slide targets in `content.ts`). The API walkthrough steps with the `.` and `,` keys. See `AUDIT.md` for the implementation audit (what is real, simulated, and planned).

### Verify
    npm run lint && npx tsc --noEmit && npm run build && npx next start -p 3100
Then open http://localhost:3100/ai-guild. Deploy exactly as above (push to GitHub, Vercel imports; no env vars).
