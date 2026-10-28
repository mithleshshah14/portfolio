// Hidden SVG drawings shared by the faces (from the prototype): the pressed sprig and the tooled-leather symbols
// (front: vine band, beaded rule, corner scrolls, fleurons, cartouche; back: border; slim: phone back cover).
export function Tooling() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      {/* A pressed sprig: one stem, leaves in pairs, colour from `color`. */}
      <symbol id="sprig" viewBox="0 0 120 260">
        <path d="M58 258 C 56 205, 60 150, 68 102 S 84 32, 94 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" opacity=".85"/>
        <g fill="currentColor">
          <path d="M58 222 c -20 -6 -34 -22 -36 -40 c 18 2 32 16 36 40z"/><path d="M60 206 c 18 -10 30 -28 30 -46 c -16 6 -28 22 -30 46z"/>
          <path d="M62 176 c -20 -6 -32 -22 -34 -40 c 18 2 30 16 34 40z"/><path d="M65 156 c 18 -10 28 -28 28 -46 c -16 6 -26 22 -28 46z"/>
          <path d="M68 126 c -18 -6 -30 -20 -32 -37 c 16 2 28 15 32 37z"/><path d="M72 104 c 16 -9 26 -25 26 -42 c -14 6 -24 20 -26 42z"/>
          <path d="M77 76 c -16 -5 -26 -18 -28 -33 c 15 2 25 14 28 33z"/><path d="M82 56 c 14 -8 22 -22 22 -36 c -12 5 -20 18 -22 36z"/>
          <path d="M90 24 c -10 -4 -16 -12 -16 -22 c 10 2 15 10 16 22z"/>
        </g>
      </symbol>
      {/* A single fallen leaf: blade, a lighter midrib, a short stalk. */}
      <symbol id="leaf" viewBox="0 0 40 72">
        <path d="M20 4 C 4 18, 3 44, 20 60 C 37 44, 36 18, 20 4z" fill="currentColor"/>
        <path d="M20 8 C 21 26, 21 44, 20 60 L 20 70" fill="none" stroke="rgba(255,248,230,.45)" strokeWidth="1.6" strokeLinecap="round"/>
      </symbol>
      {/* Tooled leather (owner's reference photo): vine border band, a rule, corner scrolls, side fleurons, a plain cartouche.
           Drawn twice by .tooling: a light edge offset down-right, then the dark groove, so it reads as pressed into the leather. */}
      <pattern id="vine-lo" width="40" height="40" patternUnits="userSpaceOnUse" x="22" y="22"><path d="M0 20 C10 5 20 5 20 20 S30 35 40 20 M9 13 c-5 -7 4 -12 7 -5 M31 27 c5 7 -4 12 -7 5 M20 20 c-3 -4 -1 -8 3 -8 M20 20 c3 4 1 8 -3 8" fill="none" stroke="rgba(48,15,3,.78)" strokeWidth="2.4" strokeLinecap="round"/></pattern>
      <pattern id="vine-hi" width="40" height="40" patternUnits="userSpaceOnUse" x="22" y="22"><path d="M0 20 C10 5 20 5 20 20 S30 35 40 20 M9 13 c-5 -7 4 -12 7 -5 M31 27 c5 7 -4 12 -7 5 M20 20 c-3 -4 -1 -8 3 -8 M20 20 c3 4 1 8 -3 8" fill="none" stroke="rgba(255,218,176,.42)" strokeWidth="2.4" strokeLinecap="round"/></pattern>
      <g id="tool-border" fill="none">
        <rect x="22" y="22" width="676" height="956" rx="6"/><rect x="62" y="62" width="596" height="876" rx="4"/>
        <path d="M22 22 h676 v956 h-676z M62 62 v876 h596 v-876z" style={{ fill: "var(--vine)" }} stroke="none"/>
        <rect x="84" y="84" width="552" height="832" rx="3"/>
        <rect x="73" y="73" width="574" height="854" rx="3" strokeDasharray="0 9" strokeLinecap="round" strokeWidth="4"/>
      </g>
      <g id="tool-corner" fill="none">
        <path d="M96 262 C96 162 162 96 262 96 M120 250 C122 176 176 122 250 120"/>
        <path d="M150 212 C140 170 170 140 212 150 C242 158 238 198 207 197 C186 196 184 172 201 171 M150 212 C158 242 198 238 197 207 C196 186 172 184 171 201"/>
        <path d="M178 182 c14 -4 26 -16 30 -30 c-14 4 -26 16 -30 30z M262 96 c-10 12 -10 26 0 34 c10 -8 10 -22 0 -34z M96 262 c12 -10 26 -10 34 0 c-8 10 -22 10 -34 0z"/>
        <path d="M106 210 c10 -8 22 -8 28 2 c-10 6 -22 6 -28 -2z M210 106 c-8 10 -8 22 2 28 c6 -10 6 -22 -2 -28z M118 168 c12 -4 22 4 18 16 M168 118 c-4 12 4 22 16 18"/>
        <path d="M96 96 m10 52 c4 -22 20 -38 42 -42 M96 96 m26 46 c4 -12 12 -20 24 -24 M110 110 l18 18"/>
        <path d="M262 130 C300 136 312 160 300 176 C292 188 274 184 276 170 M130 262 C136 300 160 312 176 300 C188 292 184 274 170 276"/>
        <path d="M300 96 c12 8 30 8 42 0 M96 300 c8 12 8 30 0 42"/>
      </g>
      <g id="tool-fleuron" fill="none">
        <path d="M-66 16 C-36 12 -18 36 0 58 C18 36 36 12 66 16 M-34 26 C-44 42 -28 52 -18 42 M34 26 C44 42 28 52 18 42 M0 58 c-9 -13 -9 -28 0 -38 c9 10 9 25 0 38z M-92 10 c-10 10 -26 8 -30 -4 M92 10 c10 10 26 8 30 -4 M0 58 v18 M-14 70 c6 6 22 6 28 0"/>
      </g>
      <g id="tool-centre" fill="none">
        <use href="#tool-corner"/><use href="#tool-corner" transform="translate(720 0) scale(-1 1)"/>
        <use href="#tool-corner" transform="translate(0 1000) scale(1 -1)"/><use href="#tool-corner" transform="translate(720 1000) scale(-1 -1)"/>
        <use href="#tool-fleuron" transform="translate(360 84)"/><use href="#tool-fleuron" transform="translate(360 916) rotate(180)"/>
        <use href="#tool-fleuron" transform="translate(84 500) rotate(-90)"/><use href="#tool-fleuron" transform="translate(636 500) rotate(90)"/>
        <path id="cartouche" d="M220 175 H330 Q360 148 390 175 H500 A45 45 0 0 0 545 220 V470 Q572 500 545 530 V780 A45 45 0 0 0 500 825 H390 Q360 852 330 825 H220 A45 45 0 0 0 175 780 V530 Q148 500 175 470 V220 A45 45 0 0 0 220 175Z"/>
        <use href="#cartouche" transform="translate(360 500) scale(.94) translate(-360 -500)"/>
      </g>
      <symbol id="tooling-front" viewBox="0 0 720 1000" preserveAspectRatio="none">
        <path d="M22 22 h676 v956 h-676z M62 62 v876 h596 v-876z" fill="rgba(55,20,5,.18)" fillRule="evenodd"/>
        <path d="M84 84 h552 v832 h-552z M220 175 H330 Q360 148 390 175 H500 A45 45 0 0 0 545 220 V470 Q572 500 545 530 V780 A45 45 0 0 0 500 825 H390 Q360 852 330 825 H220 A45 45 0 0 0 175 780 V530 Q148 500 175 470 V220 A45 45 0 0 0 220 175Z" fill="rgba(55,20,5,.2)" fillRule="evenodd"/>
        <g className="hi" transform="translate(2 2.6)"><use href="#tool-border"/><use href="#tool-centre"/></g>
        <g className="lo"><use href="#tool-border"/><use href="#tool-centre"/></g>
      </symbol>
      <symbol id="tooling-back" viewBox="0 0 720 1000" preserveAspectRatio="none">
        <g className="hi" transform="translate(2 2.6)"><use href="#tool-border"/></g>
        <g className="lo"><use href="#tool-border"/></g>
      </symbol>
      {/* Phone back cover: the form needs the room, so just two rules and the beads close to the edge. */}
      <g id="tool-slim" fill="none"><rect x="14" y="14" width="692" height="972" rx="5"/><rect x="34" y="34" width="652" height="932" rx="3"/>
        <rect x="24" y="24" width="672" height="952" rx="4" strokeDasharray="0 9" strokeLinecap="round" strokeWidth="4"/></g>
      <symbol id="tooling-slim" viewBox="0 0 720 1000" preserveAspectRatio="none">
        <g className="hi" transform="translate(2 2.6)"><use href="#tool-slim"/></g>
        <g className="lo"><use href="#tool-slim"/></g>
      </symbol>
    </svg>
  );
}
