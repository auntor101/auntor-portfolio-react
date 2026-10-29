import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { projects } from "../data/site.js";
import N from "../data/nutrition.json";
import B from "../data/covid.json";
import D from "../data/dengue.json";
import { useLightbox } from "../lib/Lightbox.jsx";
import { nf } from "./kit.jsx";
import ChartsA from "./ChartsA.jsx";
import ChartsB from "./ChartsB.jsx";
import ChartsC from "./ChartsC.jsx";
import "./projects.css";

const fall = D.month_share[9] + D.month_share[10] + D.month_share[11];
// Headline and lede are built from the results files so they cannot drift from the numbers.
const HEAD = {
  A: { h: <>Stunting fell from <em>{N.data.stunting[1990]}%</em> to <em>{N.data.stunting[2019]}%</em> between 1990 and 2019.</>,
    lede: `That is ${N.decline.stunting_1990_2019_pp} percentage points, or about ${N.main.stunting.aarr}% less each year. National survey estimates, 1986 to 2019.` },
  B: { h: <>Six waves, and only a simple rule <em>beat</em> “same as last week”.</>,
    lede: `Bangladesh reported ${nf(B.validation.total_cases)} cases and ${nf(B.validation.total_deaths)} deaths over ${nf(B.validation.days)} days, ${B.validation.first_date} to ${B.validation.last_date}.` },
  C: { h: <>Dengue is a short season: September to November holds <em>{fall.toFixed(0)}%</em> of cases.</>,
    lede: `${nf(D.validation.total_cases)} reported cases and ${nf(D.validation.total_deaths)} deaths across eight divisions, ${D.validation.first_month.slice(0, 7)} to ${D.validation.last_month.slice(0, 7)}.` },
};
const CHARTS = { A: ChartsA, B: ChartsB, C: ChartsC };

const Cell = ({ v }) => Array.isArray(v) ? v.map((l) => <a key={l.h} href={l.h} target="_blank" rel="noopener">{l.t}</a>) : v;

function Report({ p }) {
  const open = useLightbox();
  return (
    <div className="rep">
      <h4>Objective</h4><p>{p.objective}</p>
      <h4>Data</h4>
      <dl>{p.data.map(([k, v]) => <div style={{ display: "contents" }} key={k}><dt>{k}</dt><dd><Cell v={v} /></dd></div>)}</dl>
      <h4>Methods</h4><p>{p.methods}</p>
      <h4>Key findings</h4><ol>{p.findings.map((f) => <li key={f.slice(0, 30)}>{f}</li>)}</ol>
      <h4>How it helps</h4><p>{p.helps}</p>
      <h4>Limitations</h4><p>{p.limits}</p>
      <h4>Figures</h4>
      <div className="figs">
        {p.figs.map(([src, alt, cap]) => (
          <figure className="fig" key={src}>
            <button onClick={() => open({ src, alt })} aria-label={`Enlarge: ${alt}`}><img src={src} alt={alt} loading="lazy" /></button>
            <figcaption>{cap}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function ProjectPage() {
  const id = (useParams().id || "").toUpperCase();
  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  const p = projects.find((x) => x.id === id);
  if (!p) return <Navigate to="/" replace />;
  const Charts = CHARTS[id];
  return (
    <main className="wrap pj" id="main">
      <header className="pj-head">
        <span className="kick">Project {id} · {p.name}</span>
        <h1>{HEAD[id].h}</h1>
        <p className="pj-lede">{HEAD[id].lede}</p>
      </header>
      <Charts />
      <h2 className="pj-h">The full report</h2>
      <Report p={p} />
      <div className="pj-more">
        {projects.filter((x) => x.id !== id).map((x) => <Link key={x.id} className="btn" to={`/project/${x.id.toLowerCase()}`}>{x.tab} →</Link>)}
        <Link className="btn" to="/">All projects</Link>
      </div>
    </main>
  );
}
