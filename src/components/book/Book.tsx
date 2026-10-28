// The stage around the book (from the prototype): running head, the book with its 3D slab, chapter tabs (laptop),
// ‹ › pager (phone), decorations around the closed book, and the blurred-pages background. Leaves are built by the engine.
import { Faces } from "./Faces";
import { Tooling } from "./Tooling";
import { BookEngine } from "./BookEngine";

const slab = (cls: string) => (
  <div className={`slab ${cls}`}><div className="board" /><div className="spine" /><div className="fore" /><div className="foot" /></div>
);

export function Book() {
  return (
    <>
      <a className="skip" href="#write" data-goto="11">Skip to contact</a>
      <Faces />
      <div className="glow" aria-hidden="true"><div /><div /></div>
      <Tooling />
      <div className="track" id="track">
        <div className="stage">
          {/* Around the closed book only (cover / back cover): pressed sprigs tucked under it, and a few quiet words. */}
          <div className="decor" aria-hidden="true">
            <svg className="deco sprig s1" data-on="cover contact"><use href="#sprig" /></svg>
            <svg className="deco sprig s2" data-on="cover contact"><use href="#sprig" /></svg>
            <svg className="deco sprig s3" data-on="cover contact"><use href="#sprig" /></svg>
            <svg className="deco sprig s4" data-on="cover contact"><use href="#sprig" /></svg>
            <svg className="deco fallen l1" data-on="cover contact"><use href="#leaf" /></svg>
            <svg className="deco fallen l2" data-on="cover contact"><use href="#leaf" /></svg>
            <div className="deco words wl" data-on="cover"><em>A founder&apos;s journal</em><span>2018 → 2026</span></div>
            <div className="deco words wr" data-on="cover"><em>Gwalior,</em><span>Madhya Pradesh, India</span></div>
            <div className="deco words wl" data-on="contact"><em>Thanks for reading.</em><span>The next chapter is still being written.</span></div>
            <div className="deco words wr" data-on="contact"><em>Write back.</em><span>I read every letter myself.</span></div>
          </div>
          <div className="running" id="running" aria-live="polite" />
          <div className="book" id="book">
            <div className="ribbon" />
            {slab("start")}
            {slab("end")}
          </div>
          <nav className="tabs" aria-label="Chapters">
            <button data-goto="0">Cover</button><button data-goto="2">Contents</button><button data-goto="3">1 · The engineer</button>
            <button data-goto="5">2–5 · The brands</button><button data-goto="9">6 · The path</button><button data-goto="11">Write to me</button>
          </nav>
          <div className="pager">
            <button id="prev" aria-label="Previous page">‹</button><span id="count" /><button id="next" aria-label="Next page">›</button>
          </div>
          <a className="skip-phone" href="#write" data-goto="11">Skip to contact</a>
        </div>
      </div>
      <BookEngine />
    </>
  );
}
