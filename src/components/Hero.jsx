import { useEffect, useRef } from "react";
import { hero } from "../data/hero.js";

// Decorative particle field. Purely visual; never blocks rendering.
function useParticles(ref) {
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let raf;
    const size = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
    size();
    const N = Math.min(70, Math.floor(cv.width / 22));
    const parts = Array.from({ length: N }, () => ({
      x: Math.random() * cv.width, y: Math.random() * cv.height,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
      r: Math.random() * 1.8 + .6, c: Math.random() > .55 ? "0,212,160" : "120,140,160"
    }));
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      parts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > cv.width) p.vx *= -1;
        if (p.y < 0 || p.y > cv.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = `rgba(${p.c},.55)`; ctx.fill();
        for (let j = i + 1; j < parts.length; j++) {
          const q = parts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 110) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0,212,160,${.10 * (1 - d / 110)})`;
            ctx.lineWidth = .6; ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", size);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
  }, [ref]);
}

export default function Hero() {
  const canvas = useRef(null);
  useParticles(canvas);
  return (
    <header className="hero">
      <canvas className="hero-canvas" ref={canvas} />
      <div className="hero-content">
        <div className="hero-role"><span className="nav-dot" />{hero.role}</div>
        <h1 className="hero-name">Auntor <span className="hero-accent">Chakma</span></h1>
        <p className="hero-tagline">{hero.summary}</p>
        <div className="hero-loc">{hero.location} · {hero.degree}</div>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>View my work</button>
          <a className="btn-secondary" href={`mailto:${hero.email}`}>Contact me</a>
        </div>
        <div className="hero-stats">
          {hero.stats.map(([v, l], i) => (
            <div key={i}>
              <div className="hero-stat-val">{v}</div>
              <div className="hero-stat-lbl">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
