import React from "react";

export function WikiTable({
  headers = [],
  rows = [],
}: {
  headers?: string[];
  rows?: (string | React.ReactNode)[][];
}) {
  if (!headers.length) return null;

  return (
    <div className="w-full overflow-x-auto mb-6 rounded-xl" style={{ border: "1px solid rgba(240,236,228,0.07)" }}>
      <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "rgba(240,236,228,0.04)", borderBottom: "1px solid rgba(240,236,228,0.07)" }}>
            {headers.map((h) => (
              <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: "rgba(240,236,228,0.35)" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? "1px solid rgba(240,236,228,0.05)" : "none" }}>
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-3.5" style={{ color: j === 0 ? "rgba(240,236,228,0.7)" : "rgba(240,236,228,0.45)" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WikiTable;