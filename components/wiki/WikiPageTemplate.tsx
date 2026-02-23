"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import WikiBreadcrumbs, { Crumb } from "@/components/wiki/WikiBreadcrumbs";
import WikiInfobox, { InfoboxProps } from "@/components/wiki/WikiInfobox";

interface SectionBlock {
  id: string;
  title: string;
  collapsible?: boolean;
  children: React.ReactNode;
}

interface PaginationProps {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
  categoryHref?: string;
  categoryLabel?: string;
}

interface WikiPageTemplateProps {
  breadcrumbs: Crumb[];
  category: string;
  title: string;
  summary: string;
  heroImage?: string;
  infobox?: InfoboxProps;
  children: React.ReactNode;
  pagination?: PaginationProps;
}

export default function WikiPageTemplate({
  breadcrumbs,
  category,
  title,
  summary,
  heroImage,
  infobox,
  children,
  pagination,
}: WikiPageTemplateProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 300ms ease, transform 300ms ease",
      }}
    >
      {/* FULL-WIDTH BANNER — bleeds outside content column */}
      <div
        className="relative overflow-hidden"
        style={{
          height: "25vh",
          minHeight: "200px",
          maxHeight: "320px",
          margin: "0 -3rem 0 -3rem", // bleed past parent padding
        }}
      >
        {/* Background image if provided, else gradient */}
        {heroImage ? (
          <img src={heroImage} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, rgba(50,30,28,0.95) 0%, #1c1c1c 55%, rgba(28,28,28,0.97) 100%)`,
            }}
          />
        )}

        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "linear-gradient(rgba(240,236,228,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(240,236,228,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Dark gradient overlay — heavier at bottom so content reads */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(28,28,28,0.2) 0%, rgba(28,28,28,0.5) 60%, rgba(28,28,28,0.95) 100%)",
          }}
        />

        {/* Left accent glow */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ background: "linear-gradient(to bottom, transparent, #c0504a, transparent)" }}
        />

        {/* Radial accent */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(192,80,74,0.12) 0%, transparent 65%)",
            top: "50%",
            left: "25%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Banner content — positioned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-12 pb-8">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-lg"
              style={{ color: "#c0504a", background: "rgba(192,80,74,0.12)", border: "1px solid rgba(192,80,74,0.25)" }}
            >
              {category}
            </span>
          </div>
          <h1
            className="font-display"
            style={{ fontSize: "clamp(2.2rem,4vw,3.5rem)", color: "#f0ece4", letterSpacing: "0.02em", lineHeight: 1.1 }}
          >
            {title}
          </h1>
        </div>
      </div>

      {/* Content area below banner */}
      <div className="pt-8">
        {/* Breadcrumbs */}
        <WikiBreadcrumbs crumbs={breadcrumbs} />

        {/* Page header — summary only, title is in banner */}
        <div className="mb-10" style={{ paddingBottom: "36px", borderBottom: "1px solid rgba(240,236,228,0.07)" }}>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(240,236,228,0.42)", lineHeight: 1.8 }}>
            {summary}
          </p>
        </div>

      {/* Content area — floated infobox + prose */}
      <div className="relative">
        {infobox && <WikiInfobox {...infobox} />}
        <div className="wiki-prose">
          {children}
        </div>
        <div style={{ clear: "both" }} />
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="mt-20 pt-8" style={{ borderTop: "1px solid rgba(240,236,228,0.07)" }}>
          <div className="flex items-center justify-between">
            {pagination.prev ? (
              <Link
                href={pagination.prev.href}
                className="group flex items-center gap-2 text-sm transition-colors duration-200"
                style={{ color: "rgba(240,236,228,0.35)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(240,236,228,0.75)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,236,228,0.35)")}
              >
                <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
                {pagination.prev.label}
              </Link>
            ) : <div />}

            {pagination.categoryHref && (
              <Link
                href={pagination.categoryHref}
                className="text-sm transition-colors duration-200"
                style={{ color: "rgba(240,236,228,0.28)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(240,236,228,0.55)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,236,228,0.28)")}
              >
                ↑ {pagination.categoryLabel ?? "Back to Category"}
              </Link>
            )}

            {pagination.next ? (
              <Link
                href={pagination.next.href}
                className="group flex items-center gap-2 text-sm transition-colors duration-200"
                style={{ color: "rgba(240,236,228,0.35)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(240,236,228,0.75)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,236,228,0.35)")}
              >
                {pagination.next.label}
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            ) : <div />}
          </div>
        </div>
      )}
    </div> 
    </div> 
  );
}
