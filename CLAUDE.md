# Portfolio — Mithlesh Shah

Personal site for Mithlesh Shah, **SaaS founder** (HuntWise AI · VisaHunt) and
backend engineer. Next.js 15 + Tailwind v4 + framer-motion.

**Before making design or content changes, read:**
- `docs/DESIGN-DECISIONS.md` — the chosen "Midnight Blueprint" theme, the
  founder-first positioning rule, rejected directions (don't reintroduce them)
- `docs/IMPLEMENTATION.md` — file map, data-driven content model, recipes,
  gotchas

Quick facts:
- All page content is data in `src/app/projectsData.ts`; the page is
  `src/app/page.tsx`; design tokens are in `src/app/globals.css` (`@theme`).
- Positioning rule: lead with the products, engineering career is backstory.
- Never run `npm run build` while the dev server is running (shared `.next/`).
- Workflow: branch from `master` → push → PR → merge. Master deploys.
