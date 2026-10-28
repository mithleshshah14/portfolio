// The 12 faces of the book, in reading order (server-rendered: every word is in the HTML). The engine clones them into
// leaves; without it they show as a column. data-title = the running head.
import { BRANDS, CONTACT_TOPICS, LINKS, TIMELINE } from "@/lib/bookData";

const pno = (n: number) => <span className="pno">{n}</span>;

export function Faces() {
  return (
    <div id="faces">
      <section className="face cover" data-title="">
        <div className="leather" />
        <svg className="tooling" aria-hidden="true"><use href="#tooling-front" /></svg>
        <div className="flap" /><div className="button" />
        <div className="brass">
          <div className="medal">PG</div>
          <div className="plate"><i />MITHLESH SHAH<i /></div>
          <p className="pressed">Founder · Phantom Grace</p>
        </div>
        <p className="hint"><span className="scroll-hint">Scroll to open ↓</span><span className="swipe-hint">Swipe to open ›</span></p>
      </section>

      <section className="face endpaper" data-title="Gwalior">
        <div className="photo">
          {/* eslint-disable-next-line @next/next/no-img-element -- the engine clones faces; plain img clones cleanly */}
          <img src="/book/mithlesh-shah.jpg" alt="Mithlesh Shah" width={381} height={656} decoding="async" />
          <span>Mithlesh Shah, Gwalior</span>
        </div>
      </section>

      <section className="face gutter-r" data-title="Contents">
        <div className="page">
          <h1 className="h2">Hi, I&apos;m Mithlesh.</h1>
          <p className="lead">After eight years building backend systems, I founded Phantom Grace Technologies, the company behind VisaHunt, HuntwiseAI, Ashviora and Silent Arc Studios.</p>
          <ul className="toc">
            <li><button data-goto="3">1 · The engineer</button><span>3</span></li>
            {BRANDS.map((b, i) => (
              <li key={b.name}><button data-goto={5 + i}>{b.chapter} · {b.name}</button><span>{5 + i}</span></li>
            ))}
            <li><button data-goto="9">6 · The path</button><span>9</span></li>
            <li><button data-goto="11">Write to me</button><span>12</span></li>
          </ul>
          <p className="quick">
            <a href={`mailto:${LINKS.email}`}>Email</a> · <a href={LINKS.linkedin} target="_blank" rel="noopener">LinkedIn</a> · <a href={LINKS.github} target="_blank" rel="noopener">GitHub</a>
          </p>
          {pno(2)}
        </div>
      </section>

      <section className="face gutter-l" data-title="Chapter 1 · The engineer">
        <div className="page">
          <p className="ch">Chapter 1</p><h2>The engineer</h2>
          <div className="timeline">
            {TIMELINE.map((t) => [
              <span key={t.company + "y"} className="y">{t.year}</span>,
              <div key={t.company} className={t.now ? "now" : undefined}><b>{t.company}</b><span>{t.role}</span></div>,
            ])}
          </div>
          {pno(3)}
        </div>
      </section>

      <section className="face gutter-r" data-title="Chapter 1 · The engineer">
        <div className="page">
          <h2>What eight years taught me</h2>
          <p className="txt">Large systems stay up when they&apos;re boring: clear contracts, queues that absorb spikes, and nothing clever that someone has to decode at 3am. I build my products the same way, and I train engineering teams to build theirs like that too.</p>
          <div className="nums">
            <div><b>8</b><span>years engineering</span></div><div><b>6</b><span>companies</span></div><div><b>4</b><span>brands</span></div>
          </div>
          <p className="stack">Java · Spring Boot · Kafka · Redis · PostgreSQL · AWS · Kubernetes · Next.js</p>
          {pno(4)}
        </div>
      </section>

      {BRANDS.map((b, i) => (
        <section key={b.name} className={`face ${i % 2 ? "gutter-r" : "gutter-l"} product`} data-title={`Chapter ${b.chapter} · ${b.name}`}>
          <div className="page">
            <p className="ch">Chapter {b.chapter}</p><h2>{b.name}</h2>
            <div className="pasted">
              <div className="tape" />
              {/* eslint-disable-next-line @next/next/no-img-element -- cloned by the engine */}
              <img src={b.image} alt={b.imageAlt} loading="lazy" decoding="async" />
              <span>{b.site}</span>
            </div>
            <p className="txt">{b.text}</p>
            <div className="facts">{b.facts.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}</div>
            <a className="go" href={b.href} target="_blank" rel="noopener">{b.site} →</a>
            {pno(5 + i)}
          </div>
        </section>
      ))}

      <section className="face gutter-l" data-title="Chapter 6 · The path">
        <div className="page">
          <p className="ch">Chapter 6</p>
          <p className="quote">The path appears because you walk.</p>
          <p>I rarely see the whole road before I set out. A first version shows me what the second should be.</p>
          {pno(9)}
        </div>
      </section>

      <section className="face gutter-r" data-title="The end">
        <div className="page">
          <h2>The end of this chapter.</h2>
          <p className="txt">Not of the story. If you&apos;re building something, hiring, looking for a backend trainer for your team, or want to work with one of my brands, I&apos;d like to hear from you.</p>
          <p className="reach">
            {/* A narrow phone breaks it after the @, never inside a word. */}
            <a href={`mailto:${LINKS.email}`}>{LINKS.email.split("@")[0]}@<wbr />{LINKS.email.split("@")[1]}</a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener">LinkedIn →</a>
          </p>
          <p className="txt closing">Keep scrolling and the book closes. Write to me on the back cover.</p>
          {pno(10)}
        </div>
      </section>

      <section className="face contact" data-title="Write to me" id="write">
        <svg className="tooling wide" aria-hidden="true"><use href="#tooling-back" /></svg>
        <svg className="tooling slim" aria-hidden="true"><use href="#tooling-slim" /></svg>
        <div className="page">
          <h2>Write to me</h2>
          {/* Handled by one document-level listener (BookEngine), so every copy the engine makes works. */}
          <form data-contact>
            <label>Your name<input name="name" required maxLength={100} autoComplete="name" /></label>
            <label>Email<input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
            <label>About
              <select name="topic" defaultValue="partnership">
                {CONTACT_TOPICS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
            <label>Message<textarea name="message" required minLength={10} maxLength={2000} /></label>
            <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="ts" />
            <button className="send" type="submit">Send</button>
            <small className="status" role="status">Or email {LINKS.email}</small>
          </form>
          <div className="sign">
            <span className="seal">PG</span>
            <p>Phantom Grace Technologies<br />Gwalior, Madhya Pradesh · <a href={LINKS.linkedin} target="_blank" rel="noopener">LinkedIn</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}
