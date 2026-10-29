import { useState } from "react";
import R from "../data/covid.json";
import { C, Stage, Glow, path, nf, ramp } from "./kit.jsx";

const W = R.weekly, V = R.validation, UTC = (s) => Date.parse(s + "T00:00:00Z");
const HEAT = ["#17133f", "#5b2bd6", "#ff2d95", "#ffb300", "#fff36b"];

// 1. Epidemic calendar: weekly cases by year and week of year.
function Calendar() {
  const [h, setH] = useState(null);
  const years = [2020, 2021, 2022, 2023], max = Math.max(...W.cases), cw = 13.2, ch = 30;
  const cells = W.dates.map((d, i) => { const t = new Date(UTC(d)), y = t.getUTCFullYear(); return { d, y, c: Math.floor((t - Date.UTC(y, 0, 1)) / 864e5 / 7), v: W.cases[i] }; });
  return (
    <Stage n={1} title="Waves do not follow a fixed season" sub="Weekly reported cases laid out by year and week of the year; brighter is busier"
      read={h ? <>Week of <b>{h.d}</b>: <b>{nf(h.v)}</b> reported cases</> : ""}>
      <svg viewBox="0 0 800 214" role="img" aria-label="Calendar heatmap of weekly COVID-19 cases by year and week">
        {years.map((y, r) => <text key={y} x="0" y={30 + r * (ch + 6)} className="hi">{y}</text>)}
        {cells.map((c) => (
          <rect key={c.d} className="pop hit" x={56 + c.c * cw} y={12 + years.indexOf(c.y) * (ch + 6)} width={cw - 2} height={ch} rx="3" fill={ramp(HEAT, Math.sqrt(c.v / max))}
            style={{ transitionDelay: `${c.c * 0.012 + years.indexOf(c.y) * 0.1}s` }} onMouseEnter={() => setH(c)} onMouseLeave={() => setH(null)} />
        ))}
        {["Jan", "Apr", "Jul", "Oct"].map((m, i) => <text key={m} x={56 + i * 13 * cw} y="178">{m}</text>)}
        {HEAT.map((c, i) => <rect key={c} x={610 + i * 36} y="198" width="36" height="8" fill={c} />)}
        <text x="602" y="206" textAnchor="end">fewer</text><text x="796" y="224" textAnchor="end">{nf(max)}</text>
      </svg>
    </Stage>
  );
}

// 2. Wave timeline: each wave as a bar, a bubble sized by its peak.
function Waves() {
  const [h, setH] = useState(null);
  const t0 = UTC(W.dates[0]), t1 = UTC(W.dates.at(-1)), X = (s) => 70 + ((UTC(s) - t0) / (t1 - t0)) * 700;
  const cols = [C.cyan, C.violet, C.pink, C.coral, C.amber, C.lime];
  return (
    <Stage n={2} title={`${R.waves.length} waves, the biggest two near 100,000 cases a week`} sub="Start to end of each detected wave; the bubble marks the peak and its size is the peak week’s cases"
      read={h ? <><b>Wave {h.id}</b>: peak {nf(h.peak_cases)} on {h.peak}, {nf(h.cases)} cases over {h.weeks} weeks, doubling in {h.doubling_wk} weeks</> : ""}>
      <svg viewBox="0 0 800 300" role="img" aria-label="Timeline of six COVID-19 waves with peak sizes">
        <Glow id="g2" />
        {[2020, 2021, 2022, 2023].map((y) => <g key={y}><line className="gl" x1={X(`${y}-01-01`) < 70 ? 70 : X(`${y}-01-01`)} x2={X(`${y}-01-01`) < 70 ? 70 : X(`${y}-01-01`)} y1="10" y2="270" /><text x={Math.max(X(`${y}-01-01`), 70) + 4} y="290">{y}</text></g>)}
        {R.waves.map((w, i) => {
          const y = 36 + i * 44, r = 6 + Math.sqrt(w.peak_cases) / 11;
          return (
            <g key={w.id} className="hit" onMouseEnter={() => setH(w)} onMouseLeave={() => setH(null)}>
              <rect x="0" y={y - 22} width="800" height="44" fill="transparent" />
              <text x="56" y={y + 4} textAnchor="end" className="hi">W{w.id}</text>
              <rect className="gx" x={X(w.start)} y={y - 5} width={X(w.end) - X(w.start)} height="10" rx="5" fill={cols[i]} opacity=".55" style={{ transformOrigin: `${X(w.start)}px ${y}px`, transitionDelay: `${i * 0.12}s` }} />
              <circle className="pop" cx={X(w.peak)} cy={y} r={r} fill={cols[i]} filter="url(#g2)" style={{ transitionDelay: `${0.5 + i * 0.12}s` }} />
              {w.peak_cases >= 10000 && <text x={X(w.peak) + r + 6} y={y + 4} className="hi">{nf(w.peak_cases)}</text>}
            </g>
          );
        })}
      </svg>
    </Stage>
  );
}

// 3. South Asia bubble chart: cases against deaths per million.
function Region() {
  const [h, setH] = useState(null);
  const cols = [C.pink, C.cyan, C.amber, C.violet, C.lime, C.coral, "#3dffb5", "#ff8ad8"];
  const my = Math.max(...R.compare.map((c) => c.deaths_pm)) * 1.18, LO = Math.log10(3000), HI = Math.log10(450000);
  const X = (v) => 70 + ((Math.log10(v) - LO) / (HI - LO)) * 700, Y = (v) => 250 - (v / my) * 225;
  return (
    <Stage n={3} title="Bangladesh sits below most of its neighbours per million people" sub="Cumulative cases (log scale) and deaths per million; bubble size is population"
      read={h ? <><b>{h.country}</b>: {nf(h.cases_pm)} cases and {nf(h.deaths_pm)} deaths per million, fatality {h.cfr}%</> : ""}
      note="Testing and reporting differ between countries, so this is context, not a ranking of how well each coped.">
      <svg viewBox="0 0 800 300" role="img" aria-label="Bubble chart of cases and deaths per million for South Asian countries">
        <Glow id="g3b" />
        {[5000, 10000, 50000, 100000, 300000].map((v) => <g key={v}><line className="gl" x1={X(v)} x2={X(v)} y1="25" y2="250" /><text x={X(v)} y="272" textAnchor="middle">{v / 1000}k</text></g>)}
        {[0, 200, 400, 600].filter((v) => v < my).map((v) => <g key={v}><line className="gl" x1="70" x2="770" y1={Y(v)} y2={Y(v)} /><text x="62" y={Y(v) + 4} textAnchor="end">{v}</text></g>)}
        <text x="420" y="294" textAnchor="middle">cases per million</text><text x="8" y="16">deaths per million</text>
        {[...R.compare].sort((a, b) => b.population - a.population).map((c, i) => {
          const r = 7 + Math.sqrt(c.population / 1e6) * 0.95, below = c.country === "Pakistan" || c.country === "Nepal";
          return (
            <g key={c.country} className="hit" onMouseEnter={() => setH(c)} onMouseLeave={() => setH(null)}>
              <circle className="pop" cx={X(c.cases_pm)} cy={Y(c.deaths_pm)} r={r} fill={c.country === "Bangladesh" ? cols[0] : cols[1 + (i % 7)]} opacity={c.country === "Bangladesh" ? 0.95 : 0.6} filter="url(#g3b)" style={{ transitionDelay: `${i * 0.1}s` }} />
              <text x={X(c.cases_pm)} y={below ? Y(c.deaths_pm) + r + 14 : Y(c.deaths_pm) - r - 5} textAnchor="middle" className="hi">{c.country}</text>
            </g>
          );
        })}
      </svg>
    </Stage>
  );
}

// 4. Forecast test: actual cases against model predictions, with error bars.
const MODELS = { Persistence: C.cyan, "Damped trend": C.lime, Ridge: C.amber, "Ridge (change)": C.pink };
function Forecast() {
  const [on, setOn] = useState({ Persistence: true, "Damped trend": true, Ridge: true, "Ridge (change)": false });
  const { dates: d, actual, pred } = R.roll, n = d.length, X = (i) => 56 + (i / (n - 1)) * 724, Y = (v) => 230 - (v / 100000) * 215;
  const mx = Math.max(...Object.values(R.metrics).map((m) => m.MAE));
  return (
    <Stage n={4} title="Only the simple damped-trend rule beat “same as last week”" sub={`${V.origins} weekly forecast origins from ${V.first_origin}: next-week cases, actual against each model`}
      note="Mean absolute error in cases per week; lower is better. The damping factor (0.5) was fixed in advance, not tuned.">
      <div className="tog">{Object.keys(MODELS).map((k) => <label key={k}><input type="checkbox" checked={on[k]} onChange={(e) => setOn({ ...on, [k]: e.target.checked })} /><span style={{ color: MODELS[k] }}>●</span> {k}</label>)}</div>
      <svg viewBox="0 0 800 260" role="img" aria-label="Actual weekly cases against model forecasts">
        {[0, 25000, 50000, 75000, 100000].map((v) => <g key={v}><line className="gl" x1="56" x2="780" y1={Y(v)} y2={Y(v)} /><text x="48" y={Y(v) + 4} textAnchor="end">{v / 1000}k</text></g>)}
        {[0, Math.floor(n / 2), n - 1].map((i) => <text key={i} x={X(i)} y="254" textAnchor={i ? (i === n - 1 ? "end" : "middle") : "start"}>{d[i]}</text>)}
        {Object.keys(pred).filter((k) => on[k]).map((k) => <path key={k} fill="none" stroke={MODELS[k]} strokeWidth="1.8" strokeDasharray="5 3" d={path(pred[k].map((v, i) => [X(i), Y(v)]))} />)}
        <path className="draw" pathLength="1" fill="none" stroke="#fff" strokeWidth="2.6" d={path(actual.map((v, i) => [X(i), Y(v)]))} />
      </svg>
      {Object.entries(R.metrics).map(([k, m]) => <div className="bar2" key={k}><span>{k}</span><i style={{ width: `${(m.MAE / mx) * 100}%`, background: MODELS[k] }} /><b>{nf(m.MAE)}</b></div>)}
    </Stage>
  );
}

// 5. Radial bars: lag-2 fatality ratio per wave.
function Fatality() {
  const mx = 2.2, early = R.waves.slice(0, 3).map((w) => w.cfr_lag2), late = Math.max(...R.waves.slice(3).map((w) => w.cfr_lag2));
  const cols = [C.cyan, C.violet, C.pink, C.coral, C.amber, C.lime];
  return (
    <Stage n={5} title={`The fatality ratio was ${Math.min(...early)}% to ${Math.max(...early)}% in the first three waves, then ${late}% or lower`} sub="Deaths divided by cases two weeks earlier, by wave"
      note="This analysis cannot say why it fell: vaccination, variants and testing all changed.">
      <svg viewBox="0 0 800 330" role="img" aria-label="Radial bars of lag-2 fatality ratio by wave">
        <Glow id="g5" />
        <g transform="translate(400 165)">
          {R.waves.map((w, i) => {
            const r = 142 - i * 21, f = w.cfr_lag2 / mx;
            return (
              <g key={w.id}>
                <circle r={r} fill="none" stroke="#2b2766" strokeWidth="12" />
                <circle className="arc" r={r} fill="none" stroke={cols[i]} strokeWidth="12" strokeLinecap="round" pathLength="1" filter="url(#g5)" style={{ "--f": f, transform: "rotate(-90deg)", transitionDelay: `${i * 0.12}s` }} />
                <text x="-10" y={-r + 4} textAnchor="end" className="hi">W{w.id} · {w.cfr_lag2}%</text>
              </g>
            );
          })}
          <text textAnchor="middle" y="-2" className="big">lag-2</text><text textAnchor="middle" y="16">fatality ratio</text>
        </g>
      </svg>
    </Stage>
  );
}

export default function ChartsB() {
  return <><Calendar /><Waves /><Region /><Forecast /><Fatality /></>;
}
