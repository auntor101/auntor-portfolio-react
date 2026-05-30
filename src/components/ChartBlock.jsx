// Wrapper for one chart: a number tag, a plain-language question, a one-line
// explainer, the chart itself, and a short statement of what the data shows.
export default function ChartBlock({ n, color, q, sub, finding, children }) {
  const soft = color + "1a";
  return (
    <div className="chart-block">
      <span className="chart-num" style={{ color, background: soft }}>Chart {n} of 12</span>
      <h3 className="chart-q">{q}</h3>
      <p className="chart-sub">{sub}</p>
      <div className="chart-area">{children}</div>
      {finding && (
        <div className="chart-finding" style={{ background: color + "0d", border: `1px solid ${color}2b` }}>
          <p dangerouslySetInnerHTML={{ __html: finding.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
        </div>
      )}
    </div>
  );
}
