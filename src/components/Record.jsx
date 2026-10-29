import { leadership, awards, references } from "../data/record.js";
import { useLightbox } from "../lib/Lightbox.jsx";

export function Leadership() {
  const open = useLightbox();
  return (
    <section className="sec wrap rv" id="leadership">
      <h2>Leadership</h2>
      {leadership.map((l) => (
        <article className="lead" key={l.title}>
          <div className="job-when">{l.when}</div>
          <div>
            <h3>{l.title}</h3>
            <p className="job-org">{l.org}</p>
            <p className="lead-text">{l.text}</p>
            <p className="lead-result"><b>{l.result[0]}</b> {l.result[1]}</p>
            {l.shots && (
              <div className="shots">
                {l.shots.map(([src, alt]) => (
                  <button key={src} onClick={() => open({ src, alt })} aria-label={`Enlarge: ${alt}`}><img src={src} alt={alt} loading="lazy" /></button>
                ))}
              </div>
            )}
            {l.caption && <p className="shot-cap">{l.caption}</p>}
            {(l.links || l.proofs) && (
              <p className="lead-links">
                {l.links?.map(([t, h]) => <a key={t} href={h} target="_blank" rel="noopener">{t} ↗</a>)}
                {l.proofs?.map(([t, h]) => h.endsWith(".pdf")
                  ? <a key={t} href={h} target="_blank" rel="noopener">{t}</a>
                  : <a key={t} href={h} onClick={(e) => { e.preventDefault(); open({ src: h, alt: t }); }}>{t}</a>)}
              </p>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}

export function Awards() {
  return (
    <section className="sec wrap rv" id="awards">
      <h2>Awards</h2>
      {awards.map((a) => (
        <div className="award" key={a.name}>
          <span className="job-when">{a.year}</span>
          <div>
            <h3>{a.name}</h3>
            <p>{a.note}</p>
            {a.proof && <a href={a.proof} target="_blank" rel="noopener">{a.proofLabel || "Award letter"}</a>}
          </div>
        </div>
      ))}
    </section>
  );
}

export function References() {
  return (
    <section className="sec wrap rv" id="references">
      <h2>References</h2>
      <div className="refs">
        {references.map((r) => {
          const mail = r.email.join("@"); // assembled here, not in the markup
          return (
            <article className="ref" key={r.name}>
              <h3><a href={r.href} target="_blank" rel="noopener">{r.name}</a></h3>
              <p className="ref-role">{r.role}</p>
              <p className="ref-org">{r.org}</p>
              <p className="lead-links"><a href={`mailto:${mail}`}>{mail}</a>{r.links.map(([t, h]) => <a key={t} href={h} target="_blank" rel="noopener">{t} ↗</a>)}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
