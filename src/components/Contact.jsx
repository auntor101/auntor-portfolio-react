import { site, skills } from "../data/site.js";

export function Skills() {
  return (
    <section className="sec wrap rv" id="skills">
      <h2>Skills</h2>
      {skills.map(([k, v]) => <div className="skill" key={k}><b>{k}</b><span>{v}</span></div>)}
    </section>
  );
}

export function Contact() {
  const email = site.email.join("@"); // assembled here, not in the markup
  return (
    <section className="sec wrap rv" id="contact">
      <h2>Contact</h2>
      <div className="contact">
        <div>
          <a href={`mailto:${email}`}>{email}</a>
          <a href={`tel:${site.phone[1]}`}>{site.phone[0]}</a>
        </div>
        <div>{site.links.map(([t, h]) => <a key={t} href={h} target="_blank" rel="noopener">{t}</a>)}</div>
      </div>
      <footer>© {new Date().getFullYear()} {site.name}</footer>
    </section>
  );
}
