import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(() => {});
export const useLightbox = () => useContext(Ctx);

// Click outside or press Esc to close.
export function LightboxProvider({ children }) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    if (!img) return;
    const k = (e) => e.key === "Escape" && setImg(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [img]);
  return (
    <Ctx.Provider value={setImg}>
      {children}
      {img && <div className="lb" role="dialog" aria-modal="true" aria-label={img.alt} onClick={() => setImg(null)}><img src={img.src} alt={img.alt} /></div>}
    </Ctx.Provider>
  );
}
