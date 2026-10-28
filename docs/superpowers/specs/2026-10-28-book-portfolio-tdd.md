# Technical design: book portfolio

PRD: `2026-10-25-book-portfolio-prd.md` · Spec: `2026-10-25-book-portfolio-spec.md` · Prototype: `.taste-skill/mocks/book.html`
(865 lines, 308 of them the page-turn script), tested on desktop and 12 phone sizes.

## 1. Approach: port the prototype, don't rewrite it
The prototype's page-turn engine is imperative DOM code, tuned over two days of owner feedback:
- 3D slab, flap fold, whole-page and half-page phone turns;
- cloned flat pages, `fitPages()`, the blurred background;
- the "never opacity on preserve-3d" rule.

Rewriting it as React state would re-open every one of those bugs. So:
- **Faces = server-rendered JSX** (`src/components/book/Faces.tsx`), so every word is in the HTML for SEO, and the
  reduced-motion column is the same markup.
- **Engine = one client component** (`src/components/book/BookEngine.tsx`, `'use client'`). It contains the prototype's
  script almost verbatim, run once in `useEffect` against the rendered faces, with cleanup (listeners, rAF, observers)
  on unmount. It renders nothing itself.
- **Styles** = the prototype's CSS moved to `src/app/book.css` (global, imported in `layout.tsx`). Tailwind stays for
  nothing new; it can go in a later cleanup.
- **Content** = `src/lib/bookData.ts`:
  - the timeline;
  - the four brands (name, chapter, screenshot, paragraph, 3 facts, link);
  - the numbers that change (VisaHunt jobs and countries).

## 2. Files

| File | What |
|---|---|
| `src/app/page.tsx` | `<Book />` + JSON-LD `Person` |
| `src/app/layout.tsx` | metadata (title, description, OG image, canonical), `next/font` Fraunces + Inter, `book.css` |
| `src/components/book/Book.tsx` | stage, book, slab, deco, tabs, ‹ › buttons, live region; renders `Faces`, mounts `BookEngine` |
| `src/components/book/Faces.tsx` | the 12 faces from `bookData` |
| `src/components/book/Tooling.tsx` | the hidden SVG `<defs>` (tooled leather symbols) |
| `src/components/book/ContactForm.tsx` | back-cover form (client): fields, honeypot, Turnstile, send states |
| `src/components/book/BookEngine.tsx` | the turn engine (client) |
| `src/lib/bookData.ts` | content |
| `public/book/*` | images: leather, tiles, portrait, product screenshots, blur sources, OG cover |

Removed:
- the old `src/components/*` (navbar, sections, Aurora, Beams, LightRays, Plasma, LetterGlitch, ChromaGrid, grain);
- dependencies: three, @react-three/*, gsap, ogl, framer-motion, react-type-animation, react-toastify, react-icons, lucide-react (spec §8).

## 3. Images
- **Plain `<img>`** with width, height and `decoding="async"`, not `next/image`. The engine clones faces, and the
  `next/image` wrapper and lazy-loading markup break the clones. The cover's images get `fetchpriority="high"`; later
  faces get `loading="lazy"`.
- **Files are sized once at build-prep:** screenshots 1280 / 768 px JPEG q80, plus the 40 px blur sources as in the
  prototype. Total target is under 900 KB for everything, and under 250 KB before the first turn.

## 4. Contact form
- **Request:** `fetch('https://phantomgracetech.com/api/contact', { method: 'POST', body: JSON })` with
  `{ name, email, topic, message, website, turnstileToken }`. These are the Phantom Grace worker's fields.
- **Phantom Grace side** (separate small PR on its repo, branch from `develop`):
  - the worker answers CORS for `https://mithleshshah.com` and `https://www.mithleshshah.com` (OPTIONS + POST only);
  - Turnstile gets the hostname `mithleshshah.com` added in the Cloudflare dashboard. That's a step for the owner.
- **Turnstile script** loads only when the back cover is one turn away, so it stays off the first load.
- **Message length:** checked on the client (10–2000) and again by the worker.

## 5. Performance rules (learned in the prototype)
- No full-screen animated filters (the grain is gone).
- No CSS `filter: blur` on large layers. The blur is done on the book-size clone, or with pre-shrunk images.
- Never `opacity` or `filter` on a `preserve-3d` element.
- Hidden background layers get `visibility: hidden` after their fade.
- The engine runs only after `document.fonts.ready`, so page fitting measures real text.

## 6. Reduced motion and no-JS
- `prefers-reduced-motion: reduce`: the engine doesn't start, and CSS lays the faces out as a column of cards.
- Without JS, the same column shows (`.no-js` class removed by the engine on start). The site stays readable either way.

## 7. Hosting and release
- **Production:** mst-server `/srv/portfolio` (`master`), systemd `portfolio.service` on port 3020, Cloudflare tunnel
  `mithleshshah.com` + `www`. Manual deploy: pull, `npm ci`, build, restart. Unchanged.
- **Preview for testing:** `/srv/portfolio-preview` on the branch, started on LAN port 3021 by hand. It's never in the
  tunnel, and is removed after release.
- **Rollback:** `git checkout` the previous `master` commit, build, restart.

## 8. Tests
The portfolio has no test runner. Add `@playwright/test` (dev only), with specs ported from the prototype's scratchpad
checks and run against the preview:
- **`e2e/desktop.spec.ts`:**
  - scroll opens the flap and the cover;
  - tabs jump to chapters;
  - the last scroll closes the book on the form;
  - no console errors.
- **`e2e/phone.spec.ts`** (390×664 and 320×568):
  - swipe and ‹ › turn pages; whole pages are 0, 1 and the last;
  - halves fold in the middle (screenshot check of the flat page against the halves);
  - nothing overflows at 12 sizes (`overflow-all` logic);
  - a left swipe on the last page bounces.
- **`e2e/form.spec.ts`:**
  - required fields;
  - honeypot;
  - a mocked worker answer gives the sent state, and an error answer gives the error state.
- **`e2e/a11y-seo.spec.ts`:**
  - reduced motion gives the column;
  - title, description, OG and JSON-LD are present;
  - turned faces are `inert`.
- **Lighthouse mobile on the preview:** Performance ≥ 90, Accessibility ≥ 95, SEO 100.

## 9. Risks
- **Engine port drift:** the prototype is the reference. Desktop and phone screenshots at the same scroll and turn
  positions are compared side by side before release.
- **Old content links:** anyone linking to `/#projects` and similar lands on the cover. That's fine (one page).
- **Owner's phone ("Font Change" app, 411×794):** covered by `fitPages()` measuring on the device. Checked again on the
  owner's phone before release.
