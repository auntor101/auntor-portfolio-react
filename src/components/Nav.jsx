import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { site } from "../data/site.js";

const LINKS = [["About", "about"], ["Experience", "experience"], ["Research", "research"], ["Projects", "projects"], ["Leadership", "leadership"], ["Awards", "awards"], ["Skills", "skills"], ["References", "references"], ["Contact", "contact"]];

export default function Nav({ onProject }) {
  const go = useNavigate();
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === "dark");
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch { /* storage unavailable: theme still applies for this visit */ }
  };
  // anchors live on the landing page, so from a dashboard go home first
  const jump = (id) => { go("/"); setTimeout(() => document.getElementById(id)?.scrollIntoView(), 50); };
  return (
    <nav className="top" aria-label="Main">
      <div className="nav-in">
        <button className="nav-name" onClick={() => go("/")}>{site.name}</button>
        <div className="nav-right">
        {onProject ? (
          <button className="nav-back" onClick={() => jump("projects")}>← Back to projects</button>
        ) : (
          <div className="nav-links">
            {LINKS.map(([t, id]) => <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView(); }}>{t}</a>)}
          </div>
        )}
        <button className="theme" onClick={toggle} aria-pressed={dark}>{dark ? "Light mode" : "Dark mode"}</button>
        </div>
      </div>
    </nav>
  );
}
