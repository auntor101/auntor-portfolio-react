import { useNavigate } from "react-router-dom";
import { site } from "../data/site.js";

const LINKS = [["About", "about"], ["Experience", "experience"], ["Research", "research"], ["Projects", "projects"], ["Leadership", "leadership"], ["Awards", "awards"], ["Skills", "skills"], ["References", "references"], ["Contact", "contact"]];

export default function Nav({ onProject }) {
  const go = useNavigate();
  // anchors live on the landing page, so from a dashboard go home first
  const jump = (id) => { go("/"); setTimeout(() => document.getElementById(id)?.scrollIntoView(), 50); };
  return (
    <nav className="top" aria-label="Main">
      <div className="nav-in">
        <button className="nav-name" onClick={() => go("/")}>{site.name}</button>
        {onProject ? (
          <button className="nav-back" onClick={() => jump("projects")}>← Back to projects</button>
        ) : (
          <div className="nav-links">
            {LINKS.map(([t, id]) => <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView(); }}>{t}</a>)}
          </div>
        )}
      </div>
    </nav>
  );
}
