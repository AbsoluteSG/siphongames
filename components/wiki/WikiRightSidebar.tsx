"use client";

import Link from "next/link";

interface RelatedLink { label: string; href: string; }

interface WikiRightSidebarProps {
  related?: RelatedLink[];
  recentlyUpdated?: { title: string; category: string; href: string; updated: string }[];
  exploreMore?: RelatedLink[];
}

const DEFAULT_RECENT = [
  { title: "Combat System", category: "Combat", href: "/wiki/combat-system", updated: "2d ago" },
  { title: "The City", category: "World", href: "/wiki/the-city", updated: "4d ago" },
  { title: "Recipes", category: "Restaurant", href: "/wiki/recipes", updated: "5d ago" },
  { title: "Protagonist", category: "Characters", href: "/wiki/protagonist", updated: "1w ago" },
];

function SidebarPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl overflow-hidden mb-6"
      style={{
        background: "rgba(240,236,228,0.025)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(240,236,228,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      }}
    >
      <div className="px-6 pt-5 pb-1">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-5" style={{ color: "rgba(240,236,228,0.22)" }}>
          {title}
        </p>
        {children}
      </div>
      <div className="h-5" />
    </div>
  );
}

export default function WikiRightSidebar({
  related,
  recentlyUpdated = DEFAULT_RECENT,
  exploreMore,
}: WikiRightSidebarProps) {
  return (
    <aside
      className="flex-shrink-0 py-14 pr-10 sticky top-16 self-start"
      style={{ width: "340px", maxHeight: "calc(100vh - 64px)", overflowY: "auto", scrollbarWidth: "none" }}
    >
      {/* Official Archive */}
      <div
        className="rounded-2xl overflow-hidden mb-6"
        style={{
          background: "linear-gradient(135deg, rgba(192,80,74,0.09) 0%, rgba(40,30,30,0.5) 100%)",
          border: "1px solid rgba(192,80,74,0.18)",
        }}
      >
        <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(192,80,74,0.1)" }}>
          <span className="w-2 h-2 rounded-full" style={{ background: "#c0504a" }} />
          <span className="text-sm font-semibold tracking-[0.18em] uppercase" style={{ color: "#c0504a" }}>Official Archive</span>
        </div>
        <div className="px-6 py-5">
          {[
            { label: "Version", value: "v0.4.1" },
            { label: "Updated", value: "Feb 20, 2026" },
            { label: "Entries", value: "142" },
          ].map((s) => (
            <div key={s.label} className="flex justify-between py-3" style={{ borderBottom: "1px solid rgba(240,236,228,0.05)" }}>
              <span className="text-sm" style={{ color: "rgba(240,236,228,0.3)" }}>{s.label}</span>
              <span className="text-sm font-semibold" style={{ color: "rgba(240,236,228,0.7)" }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Topics */}
      {related && related.length > 0 && (
        <SidebarPanel title="Related Topics">
          <div className="flex flex-col gap-0.5">
            {related.slice(0, 5).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-3 py-2.5 text-sm rounded-xl px-3 transition-all duration-150"
                style={{ color: "rgba(240,236,228,0.45)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#f0ece4"; e.currentTarget.style.background = "rgba(240,236,228,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(240,236,228,0.45)"; e.currentTarget.style.background = "transparent"; }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(240,236,228,0.2)" }} />
                {link.label}
              </Link>
            ))}
          </div>
        </SidebarPanel>
      )}

      {/* Recently Updated */}
      <SidebarPanel title="Recently Updated">
        <div className="flex flex-col gap-2">
          {recentlyUpdated.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start justify-between gap-3 py-3 px-4 rounded-xl transition-all duration-150"
              style={{ background: "rgba(240,236,228,0.025)", border: "1px solid rgba(240,236,228,0.06)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(240,236,228,0.05)"; e.currentTarget.style.borderColor = "rgba(240,236,228,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(240,236,228,0.025)"; e.currentTarget.style.borderColor = "rgba(240,236,228,0.06)"; }}
            >
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: "rgba(240,236,228,0.7)" }}>{item.title}</p>
                <p className="text-xs" style={{ color: "rgba(240,236,228,0.25)" }}>{item.category}</p>
              </div>
              <span className="text-xs flex-shrink-0 mt-0.5" style={{ color: "rgba(240,236,228,0.2)" }}>{item.updated}</span>
            </Link>
          ))}
        </div>
      </SidebarPanel>

      {/* Explore More */}
      {exploreMore && exploreMore.length > 0 && (
        <SidebarPanel title="Explore More">
          <div className="flex flex-col gap-2">
            {exploreMore.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={{ background: "rgba(240,236,228,0.03)", border: "1px solid rgba(240,236,228,0.07)", color: "rgba(240,236,228,0.5)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(240,236,228,0.06)"; e.currentTarget.style.color = "#f0ece4"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(240,236,228,0.03)"; e.currentTarget.style.color = "rgba(240,236,228,0.5)"; }}
              >
                {link.label}
                <span style={{ color: "rgba(240,236,228,0.25)" }}>→</span>
              </Link>
            ))}
          </div>
        </SidebarPanel>
      )}
    </aside>
  );
}