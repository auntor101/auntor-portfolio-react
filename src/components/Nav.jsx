import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hero } from "../data/hero.js";

export default function Nav({ onProject }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => navigate("/")}>
          <span className="nav-dot" />{hero.name}
        </button>
        {onProject ? (
          <button className="nav-cta" onClick={() => navigate("/")}>Back to portfolio</button>
        ) : (
          <div className="nav-links">
            <a onClick={() => navigate("/")}>Home</a>
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#publications">Publications</a>
            <a href="#experience">Experience</a>
            <a href={`mailto:${hero.email}`} className="nav-cta">Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
}
