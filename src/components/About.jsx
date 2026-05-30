import { about } from "../data/about.js";
import { hero } from "../data/hero.js";

export default function About() {
  return (
    <section className="section about-bg" id="about">
      <div className="container">
        <span className="section-label">// About</span>
        <h2 className="section-title">Making data make sense</h2>
        <div className="about-grid">
          <div className="about-bio">
            {about.paragraphs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
            ))}
          </div>
          <div className="about-sidebar">
            {about.facts.map(([lbl, val], i) => (
              <div className="about-item" key={i}>
                <span className="about-item-lbl">{lbl}</span>
                <span className="about-item-val">{val}</span>
              </div>
            ))}
            <div className="about-item">
              <span className="about-item-lbl">Email</span>
              <span className="about-item-val"><a href={`mailto:${hero.email}`}>{hero.email}</a></span>
            </div>
            <div className="about-item">
              <span className="about-item-lbl">Scholar</span>
              <span className="about-item-val"><a href={hero.scholar} target="_blank" rel="noreferrer">Google Scholar</a></span>
            </div>
            <div className="about-item">
              <span className="about-item-lbl">GitHub</span>
              <span className="about-item-val"><a href={hero.github} target="_blank" rel="noreferrer">@auntor101</a></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
