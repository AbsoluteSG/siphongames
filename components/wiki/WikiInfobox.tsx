export interface InfoboxRow {
  label: string;
  value: string | React.ReactNode;
}

export interface InfoboxProps {
  title?: string;
  image?: string;
  imageAlt?: string;
  rows: InfoboxRow[];
}

export default function WikiInfobox({ title, image, imageAlt, rows }: InfoboxProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden mb-8 float-right ml-8"
      style={{
        width: "260px",
        background: "rgba(240,236,228,0.03)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(240,236,228,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(240,236,228,0.05)",
      }}
    >
      {/* Optional image */}
      {image ? (
        <div className="w-full relative" style={{ height: "160px" }}>
          <img src={image} alt={imageAlt ?? title ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(28,28,28,0.8) 100%)" }} />
        </div>
      ) : (
        <div
          className="w-full flex items-center justify-center"
          style={{
            height: "120px",
            background: "linear-gradient(135deg, rgba(192,80,74,0.08) 0%, rgba(28,28,28,0.4) 100%)",
            borderBottom: "1px solid rgba(240,236,228,0.06)",
          }}
        >
          <span style={{ color: "rgba(240,236,228,0.08)", fontSize: "3rem" }}>◈</span>
        </div>
      )}

      {/* Title */}
      {title && (
        <div
          className="px-5 py-3.5"
          style={{ borderBottom: "1px solid rgba(240,236,228,0.06)" }}
        >
          <span className="text-sm font-semibold" style={{ color: "#f0ece4" }}>{title}</span>
        </div>
      )}

      {/* Rows */}
      <div className="px-5 py-3">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex items-start justify-between gap-3 py-2.5"
            style={{ borderBottom: i < rows.length - 1 ? "1px solid rgba(240,236,228,0.05)" : "none" }}
          >
            <span className="text-xs flex-shrink-0 mt-0.5" style={{ color: "rgba(240,236,228,0.28)", minWidth: "72px" }}>
              {row.label}
            </span>
            <span className="text-xs text-right" style={{ color: "rgba(240,236,228,0.7)", fontWeight: 500 }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}