import { publications } from "../data/site.js";
import { useLightbox } from "../lib/Lightbox.jsx";

export default function Research() {
  const open = useLightbox();
  return (
    <section className="sec wrap rv" id="research">
      <span className="kick">Research</span>
      <h2>Five papers, in different stages.</h2>
      {publications.map((p) => (
        <article className="pub" key={p.title}>
          <div className="pub-top">
            <span className={`badge ${p.tone}`}>{p.status}</span>
            {p.date && <span className="pub-date">{p.date}</span>}
          </div>
          <div>
            <h3>{p.title}</h3>
            {p.venue && <p className="pub-venue">{p.href ? <a href={p.href} target="_blank" rel="noopener">{p.venue}</a> : p.venue}</p>}
            <p>{p.text}</p>
          </div>
          {p.ga && (
            <button className="pub-ga" onClick={() => open({ src: p.ga, alt: p.alt })} aria-label={`Enlarge: ${p.alt}`}>
              <img src={p.ga} alt={p.alt} loading="lazy" />
            </button>
          )}
        </article>
      ))}
    </section>
  );
}
