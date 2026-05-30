import { useNavigate } from "react-router-dom";
import { projects } from "../data/projects.js";

export default function Projects() {
  const navigate = useNavigate();
  return (
    <section className="section" id="work">
      <div className="container">
        <span className="section-label">// Selected work</span>
        <h2 className="section-title">Four health data case studies</h2>
        <p style={{ color: "var(--body)", fontSize: 15, lineHeight: 1.7, maxWidth: 680, margin: "-28px 0 40px" }}>
          Each study takes a real dataset and works through what it shows, in twelve plain-language
          charts that do not assume a science background. Select any study to open it.
        </p>
        <div className="projects-grid">
          {projects.map(p => {
            const soft = p.color + "1a";
            return (
              <a className="proj-card" key={p.id} onClick={() => navigate(`/project/${p.id}`)}>
                <span className="proj-badge" style={{ color: p.color, background: soft }}>{p.badge}</span>
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-tagline">{p.tagline}</p>
                <div className="proj-stats">
                  {p.stats.map(([v, l], i) => (
                    <div key={i}>
                      <div className="proj-stat-val" style={{ color: p.color }}>{v}</div>
                      <div className="proj-stat-lbl">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="proj-finding">{p.finding}</div>
                <div className="proj-tags">{p.tags.map((t, i) => <span className="proj-tag" key={i}>{t}</span>)}</div>
                <div className="proj-cta" style={{ color: p.color }}>Open all 12 charts →</div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
