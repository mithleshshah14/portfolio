// The page-turn engine of the approved prototype (v9, .taste-skill/mocks/book.html), kept as plain DOM code on
// purpose: it was tuned turn by turn with the owner, and a rewrite would reopen every one of those fixes.
// Changes from the prototype: faces come from #faces (server-rendered), every listener is tied to `signal` (React
// unmount), the optional "desk" background mode is gone, and the contact form is wired in wireContact().

/** Builds the book from #faces and runs it until `signal` aborts. Not called with reduced motion (#faces stays a column). */
export function startBook(signal) {
  const on = (target, type, fn, opts = {}) => target.addEventListener(type, fn, { ...opts, signal });
  const faces = [...document.getElementById("faces").children];
  const book = document.getElementById("book"), track = document.getElementById("track"), running = document.getElementById("running");
  document.body.classList.add("engine");
  const HOLD = 0.7, FLIP = 1;           // scroll units: a rest between turns, and the turn itself
  const INTRO = 1.0;                    // before the first turn: a short rest, then the flap opens (t 0.1 → 0.8)
  let leaves = [], single = false, unit = 0, pw = 430;

  function build() {
    single = innerWidth < 760;
    document.body.classList.toggle("single", single);
    // Page size: as big as the screen allows, book proportions 0.72.
    const ph = Math.min(innerHeight * 0.8, 680);
    pw = Math.min(ph * 0.72, single ? innerWidth * 0.9 : innerWidth * 0.46);
    const h = single ? Math.min(ph, pw / 0.62) : pw / 0.72;
    document.documentElement.style.setProperty("--pw", pw + "px");
    document.documentElement.style.setProperty("--ph", h + "px");
    document.documentElement.style.setProperty("--T", (single ? 16 : 26) + "px");   // diary thickness
    book.querySelectorAll(".leaf, .half-base, .flats").forEach((l) => l.remove());
    leaves = [];
    if (single) buildPhone();
    // Spread mode: leaf k = faces 2k (front) and 2k+1 (back).
    else for (let i = 0; i < faces.length; i += 2) {
      const leaf = document.createElement("div"); leaf.className = "leaf";
      const front = copyOf(i); front.classList.add("front"); leaf.append(front);
      if (faces[i + 1]) { const back = copyOf(i + 1); back.classList.add("back"); leaf.append(back); }
      book.append(leaf); leaves.push(leaf);
    }
    // In single mode the last face (the contact back cover) must stay: it never turns.
    const turns = single ? leaves.length - 1 : leaves.length;
    unit = innerHeight * 0.7;
    // Phones turn pages by swiping, so the page itself doesn't scroll; the laptop turns them with the scroll.
    track.style.height = single ? "100svh" : (INTRO + turns * (FLIP + HOLD)) * unit + innerHeight + "px";
    if (single) { idx = Math.min(idx, turns); scrollTo(0, 0); }
    book.querySelectorAll("[data-goto]").forEach(bindGoto);
    fitPages();
    update();
  }
  // A live copy of a face (links and form work); the source in #faces is hidden.
  const copyOf = (i) => { const c = faces[i].cloneNode(true); c.removeAttribute("id"); return c; };

  // ---- Phone (owner's choice "turn inside the page"): each page is a small open book with its spine down the middle.
  // Leaf j = right half of face j (front) + left half of face j+1 (back); it folds over the middle, so a turn never
  // leaves the screen. The halves are inert pictures; the settled page is a real, interactive copy on top (.flats),
  // hidden only while a page is moving. Face 0's left half sits under everything (.half-base).
  let flats = [], flatsEl = null, flatIdx = -1, flatTimer = 0, wholeEl = null;
  function halfOf(i, cls) {
    const f = document.createElement("div"); f.className = `face cut ${cls}`;
    const c = copyOf(i); c.inert = true; f.append(c);
    return f;
  }
  function buildPhone() {
    const base = halfOf(0, "half-base"); book.append(base);
    faces.forEach((_, j) => {
      const leaf = document.createElement("div"); leaf.className = "leaf half";
      leaf.append(halfOf(j, "front"));
      if (faces[j + 1]) leaf.append(halfOf(j + 1, "back"));
      book.append(leaf); leaves.push(leaf);
    });
    flatsEl = document.createElement("div"); flatsEl.className = "flats";
    flats = faces.map((_, i) => { const c = copyOf(i); c.classList.add("flat"); flatsEl.append(c); return c; });
    book.append(flatsEl); flatIdx = -1;
    wholeEl = document.createElement("div"); wholeEl.className = "leaf whole off";
    wholeEl.innerHTML = '<section class="face front"></section><section class="face back blank"></section>';
    book.append(wholeEl);
  }
  function showFlat(i) {
    flats.forEach((f, j) => f.classList.toggle("on", j === i)); flatIdx = i;
    flatsEl.classList.remove("off"); fitPage(flats[i].querySelector(".page"));
  }

  // Scroll position at which `n` turns are done (the middle of the rest that follows them).
  const turnsToY = (n) => track.offsetTop + (n === 0 ? 0 : INTRO + n * (FLIP + HOLD) - HOLD / 2) * unit;
  function goto(face) {
    if (single) { turnTo(face); return; }
    scrollTo({ top: turnsToY(Math.ceil(face / 2)), behavior: "smooth" });
  }
  function bindGoto(el) { on(el, "click", (e) => { e.preventDefault(); goto(+el.dataset.goto); }); }
  document.querySelectorAll(".skip[data-goto], .skip-phone[data-goto], .tabs [data-goto]").forEach(bindGoto);

  // Which chapter is open, per face, for the decorations and the tabs.
  const KEYS = ["cover", "intro", "intro", "engineer", "engineer", "visahunt", "huntwise", "ashviora", "silentarc", "path", "end", "contact"];
  const TAB_OF = { cover: 0, intro: 1, engineer: 2, visahunt: 3, huntwise: 3, ashviora: 3, silentarc: 3, path: 4, end: 5, contact: 5 };
  const props = [...document.querySelectorAll(".deco")], tabs = [...document.querySelectorAll(".tabs button")];
  const glows = [...document.querySelectorAll(".glow > div")];
  let glowShown = "", glowFront = 0;
  // Owner's idea: the open pages themselves, enlarged and blurred, behind the book (spread: left + right; phone: the
  // one page). Empty = the book is closed → plain cream.
  function setGlow(faceIdxs) {
    const sig = faceIdxs.join(",");
    if (sig === glowShown) return;
    glowShown = sig; glowFront = 1 - glowFront;          // paint the hidden layer, then cross-fade to it
    const g = glows[glowFront];
    g.replaceChildren();
    if (faceIdxs.length) {
      const spread = document.createElement("div"); spread.className = "spread";
      for (const i of faceIdxs) {
        const slot = document.createElement("div"); slot.className = "slot";
        const copy = copyOf(i);
        copy.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
        slot.append(copy); spread.append(slot);
      }
      // Enlarge the copy until it covers the screen, a little beyond so the blurred edges never show.
      const w = pw * faceIdxs.length, h = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--ph"));
      const s = Math.max(innerWidth / w, innerHeight / h) * 1.12;
      spread.style.transform = `translate(-50%, -50%) scale(${s})`;
      spread.style.filter = `blur(${(26 / s).toFixed(1)}px) saturate(1.1)`;   // 26px on screen after the enlargement
      g.append(spread);
    }
    g.inert = true;
    glows.forEach((x, i) => x.classList.toggle("on", i === glowFront && faceIdxs.length > 0));
  }
  function setChapter(face) {
    const key = KEYS[face];
    props.forEach((p) => p.classList.toggle("show", p.dataset.on.split(" ").includes(key)));
    tabs.forEach((t, i) => t.classList.toggle("on", i === TAB_OF[key]));
    document.body.classList.toggle("at-end", key === "contact");
  }

  // The closed diary (cover, or back cover at the end) floats gently up and down; it settles back when it starts to open.
  let floatAnim = null;
  function setFloat(onOff) {
    if (onOff === !!floatAnim) return;
    if (onOff) { floatAnim = book.animate([{ translate: "0 0" }, { translate: "0 -10px" }], { duration: 2400, iterations: Infinity, direction: "alternate", easing: "ease-in-out" }); return; }
    const y = getComputedStyle(book).translate;
    floatAnim.cancel(); floatAnim = null;
    book.animate([{ translate: y === "none" ? "0 0" : y }, { translate: "0 0" }], { duration: 300, easing: "ease-out" });
  }

  const ease = (x) => (x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x));

  // Pages sit a hair apart in depth (unturned: first on top; turned: last on top), since a tilted 3D book sorts by depth.
  const depth = (j, turned) => 1 + (turned ? j : leaves.length - j) * 0.4;
  const slabStart = book.querySelector(".slab.start"), slabEnd = book.querySelector(".slab.end");
  // Laptop: while closed, the diary leans a little towards the mouse.
  let mx = 0, my = 0;
  on(window, "mousemove", (e) => { if (single) return; mx = e.clientX / innerWidth * 2 - 1; my = e.clientY / innerHeight * 2 - 1; requestAnimationFrame(update); });

  // ---- Phone: one page at a time, turned by swiping (the page follows the finger) or the ‹ › buttons.
  let idx = 0;                                             // pages turned so far
  const prevBtn = document.getElementById("prev"), nextBtn = document.getElementById("next"), count = document.getElementById("count");
  // Owner: the cover, the photo page and the back cover turn as one whole page (hinged on the left edge); the pages in
  // between fold in the middle. isWhole(j): the turn from face j to j + 1 is a whole-page one.
  const isWhole = (j) => j <= 1 || j === leaves.length - 2;
  let wholeDrag = null, wholeBusy = false, backWhole = false;   // backWhole: the real page stays under a page swinging back in
  function setWhole(face, angle, animate) {               // face < 0 hides it
    if (face < 0) { wholeEl.classList.add("off"); return; }
    if (wholeEl.dataset.face !== String(face)) {
      const c = copyOf(face); c.inert = true; c.classList.add("front");
      wholeEl.firstElementChild.replaceWith(c); wholeEl.dataset.face = face;
    }
    wholeEl.classList.remove("off");
    wholeEl.classList.toggle("anim", animate);
    wholeEl.style.transform = `translateZ(7px) rotateY(${angle}deg)`;
    fitPage(wholeEl.firstElementChild.querySelector(".page"));
  }
  // The whole page has landed: the halves snap (no fold) to the page now showing, and the real page comes back.
  function landWhole() { wholeBusy = backWhole = false; setWhole(-1); placeHalves(idx, false); void book.offsetWidth; showFlat(idx); renderSingle(); }
  function placeHalves(state, animate, dragLeaf = -1, dragAngle = 0) {
    leaves.forEach((leaf, j) => {
      // Only the leaves a turn can show (two each side of `state`). The rest of the stack hid under them, but every 3D
      // layer's soft edge let the pages below bleed through as a light line down the page's middle (owner).
      leaf.style.visibility = (j >= state - 2 && j <= state + 1) || j === dragLeaf ? "" : "hidden";
      const angle = j === dragLeaf ? dragAngle : j < state ? -180 : 0;
      leaf.classList.toggle("anim", animate);
      leaf.style.transform = `translateZ(${depth(j, angle < -90)}px) rotateY(${angle}deg)`;
      leaf.style.zIndex = angle < -90 ? 100 + j : 100 - j;
    });
  }
  function renderSingle(drag = null) {
    const turns = leaves.length - 1;
    // Phone: the closed diary leans on the table; open, it lies flat for reading.
    const k = idx === 0 && !(drag && drag.leaf === 0) && !wholeBusy ? 1 : 0;
    book.style.transform = `rotateX(${5 * k}deg) rotateY(${-9 * k}deg)`;
    slabStart.classList.toggle("on", k > 0);
    if (drag && isWhole(drag.leaf)) {
      // Forward: face idx lifts off face idx + 1. Back: face idx - 1 swings in over face idx.
      wholeDrag = { face: drag.leaf, fwd: drag.leaf === idx }; backWhole = !wholeDrag.fwd;
      placeHalves(wholeDrag.fwd ? idx + 1 : idx, false);
      setWhole(drag.leaf, drag.angle, false);
    } else if (drag) placeHalves(idx, false, drag.leaf, drag.angle);
    else if (wholeDrag) {                                   // let go too early: the whole page falls back, then hides
      const { face, fwd } = wholeDrag; wholeDrag = null; wholeBusy = true;
      setWhole(face, fwd ? 0 : -180, true);
      later(landWhole, 460);
    } else if (!wholeBusy) placeHalves(idx, true);
    // The real page goes away while anything moves and comes back once the turn has landed (.45 s).
    clearTimeout(flatTimer);
    if (backWhole) { /* leave the real page showing; the whole page swings in above it */ }
    // Lifting a whole page forward: the next page (halves) must show under it. The real page on top hid it, so the
    // page seemed stuck until release, then jumped (owner: "the last page swipe is not smooth").
    else if (wholeDrag) flatsEl.classList.add("off");
    else if (flatIdx === -1) showFlat(idx);
    else if (idx !== flatIdx) { flatsEl.classList.add("off"); flatTimer = later(() => showFlat(idx), 460); }
    else flatsEl.classList.remove("off");
    book.classList.toggle("open", idx > 0 && idx < turns);
    prevBtn.disabled = idx === 0; nextBtn.disabled = idx === turns;
    count.textContent = `${idx + 1} / ${turns + 1}`;
    running.textContent = faces[idx].dataset.title || "";
    setChapter(idx);
    if (!drag) setGlow(idx === 0 || idx === turns ? [] : [idx]);
    setFloat(!drag && (idx === 0 || idx === turns));
  }
  // The flap (laptop only; phones have no flap): 0 = buttoned shut, 1 = folded back.
  function setFold(f) { leaves[0].querySelector(".cover").style.setProperty("--fold", f.toFixed(3)); }
  function turnTo(n) {
    n = Math.max(0, Math.min(leaves.length - 1, n));
    const j = Math.min(idx, n), fwd = n > idx;
    if (Math.abs(n - idx) !== 1 || !isWhole(j) || wholeBusy) { wholeDrag = null; setWhole(-1); idx = n; renderSingle(); return; }
    // A whole-page turn: the halves underneath already show where we're going (forward) or stay put (back).
    if (!wholeDrag) { setWhole(j, fwd ? 0 : -180, false); void wholeEl.offsetWidth; }   // a tap: start from rest
    wholeDrag = null; wholeBusy = true; backWhole = !fwd;
    placeHalves(fwd ? n : idx, false);
    setWhole(j, fwd ? -180 : 0, true);
    idx = n; renderSingle();
    later(landWhole, 460);
  }
  on(prevBtn, "click", () => turnTo(idx - 1));
  on(nextBtn, "click", () => turnTo(idx + 1));
  on(window, "keydown", (e) => { if (!single) return; if (e.key === "ArrowRight") turnTo(idx + 1); if (e.key === "ArrowLeft") turnTo(idx - 1); });

  let touch = null;
  const stage = document.querySelector(".stage");
  on(stage, "touchstart", (e) => {
    // A swipe may start anywhere, the form's boxes included (the form fills the last page); a tap still focuses a box,
    // and an up/down drag is left alone (touch.dir 0), so a long message still scrolls.
    if (!single || e.touches.length !== 1) return;
    touch = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now(), dir: 0 };
  }, { passive: true });
  on(stage, "touchmove", (e) => {
    if (!touch) return;
    const dx = e.touches[0].clientX - touch.x, dy = e.touches[0].clientY - touch.y;
    if (!touch.dir) { if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return; touch.dir = Math.abs(dx) > Math.abs(dy) ? Math.sign(dx) || -1 : 0; if (!touch.dir) { touch = null; return; } }
    e.preventDefault();
    const f = Math.min(1, Math.abs(dx) / pw);
    if (touch.dir < 0 && idx < leaves.length - 1) renderSingle({ leaf: idx, angle: -180 * f });          // lifting the next page
    else if (touch.dir > 0 && idx > 0) renderSingle({ leaf: idx - 1, angle: -180 + 180 * f });         // bringing the last page back
    touch.f = f; touch.dx = dx;
  }, { passive: false });
  on(stage, "touchend", () => {
    if (!touch) return;
    const fast = Math.abs(touch.dx || 0) / Math.max(1, Date.now() - touch.t) > 0.5;   // a flick counts even if short
    const far = (touch.f || 0) > 0.35 || (fast && (touch.f || 0) > 0.08);
    if (far && touch.dir < 0 && idx === leaves.length - 1) {
      if (floatAnim) { floatAnim.cancel(); floatAnim = null; }
      book.animate([{ translate: "0 0" }, { translate: "-14px 0", offset: 0.3 }, { translate: "6px 0", offset: 0.6 }, { translate: "0 0" }], { duration: 350 })
        .finished.then(() => { if (!signal.aborted) setFloat(idx === leaves.length - 1); });
    }  // nothing after the back cover
    else if (far) turnTo(idx + (touch.dir < 0 ? 1 : -1));
    else renderSingle();                                   // not far enough: the page falls back
    touch = null;
  });

  function update() {
    if (signal.aborted) return;
    if (single) { renderSingle(); return; }
    const t = (scrollY - track.offsetTop) / unit;          // scroll position in units
    const turns = leaves.length;
    let done = 0;
    leaves.forEach((leaf, j) => {
      const start = INTRO + j * (FLIP + HOLD);
      const p = j < turns ? ease((t - start) / FLIP) : 0;
      if (p >= 1) done++;
      leaf.style.transform = `translateZ(${depth(j, p > 0.5)}px) rotateY(${-180 * p}deg)`;
      // Unturned leaves stack first-on-top; turned ones stack last-on-top, switching at the halfway point.
      leaf.style.zIndex = p > 0.5 ? 100 + j : 100 - j;
    });
    setFold(ease(Math.max(0, Math.min(1, (t - 0.1) / 0.7))));
    // The closed book sits centred (cover on the right half → shift left); the closed back cover sits centred too.
    const open = ease((t - INTRO) / FLIP), close = ease((t - (INTRO + (leaves.length - 1) * (FLIP + HOLD))) / FLIP);
    const x = (-pw / 2) * (1 - open) + (pw / 2) * close;
    // Closed (start or end) = tilted on the table, edges showing; it settles flat as it opens.
    const k = Math.max(1 - open, close), end = close > 0.5;
    const ry = ((end ? 9 : -9) + mx * 6) * k, rx = (5 + my * 4) * k;
    book.style.transform = `translateX(${x}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    // The right-side block (page edges, back board, spine) only while the cover opens: on while the book closes it
    // showed bare leather and the spine's dark edge under the last turning page (owner, 28 Oct).
    slabStart.classList.toggle("on", 1 - open > 0.02); slabEnd.classList.toggle("on", k > 0.02 && end);
    book.classList.toggle("open", open > 0.5 && close < 0.5);
    book.classList.toggle("ended", close >= 0.5);
    book.classList.toggle("closing", close > 0);   // the ribbon hangs from the right page, which is gone by now
    setFloat(t < 0.1 || close >= 1);
    // Running head: the chapter on show. The decorations follow the left page of an open spread (the right one at the ends).
    const shown = Math.min(done * 2, faces.length - 1);
    running.textContent = faces[shown].dataset.title || "";
    setChapter(done === 0 || done >= leaves.length ? shown : done * 2 - 1);
    setGlow(done === 0 || done >= leaves.length ? [] : [done * 2 - 1, done * 2]);
  }

  // Timers die with the engine (React unmount / dev double-mount).
  const timers = new Set();
  function later(fn, ms) { const id = setTimeout(() => { timers.delete(id); if (!signal.aborted) fn(); }, ms); timers.add(id); return id; }

  on(window, "scroll", () => { if (!single) requestAnimationFrame(update); }, { passive: true });
  let rt; on(window, "resize", () => { clearTimeout(rt); rt = setTimeout(build, 150); });
  // A page whose words don't fit (narrow phone, bigger system text, different fonts) shrinks its content a little at a
  // time until they do, measured on the visitor's own screen. ponytail: floor 0.7, below that it overflows.
  // Fits = the lowest piece of content (the page number is pinned, so it doesn't count) ends above the bottom padding.
  const overflows = (pg) => {
    const end = Math.max(...[...pg.children].filter((c) => getComputedStyle(c).position !== "absolute").map((c) => c.offsetTop + c.offsetHeight));
    return end > pg.clientHeight - parseFloat(getComputedStyle(pg).paddingBottom) + 1;
  };
  function fitPage(pg) {
    if (!pg || !pg.offsetParent) return;                  // hidden pages measure as 0 high: fit them when shown
    pg.style.transform = pg.style.width = pg.style.height = "";
    for (let s = 1; overflows(pg) && s > 0.7; ) {
      s -= 0.04;
      pg.style.transformOrigin = "0 0"; pg.style.transform = `scale(${s})`; pg.style.width = pg.style.height = `${100 / s}%`;
    }
  }
  function fitPages() { book.querySelectorAll(".page").forEach(fitPage); }

  signal.addEventListener("abort", () => {
    timers.forEach(clearTimeout); clearTimeout(rt); clearTimeout(flatTimer);
    if (floatAnim) floatAnim.cancel();
    book.querySelectorAll(".leaf, .half-base, .flats").forEach((l) => l.remove());
    glows.forEach((g) => g.replaceChildren());
    document.body.classList.remove("engine", "single", "at-end");
  });
  build();
  document.fonts.ready.then(() => { if (!signal.aborted) fitPages(); });
}

/**
 * The back-cover form, for every copy the engine makes (and the plain column): one document-level listener.
 * Turnstile loads only when someone starts filling a form.
 */
export function wireContact(signal, { endpoint, sitekey, email }) {
  let loading = null;
  const loadTurnstile = () => loading ||= new Promise((resolve, reject) => {
    if (window.turnstile) return resolve();
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true; s.onload = () => resolve(); s.onerror = () => { loading = null; reject(); };
    document.head.append(s);
  });
  const widgets = new WeakMap();
  async function prepare(form) {
    if (widgets.has(form)) return;
    widgets.set(form, null);
    try {
      await loadTurnstile();
      widgets.set(form, window.turnstile.render(form.querySelector(".ts"), { sitekey, theme: "light", size: "flexible" }));
    } catch { widgets.delete(form); }
  }
  const formOf = (el) => el?.closest?.("form[data-contact]");

  document.addEventListener("focusin", (e) => { const f = formOf(e.target); if (f && !f.closest("[inert]")) prepare(f); }, { signal });
  document.addEventListener("submit", async (e) => {
    const form = formOf(e.target);
    if (!form) return;
    e.preventDefault();
    const status = form.querySelector(".status"), send = form.querySelector(".send");
    const say = (cls, text) => { status.className = `status ${cls}`; status.textContent = text; };
    const data = new FormData(form);
    if (!data.get("cf-turnstile-response")) {
      prepare(form);
      say("", "One moment: the security check is still running. Press Send again in a few seconds.");
      return;
    }
    send.disabled = true; say("", "Sending…");
    try {
      const res = await fetch(endpoint, { method: "POST", body: data });
      const body = await res.json().catch(() => ({}));
      if (res.ok) { form.reset(); say("ok", "Thanks, I'll reply within two days."); }
      else say("err", `${body.error || "That didn't go through."} Or email ${email}.`);
    } catch {
      say("err", `No connection. Please try again, or email ${email}.`);
    } finally {
      send.disabled = false;
      try { window.turnstile?.reset(widgets.get(form)); } catch { /* widget gone with a rebuilt page */ }
    }
  }, { signal });
}
