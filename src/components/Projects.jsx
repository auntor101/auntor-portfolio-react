import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/site.js";
import viz from "../data/viz.json";
import { useLightbox } from "../lib/Lightbox.jsx";

function Gallery() {
  const [f, setF] = useState("All");
  const open = useLightbox();
  const all = Object.entries(viz.meta), shown = all.filter(([, m]) => f === "All" || m.project === f);
  return (
    <div style={{ marginTop: 64 }}>
      <h3 style={{ marginBottom: 6 }}>Visual gallery: 10 charts across the three projects</h3>
      <p style={{ color: "var(--nd-mut)", fontSize: 15, marginBottom: 16 }}>Each chart answers one question. Filter by project; click a chart to enlarge.</p>
      <div className="pills" role="group" aria-label="Filter charts by project">
        {[["All", `All ${all.length}`], ["A", "A. Malnutrition"], ["B", "B. COVID-19"], ["C", "C. Dengue"]].map(([id, t]) => <button key={id} aria-pressed={f === id} onClick={() => setF(id)}>{t}</button>)}
      </div>
      <div className="gcards">
        {shown.map(([k, m]) => (
          <article className="gcard" key={k}>
            <button onClick={() => open({ src: `/img/viz/${k}.webp`, alt: `${m.title}: ${m.what}` })} aria-label={`Enlarge ${m.title}`}>
              <img src={`/img/viz/${k}.webp`} alt={`${m.title}: ${m.what}`} loading="lazy" />
            </button>
            <div className="gbody">
              <span className={`gtag ${m.project}`}>Project {m.project}</span>
              <h5>{m.title}</h5>
              <p><b>What it shows.</b> {m.what}</p>
              <p><b>Why it matters.</b> {m.why}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="sec wrap rv" id="projects">
      <span className="kick">Projects</span>
      <h2>Three open-data projects, each with its own page.</h2>
      <div className="pcards">
        {projects.map((p) => (
          <Link className="pcard" key={p.id} to={`/project/${p.id.toLowerCase()}`}>
            <span className="pcard-id">Project {p.id}</span>
            <h3>{p.name}</h3>
            <b>{p.stat[0]}</b><span className="pcard-stat">{p.stat[1]}</span>
            <p>{p.objective}</p>
            <span className="pcard-go">Open dashboard and report →</span>
          </Link>
        ))}
      </div>
      <Gallery />
    </section>
  );
}
