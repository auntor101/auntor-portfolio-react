import { about, experience, mentoring } from "../data/site.js";

export function About() {
  return (
    <section className="sec wrap rv" id="about">
      <span className="kick">About</span>
      <h2>Health data, handled carefully.</h2>
      <div className="about">
        <div>{about.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
        <aside className="mentor"><b>Mentoring and advising</b>{mentoring}</aside>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section className="sec wrap rv" id="experience">
      <span className="kick">Experience</span>
      <h2>Where I have worked and studied.</h2>
      {experience.map((j) => (
        <article className="job" key={j.role}>
          <div className="job-when">{j.when}</div>
          <div>
            <h3>{j.role}</h3>
            <p className="job-org">{j.org}</p>
            {j.points.length > 0 && <ul>{j.points.map((p) => <li key={p.slice(0, 24)}>{p}</li>)}</ul>}
          </div>
        </article>
      ))}
    </section>
  );
}
