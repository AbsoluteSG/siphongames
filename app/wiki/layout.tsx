"use client";

import { useEffect, useState } from "react";
import WikiSidebar from "@/components/wiki/WikiSidebar";
import WikiRightSidebar from "@/components/wiki/WikiRightSidebar";
import Link from "next/link";

export default function WikiLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#1c1c1c", fontFamily: "'Outfit', sans-serif", color: "#f0ece4" }}>

      {/* HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-300"
        style={{
          height: "64px",
          paddingLeft: "80px",
          paddingRight: "40px",
          background: scrolled ? "rgba(28,28,28,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(240,236,228,0.06)" : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 mr-10">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold"
            style={{ background: "rgba(192,80,74,0.15)", border: "1px solid rgba(192,80,74,0.3)", color: "#c0504a" }}
          >
            N
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold" style={{ color: "#f0ece4" }}>No Dogs Allowed</span>
            <span style={{ color: "rgba(240,236,228,0.2)" }}>/</span>
            <span className="text-base" style={{ color: "rgba(240,236,228,0.35)" }}>Wiki</span>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 flex justify-center">
          <div className="relative flex items-center" style={{ width: "420px" }}>
            <svg className="absolute left-4 w-4 h-4" style={{ color: "rgba(240,236,228,0.2)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search the wiki..."
              className="w-full pl-11 pr-14 py-2.5 text-sm outline-none transition-all duration-200"
              style={{
                background: "rgba(240,236,228,0.04)",
                border: "1px solid rgba(240,236,228,0.08)",
                borderRadius: "12px",
                color: "#f0ece4",
                fontFamily: "'Outfit', sans-serif",
              }}
            />
            <span
              className="absolute right-3.5 text-xs px-1.5 py-0.5 rounded-md"
              style={{ background: "rgba(240,236,228,0.06)", color: "rgba(240,236,228,0.2)", border: "1px solid rgba(240,236,228,0.08)" }}
            >
              ⌘K
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs px-3 py-1.5 rounded-lg" style={{ color: "rgba(240,236,228,0.3)", background: "rgba(240,236,228,0.04)", border: "1px solid rgba(240,236,228,0.07)" }}>
            v0.4.1
          </span>
          <Link href="/" className="text-sm font-medium transition-colors duration-200" style={{ color: "rgba(240,236,228,0.4)" }}>
            ← Back to site
          </Link>
        </div>
      </header>

      {/* 3-COLUMN LAYOUT */}
      <div className="flex min-h-screen" style={{ paddingTop: "64px" }}>
        {/* Left sidebar — fixed width rail */}
        <div style={{ width: "80px", flexShrink: 0 }} />
        <WikiSidebar />

        {/* Center — dominant */}
        <main className="flex-1 min-w-0 flex justify-center py-14 px-6">
          <div style={{ width: "100%", maxWidth: "1200px" }}>
            {children}
          </div>
        </main>

        {/* Right sidebar */}
        <WikiRightSidebar />
      </div>
    </div>
  );
}