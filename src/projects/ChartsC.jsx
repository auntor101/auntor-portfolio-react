import { useState } from "react";
import R from "../data/dengue.json";
import { C, Stage, Glow, path, nf, ramp } from "./kit.jsx";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const HEAT = ["#17133f", "#5b2bd6", "#ff2d95", "#ffb300", "#fff36b"];
const DIV = Object.entries(R.division).sort((a, b) => b[1].inc100k - a[1].inc100k);
const DCOL = [C.pink, C.coral, C.amber, C.lime, C.cyan, C.violet, "#3dffb5", "#ff8ad8"];

// annular sector from angle a0 to a1 (radians, 0 = 12 o'clock, clockwise)
const sector = (a0, a1, r0, r1) => {
  const p = (a, r) => [200 + r * Math.sin(a), 200 - r * Math.cos(a)];
  const [x0, y0] = p(a0, r1), [x1, y1] = p(a1, r1), [x2, y2] = p(a1, r0), [x3, y3] = p(a0, r0);
  return `M${x0},${y0}A${r1},${r1} 0 0 1 ${x1},${y1}L${x2},${y2}A${r0},${r0} 0 0 0 ${x3},${y3}Z`;
};

// 1. Seasonal clock: share of all cases by calendar month.
function Clock() {
  const [h, setH] = useState(null);
  const sh = R.month_share, mx = Math.max(...Object.values(sh)), top3 = sh[9] + sh[10] + sh[11];
  return (
    <Stage n={1} title={`September to November holds ${top3.toFixed(0)}% of all cases`} sub="Share of reported cases by calendar month, 2020 to 2025"
      read={h ? <><b>{MONTHS[h - 1]}</b>: {sh[h]}% of all cases</> : "Hover a month."}>
      <svg viewBox="0 0 400 400" style={{ maxWidth: 440, margin: "0 auto" }} role="img" aria-label="Radial bar chart of dengue cases by calendar month">
        {[0.25, 0.5, 1].map((f) => <circle key={f} cx="200" cy="200" r={46 + f * 100} fill="none" className="gl" />)}
        {MONTHS.map((m, i) => {
          const a0 = (i * 30 + 2) * Math.PI / 180, a1 = (i * 30 + 28) * Math.PI / 180, v = sh[i + 1], r1 = 46 + (v / mx) * 100, mid = (i * 30 + 15) * Math.PI / 180;
          return (
            <g key={m} className="hit" onMouseEnter={() => setH(i + 1)} onMouseLeave={() => setH(null)}>
              <path className="gs" d={sector(a0, a1, 46, r1)} fill={ramp(HEAT, v / mx)} style={{ transformOrigin: "200px 200px", transitionDelay: `${i * 0.06}s` }} />
              <text x={200 + 184 * Math.sin(mid)} y={200 - 184 * Math.cos(mid) + 4} textAnchor="middle" className="hi">{m}</text>
              {v >= 10 && <text x={200 + (r1 + 12) * Math.sin(mid)} y={200 - (r1 + 12) * Math.cos(mid) + 4} textAnchor="middle" style={{ fill: "#fff" }}>{v}%</text>}
            </g>
          );
        })}
      </svg>
    </Stage>
  );
}

// 2. Monthly cases against temperature.
function Timeline() {
  const [h, setH] = useState(null);
  const M = R.monthly, n = M.dates.length, mx = Math.max(...M.cases);
  const X = (i) => 56 + (i / (n - 1)) * 700, Y = (v) => 240 - (v / 80000) * 215, YT = (t) => 240 - ((t - 15) / 17) * 215;
  const area = path(M.cases.map((v, i) => [X(i), Y(v)])) + `L${X(n - 1)},240L${X(0)},240Z`;
  const onMove = (e) => { const r = e.currentTarget.getBoundingClientRect(); setH(Math.max(0, Math.min(n - 1, Math.round((((e.clientX - r.left) / r.width) * 800 - 56) / 700 * (n - 1))))); };
  return (
    <Stage n={2} title={`One huge season: ${nf(mx)} cases in a single month`} sub="National monthly cases (filled) and mean temperature (dashed), 2020 to 2025"
      read={h != null ? <><b>{M.dates[h].slice(0, 7)}</b>: {nf(M.cases[h])} cases, {M.temp[h]}°C, humidity {Math.round(M.hum[h] * 100)}%</> : `Peak ${nf(mx)} cases in ${M.dates[M.cases.indexOf(mx)].slice(0, 7)}.`}
      note="Cases follow temperature about three months later (ρ = 0.65); both are strongly seasonal, so this is an association, not proof of cause.">
      <svg viewBox="0 0 800 270" role="img" aria-label="Monthly dengue cases and temperature" onPointerMove={onMove} onPointerLeave={() => setH(null)}>
        <Glow id="c2" />
        <defs><linearGradient id="c2a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.pink} stopOpacity=".85" /><stop offset="1" stopColor={C.violet} stopOpacity=".05" /></linearGradient></defs>
        {[0, 20000, 40000, 60000, 80000].map((v) => <g key={v}><line className="gl" x1="56" x2="756" y1={Y(v)} y2={Y(v)} /><text x="48" y={Y(v) + 4} textAnchor="end">{v / 1000}k</text></g>)}
        {[2020, 2021, 2022, 2023, 2024, 2025].map((y, i) => <text key={y} x={X(i * 12)} y="262">{y}</text>)}
        {[16, 24, 32].map((t) => <text key={t} x="764" y={YT(t) + 4} style={{ fill: C.amber }}>{t}°</text>)}
        <path className="fade" d={area} fill="url(#c2a)" />
        <path className="draw" pathLength="1" fill="none" stroke={C.pink} strokeWidth="2.4" filter="url(#c2)" d={path(M.cases.map((v, i) => [X(i), Y(v)]))} />
        <path className="draw" pathLength="1" fill="none" stroke={C.amber} strokeWidth="1.8" strokeDasharray="1" d={path(M.temp.map((t, i) => [X(i), YT(t)]))} style={{ transitionDelay: ".4s" }} />
        {h != null && <><line x1={X(h)} x2={X(h)} y1="20" y2="240" stroke="#fff" opacity=".3" /><circle cx={X(h)} cy={Y(M.cases[h])} r="5" fill={C.pink} /></>}
      </svg>
    </Stage>
  );
}

// 3. Burden against severity by division.
function Burden() {
  const [h, setH] = useState(null);
  const X = (v) => 70 + (v / 850) * 690, Y = (v) => 240 - (v / 0.75) * 215;
  return (
    <Stage n={3} title="Many cases and many deaths are different problems" sub="Cases per 100,000 against case fatality by division; bubble size is deaths"
      read={h ? <><b>{h[0]}</b>: {h[1].inc100k} cases per 100,000, fatality {h[1].cfr}%, {nf(h[1].deaths)} deaths</> : "Hover a bubble."}
      note="Dhaka’s deaths may include severe patients referred from other divisions, so its high fatality does not prove the disease is more lethal there.">
      <svg viewBox="0 0 800 290" role="img" aria-label="Bubble chart of dengue incidence against fatality by division">
        <Glow id="c3" />
        {[0, 200, 400, 600, 800].map((v) => <g key={v}><line className="gl" x1={X(v)} x2={X(v)} y1="20" y2="240" /><text x={X(v)} y="260" textAnchor="middle">{v}</text></g>)}
        {[0, 0.2, 0.4, 0.6].map((v) => <g key={v}><line className="gl" x1="70" x2="760" y1={Y(v)} y2={Y(v)} /><text x="62" y={Y(v) + 4} textAnchor="end">{v}%</text></g>)}
        <text x="415" y="282" textAnchor="middle">cases per 100,000</text>
        {DIV.map(([name, d], i) => {
          const r = 6 + Math.sqrt(d.deaths) * 0.62, below = ["Barishal", "Khulna", "Rajshahi", "Sylhet"].includes(name), side = name === "Rangpur";
          return (
            <g key={name} className="hit" onMouseEnter={() => setH([name, d])} onMouseLeave={() => setH(null)}>
              <circle className="pop" cx={X(d.inc100k)} cy={Y(d.cfr)} r={r} fill={DCOL[i]} opacity=".78" filter="url(#c3)" style={{ transitionDelay: `${i * 0.1}s` }} />
              <text x={side ? X(d.inc100k) + r + 6 : X(d.inc100k)} y={side ? Y(d.cfr) + 4 : below ? Y(d.cfr) + r + 14 : Y(d.cfr) - r - 5} textAnchor={side ? "start" : "middle"} className="hi">{name}</text>
            </g>
          );
        })}
      </svg>
    </Stage>
  );
}

// 4. Relative risk by division and year, diverging around 1.
const risk = (v) => {
  const t = Math.max(-1, Math.min(1, Math.log2(v) / 3));
  return t < 0 ? ramp(["#17133f", "#00e0ff"], -t) : ramp(["#17133f", "#ff2d95", "#ffb300"], t);
};
function RiskMap() {
  const [h, setH] = useState(null);
  const ys = Object.keys(R.yearly);
  return (
    <Stage n={4} title="Dhaka and Barishal run hot every year; Sylhet and Rangpur stay cold" sub="Each division’s incidence relative to the national rate (1.0 = national average)"
      read={h ? <><b>{h[0]} {h[1]}</b>: {h[2]}× the national rate</> : "Hover a cell. Pink to amber is above the national rate, cyan is below."}>
      <svg viewBox="0 0 800 330" role="img" aria-label="Heatmap of relative dengue risk by division and year">
        {ys.map((y, c) => <text key={y} x={170 + c * 100 + 46} y="16" textAnchor="middle" className="hi">{y}</text>)}
        {DIV.map(([name], r) => (
          <g key={name}>
            <text x="150" y={52 + r * 34} textAnchor="end" className="hi">{name}</text>
            {ys.map((y, c) => {
              const v = R.rr[name][y];
              return (
                <g key={y} className="hit" onMouseEnter={() => setH([name, y, v])} onMouseLeave={() => setH(null)}>
                  <rect className="pop" x={170 + c * 100} y={30 + r * 34} width="92" height="30" rx="5" fill={risk(v)} style={{ transitionDelay: `${(r + c) * 0.04}s` }} />
                  <text x={170 + c * 100 + 46} y={50 + r * 34} textAnchor="middle" style={{ fill: v > 1.6 ? "#14102f" : "#fff", fontWeight: 500 }}>{v.toFixed(2)}</text>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </Stage>
  );
}

// 5. Lag correlation lollipops for temperature and humidity.
function Lags() {
  const X = (l, s) => 150 + l * 160 + s * 44, Y = (v) => 220 - (v / 0.7) * 190;
  const series = [["temp_c", "Temperature", C.amber], ["Humidity", "Humidity", C.cyan]];
  return (
    <Stage n={5} title="Temperature leads cases by about three months, humidity by one" sub="Spearman correlation between monthly cases and climate 0 to 3 months earlier"
      note="Pooled within divisions. Both climate and dengue are seasonal, so this is an association, not proof of cause.">
      <svg viewBox="0 0 800 270" role="img" aria-label="Lollipop chart of correlation by lag for temperature and humidity">
        <Glow id="c5" />
        {[0, 0.2, 0.4, 0.6].map((v) => <g key={v}><line className="gl" x1="70" x2="780" y1={Y(v)} y2={Y(v)} /><text x="62" y={Y(v) + 4} textAnchor="end">{v}</text></g>)}
        {[0, 1, 2, 3].map((l) => <text key={l} x={X(l, 0.5)} y="250" textAnchor="middle" className="hi">{l === 0 ? "same month" : `${l} month${l > 1 ? "s" : ""} earlier`}</text>)}
        {series.map(([k, name, col], s) => R.lag[k].map((p) => (
          <g key={k + p.lag}>
            <line className="gy" x1={X(p.lag, s)} x2={X(p.lag, s)} y1={Y(0)} y2={Y(p.rho)} stroke={col} strokeWidth="4" strokeLinecap="round" style={{ transformOrigin: `${X(p.lag, s)}px ${Y(0)}px`, transitionDelay: `${p.lag * 0.12}s` }} />
            <circle className="pop" cx={X(p.lag, s)} cy={Y(p.rho)} r="9" fill={col} filter="url(#c5)" style={{ transitionDelay: `${0.5 + p.lag * 0.12}s` }} />
            <text x={X(p.lag, s)} y={Y(p.rho) - 15} textAnchor="middle" style={{ fill: col }}>{p.rho}</text>
          </g>
        )))}
        <text x="780" y="16" textAnchor="end" style={{ fill: C.amber }}>● Temperature</text><text x="780" y="32" textAnchor="end" style={{ fill: C.cyan }}>● Humidity</text>
      </svg>
    </Stage>
  );
}

export default function ChartsC() {
  return <><Clock /><Timeline /><Burden /><RiskMap /><Lags /></>;
}
