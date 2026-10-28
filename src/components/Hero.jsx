import { Link } from "react-router-dom";
import { site } from "../data/site.js";
import N from "../data/nutrition.json";

const go = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView(); };

// Small data-linked figure: the survey points and fitted line from Project A.
function MiniTrend() {
  const f = N.fits.stunting[1990], obs = N.data.stunting;
  const X = (y) => 8 + ((y - 1990) / 29) * 284, Y = (v) => 8 + (1 - v / 80) * 124;
  const ys = N.years.filter((y) => y >= 1990 && y <= 2019);
  const d = ys.map((y, i) => (i ? "L" : "M") + X(y).toFixed(1) + "," + Y(f.line[y - 1986]).toFixed(1)).join("");
  return (
    <svg viewBox="0 0 300 150" role="img" aria-label="Stunting among children under 5 in Bangladesh fell from 63.4% in 1990 to 28.0% in 2019">
      <path className="hf-line" pathLength="1" d={d} />
      {Object.keys(obs).filter((y) => y >= 1990).map((y, i) => <circle key={y} className="hf-dot" style={{ animationDelay: `${0.5 + i * 0.04}s`, transformOrigin: `${X(y)}px ${Y(obs[y])}px` }} cx={X(y)} cy={Y(obs[y])} r="3" />)}
      <text x="8" y="146">1990</text><text x="292" y="146" textAnchor="end">2019</text>
    </svg>
  );
}

export default function Hero() {
  return (
    <header className="wrap">
      <div className="hero">
        <div className="hero-in">
          <h1>{site.name}</h1>
          <p className="focus">{site.title} | {site.focus}</p>
          <p className="sub">{site.subline}</p>
          <div className="btns">
            <a className="btn pri" href="#research" onClick={go("research")}>View research</a>
            <a className="btn" href="#projects" onClick={go("projects")}>See dashboards</a>
            <a className="btn" href="#contact" onClick={go("contact")}>Contact me</a>
          </div>
        </div>
        <Link to="/project/a" className="hero-fig" style={{ animation: "up .9s .3s var(--nd-ease) both" }}>
          <MiniTrend />
          <figcaption>Child stunting in Bangladesh, <b>63.4% → 28.0%</b> (1990–2019). Open the project →</figcaption>
        </Link>
      </div>
      <div className="tiles">
        {site.tiles.map(([n, l]) => <div className="tile" key={l}><b>{n}</b><span>{l}</span></div>)}
      </div>
    </header>
  );
}
