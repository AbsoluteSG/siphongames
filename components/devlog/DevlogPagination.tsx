"use client";

import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function DevlogPagination({
  currentPage,
  totalPages,
  basePath = "/devlog",
}: Props) {
  if (totalPages <= 1) return null;

  const pageHref = (p: number) =>
    p === 1 ? basePath : `${basePath}?page=${p}`;

  // Build page number array — show at most 5 pages, centred on current
  const pageNumbers: (number | "…")[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    const start = Math.max(1, currentPage - 2);
    const end   = Math.min(totalPages, currentPage + 2);
    if (start > 1) { pageNumbers.push(1); if (start > 2) pageNumbers.push("…"); }
    for (let i = start; i <= end; i++) pageNumbers.push(i);
    if (end < totalPages) { if (end < totalPages - 1) pageNumbers.push("…"); pageNumbers.push(totalPages); }
  }

  const btnBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "36px",
    minWidth: "36px",
    padding: "0 10px",
    borderRadius: "10px",
    fontSize: "0.8125rem",
    fontWeight: 500,
    transition: "all 200ms",
    cursor: "pointer",
    textDecoration: "none",
  };

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          style={{
            ...btnBase,
            color: "rgba(240,236,228,0.5)",
            border: "1px solid rgba(240,236,228,0.08)",
            background: "rgba(240,236,228,0.03)",
          }}
        >
          ← Prev
        </Link>
      ) : (
        <span
          style={{
            ...btnBase,
            color: "rgba(240,236,228,0.18)",
            border: "1px solid rgba(240,236,228,0.04)",
            background: "transparent",
            cursor: "not-allowed",
          }}
        >
          ← Prev
        </span>
      )}

      {/* Page numbers */}
      {pageNumbers.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            style={{
              ...btnBase,
              color: "rgba(240,236,228,0.2)",
              background: "transparent",
              border: "none",
              cursor: "default",
            }}
          >
            …
          </span>
        ) : p === currentPage ? (
          <span
            key={p}
            style={{
              ...btnBase,
              color: "#f0ece4",
              background: "rgba(192,80,74,0.15)",
              border: "1px solid rgba(192,80,74,0.35)",
            }}
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={pageHref(p as number)}
            style={{
              ...btnBase,
              color: "rgba(240,236,228,0.45)",
              border: "1px solid rgba(240,236,228,0.07)",
              background: "rgba(240,236,228,0.025)",
            }}
          >
            {p}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1)}
          style={{
            ...btnBase,
            color: "rgba(240,236,228,0.5)",
            border: "1px solid rgba(240,236,228,0.08)",
            background: "rgba(240,236,228,0.03)",
          }}
        >
          Next →
        </Link>
      ) : (
        <span
          style={{
            ...btnBase,
            color: "rgba(240,236,228,0.18)",
            border: "1px solid rgba(240,236,228,0.04)",
            background: "transparent",
            cursor: "not-allowed",
          }}
        >
          Next →
        </span>
      )}
    </div>
  );
}
