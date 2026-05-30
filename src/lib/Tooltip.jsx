import { createContext, useContext, useState, useCallback } from "react";

const TipCtx = createContext(null);
export const useTip = () => useContext(TipCtx);

export function TooltipProvider({ children }) {
  const [tip, setTip] = useState({ show: false, x: 0, y: 0, html: "" });

  const show = useCallback((e, html) => {
    let x = e.clientX + 14, y = e.clientY - 10;
    if (x + 220 > window.innerWidth) x = e.clientX - 234;
    setTip({ show: true, x, y, html });
  }, []);
  const hide = useCallback(() => setTip(t => ({ ...t, show: false })), []);

  return (
    <TipCtx.Provider value={{ show, hide }}>
      {children}
      <div
        style={{
          position: "fixed", zIndex: 999, left: tip.x, top: tip.y,
          background: "#0D1117", border: "1px solid rgba(255,255,255,.14)",
          borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#F0F4FF",
          pointerEvents: "none", opacity: tip.show ? 1 : 0,
          transition: "opacity .12s", whiteSpace: "nowrap",
          boxShadow: "0 8px 24px rgba(0,0,0,.4)"
        }}
        dangerouslySetInnerHTML={{ __html: tip.html }}
      />
    </TipCtx.Provider>
  );
}
