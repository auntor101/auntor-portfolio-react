import { useEffect, useRef, useState } from "react";

// Vibrant palette used by every project dashboard.
export const C = { pink: "#ff2d95", cyan: "#00e0ff", lime: "#c6ff00", amber: "#ffb300", violet: "#8a5cff", coral: "#ff5a3c" };
export const nf = (n) => n.toLocaleString("en-US");
export const path = (pts) => pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join("");

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
// Colour ramp over a list of hex stops, t in [0, 1].
export function ramp(stops, t) {
  const x = Math.min(Math.max(t, 0), 1) * (stops.length - 1), i = Math.min(Math.floor(x), stops.length - 2), f = x - i;
  const a = hex(stops[i]), b = hex(stops[i + 1]);
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(",")})`;
}

export function Glow({ id }) {
  return <defs><filter id={id} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>;
}

// A dark, saturated card; its children animate in once it scrolls into view (see projects.css).
export function Stage({ n, title, sub, read, note, children }) {
  const ref = useRef(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <figure className={"stage" + (go ? " go" : "")} ref={ref}>
      <figcaption>
        <span className="st-n">0{n}</span>
        <div><h2>{title}</h2><p>{sub}</p></div>
      </figcaption>
      <p className="st-read" aria-live="polite">{read || " "}</p>
      {children}
      {note && <p className="st-note">{note}</p>}
    </figure>
  );
}
