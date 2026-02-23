import React from "react";

export function WikiCallout({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "tip";
}) {
  const styles = {
    info:    { color: "#c0504a", bg: "rgba(192,80,74,0.07)",    border: "rgba(192,80,74,0.18)",    label: "Note" },
    warning: { color: "#c09050", bg: "rgba(192,144,80,0.07)",   border: "rgba(192,144,80,0.18)",   label: "Warning" },
    tip:     { color: "#60a890", bg: "rgba(96,168,144,0.07)",   border: "rgba(96,168,144,0.18)",   label: "Tip" },
  }[type];

  return (
    <div
      className="my-7 px-6 py-5 rounded-2xl text-base leading-relaxed"
      style={{ background: styles.bg, border: `1px solid ${styles.border}`, color: "rgba(240,236,228,0.5)", lineHeight: 1.8 }}
    >
      <span className="font-semibold mr-2" style={{ color: styles.color }}>{styles.label} —</span>
      {children}
    </div>
  );
}

export default WikiCallout;