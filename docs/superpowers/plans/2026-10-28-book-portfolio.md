# Book portfolio: implementation plan

Docs:
- PRD: `docs/superpowers/specs/2026-10-25-book-portfolio-prd.md`
- Spec: `docs/superpowers/specs/2026-10-25-book-portfolio-spec.md`
- Technical design: `docs/superpowers/specs/2026-10-28-book-portfolio-tdd.md`

Branch: `feat/book-redesign`. Each task ends with:
- `npx tsc --noEmit` clean;
- ponytail review;
- a commit.

e2e runs against the mst-server preview (port 3021).

### Task 1: Content and assets
- `src/lib/bookData.ts`:
  - timeline;
  - four brands (copy from the Phantom Grace About page; HuntwiseAI with no numbers);
  - VisaHunt numbers.
- `public/book/`: images from the prototype, resized; OG cover image (1200×630).

### Task 2: Faces and static layout
- `Faces.tsx`, `Tooling.tsx`, `Book.tsx`, `book.css` (the prototype's CSS), fonts.
- Without the engine, it renders as the reduced-motion column.
- `page.tsx` + metadata + JSON-LD.

### Task 3: Engine
- `BookEngine.tsx`: the prototype script in `useEffect`, with cleanup.
- Checks:
  - desktop scroll turns;
  - phone swipe, whole and half turns;
  - `fitPages`;
  - blurred background;
  - float;
  - tabs;
  - Skip to contact.
- Compare with the prototype at the same positions.

### Task 4: Contact form
- `ContactForm.tsx`: send, sent and error states; Turnstile loaded late; honeypot.
- Phantom Grace PR (its repo, from `develop`): CORS for mithleshshah.com on `/api/contact`.
- Owner step: add `mithleshshah.com` to the Turnstile widget's hostnames.

### Task 5: Remove the old site
- Old components and the 10 unused dependencies (technical design §2).
- `npm ci` and build on the preview stay green.

### Task 6: Tests
- `@playwright/test` + the 4 specs (technical design §8).
- Lighthouse on the preview.

### Task 7: Release
- Screenshots: desktop + phone (390×664, 320×568, the owner's 411×794), cover to back cover.
- The owner checks it on the preview from their phone (LAN).
- PR to `master`; the owner merges. Then on mst-server: pull, build, restart, check the live site.
