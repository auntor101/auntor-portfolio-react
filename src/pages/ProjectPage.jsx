import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChartBlock from "../components/ChartBlock.jsx";
import Footer from "../components/Footer.jsx";
import { CONTENT } from "./content.jsx";

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = CONTENT[id];

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!data) {
    return (
      <div className="container" style={{ paddingTop: 140, minHeight: "60vh" }}>
        <p style={{ color: "var(--body)" }}>Project not found.</p>
        <button className="btn-secondary" onClick={() => navigate("/")} style={{ marginTop: 20 }}>Back to portfolio</button>
      </div>
    );
  }

  const c = data.color, soft = c + "1f";
  let n = 0;

  return (
    <div className="proj-page">
      <div className="proj-hero-banner" style={{ background: `radial-gradient(ellipse 70% 100% at 50% 0%, ${c}1f, transparent 68%)` }}>
        <div className="container">
          <button className="proj-back" onClick={() => navigate("/")}>← Back to portfolio</button>
          <div className="proj-intro-badge" style={{ color: c, background: soft, border: `1px solid ${c}40` }}>{data.badge}</div>
          <h1 className="proj-hero-title">{data.title}</h1>
          <p className="proj-hero-tagline">{data.tagline}</p>
          <div className="proj-hero-intro" style={{ borderLeft: `3px solid ${c}` }}>{data.intro}</div>
        </div>
      </div>

      <div className="container">
        <div className="stat-row">
          {data.stats.map(([v, l, s], i) => (
            <div className="stat-card" key={i}>
              <div className="stat-card-v" style={{ color: c }}>{v}</div>
              <div className="stat-card-l">{l}</div>
              {s && <div className="stat-card-sub">{s}</div>}
            </div>
          ))}
        </div>

        {data.charts.map((ch, i) => {
          if (ch.caveat) {
            return (
              <div className="caveat-card" key={i} style={{ borderColor: `${c}4d`, background: `${c}10` }}>
                <div className="caveat-title" style={{ color: c }}>{ch.caveat.title}</div>
                <p className="caveat-body">{ch.caveat.body}</p>
              </div>
            );
          }
          n += 1;
          return (
            <ChartBlock key={i} n={n} color={c} q={ch.q} sub={ch.sub} finding={ch.finding}>
              {ch.el}
            </ChartBlock>
          );
        })}

        <div style={{ height: 50 }} />
      </div>
      <Footer />
    </div>
  );
}
