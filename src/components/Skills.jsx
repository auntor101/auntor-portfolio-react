import { skills } from "../data/skills.js";

export default function Skills() {
  return (
    <section className="section skills-bg">
      <div className="container">
        <span className="section-label">// Skills</span>
        <h2 className="section-title">What I work with</h2>
        <div className="skills-cloud">
          {skills.technical.map(([t, big], i) => (
            <span key={`t${i}`} className={`skill-tag teal ${big ? "lg" : ""}`}>{t}</span>
          ))}
          {skills.domain.map(([t], i) => (
            <span key={`d${i}`} className="skill-tag amber">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
