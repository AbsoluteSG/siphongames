"use client";

import Link from "next/link";
import { DevlogMeta, tagColor } from "@/lib/devlog-shared";

interface Props {
  post: DevlogMeta;
}

export default function DevlogHero({ post }: Props) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <Link href={`/devlog/${post.slug}`} className="block group">
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{
          minHeight: "420px",
          background: "#111",
          border: "1px solid rgba(240,236,228,0.08)",
        }}
      >
        {/* Background image / gradient */}
        {post.heroImage ? (
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
            style={{
              backgroundImage: `url(${post.heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : (
          /* Decorative placeholder gradient when no image */
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
            style={{
              background:
                "linear-gradient(135deg, #1a1410 0%, #1c1a28 40%, #0e1418 100%)",
            }}
          >
            {/* Grid overlay texture */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(240,236,228,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,236,228,1) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            {/* Radial glow */}
            <div
              className="absolute"
              style={{
                inset: 0,
                background:
                  "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(192,80,74,0.12) 0%, transparent 70%)",
              }}
            />
          </div>
        )}

        {/* Gradient overlay for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(18,16,14,0.92) 0%, rgba(18,16,14,0.75) 45%, rgba(18,16,14,0.2) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(18,16,14,0.6) 0%, transparent 40%)",
          }}
        />

        {/* Content */}
        <div
          className="relative z-10 flex flex-col justify-end h-full p-10"
          style={{ minHeight: "420px" }}
        >
          {/* Featured badge */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-xs font-semibold tracking-[0.18em] uppercase px-3 py-1 rounded-full"
              style={{
                color: "#c8a84b",
                background: "rgba(200,168,75,0.12)",
                border: "1px solid rgba(200,168,75,0.25)",
              }}
            >
              Featured
            </span>
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
                style={{
                  color: tagColor(tag),
                  background: `${tagColor(tag)}18`,
                  border: `1px solid ${tagColor(tag)}30`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2
            className="font-display text-4xl font-bold mb-4 leading-tight transition-colors duration-200 group-hover:text-white"
            style={{
              color: "#f0ece4",
              maxWidth: "680px",
              letterSpacing: "0.01em",
              lineHeight: 1.2,
            }}
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          <p
            className="text-base mb-6 leading-relaxed"
            style={{
              color: "rgba(240,236,228,0.55)",
              maxWidth: "560px",
              lineHeight: 1.75,
            }}
          >
            {post.excerpt}
          </p>

          {/* Footer row */}
          <div className="flex items-center justify-between" style={{ maxWidth: "680px" }}>
            <span
              className="text-sm"
              style={{ color: "rgba(240,236,228,0.3)" }}
            >
              {date}
            </span>

            <span
              className="text-sm font-semibold tracking-[0.08em] transition-colors duration-200 group-hover:text-[#c0504a]"
              style={{ color: "rgba(240,236,228,0.4)" }}
            >
              Read More →
            </span>
          </div>
        </div>

        {/* Top accent line on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(192,80,74,0.6), transparent)",
          }}
        />
      </div>
    </Link>
  );
}
