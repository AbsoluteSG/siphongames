"use client";

import Link from "next/link";
import { DevlogMeta, tagColor } from "@/lib/devlog-shared";

interface Props {
  post: DevlogMeta;
}

export default function DevlogCard({ post }: Props) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <Link href={`/devlog/${post.slug}`} className="block group h-full">
      <article
        className="flex flex-col h-full overflow-hidden rounded-2xl transition-all duration-250"
        style={{
          background: "rgba(240,236,228,0.025)",
          border: "1px solid rgba(240,236,228,0.07)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.border =
            "1px solid rgba(240,236,228,0.13)";
          (e.currentTarget as HTMLElement).style.transform = "scale(1.015)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 8px 32px rgba(0,0,0,0.25)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.border =
            "1px solid rgba(240,236,228,0.07)";
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Thumbnail */}
        <div
          className="w-full flex-shrink-0 overflow-hidden"
          style={{ height: "196px" }}
        >
          {post.heroImage ? (
            <div
              className="w-full h-full transition-transform duration-400 group-hover:scale-[1.04]"
              style={{
                backgroundImage: `url(${post.heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ) : (
            /* Placeholder gradient */
            <div
              className="w-full h-full relative"
              style={{
                background:
                  "linear-gradient(135deg, #181614 0%, #1e1c28 50%, #121618 100%)",
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(240,236,228,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,236,228,1) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(192,80,74,0.10) 0%, transparent 70%)",
                }}
              />
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
                style={{
                  color: tagColor(tag),
                  background: `${tagColor(tag)}15`,
                  border: `1px solid ${tagColor(tag)}28`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            className="text-base font-semibold mb-2 leading-snug transition-colors duration-200 group-hover:text-white"
            style={{ color: "rgba(240,236,228,0.88)", lineHeight: 1.45 }}
          >
            {post.title}
          </h3>

          {/* Date */}
          <p
            className="text-xs mb-3"
            style={{ color: "rgba(240,236,228,0.28)" }}
          >
            {date}
          </p>

          {/* Excerpt */}
          <p
            className="text-sm flex-1 mb-5"
            style={{
              color: "rgba(240,236,228,0.45)",
              lineHeight: 1.7,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.excerpt}
          </p>

          {/* Read more */}
          <span
            className="text-xs font-semibold tracking-[0.1em] uppercase transition-colors duration-200 group-hover:text-[#c0504a] mt-auto"
            style={{ color: "rgba(240,236,228,0.22)" }}
          >
            Read More →
          </span>
        </div>
      </article>
    </Link>
  );
}
