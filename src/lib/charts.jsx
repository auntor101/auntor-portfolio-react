import { useEffect, useRef, useState } from "react";
import { useTip } from "./Tooltip.jsx";

const GRAY = "#3a4658";
const fmt = n => (n >= 1000 ? n.toLocaleString() : n);

/* Grows bars/fills when the element scrolls into view. Returns a ref + flag. */
function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) { setSeen(true); return; }
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { setSeen(true); obs.disconnect(); } });
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, seen];
}

/* ---------- DONUT ---------- */
export function Donut({ segs, centerLabel }) {
  const tip = useTip();
  const total = segs.reduce((s, d) => s + d[1], 0);
  const cx = 100, cy = 100, r = 88, ir = 56;
  const pol = (deg, rad) => {
    const a = (deg - 90) * Math.PI / 180;
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
  };
  let ang = 0;
  const paths = segs.map(([label, val, color], i) => {
    const frac = val / total, end = ang + frac * 360, big = frac > 0.5 ? 1 : 0;
    const [x1, y1] = pol(ang, r), [x2, y2] = pol(end, r);
    const [x3, y3] = pol(end, ir), [x4, y4] = pol(ang, ir);
    const pct = Math.round(frac * 100);
    const d = `M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${big} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} L${x3.toFixed(1)} ${y3.toFixed(1)} A${ir} ${ir} 0 ${big} 0 ${x4.toFixed(1)} ${y4.toFixed(1)} Z`;
    ang = end;
    return (
      <path key={i} d={d} fill={color} className="seg"
        onMouseMove={e => tip.show(e, `<b>${label}</b>: ${fmt(val)} <span style="color:#475569">(${pct}%)</span>`)}
        onMouseLeave={tip.hide} />
    );
  });
  const big = segs[0], bigPct = Math.round(big[1] / total * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
      <div style={{ position: "relative", width: 200, height: 200 }}>
        <svg className="svg-chart" viewBox="0 0 200 200" style={{ width: 200 }}>{paths}</svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <div style={{ fontFamily: "'Space Grotesk'", fontSize: 34, fontWeight: 700, color: big[2], lineHeight: 1 }}>{bigPct}%</div>
          <div style={{ fontSize: 11, color: "#475569", fontFamily: "'JetBrains Mono'", marginTop: 2, textAlign: "center", maxWidth: 110 }}>{centerLabel || big[0]}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {segs.map(([label, val, color], i) => (
          <div key={i} className="legend-item">
            <span className="legend-dot" style={{ background: color }} />
            {label} — <b style={{ color: "#F0F4FF", marginLeft: 3 }}>{Math.round(val / total * 100)}%</b>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- HORIZONTAL BARS (single series) ---------- */
export function HBars({ items, color, padL = 150, fmtVal }) {
  const tip = useTip();
  const [ref, seen] = useInView();
  const max = Math.max(...items.map(d => d[1]));
  const rowH = 46, padR = 70, w = 720, h = items.length * rowH + 10, barW = w - padL - padR;
  return (
    <svg ref={ref} className="svg-chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
      {items.map(([label, val, c], i) => {
        const bw = Math.max(2, val / max * barW), y = i * rowH + 8, col = c || color;
        const disp = fmtVal ? fmtVal(val) : fmt(val);
        return (
          <g key={i}>
            <text className="cat-label" x={padL - 12} y={y + 18} textAnchor="end">{label}</text>
            <rect className="bar-rect" x={padL} y={y + 5} width={seen ? bw : 0} height={22} rx={4} fill={col}
              style={{ transition: "width 1s cubic-bezier(.16,1,.3,1)" }}
              onMouseMove={e => tip.show(e, `<b>${label}</b>: ${disp}`)} onMouseLeave={tip.hide} />
            <text className="val-label" x={padL + bw + 10} y={y + 21} fill={col}>{disp}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- GROUPED HORIZONTAL (two series) ---------- */
export function GroupedH({ items, labelKey, labA, labB, colA, colB, suffix = "%", padL = 150 }) {
  const tip = useTip();
  const [ref, seen] = useInView();
  const max = Math.max(...items.flatMap(d => [d.d ?? d.s1, d.h ?? d.s2]));
  const keyA = items[0].d !== undefined ? "d" : "s1";
  const keyB = items[0].h !== undefined ? "h" : "s2";
  const grpH = 58, padR = 60, w = 720, h = items.length * grpH + 10, barW = w - padL - padR;
  return (
    <>
      <svg ref={ref} className="svg-chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
        {items.map((d, i) => {
          const y = i * grpH + 8;
          const aw = Math.max(2, d[keyA] / max * barW), bw = Math.max(2, d[keyB] / max * barW);
          return (
            <g key={i}>
              <text className="cat-label" x={padL - 12} y={y + 24} textAnchor="end">{d[labelKey]}</text>
              <rect className="bar-rect" x={padL} y={y + 2} width={seen ? aw : 0} height={18} rx={3} fill={colA}
                style={{ transition: "width 1s cubic-bezier(.16,1,.3,1)" }}
                onMouseMove={e => tip.show(e, `<b>${d[labelKey]}</b> — ${labA}: ${d[keyA]}${suffix}`)} onMouseLeave={tip.hide} />
              <text className="val-label" x={padL + aw + 8} y={y + 15} fill={colA} style={{ fontSize: 11 }}>{d[keyA]}{suffix}</text>
              <rect className="bar-rect" x={padL} y={y + 24} width={seen ? bw : 0} height={18} rx={3} fill={colB}
                style={{ transition: "width 1s cubic-bezier(.16,1,.3,1)" }}
                onMouseMove={e => tip.show(e, `<b>${d[labelKey]}</b> — ${labB}: ${d[keyB]}${suffix}`)} onMouseLeave={tip.hide} />
              <text className="val-label" x={padL + bw + 8} y={y + 37} fill={colB} style={{ fontSize: 11 }}>{d[keyB]}{suffix}</text>
            </g>
          );
        })}
      </svg>
      <div className="legend">
        <div className="legend-item"><span className="legend-dot" style={{ background: colA }} />{labA}</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: colB }} />{labB}</div>
      </div>
    </>
  );
}

/* ---------- GROUPED VERTICAL (counts, two series) ---------- */
export function GroupedV({ items, labelKey, labA, labB, colA, colB }) {
  const tip = useTip();
  const keyA = "d", keyB = "h";
  const max = Math.max(...items.flatMap(d => [d[keyA], d[keyB]]));
  const w = 720, h = 300, padL = 46, padB = 54, padT = 14, padR = 14;
  const plotH = h - padB - padT, plotW = w - padL - padR;
  const grpW = plotW / items.length, bw = Math.min(38, grpW / 2 - 6);
  return (
    <>
      <svg className="svg-chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
        <line x1={padL} y1={padT + plotH} x2={w - padR} y2={padT + plotH} stroke="rgba(255,255,255,.1)" />
        {items.map((d, i) => {
          const gx = padL + i * grpW + grpW / 2;
          const ah = d[keyA] / max * plotH, bh = d[keyB] / max * plotH;
          return (
            <g key={i}>
              <rect className="bar-rect" x={gx - bw - 3} y={padT + plotH - ah} width={bw} height={ah} rx={3} fill={colA}
                onMouseMove={e => tip.show(e, `<b>${d[labelKey]}</b> — ${labA}: ${fmt(d[keyA])}`)} onMouseLeave={tip.hide} />
              <rect className="bar-rect" x={gx + 3} y={padT + plotH - bh} width={bw} height={bh} rx={3} fill={colB}
                onMouseMove={e => tip.show(e, `<b>${d[labelKey]}</b> — ${labB}: ${fmt(d[keyB])}`)} onMouseLeave={tip.hide} />
              <text className="cat-label" x={gx} y={h - padB + 22} textAnchor="middle" style={{ fontSize: 11.5 }}>{d[labelKey]}</text>
            </g>
          );
        })}
      </svg>
      <div className="legend">
        <div className="legend-item"><span className="legend-dot" style={{ background: colA }} />{labA}</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: colB }} />{labB}</div>
      </div>
    </>
  );
}

/* ---------- VERTICAL BARS (single series) ---------- */
export function VBars({ items, color, highlight, topVal, fmtVal, h = 300, padB = 50 }) {
  const tip = useTip();
  const vals = items.map(d => d[1]), max = Math.max(...vals);
  const w = 720, padL = 20, padT = 24, padR = 20;
  const plotH = h - padB - padT, plotW = w - padL - padR;
  const gap = 8, bw = (plotW - gap * (items.length - 1)) / items.length;
  return (
    <svg className="svg-chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
      {items.map(([label, val, c], i) => {
        const x = padL + i * (bw + gap), bh = Math.max(2, val / max * plotH);
        const col = c || (highlight && highlight(label, val) ? color : "rgba(255,255,255,.14)");
        const disp = fmtVal ? fmtVal(val) : fmt(val);
        return (
          <g key={i}>
            <rect className="bar-rect" x={x} y={padT + plotH - bh} width={bw} height={bh} rx={4} fill={col}
              onMouseMove={e => tip.show(e, `<b>${label}</b>: ${disp}`)} onMouseLeave={tip.hide} />
            <text className="val-label" x={x + bw / 2} y={padT + plotH - bh - 7} textAnchor="middle"
              style={{ fontSize: 11, fill: col === "rgba(255,255,255,.14)" ? "#475569" : col }}>
              {topVal ? topVal(val) : ""}
            </text>
            <text className="cat-label" x={x + bw / 2} y={h - padB + 20} textAnchor="middle" style={{ fontSize: 11 }}>{label}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- LINE / AREA ---------- */
export function LineChart({ items, color, fmtVal }) {
  const tip = useTip();
  const vals = items.map(d => d[1]), max = Math.max(...vals) * 1.15;
  const w = 720, h = 270, padL = 44, padB = 44, padT = 20, padR = 24;
  const plotH = h - padB - padT, plotW = w - padL - padR;
  const X = i => padL + i * (plotW / (items.length - 1));
  const Y = v => padT + plotH - v / max * plotH;
  const pts = items.map((d, i) => `${X(i).toFixed(1)},${Y(d[1]).toFixed(1)}`).join(" ");
  const area = `${pts} ${X(items.length - 1)},${padT + plotH} ${X(0)},${padT + plotH}`;
  return (
    <svg className="svg-chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
      <polygon points={area} fill={color} opacity="0.08" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      {items.map((d, i) => (
        <g key={i}>
          <circle cx={X(i)} cy={Y(d[1])} r={5} fill={color} stroke="#05080D" strokeWidth={2}
            onMouseMove={e => tip.show(e, `<b>${d[0]}</b>: ${fmtVal ? fmtVal(d[1]) : d[1]}`)} onMouseLeave={tip.hide} />
          <text className="cat-label" x={X(i)} y={h - padB + 22} textAnchor="middle" style={{ fontSize: 11.5 }}>{d[0]}</text>
          <text className="val-label" x={X(i)} y={Y(d[1]) - 12} textAnchor="middle" fill={color} style={{ fontSize: 11 }}>{fmtVal ? fmtVal(d[1]) : d[1]}</text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- TWO-VALUE COMPARISON ---------- */
export function VsCompare({ a, b, suffix = "", fmtVal }) {
  const [ref, seen] = useInView();
  const max = Math.max(a[1], b[1]);
  const fmtV = v => (fmtVal ? fmtVal(v) : fmt(v) + suffix);
  const Col = ([label, val, color]) => (
    <div className="vs-col">
      <div className="vs-big" style={{ color }}>{fmtV(val)}</div>
      <div className="vs-cap">{label}</div>
      <div className="vs-bar-track">
        <div className="vs-bar-fill" style={{ background: color, width: seen ? `${(val / max * 100).toFixed(0)}%` : 0 }} />
      </div>
    </div>
  );
  return <div className="vs-wrap" ref={ref}>{Col(a)}{Col(b)}</div>;
}

/* ---------- GRID OF 100 ---------- */
export function Grid100({ n, color }) {
  return (
    <>
      <div className="grid100">
        {Array.from({ length: 100 }, (_, i) => (
          <div key={i} className="gsq"
            style={{ background: i < n ? color : "rgba(255,255,255,.06)", border: `1px solid ${i < n ? color + "66" : "rgba(255,255,255,.1)"}` }} />
        ))}
      </div>
      <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.6 }}>
        <strong style={{ color, fontSize: 30, fontFamily: "'Space Grotesk'", fontWeight: 700, marginRight: 6 }}>{n}</strong>
        out of every 100 patients who had diabetes were correctly flagged by a check based on their basic health numbers.
      </p>
      <p style={{ fontSize: 12.5, color: "#475569", marginTop: 8 }}>
        The other {100 - n} were missed. Catching a condition is harder when only about 1 in 15 people has it.
      </p>
    </>
  );
}

/* ---------- GAUGE (semicircle KPI, dashboard-style) ---------- */
export function Gauge({ value, max = 100, color, label, suffix = "%", note }) {
  const [ref, seen] = useInView();
  const cx = 150, cy = 150, r = 118, sw = 26;
  const pct = Math.min(1, value / max);
  const pol = deg => {
    const a = (deg - 180) * Math.PI / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const arc = (from, to) => {
    const [x1, y1] = pol(from), [x2, y2] = pol(to);
    const big = to - from > 180 ? 1 : 0;
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${big} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  };
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg className="svg-chart" viewBox="0 0 300 180" style={{ maxWidth: 340 }}>
        <path d={arc(0, 180)} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth={sw} strokeLinecap="round" />
        <path d={arc(0, seen ? 180 * pct : 0)} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round"
          style={{ transition: "all 1.2s cubic-bezier(.16,1,.3,1)" }} />
        <text x={cx} y={cy - 18} textAnchor="middle" style={{ fontFamily: "'Space Grotesk'", fontSize: 46, fontWeight: 700, fill: color }}>
          {value}{suffix}
        </text>
        <text x={cx} y={cy + 8} textAnchor="middle" style={{ fontFamily: "'IBM Plex Sans'", fontSize: 13, fill: "var(--body)" }}>
          {label}
        </text>
      </svg>
      {note && <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4, textAlign: "center", maxWidth: 380, lineHeight: 1.6 }}>{note}</p>}
    </div>
  );
}

/* ---------- LOLLIPOP (dot + stem, cleaner than bars for rankings) ---------- */
export function Lollipop({ items, color, padL = 150, fmtVal, suffix = "" }) {
  const tip = useTip();
  const [ref, seen] = useInView();
  const max = Math.max(...items.map(d => d[1]));
  const rowH = 44, padR = 80, w = 720, h = items.length * rowH + 10, barW = w - padL - padR;
  return (
    <svg ref={ref} className="svg-chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
      {items.map(([label, val, c], i) => {
        const x2 = padL + (val / max) * barW, y = i * rowH + 26, col = c || color;
        const disp = fmtVal ? fmtVal(val) : fmt(val) + suffix;
        return (
          <g key={i}>
            <text className="cat-label" x={padL - 14} y={y + 4} textAnchor="end">{label}</text>
            <line x1={padL} y1={y} x2={seen ? x2 : padL} y2={y} stroke={col} strokeWidth={2.5} strokeLinecap="round"
              style={{ transition: "all 1s cubic-bezier(.16,1,.3,1)" }} opacity={0.5} />
            <circle cx={seen ? x2 : padL} cy={y} r={8} fill={col} className="bar-rect"
              style={{ transition: "all 1s cubic-bezier(.16,1,.3,1)" }}
              onMouseMove={e => tip.show(e, `<b>${label}</b>: ${disp}`)} onMouseLeave={tip.hide} />
            <text className="val-label" x={(seen ? x2 : padL) + 16} y={y + 4} fill={col} style={{ fontSize: 12.5 }}>{disp}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- SLOPE (two points joined by a line; best for before/after, A vs B) ---------- */
export function Slope({ items, labA, labB, colA, colB, suffix = "" }) {
  const tip = useTip();
  const [ref, seen] = useInView();
  const allv = items.flatMap(d => [d.s1, d.s2]);
  const max = Math.max(...allv) * 1.1, min = Math.min(...allv, 0);
  const w = 720, h = 320, padT = 30, padB = 40, xL = 200, xR = 520;
  const plotH = h - padT - padB;
  const Y = v => padT + plotH - ((v - min) / (max - min)) * plotH;
  return (
    <>
      <svg ref={ref} className="svg-chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
        <text x={xL} y={18} textAnchor="middle" className="cat-label" style={{ fill: colA, fontSize: 12.5 }}>{labA}</text>
        <text x={xR} y={18} textAnchor="middle" className="cat-label" style={{ fill: colB, fontSize: 12.5 }}>{labB}</text>
        <line x1={xL} y1={padT} x2={xL} y2={padT + plotH} stroke="rgba(255,255,255,.08)" />
        <line x1={xR} y1={padT} x2={xR} y2={padT + plotH} stroke="rgba(255,255,255,.08)" />
        {items.map((d, i) => {
          const y1 = Y(d.s1), y2 = Y(d.s2);
          const x2end = seen ? xR : xL, y2end = seen ? y2 : y1;
          return (
            <g key={i}>
              <line x1={xL} y1={y1} x2={x2end} y2={y2end} stroke="var(--muted)" strokeWidth={1.5} opacity={0.5}
                style={{ transition: "all 1s cubic-bezier(.16,1,.3,1)" }} />
              <circle cx={xL} cy={y1} r={6} fill={colA} className="bar-rect"
                onMouseMove={e => tip.show(e, `<b>${d.f}</b> — ${labA}: ${d.s1}${suffix}`)} onMouseLeave={tip.hide} />
              <circle cx={x2end} cy={y2end} r={6} fill={colB} className="bar-rect"
                style={{ transition: "all 1s cubic-bezier(.16,1,.3,1)" }}
                onMouseMove={e => tip.show(e, `<b>${d.f}</b> — ${labB}: ${d.s2}${suffix}`)} onMouseLeave={tip.hide} />
              <text x={xL - 14} y={y1 + 4} textAnchor="end" className="cat-label" style={{ fontSize: 12 }}>{d.f}</text>
              <text x={xL + 12} y={y1 + 4} fill={colA} style={{ fontSize: 11, fontFamily: "'Space Grotesk'", fontWeight: 600 }}>{d.s1}{suffix}</text>
              <text x={xR - 12} y={Y(d.s2) + 4} textAnchor="end" fill={colB} style={{ fontSize: 11, fontFamily: "'Space Grotesk'", fontWeight: 600 }}>{d.s2}{suffix}</text>
            </g>
          );
        })}
      </svg>
    </>
  );
}

/* ---------- KPI TILES (dashboard stat row) ---------- */
export function KPITiles({ tiles }) {
  return (
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
      {tiles.map(([value, label, color, sub], i) => (
        <div key={i} style={{ flex: 1, minWidth: 150, padding: "22px 24px", borderRadius: 12,
          background: color + "0d", border: `1px solid ${color}2b` }}>
          <div style={{ fontFamily: "'Space Grotesk'", fontSize: 34, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
          <div style={{ fontSize: 13, color: "var(--body)", marginTop: 8 }}>{label}</div>
          {sub && <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 4, fontFamily: "'JetBrains Mono'" }}>{sub}</div>}
        </div>
      ))}
    </div>
  );
}

export { GRAY, fmt };
