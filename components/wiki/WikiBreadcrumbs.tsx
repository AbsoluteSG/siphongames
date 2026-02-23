"use client";

import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export default function WikiBreadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1.5 mb-6" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {crumb.href && !isLast ? (
              <Link
                href={crumb.href}
                className="text-sm transition-colors duration-150"
                style={{ color: "rgba(240,236,228,0.28)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(240,236,228,0.6)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,236,228,0.28)")}
              >
                {crumb.label}
              </Link>
            ) : (
              <span
                className="text-sm"
                style={{ color: isLast ? "rgba(240,236,228,0.55)" : "rgba(240,236,228,0.28)" }}
              >
                {crumb.label}
              </span>
            )}
            {!isLast && (
              <span style={{ color: "rgba(240,236,228,0.15)", fontSize: "11px" }}>›</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}