import { hero } from "../data/hero.js";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p style={{ marginBottom: 8, color: "var(--body)" }}>{hero.name} — {hero.role}</p>
        <p>
          {hero.location} · <a href={`mailto:${hero.email}`}>{hero.email}</a> ·{" "}
          <a href={hero.scholar} target="_blank" rel="noreferrer">Google Scholar</a> ·{" "}
          <a href={hero.github} target="_blank" rel="noreferrer">GitHub</a>
        </p>
      </div>
    </footer>
  );
}
