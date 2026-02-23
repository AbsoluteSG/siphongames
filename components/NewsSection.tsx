"use client";

import { useState, useEffect, useRef } from "react";

const NEWS_POSTS = [
  {
    title: "Combat System Overhaul — How We Rebuilt Melee From Scratch",
    category: "Devlog",
    date: "Feb 20, 2026",
    description: "We threw out the entire melee system six months before launch and rebuilt it from the ground up. Here's why, and what we learned.",
  },
  {
    title: "World Map Reveal: The Regions of Iron Veil",
    category: "News",
    date: "Feb 15, 2026",
    description: "A first look at the five distinct regions players will explore — each with their own biome, factions, and hidden lore.",
  },
  {
    title: "Soundtrack Dev Notes — Composing for Tension and Silence",
    category: "Devlog",
    date: "Feb 10, 2026",
    description: "Our composer breaks down the philosophy behind the score — why silence is used as aggressively as any instrument.",
  },
  {
    title: "No Dogs Allowed — First Gameplay Trailer Released",
    category: "News",
    date: "Feb 3, 2026",
    description: "The first full gameplay trailer is live. Watch the reveal and read our commentary on each segment.",
  },
  {
    title: "Behind the Art Style: Influences and Direction",
    category: "Update",
    date: "Jan 28, 2026",
    description: "From oil painting to pixel art to where we landed — a visual essay on how the look of our games came to be.",
  },
];

const CATEGORY_META: Record<string, { color: string; icon: string }> = {
  Devlog: { color: "#c8a84b", icon: "⚙" },
  News:   { color: "#60a0c0", icon: "📡" },
  Update: { color: "#a060c0", icon: "✦" },
};

export default function NewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const tickRef = useRef(0);

  // Idle tilt — slow lissajous drift
  useEffect(() => {
    let frame: number;
    const animate = () => {
      tickRef.current += 0.012;
      const x = Math.sin(tickRef.current * 0.7) * 4;
      const y = Math.sin(tickRef.current) * 3;
      setTilt({ x, y });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const activePost = NEWS_POSTS[activeIndex];
  const activeMeta = CATEGORY_META[activePost.category] ?? { color: "#888", icon: "•" };

  return (
    <section id="news" className="px-8 py-24 max-w-[1600px] mx-auto">

      {/* Header */}
      <div className="flex items-baseline justify-between mb-10">
        <div className="flex items-baseline gap-6">
          <h2 className="font-display text-[clamp(3rem,5vw,5rem)] text-white">Latest News</h2>
          <div className="w-32 h-px bg-white/[0.08]" />
        </div>
        <button className="border border-white/[0.08] text-white/45 px-5 py-2.5 text-sm font-medium tracking-[0.12em] uppercase rounded-full hover:border-white/20 hover:text-white/80 transition-all duration-200">
          See More
        </button>
      </div>

      <div className="flex gap-8 items-stretch">

        {/* LEFT — preview, fills all available space */}
        <div
          className="flex-1 rounded-2xl overflow-hidden border relative transition-all duration-400"
          style={{
            minHeight: "520px",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderColor: `${activeMeta.color}44`,
            boxShadow: `0 0 60px ${activeMeta.color}10, inset 0 1px 0 rgba(255,255,255,0.07)`,
          }}
        >
          {/* Thumbnail — top portion */}
          <div className="relative w-full" style={{ height: "58%" }}>
            {/* Replace with: <Image src={activePost.image} alt={activePost.title} fill style={{objectFit:"cover"}} /> */}
            <div
              className="absolute inset-0 transition-all duration-400"
              style={{ background: `linear-gradient(135deg, ${activeMeta.color}28 0%, #0d1520 55%, #060610 100%)` }}
            />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl transition-all duration-400"
              style={{ background: activeMeta.color, opacity: 0.12 }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[rgba(255,255,255,0.03)] to-transparent" />
          </div>

          {/* Text content */}
          <div className="px-8 py-7">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-300"
                style={{ color: activeMeta.color }}
              >
                {activePost.category}
              </span>
              <span className="text-white/20 text-xs">·</span>
              <span className="text-white/35 text-xs">{activePost.date}</span>
            </div>
            <h3 className="text-white text-2xl font-semibold leading-snug mb-4 transition-all duration-300">
              {activePost.title}
            </h3>
            <p className="text-white/45 text-base leading-relaxed mb-7 transition-all duration-300">
              {activePost.description}
            </p>
            <button
              className="text-sm font-semibold tracking-[0.15em] uppercase transition-colors duration-300"
              style={{ color: activeMeta.color }}
            >
              Read More →
            </button>
          </div>
        </div>

        {/* RIGHT — vertical list, right-aligned text */}
        <div className="flex flex-col gap-3" style={{ width: "520px" }}>
          {NEWS_POSTS.map((post, i) => {
            const meta = CATEGORY_META[post.category] ?? { color: "#888", icon: "•" };
            const isActive = i === activeIndex;

            return (
              <div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                className="relative flex items-center justify-between gap-0 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300"
                style={{
                  height: "86px",
                  background: isActive ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: `1px solid ${isActive ? `${meta.color}55` : "rgba(255,255,255,0.08)"}`,
                  boxShadow: isActive
                    ? `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)`
                    : `0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)`,
                  opacity: isActive ? 1 : 0.55,
                  transform: isActive
                    ? `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                    : "perspective(600px) rotateX(0deg) rotateY(0deg)",
                  transition: isActive
                    ? "border 0.3s, box-shadow 0.3s, opacity 0.3s, background 0.3s"
                    : "all 0.3s",
                }}
              >
                {/* Glass highlight */}
                <div className="absolute top-0 left-6 right-1/3 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                {/* Text — right aligned */}
                <div className="flex-1 flex flex-col items-end justify-center px-6 min-w-0 z-10">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-white/30 text-xs tracking-wide">{post.date}</span>
                    <span className="text-white/20 text-xs">·</span>
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: meta.color }}>
                      {post.category}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-semibold leading-snug text-right transition-colors duration-200"
                    style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.75)" }}
                  >
                    {post.title}
                  </h3>
                </div>

                {/* Icon badge */}
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-lg mr-5 transition-all duration-300"
                  style={{
                    background: `${meta.color}18`,
                    color: meta.color,
                    border: `1px solid ${meta.color}33`,
                    boxShadow: isActive ? `0 0 16px ${meta.color}22` : "none",
                  }}
                >
                  {meta.icon}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}