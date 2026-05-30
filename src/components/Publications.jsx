import { publications } from "../data/publications.js";

export default function Publications() {
  return (
    <section className="section" id="publications">
      <div className="container">
        <span className="section-label">// Publications</span>
        <h2 className="section-title">Papers and manuscripts</h2>
        <div>
          {publications.map((p, i) => (
            <div className="pub-item" key={i}>
              <div className="pub-top">
                <span className="pub-status" style={{ color: p.statusColor, background: p.statusColor + "1a", border: `1px solid ${p.statusColor}40` }}>{p.status}</span>
                <span className="pub-venue">{p.venue} · {p.year}</span>
              </div>
              <div className="pub-title">{p.title}</div>
              <div className="pub-authors">{p.authors}</div>
              <div className="pub-detail">{p.detail}</div>
              {p.link && <a className="pub-link" href={p.link} target="_blank" rel="noreferrer" style={{ color: p.statusColor }}>Read the paper →</a>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
