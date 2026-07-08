# Design Decisions — Portfolio Redesign (July 2026)

This document records **what we chose, what we rejected, and why**, so future
design work starts from these decisions instead of re-litigating them.

## 1. Positioning: founder first, engineer second

**Decision:** The site presents Mithlesh as a **SaaS founder who ships products**
(HuntWise AI, VisaHunt). The 8 years of backend engineering (Wipro → VeriFone →
EPAM → Nike → DigitalZone) is backstory that provides credibility — it is not
the headline.

**Why:** An engineer-first dark "terminal/status board" design was generated
first and explicitly rejected: *"the portfolio should not just be for a
software engineer but a saas founder."* Every future change should pass this
test: does it lead with the products?

Consequences of this decision:
- Products section gets the most page weight (~60%), placed immediately after the hero.
- Experience is framed as "The story" — a timeline that *ends* at "Founder".
- Skills are framed as "Tools of the trade" (what the founder builds with),
  and "How I work" covers product/design/AI/growth, not just code.
- No contact form — founders get emailed, not form-submitted.

## 2. Visual theme: "Midnight Blueprint"

**Decision:** Dark theme based on a reference screenshot Mithlesh supplied
(an ROI sales tool hero he liked). Core ingredients:

| Element | Spec |
|---|---|
| Base | Near-black `#0A0C10` (`night`) |
| Panels | `#0D121C` (`panel`), hairline borders `#ffffff14` (`hairline`) |
| Text | `#F4F6F8` (`fog`), muted `#8FA0B8` (`mist`), dim `#5D6B80` (`dim`) |
| Product accents | HuntWise teal `#2DD4BF` / deep `#0D9488`; VisaHunt blue `#60A5FA` / deep `#1D4ED8` |
| Extra accents | Eyebrow blue `#7DA2E8` (`skyline`), italic silver `#A9B8C9` (`silver`) |
| Grid | Blueprint grid tiled on `body` — 1px white lines at 3% opacity, 56px cells |
| Glows | Radial gradients: royal blue `rgba(29,78,216,…)` top-left of hero, dark teal `rgba(14,116,144,…)` elsewhere; per-product glow behind each mockup |
| Texture | Animated film-grain overlay (SVG turbulence, 4% opacity, `mix-blend: overlay`, 8s stepped loop) |
| Type | Inter Tight (display), Inter (body), JetBrains Mono (labels — always uppercase + letterspaced `0.2–0.3em`) |
| Signature | Hero headline with one *italic* word in silver: "…people *actually* use." |

**Why these two accent colors:** teal is HuntWise's brand color and blue ≈
VisaHunt's. The page literally sits between the two products — the colors carry
meaning, they're not decoration.

**Color-coding rule:** color = information. The stack legend assigns colors per
*group* (sky/teal/violet/cyan), and **amber `#FBBF24` is reserved exclusively
for the AI/LLM group** so the differentiator stands out. Don't spend amber
elsewhere.

## 3. What was explored and rejected

All variants are preserved in the comparison artifact:
https://claude.ai/code/artifact/100276ec-bfc2-4ea1-9f07-6acb05dc8785

1. **"Shipping Log"** (dark terminal/status-board, phosphor green) — rejected:
   too engineer-coded.
2. **Founder-first light "porcelain"** (Stitch design, `.stitch/designs/founder-portfolio.html`) —
   the *layout/structure was approved and kept*, but the plain light color was
   rejected: *"I don't want just basic light color."*
3. **Tinted zones** (light, per-section color washes) — not chosen.
4. **Deep graphite** (plain dark) — not chosen.
5. **Warm sand + paper-grain/linen/speckle textures** — not chosen, but the
   *texture idea survived* as the film-grain overlay.
6. **Indigo night mixes** (× ember, × aurora, × rose) — superseded by the
   user's own reference (midnight + royal blue + teal), which became final.

Also rejected early: typing animations, skill percentage bars, blue/purple
gradient heroes, decorative particle backgrounds — the templated dev-portfolio
look. Do not reintroduce.

## 4. Motion language

Deliberate, orchestrated, not scattered:
- **Hero:** staggered fade-up on load.
- **Products:** columns slide in horizontally — text from one side, screenshot
  from the other, direction alternating per product (per user request,
  borrowed from a Lovable prototype he liked).
- **Mockups:** subtle mouse-tracking 3D tilt (±4°, spring-damped) + accent glow.
- **Sections:** `whileInView` fade-ups with stagger, `once: true`.
- **Experience cards:** click-to-expand accordion (height + opacity).
- **Nav:** scrollspy underline (teal) + teal→blue scroll progress bar.
- **Ambience:** pulsing LIVE dot on the "2 products live" stat; animated grain.
- `prefers-reduced-motion` disables grain animation, tilt, and smooth scroll.

The current amount of motion is the ceiling — adding more was explicitly judged
to risk an AI-generated feel.

## 5. Content rules

- **Real, quantified claims only** in experience: "300+ APIs migrated",
  "100K+ leads/month", "4K+ retail stores". Sourced from Mithlesh's resume data
  (via the Lovable export, see IMPLEMENTATION.md → Content sources).
- Job titles must be the real ones (an AI draft once invented "Technical Lead" —
  caught and fixed).
- Products link to live domains: **huntwiseai.com**, **visa-hunt.com**.
- GitHub: `mithleshshah14` · LinkedIn: `mithlesh-shah14` · email:
  mithleshshah84@gmail.com.
- Education: B.E. CSE, Vikrant Institute of Technology & Management, 2018.

## 6. Open items (as of July 2026)

- [ ] OG image + favicon in the Midnight Blueprint style (agreed, not built).
- [ ] Resume PDF (`public/MITHLESH_SHAH_RESUME.pdf`) likely still says
      engineer-first — refresh or unlink.
- [ ] Real product metrics under each product card (e.g. VisaHunt:
      "10,000 jobs across 73 countries") once confirmed.
- [ ] Analytics on the deployed site.
