# Specification: book portfolio

Everything below is in the approved prototype (`.taste-skill/mocks/book.html`) unless marked **new**.

## 1. The faces (12, in reading order)

| # | Face | Content |
|---|---|---|
| 0 | Cover | Tan leather (real texture `leather.jpg`, CC0) with tooled border, vine band, beaded rule, corner scrolls, side fleurons, cartouche; brass PG medallion, brass nameplate "MITHLESH SHAH", debossed "Founder · Phantom Grace"; hint "Scroll to open ↓" / "Swipe to open ›". Laptop only: curved wrap flap + coconut button. |
| 1 | Endpaper | Portrait taped on the Man Singh palace tile pattern (CC0), caption "Mithlesh Shah, Gwalior". Running head "Gwalior". |
| 2 | Contents | "Hi, I'm Mithlesh." + one-line intro; clickable contents (1 The engineer · 2 VisaHunt · 3 HuntwiseAI · 4 Ashviora · 5 Silent Arc Studios · 6 The path · Write to me) with page numbers. **New:** a quiet row of links: Email · LinkedIn · GitHub · CV (if kept, PRD Q1–2). |
| 3 | Ch 1 The engineer | Timeline: 2026 Phantom Grace (Founder) · 2026 Publicis Sapient (Senior Associate Technology L2) · 2024 DigitalZone (Senior Software Engineer II) · 2022 Nike (Software Engineer II) · 2021 EPAM · 2020 VeriFone · 2018 Wipro (Software Engineer). |
| 4 | What eight years taught me | Paragraph; 4 numbers (8 years, 6 companies, 4 live brands, 2 built solo); stack line. |
| 5–8 | Ch 2–5 brands | One page per brand: chapter, name, taped screenshot, one paragraph (from the Phantom Grace About page), 3 facts, link. VisaHunt (62k+ jobs, 83 countries, solo) · HuntwiseAI (no usage numbers) · Ashviora (6 blends, small batches, 0 fillers) · Silent Arc Studios (2D action games; no game name until the trademark is filed). |
| 9 | Ch 6 The path | "The path appears because you walk." + two lines. |
| 10 | The end | "The end of this chapter." + invitation; "Keep scrolling and the book closes." |
| 11 | Back cover | Leather with tooled border; "Write to me" form; PG seal + "Phantom Grace Technologies · Gwalior, Madhya Pradesh · LinkedIn". |

Numbers that change (62k+ jobs, 83 countries) live in one data file.

## 2. Laptop (width ≥ 760 px)

- Two-page spreads; the page is scroll-scrubbed (sticky stage). Units: INTRO 1.0, FLIP 1, HOLD 0.7 × 0.7 viewport.
- t 0.1→0.8: the flap folds back to the fore-edge with the button, then the cover turns.
- Closed book = tilted 3D slab (fore-edge, foot, spine, back board), leans toward the mouse; lies flat when open.
- Floating: the closed book floats 10 px up/down (2.4 s) on the cover and on the closed back cover.
- Chapter tabs under the book; "Skip to contact" top right (hidden on the last page).
- Background: the open spread's two pages, cloned and blurred (26 px), cross-faded per spread; plain cream when closed.
- Around the closed book: pressed sprigs + quiet words (cover: "A founder's journal 2018 → 2026" / "Gwalior, Madhya
  Pradesh, India"; end: "Thanks for reading." / "Write back."). Words hidden under 1100 px.

## 3. Phone (width < 760 px)

- One page at a time, no page scroll. Swipe (the page follows the finger) or ‹ › buttons; arrow keys too.
- Turns: cover, photo page and back cover turn as **whole pages** (left-edge hinge). All pages in between **fold in
  the middle** (right half over left), never leaving the screen. Turned pages lie at -180°, nothing vanishes.
- While a page moves, the halves are pictures; when it lands, the real page (links, form) is on top.
- A short or slow swipe falls back; a flick counts. Swipe left on the last page = small bounce.
- No flap, no button; brass centred on the cover. Floating on the cover and back cover.
- "Skip to contact" under the ‹ › buttons, hidden on the last page.
- Every page fits: content that doesn't fit is scaled down (steps of 0.04, floor 0.7), measured on the visitor's device.

## 4. Contact form (back cover)

- Fields: Name (required), Email (required, email), About (Working together · Hiring · One of the brands · Something
  else), Message (required, 10–2000 chars), hidden honeypot `website`, Cloudflare Turnstile.
- Sends to the Phantom Grace worker `POST https://phantomgracetech.com/api/contact` (same fields). States: sending
  (button disabled), sent ("Thanks, I'll reply within two days."), error (message + "or email contact@phantomgracetech.com").
- Swipes may start on the form; a tap still focuses a field; vertical drags scroll a long message.

## 5. Reduced motion

`prefers-reduced-motion: reduce`: no turning, floating or blur; all faces as a plain column of cards, in order.

## 6. SEO and sharing

- All text is in the server HTML (faces rendered as HTML, not canvas). Title "Mithlesh Shah · Founder, Phantom Grace
  Technologies"; description; Open Graph image (the cover); `Person` JSON-LD (name, jobTitle Founder, worksFor Phantom
  Grace Technologies, sameAs LinkedIn/GitHub); canonical `https://mithleshshah.com`.

## 7. Accessibility

- Hidden/turned faces are `inert` and `aria-hidden`; the page number and running head are announced by an
  `aria-live` region; buttons have labels; focus visible; contrast AA on paper and leather.

## 8. Removed

- Old page, navbar, Aurora/Beams/LightRays/Plasma/LetterGlitch/ChromaGrid, film grain, three.js, @react-three/*,
  GSAP, OGL, framer-motion, react-type-animation, react-toastify, react-icons and lucide-react (if nothing uses them).
