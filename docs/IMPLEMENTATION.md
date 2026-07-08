# Implementation Guide

How the redesigned portfolio is built and how to change it safely.
Read `DESIGN-DECISIONS.md` first for the *why*.

## Stack

- **Next.js 15** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — CSS-first config; all design tokens live in
  `src/app/globals.css` under `@theme inline` (there is no `tailwind.config`)
- **framer-motion** — all animation
- **lucide-react** — icons
- Fonts via `next/font/google` in `src/app/layout.tsx`:
  Inter (`--font-inter`), Inter Tight (`--font-inter-tight`),
  JetBrains Mono (`--font-jetbrains-mono`)

## File map

```
src/app/
  layout.tsx          fonts + metadata (title, description, OG)
  globals.css         design tokens (@theme), blueprint grid on body,
                      grain overlay CSS, dark scrollbar, reduced-motion rules
  page.tsx            the entire page — all sections as local components
  projectsData.ts     ALL content data (see below)
  component/
    navbar.tsx        sticky nav: scrollspy (useActiveSection), mobile menu,
                      scroll progress bar
public/mockups/       real product screenshots (huntwise.png, visahunt.png)
.stitch/designs/      approved Stitch design (layout source of truth)
docs/                 this documentation
```

Legacy files not used by the current page (safe to delete eventually):
`src/app/component/Portfolio.jsx`, `src/app/skillsData.ts`,
`src/app/experienceData.ts`, `src/app/hooks/*`, `src/app/components/*`,
`src/components/*` (Aurora/Plasma/Beams/etc.), `src/app/globals.css`
shadcn token block (kept for compatibility).

## Content lives in `src/app/projectsData.ts`

Edit data, not JSX:

| Export | Drives | Notes |
|---|---|---|
| `projectsData: ProjectItem[]` | Products section | `accent`/`accentDeep` per product; `image*` fields must match the real file dimensions to avoid layout shift |
| `storyData: StoryItem[]` | Expandable experience timeline | `current: true` renders the highlighted founder card; `project`/`description`/`tech`/`achievements` fill the expanded panel |
| `stackData: StackGroup[]` | "Tools of the trade" legend | `color` per group; amber `#FBBF24` is reserved for AI/LLMs |
| `educationData` | Education block in Story section | |
| `capabilitiesData` | "How I work" cards | icon order is hardcoded in `CapabilitiesSection` (`Compass, Code2, Sparkles`) |

### Recipes

- **Add a product:** append to `projectsData`, drop the screenshot in
  `public/mockups/`, record its true width/height. Alternating slide direction
  is automatic (`index % 2`).
- **Add a job / update experience:** edit `storyData`. Keep achievements
  quantified and real.
- **Update a screenshot:** overwrite the file in `public/mockups/` and update
  `imageWidth`/`imageHeight`.
- **Change theme colors:** edit the `@theme inline` block in `globals.css`
  (`--color-night`, `--color-panel`, `--color-fog`, `--color-mist`,
  `--color-dim`, `--color-hairline`, product accent tokens). Utilities like
  `bg-night text-fog border-hairline` are generated from these.

## Animation building blocks (in `page.tsx`)

- `fadeUp`, `stagger`, `slideFromLeft`, `slideFromRight` — shared variants,
  `easeOut = [0.22, 1, 0.36, 1]`, viewport `{ once: true, margin: "-80px" }`.
- `TiltMockup` — mouse-tracking 3D tilt, disabled under `useReducedMotion`.
- `Glow` — positioned radial-gradient div; sections with glows need
  `relative overflow-hidden`.
- `GrainOverlay` — one div, styling in `globals.css` (`.grain-overlay`).
- `StoryCard` — accordion via `AnimatePresence` height animation.

## Gotchas learned the hard way

1. **Don't run `npm run build` while `npm run dev` is running** — both write
   to `.next/` and the dev server's cache corrupts (500s, ENOENT tmp manifest).
   Kill dev, or delete `.next/` and restart after a build.
2. Tailwind v4 fails the dev overlay with *"Cannot apply unknown utility
   class"* if a class references a deleted token — when renaming tokens,
   update every usage in the same change.
3. Product screenshots have different aspect ratios (huntwise 1896×905,
   visahunt 1408×909) — `next/image` needs the real numbers.
4. Horizontal slide-in animations require `overflow-x: hidden` on `body`
   (already set) or they cause a horizontal scrollbar flash.

## Workflow

- Dev: `npm run dev` → localhost:3000. Build check: `npm run build`.
- Branch from `master`, push, PR, merge (repo: `mithleshshah14/portfolio`).
- Deployment: master is the deploy branch.

## Content sources & references

- **Approved layout:** Stitch project `6751737921183200059`, screen
  "Founder-First Portfolio" — saved at `.stitch/designs/founder-portfolio.{html,png}`.
- **Color exploration artifact:** https://claude.ai/code/artifact/100276ec-bfc2-4ea1-9f07-6acb05dc8785
- **Resume-grade experience data + rich skills list:** Lovable export at
  `C:\Users\mithl\Videos\Captures\Mithlesh Portfolio (1)\src\components\`
  (`Work.tsx`, `Skills.tsx`, `Education.tsx`; grain overlay + scrollspy hooks
  came from the sibling export without `(1)`).
- **Product facts:** the codebases at `C:\MyWeb\huntwise-ai`
  (`PROJECT_CONTEXT.md`) and `C:\MyWeb\VisaHunt` (`app/layout.tsx` metadata).
