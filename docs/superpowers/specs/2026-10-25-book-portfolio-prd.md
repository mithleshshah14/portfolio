# PRD: mithleshshah.com as a founder's journal (book)

Date: 25 Oct 2026 · Owner: Mithlesh Shah · Branch: `feat/book-redesign` (from `master` 70720cc)
Prototype (approved by the owner, 24–25 Oct): `.taste-skill/mocks/book.html`

## 1. Problem

- The current site looks "not professional" (owner) and is out of date: it shows two products, the old HuntwiseAI
  pitch (job-seeker tool; it is now AI shortlisting for hiring teams), no Phantom Grace, no Ashviora, no Silent Arc,
  no Publicis Sapient role.
- It lags: the animated full-screen film-grain overlay halves scroll smoothness (measured 30 vs 60 fps). It also ships
  three.js, GSAP, OGL and five WebGL backgrounds for decoration.

## 2. Who reads it

- People deciding whether to work with Mithlesh: hiring managers, recruiters, potential partners, customers of the four
  brands, investors.
- They arrive from LinkedIn, an email signature, the Phantom Grace site or a search for his name, mostly on a phone.

## 3. Goals

1. Say in one screen who he is: founder of Phantom Grace Technologies (Gwalior), 8 years of backend engineering.
2. Show the four brands as real, live products, one page each, with real screenshots and links.
3. Be memorable: the owner's idea, a leather journal you open and read, closing on a "write to me" back cover.
4. Get a message: a working contact form on the back cover.
5. Fast and smooth on a mid-range phone: no lag, no layout jumps, works on every phone width (320 px and up).

## 4. Non-goals

- A blog, case-study pages or a CMS (later, if wanted).
- Dark mode (the journal is the theme).
- Analytics beyond what Cloudflare already gives.

## 5. User stories

- On a laptop I scroll and the diary's flap folds back, the cover opens, and pages turn as I scroll; tabs under the book
  jump to a chapter; at the end the book closes on a contact form.
- On a phone I swipe (or tap ‹ ›) and pages turn: the cover, the photo page and the back cover turn as whole pages,
  the pages in between fold in the middle; nothing is ever cut off at the bottom.
- I can jump from the contents page to any chapter, or "Skip to contact".
- I can reach email, LinkedIn, GitHub and the CV without opening the book.
- With "reduce motion" on, I get the same content as a plain readable column.

## 6. Success measures (2 weeks after release)

- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO 100.
- 60 fps scroll on the owner's laptop and phone (headed Chrome trace); no page cut off at 320–430 px widths.
- Contact form: messages arrive in the Phantom Grace inbox; spam blocked by Turnstile + honeypot.
- The owner is happy to put the link on LinkedIn and the Phantom Grace site.

## 7. Out of scope

- Changing the Phantom Grace site itself (only its contact worker gets CORS + the Turnstile hostname, see the TDD).
- New brand content beyond what the Phantom Grace About page already says (copy is reused from there).

## 8. Open questions for the owner

1. CV download: keep the "Download CV" link (the PDF in `public/` is the old CV; is there a newer one)?
2. GitHub link: keep it?
3. A better portrait: the current photo is 381×656 on a black background (fine in the taped frame, sharper is better).
