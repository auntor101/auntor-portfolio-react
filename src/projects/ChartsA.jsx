import { useState } from "react";
import R from "../data/nutrition.json";
import { C, Stage, Glow, path } from "./kit.jsx";

const D = R.data, F = R.fits.stunting;

// 1. Progress ladder: start and end prevalence per series.
function Ladder() {
  const [h, setH] = useState(null);
  const rows = [["Stunting", 1990, D.stunting, C.pink], ["Underweight", 1990, D.underweight, C.amber], ["Stunting, girls", 1997, D.female, C.cyan], ["Stunting, boys", 1997, D.male, C.violet]];
  const X = (v) => 160 + (v / 70) * 610;
  return (
    <Stage n={1} title={`Stunting fell ${R.decline.stunting_1990_2019_pp} points and underweight ${R.decline.underweight_1990_2019_pp}`} sub="Start and end prevalence among children under 5, from the first full survey year to 2019"
      read={h ? <><b>{h[0]}</b>: {h[2][h[1]]}% in {h[1]} to {h[2][2019]}% in 2019, down {(h[2][h[1]] - h[2][2019]).toFixed(1)} points</> : "Hover a row for the change."}>
      <svg viewBox="0 0 800 240" role="img" aria-label="Start and end prevalence of stunting and underweight">
        <Glow id="g1" />
        {[0, 20, 40, 60].map((v) => <g key={v}><line className="gl" x1={X(v)} x2={X(v)} y1="20" y2="215" /><text x={X(v)} y="232" textAnchor="middle">{v}%</text></g>)}
        {rows.map(([name, a, d, col], i) => {
          const y = 52 + i * 48, s = d[a], e = d[2019];
          return (
            <g key={name} className="hit" onMouseEnter={() => setH([name, a, d])} onMouseLeave={() => setH(null)}>
              <rect x="0" y={y - 24} width="800" height="48" fill="transparent" />
              <text x="148" y={y + 4} textAnchor="end" className="hi">{name}</text>
              <line className="draw" pathLength="1" x1={X(s)} x2={X(e)} y1={y} y2={y} stroke={col} strokeWidth="7" strokeLinecap="round" opacity=".5" style={{ transitionDelay: `${i * 0.15}s` }} />
              <circle className="pop" cx={X(s)} cy={y} r="9" fill="none" stroke={col} strokeWidth="3" />
              <circle className="pop" cx={X(e)} cy={y} r="9" fill={col} filter="url(#g1)" style={{ transitionDelay: `${0.4 + i * 0.15}s` }} />
              <text x={X(s)} y={y - 15} textAnchor="middle">{s}%</text>
              <text x={X(e)} y={y - 15} textAnchor="middle" className="hi">{e}%</text>
            </g>
          );
        })}
      </svg>
    </Stage>
  );
}

// 2. Projection fan: 26 trend lines, one per fit start year.
function Fan() {
  const ys = Array.from({ length: 26 }, (_, i) => 1986 + i), i25 = 2025 - 1986;
  const v25 = ys.map((y) => F[y].line[i25]), lo = Math.min(...v25), hi = Math.max(...v25);
  const X = (y) => 50 + ((y - 1986) / 44) * 730, Y = (v) => 270 - (v / 100) * 250;
  return (
    <Stage n={2} title={`The 2025 trend value moves between ${lo}% and ${hi}%`} sub="26 trend lines, one for each fit start year (1986 to 2011), projected to 2030"
      note={`One line is a fragile basis for planning, so use the range. Amber dashes: the ${R.reference.level_2025}% reference level, 40% below the 2012 level.`}>
      <svg viewBox="0 0 800 300" role="img" aria-label="Fan of 26 stunting trend lines projected to 2030 with observed survey values">
        <rect x={X(2019.5)} y="20" width={X(2030) - X(2019.5)} height="250" fill="#8a5cff" opacity=".12" />
        {[0, 20, 40, 60, 80, 100].map((v) => <g key={v}><line className="gl" x1="50" x2="780" y1={Y(v)} y2={Y(v)} /><text x="42" y={Y(v) + 4} textAnchor="end">{v}%</text></g>)}
        {[1990, 2000, 2010, 2020, 2030].map((y) => <text key={y} x={X(y)} y="292" textAnchor="middle">{y}</text>)}
        {ys.map((y0, i) => <path key={y0} className="draw" pathLength="1" fill="none" strokeWidth="1.8" stroke={`hsl(${190 + i * 5.6} 100% 62%)`} opacity=".8" style={{ transitionDelay: `${i * 0.05}s` }}
          d={path(R.years.filter((y) => y >= y0).map((y) => [X(y), Y(F[y0].line[y - 1986])]))} />)}
        <line className="fade" x1="50" x2="780" y1={Y(R.reference.level_2025)} y2={Y(R.reference.level_2025)} stroke={C.amber} strokeWidth="1.5" strokeDasharray="6 5" />
        {Object.keys(D.stunting).map((y) => <circle key={y} className="pop" cx={X(+y)} cy={Y(D.stunting[y])} r="3.8" fill={C.lime} style={{ transitionDelay: `${1 + (y - 1986) * 0.02}s` }} />)}
      </svg>
    </Stage>
  );
}

// 3. Forest plot of annual reduction.
function Forest() {
  const [h, setH] = useState(null);
  const rows = [["Stunting, main fit", R.main.stunting, C.pink], ["Stunting, Theil–Sen", R.theil_sen_aarr, C.cyan], ["Underweight, main fit", R.main.underweight, C.amber], ["Stunting, 1990–2007", R.periods["1990-2007"], C.violet], ["Stunting, 2007–2019", R.periods["2007-2019"], C.lime]];
  const X = (v) => 210 + ((v - 1.5) / 4) * 560;
  return (
    <Stage n={3} title="About 3% less every year, whichever way it is measured" sub="Average annual reduction with 95% intervals, overall and by period"
      read={h ? <><b>{h[0]}</b>: {h[1].aarr}% a year (95% CI {h[1].lo} to {h[1].hi})</> : "Hover a row for the interval."}
      note="The later period looks faster, but its interval is wide because it rests on 6 survey points.">
      <svg viewBox="0 0 800 270" role="img" aria-label="Forest plot of average annual reduction">
        <Glow id="g3" />
        {[2, 3, 4, 5].map((v) => <g key={v}><line className="gl" x1={X(v)} x2={X(v)} y1="14" y2="235" /><text x={X(v)} y="256" textAnchor="middle">{v}%</text></g>)}
        <line className="fade" x1={X(R.main.stunting.aarr)} x2={X(R.main.stunting.aarr)} y1="14" y2="235" stroke={C.pink} strokeDasharray="4 4" opacity=".7" />
        {rows.map(([name, v, col], i) => {
          const y = 40 + i * 44;
          return (
            <g key={name} className="hit" onMouseEnter={() => setH([name, v])} onMouseLeave={() => setH(null)}>
              <rect x="0" y={y - 20} width="800" height="40" fill="transparent" />
              <text x="198" y={y + 4} textAnchor="end" className="hi">{name}</text>
              <line className="draw" pathLength="1" x1={X(v.lo)} x2={X(v.hi)} y1={y} y2={y} stroke={col} strokeWidth="5" strokeLinecap="round" style={{ transitionDelay: `${i * 0.12}s` }} />
              <circle className="pop" cx={X(v.aarr)} cy={y} r="9" fill={col} filter="url(#g3)" style={{ transitionDelay: `${0.5 + i * 0.12}s` }} />
              <text x={X(v.hi) + 12} y={y + 4}>{v.aarr}%</text>
            </g>
          );
        })}
      </svg>
    </Stage>
  );
}

// 4. Backtest: fit on 1990-2013, predict held-out years.
function Backtest() {
  const X = (v) => 130 + ((v - 26) / 18) * 640;
  return (
    <Stage n={4} title="The old trend ran high every time, so it understates recent progress" sub="Predicted against observed stunting for the three held-out survey years"
      note={`Every observed value fell inside the 95% prediction interval. Violet bar: interval · pink: predicted · lime: observed.`}>
      <svg viewBox="0 0 800 230" role="img" aria-label="Backtest of predicted versus observed stunting for 2014, 2018 and 2019">
        <Glow id="g4" />
        {[28, 32, 36, 40, 44].map((v) => <g key={v}><line className="gl" x1={X(v)} x2={X(v)} y1="14" y2="190" /><text x={X(v)} y="212" textAnchor="middle">{v}%</text></g>)}
        {R.backtest.map((b, i) => {
          const y = 46 + i * 62;
          return (
            <g key={b.year}>
              <text x="118" y={y + 4} textAnchor="end" className="hi">{b.year}</text>
              <rect className="gx" x={X(b.lo)} y={y - 10} width={X(b.hi) - X(b.lo)} height="20" rx="10" fill={C.violet} opacity=".4" style={{ transformOrigin: `${X(b.lo)}px ${y}px`, transitionDelay: `${i * 0.15}s` }} />
              <line className="draw" pathLength="1" x1={X(b.obs)} x2={X(b.pred)} y1={y} y2={y} stroke="#fff" strokeWidth="2" opacity=".7" style={{ transitionDelay: `${0.5 + i * 0.15}s` }} />
              <circle className="pop" cx={X(b.pred)} cy={y} r="8" fill={C.pink} filter="url(#g4)" style={{ transitionDelay: `${0.6 + i * 0.15}s` }} />
              <circle className="pop" cx={X(b.obs)} cy={y} r="8" fill={C.lime} filter="url(#g4)" style={{ transitionDelay: `${0.7 + i * 0.15}s` }} />
              <text x={X(b.hi) + 12} y={y + 4} className="hi">{b.err > 0 ? "+" : ""}{b.err} points</text>
            </g>
          );
        })}
      </svg>
    </Stage>
  );
}

// 5. Girls-minus-boys gap by survey year.
function Gap() {
  const [h, setH] = useState(null);
  const ys = Object.keys(R.sex.gap), Z = 140, S = 52, bw = 46;
  const X = (i) => 70 + i * 78, Y = (g) => Z - g * S;
  return (
    <Stage n={5} title={`Girls were ${Math.abs(R.sex.mean_gap_pp)} points lower on average, with no clear difference`} sub="Stunting gap, girls minus boys, by survey year (points)"
      read={h != null ? <><b>{ys[h]}</b>: {R.sex.gap[ys[h]] > 0 ? "+" : ""}{R.sex.gap[ys[h]]} points</> : `Mean ${R.sex.mean_gap_pp} points (95% CI ${R.sex.ci[0]} to ${R.sex.ci[1]}, p = ${R.sex.p}, ${R.sex.n} survey years)`}>
      <svg viewBox="0 0 800 280" role="img" aria-label="Diverging bars of the girls minus boys stunting gap by year">
        <rect x="40" y={Y(R.sex.ci[1])} width="730" height={(R.sex.ci[1] - R.sex.ci[0]) * S} fill={C.amber} opacity=".14" />
        {[-2, -1, 0, 1, 2].map((v) => <g key={v}><line className="gl" x1="40" x2="770" y1={Y(v)} y2={Y(v)} /><text x="32" y={Y(v) + 4} textAnchor="end">{v}</text></g>)}
        <line className="fade" x1="40" x2="770" y1={Y(R.sex.mean_gap_pp)} y2={Y(R.sex.mean_gap_pp)} stroke={C.amber} strokeDasharray="6 5" strokeWidth="1.5" />
        {ys.map((y, i) => {
          const g = R.sex.gap[y];
          return (
            <g key={y} className="hit" onMouseEnter={() => setH(i)} onMouseLeave={() => setH(null)}>
              <rect className="gy" x={X(i) - bw / 2} y={g > 0 ? Y(g) : Z} width={bw} height={Math.abs(g) * S} rx="4" fill={g > 0 ? C.coral : C.cyan} style={{ transformOrigin: `${X(i)}px ${Z}px`, transitionDelay: `${i * 0.08}s` }} />
              <text x={X(i)} y="268" textAnchor="middle">{y}</text>
            </g>
          );
        })}
      </svg>
    </Stage>
  );
}

export default function ChartsA() {
  return <><Ladder /><Fan /><Forest /><Backtest /><Gap /></>;
}
