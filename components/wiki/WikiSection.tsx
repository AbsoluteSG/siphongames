"use client";

import { useState } from "react";

export function WikiSection({
  id,
  title,
  collapsible = false,
  children,
}: {
  id: string;
  title: string;
  collapsible?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <section id={id} className="mb-12">
      <div
        className="flex items-center gap-4 mb-6 pb-3"
        style={{ borderBottom: "1px solid rgba(240,236,228,0.07)" }}
      >
        <h2 className="font-display flex-1" style={{ fontSize: "1.85rem", color: "#f0ece4", letterSpacing: "0.02em" }}>
          {title}
        </h2>
        {collapsible && (
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
            style={{
              color: "rgba(240,236,228,0.3)",
              border: "1px solid rgba(240,236,228,0.08)",
              background: "rgba(240,236,228,0.03)",
            }}
          >
            {open ? "Collapse" : "Expand"}
          </button>
        )}
      </div>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "9999px" : "0px", opacity: open ? 1 : 0 }}
      >
        {children}
      </div>
    </section>
  );
}

export default WikiSection;