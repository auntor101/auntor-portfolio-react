import { experience, education } from "../data/experience.js";

export default function Experience() {
  return (
    <section className="section about-bg" id="experience">
      <div className="container">
        <span className="section-label">// Experience</span>
        <h2 className="section-title">Where I have worked</h2>
        {experience.map((e, i) => (
          <div className="exp-item" key={i}>
            <div className="exp-header">
              <div>
                <div className="exp-title">{e.title}</div>
                <div className="exp-org">{e.org}</div>
                <div className="exp-loc">{e.location}</div>
              </div>
              <div className="exp-date">{e.date}</div>
            </div>
            <p className="exp-desc">{e.desc}</p>
            <div className="exp-tags">{e.tags.map((t, j) => <span className="exp-tag" key={j}>{t}</span>)}</div>
          </div>
        ))}
        <div className="exp-item">
          <div className="exp-header">
            <div>
              <div className="exp-title">{education.bachelor.degree}</div>
              <div className="exp-org">{education.bachelor.org}</div>
              <div className="exp-loc">{education.bachelor.location}</div>
            </div>
            <div className="exp-date">Education</div>
          </div>
          <div className="exp-desc">
            <div><strong>CGPA:</strong> {education.bachelor.cgpa}</div>
            <div style={{ marginTop: 8 }}>
              <strong>Recent semester GPA:</strong>
              <ul style={{ marginTop: 6 }}>
                {education.bachelor.semesterGPAs.map((s, i) => (
                  <li key={i}>{s[0]} — {s[1]}</li>
                ))}
              </ul>
            </div>
            <div style={{ marginTop: 8 }}>
              <strong>Relevant coursework:</strong>
              <ul style={{ marginTop: 6 }}>
                {education.bachelor.coursework.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="exp-item">
          <div className="exp-header">
            <div>
              <div className="exp-title">{education.hsc.title}</div>
              <div className="exp-org">{education.hsc.org}</div>
              <div className="exp-loc">{education.hsc.location}</div>
            </div>
            <div className="exp-date">HSC</div>
          </div>
          <p className="exp-desc">GPA: {education.hsc.gpa}</p>
        </div>

        <div className="exp-item">
          <div className="exp-header">
            <div>
              <div className="exp-title">{education.ssc.title}</div>
              <div className="exp-org">{education.ssc.org}</div>
              <div className="exp-loc">{education.ssc.location}</div>
            </div>
            <div className="exp-date">SSC</div>
          </div>
          <p className="exp-desc">GPA: {education.ssc.gpa}</p>
        </div>
      </div>
    </section>
  );
}
