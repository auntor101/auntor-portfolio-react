import { publications } from "../data/site.js";
import { useLightbox } from "../lib/Lightbox.jsx";

export default function Research() {
  const open = useLightbox();
  return (
    <section className="sec wrap rv" id="research">
      <h2>Research</h2>
      {publications.map((p) => (
        <article className="pub" key={p.title}>
          <div className="pub-top">
            <span className={`badge ${p.tone}`}>{p.status}</span>
            {p.date && <span className="pub-date">{p.date}</span>}
          </div>
          <div>
            <h3>{p.title}</h3>
            {p.venue && <p className="pub-venue">{p.href ? <a href={p.href} target="_blank" rel="noopener">{p.venue}</a> : p.venue}{p.metrics && <span className="pub-metrics">{p.metrics}</span>}</p>}
            <p>{p.text}</p>
          </div>
          {p.ga && (
            <button className="pub-ga" onClick={() => open({ src: p.ga, alt: p.alt })} aria-label={`Enlarge: ${p.alt}`}>
              <img src={p.ga} alt={p.alt} loading="lazy" />
            </button>
          )}
        </article>
      ))}
      <p className="pub-foot">Quartiles are by SJR, 2025. Impact factor and CiteScore are from each journal’s publisher page, checked 29 October 2026.</p>
    </section>
  );
}
